const {tag,rssPhoto,enrichArticles}=require('../lib/news-photo');
const TOPICS={gumi:'구미시',gyeongbuk:'경상북도',industry:'구미 반도체 로봇 산업',forest:'(구미 OR 경북) (공원 OR 도시숲 OR 녹지)',national:'대한민국 주요 뉴스',politics:'대한민국 정치 국회 정부',economy:'대한민국 경제 금융 기업',society:'대한민국 사회 사건 교육',world:'국제 세계 외교 해외',technology:'IT 인공지능 반도체 기술'};
const decode=s=>String(s||'').replace(/<[^>]+>/g,'').trim();
const json=(statusCode,payload)=>({statusCode,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=180, s-maxage=300'},body:JSON.stringify(payload)});
exports.handler=async event=>{
 const topic=event.queryStringParameters?.topic||'gumi';
 const region=(event.queryStringParameters?.region||'').trim();
 if(region&&!/^[가-힣a-zA-Z0-9\s·-]{2,30}$/.test(region))return json(400,{error:'Invalid region'});
 if(!region&&!Object.hasOwn(TOPICS,topic))return json(400,{error:'Invalid topic'});
 const term=region?region.split(/\s+/).filter(Boolean).map(x=>'"'+x+'"').join(' '):TOPICS[topic];
 const url=`https://news.google.com/rss/search?q=${encodeURIComponent(term+' when:7d')}&hl=ko&gl=KR&ceid=KR:ko`;
 try{
  const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; MYNEWS365/2.0)'},signal:AbortSignal.timeout(6500)});
  if(!response.ok)throw Error('upstream '+response.status);
  const xml=await response.text();
  const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m=>({title:decode(tag(m[1],'title')),link:tag(m[1],'link'),date:tag(m[1],'pubDate'),source:decode(tag(m[1],'source')),image:rssPhoto(m[1])})).filter(x=>x.title&&/^https:\/\//.test(x.link)).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)).slice(0,6);
  // Enrich the visible first articles. RSS metadata remains available immediately on failure.
  // Local edition shows six; TOP 5 uses one article per topic (plus a duplicate fallback).
  await enrichArticles(items,region?6:Math.min(2,items.length));
  return json(200,{items});
 }catch(e){return json(503,{error:'News feed temporarily unavailable'})}
};
