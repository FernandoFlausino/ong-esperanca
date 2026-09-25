import { iniciarPreferencias } from './modules/preferencias.js';
import { iniciarRoteador } from './modules/roteador.js';
import { iniciarFormulario } from './modules/formulario.js';

// Abrir uma página secundária diretamente leva à mesma estrutura SPA.
const pagina = location.pathname.split('/').pop();
const paginas = { 'projetos.html': 'projetos', 'cadastro.html': 'cadastro', 'componentes.html': 'componentes' };
if (Object.hasOwn(paginas, pagina)) {
    const hash = location.hash.slice(1);
    const nomesRotas = ['inicio', 'projetos', 'cadastro', 'componentes'];
    const rota = !hash ? paginas[pagina] :
        nomesRotas.includes(hash.split('/')[0]) ? hash : `${paginas[pagina]}/${hash}`;
    location.replace(`index.html#${rota}`);
} else if (document.querySelector('#conteudo-principal')) {
    iniciarPreferencias();
    iniciarFormulario();
    iniciarRoteador();
}
