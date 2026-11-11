(()=>{'use strict';
const date=document.getElementById('editionDate');if(date){date.textContent=new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date());}
const links=[...document.querySelectorAll('.mobile-dock a[data-nav]')],targets=links.map(a=>document.getElementById(a.dataset.nav)).filter(Boolean);
const activate=id=>links.forEach(a=>{if(a.dataset.nav===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])activate(visible[0].target.id)},{rootMargin:'-12% 0px -55% 0px',threshold:[0,.12,.3]});targets.forEach(t=>obs.observe(t));}
links.forEach(a=>a.addEventListener('click',()=>activate(a.dataset.nav)));
const toggle=document.getElementById('mobileFontToggle'),panel=document.getElementById('mobileFontPanel');
if(toggle&&panel){const close=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false')};toggle.addEventListener('click',()=>{const open=panel.hidden;panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open))});
for(const [proxy,original] of [['mobileFontDown','fontSmaller'],['mobileFontDefault','fontReset'],['mobileFontUp','fontLarger']])document.getElementById(proxy)?.addEventListener('click',()=>document.getElementById(original)?.click());
document.addEventListener('click',e=>{if(!panel.hidden&&!panel.contains(e.target)&&e.target!==toggle)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});}
})();