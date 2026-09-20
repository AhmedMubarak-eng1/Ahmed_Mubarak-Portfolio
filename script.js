/* ── NAV SCROLL ── */
(function(){
  var nav = document.getElementById('navbar');
  if(!nav) return;
  function u(){ nav.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', u, {passive:true});
  u();
})();

/* ── HAMBURGER ── */
(function(){
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if(!btn||!menu) return;
  btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('.mobile-link').forEach(function(l){
    l.addEventListener('click', function(){
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  });
})();

/* ── ACTIVE NAV ── */
(function(){
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a');
  if(!sections.length||!links.length) return;
  function mark(){
    var cur='';
    sections.forEach(function(s){ if(s.getBoundingClientRect().top<=90) cur=s.id; });
    links.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href')==='#'+cur||l.getAttribute('href')==='index.html#'+cur); });
  }
  window.addEventListener('scroll', mark, {passive:true});
  mark();
})();

/* ── SMOOTH SCROLL ── */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id==='#') return;
      var t = document.querySelector(id);
      if(!t) return;
      e.preventDefault();
      window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - 76, behavior:'smooth'});
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{threshold:0.1, rootMargin:'0px 0px -30px 0px'});
  els.forEach(function(el){ io.observe(el); });
})();

/* ── COUNTER ANIMATION ── */
(function(){
  var nums = document.querySelectorAll('.stat-num');
  if(!nums.length) return;
  function animate(el){
    var raw=el.textContent.trim();
    var m=raw.match(/^(\d+)(.*)/);
    if(!m) return;
    var target=parseInt(m[1]), suffix=m[2], dur=1100, start=performance.now();
    function tick(now){
      var p=Math.min((now-start)/dur,1);
      var e=1-Math.pow(1-p,3);
      el.textContent=Math.round(e*target)+suffix;
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ animate(e.target); io.unobserve(e.target); } });
  },{threshold:0.5});
  nums.forEach(function(n){ io.observe(n); });
})();

/* ── FOOTER YEAR ── */
var yr = document.getElementById('year');
if(yr) yr.textContent = new Date().getFullYear();

/* ── CONTACT FORM ── */
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.querySelector('#fname').value.trim();
    var mail = form.querySelector('#femail').value.trim();
    var subject = form.querySelector('#fsubject').value.trim();
    var msg  = form.querySelector('#fmsg').value.trim();
    if(!name||!mail||!msg){ showMsg('error','Please fill in all required fields.'); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)){ showMsg('error','Please enter a valid email.'); return; }
    var body = 'Name: '+name+'\nEmail: '+mail+'\n\n'+msg;
    var href = 'mailto:ahmed.mubarak.eng@gmail.com?subject='+encodeURIComponent(subject||'Portfolio inquiry from '+name)+'&body='+encodeURIComponent(body);
    showMsg('success','Opening your email application with a prepared draft. Please review it before sending.');
    window.location.href = href;
    function showMsg(type,text){
      var old=form.querySelector('.fmsg'); if(old) old.remove();
      var el=document.createElement('div'); el.className='fmsg';
      el.style.cssText='padding:12px 16px;border-radius:7px;font-size:.85rem;margin-top:8px;'+(type==='success'?'background:rgba(90,200,115,.1);border:1px solid rgba(90,200,115,.3);color:#6ecf8a;':'background:rgba(220,75,75,.1);border:1px solid rgba(220,75,75,.3);color:#e07575;');
      el.textContent=text; form.appendChild(el);
      setTimeout(function(){ el.remove(); },7000);
    }
  });
})();

/* ── ROLE-BASED RESUME CHOOSER ── */
(function(){
  var dialog = document.getElementById('resumeDialog');
  if(!dialog) return;
  var openers = document.querySelectorAll('[data-resume-open]');
  var closer = dialog.querySelector('[data-resume-close]');
  var lastTrigger = null;

  function openDialog(event){
    if(event) event.preventDefault();
    lastTrigger = event && event.currentTarget ? event.currentTarget : document.activeElement;
    if(typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
    document.body.classList.add('modal-open');
    if(closer) closer.focus();
  }

  function closeDialog(){
    if(typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  openers.forEach(function(opener){ opener.addEventListener('click', openDialog); });
  if(closer) closer.addEventListener('click', closeDialog);

  dialog.addEventListener('click', function(event){
    if(event.target === dialog) closeDialog();
  });

  dialog.addEventListener('close', function(){
    document.body.classList.remove('modal-open');
    if(lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  });
})();
