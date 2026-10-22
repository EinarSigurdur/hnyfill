'use client';
import Link from './site-link';
import {withBasePath} from '@/lib/paths';
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {ResponsiveImage} from './responsive-image';
import {usePathname} from 'next/navigation';
import {type Lang,type Product,nav,url,text,photos,categories,productName,categoryName} from '@/lib/content';
function ProductMenu({lang}:{lang:Lang}){
 const ref=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{const outside=(e:PointerEvent)=>{if(!ref.current?.contains(e.target as Node)&&ref.current)ref.current.open=false;};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'&&ref.current?.open){ref.current.open=false;ref.current.querySelector('summary')?.focus();}};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};},[]);
 return <details className="product-menu" ref={ref}><summary>{text(lang,'Vörurnar','Products')} </summary><div className="mega-menu"><div><p>{text(lang,'Úrvalið okkar','Our collection')}</p>{categories.slice(1).map(c=><a key={c.id} href={url(lang,'vorur')+'?flokkur='+c.id} onClick={()=>{if(ref.current)ref.current.open=false;}}>{c[lang]}</a>)}<a className="mega-all" href={url(lang,'vorur')} onClick={()=>{if(ref.current)ref.current.open=false;}}>{text(lang,'Skoða allar vörur','Explore all products')} </a></div><Link className="mega-feature" href={url(lang,'vorur/beykireyktur-lax-i-sneidum')} onClick={()=>{if(ref.current)ref.current.open=false;}}><img src={photos.salmon} width="400" height="300" alt={text(lang,'Reyktur lax','Smoked salmon')}/><span>{text(lang,'Handverkið úr reykhúsinu','Crafted in our smokehouse')}</span></Link></div></details>;
}
export function Header({lang}:{lang:Lang}){
 const path=usePathname().replace(/\/$/,'')||'/';
 const dialog=useRef<HTMLDialogElement>(null);const menu=useRef<HTMLButtonElement>(null);
 const counterpart=withBasePath(lang==='en'?(path.replace(/^\/en/,'')||'/'):'/en'+(path==='/'?'':path));
 const close=()=>{dialog.current?.close();document.body.style.overflow='';menu.current?.focus();};
 useEffect(()=>()=>{document.body.style.overflow='';},[]);
 return <><header className="header"><Link className="brand" href={url(lang)} aria-label={text(lang,'Hnýfill – forsíða','Hnýfill – home')}><img src={photos.logo} width="350" height="311" alt="Hnýfill"/></Link><nav className="desktop-nav" aria-label={text(lang,'Aðalvalmynd','Main navigation')}>{nav.map(([href,is,en])=>href==='vorur'?<ProductMenu key={href} lang={lang}/>:<Link key={href} href={url(lang,href)} aria-current={withBasePath(path)===url(lang,href)?'page':undefined}>{text(lang,is,en)}</Link>)}</nav><div className="nav-end"><a className="language" href={counterpart} onClick={e=>{if(location.search){e.preventDefault();location.assign(counterpart+location.search);}}} hrefLang={lang==='is'?'en':'is'} lang={lang==='is'?'en':'is'} aria-label={lang==='is'?'Switch to English':'Skipta yfir á íslensku'}>{lang==='is'?'EN':'IS'}</a><Link className="contact-link" href={url(lang,'hafa-samband')}>{text(lang,'Hafa samband','Contact')}</Link><button className="menu-toggle" ref={menu} onClick={()=>{dialog.current?.showModal();document.body.style.overflow='hidden';}} aria-label={text(lang,'Opna valmynd','Open menu')}><span/><span/></button></div></header><dialog className="menu-dialog" aria-label={text(lang,'Aðalvalmynd','Main navigation')} ref={dialog} onCancel={close} onClose={()=>{document.body.style.overflow='';}}><div className="menu-top"><img src={photos.logo} alt="Hnýfill" width="70" height="62"/><button onClick={close} autoFocus>{text(lang,'Loka','Close')} <span aria-hidden="true">×</span></button></div><nav aria-label={text(lang,'Farsímavalmynd','Mobile navigation')}>{[...nav,['hafa-samband','Hafa samband','Contact']].map(([href,is,en],i)=><Link style={{animationDelay:`${i*45}ms`}} key={href} href={url(lang,href)} onClick={close}>{text(lang,is,en)}</Link>)}</nav><div className="menu-bottom"><a href="tel:+3544621751">+354 462 1751</a><a href="mailto:pantanir@hnyfill.is">pantanir@hnyfill.is</a></div></dialog></>;
}
export function Motion({home=false}:{home?:boolean}){
 const path=usePathname();const intro=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  if(!home)return;
  const node=intro.current;const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let seen=true;try{seen=sessionStorage.getItem('hnyfill-intro')==='yes';sessionStorage.setItem('hnyfill-intro','yes');}catch{}
  const hide=()=>node?.classList.remove('intro-active');
  if(!seen&&!reduce.matches&&!location.hash)node?.classList.add('intro-active');
  const timer=setTimeout(hide,1000);
  const events=['pointerdown','keydown','wheel','touchstart'] as const;
  events.forEach(e=>window.addEventListener(e,hide,{once:true,passive:true}));reduce.addEventListener('change',hide);
  return()=>{clearTimeout(timer);hide();events.forEach(e=>window.removeEventListener(e,hide));reduce.removeEventListener('change',hide);};
 },[home]);
 useEffect(()=>{
  let disposed=false;let revert:(()=>void)|undefined;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const setup=()=>{
   if(reduce.matches||disposed)return;
   Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([g,s])=>{
    if(disposed||reduce.matches)return;
    const gsap=g.default;gsap.registerPlugin(s.ScrollTrigger);const mm=gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
     if(home&&!location.hash)gsap.from('.hero-title span',{y:24,opacity:.55,duration:.75,stagger:.08,ease:'power3.out',clearProps:'all'});
     if(!home&&!location.hash){
      gsap.from('#main h1',{y:18,opacity:.72,duration:.65,ease:'power3.out',clearProps:'all'});
     }
     document.querySelectorAll('.workshop-heading,.people-heading,.trade-intro>h2,.trade-intro>p,.timeline article,.recipe-instructions>div').forEach(el=>{
      gsap.from(el,{y:18,opacity:.75,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},clearProps:'all'});
     });
     document.querySelectorAll('.people-card').forEach(el=>{
      gsap.from(el,{y:12,opacity:.82,duration:.55,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true},clearProps:'all'});
     });
     document.querySelectorAll('.image-reveal').forEach(el=>{
      const image=el.querySelector('img');if(!image)return;
      gsap.from(image,{scale:1.035,duration:1.15,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},clearProps:'transform'});
     });
    });
    mm.add('(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)',()=>{
     if(home){
      gsap.fromTo('.hero-image img',{scale:1.045,yPercent:-1},{scale:1.005,yPercent:1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
      gsap.fromTo('.craft-detail',{y:24},{y:-24,ease:'none',scrollTrigger:{trigger:'.intro-story',start:'top bottom',end:'bottom top',scrub:.6}});
     }
     const storyCover=document.querySelector('.intro-sagan .intro-portrait');
     if(storyCover)gsap.fromTo(storyCover,{y:0},{y:24,ease:'none',scrollTrigger:{trigger:'.intro-sagan',start:'top top',end:'bottom top',scrub:.7}});
     const images=document.querySelectorAll('.process-photo');
     document.querySelectorAll('.process-step').forEach((el,i)=>s.ScrollTrigger.create({trigger:el,start:'top center',end:'bottom center',onToggle:self=>{if(self.isActive){images.forEach((p,j)=>p.classList.toggle('active',i===j));document.querySelector('.process-count')?.replaceChildren(document.createTextNode(String(i+1).padStart(2,'0')));}}}));
     return()=>images.forEach((p,i)=>p.classList.toggle('active',i===0));
    });
    revert=()=>mm.revert();
   }).catch(()=>{/* Static content remains available if motion cannot load. */});
  };
  const change=()=>{revert?.();revert=undefined;setup();};setup();reduce.addEventListener('change',change);
  return()=>{disposed=true;revert?.();reduce.removeEventListener('change',change);};
 },[home,path]);
 const en=path.startsWith('/en');
 return home?<div className="intro" ref={intro} aria-hidden="true"><div className="intro-smoke"/><svg className="intro-water" viewBox="0 0 1000 220" preserveAspectRatio="none"><path d="M-100 140 C100 20 200 220 400 120 S700 20 1100 120"/><path d="M-100 160 C100 40 200 240 400 140 S700 40 1100 140"/><path d="M-100 180 C100 60 200 260 400 160 S700 60 1100 160"/></svg><div className="intro-logo"><img src={photos.logo} alt="" width="100" height="89"/></div><p>Akureyri · {en?'Since':'Frá'} 1995</p></div>:null;
}
function fold(s:string){return s.toLocaleLowerCase('is').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ð/g,'d').replace(/þ/g,'th').replace(/æ/g,'ae');}
export function Catalog({items,lang}:{items:Product[];lang:Lang}){
 const [query,setQuery]=useState('');const [category,setCategory]=useState('all');
 useEffect(()=>{const sync=()=>{const p=new URLSearchParams(location.search);setCategory(categories.some(c=>c.id===p.get('flokkur'))?p.get('flokkur')!:'all');setQuery(p.get('q')||'');};sync();window.addEventListener('popstate',sync);return ()=>window.removeEventListener('popstate',sync);},[]);
 const update=(c:string,q:string)=>{setCategory(c);setQuery(q);const params=new URLSearchParams();if(c!=='all')params.set('flokkur',c);if(q)params.set('q',q);history.replaceState(null,'',location.pathname+(params.size?'?'+params.toString():''));};
 const filtered=items.filter(p=>(category==='all'||p.category===category)&&fold(productName(p,lang)).includes(fold(query)));
 return <div className="catalog"><div className="catalog-tools"><div className="filter-tabs" aria-label={text(lang,'Vöruflokkar','Product categories')}>{categories.map(c=><button key={c.id} aria-pressed={category===c.id} onClick={()=>update(c.id,query)}>{c[lang]}</button>)}</div><label className="search"><span className="sr-only">{text(lang,'Leita að vöru','Search products')}</span><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/></svg><input type="search" value={query} onChange={e=>update(category,e.target.value)} placeholder={text(lang,'Leita að vöru','Search products')}/></label></div><p className="result-count" aria-live="polite">{filtered.length} {text(lang,filtered.length===1?'vara':'vörur',filtered.length===1?'product':'products')}</p><div className="product-grid">{filtered.map(p=><Link className="product-card" key={p.slug} href={url(lang,'vorur/'+p.slug)}><div className="pack-image"><ResponsiveImage src={p.image} alt={productName(p,lang)} sizes="(max-width:600px) 44vw, (max-width:899px) 45vw, 28vw"/></div><p>{categoryName(p.category,lang)}</p><h2>{productName(p,lang)}</h2></Link>)}</div>{!filtered.length&&<div className="empty-state"><h2>{text(lang,'Engar vörur fundust','No products found')}</h2><p>{text(lang,'Prófaðu annað leitarorð eða skoðaðu allar vörur.','Try another search term or browse the full range.')}</p><button className="button" onClick={()=>update('all','')}>{text(lang,'Sýna allar vörur','Show all products')}</button></div>}</div>;
}
export function Inquiry({lang,subject=''}:{lang:Lang;subject?:string}){
 const [ready,setReady]=useState(false);
 const [draft,setDraft]=useState('');
 const [copied,setCopied]=useState(false);
 const subjectInput=useRef<HTMLInputElement>(null);
 useEffect(()=>{const params=new URLSearchParams(location.search);const product=params.get('vara');const enquiry=params.get('erindi');if(subjectInput.current&&(product||enquiry))subjectInput.current.value=(product?text(lang,'Fyrirspurn um: ','Enquiry about: ')+product:enquiry!).slice(0,200);},[lang]);
 return <form className="inquiry" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);const body=`${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}\n${f.get('company')||''}`;window.location.href=`mailto:pantanir@hnyfill.is?subject=${encodeURIComponent(String(f.get('subject')))}&body=${encodeURIComponent(body)}`;setReady(true);}}><h2>{text(lang,'Hvað getum við gert fyrir þig?','How can we help?')}</h2><div className="form-row"><label>{text(lang,'Nafn','Name')}<input name="name" autoComplete="name" required/></label><label>{text(lang,'Netfang','Email')}<input name="email" type="email" autoComplete="email" required/></label></div><label>{text(lang,'Fyrirtæki eða hópur (valfrjálst)','Company or group (optional)')}<input name="company" autoComplete="organization"/></label><label>{text(lang,'Erindi','Subject')}<input ref={subjectInput} name="subject" defaultValue={subject||text(lang,'Fyrirspurn til Hnýfils','Enquiry to Hnýfill')} required/></label><label>{text(lang,'Skilaboð','Message')}<textarea name="message" rows={5} required/></label><p className="form-note">{text(lang,'Opnar tölvupóstforritið þitt með erindinu tilbúnu. Þú sendir póstinn þar. Upplýsingarnar eru ekki vistaðar á þessum vef.','Opens your email application with a prepared message. You send it from there. This website does not store your details.')}</p><button className="button" type="submit">{text(lang,'Útbúa tölvupóst','Prepare email')}</button><button className="button copy-enquiry" type="button" onClick={async e=>{const form=e.currentTarget.form;if(!form?.reportValidity())return;const f=new FormData(form);const message=`${text(lang,'Til','To')}: pantanir@hnyfill.is\n${text(lang,'Erindi','Subject')}: ${f.get('subject')}\n\n${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}\n${f.get('company')||''}`;setDraft(message);setCopied(false);try{await navigator.clipboard.writeText(message);setCopied(true);}catch{/* The visible text remains available for manual copying. */}}}>{text(lang,'Afrita fyrir vefpóst','Copy for webmail')}</button>{draft&&<div className="enquiry-draft"><p role="status">{copied?text(lang,'Erindið er afritað. Límdu það í tölvupóst og sendu á pantanir@hnyfill.is.','Copied. Paste into an email and send to pantanir@hnyfill.is.'):text(lang,'Veldu og afritaðu textann hér. Sendu hann með tölvupósti á pantanir@hnyfill.is.','Select and copy the text below. Email it to pantanir@hnyfill.is.')}</p><label>{text(lang,'Erindi til að afrita — hefur ekki verið sent','Message to copy — not sent')}<textarea readOnly value={draft} rows={8} onFocus={e=>e.currentTarget.select()}/></label></div>}{ready&&<p role="status">{text(lang,'Erindið er tilbúið í tölvupóstforritinu ef það er uppsett. Þú getur líka skrifað beint á pantanir@hnyfill.is.','Your message opens in your email app if configured. You can also write directly to pantanir@hnyfill.is.')}</p>}</form>;
}
