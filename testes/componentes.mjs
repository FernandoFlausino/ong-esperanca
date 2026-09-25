import assert from 'node:assert/strict';
class Element {
 constructor(tag) { this.tagName=tag;this.children=[];this.dataset={};this.attributes={};this.classList={add:()=>{}}; }
 append(...children) { children.forEach(c=>this.children.push(...(c.tagName==='fragment'?c.children:[c]))); }
 replaceChildren(...children) {this.children=[];this.append(...children);}
 setAttribute(k,v) {this.attributes[k]=v;}
}
globalThis.document={createElement:tag=>new Element(tag),createDocumentFragment:()=>new Element('fragment')};
const {renderizarCards}=await import('../js/modules/componentes.js');
const {grupos}=await import('../js/modules/dados.js');
const containers=Object.keys(grupos).map(key=>{const c=new Element('div');c.dataset.cards=key;return c});
const root={querySelectorAll:()=>containers};
renderizarCards(root);renderizarCards(root);
for(const container of containers){
 assert.equal(container.children.length,3);
 container.children.forEach((card,i)=>{
  assert.equal(card.tagName,'article');
  assert.equal(card.children.find(c=>c.tagName==='h3').textContent,grupos[container.dataset.cards][i].nome);
  assert.equal(card.children.find(c=>c.tagName==='a').href,'#cadastro/participacao');
 });
}
console.log('OK: geração dos 6 cards, textos, links e substituição sem duplicação.');
