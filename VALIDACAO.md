# Validação da SPA

## Método e limite

Foram executados testes de lógica em Node.js com DOM, eventos e respostas de rede simulados. Não havia navegador instalado neste ambiente: o console do navegador, painel de rede, breakpoints do Debugger e testes visuais não foram utilizados. Os resultados não representam validação exaustiva em navegador.

## Problemas identificados e corrigidos

| Problema identificado na revisão | Diagnóstico | Correção |
| --- | --- | --- |
| Campos de texto aceitavam somente espaços | `required` não remove espaços; `minlength` conta os espaços | `trim()` e `setCustomValidity()` em nome, endereço e cidade |
| Nascimento podia ser futuro | Ausência de limite adicional para o campo date | Comparação com a data local atual |
| Confirmação permanecia após nova edição | Existia listener apenas para submit | Remoção de `data-feedback` nos eventos input/change e em falhas de validação |
| Erros dependiam apenas do aviso nativo | Ausência de mensagem persistente junto ao campo | Mensagem inline, classes de erro/sucesso e associação por ARIA |
| Falha de fetch mostrava mensagem técnica | Exibição direta de TypeError.message | Mensagem em português e atualização do título da tela de erro |

## Resultados executados

`testes/validar-spa.mjs`: 23 verificações aprovadas. Incluem nomes inválidos e corrigidos, cidade vazia após trim, nascimento futuro/passado, remoção de confirmação antiga, mensagens inline, atributos ARIA, ausência de duplicação de sucesso, formatos de CPF/telefone/CEP, carregamento inicial, rota inexistente, rejeição de rede, HTTP 404, HTML sem main, recuperação, preservação do DOM na navegação entre âncoras e proteção contra resposta atrasada.

Os testes de preferências aprovaram serialização/restauração JSON, alternância, dados inválidos, sincronização simulada entre abas e armazenamento bloqueado. Os testes de componentes aprovaram textos, links e substituição dos seis cards sem duplicação.

As proteções de navegação contra respostas antigas e armazenamento inválido já existiam; foram verificadas, não descobertas como bugs nesta revisão. Testes de formato não verificam a autenticidade do CPF, telefone ou CEP.

## Conferência ainda necessária no navegador

Abra `html/index.html` pelo Live Server. Com o console e a aba de rede abertos, confira navegação rápida, Voltar/Avançar, recarga, menu mobile, foco por teclado e os dois temas. Simule Offline na aba de rede depois do carregamento inicial e acesse uma rota diferente; reative a conexão e repita o acesso pelo menu. Se a página já estiver em cache, desative o cache durante o teste.

No formulário, teste campos vazios, espaços, formatos incorretos, data futura, correção de erros e edição após sucesso. Use breakpoints em `validarCampo()`, no tratamento de submit e no catch de `renderizar()` para acompanhar valores e fluxo. Essas etapas são instruções pendentes, não registros de sessões realizadas.
