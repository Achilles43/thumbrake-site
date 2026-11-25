/* tb.js — Thumbrake shared behaviour: menu, tracking, lead forms, video sound, reveal */
(function(){
window.dataLayer=window.dataLayer||[];
window.tbTrack=function(ev,p){try{var o={event:ev};for(var k in p||{})o[k]=p[k];dataLayer.push(o);if(window.fbq&&ev==='generate_lead')fbq('track','Lead');if(window.fbq&&ev==='contact_click')fbq('track','Contact')}catch(e){}};
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'',m=null;
 if(/wa\.me|whatsapp/i.test(h))m='whatsapp';else if(/t\.me\//i.test(h))m='telegram';else if(/^tel:/i.test(h))m='phone';else if(/^mailto:/i.test(h))m='email';
 if(m)tbTrack('contact_click',{method:m,link_url:h})},true);

/* mobile menu */
var b=document.querySelector('.burger');
if(b){b.addEventListener('click',function(e){e.stopPropagation();var o=document.body.classList.toggle('menu-open');b.setAttribute('aria-expanded',o)});
 document.addEventListener('click',function(e){if(!e.target.closest('.nav'))document.body.classList.remove('menu-open')});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')document.body.classList.remove('menu-open')})}

/* video: sound toggle, play when visible */
document.querySelectorAll('.phone').forEach(function(ph){var v=ph.querySelector('video'),s=ph.querySelector('.snd');if(!v)return;
 if(s)s.addEventListener('click',function(){var on=v.muted;document.querySelectorAll('.phone video').forEach(function(x){if(x!==v){x.muted=true;var bs=x.parentNode.querySelector('.snd');if(bs)bs.textContent='🔊 ხმით ნახვა'}});
  v.muted=!on;if(on){v.currentTime=0;v.play()}s.textContent=on?'🔇 ხმის გამორთვა':'🔊 ხმით ნახვა';if(on)tbTrack('video_sound',{video:v.dataset.name||''})});
 if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.35}).observe(v)}});

/* reveal on scroll */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px'});
 document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)})}else document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')});

/* lead forms */
var WORKER='https://snowy-fire-6121.kvaratskhelia-giorgi777.workers.dev';
window.tbSend=function(rec){try{fetch(WORKER+'/offer',{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain'},body:JSON.stringify(rec)}).catch(function(){})}catch(e){}};
window.tbContact=function(c){c=(c||'').trim();var mail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c),tel=/^[+\d][\d\s()-]{6,}$/.test(c);return {ok:mail||tel,email:mail?c:'',phone:tel?c:''}};
document.querySelectorAll('form.lf[data-src]').forEach(function(f){var h=f.querySelector('.hint');
 f.addEventListener('submit',function(e){e.preventDefault();var E=f.elements,name=E.name.value.trim(),c=tbContact(E.contact.value),biz=E.biz?E.biz.value.trim():'',sel=E.q?E.q.options[E.q.selectedIndex].text:'';
  if(!name||!c.ok){h.textContent='შეიყვანე სახელი და სწორი ტელეფონი ან მეილი.';h.style.color='#FF8F8F';return}
  var src=f.dataset.src;
  tbSend({lang:'ka',name:name,email:c.email,phone:c.phone,business:biz,url:location.href,answers:{industry:biz,goal:src,website:sel,needs:[src]},services:['[Thumbrake] '+src],summaryEn:'Thumbrake lead — '+src+(sel?' — '+sel:''),summaryKa:'Thumbrake ლიდი — '+src+(sel?' — '+sel:'')});
  tbTrack('generate_lead',{form:src});f.classList.add('done')})});
})();
