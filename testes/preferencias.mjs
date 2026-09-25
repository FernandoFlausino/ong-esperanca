import assert from 'node:assert/strict';
import { lerPreferencias, salvarPreferencias, iniciarPreferencias } from '../js/modules/preferencias.js';
const chave='ong-esperanca:preferencias';
const itens=new Map();
globalThis.localStorage={getItem:k=>itens.get(k)??null,setItem:(k,v)=>itens.set(k,v)};
assert.deepEqual(lerPreferencias(),{tema:'claro'});
assert(salvarPreferencias({tema:'escuro',cpf:'não deve salvar'}));
assert.equal(itens.get(chave),'{"tema":"escuro"}');
assert.deepEqual(lerPreferencias(),{tema:'escuro'});
for(const valor of ['{','null','[]','{"tema":"invalido"}']){
 itens.set(chave,valor);assert.deepEqual(lerPreferencias(),{tema:'claro'});
}
const classes=new Set();const callbacks={};const eventos={};
const botao={dataset:{},setAttribute:(k,v)=>botao[k]=v,addEventListener:(k,f)=>callbacks[k]=f};
const status={textContent:''};
globalThis.document={querySelector:s=>s==='#alternar-tema'?botao:status,body:{classList:{toggle:(k,v)=>v?classes.add(k):classes.delete(k),contains:k=>classes.has(k)}}};
globalThis.window={addEventListener:(k,f)=>eventos[k]=f};
salvarPreferencias({tema:'escuro'});iniciarPreferencias();
assert(classes.has('tema-escuro'));assert.equal(botao['aria-pressed'],'true');
callbacks.click();assert(!classes.has('tema-escuro'));assert.equal(lerPreferencias().tema,'claro');
callbacks.click();assert(classes.has('tema-escuro'));assert.equal(lerPreferencias().tema,'escuro');
itens.clear();eventos.storage({key:null});assert(!classes.has('tema-escuro'));
localStorage.setItem=()=>{throw Error('bloqueado')};callbacks.click();assert(classes.has('tema-escuro'));assert(status.textContent.includes('Não foi possível'));
localStorage.getItem=()=>{throw Error('bloqueado')};assert.equal(lerPreferencias().tema,'claro');
console.log('OK: gravação JSON, restauração, alternância, dados inválidos, sincronização e armazenamento bloqueado.');
