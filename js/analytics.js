// Google Analytics 4 — config.js의 GA_ID가 있을 때만 동작
// 이 사이트는 #/facility 같은 해시 주소로 페이지를 바꾸므로, 주소가 바뀔 때마다 page_view를 직접 보냅니다.
(function(){
  var id=(window.GA_ID||'').trim(); if(!/^G-[A-Z0-9]+$/i.test(id))return;
  var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id); document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[]; function gtag(){dataLayer.push(arguments)} window.gtag=gtag;
  gtag('js',new Date()); gtag('config',id,{send_page_view:false});
  var last='';
  function send(){
    var h=location.hash.replace(/^#\/?/,'')||'home';
    h=h.replace(/^news\/[0-9a-f-]{36}$/i,'news/post');   // 게시글 ID는 묶어서 집계
    if(h===last)return; last=h;
    gtag('event','page_view',{page_path:'/'+h, page_location:location.origin+'/'+h, page_title:document.title+' · '+h});
  }
  window.addEventListener('hashchange',send); send();
})();
