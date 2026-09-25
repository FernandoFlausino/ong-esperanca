import { renderizarCards } from './componentes.js';

// Somente arquivos locais explicitamente permitidos podem ser carregados.
const rotas = {
    inicio: 'inicio.html',
    projetos: 'projetos.html',
    cadastro: 'cadastro.html',
    componentes: 'componentes.html'
};

export function iniciarRoteador() {
    const container = document.querySelector('#conteudo-principal');
    const estado = document.querySelector('#estado-navegacao');
    let ultimaNavegacao = 0;
    let rotaExibida = '';
    let requisicao;

    function lerRota() {
        const [rota = 'inicio', ...partes] = location.hash.slice(1).split('/');
        return { rota: rota || 'inicio', ancora: partes.join('/') };
    }

    function direcionarFoco(ancora) {
        const alvo = (ancora && document.getElementById(ancora)) ||
            container.querySelector('main');
        if (alvo) {
            alvo.setAttribute('tabindex', '-1');
            alvo.focus({ preventScroll: true });
            alvo.scrollIntoView({ block: 'start' });
        }
    }

    function atualizarMenu(rota) {
        document.querySelectorAll('.cabecalho a[data-rota]').forEach((link) => {
            if (link.getAttribute('href') === `#${rota}`) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
        const menu = document.querySelector('#menu-toggle');
        if (menu) menu.checked = false;
        document.querySelectorAll('.submenu-controle[open]').forEach((item) => {
            item.open = false;
        });
    }

    async function renderizar() {
        const { rota, ancora } = lerRota();
        const numero = ++ultimaNavegacao;
        requisicao?.abort();
        atualizarMenu(rota);
        estado.textContent = '';

        // Uma âncora na tela atual não apaga o que foi digitado no formulário.
        if (rota === rotaExibida) {
            container.setAttribute('aria-busy', 'false');
            direcionarFoco(ancora);
            return;
        }

        container.setAttribute('aria-busy', 'true');
        estado.textContent = 'Carregando…';
        requisicao = new AbortController();

        try {
            if (!Object.hasOwn(rotas, rota)) {
                throw new Error('Página não encontrada. Escolha uma opção no menu.');
            }
            const resposta = await fetch(rotas[rota], { signal: requisicao.signal });
            if (!resposta.ok) throw new Error('Não foi possível carregar a página. Tente novamente pelo menu.');
            const html = await resposta.text();
            const documento = new DOMParser().parseFromString(html, 'text/html');
            const conteudo = documento.querySelector('main');
            if (!conteudo) throw new Error('O arquivo não contém o conteúdo principal.');
            if (numero !== ultimaNavegacao) return;

            const novoConteudo = document.importNode(conteudo, true);
            renderizarCards(novoConteudo);
            container.replaceChildren(novoConteudo);
            rotaExibida = rota;
            document.title = documento.title || 'ONG Esperança';
            estado.textContent = '';
            direcionarFoco(ancora);
        } catch (erro) {
            if (erro.name === 'AbortError' || numero !== ultimaNavegacao) return;
            rotaExibida = '';
            const main = document.createElement('main');
            main.id = 'conteudo';
            main.tabIndex = -1;
            const titulo = document.createElement('h1');
            titulo.textContent = 'Não foi possível abrir esta tela';
            main.append(titulo);
            container.replaceChildren(main);
            estado.textContent = erro instanceof TypeError
                ? 'Falha ao carregar a página. Verifique a conexão ou o servidor local e tente novamente pelo menu.'
                : erro.message;
            document.title = 'ONG Esperança | Erro de navegação';
            main.focus();
        } finally {
            if (numero === ultimaNavegacao) container.setAttribute('aria-busy', 'false');
        }
    }

    // Delegação: funciona também nos links dos cards criados posteriormente.
    document.addEventListener('click', (evento) => {
        if (!(evento.target instanceof Element)) return;
        const link = evento.target.closest('a');
        if (!link || evento.button !== 0 || evento.ctrlKey || evento.metaKey ||
            evento.shiftKey || evento.altKey || link.hasAttribute('download') ||
            (link.target && link.target !== '_self')) return;

        // O link de acessibilidade não é uma rota e não deve alterar o hash.
        if (link.getAttribute('href') === '#conteudo') {
            evento.preventDefault();
            direcionarFoco('conteudo');
            return;
        }
        if (!link.hasAttribute('data-rota')) return;
        const destino = link.getAttribute('href');
        if (!destino?.startsWith('#')) return;
        evento.preventDefault();
        if (location.hash === destino) renderizar();
        else location.hash = destino;
    });

    window.addEventListener('hashchange', renderizar);
    renderizar();
}
