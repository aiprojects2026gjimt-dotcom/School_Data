/* Non-blocking accessible notifications for GJIMT actions. */
(function(){
const host=document.createElement('div');host.id='gjimtToastHost';host.setAttribute('aria-live','polite');host.setAttribute('aria-atomic','false');document.body.appendChild(host);
window.gjimtNotify=function(message,type='info',duration=4500){
 const el=document.createElement('div');el.className='gjimt-toast '+type;el.setAttribute('role',type==='error'?'alert':'status');
 const symbol=document.createElement('span');symbol.className='gjimt-toast-icon';symbol.textContent=type==='success'?'✓':type==='error'?'!':'ℹ';
 const label=document.createElement('span');label.textContent=String(message);
 const close=document.createElement('button');close.type='button';close.className='gjimt-toast-close';close.textContent='×';close.setAttribute('aria-label','Dismiss notification');close.onclick=()=>el.remove();
 el.append(symbol,label,close);host.append(el);while(host.children.length>4)host.firstChild.remove();
 if(duration>0)setTimeout(()=>el.remove(),duration);return el;
};
window.addEventListener('error',e=>{if(e.message)window.gjimtNotify('Unexpected page error: '+e.message,'error',7000);});
})();
