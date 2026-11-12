const {tag,rssPhoto,enrichArticles}=require('../lib/news-photo');
const TOPICS={gumi:'구미시',gyeongbuk:'경상북도',industry:'구미 반도체 로봇 산업',forest:'(구미 OR 경북) (공원 OR 도시숲 OR 녹지)',national:'대한민국 주요 뉴스',politics:'대한민국 정치 국회 정부',economy:'대한민국 경제 금융 기업',culture:'대한민국 문화 예술 공연 전시 축제',world:'국제 세계 외교 해외',technology:'IT 인공지능 반도체 기술'};
const NAVER_TOPICS=new Set(['politics','economy','culture','world','technology']);
const decode=s=>String(s||'').replace(/<[^>]+>/g,'').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
const json=(statusCode,payload)=>({statusCode,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store, max-age=0'},body:JSON.stringify(payload)});
const cleanText=s=>decode(String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));
const unique=(items)=>{const seen=new Set();return items.filter(item=>{const k=cleanText(item.title).replace(/\s+/g,' ').trim();if(!k||!item.link||seen.has(k))return false;seen.add(k);return true})};
const abs=(url,base)=>{try{const u=new URL(url,base);if(!/^https?:$/.test(u.protocol))return '';return u.href}catch{return ''}};
function parseKoreanDate(raw){
 const text=cleanText(raw);
 if(!text)return '';
 const now=new Date();
 let m=text.match(/(\d+)\s*분\s*전/); if(m)return new Date(now.getTime()-Number(m[1])*60000).toISOString();
 m=text.match(/(\d+)\s*시간\s*전/); if(m)return new Date(now.getTime()-Number(m[1])*3600000).toISOString();
 m=text.match(/(\d+)\s*일\s*전/); if(m)return new Date(now.getTime()-Number(m[1])*86400000).toISOString();
 m=text.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})\.?/); if(m)return new Date(Number(m[1]),Number(m[2])-1,Number(m[3]),12,0,0).toISOString();
 const d=Date.parse(text); return Number.isFinite(d)?new Date(d).toISOString():'';
}
function pickFirst(...values){for(const value of values){if(value)return value}return ''}
function attr(tagText,name){const m=tagText.match(new RegExp('\\b'+name+'\\s*=\\s*(["\'])(.*?)\\1','i'));return m?m[2]:''}
async function fetchGoogle(term,limit){
 const url=`https://news.google.com/rss/search?q=${encodeURIComponent(term+' when:7d')}&hl=ko&gl=KR&ceid=KR:ko`;
 const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; MYNEWS365/6.0)'},signal:AbortSignal.timeout(6500)});
 if(!response.ok)throw Error('upstream '+response.status);
 const xml=await response.text();
 const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m=>({title:decode(tag(m[1],'title')),link:tag(m[1],'link'),date:tag(m[1],'pubDate')||new Date().toISOString(),source:decode(tag(m[1],'source')),image:rssPhoto(m[1])})).filter(x=>x.title&&/^https:\/\//.test(x.link)).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0));
 const sliced=unique(items).slice(0,limit);
 await enrichArticles(sliced,Math.min(regionLike(term)?6:4,sliced.length));
 return sliced;
}
function regionLike(term){return /시|군|구|도|광역시|특별시/.test(term)}
function naverBlockSource(block){
 return pickFirst(
  cleanText((block.match(/<a[^>]+class="[^"]*info[^"]*press[^"]*"[^>]*>([\s\S]*?)<\/a>/i)||[])[1]),
  cleanText((block.match(/<span[^>]+class="[^"]*press[^"]*"[^>]*>([\s\S]*?)<\/span>/i)||[])[1]),
  cleanText((block.match(/<a[^>]+class="[^"]*info_group[^"]*"[^>]*>([\s\S]*?)<\/a>/i)||[])[1])
 );
}
function naverBlockDate(block){
 const patterns=[/class="[^"]*info[^"]*">\s*([^<]*(?:분 전|시간 전|일 전|\d{4}\.\d{1,2}\.\d{1,2}\.?))\s*<\/span>/i,/class="[^"]*info[^"]*">\s*([^<]{2,20})\s*<\/span>/i];
 for(const p of patterns){const m=block.match(p);if(m){const parsed=parseKoreanDate(m[1]);if(parsed)return parsed}}
 return new Date().toISOString();
}
function naverBlockImage(block,base){
 for(const m of block.matchAll(/<img\b[^>]*>/gi)){
  const src=pickFirst(attr(m[0],'data-lazysrc'),attr(m[0],'data-source'),attr(m[0],'src'));
  const full=abs(src,base); if(full) return full;
 }
 return '';
}
async function fetchNaver(term,limit){
 const url=`https://search.naver.com/search.naver?where=news&sm=tab_jum&sort=1&query=${encodeURIComponent(term)}`;
 const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; MYNEWS365/6.0)','Accept-Language':'ko-KR,ko;q=0.9,en;q=0.7'},signal:AbortSignal.timeout(7000)});
 if(!response.ok)throw Error('naver '+response.status);
 const html=await response.text();
 const items=[];
 const pattern=/<a\b[^>]*class="[^"]*news_tit[^"]*"[^>]*href="([^"]+)"[^>]*?(?:title="([^"]*)")?[^>]*>([\s\S]*?)<\/a>/gi;
 for(const match of html.matchAll(pattern)){
  const link=abs(match[1],url);
  const title=cleanText(match[2]||match[3]);
  if(!link||!title)continue;
  const start=match.index||0;
  const block=html.slice(start,start+2200);
  items.push({title,link,date:naverBlockDate(block),source:naverBlockSource(block)||'네이버 뉴스',image:naverBlockImage(block,url)});
  if(items.length>=limit*2)break;
 }
 const deduped=unique(items).slice(0,limit);
 await enrichArticles(deduped,Math.min(5,deduped.length));
 return deduped;
}
exports.handler=async event=>{
 const topic=event.queryStringParameters?.topic||'gumi';
 const region=(event.queryStringParameters?.region||'').trim();
 if(region&&!/^[가-힣a-zA-Z0-9\s·-]{2,30}$/.test(region))return json(400,{error:'Invalid region'});
 if(!region&&!Object.hasOwn(TOPICS,topic))return json(400,{error:'Invalid topic'});
 const term=region?region.split(/\s+/).filter(Boolean).map(x=>'"'+x+'"').join(' '):TOPICS[topic];
 const limit=region?6:12;
 try{
  let items=[]; let engine='google';
  if(!region&&NAVER_TOPICS.has(topic)){
   try{items=await fetchNaver(term,limit);engine='naver'}catch(e){items=[]}
  }
  if(!items.length){items=await fetchGoogle(term,limit);engine='google'}
  return json(200,{items,engine,topic:region?'region':topic});
 }catch(e){return json(503,{error:'News feed temporarily unavailable'})}
};