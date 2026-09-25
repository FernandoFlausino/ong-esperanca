// Regras complementares à validação nativa de required, type e pattern.
export function validarCampo(campo) {
    campo.setCustomValidity('');
    if (['nome', 'endereco', 'cidade'].includes(campo.id)) {
        const texto = campo.value.trim();
        if (!texto) campo.setCustomValidity('Preencha este campo com texto, não apenas espaços.');
        else if (campo.id === 'nome' && texto.length < 3) {
            campo.setCustomValidity('Informe um nome com pelo menos três caracteres.');
        }
    }
    if (campo.id === 'nascimento' && campo.value) {
        const hoje = new Date();
        const limite = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
        if (campo.value > limite) campo.setCustomValidity('A data de nascimento não pode ser futura.');
    }
    return campo.validity.valid;
}

function exibirEstado(campo) {
    if (!campo.id) return;
    const valido = campo.validity.valid;
    const idErro = `erro-${campo.id}`;
    let mensagem = document.getElementById(idErro);
    const descricoes = new Set((campo.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    campo.classList.toggle('campo-erro', !valido);
    campo.classList.toggle('campo-sucesso', valido);
    campo.setAttribute('aria-invalid', String(!valido));
    if (!valido) {
        if (!mensagem) {
            mensagem = document.createElement('small');
            mensagem.id = idErro;
            mensagem.classList.add('mensagem-erro');
            campo.insertAdjacentElement('afterend', mensagem);
        }
        mensagem.textContent = campo.validationMessage;
        descricoes.add(idErro);
    } else {
        mensagem?.remove();
        descricoes.delete(idErro);
    }
    if (descricoes.size) campo.setAttribute('aria-describedby', [...descricoes].join(' '));
    else campo.removeAttribute('aria-describedby');
}

export function iniciarFormulario() {
    function pertence(campo) {
        return campo?.form?.id === 'form-cadastro' &&
            ['INPUT', 'SELECT', 'TEXTAREA'].includes(campo.tagName);
    }
    function conferir(campo, mostrar) {
        validarCampo(campo);
        if (mostrar || campo.hasAttribute('aria-invalid')) exibirEstado(campo);
        // Radios com mesmo name compartilham o estado de preenchimento.
        if (campo.type === 'radio') {
            for (const item of campo.form.elements) {
                if (item.type === 'radio' && item.name === campo.name && item !== campo) {
                    validarCampo(item);
                    if (mostrar || item.hasAttribute('aria-invalid')) exibirEstado(item);
                }
            }
        }
    }
    function editar(evento) {
        const campo = evento.target;
        if (!pertence(campo)) return;
        campo.form.querySelector('[data-feedback]')?.remove();
        conferir(campo, false);
    }
    document.addEventListener('input', editar);
    document.addEventListener('change', editar);
    document.addEventListener('focusout', (evento) => {
        if (pertence(evento.target)) conferir(evento.target, true);
    });
    // invalid não propaga por bubbling; a captura alcança campos inseridos pela SPA.
    document.addEventListener('invalid', (evento) => {
        if (!pertence(evento.target)) return;
        evento.target.form.querySelector('[data-feedback]')?.remove();
        conferir(evento.target, true);
    }, true);
    document.addEventListener('submit', (evento) => {
        if (evento.target.id !== 'form-cadastro') return;
        evento.preventDefault();
        const formulario = evento.target;
        for (const campo of formulario.elements) {
            if (pertence(campo)) conferir(campo, true);
        }
        if (!formulario.reportValidity()) {
            formulario.querySelector('[data-feedback]')?.remove();
            return;
        }
        let mensagem = formulario.querySelector('[data-feedback]');
        if (!mensagem) {
            mensagem = document.createElement('p');
            mensagem.dataset.feedback = '';
            mensagem.classList.add('alerta', 'alerta-sucesso');
            mensagem.setAttribute('role', 'status');
            formulario.append(mensagem);
        }
        mensagem.textContent = 'Os campos foram preenchidos corretamente. Este cadastro é demonstrativo; nenhum dado foi enviado ou salvo.';
    });
}
