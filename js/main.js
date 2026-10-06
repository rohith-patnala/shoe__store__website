(function(){
  const root=document.documentElement;
  const savedTheme=localStorage.getItem('comfortstep-theme');
  if(savedTheme==='dark') root.classList.add('dark');

  function icons(){ if(window.lucide) lucide.createIcons(); }
  document.addEventListener('DOMContentLoaded',()=>{
    icons();

    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === current || (current === 'index.html' && href === 'index.html')) link.classList.add('active');
    });
    if (current === 'home-2.html') document.getElementById('homeNavItem')?.querySelector('.nav-link')?.classList.add('active');

    const themeBtn=document.getElementById('themeToggle');
    const mobileBtn=document.getElementById('mobileToggle');
    const nav=document.getElementById('mainNav');
    const rtlBtn=document.getElementById('rtlToggle');
    const homeItem=document.getElementById('homeNavItem');
    const homeToggle=document.getElementById('homeToggle');

    if(themeBtn) themeBtn.addEventListener('click',()=>{
      root.classList.toggle('dark');
      localStorage.setItem('comfortstep-theme',root.classList.contains('dark')?'dark':'light');
      themeBtn.setAttribute('aria-label',root.classList.contains('dark')?'Switch to light mode':'Switch to dark mode');
      const icon=themeBtn.querySelector('[data-lucide]'); if(icon) icon.setAttribute('data-lucide',root.classList.contains('dark')?'sun':'moon-star'); icons();
    });
    if(mobileBtn) mobileBtn.addEventListener('click',()=>nav && nav.classList.toggle('open'));
    if(homeToggle) homeToggle.addEventListener('click',e=>{
      if(window.innerWidth<=768){e.preventDefault();homeItem.classList.toggle('open');}
    });
    function updateDirectionLabel(){
      document.querySelectorAll('#rtlToggle,#bookingRtlToggle').forEach(btn=>{
        const label=btn.querySelector('.direction-label');
        const isRTL=document.documentElement.dir==='rtl';
        if(label) label.textContent=isRTL?'LTR':'RTL';
        btn.setAttribute('aria-label',isRTL?'Switch to LTR':'Switch to RTL');
        btn.setAttribute('title',isRTL?'LTR':'RTL');
      });
    }
    // Default the site to normal LTR on the first load after this update.
    // Once the visitor explicitly switches RTL/LTR, keep that chosen direction.
    const directionInitKey='comfortstep-dir-default-v2';
    if(localStorage.getItem(directionInitKey)!=='1'){
      localStorage.setItem('comfortstep-dir','ltr');
      localStorage.setItem(directionInitKey,'1');
    }
    const savedDir=localStorage.getItem('comfortstep-dir');
    document.documentElement.dir=savedDir || 'ltr';
    if(rtlBtn) rtlBtn.addEventListener('click',()=>{
      document.documentElement.dir=document.documentElement.dir==='rtl'?'ltr':'rtl';
      localStorage.setItem('comfortstep-dir',document.documentElement.dir);
      updateDirectionLabel();
    });
    const bookingRtl=document.getElementById('bookingRtlToggle');
    if(bookingRtl) bookingRtl.addEventListener('click',()=>{
      document.documentElement.dir=document.documentElement.dir==='rtl'?'ltr':'rtl';
      localStorage.setItem('comfortstep-dir',document.documentElement.dir);
      updateDirectionLabel();
    });
    updateDirectionLabel();
    const bookingTheme=document.getElementById('bookingThemeToggle');
    if(bookingTheme) bookingTheme.addEventListener('click',()=>{
      root.classList.toggle('dark');
      localStorage.setItem('comfortstep-theme',root.classList.contains('dark')?'dark':'light');
      bookingTheme.setAttribute('aria-label',root.classList.contains('dark')?'Switch to light mode':'Switch to dark mode');
      bookingTheme.setAttribute('title',root.classList.contains('dark')?'Light mode':'Dark mode');
      const icon=bookingTheme.querySelector('[data-lucide]'); if(icon) icon.setAttribute('data-lucide',root.classList.contains('dark')?'sun':'moon-star'); icons();
    });



    // Accessible FAQ accordion: clicking + opens the answer and changes it to −.
    document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      const open=item.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      const icon=btn.querySelector('svg');
      if(icon) icon.setAttribute('data-lucide',open?'minus':'plus');
      icons();
    }));

    document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
      const filter=btn.dataset.filter;
      document.querySelectorAll('.product-card').forEach(card=>card.style.display=(filter==='all'||card.dataset.category===filter)?'block':'none');
    }));

    // AOS: animate every content section, while intentionally excluding the header/footer.
    if(window.AOS){
      document.querySelectorAll('main section').forEach((section,index)=>{
        if(!section.hasAttribute('data-aos')){
          const effects=['fade-up','fade-right','fade-left','zoom-in'];
          section.setAttribute('data-aos',effects[index % effects.length]);
        }
        section.setAttribute('data-aos-duration','850');
        section.setAttribute('data-aos-once','true');
      });
      document.querySelectorAll('main section .section-head, main section .copy, main section .hero-content').forEach(el=>{
        if(!el.hasAttribute('data-aos')) el.setAttribute('data-aos','fade-up');
      });
      document.querySelectorAll('main section .card, main section .stat, main section .side-card').forEach((el,i)=>{
        if(!el.hasAttribute('data-aos')) el.setAttribute('data-aos','fade-up');
        if(!el.hasAttribute('data-aos-delay')) el.setAttribute('data-aos-delay',String((i%4)*80));
      });
      document.querySelectorAll('main section .image-split > div:first-child, main section .booking-side img').forEach(el=>{
        if(!el.hasAttribute('data-aos')) el.setAttribute('data-aos','fade-right');
      });
      document.querySelectorAll('main section .image-split > div:last-child').forEach(el=>{
        if(!el.hasAttribute('data-aos')) el.setAttribute('data-aos','fade-left');
      });
      AOS.init({duration:850,easing:'ease-out-cubic',once:true,offset:80,mirror:false});
      AOS.refresh();
    }

    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('is-visible')}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
      e.preventDefault(); const msg=form.querySelector('.form-message'); if(msg){msg.textContent='Thank you. Your request has been recorded for this demo template.';msg.classList.add('show');}
    }));
  });
})();
