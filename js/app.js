// ===== 인권교육 특별展 사이트: 라우터 · 관리자 로그인 · 진행상황 공유 =====
// 로그인 기억: 체크하면 로그인 상태를 브라우저에 남기고(localStorage), 아니면 창을 닫을 때 로그아웃(sessionStorage)
const REM_KEY='jhr-remember', ID_KEY='jhr-saved-id';
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
const authStore={
  getItem:k=>{try{return localStorage.getItem(k)??sessionStorage.getItem(k)}catch(e){return null}},
  setItem:(k,v)=>{try{if(ls.get(REM_KEY)==='1'){localStorage.setItem(k,v);sessionStorage.removeItem(k)}else{sessionStorage.setItem(k,v);localStorage.removeItem(k)}}catch(e){}},
  removeItem:k=>{try{localStorage.removeItem(k);sessionStorage.removeItem(k)}catch(e){}}
};
const SB=(window.supabase&&window.SUPABASE_URL)?window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY,{auth:{storage:authStore,persistSession:true,autoRefreshToken:true}}):null;
let USER=null, POSTS=[], postsLoaded=false, authReady=!SB;
const TEAMS=['청년부 기획팀','대외섭외','도슨트','환경미화','실내안내','주차안내','방송/기록/의료'];
let curTeam=(()=>{const t=ls.get('jhr-team');return TEAMS.includes(t)?t:TEAMS[0]})();
const teamOf=p=>TEAMS.includes(p.team)?p.team:TEAMS[0];

// ---------- router ----------
const PAGES=['home','about','facility','news'];
function route(){
  let h=location.hash.replace(/^#\/?/,'');
  if(/^f[123]$/.test(h)){current=h;h='facility'}          // 예전 시설안내 링크(#f1 등) 호환
  if(!PAGES.includes(h))h='home';
  if(h==='news'&&!EDIT.can){h='home';if(authReady&&location.hash.startsWith('#/news'))history.replaceState(null,'','#/')}   // 진행상황 공유는 관리자 전용
  document.querySelectorAll('.page').forEach(p=>p.hidden=p.id!=='page-'+h);
  document.querySelectorAll('.nav-links a').forEach(a=>a.setAttribute('aria-current',a.dataset.page===h?'page':'false'));
  document.body.classList.remove('nav-open');
  document.getElementById('navToggle').setAttribute('aria-expanded','false');
  if(h==='facility')initFacility();
  if(h==='news'||h==='home')renderPosts();
  document.title=({home:'인권교육 특별展',about:'전시회 안내 · 인권교육 특별展',facility:'시설안내 · 인권교육 특별展',news:'진행상황 공유 · 인권교육 특별展'})[h];
  window.scrollTo({top:0,behavior:'auto'});
  if(JUMP){const t=document.getElementById(JUMP);JUMP=null;if(t)requestAnimationFrame(()=>t.scrollIntoView({block:'start'}))}
}
let JUMP=null;
document.addEventListener('click',e=>{const j=e.target.closest('[data-jump]');if(!j)return;JUMP=j.dataset.jump;if(location.hash===j.getAttribute('href')){e.preventDefault();route()}});
window.addEventListener('hashchange',route);
document.getElementById('navToggle').addEventListener('click',e=>{
  const open=!document.body.classList.contains('nav-open');
  document.body.classList.toggle('nav-open',open);e.currentTarget.setAttribute('aria-expanded',String(open));
});
const navEl=document.querySelector('.site-nav');
const onScroll=()=>navEl.classList.toggle('scrolled',window.scrollY>8);
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

// ---------- shared data (facility overrides) ----------
function rerender(){
  if(document.getElementById('dir')?.dataset.ready){renderRooms(current);draw(current);}
  if(sheetN!==null&&sheetN>0&&!editing&&!sheetMode){const keep=lastFocus;openSheet(sheetN);lastFocus=keep}
}
async function loadOverrides(){
  const {data,error}=await SB.from('rooms').select('key,data'); if(error)return;
  const next={}; data.forEach(r=>{next[r.key]=r.data}); OV=next; rerender();
}

// ---------- admin login (top-right of the nav) ----------
let sheetMode=null;   // 'login' | 'post' while those sheets are open
function authUI(){
  const box=document.getElementById('navAuth');
  const note=document.getElementById('editNote'); if(note)note.hidden=!EDIT.can;
  document.body.classList.toggle('is-admin',EDIT.can);
  if(!SB){box.innerHTML='';return}
  if(!USER){box.innerHTML='<button type="button" class="nav-login" id="loginBtn">관리자 로그인</button>';
    document.getElementById('loginBtn').onclick=e=>{lastFocus=e.currentTarget;openLogin()};}
  else{box.innerHTML=`<span class="nav-user">${esc(USER.email.replace(/@example\.com$/,''))}${EDIT.can?' · 관리자':' · 권한 없음'}</span><button type="button" class="nav-login ghost" id="logoutBtn">로그아웃</button>`;
    document.getElementById('logoutBtn').onclick=async()=>{await SB.auth.signOut()};}
  renderPosts();
}
async function refreshAuth(session){
  USER=session?session.user:null; EDIT.can=false;
  if(USER){const {data}=await SB.rpc('is_editor');EDIT.can=data===true;}
  authReady=true;
  if(EDIT.can)loadPosts();else{POSTS=[];postsLoaded=false}
  authUI(); rerender(); route();
}
function openModal(html,mode){
  editing=true; sheetN=-1; sheetMode=mode;
  const sh=document.getElementById('sheet'); sh.innerHTML=html;
  document.getElementById('sheetBg').hidden=false; sh.scrollTop=0;
  return sh;
}
function closeModal(){sheetMode=null;editing=false;closeSheet()}
function openLogin(){
  const sh=openModal(`<form class="sheet-body edit" id="loginForm">
    <div class="title-row"><div><div class="eyebrow">관리자 전용</div><h3 id="sheetTitle">관리자 로그인</h3></div><button class="sheet-close static" type="button" aria-label="닫기">×</button></div>
    <label for="l-email">아이디</label><input id="l-email" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" required>
    <label for="l-pw">비밀번호</label><input id="l-pw" type="password" autocomplete="current-password" required>
    <label class="check remember"><input type="checkbox" id="l-remember"> 아이디·비밀번호 기억하기</label>
    <p class="remember-note">체크하면 이 기기에서 로그인 상태가 유지되어 다음에 다시 입력하지 않아도 됩니다. 공용 컴퓨터에서는 체크하지 마세요.</p>
    <div class="e-status" id="l-status" role="status"></div>
    <div class="e-actions"><button type="button" class="ghost" id="l-cancel">취소</button><button type="submit" class="primary" id="l-go">로그인</button></div></form>`,'login');
  sh.querySelector('.sheet-close').onclick=closeModal; document.getElementById('l-cancel').onclick=closeModal;
  const savedId=ls.get(ID_KEY); if(savedId)document.getElementById('l-email').value=savedId;
  document.getElementById('l-remember').checked=ls.get(REM_KEY)==='1';
  document.getElementById('loginForm').addEventListener('submit',async e=>{
    e.preventDefault(); const go=document.getElementById('l-go'), st=document.getElementById('l-status');
    go.disabled=true; st.textContent='확인하는 중…';
    const id=document.getElementById('l-email').value.trim().toLowerCase();
    const remember=document.getElementById('l-remember').checked;
    if(remember){ls.set(REM_KEY,'1');ls.set(ID_KEY,id)}else{ls.del(REM_KEY);ls.del(ID_KEY)}
    const {error}=await SB.auth.signInWithPassword({email:id.includes('@')?id:id+'@example.com',password:document.getElementById('l-pw').value});
    if(error){go.disabled=false;st.textContent='아이디 또는 비밀번호가 맞지 않습니다.';return}
    closeModal();
  });
  (savedId?document.getElementById('l-pw'):document.getElementById('l-email')).focus();
}

// ---------- photo upload (shared by facility editor and news editor) ----------
async function shrink(file){
  if(!/^image\/(jpeg|png|webp)$/.test(file.type))return file;
  try{const bmp=await createImageBitmap(file);const k=Math.min(1,1600/Math.max(bmp.width,bmp.height));
    if(k===1&&file.size<1500000)return file;
    const c=document.createElement('canvas');c.width=Math.round(bmp.width*k);c.height=Math.round(bmp.height*k);
    c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
    return await new Promise(r=>c.toBlob(b=>r(b||file),'image/jpeg',0.85));}catch(e){return file}
}
async function uploadPhoto(key,file){
  const blob=await shrink(file); const ext=(blob.type.split('/')[1]||'jpg').replace('jpeg','jpg');
  const path=`${key}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  const {error}=await SB.storage.from('room-photos').upload(path,blob,{contentType:blob.type,upsert:false});
  if(error)throw error;
  return SB.storage.from('room-photos').getPublicUrl(path).data.publicUrl;
}

// ---------- 진행상황 공유 ----------
const fmtDate=iso=>{const d=new Date(iso);return `${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}.`};
const fmtBody=t=>esc(t).replace(/\n/g,'<br>');
async function loadPosts(){
  if(!SB||!EDIT.can)return;
  const {data,error}=await SB.from('posts').select('*').order('pinned',{ascending:false}).order('created_at',{ascending:false}).limit(200);
  if(error)return; POSTS=data; postsLoaded=true; renderPosts();
}
function postCard(p,compact){
  const ph=(p.photos||[]);
  const gallery=ph.length?`<div class="post-photos n${Math.min(ph.length,4)}">${ph.slice(0,compact?1:4).map((u,k)=>`<button type="button" class="post-ph" data-post="${p.id}" data-k="${k}" aria-label="사진 ${k+1} 크게 보기"><img src="${esc(u)}" alt="" loading="lazy">${!compact&&k===3&&ph.length>4?`<span class="more">+${ph.length-4}</span>`:''}</button>`).join('')}</div>`:'';
  return `<article class="post${p.pinned?' pinned':''}${compact?' compact':''}">
    ${compact?gallery:''}
    <div class="post-meta"><span class="team">${esc(teamOf(p))}</span>${p.pinned?'<span class="pin">공지</span>':''}<time datetime="${esc(p.created_at)}">${fmtDate(p.created_at)}</time></div>
    <h3>${esc(p.title)}</h3>
    ${compact?`<p class="post-ex">${esc((p.body||'').slice(0,90))}${(p.body||'').length>90?'…':''}</p>`:`<div class="post-body">${fmtBody(p.body||'')}</div>${gallery}`}
    ${!compact&&EDIT.can?`<div class="post-admin"><button type="button" class="link-btn" data-edit="${p.id}">수정</button><button type="button" class="link-btn danger" data-del="${p.id}">삭제</button></div>`:''}
  </article>`;
}
function renderPosts(){
  const list=document.getElementById('postList'), latest=document.getElementById('latestPosts');
  const addBtn=document.getElementById('newPostBtn'); if(addBtn)addBtn.hidden=!EDIT.can;
  const tabs=document.getElementById('teamTabs');
  if(tabs){
    tabs.innerHTML=TEAMS.map(t=>{const n=POSTS.filter(p=>teamOf(p)===t).length;return `<button type="button" role="tab" class="team-tab" data-team="${esc(t)}" aria-selected="${t===curTeam}">${esc(t)}${n?`<span class="cnt">${n}</span>`:''}</button>`}).join('');
  }
  if(list){
    const mine=POSTS.filter(p=>teamOf(p)===curTeam);
    list.innerHTML=!SB?'<p class="empty">게시판을 불러올 수 없습니다.</p>':!postsLoaded?'<p class="empty">불러오는 중…</p>':mine.length?mine.map(p=>postCard(p,false)).join(''):`<p class="empty">${esc(curTeam)} 탭에 아직 올라온 소식이 없습니다.${EDIT.can?' 아래 ‘글쓰기’로 첫 소식을 올려 보세요.':''}</p>`;
  }
  if(latest){
    const few=POSTS.slice(0,3);
    latest.innerHTML=few.length?few.map(p=>`<a class="post-link" href="#/news">${postCard(p,true)}</a>`).join(''):'<p class="empty">전시 준비 소식이 곧 올라옵니다.</p>';
  }
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sheetMode&&!LB.open)closeModal()});
document.addEventListener('click',e=>{
  const tt=e.target.closest('.team-tab'); if(tt){curTeam=tt.dataset.team;ls.set('jhr-team',curTeam);renderPosts();return}
  const fc=e.target.closest('.floor-card[data-floor]');
  if(fc){current=fc.dataset.floor;if(document.getElementById('dir').dataset.ready)show(current)}
  const ph=e.target.closest('.post-ph');
  if(ph){e.preventDefault();const p=POSTS.find(x=>x.id===ph.dataset.post);if(p)openLB(p.photos,+ph.dataset.k,p.title);return}
  const ed=e.target.closest('[data-edit]'); if(ed){lastFocus=ed;openPostEditor(POSTS.find(x=>x.id===ed.dataset.edit));return}
  const del=e.target.closest('[data-del]'); if(del){deletePost(del.dataset.del);return}
  if(e.target.closest('#newPostBtn')){lastFocus=e.target.closest('#newPostBtn');openPostEditor(null)}
});
async function deletePost(id){
  const p=POSTS.find(x=>x.id===id); if(!p)return;
  if(!confirm(`‘${p.title}’ 소식을 삭제할까요? 되돌릴 수 없습니다.`))return;
  const {error}=await SB.from('posts').delete().eq('id',id);
  if(error){alert('삭제하지 못했습니다. 다시 시도해 주세요.');return}
  POSTS=POSTS.filter(x=>x.id!==id); renderPosts();
}
function openPostEditor(post){
  let photos=post?[...(post.photos||[])]:[];
  const sh=openModal(`<div class="sheet-body edit">
    <div class="title-row"><div><div class="eyebrow">진행상황 공유</div><h3 id="sheetTitle">${post?'글 수정':'글쓰기'}</h3></div><button class="sheet-close static" type="button" aria-label="닫기">×</button></div>
    <label for="p-team">팀</label><select id="p-team">${TEAMS.map(t=>`<option${t===(post?teamOf(post):curTeam)?' selected':''}>${esc(t)}</option>`).join('')}</select>
    <label for="p-title">제목</label><input id="p-title" maxlength="120" value="${esc(post?.title||'')}" placeholder="예) 3층 전시관 패널 설치를 마쳤습니다">
    <label for="p-body">내용</label><textarea id="p-body" rows="7" maxlength="5000" placeholder="진행 상황을 자유롭게 적어 주세요">${esc(post?.body||'')}</textarea>
    <label class="check"><input type="checkbox" id="p-pin" ${post?.pinned?'checked':''}> 맨 위에 고정 (공지)</label>
    <div class="ph-label">사진 <span id="p-count"></span></div>
    <div class="e-photos" id="p-photos"></div>
    <label class="upload" for="p-file">사진 추가 (여러 장 선택 가능)<input id="p-file" type="file" accept="image/*" multiple></label>
    <div class="e-status" id="p-status" role="status"></div>
    <div class="e-actions"><button type="button" class="ghost" id="p-cancel">취소</button><button type="button" class="primary" id="p-save">${post?'저장':'올리기'}</button></div>
  </div>`,'post');
  const st=document.getElementById('p-status');
  const draw=()=>{
    document.getElementById('p-count').textContent=photos.length?`${photos.length}장`:'';
    document.getElementById('p-photos').innerHTML=photos.length?photos.map((u,k)=>`<div class="e-ph"><img src="${esc(u)}" alt="사진 ${k+1}"><div class="e-ph-tools"><button type="button" data-pmv="${k}" ${k===0?'disabled':''} aria-label="앞으로">←</button><button type="button" data-pdel="${k}">삭제</button></div></div>`).join(''):'<div class="e-empty">사진 없이도 올릴 수 있습니다.</div>';
    sh.querySelectorAll('[data-pdel]').forEach(b=>b.onclick=()=>{photos.splice(+b.dataset.pdel,1);draw()});
    sh.querySelectorAll('[data-pmv]').forEach(b=>b.onclick=()=>{const k=+b.dataset.pmv;if(k>0){[photos[k-1],photos[k]]=[photos[k],photos[k-1]];draw()}});
  };
  draw();
  const fileIn=document.getElementById('p-file');
  fileIn.addEventListener('change',async()=>{
    const files=[...fileIn.files]; if(!files.length)return;
    for(let k=0;k<files.length;k++){
      st.textContent=`사진 올리는 중… (${k+1}/${files.length})`;
      try{photos.unshift(await uploadPhoto('posts',files[k]));draw();}
      catch(err){st.textContent=`${files[k].name}을(를) 올리지 못했습니다. 다시 시도해 주세요.`;fileIn.value='';return}
    }
    st.textContent='사진을 추가했습니다.'; fileIn.value='';
  });
  sh.querySelector('.sheet-close').onclick=closeModal; document.getElementById('p-cancel').onclick=closeModal;
  document.getElementById('p-save').onclick=async e=>{
    const title=document.getElementById('p-title').value.trim();
    if(!title){st.textContent='제목을 입력해 주세요.';document.getElementById('p-title').focus();return}
    const btn=e.currentTarget; btn.disabled=true; st.textContent='저장하는 중…';
    const row={team:document.getElementById('p-team').value,title,body:document.getElementById('p-body').value.trim(),photos:photos.slice(0,30),pinned:document.getElementById('p-pin').checked,updated_at:new Date().toISOString()};
    const q=post?SB.from('posts').update(row).eq('id',post.id).select().single():SB.from('posts').insert(row).select().single();
    const {data,error}=await q;
    if(error){btn.disabled=false;st.textContent=error.code==='42501'||/row-level security/i.test(error.message||'')?'관리자만 올릴 수 있습니다. 다시 로그인해 주세요.':'저장하지 못했습니다. 잠시 후 다시 시도해 주세요.';return}
    POSTS=post?POSTS.map(x=>x.id===data.id?data:x):[data,...POSTS];
    POSTS.sort((a,b)=>(b.pinned-a.pinned)||(new Date(b.created_at)-new Date(a.created_at)));
    curTeam=row.team; ls.set('jhr-team',curTeam);
    closeModal(); renderPosts();
  };
  document.getElementById('p-title').focus();
}

// ---------- boot ----------
route();
if(SB){
  loadOverrides();
  SB.channel('site-live')
    .on('postgres_changes',{event:'*',schema:'public',table:'rooms'},loadOverrides)
    .on('postgres_changes',{event:'*',schema:'public',table:'posts'},loadPosts)
    .subscribe();
  SB.auth.getSession().then(({data})=>refreshAuth(data.session));
  SB.auth.onAuthStateChange((ev,session)=>{if(ev==='SIGNED_IN'||ev==='SIGNED_OUT')refreshAuth(session)});
}else{authUI();renderPosts();}
