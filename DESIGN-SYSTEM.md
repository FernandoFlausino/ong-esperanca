# Design System — ONG Esperança

## Organização

O `:root` de `css/style.css` é a fonte central dos tokens. A paleta mantém as cores originais. Os nomes descrevem a função: texto, superfície, borda, interação e estado. Aliases como `--color-button-background` apontam para a paleta usando `var()`, evitando repetir valores.

## Mapa de componentes

| Componente / seletor | Tokens e uso |
| --- | --- |
| Botões, `.botao`, links de ação e `.toast-demo > summary` | `--color-button-background` (fundo), `--color-button-text` (texto), `--color-button-hover` (hover), `--color-focus` (foco) |
| `button:disabled` | `--color-button-disabled-background` e `--color-button-disabled-text` |
| Links `a` e `a:hover` | `--color-link` e `--color-link-hover`; links de menu e contato usam suas cores de contexto |
| Cards `article` | `--color-surface` (fundo), `--color-border` (borda), `--color-secondary` (borda superior), `--color-text-muted` (parágrafo), `--sombra` |
| `.alerta-info` | `--color-info` e `--color-info-surface` |
| `.alerta-sucesso` | `--color-success` e `--color-success-surface` |
| `.alerta-erro` | `--color-danger` e `--color-danger-surface`; borda lateral tracejada |
| Texto de alertas | `--color-text`; título e ícone herdam a cor do estado |
| Campos do formulário | `--color-surface`, `--color-text`, `--color-input-border`; `--color-success` / `--color-danger` na validação |
| Foco e erro em campos | `--color-focus`, `--color-focus-ring`, `--color-danger-ring` |
| `.toast` | `--color-surface`, `--color-text`, `--color-border`, `--color-success` e `--sombra` |

## Papéis tipográficos

| Papel | Token | Tamanho padrão / uso |
| --- | --- | --- |
| Título principal | `--font-size-h1` | 3rem; 2rem abaixo de 768px |
| Título de seção | `--font-size-h2` | 2rem |
| Subtítulo | `--font-size-h3` | 1.25rem |
| Corpo e controles | `--font-size-body` | 1rem; controles herdam com `font: inherit` |
| Legenda / texto auxiliar | `--font-size-caption` | 0.875rem; `small` e `.badge` |
| Marca | `--font-size-brand` | 1.25rem; usa o tamanho de corpo até 480px |
| Título de grupo do formulário | `--font-size-legend` | 1.25rem; `legend` |
| Título da notificação | `--font-size-notification-title` | 1.25rem |
| Ícones | `--font-size-icon` / `--font-size-icon-large` | 1.25rem / 2rem |

A família está em `--font-family-body`; entrelinhas em `--line-height-body`, `--line-height-heading` e `--line-height-caption`. O peso de destaque está em `--font-weight-strong`. Tamanhos iguais podem ter papéis distintos: alterar o título não deve alterar o ícone.

## Inventário completo do :root

Valores abaixo correspondem ao CSS entregue. Cores `on-dark` são para texto sobre fundos escuros; `surface` representa o fundo dos componentes. As superfícies dos estados preservam as cores já usadas pelo projeto.

| Token | Valor / referência |
| --- | --- |
| `--color-primary` | `#17645F` |
| `--color-primary-dark` | `#123C3A` |
| `--color-primary-light` | `#DFF2EE` |
| `--color-secondary` | `#D95745` |
| `--color-secondary-dark` | `#A93629` |
| `--color-text` | `#19302F` |
| `--color-text-muted` | `#58706E` |
| `--color-surface` | `#FFFFFF` |
| `--color-surface-muted` | `#F1F7F5` |
| `--color-border` | `#C9DCD8` |
| `--color-success` | `#2E7D32` |
| `--color-danger` | `#C62828` |
| `--color-on-dark` | `#FFFFFF` |
| `--color-heading` | `var(--color-primary-dark)` |
| `--color-link` | `var(--color-primary)` |
| `--color-link-hover` | `var(--color-secondary-dark)` |
| `--color-focus` | `var(--color-primary)` |
| `--color-input-border` | `var(--color-text-muted)` |
| `--color-button-background` | `var(--color-secondary-dark)` |
| `--color-button-hover` | `var(--color-primary-dark)` |
| `--color-button-text` | `var(--color-on-dark)` |
| `--color-button-disabled-background` | `var(--color-border)` |
| `--color-button-disabled-text` | `var(--color-text-muted)` |
| `--color-info` | `var(--color-primary)` |
| `--color-info-surface` | `var(--color-primary-light)` |
| `--color-success-surface` | `var(--color-surface-muted)` |
| `--color-danger-surface` | `var(--color-surface)` |
| `--color-focus-ring` | `rgba(23, 100, 95, 0.20)` |
| `--color-danger-ring` | `rgba(198, 40, 40, 0.15)` |
| `--font-family-body` | `Arial, Helvetica, sans-serif` |
| `--line-height-body` | `1.6` |
| `--line-height-heading` | `1.2` |
| `--line-height-caption` | `1.5` |
| `--font-weight-strong` | `bold` |
| `--font-size-brand` | `1.25rem` |
| `--font-size-icon` | `1.25rem` |
| `--font-size-icon-large` | `2rem` |
| `--font-size-legend` | `1.25rem` |
| `--font-size-notification-title` | `1.25rem` |
| `--font-size-caption` | `0.875rem` |
| `--font-size-body` | `1rem` |
| `--font-size-h3` | `1.25rem` |
| `--font-size-h2` | `2rem` |
| `--font-size-h1` | `3rem` |
| `--espaco-1` | `0.25rem` |
| `--espaco-2` | `0.5rem` |
| `--espaco-3` | `1rem` |
| `--espaco-4` | `1.5rem` |
| `--espaco-5` | `2rem` |
| `--espaco-6` | `3rem` |
| `--shadow-button-hover` | `0 4px 10px rgba(0, 0, 0, 0.20)` |
| `--raio` | `0.5rem` |
| `--largura-maxima` | `1200px` |
| `--sombra` | `0 4px 16px rgba(18, 60, 58, 0.12)` |
| `--transicao` | `0.3s ease` |

## Como verificar e manter

1. Abra `html/index.html` pelo Live Server e navegue pelas telas Início, Projetos, Cadastro e Componentes.
2. Inspecione um componente nas ferramentas do desenvolvedor e localize o `var(--token)` correspondente ao mapa.
3. Edite temporariamente `--color-button-background` no `:root`: os botões de ação e o controle da notificação devem acompanhar a mudança.
4. Edite `--font-size-h2`: títulos de seção devem mudar; ícones mantêm seus tokens próprios.
5. Verifique h1 com largura de 375px e 1024px: o token assume 2rem e 3rem, respectivamente. Os dois primeiros intervalos responsivos redefinem esse token.
6. Em `cadastro.html`, preencha e deixe um campo válido ou inválido para conferir os estados nativos. Em `componentes.html`, confira os três alertas e a notificação.
7. Ao adicionar uma cor ou papel, defina o token no `:root`, use `var()` no componente e atualize este mapa. Evite valores de cor soltos nas regras.

As cores e a tipografia usam os tokens documentados. Nesta etapa, os arquivos foram reorganizados e os cards passaram a ser renderizados por JavaScript. Os passos acima orientam a inspeção manual do Design System.

## Tema escuro

O bloco `body.tema-escuro` em `css/style.css` redefine os tokens de texto, superfície, borda, links, foco e estados. Os valores do inventário principal correspondem ao tema claro. O tema escuro utiliza texto `#EAF4F1`, fundo `#142522`, superfície suave `#1D332E`, links `#8CDBCA`, sucesso `#91DEA0` e erro `#FFABAB`.

O botão `#alternar-tema` fica fora da div substituída pelo roteador. O módulo `js/modules/preferencias.js` aplica a classe no `body` e restaura a escolha salva no carregamento inicial.
