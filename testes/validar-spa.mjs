import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
let checks=0;
function ok(value,label){assert(value,label);checks++;console.log('OK:',label)}
const eventos={};const ids=new Map();
class El {
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.attrs={};this.dataset={};this.value='';this.type='text';this.error='';this.required=false;const classes=new Set();this.classList={add:(...c)=>c.forEach(x=>classes.add(x)),toggle:(k,v)=>v?classes.add(k):classes.delete(k),contains:k=>classes.has(k)};}
 set id(v){this._id=v;ids.set(v,this)}get id(){return this._id}
 setAttribute(k,v){this.attrs[k]=v}getAttribute(k){return this.attrs[k]??null}hasAttribute(k){return k in this.attrs}removeAttribute(k){delete this.attrs[k]}
 append(...x){x.forEach(c=>{this.children.push(c);c.parent=this})}replaceChildren(...x){this.children=[];this.append(...x)}
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(c=>c!==this);ids.delete(this.id)}
 insertAdjacentElement(_,el){this.form.append(el)}
 querySelector(s){return s==='[data-feedback]'?this.children.find(c=>'feedback' in c.dataset):s==='main'?this.children.find(c=>c.tagName==='MAIN'):null}
 querySelectorAll(){return []} focus(){}scrollIntoView(){}
 setCustomValidity(s){this.error=s}get validity(){return {valid:!this.error&&!(this.required&&!this.value)}}get validationMessage(){return this.error||(!this.value?'Preencha este campo.':'')}
}
globalThis.Element=El;
globalThis.document={createElement:t=>new El(t),getElementById:id=>ids.get(id),querySelector:s=>ids.get(s.slice(1)),querySelectorAll:()=>[],importNode:n=>n,addEventListener:(k,f)=>{(eventos[k]??=[]).push(f)},title:''};
globalThis.window={addEventListener:(k,f)=>{(eventos[k]??=[]).push(f)}};
globalThis.location={hash:'#inicio'};
globalThis.DOMParser=class{parseFromString(s){return {title:s.includes('cadastro')?'Cadastro':'Página',querySelector:()=>s.includes('<main')?new El('main'):null}}};
const tick=()=>new Promise(r=>setTimeout(r,0));
const fire=(k,target)=>{for(const f of eventos[k]??[])f({target,preventDefault(){}})};
const {validarCampo,iniciarFormulario}=await import('../js/modules/formulario.js');
const form=new El('form');form.id='form-cadastro';form.elements=[];form.reportValidity=()=>form.elements.every(c=>c.validity.valid);
function field(id,value,type='text'){const e=new El('input');e.id=id;e.value=value;e.type=type;e.form=form;form.elements.push(e);return e}
const nome=field('nome','   ');ok(!validarCampo(nome),'nome somente espaços rejeitado');nome.value=' A ';ok(!validarCampo(nome),'nome curto após trim rejeitado');nome.value='Ana';ok(validarCampo(nome),'nome válido após correção');
const cidade=field('cidade','  ');ok(!validarCampo(cidade),'cidade somente espaços rejeitada');cidade.value='Criciúma';
const nasc=field('nascimento','9999-12-31','date');ok(!validarCampo(nasc),'nascimento futuro rejeitado');nasc.value='2000-01-01';ok(validarCampo(nasc),'nascimento passado aceito');
iniciarFormulario();fire('submit',form);ok(!!form.querySelector('[data-feedback]'),'confirmação após preenchimento válido');
nome.value=' ';fire('input',nome);ok(!form.querySelector('[data-feedback]'),'edição remove confirmação anterior');fire('focusout',nome);ok(nome.getAttribute('aria-invalid')==='true'&&!!ids.get('erro-nome'),'erro inline e aria-invalid');
nome.value='Ana';fire('input',nome);ok(!ids.get('erro-nome')&&nome.classList.contains('campo-sucesso'),'correção remove erro e aplica sucesso');fire('submit',form);fire('submit',form);ok(form.children.filter(c=>'feedback'in c.dataset).length===1,'sucesso não duplica');
const html=await readFile('../html/cadastro.html','utf8');
for(const [id,valid,invalid] of [['cpf','123.456.789-00','12345678900'],['telefone','(48) 99999-9999','48999999999'],['cep','88800-000','88800000']]){
 const tag=html.match(new RegExp('<input\\s[^>]*id="'+id+'"[^>]*>'))[0];const exp=new RegExp('^(?:'+tag.match(/pattern="([^"]+)"/)[1]+')$');ok(exp.test(valid)&&!exp.test(invalid),`RegEx ${id}: formato válido/inválido`);
}
const container=new El();container.id='conteudo-principal';const estado=new El();estado.id='estado-navegacao';
let modo='ok';let pending;
globalThis.fetch=async(url)=>{
 if(modo==='rede')throw new TypeError('Failed to fetch');
 if(modo==='404')return {ok:false};
 if(modo==='lento'){return await new Promise(r=>pending=r)}
 return {ok:true,text:async()=>modo==='sem-main'?'<p>erro</p>':`<main>${url}</main>`};
};
const {iniciarRoteador}=await import('../js/modules/roteador.js');iniciarRoteador();await tick();ok(container.children[0].tagName==='MAIN','carregamento inicial');
async function route(hash){location.hash=hash;fire('hashchange');await tick()}
await route('#desconhecida');ok(estado.textContent.includes('Página não encontrada'),'rota inexistente');
modo='rede';await route('#projetos');ok(estado.textContent.includes('Verifique a conexão'),'falha de rede em português');ok(container.attrs['aria-busy']==='false','busy encerrado após erro');
modo='404';await route('#cadastro');ok(estado.textContent.includes('Não foi possível'),'HTTP 404');
modo='sem-main';await route('#componentes');ok(estado.textContent.includes('conteúdo principal'),'HTML sem main');
modo='ok';await route('#cadastro');ok(document.title==='Cadastro','recuperação após erro');const main=container.children[0];await route('#cadastro/participacao');ok(container.children[0]===main,'âncora na mesma tela preserva DOM');
modo='lento';await route('#projetos');modo='ok';await route('#componentes');const current=container.children[0];pending({ok:true,text:async()=>'<main>cadastro</main>'});await tick();ok(container.children[0]===current,'resposta atrasada não substitui tela atual');
console.log(`TOTAL: ${checks} verificações em ambiente simulado. Não substituem testes de navegador.`);
