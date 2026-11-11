/**
 * Article photo discovery for MY NEWS 365.
 * Priority: syndicated RSS image -> publisher og:image/twitter:image -> graceful fallback in UI.
 * Google News links are redirects; resolving their source uses an undocumented endpoint
 * and can fail or be rate-limited. No third-party image is mislabeled as article photo.
 * Restricts publisher fetches to HTTPS public hostnames, no unvalidated user URLs.
 */
'use strict';
const net = require('node:net');
const AGENT='Mozilla/5.0 (compatible; MYNEWS365/1.0; news-preview)';
const escapeXml=s=>String(s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1');
const entities=s=>escapeXml(s).replace(/&(?:amp|lt|gt|quot|apos|#39);/gi,x=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&#39;':"'"}[x.toLowerCase()]||x)).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)));
const tag=(s,t)=>{const m=s.match(new RegExp('<'+t+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+t+'>','i'));return m?entities(m[1]):'';};
const safeUrl=(url,base)=>{try{const u=new URL(entities(url),base);if(u.protocol!=='https:'||u.username||u.password||u.port||net.isIP(u.hostname))return '';const h=u.hostname.toLowerCase();if(h==='localhost'||h.endsWith('.localhost')||h.endsWith('.local')||h.endsWith('.internal')||h.endsWith('.test')||h.endsWith('.example')||!h.includes('.'))return '';return u.href;}catch{return ''}};
const getAttr=(tag,attr)=>{const m=tag.match(new RegExp('\\b'+attr+'\\s*=\\s*(["\'])(.*?)\\1','i'));return m?entities(m[2]):''};
const looksLikeImage=(url,type)=>{const t=(type||'').toLowerCase();return t.includes('image/')||/\.(jpe?g|png|webp|avif)(?:[?#]|$)/i.test(url)||/\b(?:image|photo|thumb|img)\b/i.test(url)};
function rssPhoto(raw){
 for(const m of raw.matchAll(/<(?:media:content|media:thumbnail|enclosure|itunes:image)\b[^>]*>/gi)){
  const url=getAttr(m[0],'url')||getAttr(m[0],'href');const type=getAttr(m[0],'type');
  const safe=safeUrl(url);if(safe&&(m[0].toLowerCase().includes('thumbnail')||looksLikeImage(safe,type)))return safe;
 }
 const content=tag(raw,'description')+' '+tag(raw,'content:encoded');
 for(const m of content.matchAll(/<img\b[^>]*>/gi)){const safe=safeUrl(getAttr(m[0],'src'));if(safe)return safe;}
 return '';
}
async function limitedText(res,limit=260000){
 if(!res.body)return (await res.text()).slice(0,limit);
 const reader=res.body.getReader();let size=0;const chunks=[];
 try{while(size<limit){const {value,done}=await reader.read();if(done)break;const remain=limit-size;chunks.push(value.subarray(0,remain));size+=Math.min(remain,value.length);if(value.length>remain)break}}finally{try{await reader.cancel()}catch{}}
 return Buffer.concat(chunks).toString('utf8');
}
async function fetchText(url,{timeout=2100,method='GET',headers={},body}={}){
 const target=safeUrl(url);if(!target)throw Error('unsafe URL');
 const response=await fetch(target,{method,body,headers:{'User-Agent':AGENT,Accept:'text/html,application/xhtml+xml,*/*;q=0.6',...headers},redirect:'manual',signal:AbortSignal.timeout(timeout)});
 if(response.status>=300&&response.status<400){const dest=safeUrl(response.headers.get('location'),target);if(!dest)throw Error('unsafe redirect');const r=await fetch(dest,{headers:{'User-Agent':AGENT},redirect:'manual',signal:AbortSignal.timeout(timeout)});if(!r.ok)throw Error('redirect '+r.status);return{html:await limitedText(r),url:dest,headers:r.headers};}
 if(!response.ok)throw Error('HTTP '+response.status);
 return{html:await limitedText(response),url:target,headers:response.headers};
}
function legacyGoogle(id){
 try{const buf=Buffer.from(id,'base64url');if(buf.length<8||buf.subarray(0,6).toString('latin1').includes('AU_yqL'))return '';
  const text=buf.toString('latin1');const m=text.match(/https?:\/\/[^\x00-\x20\x7f]+/);return m?safeUrl(m[0]):'';}catch{return ''}
}
async function publisherUrl(link){
 const u=new URL(link);if(!/^(?:news|www)\.google\.com$/i.test(u.hostname))return safeUrl(link);
 const id=u.pathname.match(/\/(?:rss\/)?(?:articles|read)\/([A-Za-z0-9_-]+)/)?.[1];if(!id)return '';
 const old=legacyGoogle(id);if(old)return old;
 try{
  const {html,headers}=await fetchText('https://news.google.com/rss/articles/'+id,{timeout:2100,headers:{Cookie:'CONSENT=PENDING+987','Accept-Language':'ko-KR,ko;q=0.9,en;q=0.7'}});
  const sig=html.match(/data-n-a-sg=["']([^"']+)/)?.[1];const ts=html.match(/data-n-a-ts=["'](\d+)/)?.[1];if(!sig||!ts)return '';
  const inner=JSON.stringify(['garturlreq',[['X','X',['X','X'],null,null,1,1,'US:en',null,1,null,null,null,null,null,0,1],'X','X',1,[1,1,1],1,1,null,0,0,null,0],id,Number(ts),sig]);
  const post='f.req='+encodeURIComponent(JSON.stringify([[['Fbv4je',inner]]]));
  const cookies=headers.get('set-cookie')?.split(';')[0]||'CONSENT=PENDING+987';
  const {html:raw}=await fetchText('https://news.google.com/_/DotsSplashUi/data/batchexecute',{timeout:2100,method:'POST',body:post,headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',Origin:'https://news.google.com',Referer:'https://news.google.com/','X-Same-Domain':'1',Cookie:cookies}});
  const frames=JSON.parse(raw.slice(raw.indexOf('\n\n')+2));const frame=frames.find(x=>Array.isArray(x)&&x[0]==='wrb.fr'&&x[1]==='Fbv4je');
  return frame?.[2]?safeUrl(JSON.parse(frame[2])[1]):'';
 }catch{return ''}
}
function metadataImage(html,base){
 for(const m of html.matchAll(/<meta\b[^>]*>/gi)){
  const t=m[0],property=(getAttr(t,'property')||getAttr(t,'name')).toLowerCase();
  if(['og:image','og:image:url','og:image:secure_url','twitter:image','twitter:image:src'].includes(property)){
   const img=safeUrl(getAttr(t,'content'),base);if(img)return img;
  }
 }
 // Publishers often set schema.org image instead of og:image.
 for(const m of html.matchAll(/"image"\s*:\s*(?:\[\s*)?(?:\{\s*"url"\s*:\s*)?"(https:\/\/[^"\\]+)"/gi)){
  const img=safeUrl(m[1]);if(img)return img;
 }
 return '';
}
async function enrichArticle(item){
 if(item.image)return {...item,imageKind:'rss'};
 try{const pub=await publisherUrl(item.link);if(!pub||/google\.com$/.test(new URL(pub).hostname))return item;
  const {html,url}=await fetchText(pub,{timeout:2400});const image=metadataImage(html,url);
  return image?{...item,image,imageKind:'publisher'}:item;
 }catch{return item}
}
async function enrichArticles(items,count){
 const wanted=items.slice(0,count);
 await Promise.allSettled(wanted.map(async (item,index)=>{items[index]=await enrichArticle(item)}));
 return items;
}
module.exports={tag,rssPhoto,metadataImage,publisherUrl,enrichArticle,enrichArticles,safeUrl};
