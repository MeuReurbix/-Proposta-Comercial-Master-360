(()=>{
const progress=document.getElementById('progress');const panes=[...document.querySelectorAll('.panel')];const presenter=document.getElementById('presentBtn');const indicator=document.getElementById('presentIndicator');const count=document.getElementById('slideCount');let active=0;
function meter(){const size=document.documentElement.scrollHeight-innerHeight;progress.style.width=(size?scrollY/size*100:0)+'%'}window.addEventListener('scroll',meter,{passive:true});meter();
function show(i){active=Math.max(0,Math.min(panes.length-1,i));panes.forEach((x,j)=>x.classList.toggle('active-slide',j===active));count.textContent=String(active+1).padStart(2,'0')+' / '+String(panes.length).padStart(2,'0');panes[active].scrollTop=0}
function toggle(){document.body.classList.toggle('presenting');let on=document.body.classList.contains('presenting');indicator.hidden=!on;presenter.textContent=on?'✕ Sair':'▣ Apresentação';if(on){active=Math.max(0,panes.findIndex(x=>x.getBoundingClientRect().top>=-90));show(active)}else{panes[active].scrollIntoView({behavior:'auto'})}}
presenter?.addEventListener('click',toggle);document.addEventListener('keydown',e=>{if(!document.body.classList.contains('presenting'))return;if(e.key==='Escape'){toggle();return}if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(active+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(active-1)}});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(document.body.classList.contains('presenting'))toggle()}));
})();

/* Aceite comercial em página estática: gera confirmação para envio MANUAL. */
(()=>{
 const form=document.getElementById('acceptForm'), result=document.getElementById('acceptResult');if(!form||!result)return;
 const output=document.getElementById('acceptText'),status=document.getElementById('acceptStatus');let confirmation='',accepted=false;
 document.querySelectorAll('a[data-after-accept]').forEach(a=>a.addEventListener('click',event=>{if(accepted)return;event.preventDefault();status.textContent='Confirme o aceite para liberar estes materiais.';document.getElementById('aceite').scrollIntoView({behavior:'smooth'});form.querySelector('input')?.focus({preventScroll:true});}));
 const ptStamp=()=>new Date().toLocaleString('pt-BR',{dateStyle:'full',timeStyle:'short'});
 const printProposal=()=>{if(document.body.classList.contains('presenting')) document.getElementById('presentBtn')?.click(); window.print()};
 form.addEventListener('submit',ev=>{ev.preventDefault();if(!form.reportValidity())return;
 const n=form.elements.responsavel.value.trim().replace(/\s+/g,' '),role=form.elements.cargo.value.trim().replace(/\s+/g,' ');
 if(n.length<5||role.length<2){status.textContent='Preencha nome completo e função.';return;}
 const stamp=ptStamp(),url=location.href.split('#')[0];
 confirmation='CONFIRMAÇÃO DE ACEITE COMERCIAL — MASTER 360°\nNome: '+n+'\nFunção: '+role+'\nEmpresa: Master Impermeabilização (razão social a confirmar)\nCNPJ informado: 42.383.542/0001-30\nData e hora declaradas pelo dispositivo: '+stamp+'\nProposta consultada: '+url+'\nDeclaro que li e concordo com as condições comerciais apresentadas na Proposta Master 360°: valor de R$ 9.900,00; compensação de R$ 3.500,00 mediante acordo escrito; saldo de R$ 6.400,00 em seis parcelas; gestão digital de R$ 1.800,00/mês somente se contratada por escrito após os primeiros 90 dias; comissão de 3% conforme o contrato, sobre valores brutos efetivamente recebidos de contratos públicos abrangidos. Autorizo a elaboração do Contrato de Prestação de Serviços, a ser formalizado antes do início dos trabalhos. Nenhuma cobrança automática está autorizada.\n\nEste texto foi preparado no navegador e será enviado manualmente pelo representante; não representa assinatura digital ou validação da identidade.';
 accepted=true;output.value=confirmation;result.hidden=false;form.hidden=true;status.textContent='Confirmação pronta. Compartilhe ou copie e envie ao consultor.';result.scrollIntoView({behavior:'smooth',block:'start'});
 });
 document.getElementById('shareAccept')?.addEventListener('click',async()=>{try{if(navigator.share){await navigator.share({title:'Aceite da proposta Master 360°',text:confirmation});status.textContent='Selecione o contato do consultor e conclua o envio no aplicativo escolhido. Este site não verifica o recebimento.';}else{output.focus();output.select();status.textContent='Compartilhamento não disponível. Copie o texto e envie ao consultor pelo WhatsApp ou e-mail.';}}catch(e){status.textContent='Compartilhamento não concluído. Use Copiar confirmação para enviar manualmente.';}});
 document.getElementById('copyAccept')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(confirmation);status.textContent='Texto copiado. Cole em uma mensagem para o consultor e envie.'}catch(e){output.focus();output.select();status.textContent='Selecione e copie o texto acima. Depois envie pelo canal combinado.'}});
 document.getElementById('printAfterAccept')?.addEventListener('click',printProposal);
})();
