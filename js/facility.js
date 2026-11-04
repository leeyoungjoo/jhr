const CAT = {
  exhibit:{label:'전시',color:'var(--c-exhibit)'},
  video:{label:'영상',color:'var(--c-video)'},
  activity:{label:'활동·회의',color:'var(--c-activity)'},
  rest:{label:'휴게·편의',color:'var(--c-rest)'},
  hall:{label:'홀·로비',color:'var(--c-hall)'},
  staff:{label:'관계자·설비',color:'var(--c-staff)'},
  core:{label:'화장실·계단·승강기',color:'var(--c-core)'}
};
// rooms: [x0,x1,y0,y1] in metres; x along the long side (39.3 m), y from the main-entrance side (0) to the back (18.6)
const FLOORS = {
  f3:{fl:'3F',title:'3층 · 전시관',sub:'인권교육 특별展 메인 전시가 열리는 층입니다.',summary:'전시관 · 홀 · 유아실',
    outline:[[0,0],[39.3,0],[39.3,18.6],[25.8,18.6],[25.8,16.6],[0,16.6]],
    rooms:[
      {n:1,name:'전시관',orig:'303 대강당',renamed:true,cat:'exhibit',r:[3.1,25.8,0,16.6],
       desc:'인권교육 특별展의 메인 전시장입니다. 주제별 전시 패널과 체험 코너, 포토존을 차례로 둘러볼 수 있습니다.'},
      {n:2,name:'홀',orig:'301 홀',cat:'hall',r:[25.8,35,0,8.6],lr:[30,35,0,8.6],desc:'엘리베이터와 계단에서 내리면 바로 만나는 로비입니다. 전시관 입장 전 잠시 기다리는 공간으로 씁니다.'},
      {n:3,name:'유아실',orig:'302 유아실',cat:'rest',r:[25.8,29.2,12.6,16.6],d:[{s:'r',at:14.6}],desc:'영유아와 함께 온 관람객이 쉬거나 아이를 돌볼 수 있는 공간입니다.'},
      {n:4,name:'무궁화실',orig:'304 무궁화실',cat:'staff',off:true,r:[30.4,32.6,12.6,18.6],d:[{s:'l',at:14.4}],desc:'운영 지원 공간입니다.'},
      {n:5,name:'방송실',orig:'303A 방송실',cat:'staff',r:[25.8,29.2,8.6,12.6],d:[{s:'r',at:10.6}],desc:'전시관 음향·영상을 운영하는 관계자 공간입니다.'},
      {n:6,name:'창고',orig:'306 창고',cat:'staff',off:true,r:[30.4,32.6,8.6,12.6],d:[{s:'l',at:10.6}],desc:'전시 물품 보관 공간입니다.'},
      {n:7,name:'공조실',orig:'305 공조실',cat:'staff',off:true,r:[0,3.1,5.4,16.6],d:[{s:'b',at:1.6}],desc:'공조 설비 공간입니다. 관계자 외 출입을 제한합니다.',v:true},
    ],
    corridor:{t:'',r:[29.2,30.4,8.6,16.6]},
    gates:[{t:'입구 ①',x:25.8,y:1.6,w:1.3,kind:'in'},{t:'입구 ②',x:25.8,y:4.2,w:2.2,kind:'in'},{t:'출구 ③',x:25.8,y:7,w:1.3,kind:'out'}],
    core:[
      {t:'계단',r:[0,3.1,0,5.4]},{t:'계단',r:[35,39.3,0,8.6]},{t:'EV',r:[35.6,38.6,11,13.9]},
      {t:'화장실(남)',r:[32.6,39.3,14,16.3]},{t:'화장실(여)',r:[32.6,39.3,16.3,18.6]}],
    amen:['화장실(남·여) · 장애인 화장실','엘리베이터 1대','계단 2곳','유아실']},
  f2:{fl:'2F',title:'2층 · 영상관 · 활동실',sub:'인권 영상을 보고, 체험 활동에 참여하는 층입니다.',summary:'영상관1·2 · 활동실1·2',
    outline:[[0,0],[39.3,0],[39.3,18.6],[0,18.6]],
    rooms:[
      {n:1,name:'영상관1',orig:'205 중강당',renamed:true,cat:'video',r:[3.1,16.2,9,18.6],d:[{s:'b',at:5.2},{s:'b',at:14.6}],desc:'좌석이 있는 큰 상영관입니다. 인권 관련 영상을 정해진 시간에 상영합니다.'},
      {n:2,name:'영상관2',orig:'204 소강당',renamed:true,cat:'video',r:[16.2,24.6,9,18.6],d:[{s:'b',at:20.4}],desc:'작은 상영관입니다. 짧은 영상 상영과 해설 프로그램에 씁니다.'},
      {n:3,name:'활동실1',orig:'203 다목적실',renamed:true,cat:'activity',r:[24.6,32,12,18.6],d:[{s:'b',at:28.3}],desc:'체험 워크숍과 생각을 나누는 활동을 하는 공간입니다.'},
      {n:4,name:'활동실2',orig:'209 행복실',renamed:true,cat:'activity',r:[19.6,24.6,0,5.4],d:[{s:'t',at:22.1}],desc:'보드게임 등 놀이로 인권을 배우는 활동 공간입니다.'},
      {n:5,name:'홀',orig:'201 홀',cat:'hall',r:[24.6,35,0,12],desc:'계단과 엘리베이터 앞 로비입니다. 테이블 좌석이 있어 잠시 쉬어 갈 수 있습니다.'},
      {n:6,name:'사자후실',orig:'206 사자후실',cat:'staff',off:true,r:[3.1,9,0,5.4],d:[{s:'t',at:6}],desc:'소모임실입니다.'},
      {n:7,name:'희망실',orig:'207 희망실',cat:'staff',r:[9,14.4,0,5.4],d:[{s:'t',at:11.7}],desc:'소모임실입니다.'},
      {n:8,name:'지용실',orig:'208 지용실',cat:'staff',r:[14.4,19.6,0,5.4],d:[{s:'t',at:17}],desc:'소모임실입니다.'},
      {n:10,name:'계단 1',orig:'계단실-1',cat:'core',stair:true,r:[35,39.3,0,12],d:[{s:'l',at:6}],desc:'홀 옆 주계단입니다. 1층과 3층으로 오갈 수 있습니다.'},
      {n:11,name:'계단 2',orig:'계단실-2',cat:'core',stair:true,r:[0,3.1,0,5.4],desc:'복도 끝 보조 계단입니다.'},
      {n:9,name:'준비실',orig:'205A·205B 준비실',cat:'staff',off:true,r:[0,3.1,5.4,18.6],d:[{s:'r',at:7.2}],desc:'영상관1 운영을 위한 관계자 공간입니다.',v:true},
    ],
    corridor:{t:'복도',r:[3.1,24.6,5.4,9]},
    core:[
      {t:'EV',r:[35.6,38.6,12.1,14]},
      {t:'화장실(남)',r:[35,39.3,14,16.3]},{t:'화장실(여)',r:[35,39.3,16.3,18.6]},{t:'장애인 화장실',r:[32,35,12,18.6],v:true}],
    amen:['화장실(남·여) · 장애인 화장실','엘리베이터 1대','계단 2곳']},
  f1:{fl:'1F',title:'1층 · 입구 · 휴게',sub:'주출입구로 들어와 엘리베이터로 3층 전시관에 올라갑니다.',summary:'홀 · 휴게실 · 인권도서전',bottom:3.5,
    outline:[[-0.8,0],[39.3,0],[39.3,18.5],[25.6,18.5],[25.6,16],[-0.8,16]],
    rooms:[
      {n:1,name:'홀',orig:'104 홀',cat:'hall',r:[26.1,35.8,0,12],desc:'주출입구로 들어오면 만나는 로비입니다. 관람 안내를 받고 엘리베이터나 계단으로 3층 전시관에 올라갑니다.'},
      {n:2,name:'휴게실',orig:'106 휴게공간',cat:'rest',r:[25.6,29.3,12.5,18.5],d:[{s:'b',at:27.6}],desc:'관람 전후에 앉아 쉴 수 있는 공간입니다.'},
      {n:3,name:'대회의실',orig:'108 회의실',cat:'activity',r:[20.9,25.6,7.9,16],d:[{s:'b',at:23.2}],desc:'긴 회의 테이블이 있는 회의실입니다. 단체 관람 안내와 운영 회의에 씁니다.'},
      {n:4,name:'응접실',orig:'111 응접실',cat:'activity',r:[14.8,19.7,0,6],d:[{s:'t',at:17.2}],desc:'방문객과 손님을 맞이하는 공간입니다.'},
      {n:5,name:'사무실',orig:'107 사무실',cat:'staff',r:[19.7,26.1,0,6],d:[{s:'t',at:24.4}],desc:'전시 운영진이 일하는 사무 공간입니다.'},
      {n:6,name:'보성회실',orig:'107 보성회실',cat:'staff',r:[29.3,32.9,12.5,18.5],d:[{s:'b',at:31.1}],desc:'관계자 공간입니다.'},
      {n:7,name:'화광회실',orig:'110A 화광회실',cat:'staff',r:[8.9,14.8,0,6],d:[{s:'t',at:11.8}],desc:'관계자 공간입니다.'},
      {n:8,name:'칸나실',orig:'110 칸나실',cat:'staff',off:true,r:[2.6,8.9,0,6],d:[{s:'t',at:5.8}],desc:'관계자 공간입니다.'},
      {n:9,name:'화락실',orig:'117 화락실',cat:'staff',off:true,r:[18,20.9,7.9,16],d:[{s:'b',at:19.4}],desc:'관계자 공간입니다.',v:true},
      {n:10,name:'설비실',orig:'112 전기실 · 113 발전기실 · 114 보일러실',cat:'staff',off:true,r:[-0.8,18,8.2,16],d:[{s:'b',at:6},{s:'b',at:12.5}],desc:'전기·발전기·보일러 설비 공간입니다. 관계자 외 출입을 제한합니다.'},
      {n:11,name:'창고',orig:'116 창고',cat:'staff',off:true,r:[35.8,39.3,0,3.5],d:[{s:'l',at:1.8}],desc:'물품 보관 공간입니다.'},
      {n:13,name:'계단 1',orig:'계단실-1',cat:'core',stair:true,r:[35.8,39.3,3.5,12],d:[{s:'l',at:8}],desc:'홀 오른쪽 주계단입니다. 2층 영상관·활동실과 3층 전시관으로 올라갈 수 있습니다.'},
      {n:14,name:'계단 2',orig:'계단실-2',cat:'core',stair:true,r:[-0.8,2.6,0,6],d:[{s:'t',at:.9}],desc:'부출입구 1 옆 보조 계단입니다.'},
      {n:12,name:'인권도서전',orig:'실외 휴게공간',renamed:true,cat:'exhibit',outdoor:true,r:[34,39,-6.5,-1.5],d:[{s:'b',at:36.5}],desc:'주출입구 밖 오른쪽 실외 휴게공간에서 열리는 인권도서전입니다. 인권 관련 책을 둘러보며 쉬어 갈 수 있습니다.'},
    ],
    corridor:{t:'복도',r:[-0.8,26.1,6,8.2]},
    core:[
      {t:'EV',r:[33.5,35.9,12.6,15.4]},
      {t:'화장실(남)',r:[36.4,39.3,13.5,16]},{t:'화장실(여)',r:[36.4,39.3,16,18.5]}],
    entrances:[
      {t:'주출입구',x:31,y:0,dir:'up',main:true},
      {t:'부출입구 1',x:-0.8,y:7.1,dir:'right',inside:true},
      {t:'부출입구 2',x:25.6,y:17.25,dir:'right',len:1.9}],
    amen:['실외 휴게공간(인권도서전)','주출입구 · 부출입구 2곳','화장실(남·여)','엘리베이터 1대','계단 2곳','주차장 · 장애인 주차구역']}
};


// 자세한 설명 · 사진. photos 배열에 이미지 경로를 여러 개 넣으면 사진 넘겨보기로 표시됩니다. 예) photos:['photos/exhibit-1.jpg','photos/exhibit-2.jpg']
const DETAIL = {
  'f3-1':{where:'3층, 엘리베이터·계단 홀에서 바로 들어갑니다.',use:'메인 전시 관람',
    more:'인권교육 특별展의 중심 공간입니다. 인권의 의미와 역사, 아동의 권리를 다룬 패널을 주제별로 따라가며 볼 수 있고, 직접 참여하는 체험 코너와 기념 사진을 남길 수 있는 포토존이 함께 있습니다. 넓은 강당을 전시장으로 꾸며 단체 관람도 여유롭게 할 수 있습니다.',
    tips:['관람 시간 11:00 – 17:00','체험 코너는 안내에 따라 차례로 이용해 주세요','전시물은 눈으로 보고, 체험물만 만져 주세요']},
  'f3-2':{where:'3층 엘리베이터·계단 앞',use:'입장 대기 · 집결',
    more:'3층에 도착하면 처음 만나는 로비입니다. 단체 관람객이 모여 안내를 받거나, 전시관 입장 전 잠시 기다리는 장소로 씁니다.',
    tips:['화장실과 엘리베이터가 바로 옆에 있습니다']},
  'f3-3':{where:'3층 홀 안쪽, 방송실 옆',use:'영유아 동반 관람객 휴식',
    more:'아이와 함께 온 관람객이 잠시 쉬어 갈 수 있는 공간입니다. 관람 중 아이를 돌보거나 쉬어야 할 때 이용해 주세요.',
    tips:['필요하면 스태프에게 문의해 주세요']},
  'f2-1':{where:'2층 복도 왼쪽, 가장 큰 상영관',use:'인권 영상 상영',
    more:'좌석이 줄지어 놓인 큰 상영관입니다. 인권을 주제로 한 영상을 정해진 시간에 상영하며, 단체 관람객이 함께 보기 좋습니다.',
    tips:['상영 시간표는 현장 안내를 확인해 주세요','상영 중에는 휴대전화를 무음으로 해 주세요']},
  'f2-2':{where:'2층 복도 가운데, 영상관1 옆',use:'짧은 영상 · 해설 프로그램',
    more:'영상관1보다 작은 상영관입니다. 짧은 영상을 보거나 해설이 함께하는 소규모 프로그램을 진행합니다.',
    tips:['소규모 단체가 이용하기 좋습니다']},
  'f2-3':{where:'2층 홀 위쪽, 다목적실',use:'체험 워크숍 · 생각 나누기',
    more:'체험 활동과 워크숍이 열리는 공간입니다. 전시를 보고 느낀 점을 이야기하고, 서로의 생각을 나누는 활동을 합니다.',
    tips:['프로그램 시간은 현장 안내를 확인해 주세요']},
  'f2-4':{where:'2층 복도 끝, 홀 옆 (행복실)',use:'놀이로 배우는 인권',
    more:'보드게임 같은 놀이 활동으로 인권을 쉽고 재미있게 배우는 공간입니다. 어린이와 가족 관람객에게 추천합니다.',
    tips:['놀이 도구는 사용 후 제자리에 정리해 주세요']},
  'f2-5':{where:'2층 엘리베이터·계단 앞',use:'로비 · 휴식',
    more:'2층에 도착하면 만나는 로비입니다. 테이블 좌석이 있어 상영이나 활동을 기다리며 쉬어 갈 수 있습니다.',
    tips:['화장실과 엘리베이터가 바로 옆에 있습니다']},
  'f1-12':{where:'1층 주출입구 밖 오른쪽, 건물 바깥',use:'인권도서전 · 야외 휴식',
    more:'건물 밖 주출입구 오른쪽에 있는 실외 휴게공간을 비닐로 감싸 꾸민 인권도서전 ‘한 사람을 소중히 도서전’입니다. 인권을 주제로 한 책을 자유롭게 펼쳐 보고, 잠시 앉아 쉬어 갈 수 있습니다.',
    tips:['건물 밖에 있으니 주출입구로 나와 오른쪽으로 오세요','책은 읽은 뒤 제자리에 놓아 주세요']},
  'f1-1':{where:'1층, 주출입구 바로 안쪽',use:'관람 안내 · 이동',
    more:'주출입구로 들어오면 만나는 로비입니다. 이곳에서 관람 안내를 받은 뒤 엘리베이터나 계단으로 3층 전시관에 올라갑니다.',
    tips:['엘리베이터는 홀 오른쪽 안쪽에 있습니다','2층 영상관·활동실도 같은 엘리베이터로 갈 수 있습니다']},
  'f1-2':{where:'1층 홀 위쪽, 부출입구 2 옆',use:'관람 전후 휴식',
    more:'관람 전후에 앉아 쉴 수 있는 공간입니다. 일행을 기다리거나 잠시 쉬어 갈 때 이용해 주세요.',
    tips:[]},
  'f1-3':{where:'1층 복도 안쪽, 부출입구 2 가까이',use:'단체 안내 · 운영 회의',
    more:'긴 회의 테이블이 놓인 회의실입니다. 단체 관람객 사전 안내나 운영 회의에 씁니다.',
    tips:['사전 예약된 단체·관계자가 이용합니다']},
  'f1-4':{where:'1층 복도 앞쪽',use:'손님 맞이',
    more:'소파가 놓인 응접 공간입니다. 내빈과 방문 손님을 맞이할 때 씁니다.',
    tips:[]},
  'f1-5':{where:'1층 복도 끝, 홀 옆',use:'전시 운영',
    more:'전시 운영진이 일하는 사무 공간입니다. 분실물이나 운영 관련 문의는 스태프에게 말씀해 주세요.',
    tips:[]}
};

const NS='http://www.w3.org/2000/svg', H=18.6;
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const Y=y=>H-y;
let current='f1';

const origOf=rm=>rm.orig.replace(/\b\d{3}[A-Z]?(·\d{3}[A-Z]?)*\s*/g,'').replace(/\s*·\s*/g,' · ').trim();
const liveRooms=F=>F.rooms.filter(r=>!r.off);
const dispN=(F,rm)=>liveRooms(F).indexOf(rm)+1;
function rectOf(r){return {x:r[0],y:Y(r[3]),w:r[1]-r[0],h:r[3]-r[2]}}
function label(g,r,lines,size,vertical,dy=0){
  const b=rectOf(r), cx=b.x+b.w/2, cy=b.y+b.h/2+dy;
  const t=el('text',{x:cx,y:cy,'text-anchor':'middle','dominant-baseline':'middle','font-size':size,'font-weight':800},g);
  if(vertical)t.setAttribute('transform',`rotate(-90 ${cx} ${cy})`);
  lines.forEach((s,i)=>{const ts=el('tspan',{x:cx,dy:i===0?-(lines.length-1)*size*0.6:size*1.2},t);ts.textContent=s;
    if(i>0){ts.setAttribute('font-size',size*0.62);ts.setAttribute('font-weight',500)}});
  return t;
}
function draw(id){
  const F=FLOORS[id], svg=document.getElementById('plan');
  svg.innerHTML='';
  const VH=H+8.4+(F.bottom||0);
  svg.setAttribute('viewBox','-10 -3.8 56.8 '+VH);
  el('rect',{x:-10,y:-3.8,width:56.8,height:VH,fill:'var(--plan-bg)'},svg);
  const defs=el('defs',{},svg);
  const pat=el('pattern',{id:'hatch',width:.9,height:.9,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},defs);
  el('line',{x1:0,y1:0,x2:0,y2:.9,stroke:'var(--plan-wall)','stroke-width':.22,opacity:.45},pat);
  const pat2=el('pattern',{id:'hatchSel',width:.8,height:.8,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},defs);
  el('line',{x1:0,y1:0,x2:0,y2:.8,stroke:'var(--sel)','stroke-width':.26,opacity:.75},pat2);
  const gB=el('g',{},svg);
  el('polygon',{points:F.outline.map(p=>p[0]+','+Y(p[1])).join(' '),fill:'var(--plan-bg)',stroke:'var(--plan-wall)','stroke-width':.35,'stroke-linejoin':'round'},gB);
  if(F.corridor){const b=rectOf(F.corridor.r);el('rect',{x:b.x,y:b.y,width:b.w,height:b.h,fill:'var(--bg)'},gB);label(gB,F.corridor.r,[F.corridor.t],.8)}
  const gR=el('g',{},svg);
  // hall first so smaller rooms sit on top
  const rooms=[...F.rooms].sort((a,b)=>(a.cat==='hall'?-1:0)-(b.cat==='hall'?-1:0));
  rooms.forEach(rm=>{
    const b=rectOf(rm.r);
    if(rm.off){   // 시설정보가 필요 없는 실: 흐리게만 표시
      el('rect',{x:b.x+.12,y:b.y+.12,width:b.w-.24,height:b.h-.24,rx:.5,fill:'var(--c-off)',stroke:'var(--plan-wall)','stroke-width':.08,'stroke-opacity':.35,class:'room-off'},gR);
      const sz=Math.min(b.w>4.5?1:.9,((rm.v?b.h:b.w)-0.8)/rm.name.length);
      const t=label(gR,rm.lr||rm.r,[rm.name],sz,rm.v); t.style.fill='var(--off-label)'; t.setAttribute('font-weight',600);
      return;
    }
    const shape=el('rect',{x:b.x+.12,y:b.y+.12,width:b.w-.24,height:b.h-.24,rx:.5,fill:CAT[rm.cat].color,stroke:'var(--plan-wall)','stroke-width':.12,class:'room-shape','data-n':rm.n,tabindex:0,role:'button','aria-label':info(id,rm).name+' 상세보기 열기'},gR);
    if(rm.outdoor){shape.setAttribute('stroke-dasharray','.5 .35');shape.setAttribute('stroke-width',.16);}
    const open=()=>{focusRoom(rm.n,true);lastFocus=shape;openSheet(rm.n)};
    shape.addEventListener('click',open);
    shape.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
    if(rm.stair){for(let k=1;k<6;k++){const yy=b.y+b.h*k/6;el('line',{x1:b.x+.5,x2:b.x+b.w-.5,y1:yy,y2:yy,stroke:'var(--plan-wall)','stroke-width':.05,opacity:.35,'pointer-events':'none'},gR)}}
    const big=b.w>8&&b.h>5, size=Math.min(big?1.7:(b.w>4.5?1.05:.95),((rm.v?b.h:b.w)-0.8)/info(id,rm).name.length);
    label(gR,rm.lr||rm.r,rm.renamed&&(big||b.w>4.5)?[info(id,rm).name,'('+origOf(rm)+')']:[info(id,rm).name],size,rm.v,(!big&&!rm.v&&b.h<7)?.55:0);
    // number badge
    const bx=b.x+.95, by=b.y+.95;
    el('circle',{cx:bx,cy:by,r:.62,fill:'var(--surface)',stroke:'var(--plan-wall)','stroke-width':.08},gR);
    const nt=el('text',{x:bx,y:by+.03,'text-anchor':'middle','dominant-baseline':'middle','font-size':.72,'font-weight':900},gR);nt.textContent=dispN(F,rm);
  });
  const gC=el('g',{},svg);
  F.core.forEach(c=>{const b=rectOf(c.r);el('rect',{x:b.x+.12,y:b.y+.12,width:b.w-.24,height:b.h-.24,rx:.4,fill:'var(--c-core)',stroke:'var(--plan-wall)','stroke-width':.1},gC);
    label(gC,c.r,[c.t],Math.min(c.t.length>4?.62:.85,((c.v?b.h:b.w)-.5)/c.t.length*1.05),c.v);
    if(c.t==='계단'){for(let i=1;i<6;i++){const yy=b.y+b.h*i/6;el('line',{x1:b.x+.5,x2:b.x+b.w-.5,y1:yy,y2:yy,stroke:'var(--plan-wall)','stroke-width':.05,opacity:.35},gC)}}});
  const gD=el('g',{'pointer-events':'none'},svg);
  F.rooms.forEach(rm=>(rm.d||[]).forEach(d=>{const w=d.w||1.3,t=.42;let x,y,wd,ht;
    if(d.s==='b'||d.s==='t'){y=Y(d.s==='b'?rm.r[2]:rm.r[3]);x=d.at-w/2;wd=w;ht=t;y-=t/2}else{x=(d.s==='l'?rm.r[0]:rm.r[1])-t/2;y=Y(d.at)-w/2;wd=t;ht=w}
    el('rect',{x,y,width:wd,height:ht,rx:.12,fill:'var(--door)',stroke:'var(--plan-bg)','stroke-width':.08,opacity:rm.off?.3:1},gD)}));
  (F.gates||[]).forEach(gt=>{const col=gt.kind==='in'?'var(--teal)':'var(--orange)',x=gt.x,y=Y(gt.y),w=gt.w,t=.6;
    el('rect',{x:x-t/2,y:y-w/2,width:t,height:w,rx:.15,fill:col},gD);
    const tw=gt.t.length*.62+.9, lx=x-.75-tw;
    el('rect',{x:lx,y:y-.62,width:tw,height:1.24,rx:.62,fill:col},gD);
    const ar=gt.kind==='in'?`${lx+.55},${y} ${lx+1.05},${y-.36} ${lx+1.05},${y+.36}`:`${lx+1.05},${y} ${lx+.55},${y-.36} ${lx+.55},${y+.36}`;
    el('polygon',{points:ar,fill:'#fff'},gD);
    const tx=el('text',{x:lx+1.3,y:y+.04,'dominant-baseline':'middle','font-size':.66,'font-weight':900},gD);tx.textContent=gt.t;tx.style.fill='#fff';});
  (F.entrances||[]).forEach(en=>{
    const g=el('g',{'pointer-events':'none'},svg), x=en.x, y=Y(en.y), col=en.main?'var(--orange)':'var(--teal)';
    const fs=en.main?.86:.78, h=en.main?1.6:1.4, tw=en.t.length*fs*.98+1.7, gap=.85, horiz=en.dir!=='right';
    const L=en.len||2.8;
    if(horiz)el('rect',{x:x-L/2,y:y-.36,width:L,height:.72,rx:.2,fill:col},g);else el('rect',{x:x-.36,y:y-L/2,width:.72,height:L,rx:.2,fill:col},g);
    let px,py;   // pill top-left, placed outside the building
    if(en.dir==='up'){px=x-tw/2;py=y+gap}
    else if(en.dir==='down'){px=en.align==='right'?x+1.4-tw:x-tw/2;py=y-gap-h}
    else {px=en.inside?x+gap:x-gap-tw;py=y-h/2}
    el('rect',{x:px,y:py,width:tw,height:h,rx:h/2,fill:col},g);
    const ax=px+.75, ay=py+h/2, a=.36;
    const tri=en.dir==='up'?`${ax},${ay-a} ${ax-a},${ay+a*.8} ${ax+a},${ay+a*.8}`:en.dir==='down'?`${ax},${ay+a} ${ax-a},${ay-a*.8} ${ax+a},${ay-a*.8}`:`${ax+a},${ay} ${ax-a*.8},${ay-a} ${ax-a*.8},${ay+a}`;
    el('polygon',{points:tri,fill:'#fff'},g);
    const t=el('text',{x:px+1.35,y:ay+.05,'dominant-baseline':'middle','font-size':fs,'font-weight':900},g);t.textContent=en.t;t.style.fill='#fff';
  });
  // fit the drawing to the box: tight viewBox around everything drawn
  const bg=svg.firstElementChild; bg.remove();
  try{const bb=svg.getBBox(); if(bb.width>0&&bb.height>0){const p=.7,vb=[bb.x-p,bb.y-p,bb.width+p*2,bb.height+p*2];
    svg.setAttribute('viewBox',vb.map(v=>+v.toFixed(2)).join(' '));bg.setAttribute('x',vb[0]);bg.setAttribute('y',vb[1]);bg.setAttribute('width',vb[2]);bg.setAttribute('height',vb[3])}}catch(e){}
  svg.insertBefore(bg,svg.firstChild);
  // north-ish marker: elevator call-out for upper floors
}
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// ---- shared overrides (edited by people with edit access) ----
let OV={}, EDIT={db:null,assets:null,can:false};
function info(fid,rm){
  const F=FLOORS[fid], key=fid+'-'+rm.n, o=OV[key]||{};
  const D=DETAIL[key]||{where:F.fl+' '+origOf(rm)+' 위치',use:CAT[rm.cat].label,more:rm.desc+(rm.cat==='staff'?' 전시 기간에는 관계자만 이용합니다.':''),tips:[]};
  const pick=(k,def)=>(typeof o[k]==='string'&&o[k].trim()!=='')?o[k]:def;
  return {name:pick('name',rm.name),desc:pick('desc',rm.desc),more:pick('more',D.more),where:pick('where',D.where),use:pick('use',D.use),
    tips:Array.isArray(o.tips)?o.tips:(D.tips||[]),photos:Array.isArray(o.photos)?o.photos:(D.photos||[])};
}
const photoUrl=p=>p;
function renderRooms(id){
  const F=FLOORS[id], box=document.getElementById('rooms');
  box.innerHTML='';
  liveRooms(F).forEach(rm=>{
    const I=info(id,rm);
    const d=document.createElement('article');d.className='room';d.id='room-'+rm.n;
    d.innerHTML=`<div class="room-top"><span class="num" style="background:${CAT[rm.cat].color}">${dispN(F,rm)}</span><div><h3 class="${rm.renamed?'renamed':''}">${esc(I.name)}</h3>${origOf(rm)&&origOf(rm)!==I.name?`<div class="orig">${esc(origOf(rm))}</div>`:''}</div></div><span class="chip">${CAT[rm.cat].label}</span><p>${esc(I.desc)}</p><button class="more-btn" type="button">자세히 보기 →</button>`;
    d.addEventListener('click',e=>{focusRoom(rm.n,true);lastFocus=d.querySelector('.more-btn');openSheet(rm.n)});
    box.appendChild(d);
  });
  document.getElementById('amen').innerHTML=F.amen.map(a=>`<div><b>·</b>${a}</div>`).join('');
}
function focusRoom(n,noScroll){
  document.querySelectorAll('.room.hl').forEach(e=>e.classList.remove('hl'));
  document.querySelectorAll('svg .hatch').forEach(e=>e.remove());
  const card=document.getElementById('room-'+n); if(!card)return;
  card.classList.add('hl');
  const sh=document.querySelector(`.room-shape[data-n="${n}"]`);
  if(sh){const h=sh.cloneNode(false);h.removeAttribute('tabindex');h.removeAttribute('role');h.removeAttribute('aria-label');h.setAttribute('class','hatch');h.setAttribute('fill','url(#hatchSel)');h.setAttribute('stroke','var(--sel)');h.setAttribute('stroke-width','.34');sh.after(h);}
  if(!noScroll)card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
}
function show(id){
  if(!FLOORS[id])id='f1'; current=id; const F=FLOORS[id];
  document.querySelectorAll('.floor-btn').forEach(b=>b.setAttribute('aria-selected',b.dataset.id===id?'true':'false'));
  document.getElementById('floorTitle').textContent=F.title;
  document.getElementById('floorSub').textContent=F.sub;
  draw(id); renderRooms(id);
  const used=new Set([...F.rooms.map(r=>r.cat),'core']);
  document.getElementById('legend').innerHTML=Object.entries(CAT).filter(([k])=>used.has(k)).map(([k,v])=>`<span><i style="background:${v.color}"></i>${v.label}</span>`).join('')+`<span><i class="lg-door"></i>실 출입문</span>`+(F.entrances?`<span><i style="background:var(--orange);border-radius:50%"></i>건물 출입구</span>`:'')+(F.gates?`<span><i style="background:var(--teal);border-radius:50%"></i>전시관 입구</span><span><i style="background:var(--orange);border-radius:50%"></i>전시관 출구</span>`:'');
}

let lastFocus=null, sheetN=null, editing=false;
function openSheet(n){
  const F=FLOORS[current], rm=F.rooms.find(r=>r.n===n); if(!rm)return;
  sheetN=n; editing=false; lastFocus=lastFocus||document.activeElement;
  const I=info(current,rm);
  const photos=I.photos.length?I.photos.map(photoUrl):[null,null,null];
  let pi=0;
  const rooms=liveRooms(F), i=rooms.indexOf(rm), prev=rooms[(i-1+rooms.length)%rooms.length], next=rooms[(i+1)%rooms.length];
  const sh=document.getElementById('sheet');
  sh.innerHTML=`<div class="photo" id="galPhoto" style="background:${CAT[rm.cat].color}"><div id="galSlide" style="width:100%;height:100%;display:grid;place-items:center"></div>${photos.length>1?'<button class="gal-btn gal-prev" type="button" aria-label="이전 사진">‹</button><button class="gal-btn gal-next" type="button" aria-label="다음 사진">›</button><span class="gal-count" id="galCount"></span>':''}<span class="tag">${F.fl} · ${dispN(F,rm)}</span><button class="sheet-close" type="button" aria-label="닫기">×</button></div>
  ${photos.length>1?`<div class="thumbs" id="galThumbs">${photos.map((p,k)=>`<button class="thumb" type="button" data-k="${k}" aria-label="사진 ${k+1}">${p?`<img src="${esc(p)}" alt="">`:k+1}</button>`).join('')}</div>`:''}
  <div class="sheet-body"><div class="title-row"><div><h3 id="sheetTitle" class="${rm.renamed?'renamed':''}">${esc(I.name)}</h3>${origOf(rm)!==I.name?`<div class="orig">${esc(origOf(rm))}${rm.renamed?' · 전시 기간 명칭':''}</div>`:''}</div>${EDIT.can?'<button class="edit-btn" type="button" id="editBtn">정보 수정</button>':''}</div>
  <span class="chip">${CAT[rm.cat].label}</span>
  <p>${esc(I.more)}</p>
  <dl class="facts"><dt>위치</dt><dd>${esc(I.where)}</dd><dt>용도</dt><dd>${esc(I.use)}</dd></dl>
  ${I.tips.length?`<ul class="tips">${I.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}
  <div class="sheet-nav"><button type="button" data-go="${prev.n}">← ${esc(info(current,prev).name)}</button><button type="button" data-go="${next.n}">${esc(info(current,next).name)} →</button></div></div>`;

  const ph=`<div class="ph"><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="14" width="52" height="38" rx="6" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="33" r="10" fill="none" stroke="currentColor" stroke-width="3"/><rect x="22" y="8" width="20" height="8" rx="3" fill="currentColor"/></svg>`;
  const showPhoto=k=>{pi=(k+photos.length)%photos.length;const p=photos[pi];
    gp.classList.toggle('has-img',!!p);
    document.getElementById('galSlide').innerHTML=p?`<button class="gal-zoom" type="button" aria-label="${esc(I.name)} 사진 ${pi+1} 크게 보기"><img src="${esc(p)}" alt="${esc(I.name)} 사진 ${pi+1}"></button>`:`${ph}사진 ${pi+1} 준비 중입니다</div>`;
    const c=document.getElementById('galCount');if(c)c.textContent=`${pi+1} / ${photos.length}`;
    sh.querySelectorAll('.thumb').forEach(t=>t.setAttribute('aria-current',+t.dataset.k===pi?'true':'false'));};
  const gp=document.getElementById('galPhoto');let sx=null,swiped=false;
  showPhoto(0);
  sh.querySelector('.gal-prev')?.addEventListener('click',()=>showPhoto(pi-1));
  sh.querySelector('.gal-next')?.addEventListener('click',()=>showPhoto(pi+1));
  sh.querySelectorAll('.thumb').forEach(t=>t.addEventListener('click',()=>showPhoto(+t.dataset.k)));
  gp.addEventListener('pointerdown',e=>{sx=e.clientX;swiped=false});
  gp.addEventListener('click',e=>{if(!e.target.closest('.gal-zoom'))return;if(swiped){swiped=false;return}const list=photos.filter(Boolean);openLB(list,list.indexOf(photos[pi]),I.name)});
  gp.addEventListener('pointerup',e=>{if(sx===null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40){swiped=true;if(photos.length>1)showPhoto(pi+(dx<0?1:-1))}});
  sh.onkeydown=e=>{if(editing||e.target.closest('.sheet-nav'))return;if(e.key==='ArrowRight')showPhoto(pi+1);if(e.key==='ArrowLeft')showPhoto(pi-1)};
  sh.querySelector('.sheet-close').addEventListener('click',closeSheet);
  sh.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{const g=+b.dataset.go;focusRoom(g,true);openSheet(g)}));
  document.getElementById('editBtn')?.addEventListener('click',()=>openEditor(rm));
  document.getElementById('sheetBg').hidden=false;
  sh.scrollTop=0;
  sh.querySelector('.sheet-close').focus();
}

function openEditor(rm){
  editing=true;
  const key=current+'-'+rm.n, I=info(current,rm);
  let photos=[...I.photos];
  const sh=document.getElementById('sheet');
  sh.innerHTML=`<div class="sheet-body edit">
    <div class="title-row"><div><div class="eyebrow">시설 정보 수정</div><h3 id="sheetTitle">${esc(I.name)}</h3>${origOf(rm)!==I.name?`<div class="orig">${esc(origOf(rm))}</div>`:''}</div><button class="sheet-close static" type="button" aria-label="닫기">×</button></div>
    <label for="e-name">이름</label><input id="e-name" value="${esc(I.name)}" maxlength="40">
    <label for="e-desc">카드 설명 (짧게)</label><textarea id="e-desc" rows="2" maxlength="200">${esc(I.desc)}</textarea>
    <label for="e-more">자세한 설명</label><textarea id="e-more" rows="5" maxlength="2000">${esc(I.more)}</textarea>
    <div class="two"><div><label for="e-where">위치</label><input id="e-where" value="${esc(I.where)}" maxlength="120"></div><div><label for="e-use">용도</label><input id="e-use" value="${esc(I.use)}" maxlength="80"></div></div>
    <label for="e-tips">이용 안내 (한 줄에 하나씩)</label><textarea id="e-tips" rows="3" maxlength="1000">${esc(I.tips.join('\n'))}</textarea>
    <div class="ph-label">사진 <span id="e-count"></span></div>
    <div class="e-photos" id="e-photos"></div>
    <label class="upload" for="e-file">사진 추가 (여러 장 선택 가능)<input id="e-file" type="file" accept="image/*" multiple></label>
    <div class="e-status" id="e-status" role="status"></div>
    <div class="e-actions"><button type="button" class="ghost" id="e-cancel">취소</button><button type="button" class="primary" id="e-save">저장</button></div>
  </div>`;
  const st=document.getElementById('e-status');
  const drawPhotos=()=>{
    document.getElementById('e-count').textContent=photos.length?`${photos.length}장`:'';
    document.getElementById('e-photos').innerHTML=photos.length?photos.map((p,k)=>`<div class="e-ph"><img src="${esc(photoUrl(p))}" alt="사진 ${k+1}"><div class="e-ph-tools"><button type="button" data-mv="${k}" ${k===0?'disabled':''} aria-label="앞으로">←</button><button type="button" data-del="${k}" aria-label="삭제">삭제</button></div></div>`).join(''):'<div class="e-empty">아직 사진이 없습니다.</div>';
    document.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{photos.splice(+b.dataset.del,1);drawPhotos()}));
    document.querySelectorAll('[data-mv]').forEach(b=>b.addEventListener('click',()=>{const k=+b.dataset.mv;if(k>0){[photos[k-1],photos[k]]=[photos[k],photos[k-1]];drawPhotos()}}));
  };
  drawPhotos();
  const fileIn=document.getElementById('e-file');
  fileIn.addEventListener('change',async()=>{
    const files=[...fileIn.files]; if(!files.length)return;
    for(let k=0;k<files.length;k++){
      st.textContent=`사진 올리는 중… (${k+1}/${files.length})`;
      try{photos.push(await uploadPhoto(key,files[k]));drawPhotos();}
      catch(e){st.textContent=`${files[k].name}을(를) 올리지 못했습니다. ${'다시 시도해 주세요.'}`;fileIn.value='';return}
    }
    st.textContent='사진을 추가했습니다. 저장을 눌러야 반영됩니다.'; fileIn.value='';
  });
  const back=()=>openSheet(rm.n);
  sh.querySelector('.sheet-close').addEventListener('click',closeSheet);
  document.getElementById('e-cancel').addEventListener('click',back);
  document.getElementById('e-save').addEventListener('click',async e=>{
    const btn=e.currentTarget; btn.disabled=true; st.textContent='저장하는 중…';
    const v=id=>document.getElementById(id).value.trim();
    const body={name:v('e-name'),desc:v('e-desc'),more:v('e-more'),where:v('e-where'),use:v('e-use'),
      tips:v('e-tips').split('\n').map(t=>t.trim()).filter(Boolean),photos:photos.slice(0,30),floor:current,room:rm.n,updatedAt:new Date().toISOString()};
    try{const {error}=await SB.from('rooms').upsert({key,data:body,updated_at:body.updatedAt});if(error)throw error;OV[key]=body;renderRooms(current);draw(current);focusRoom(rm.n,true);openSheet(rm.n);}
    catch(err){btn.disabled=false;st.textContent=err&&(err.code==='42501'||/row-level security/i.test(err.message||''))?'수정 권한이 없는 계정입니다. 관리자에게 편집자 등록을 요청해 주세요.':'저장하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
  });
  sh.scrollTop=0;
  document.getElementById('e-name').focus();
}
function closeSheet(){
  document.getElementById('sheetBg').hidden=true; sheetN=null; editing=false;
  if(lastFocus&&lastFocus.focus)lastFocus.focus(); lastFocus=null;
}
document.getElementById('sheetBg').addEventListener('click',e=>{if(e.target.id==='sheetBg'&&!editing)closeSheet()});
document.addEventListener('keydown',e=>{if(LB.open){if(e.key==='Escape')closeLB();if(e.key==='+'||e.key==='=')lbZoom(LB.z*1.5);if(e.key==='-')lbZoom(LB.z/1.5);if(LB.z===1&&e.key==='ArrowRight')lbGo(1);if(LB.z===1&&e.key==='ArrowLeft')lbGo(-1);e.stopPropagation();return}if(e.key==='Escape'&&sheetN!==null&&!editing)closeSheet()},true);
// ---- full-size photo viewer ----
const LB={open:false,list:[],i:0,name:'',back:null,el:null,z:1,tx:0,ty:0};
(()=>{const d=document.createElement('div');d.className='lb';d.hidden=true;d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','사진 크게 보기');
  d.innerHTML='<div class="lb-stage"><img class="lb-img" alt="" draggable="false"></div><button class="lb-close" type="button" aria-label="닫기">×</button><button class="lb-nav lb-prev" type="button" aria-label="이전 사진">‹</button><button class="lb-nav lb-next" type="button" aria-label="다음 사진">›</button><div class="lb-zoom"><button type="button" class="lb-zo" aria-label="축소">−</button><span class="lb-zl">100%</span><button type="button" class="lb-zi" aria-label="확대">＋</button></div><span class="lb-count"></span><span class="lb-hint">두 번 누르거나 두 손가락으로 확대 · 확대 후 끌어서 이동</span>';
  document.body.appendChild(d);LB.el=d;
  const img=d.querySelector('.lb-img'), stage=d.querySelector('.lb-stage');
  d.querySelector('.lb-close').onclick=closeLB;d.querySelector('.lb-prev').onclick=()=>lbGo(-1);d.querySelector('.lb-next').onclick=()=>lbGo(1);
  d.querySelector('.lb-zi').onclick=()=>lbZoom(LB.z*1.5);d.querySelector('.lb-zo').onclick=()=>lbZoom(LB.z/1.5);
  // zoom around a screen point (cx,cy)
  window.lbZoom=(nz,cx,cy)=>{nz=Math.min(5,Math.max(1,nz));const r=stage.getBoundingClientRect();
    const px=(cx??r.left+r.width/2)-(r.left+r.width/2), py=(cy??r.top+r.height/2)-(r.top+r.height/2);
    LB.tx=px-(px-LB.tx)*nz/LB.z; LB.ty=py-(py-LB.ty)*nz/LB.z; LB.z=nz; if(nz===1){LB.tx=0;LB.ty=0} lbApply()};
  window.lbApply=()=>{const r=img.getBoundingClientRect(),w=r.width/LB.z,h=r.height/LB.z, mx=Math.max(0,(w*LB.z-w)/2), my=Math.max(0,(h*LB.z-h)/2);
    LB.tx=Math.max(-mx,Math.min(mx,LB.tx)); LB.ty=Math.max(-my,Math.min(my,LB.ty));
    img.style.transform=`translate(${LB.tx}px,${LB.ty}px) scale(${LB.z})`; d.classList.toggle('zoomed',LB.z>1);
    d.querySelector('.lb-zl').textContent=Math.round(LB.z*100)+'%'};
  img.addEventListener('dblclick',e=>{e.preventDefault();lbZoom(LB.z>1?1:2.5,e.clientX,e.clientY)});
  d.addEventListener('wheel',e=>{if(!LB.open)return;e.preventDefault();lbZoom(LB.z*(e.deltaY<0?1.2:1/1.2),e.clientX,e.clientY)},{passive:false});
  const pts=new Map(); let start=null, pinch=null, lastTap=0, moved=false, downT=null;
  d.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=false;downT=e.target;
    if(pts.size===1)start={x:e.clientX,y:e.clientY,tx:LB.tx,ty:LB.ty};
    if(pts.size===2){const [a,b]=[...pts.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),z:LB.z,cx:(a.x+b.x)/2,cy:(a.y+b.y)/2}}});
  d.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&pts.size===2){const [a,b]=[...pts.values()];moved=true;lbZoom(pinch.z*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d,pinch.cx,pinch.cy);return}
    if(start&&LB.z>1){const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;LB.tx=start.tx+dx;LB.ty=start.ty+dy;lbApply()}});
  const end=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);
    if(pinch){if(pts.size<2)pinch=null;start=null;return}
    if(!start)return;const dx=e.clientX-start.x;start=null;
    if(LB.z>1){return}
    if(Math.abs(dx)>40){lbGo(dx<0?1:-1);return}
    if(e.pointerType!=='mouse'&&downT===img){const now=Date.now();if(now-lastTap<300){lbZoom(2.5,e.clientX,e.clientY);lastTap=0;return}lastTap=now;return}
    if(downT===d||downT===stage)closeLB()};
  d.addEventListener('pointerup',end);d.addEventListener('pointercancel',e=>{pts.delete(e.pointerId);pinch=null;start=null});})();
function lbShow(){const im=LB.el.querySelector('.lb-img');LB.z=1;LB.tx=0;LB.ty=0;im.style.transform='';LB.el.classList.remove('zoomed');LB.el.querySelector('.lb-zl').textContent='100%';
  im.src=LB.list[LB.i];im.alt=`${LB.name} 사진 ${LB.i+1}`;
  const many=LB.list.length>1;LB.el.querySelector('.lb-count').textContent=many?`${LB.i+1} / ${LB.list.length}`:'';
  LB.el.querySelectorAll('.lb-nav').forEach(b=>b.hidden=!many);}
function lbGo(k){if(LB.list.length<2)return;LB.i=(LB.i+k+LB.list.length)%LB.list.length;lbShow()}
function openLB(list,i,name){if(!list.length)return;LB.list=list;LB.i=Math.max(0,i);LB.name=name;LB.back=document.activeElement;LB.open=true;lbShow();LB.el.hidden=false;LB.el.querySelector('.lb-close').focus()}
function closeLB(){LB.open=false;LB.el.hidden=true;if(LB.back&&LB.back.focus)LB.back.focus()}

// ---- floor directory (no URL hash; the site router owns the hash) ----
function initFacility(){
  const dir=document.getElementById('dir'); if(!dir)return; if(dir.dataset.ready){draw(current);return} dir.dataset.ready='1';
  ['f1','f2','f3'].forEach(id=>{const F=FLOORS[id];const b=document.createElement('button');b.className='floor-btn';b.dataset.id=id;b.type='button';b.setAttribute('role','tab');
    b.innerHTML=`<span class="fl">${F.fl}</span><span class="sum"><strong>${F.title.split(' · ').slice(1).join(' · ')}</strong><span class="s2">${F.summary}</span></span>`;
    b.addEventListener('click',()=>show(id));dir.appendChild(b)});
  const note=document.createElement('div');note.className='note';note.textContent='층을 누르면 안내도가 바뀝니다. 안내도의 실이나 아래 설명 카드를 누르면 사진과 자세한 설명이 바로 열립니다.';dir.appendChild(note);
  const en=document.createElement('div');en.className='edit-note';en.id='editNote';en.hidden=true;en.textContent='관리자로 로그인했습니다. ‘자세히 보기’에서 시설 정보를 수정할 수 있습니다.';dir.appendChild(en);
  show(current);
}
