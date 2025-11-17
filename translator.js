(function(){
  const DEFAULT = 'en';
  const supported = ['en','es','pt'];
  function setActiveButton(lang){
    document.querySelectorAll('.lang-switcher button').forEach(b=>{
      b.classList.toggle('active', b.getAttribute('data-lang')===lang);
    });
  }
  function setLangAttr(lang){ document.documentElement.lang = lang; }
  function applyTranslations(data){
    document.querySelectorAll('[data-key]').forEach(el=>{
      const key = el.getAttribute('data-key');
      if(!key) return;
      if(data[key]){
        // allow simple HTML in some keys
        el.innerHTML = data[key];
      }
    });
  }
  function loadLanguage(lang){
    if(!supported.includes(lang)) lang = DEFAULT;
    fetch('./lang/' + lang + '.json').then(r=>r.json()).then(data=>{
      applyTranslations(data);
      localStorage.setItem('site_lang', lang);
      setActiveButton(lang);
      setLangAttr(lang);
    }).catch(err=>console.error('lang load', err));
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.lang-switcher button').forEach(b=>{
      b.addEventListener('click', ()=> loadLanguage(b.getAttribute('data-lang')));
    });
    const stored = localStorage.getItem('site_lang') || (navigator.language || navigator.userLanguage || 'en').slice(0,2);
    loadLanguage(stored);
  });
})();