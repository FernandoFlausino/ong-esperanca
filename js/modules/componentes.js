import { grupos } from './dados.js';

// Cria um card sem interpretar os dados como marcação HTML.
function criarCard(dados) {
    const card = document.createElement('article');
    card.classList.add('card-projeto');

    if (dados.icone) {
        const icone = document.createElement('span');
        icone.setAttribute('aria-hidden', 'true');
        icone.textContent = dados.icone;
        card.append(icone);
    }

    const titulo = document.createElement('h3');
    titulo.textContent = dados.nome;
    const descricao = document.createElement('p');
    descricao.textContent = dados.descricao;
    const link = document.createElement('a');
    link.textContent = dados.textoLink;
    link.href = dados.link;
    link.dataset.rota = '';
    card.append(titulo, descricao, link);
    return card;
}

export function renderizarCards(raiz) {
    raiz.querySelectorAll('[data-cards]').forEach((container) => {
        const fragmento = document.createDocumentFragment();
        const dados = grupos[container.dataset.cards] ?? [];
        dados.forEach((projeto) => fragmento.append(criarCard(projeto)));
        container.replaceChildren(fragmento);
    });
}
