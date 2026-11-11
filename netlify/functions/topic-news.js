
const decode=s=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/<[^>]+>/g,'').trim();
const field=(xml,tag)=>{const m=xml.match(new RegExp('<'+tag+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+tag+'>','i'));return m?decode(m[1]):''};
exports.handler=async event=>{
 const query=(event.queryStringParameters?.q||'').trim();
 if(!query||query.length>40||/[<>\x00-\x1f]/.test(query))return {statusCode:400,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:'Invalid query'})};
 const variants=[query+' when:30d',query];
 try{
  let items=[];
  for(const q of variants){
   const url='https://news.google.com/rss/search?q='+encodeURIComponent(q)+'&hl=ko&gl=KR&ceid=KR:ko';
   const response=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; MyNews365/3.0)'},signal:AbortSignal.timeout(8000)});
   if(!response.ok)throw Error('RSS HTTP '+response.status);
   const xml=await response.text();
   items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m=>({title:field(m[1],'title'),link:field(m[1],'link'),date:field(m[1],'pubDate'),source:field(m[1],'source')})).filter(x=>x.title&&/^https:\/\//.test(x.link)).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)).slice(0,15);
   if(items.length)break;
  }
  return {statusCode:200,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=180'},body:JSON.stringify({items,query})};
 }catch(e){return {statusCode:503,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:'News feed temporarily unavailable'})}}
};
