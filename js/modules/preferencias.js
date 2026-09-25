// Guarda apenas a preferência visual, sem dados do formulário.
const CHAVE = 'ong-esperanca:preferencias';

export function lerPreferencias() {
    try {
        const texto = localStorage.getItem(CHAVE);
        const dados = texto ? JSON.parse(texto) : null;
        if (dados && (dados.tema === 'claro' || dados.tema === 'escuro')) {
            return { tema: dados.tema };
        }
    } catch {
        // JSON inválido ou armazenamento bloqueado: usar o tema padrão.
    }
    return { tema: 'claro' };
}

export function salvarPreferencias(preferencias) {
    if (!preferencias || !['claro', 'escuro'].includes(preferencias.tema)) return false;
    try {
        const dados = JSON.stringify({ tema: preferencias.tema });
        localStorage.setItem(CHAVE, dados);
        return true;
    } catch {
        return false;
    }
}

export function iniciarPreferencias() {
    const botao = document.querySelector('#alternar-tema');
    const status = document.querySelector('#estado-tema');
    if (!botao || botao.dataset.iniciado === 'true') return;
    botao.dataset.iniciado = 'true';

    function aplicarTema(tema) {
        const escuro = tema === 'escuro';
        document.body.classList.toggle('tema-escuro', escuro);
        botao.setAttribute('aria-pressed', String(escuro));
        botao.textContent = escuro ? 'Tema escuro: ativado' : 'Tema escuro: desativado';
    }

    aplicarTema(lerPreferencias().tema);
    botao.addEventListener('click', () => {
        const tema = document.body.classList.contains('tema-escuro') ? 'claro' : 'escuro';
        aplicarTema(tema);
        const salvo = salvarPreferencias({ tema });
        if (status) status.textContent = salvo
            ? `Tema ${tema} salvo para os próximos acessos.`
            : `Tema ${tema} aplicado. Não foi possível salvar a preferência neste navegador.`;
    });

    // Mantém outras abas da mesma origem em sincronia.
    window.addEventListener('storage', (evento) => {
        if (evento.key === CHAVE || evento.key === null) {
            aplicarTema(lerPreferencias().tema);
            if (status) status.textContent = '';
        }
    });
}
