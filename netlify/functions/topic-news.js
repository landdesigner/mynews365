const {tag,rssPhoto,enrichArticles}=require('../lib/news-photo');
const clean=s=>String(s||'').replace(/<[^>]+>/g,'').trim();
const json=(statusCode,payload)=>({statusCode,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=180, s-maxage=300'},body:JSON.stringify(payload)});
exports.handler=async event=>{
 const query=(event.queryStringParameters?.q||'').trim();
 if(!query||query.length>40||/[<>\x00-\x1f]/.test(query))return json(400,{error:'Invalid query'});
 const variants=['"'+query+'" when:30d','"'+query+'"'];
 const normalize=s=>s.normalize('NFKC').toLocaleLowerCase('ko-KR').replace(/\s+/g,'');
 const needle=normalize(query);
 const now=new Date(),cutoff=new Date(now);cutoff.setFullYear(cutoff.getFullYear()-10);
 const isRecent=date=>{const t=Date.parse(date);return Number.isFinite(t)&&t>=cutoff.getTime()&&t<=now.getTime()+86400000};
 try{
  let items=[];
  for(const q of variants){
   const url='https://news.google.com/rss/search?q='+encodeURIComponent(q)+'&hl=ko&gl=KR&ceid=KR:ko';
   const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; MYNEWS365/4.0)'},signal:AbortSignal.timeout(6500)});
   if(!response.ok)throw Error('RSS HTTP '+response.status);
   const xml=await response.text();
   items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m=>({title:clean(tag(m[1],'title')),link:tag(m[1],'link'),date:tag(m[1],'pubDate'),source:clean(tag(m[1],'source')),image:rssPhoto(m[1])})).filter(x=>x.title&&/^https:\/\//.test(x.link)&&normalize(x.title).includes(needle)&&isRecent(x.date)).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)).slice(0,5);
   if(items.length)break;
  }
  await enrichArticles(items,items.length);
  return json(200,{items,query});
 }catch(e){return json(503,{error:'News feed temporarily unavailable'})}
};
