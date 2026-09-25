# ONG Esperança

Desenvolvi este projeto acadêmico com HTML5, CSS e JavaScript. A proposta é apresentar a ONG Esperança, suas campanhas e as formas de participação.

## Como executar

1. Extraia o ZIP e abra a pasta `ong-esperanca` no VS Code.
2. Com a extensão Live Server instalada, clique com o botão direito em `html/index.html` e escolha **Open with Live Server**.
3. Navegue pelos links do menu e pelos botões das páginas.

É necessário um servidor local: abrir o HTML com duplo clique (`file://`) não permite o carregamento dos módulos e das páginas via `fetch()`.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `html/index.html` | Entrada da SPA, com cabeçalho, menu, rodapé e div `conteudo-principal`. |
| `html/inicio.html` | Conteúdo inicial carregado pela aplicação. |
| `html/projetos.html` | Voluntariado, campanhas de doação e contribuição financeira. |
| `html/cadastro.html` | Formulário demonstrativo com validação nativa. |
| `html/componentes.html` | Exemplos de etiquetas, alertas e notificações. |
| `css/reset.css` | Configuração básica de dimensionamento dos elementos. |
| `css/style.css` | Design System, estilos dos componentes e responsividade. |
| `imagens/` | Imagens em JPG, PNG e WebP. |
| `js/main.js` | Inicialização da aplicação e encaminhamento de páginas secundárias para a SPA. |
| `js/modules/roteador.js` | Navegação por hash, busca de páginas e renderização do conteúdo. |
| `js/modules/preferencias.js` | Grava e restaura a escolha de tema pelo localStorage. |
| `js/modules/dados.js` | Arrays de objetos com os dados dos cards. |
| `js/modules/componentes.js` | Criação e preenchimento dos cards com `document.createElement()`. |
| `js/modules/formulario.js` | Mensagem demonstrativa após a validação do formulário. |
| `DESIGN-SYSTEM.md` | Inventário de tokens de estilo e mapa dos componentes. |

## Navegação SPA

Utilizei rotas como `#inicio`, `#projetos`, `#cadastro` e `#componentes`. Os links são interceptados e atualizam o hash. O evento `hashchange` chama a renderização, incluindo ao usar Voltar e Avançar.

A função de renderização busca o HTML com `fetch()`, seleciona o `main` usando `DOMParser` e copia seu conteúdo com `document.importNode()`. Em seguida, `replaceChildren()` limpa a div principal e insere a tela carregada. O cabeçalho e o menu permanecem no mesmo documento.

Rotas como `#cadastro/participacao` levam a uma seção específica. A mudança entre seções da mesma tela preserva os campos preenchidos. Ao trocar de tela, o conteúdo anterior é substituído e o formulário não é armazenado.

Também tratei páginas inexistentes e falhas de carregamento. Requisições anteriores são canceladas quando uma nova navegação começa, evitando a exibição de uma resposta atrasada.

## Cards dinâmicos

Organizei os dados em arrays e utilizei `forEach()` para percorrê-los. Cada card é criado com `document.createElement()`, preenchido com `textContent` e reunido em um `DocumentFragment`. Depois, `replaceChildren()` atualiza o container sem duplicar os cards.

Para alterar os cards de atuação e de campanhas, edite `js/modules/dados.js`. Os cards presentes no HTML servem como conteúdo inicial e são substituídos pelos dados ao carregar a SPA.

## Design System e acessibilidade

Centralizei cores, fontes e espaçamentos no `:root` de `css/style.css`. Utilizei Grid de 12 colunas, Flexbox e cinco faixas de tamanho de tela. O projeto também conta com foco visível, link para pular ao conteúdo, textos alternativos e rótulos de formulário. O menu mobile fecha após a escolha de uma rota, e o foco acompanha o conteúdo carregado.

## Limitações

A ONG e seus contatos são fictícios. O formulário verifica o preenchimento no navegador e exibe uma mensagem de demonstração; nenhum dado é enviado ou salvo. As validações de CPF e CEP verificam o formato, sem consultar serviços externos. Os alertas e as notificações são exemplos acadêmicos.

## Preferência de tema e localStorage

Adicionei um botão de tema abaixo do cabeçalho. Ele alterna entre claro e escuro, atualiza `aria-pressed` e aplica a classe `tema-escuro` no `body`. A escolha permanece ao navegar entre as telas da SPA.

No módulo `preferencias.js`, salvo somente um objeto como `{ "tema": "escuro" }` na chave `ong-esperanca:preferencias`. Uso `JSON.stringify()` para converter o objeto em texto e `localStorage.setItem()` para gravar.

Na inicialização, `localStorage.getItem()` recupera o texto e `JSON.parse()` converte de volta em objeto. Confiro se o tema é `claro` ou `escuro` antes de restaurar a classe e o estado do botão. Dados ausentes, inválidos ou bloqueio de acesso usam o tema claro como padrão. Caso a gravação falhe, o tema muda na sessão e uma mensagem explica que não foi possível salvá-lo.

O evento `storage` atualiza a escolha nas outras abas da mesma origem. Os dados do formulário continuam sem ser enviados ou armazenados.

### Como conferir

1. Abra `html/index.html` pelo Live Server e ative o tema escuro.
2. Navegue entre as telas: o tema deve permanecer.
3. Recarregue ou feche e reabra o site no mesmo navegador e endereço: o tema deve ser restaurado.
4. Volte ao tema claro e repita o teste.
5. Nas ferramentas do navegador, procure a chave `ong-esperanca:preferencias` em Local Storage. Ela deve conter apenas a preferência de tema.

A persistência depende do mesmo protocolo, host e porta, e da permissão do navegador para armazenar dados. Limpar os dados do site remove a preferência.

## Revisão de validação e navegação

Adicionei regras para rejeitar nome, cidade e endereço compostos apenas por espaços, conferir o tamanho do nome após `trim()` e impedir nascimento futuro. O formulário usa `setCustomValidity()`, `reportValidity()` e listeners delegados de `input`, `change`, `focusout`, `invalid` (em captura) e `submit`.

Os erros aparecem junto aos campos com `aria-describedby`, `aria-invalid` e as classes `campo-erro`/`campo-sucesso`. As orientações já existentes são preservadas. Alterar um campo remove a confirmação anterior. A mensagem de falha de rede foi traduzida e o título muda quando há erro de navegação.

Consulte `VALIDACAO.md` para resultados e limitações. Para executar os testes simulados com Node.js, abra um terminal na pasta `testes` e execute `node validar-spa.mjs`, `node preferencias.mjs` e `node componentes.mjs`. Esses testes não utilizam um navegador real.
