/* plan.js — „უფასო გეგმა 2 წუთში“: 5 questions → contact → personal plan (Georgian templates, no AI) */
(function(){
var root=document.getElementById('pq');if(!root)return;
var Q=[
 {id:'need',t:'რა გჭირდება ყველაზე მეტად?',sub:'აირჩიე ერთი — დანარჩენს გეგმაში დავამატებთ.',o:[['shop','🛒','ონლაინ მაღაზია ან საიტი'],['ads','📈','მეტი კლიენტი რეკლამით'],['video','🎬','ვიდეო რეკლამა სოციალურ ქსელებში'],['unsure','🤔','არ ვიცი — მირჩიეთ']]},
 {id:'ind',t:'რა სფეროში ხარ?',sub:'გეგმას შენს ბიზნესზე მოვარგებთ.',o:[['fashion','👗','ტანსაცმელი, აქსესუარები'],['beauty','💄','კოსმეტიკა, სილამაზე'],['food','🍽️','კვება, რესტორანი, კაფე'],['realty','🏢','უძრავი ქონება, დეველოპმენტი'],['service','🩺','სერვისი, კლინიკა, განათლება'],['other','✨','სხვა']]},
 {id:'site',t:'ახლა საიტი გაქვს?',sub:'',o:[['none','○','არა, ნულიდან ვიწყებ'],['social','📱','მხოლოდ Instagram / Facebook'],['weak','⚠️','კი, მაგრამ არ ყიდის'],['good','✅','კი, კარგად მუშაობს']]},
 {id:'adsnow',t:'რეკლამას ახლა როგორ აკეთებ?',sub:'',o:[['no','○','ჯერ არ ვაკეთებ'],['boost','👆','პოსტებს ვაბუსტებ'],['self','🛠️','კამპანიებს თავად ვმართავ'],['agency','🤝','სხვა მართავს — შედეგი არ მაკმაყოფილებს']]},
 {id:'budget',t:'თვეში რამდენის დახარჯვა შეგიძლია რეკლამაზე?',sub:'ეს მხოლოდ სარეკლამო ბიუჯეტია (Meta / Google) — ჩვენი მომსახურება ცალკეა.',o:[['b1','·','500₾-მდე'],['b2','··','500 – 1 500₾'],['b3','···','1 500 – 5 000₾'],['b4','····','5 000₾-ზე მეტი'],['b0','?','ჯერ არ ვიცი']]}
];
var IND={fashion:'ტანსაცმელსა და აქსესუარებში ყიდვის გადაწყვეტილებას ვიზუალი იღებს — საჭიროა სწრაფი მობილური მაღაზია, მარტივი გადახდა და ვიდეოები, რომლებიც პროდუქტს მოძრაობაში აჩვენებს.',
 beauty:'კოსმეტიკაში ნდობა ყველაფერია — შედეგის ჩვენება ვიდეოთი, მკაფიო შეთავაზება და ხელახალი შეძენისთვის რემარკეტინგი ყველაზე მეტს იძლევა.',
 food:'კვებაში გადაწყვეტილება წამებში მიიღება — ლოკაციაზე მიზნობრივი რეკლამა, მადისაღმძვრელი მოკლე ვიდეო და მარტივი შეკვეთა ან ჯავშანი.',
 realty:'უძრავ ქონებაში ყიდვას თვეები სჭირდება — მთავარია, ხარისხიანი ლიდები, CRM-თან დაკავშირებული ტრეკინგი და რეკლამა, რომელიც სწავლობს, ვინ ყიდულობს რეალურად.',
 service:'სერვისში კლიენტი ჯერ ნდობას ეძებს — მკაფიო საიტი, მარტივი ჯავშანი და რეკლამა, რომელიც სწორ ადამიანს სწორ მომენტში აჩვენებს შენს შეთავაზებას.',
 other:'ნებისმიერ ბიზნესში ფორმულა იგივეა — ადამიანმა უნდა გაჩეროს სქროლი, გაიგოს შეთავაზება და მარტივად გიყიდოს.'};
var SV={
 shop:{t:'ონლაინ მაღაზია',d:'დიზაინი, ბარათით გადახდა, მიწოდება, მობილური ვერსია და ტრეკინგი — მზადაა 14 დღეში.',p:'2 000₾-დან',u:'/online-shop/'},
 fix:{t:'საიტის გამართვა გაყიდვისთვის',d:'სისწრაფე, checkout, ტრეკინგი და გვერდები, რომლებიც ვიზიტორს მყიდველად აქცევს.',p:'შეფასების შემდეგ',u:'/online-shop/'},
 track:{t:'ტრეკინგის აწყობა',d:'GA4, Meta Pixel და Conversions API — რომ იცოდე, რომელი რეკლამა ყიდის.',p:'600₾-დან',u:'/advertising/'},
 ads:{t:'Meta და Google რეკლამა',d:'კამპანიების აწყობა, კრეატივების ტესტი, ყოველკვირეული ოპტიმიზაცია და გასაგები რეპორტი.',p:'1 500₾/თვე-დან',u:'/advertising/'},
 audit:{t:'რეკლამის უფასო აუდიტი',d:'ვნახავთ, სად იკარგება ბიუჯეტი და რა უნდა გასწორდეს პირველ რიგში.',p:'უფასო',u:'/advertising/'},
 video:{t:'ვიდეო რეკლამა',d:'მოკლე ვიდეოები ქართული გახმოვანებით, პირველი 3 წამის ჰუკით — Reels, Stories, TikTok.',p:'ფასი შეთანხმებით',u:'/video-ads/'},
 start:{t:'სატესტო კამპანია',d:'მცირე ბიუჯეტით ვამოწმებთ, რომელი მესიჯი და აუდიტორია მუშაობს, მერე ვზრდით.',p:'1 500₾/თვე-დან',u:'/advertising/'}
};
var KEY='tb_plan',S={step:0,A:{},done:false};
try{var sv=JSON.parse(localStorage.getItem(KEY)||'null');if(sv&&sv.A)S=sv}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function plan(A){var L=[],add=function(k){if(L.indexOf(k)<0)L.push(k)};
 var noSite=A.site==='none'||A.site==='social';
 if(A.need==='shop'){add(noSite?'shop':'fix');add('track');add(A.budget==='b1'||A.budget==='b0'?'start':'ads')}
 else if(A.need==='ads'){if(A.adsnow==='agency'||A.adsnow==='self')add('audit');if(noSite)add('shop');else if(A.site==='weak')add('fix');add('track');add('ads')}
 else if(A.need==='video'){add('video');add(A.adsnow==='self'||A.adsnow==='agency'?'audit':'start');if(noSite)add('shop')}
 else{if(noSite)add('shop');else if(A.site==='weak')add('fix');else add('audit');add('video');add('ads')}
 if(L.length<3&&L.indexOf('video')<0)add('video');
 return L.slice(0,3)}
function label(q,v){var o=Q.filter(function(x){return x.id===q})[0].o.filter(function(x){return x[0]===v})[0];return o?o[2]:''}
function summary(A,L){var first=SV[L[0]].t;
 var s=IND[A.ind]||IND.other;
 var b={b1:' შენი ბიუჯეტით ჯერ ერთ არხზე და ერთ მთავარ შეთავაზებაზე ფოკუსირება ჯობს.',b2:' ეს ბიუჯეტი საკმარისია 2–3 კრეატივის ტესტისთვის და პირველი შედეგებისთვის.',b3:' ამ ბიუჯეტით შეგვიძლია Meta და Google ერთად ვამუშაოთ და ვიდეოების რამდენიმე ვერსია ვატესტოთ.',b4:' ამ მასშტაბზე ზუსტი ტრეკინგი და კრეატივების მუდმივი განახლება ყველაზე სწრაფად ანაზღაურდება.',b0:' ბიუჯეტს ზარზე ერთად დავთვლით — მიზნიდან უკუღმა.'}[A.budget]||'';
 return s+' პირველი ნაბიჯი: '+first+'.'+b}
var prog=document.getElementById('pq-prog'),box=document.getElementById('pq-box');
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(dir){var n=Q.length+1;prog.style.width=(S.done?100:Math.round(S.step/n*100))+'%';var h='';
 if(S.done)return renderRes();
 if(S.step<Q.length){var q=Q[S.step];
  h='<div class="pq-step"><div class="k">კითხვა '+(S.step+1)+' / '+Q.length+'</div><h2>'+q.t+'</h2>'+(q.sub?'<p class="sub">'+q.sub+'</p>':'<p class="sub"></p>')+'<div class="opts">'+q.o.map(function(o){return '<button type="button" class="opt'+(S.A[q.id]===o[0]?' on':'')+'" data-v="'+o[0]+'"><span class="e">'+o[1]+'</span>'+o[2]+'</button>'}).join('')+'</div>'+
   '<div class="pq-nav">'+(S.step?'<button type="button" class="lnk" data-back>← უკან</button>':'<span></span>')+(S.A[q.id]?'<button type="button" class="btn p" data-next>შემდეგი →</button>':'')+'</div></div>'}
 else{h='<div class="pq-step"><div class="k">ბოლო ნაბიჯი</div><h2>სად გამოგიგზავნოთ გეგმა?</h2><p class="sub">გეგმას ახლავე ნახავ ეკრანზე — ასლს კი დაგიკავშირდებით და ზარზე განვიხილავთ. ნომერს არავის გადავცემთ.</p>'+
  '<form class="lf" id="pqf" novalidate><div class="fi" style="display:grid;gap:12px"><label><span>შენი სახელი</span><input name="name" autocomplete="name" value="'+esc(S.c&&S.c.name||'')+'"></label><label><span>ტელეფონი ან მეილი</span><input name="contact" autocomplete="tel" value="'+esc(S.c&&S.c.contact||'')+'"></label><label><span>ბიზნესის სახელი ან Instagram <small style="text-transform:none;letter-spacing:0">(არასავალდებულო)</small></span><input name="biz" placeholder="მაგ. @mybrand.ge" value="'+esc(S.c&&S.c.biz||'')+'"></label><button class="btn p" type="submit">ჩემი გეგმის ნახვა →</button><p class="hint">საკმარისია სახელი და ტელეფონი ან მეილი.</p></div></form>'+
  '<div class="pq-nav"><button type="button" class="lnk" data-back>← უკან</button><span></span></div></div>'}
 box.innerHTML=h;bind()}
function go(d){var st=box.querySelector('.pq-step');if(st){st.classList.add('out');setTimeout(function(){S.step=Math.max(0,Math.min(Q.length,S.step+d));save();render();window.scrollTo({top:root.offsetTop-90,behavior:'smooth'})},200)}else{S.step+=d;render()}}
function bind(){box.querySelectorAll('.opt').forEach(function(b){b.addEventListener('click',function(){var q=Q[S.step];if(S.step===0&&!S.started){S.started=1;tbTrack('quiz_start',{})}
  S.A[q.id]=b.dataset.v;save();box.querySelectorAll('.opt').forEach(function(x){x.classList.toggle('on',x===b)});setTimeout(function(){go(1)},260)})});
 var bk=box.querySelector('[data-back]');if(bk)bk.addEventListener('click',function(){go(-1)});
 var nx=box.querySelector('[data-next]');if(nx)nx.addEventListener('click',function(){go(1)});
 var f=document.getElementById('pqf');if(f){f.addEventListener('submit',function(e){e.preventDefault();var E=f.elements,c=tbContact(E.contact.value),name=E.name.value.trim(),h=f.querySelector('.hint');
  S.c={name:name,contact:E.contact.value.trim(),biz:E.biz.value.trim()};save();
  if(!name||!c.ok){h.textContent='შეიყვანე სახელი და სწორი ტელეფონი ან მეილი.';h.style.color='#FF8F8F';return}
  var L=plan(S.A),sum=summary(S.A,L);
  tbSend({lang:'ka',name:name,email:c.email,phone:c.phone,business:S.c.biz,url:location.href,answers:{industry:label('ind',S.A.ind),goal:label('need',S.A.need),website:label('site',S.A.site),ads:label('adsnow',S.A.adsnow)+' · '+label('budget',S.A.budget),needs:L.map(function(k){return SV[k].t})},services:L.map(function(k){return '[Thumbrake] '+SV[k].t}),summaryEn:'Thumbrake plan quiz',summaryKa:sum});
  tbTrack('generate_lead',{form:'plan_quiz',need:S.A.need,industry:S.A.ind,budget:S.A.budget});
  S.done=true;save();render()})}}
function renderRes(){var L=plan(S.A),sum=summary(S.A,L),nm=S.c&&S.c.name?S.c.name.split(' ')[0]:'';
 var wa='გამარჯობა! გეგმა ვნახე საიტზე. '+(nm?'მე ვარ '+nm+'. ':'')+'ვარ: '+label('ind',S.A.ind)+'. მჭირდება: '+L.map(function(k){return SV[k].t}).join(', ')+'.';
 box.innerHTML='<div class="pq-step res"><div class="k">შენი გეგმა</div><h2>'+(nm?esc(nm)+', ':'')+'აი, საიდან დავიწყებდით.</h2><div class="sum">'+sum+'</div>'+
  L.map(function(k,i){var s=SV[k];return '<div class="stp"><b class="nn">0'+(i+1)+'</b><div><h3>'+s.t+'</h3><p>'+s.d+' <a href="'+s.u+'">დეტალურად →</a></p></div><div class="pr">'+s.p+'</div></div>'}).join('')+
  '<p class="sub" style="margin:6px 0 0">ეს რეკომენდებული თანმიმდევრობაა — ყველაფერი ერთად არ გჭირდება. ზუსტ ფასს და ვადებს 15-წუთიან ზარზე შევთანხმდებით.</p>'+
  '<div class="ctas" style="margin-top:8px"><a class="btn wa" href="https://wa.me/995557077373?text='+encodeURIComponent(wa)+'" target="_blank" rel="noopener noreferrer">გეგმის განხილვა WhatsApp-ზე</a><a class="btn" href="tel:+995557077373">დარეკე: 557 07 73 73</a></div>'+
  '<div class="pq-nav"><button type="button" class="lnk" data-edit>← პასუხების შეცვლა</button><button type="button" class="lnk" data-reset>თავიდან დაწყება ↺</button></div></div>';
 prog.style.width='100%';
 box.querySelector('[data-edit]').addEventListener('click',function(){S.done=false;S.step=0;save();render()});
 box.querySelector('[data-reset]').addEventListener('click',function(){S={step:0,A:{},done:false};save();render()});
 tbTrack('quiz_complete',{plan:L.join(',')})}
render();
})();
