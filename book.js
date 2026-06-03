/* ============================================================
   THE BOOK — flip engine (desktop) + reflow (mobile)
   ============================================================ */
(function(){
  var book   = document.getElementById('book');
  var stage  = document.getElementById('stage');
  var leftEl = document.getElementById('pageLeft');
  var rightEl= document.getElementById('pageRight');
  var leaf   = document.getElementById('leaf');
  var leafFront = document.getElementById('leafFront');
  var leafBack  = document.getElementById('leafBack');
  var prevBtn= document.getElementById('prevBtn');
  var nextBtn= document.getElementById('nextBtn');
  var spreadNoEl = document.getElementById('spreadNo');
  var spreadTotEl= document.getElementById('spreadTot');

  var sources = Array.prototype.slice.call(document.querySelectorAll('#pageSources > .pagesrc'));
  var N = sources.length;
  var SPREADS = Math.ceil(N/2);
  var spread = 0;
  var busy = false;
  var mobile = false;

  function pageHTML(i){ return (i<0||i>=N) ? '' : sources[i].innerHTML; }
  function leftIdx(s){ return s*2; }
  function rightIdx(s){ return s*2 + 1; }
  function isMobile(){ return window.matchMedia('(max-width: 820px)').matches; }

  /* ---- DESKTOP: paint a spread ---- */
  function paint(s){
    leftEl.innerHTML  = pageHTML(leftIdx(s));
    rightEl.innerHTML = pageHTML(rightIdx(s));
    leftEl.style.visibility  = (leftIdx(s)  < N) ? 'visible' : 'hidden';
    rightEl.style.visibility = (rightIdx(s) < N) ? 'visible' : 'hidden';
    spreadNoEl.textContent = String(s+1).padStart(2,'0');
    prevBtn.disabled = (s===0);
    nextBtn.disabled = (s>=SPREADS-1);
  }

  /* ---- MOBILE: stack every page in a scrollable column ---- */
  function mountMobile(){
    var html = '';
    sources.forEach(function(src,i){ html += '<div class="m-page" id="mp'+i+'">'+src.innerHTML+'</div>'; });
    leftEl.innerHTML = html;
    rightEl.innerHTML = '';
  }
  function scrollToPage(p){
    var el = document.getElementById('mp'+p);
    if(el){ window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 6, behavior:'smooth' }); }
  }

  /* ---- FLIP (desktop only) ---- */
  function goNext(){
    if(mobile){ return; }
    if(busy || spread>=SPREADS-1) return;
    busy = true;
    var ns = spread+1;
    leafFront.innerHTML = pageHTML(rightIdx(spread));
    leafBack.innerHTML  = pageHTML(leftIdx(ns));
    rightEl.innerHTML = pageHTML(rightIdx(ns));
    rightEl.style.visibility = (rightIdx(ns) < N) ? 'visible' : 'hidden';
    leaf.className = 'flip-next';
    leaf.style.display = 'block';
    leaf.style.transition = 'none';
    leaf.style.transform = 'rotateY(0deg)';
    void leaf.offsetWidth;
    requestAnimationFrame(function(){
      leaf.classList.add('lifting');
      leaf.style.transition = '';
      leaf.style.transform = 'rotateY(-180deg)';
    });
    onFlipEnd(function(){
      spread = ns;
      leftEl.innerHTML = pageHTML(leftIdx(spread));
      leftEl.style.visibility = (leftIdx(spread) < N) ? 'visible' : 'hidden';
      finishFlip();
    });
  }

  function goPrev(){
    if(mobile){ return; }
    if(busy || spread<=0) return;
    busy = true;
    var ps = spread-1;
    leafFront.innerHTML = pageHTML(leftIdx(spread));
    leafBack.innerHTML  = pageHTML(rightIdx(ps));
    leftEl.innerHTML = pageHTML(leftIdx(ps));
    leftEl.style.visibility = (leftIdx(ps) < N) ? 'visible' : 'hidden';
    leaf.className = 'flip-prev';
    leaf.style.display = 'block';
    leaf.style.transition = 'none';
    leaf.style.transform = 'rotateY(0deg)';
    void leaf.offsetWidth;
    requestAnimationFrame(function(){
      leaf.classList.add('lifting');
      leaf.style.transition = '';
      leaf.style.transform = 'rotateY(180deg)';
    });
    onFlipEnd(function(){
      spread = ps;
      rightEl.innerHTML = pageHTML(rightIdx(spread));
      rightEl.style.visibility = (rightIdx(spread) < N) ? 'visible' : 'hidden';
      finishFlip();
    });
  }

  function finishFlip(){
    spreadNoEl.textContent = String(spread+1).padStart(2,'0');
    prevBtn.disabled = (spread===0);
    nextBtn.disabled = (spread>=SPREADS-1);
    leaf.style.transition = 'none';
    leaf.style.display = 'none';
    leaf.classList.remove('lifting');
    leaf.style.transform = 'rotateY(0deg)';
    leafFront.innerHTML = '';
    leafBack.innerHTML = '';
    busy = false;
    persist();
  }

  function onFlipEnd(cb){
    var done = false;
    function fin(e){
      if(done) return;
      if(e && e.target !== leaf) return;
      done = true;
      leaf.removeEventListener('transitionend', fin);
      cb();
    }
    leaf.addEventListener('transitionend', fin);
    setTimeout(fin, 900);
  }

  /* jump to a spread (desktop) / scroll to it (mobile). arg = spread index */
  function jumpTo(s){
    s = Math.max(0, Math.min(SPREADS-1, s));
    if(mobile){ scrollToPage(s*2); return; }
    if(busy || s===spread) return;
    paint(s);
    spread = s;
    persist();
  }

  function persist(){ try{ localStorage.setItem('nk-book-spread', String(spread)); }catch(e){} }

  /* ---- SCALING (desktop only) ---- */
  function scale(){
    if(mobile){ book.style.transform = 'none'; return; }
    var pad = 64;
    var availW = window.innerWidth  - pad*2;
    var availH = window.innerHeight - pad*2;
    var k = Math.min(availW/1480, availH/980, 1.05);
    book.style.transform = 'scale(' + k + ')';
  }

  /* ---- LAYOUT SWITCH ---- */
  function applyLayout(initial){
    var m = isMobile();
    if(!initial && m===mobile){ scale(); return; }
    mobile = m;
    if(mobile){
      book.classList.add('mobile');
      mountMobile();
    } else {
      book.classList.remove('mobile');
      paint(spread);
    }
    scale();
  }
  window.addEventListener('resize', function(){ applyLayout(false); });

  /* ---- INPUT ---- */
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ closeToc(); return; }
    if(mobile) return;
    if(e.key==='ArrowRight' || e.key==='PageDown' || e.key===' '){ e.preventDefault(); goNext(); }
    else if(e.key==='ArrowLeft' || e.key==='PageUp'){ e.preventDefault(); goPrev(); }
    else if(e.key==='Home'){ jumpTo(0); }
    else if(e.key==='End'){ jumpTo(SPREADS-1); }
  });

  rightEl.addEventListener('click', function(e){
    if(mobile || e.target.closest('a,button')) return;
    goNext();
  });
  leftEl.addEventListener('click', function(e){
    if(mobile || e.target.closest('a,button')) return;
    var r = leftEl.getBoundingClientRect();
    if((e.clientX - r.left) < r.width*0.34) goPrev();
  });

  /* swipe (desktop flip only) */
  var tx=0, ty=0;
  stage.addEventListener('touchstart', function(e){ tx=e.touches[0].clientX; ty=e.touches[0].clientY; }, {passive:true});
  stage.addEventListener('touchend', function(e){
    if(mobile) return;
    var dx=e.changedTouches[0].clientX - tx, dy=e.changedTouches[0].clientY - ty;
    if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)){ if(dx<0) goNext(); else goPrev(); }
  }, {passive:true});

  /* ---- CONTENTS OVERLAY ---- */
  var tocOverlay = document.getElementById('tocOverlay');
  function openToc(){ tocOverlay.classList.add('open'); }
  function closeToc(){ tocOverlay.classList.remove('open'); }
  var tocBtn = document.getElementById('tocBtn');
  if(tocBtn) tocBtn.addEventListener('click', openToc);
  tocOverlay.addEventListener('click', function(e){ if(e.target===tocOverlay) closeToc(); });
  document.querySelectorAll('[data-toc-close]').forEach(function(el){ el.addEventListener('click', closeToc); });
  document.querySelectorAll('[data-jump]').forEach(function(btn){
    btn.addEventListener('click', function(){ jumpTo(parseInt(btn.getAttribute('data-jump'),10)); closeToc(); });
  });

  /* in-page contents links + restart (delegated) */
  document.addEventListener('click', function(e){
    var j = e.target.closest('[data-spread]');
    if(j){ e.preventDefault(); jumpTo(parseInt(j.getAttribute('data-spread'),10)); }
    var r = e.target.closest('[data-restart]');
    if(r){ e.preventDefault(); if(mobile){ window.scrollTo({top:0,behavior:'smooth'}); } else { jumpTo(0); } }
  });

  /* ---- THEME ---- */
  var root = document.documentElement;
  function syncTheme(){
    var light = root.classList.contains('light');
    var g = document.querySelector('#themeToggle .tt-glyph');
    var l = document.querySelector('#themeToggle .tt-label');
    if(g) g.innerHTML = light ? '&#9790;' : '&#9728;';
    if(l) l.textContent = light ? 'Dark' : 'Light';
  }
  var tbtn = document.getElementById('themeToggle');
  if(tbtn) tbtn.addEventListener('click', function(){
    root.classList.toggle('light');
    try{ localStorage.setItem('nk-theme', root.classList.contains('light') ? 'light':'dark'); }catch(e){}
    syncTheme();
  });
  syncTheme();

  /* ---- INIT ---- */
  spreadTotEl.textContent = String(SPREADS).padStart(2,'0');
  try{
    var saved = parseInt(localStorage.getItem('nk-book-spread')||'0',10);
    if(saved>0 && saved<SPREADS){ spread = saved; }
  }catch(e){}
  applyLayout(true);

  /* one-time hint (desktop only) */
  var hint = document.getElementById('hint');
  if(hint && !mobile){
    setTimeout(function(){ hint.classList.add('show'); }, 700);
    setTimeout(function(){ hint.classList.remove('show'); }, 3800);
  }
})();
