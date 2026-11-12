(()=>{
'use strict';
const data={
  "즐겨찾기":[],
  "구미·경북":[["매일신문","https://www.imaeil.com/"],["영남일보","https://www.yeongnam.com/"],["경북일보","https://www.kyongbuk.co.kr/"],["경북매일","https://www.kbmaeil.com/"],["대구일보","https://www.idaegu.com/"],["대경일보","https://www.dkilbo.com/"],["경북도민일보","https://www.hidomin.com/"],["경안일보","http://www.gailbo.com/"],["뉴데일리 대구경북","https://tk.newdaily.co.kr/"],["경북 지역뉴스(newsgb)","https://www.newsgb.co.kr/"]],
  "종합·사회":[["조선일보","https://www.chosun.com/"],["중앙일보","https://www.joongang.co.kr/"],["동아일보","https://www.donga.com/"],["한겨레","https://www.hani.co.kr/"],["경향신문","https://www.khan.co.kr/"],["한국일보","https://www.hankookilbo.com/"],["서울신문","https://www.seoul.co.kr/"],["국민일보","https://www.kmib.co.kr/"],["세계일보","https://www.segye.com/"],["문화일보","https://www.munhwa.com/"],["오마이뉴스","https://www.ohmynews.com/"],["프레시안","https://www.pressian.com/"],["노컷뉴스","https://www.nocutnews.co.kr/"],["미디어오늘","https://www.mediatoday.co.kr/"],["시사IN","https://www.sisain.co.kr/"],["뉴시스","https://www.newsis.com/"],["뉴스1","https://www.news1.kr/"],["미주중앙일보","https://www.koreadaily.com/"],["미주한국일보","https://www.koreatimes.com/"],["펜앤드마이크","https://www.pennmike.com/"]],
  "통신·방송":[["연합뉴스","https://www.yna.co.kr/"],["뉴시스","https://www.newsis.com/"],["뉴스1","https://www.news1.kr/"],["YTN","https://www.ytn.co.kr/"],["KBS뉴스","https://news.kbs.co.kr/"],["MBC뉴스","https://imnews.imbc.com/"],["SBS뉴스","https://news.sbs.co.kr/"],["JTBC뉴스","https://news.jtbc.co.kr/"],["연합뉴스TV","https://www.yonhapnewstv.co.kr/"],["TV조선뉴스","https://news.tvchosun.com/"],["채널A뉴스","https://www.ichannela.com/news/main/news_main.do"],["MBN뉴스","https://www.mbn.co.kr/news/"],["매일경제TV","https://www.mk.co.kr/news/mbn/"],["뉴스핌TV","https://www.newspim.com/"]],
  "경제·IT":[["매일경제","https://www.mk.co.kr/"],["한국경제","https://www.hankyung.com/"],["머니투데이","https://www.mt.co.kr/"],["서울경제","https://www.sedaily.com/"],["이데일리","https://www.edaily.co.kr/"],["헤럴드경제","https://biz.heraldcorp.com/"],["아시아경제","https://www.asiae.co.kr/"],["파이낸셜뉴스","https://www.fnnews.com/"],["아주경제","https://www.ajunews.com/"],["전자신문","https://www.etnews.com/"],["디지털타임스","https://www.dt.co.kr/"],["ZDNet Korea","https://zdnet.co.kr/"],["이투데이","https://www.etoday.co.kr/"],["블로터","https://www.bloter.net/"],["디지털데일리","https://www.ddaily.co.kr/"],["아이뉴스24","https://www.inews24.com/"],["조선비즈","https://biz.chosun.com/"],["더벨","https://www.thebell.co.kr/"]],
  "지역신문":[["매일신문","https://www.imaeil.com/"],["영남일보","https://www.yeongnam.com/"],["경북일보","https://www.kyongbuk.co.kr/"],["경북매일","https://www.kbmaeil.com/"],["대구일보","https://www.idaegu.com/"],["부산일보","https://www.busan.com/"],["국제신문","https://www.kookje.co.kr/"],["경남신문","https://www.knnews.co.kr/"],["강원일보","https://www.kwnews.co.kr/"],["경인일보","https://www.kyeongin.com/"],["인천일보","https://www.incheonilbo.com/"],["대전일보","https://www.daejonilbo.com/"],["충청투데이","https://www.cctoday.co.kr/"],["전북일보","https://www.jjan.kr/"],["광주일보","https://www.kwangju.co.kr/"],["제주일보","https://www.jejunews.com/"],["무등일보","https://www.mdilbo.com/"],["중부일보","https://www.joongboo.com/"]],
  "스포츠":[["스포츠조선","https://sports.chosun.com/"],["스포츠서울","https://www.sportsseoul.com/"],["스포츠경향","https://sports.khan.co.kr/"],["스포츠동아","https://sports.donga.com/"],["일간스포츠","https://isplus.com/"],["스포츠한국","https://sports.hankooki.com/"],["스포츠투데이","https://www.stoo.com/"],["엑스포츠뉴스","https://www.xportsnews.com/"],["MK스포츠","https://mksports.co.kr/"],["스포츠월드","https://www.sportsworldi.com/"],["골프TV","https://www.golftv.co.kr/"]],
  "전문지":[["여행신문","https://www.traveltimes.co.kr/"],["한국관광신문","https://www.ktnbm.co.kr/"],["e트래블뉴스","https://www.etravelnews.co.kr/"],["세계여행신문","http://www.swtnews.com/"],["투어코리아","https://www.tournews21.com/"],["환경일보","https://www.hkbs.co.kr/"],["농민신문","https://www.nongmin.com/"],["축산신문","https://www.chuksannews.co.kr/"]],
  "해외":[["BBC","https://www.bbc.com/news"],["CNN","https://www.cnn.com/"],["Reuters","https://www.reuters.com/"],["AP News","https://apnews.com/"],["The Guardian","https://www.theguardian.com/international"],["New York Times","https://www.nytimes.com/"],["Nikkei Asia","https://asia.nikkei.com/"]]
};
const regions={"서울특별시":["전체","종로구","중구","용산구","성동구","광진구","동대문구","중랑구","성북구","강북구","도봉구","노원구","은평구","서대문구","마포구","양천구","강서구","구로구","금천구","영등포구","동작구","관악구","서초구","강남구","송파구","강동구"],"부산광역시":["전체","중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군"],"대구광역시":["전체","중구","동구","서구","남구","북구","수성구","달서구","달성군","군위군"],"인천광역시":["전체","중구","동구","미추홀구","연수구","남동구","부평구","계양구","서구","강화군","옹진군"],"광주광역시":["전체","동구","서구","남구","북구","광산구"],"대전광역시":["전체","동구","중구","서구","유성구","대덕구"],"울산광역시":["전체","중구","남구","동구","북구","울주군"],"세종특별자치시":["전체"],"경기도":["전체","수원시","성남시","고양시","용인시","화성시","부천시","안산시","안양시","남양주시","평택시","시흥시","파주시","의정부시","김포시","광명시","광주시","군포시","오산시","이천시","안성시","구리시","의왕시","포천시","양주시","하남시","여주시","동두천시","과천시","가평군","양평군","연천군"],"강원특별자치도":["전체","춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"],"충청북도":["전체","청주시","충주시","제천시","보은군","옥천군","영동군","증평군","진천군","괴산군","음성군","단양군"],"충청남도":["전체","천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"],"전북특별자치도":["전체","전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군"],"전라남도":["전체","목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군"],"경상북도":["전체","포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시","문경시","경산시","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"],"경상남도":["전체","창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군"],"제주특별자치도":["전체","제주시","서귀포시"]};
const sites={"서울특별시":"https://www.seoul.go.kr/","부산광역시":"https://www.busan.go.kr/","대구광역시":"https://www.daegu.go.kr/","인천광역시":"https://www.incheon.go.kr/","광주광역시":"https://www.gwangju.go.kr/","대전광역시":"https://www.daejeon.go.kr/","울산광역시":"https://www.ulsan.go.kr/","세종특별자치시":"https://www.sejong.go.kr/","경기도":"https://www.gg.go.kr/","강원특별자치도":"https://state.gwd.go.kr/","충청북도":"https://www.chungbuk.go.kr/","충청남도":"https://www.chungnam.go.kr/","전북특별자치도":"https://www.jeonbuk.go.kr/","전라남도":"https://www.jeonnam.go.kr/","경상북도":"https://www.gb.go.kr/","경상남도":"https://www.gyeongnam.go.kr/","제주특별자치도":"https://www.jeju.go.kr/"};
const official={"경상북도|전체":"https://www.gb.go.kr/page/10107/10004.do","경상북도|구미시":"https://www.gumi.go.kr/portal/board/post/list.do?bcIdx=211&mid=0504020000","경상북도|안동시":"https://www.andong.go.kr/portal/bbs/list.do?mId=0403010000&ptIdx=104","경상북도|경산시":"https://www.gbgs.go.kr/open_content/ko/page.do?mnu_uid=5904","경상북도|김천시":"https://www.gc.go.kr/","경상북도|포항시":"https://www.pohang.go.kr/","경상북도|경주시":"https://www.gyeongju.go.kr/","경상북도|영주시":"https://www.yeongju.go.kr/","경상북도|영천시":"https://www.yc.go.kr/","경상북도|상주시":"https://www.sangju.go.kr/","경상북도|문경시":"https://www.gbmg.go.kr/","경상북도|칠곡군":"https://www.chilgok.go.kr/","경상북도|울진군":"https://www.uljin.go.kr/","경상북도|영덕군":"https://www.yd.go.kr/","경상북도|봉화군":"https://www.bonghwa.go.kr/","경상북도|성주군":"https://www.sj.go.kr/","경상북도|고령군":"https://www.goryeong.go.kr/","경상북도|영양군":"https://www.yyg.go.kr/","경상북도|의성군":"https://www.usc.go.kr/","경상북도|울릉군":"https://www.ulleung.go.kr/","경상북도|예천군":"https://www.ycg.kr/"};
const directPress=new Set(["경상북도|경산시", "경상북도|구미시", "경상북도|안동시", "경상북도|전체"]);
const $=id=>document.getElementById(id);
let current='전체', expanded=false;
let fav;try{fav=new Set(JSON.parse(localStorage.getItem('newsFavorites')||'[]'))}catch(e){fav=new Set()}
const all=Object.entries(data).filter(([k])=>k!=='즐겨찾기').flatMap(([cat,items])=>items.map(([name,url])=>({cat,name,url})));
const uniqueAll=[...new Map(all.map(x=>[x.name,x])).values()];
const tabs=$('tabs'),grid=$('grid'),count=$('count'),search=$('search'),more=$('directoryMore'),panel=$('govNavigator');
const govProvince=$('govProvince'),govCity=$('govCity'),govTarget=$('govTarget');
let chosenProvince='경상북도',chosenCity='구미시';
function option(select,value,label=value){const o=document.createElement('option');o.value=value;o.textContent=label;select.append(o)}
function syncGov(){govProvince.replaceChildren();for(const x of Object.keys(regions))option(govProvince,x);if(!regions[chosenProvince])chosenProvince='경상북도';govProvince.value=chosenProvince;populateCities()}
function populateCities(){govCity.replaceChildren();for(const city of regions[chosenProvince]||['전체'])option(govCity,city,city==='전체'?'시·도청 전체':city);if(!(regions[chosenProvince]||[]).includes(chosenCity))chosenCity='전체';govCity.value=chosenCity;showGov()}
const makeLink=(label,href,secondary=false)=>{const a=document.createElement('a');a.className='gov-link'+(secondary?' secondary':'');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';return a};
function showGov(){
  govTarget.replaceChildren();const key=chosenProvince+'|'+chosenCity;const name=chosenCity==='전체'?chosenProvince:chosenProvince+' '+chosenCity;
  const card=document.createElement('div');card.className='gov-choice';
  const icon=document.createElement('span');icon.className='gov-choice-icon';icon.textContent='🏛';icon.setAttribute('aria-hidden','true');
  const words=document.createElement('div');words.className='gov-choice-copy';
  const h=document.createElement('strong');h.textContent=name+' 공식 소식';
  const p=document.createElement('span');p.textContent=directPress.has(key)?'공식 보도자료 게시판으로 바로 이동':'기관 공식 누리집 또는 보도자료 검색으로 이동';words.append(h,p);
  const links=document.createElement('div');links.className='gov-links';
  const press=official[key];
  if(directPress.has(key)&&press)links.append(makeLink('보도자료 바로가기',press));
  else if(press)links.append(makeLink('기관 홈페이지 열기',press));
  else if(chosenCity==='전체'&&sites[chosenProvince])links.append(makeLink('시·도청 홈페이지',sites[chosenProvince]));
  const searchQuery=encodeURIComponent(name+' 시청 도청 군청 구청 보도자료 공식');
  links.append(makeLink('보도자료 검색','https://www.google.com/search?q='+searchQuery,true));
  card.append(icon,words,links);govTarget.append(card);
  try{localStorage.setItem('mynews365-gov-choice',JSON.stringify([chosenProvince,chosenCity]))}catch(e){}
}
try{const saved=JSON.parse(localStorage.getItem('mynews365-gov-choice')||'null');if(Array.isArray(saved)&&regions[saved[0]]){chosenProvince=saved[0];chosenCity=saved[1]}}catch(e){}
syncGov();govProvince.addEventListener('change',()=>{chosenProvince=govProvince.value;chosenCity='전체';populateCities()});govCity.addEventListener('change',()=>{chosenCity=govCity.value;showGov()});
function render(){
 tabs.replaceChildren();const cats=['전체','즐겨찾기','시청·도청 보도자료',...Object.keys(data).filter(x=>x!=='즐겨찾기')];
 cats.forEach(cat=>{const b=document.createElement('button');b.type='button';b.textContent=cat;b.className=current===cat?'active':'';b.setAttribute('aria-pressed',String(current===cat));b.onclick=()=>{current=cat;expanded=false;search.value='';render()};tabs.append(b)});
 const gov=current==='시청·도청 보도자료';panel.hidden=!gov;grid.hidden=gov;count.hidden=gov;more.hidden=gov;$('empty').hidden=true;
 search.parentElement.hidden=gov;
 if(gov)return;
 const q=search.value.trim().toLowerCase();const src=current==='전체'||current==='즐겨찾기'?uniqueAll:all;
 const items=src.filter(x=>(current==='전체'||(current==='즐겨찾기'?fav.has(x.name):x.cat===current))&&x.name.toLowerCase().includes(q));
 count.textContent=`${items.length}개 언론사 · 기관`;grid.replaceChildren();$('empty').hidden=items.length!==0;
 const limit=q||current==='즐겨찾기'?items.length:(window.innerWidth<760?12:24);
 (expanded?items:items.slice(0,limit)).forEach(x=>{
   const tile=document.createElement('div');tile.className='tile directory-logo-tile';
   const a=document.createElement('a');a.className='publisher-link';a.href=x.url;a.target='_blank';a.rel='noopener noreferrer';
   const logo=document.createElement('span');logo.className='publisher-icon';
   const initials=document.createElement('span');initials.className='publisher-initials';initials.textContent=x.name.replace(/[^가-힣a-zA-Z0-9]/g,'').slice(0,2)||'N';logo.append(initials);
   try{const img=document.createElement('img');img.className='publisher-favicon';img.src='https://www.google.com/s2/favicons?sz=128&domain='+encodeURIComponent(new URL(x.url).hostname);img.alt='';img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';img.addEventListener('load',()=>logo.classList.add('has-favicon'));img.addEventListener('error',()=>{img.remove();logo.classList.remove('has-favicon')});logo.append(img)}catch(e){}
   const name=document.createElement('span');name.className='publisher-name';name.textContent=x.name;
   const category=document.createElement('small');category.className='publisher-category';category.textContent=x.cat;
   a.append(logo,name,category);
   const b=document.createElement('button');b.type='button';b.className='star'+(fav.has(x.name)?' on':'');b.textContent=fav.has(x.name)?'★':'☆';b.setAttribute('aria-label',x.name+' 즐겨찾기 '+(fav.has(x.name)?'해제':'추가'));b.setAttribute('aria-pressed',String(fav.has(x.name)));
   b.onclick=()=>{fav.has(x.name)?fav.delete(x.name):fav.add(x.name);try{localStorage.setItem('newsFavorites',JSON.stringify([...fav]))}catch(e){}render()};
   tile.append(a,b);grid.append(tile);
 });
 more.hidden=items.length<=limit;more.textContent=expanded?'간단히 보기':`언론사 더 보기 (+${Math.max(0,items.length-limit)}개)`;more.setAttribute('aria-expanded',String(expanded));
}
more.addEventListener('click',()=>{expanded=!expanded;render();if(!expanded)$('directory').scrollIntoView({behavior:'smooth',block:'start'})});
search.addEventListener('input',()=>{expanded=false;render()});
render();
})();