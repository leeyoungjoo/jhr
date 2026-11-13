// Google 태그 관리자(GTM) / Google Analytics 4 — config.js의 GA_ID가 있을 때만 동작
// 이 사이트는 #/facility 같은 해시 주소로 페이지를 바꾸므로, 주소가 바뀔 때마다 페이지 조회를 직접 알립니다.
(function(){
  var id=(window.GA_ID||'').trim(); window.dataLayer=window.dataLayer||[];
  var gtm=/^GTM-[A-Z0-9]+$/i.test(id), ga=/^G-[A-Z0-9]+$/i.test(id); if(!gtm&&!ga)return;
  if(gtm){
    // GTM 기본 설치 코드와 동일
    dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(id);document.head.appendChild(s);
  }else{
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.appendChild(g);
    window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',id,{send_page_view:false});
  }
  var last='';
  function send(){
    var h=location.hash.replace(/^#\/?/,'')||'home';
    h=h.replace(/^news\/[0-9a-f-]{36}$/i,'news/post');   // 게시글 ID는 묶어서 집계
    if(h===last)return; last=h;
    var p={page_path:'/'+h,page_location:location.origin+'/'+h,page_title:document.title};
    if(gtm)dataLayer.push(Object.assign({event:'virtual_page_view'},p));   // GTM 맞춤 이벤트 트리거 이름: virtual_page_view
    else gtag('event','page_view',p);
  }
  // 화면 제목이 바뀐 뒤에 보내도록 한 박자 늦춤
  window.addEventListener('hashchange',function(){setTimeout(send,0)}); window.addEventListener('load',function(){setTimeout(send,0)});
})();
