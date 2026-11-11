(()=>{'use strict';
const $=id=>document.getElementById(id);
const formatDate=d=>{const x=new Date(d);return Number.isNaN(x.getTime())?'게시일 미상':new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(x)};
const setLoading=(host,count=4)=>{host.replaceChildren();for(let i=0;i<count;i++){const el=document.createElement('div');el.className='skeleton-story';el.innerHTML='<span class="skeleton-line"></span><span class="skeleton-line short"></span>';host.append(el)}};
let topReq=0;
async function topFive(){const status=$('topStatus'),host=$('topList');if(!status||!host)return;const request=++topReq;setLoading(host,5);status.textContent='5개 분야의 뉴스를 확인하고 있습니다…';const sectors=[['정치','politics'],['경제','economy'],['사회','society'],['국제','world'],['IT','technology']];const settled=await Promise.allSettled(sectors.map(async ([label,key])=>{const r=await fetch('/.netlify/functions/headlines?topic='+key,{cache:'no-store'});if(!r.ok)throw Error('뉴스 요청 실패');const data=await r.json();return{label,items:data.items||[]}}));if(request!==topReq)return;host.replaceChildren();const seen=new Set();let shown=0;for(let i=0;i<settled.length;i++){const res=settled[i];if(res.status!=='fulfilled')continue;const {label,items}=res.value;const item=items.find(x=>{if(!x.title||!x.link)return false;const k=x.title.replace(/\s+/g,' ').trim();if(seen.has(k))return false;seen.add(k);return true});if(!item)continue;shown++;const box=document.createElement('article');box.className='top-story';box.dataset.sector=label;const rank=document.createElement('span');rank.className='top-rank';rank.textContent=String(shown).padStart(2,'0');const content=document.createElement('div'),a=document.createElement('a'),meta=document.createElement('small'),tag=document.createElement('span');const photo=document.createElement('div'),photoImg=document.createElement('img'),photoTag=document.createElement('span');photo.className='story-media';photoImg.loading=shown===1?'eager':'lazy';photoImg.decoding='async';photoImg.referrerPolicy='no-referrer';const images={정치:'politics',경제:'economy',사회:'society',국제:'world',IT:'technology'};const fallback='/assets/editorial/'+(images[label]||'politics')+'.webp';const actualImage=typeof item.image==='string'&&/^https:\/\/[^\s]+$/i.test(item.image)?item.image:'';photoImg.src=actualImage||fallback;photoImg.alt=actualImage?'기사 이미지':'해당 뉴스 분야의 대표 사진';photoImg.addEventListener('error',()=>{if(photoImg.src!==new URL(fallback,location.href).href){photoImg.src=fallback;photoImg.alt='해당 뉴스 분야의 대표 사진';photoTag.textContent='분야 대표 사진';}});photoTag.className='photo-label';photoTag.textContent=actualImage?'기사 이미지':'분야 대표 사진';photo.append(photoImg,photoTag);content.className='top-content';tag.className='sector-label';tag.textContent=label;a.textContent=item.title;a.href=item.link;a.target='_blank';a.rel='noopener noreferrer';meta.textContent=(item.source||'뉴스')+' · '+formatDate(item.date);content.append(tag,a,meta);box.append(rank,photo,content);host.append(box)}status.textContent=shown?`오늘의 5개 분야 중 ${shown}개 분야 · 분야별 최신 1건`:'현재 표시할 기사가 없습니다. 새로고침을 눌러 다시 확인해 주세요.';}
if($('topRefresh'))$('topRefresh').onclick=topFive;topFive();
let topics=[];try{const saved=JSON.parse(localStorage.getItem('mynews365-custom-topics')||'[]');if(Array.isArray(saved))topics=saved.filter(x=>typeof x==='string').slice(0,20)}catch(e){}if(!topics.length)topics=['구미 도시숲','경북 녹지','구미 산업'];let selected=topics[0]||'';let requestId=0;function persist(){try{localStorage.setItem('mynews365-custom-topics',JSON.stringify(topics))}catch(e){}}function render(){const host=$('topicPills');if(!host)return;host.replaceChildren();topics.forEach(t=>{const wrap=document.createElement('span');wrap.className='pill';wrap.classList.toggle('is-active',t===selected);const b=document.createElement('button');b.type='button';b.textContent=t;b.classList.toggle('active',t===selected);b.setAttribute('aria-pressed',String(t===selected));b.onclick=()=>{selected=t;render();load()};const x=document.createElement('button');x.type='button';x.textContent='×';x.setAttribute('aria-label',t+' 삭제');x.onclick=()=>{topics=topics.filter(v=>v!==t);persist();if(selected===t)selected=topics[0]||'';render();load()};wrap.append(b,x);host.append(wrap)})}
let loadedItems=[], visibleCount=5, moreLoaded=false;
const TOPIC_BATCH=5,TOPIC_MAX=20;
const topicMore=$('topicMore');
function paintTopic(){
 const host=$('topicResults');host.replaceChildren();let displayed=0;
 for(const item of loadedItems.slice(0,visibleCount)){
  if(!item.title||!item.link)continue;displayed++;
  const li=document.createElement('li'),a=document.createElement('a'),meta=document.createElement('small'),body=document.createElement('div');
  li.className='topic-story';body.className='topic-story-body';a.textContent=item.title;a.href=item.link;a.target='_blank';a.rel='noopener noreferrer';meta.textContent=(item.source||'뉴스')+' · '+formatDate(item.date);body.append(a,meta);
  if(typeof item.image==='string'&&/^https:\/\/[^\s]+$/i.test(item.image)){
   const thumb=document.createElement('img');thumb.className='topic-story-thumb';thumb.src=item.image;thumb.loading='lazy';thumb.decoding='async';thumb.alt='기사 사진';thumb.referrerPolicy='no-referrer';thumb.addEventListener('error',()=>{thumb.remove();li.classList.add('no-photo')});li.append(thumb);
  }else li.classList.add('no-photo');li.append(body);host.append(li);
 }
 $('topicStatus').textContent=displayed?`「${selected}」 관련 최신 기사 ${displayed}건 · 최신순`:'검색어가 제목에 포함된 기사가 없습니다. 관련 없는 뉴스는 제외합니다.';
 topicMore.hidden=!displayed||visibleCount>=TOPIC_MAX||(moreLoaded&&loadedItems.length<=visibleCount);
 topicMore.textContent=`관련 뉴스 더 보기 (+${TOPIC_BATCH}건)`;
 topicMore.setAttribute('aria-expanded',String(visibleCount>5));
}
async function getTopic(limit,request,topic){
 const r=await fetch('/.netlify/functions/topic-news?q='+encodeURIComponent(topic)+'&limit='+limit,{cache:'no-store'});
 if(!r.ok)throw Error('뉴스 서버');const data=await r.json();
 if(request!==requestId||topic!==selected)return false;
 loadedItems=(Array.isArray(data.items)?data.items:[]).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)).slice(0,TOPIC_MAX);
 return true;
}
async function load(){
 const request=++requestId,topic=selected;
 loadedItems=[];visibleCount=5;moreLoaded=false;topicMore.hidden=true;
 const host=$('topicResults');if(!host)return;host.replaceChildren();
 if(!selected){$('topicHeading').textContent='관심 뉴스';$('topicStatus').textContent='키워드를 추가해 주세요.';return}
 $('topicHeading').textContent='「'+selected+'」 최신 뉴스';$('topicStatus').textContent='관련 기사를 찾는 중…';
 try{if(await getTopic(5,request,topic))paintTopic()}
 catch(e){if(request===requestId)$('topicStatus').textContent='뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'}
}
if(topicMore)topicMore.onclick=async()=>{
 const request=requestId,topic=selected;
 topicMore.disabled=true;
 const next=Math.min(TOPIC_MAX,visibleCount+TOPIC_BATCH);
 if(!moreLoaded){
  topicMore.textContent='추가 기사 불러오는 중…';
  try{if(!(await getTopic(TOPIC_MAX,request,topic)))return;moreLoaded=true}
  catch(e){if(request===requestId)$('topicStatus').textContent='추가 기사 연결이 원활하지 않습니다. 다시 눌러주세요.';topicMore.textContent='추가 기사 다시 시도';topicMore.disabled=false;return}
 }
 if(request!==requestId)return;
 visibleCount=next;paintTopic();topicMore.disabled=false;
};
$('addTopic').onclick=()=>{const t=$('topicInput').value.trim();if(!t||t.length>40||topics.length>=20)return;if(!topics.includes(t))topics.unshift(t);selected=t;persist();$('topicInput').value='';render();load()};$('topicInput').onkeydown=e=>{if(e.key==='Enter'){$('addTopic').click()}};$('refreshTopic').onclick=load;render();load();})();
