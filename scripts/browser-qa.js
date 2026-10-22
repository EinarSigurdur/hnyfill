// Playwright MCP evaluates this file as a function expression.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
async (page) => {
 const base='http://127.0.0.1:3017';const report=[];const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const check=(ok,msg)=>{if(!ok)throw new Error(msg);report.push(msg);};
 await page.addInitScript(()=>{window.__cls=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
 await page.setViewportSize({width:1440,height:900});
 await page.goto(base);await page.evaluate(()=>sessionStorage.removeItem('hnyfill-intro'));await page.reload();
 await page.waitForFunction(()=>document.querySelector('.intro')?.classList.contains('intro-active'));
 
 await page.waitForFunction(()=>!document.querySelector('.intro')?.classList.contains('intro-active'),{},{timeout:2500});
 check(await page.locator('h1').isVisible(),'Quick intro completes and leaves heading available');
 
 report.push({homeCLS:await page.evaluate(()=>window.__cls)});
 await page.locator('.recipe-chapter').scrollIntoViewIfNeeded();
 await page.goto(base+'/vorur/');await page.getByRole('button',{name:'Ferskt & fryst',exact:true}).click();
 check(await page.locator('.product-card').count()===4,'Fresh/frozen filter shows 4 products');
 await page.getByRole('searchbox').fill('thorsk');check(await page.locator('.product-card').count()===2,'ASCII search matches Icelandic þorsk names');
 await page.reload();await page.waitForFunction(()=>document.querySelector('input[type=search]').value==='thorsk');check(await page.locator('.product-card').count()===2,'Filter and search survive reload');
 await page.getByRole('searchbox').fill('zzzz');check(await page.locator('.empty-state').isVisible(),'Empty search state is visible');
 await page.getByRole('button',{name:'Sýna allar vörur'}).click();check(await page.locator('.product-card').count()===15,'Reset restores all 15 products');
 await page.locator('.product-menu summary').click();await page.getByRole('link',{name:'Meðlæti',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.result-count').textContent==='1 vara');
 await page.locator('.product-menu summary').click();await page.getByRole('link',{name:'Skoða allar vörur',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.result-count').textContent==='15 vörur');report.push('Desktop category navigation and show-all synchronize');
 await page.goto(base+'/vorur/beykireyktur-lax-i-sneidum/');check(await page.locator('.product-specs dd').innerText()==='100 g','Verified pack size appears');check(await page.locator('.product-recipe a').count()===1,'Product links to relevant recipe');
 for(const width of [320,390,768,1024]){
  await page.setViewportSize({width,height:844});
  for(const route of ['/','/vorur/','/vorur/beykireyktur-lax-i-sneidum/','/reykhus/']){
   await page.goto(base+route);await page.locator('h1').waitFor();
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px ${route}: no horizontal overflow`);
   
  }
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/');await page.getByRole('button',{name:'Opna valmynd'}).click();
 check(await page.locator('dialog').evaluate(el=>el.open),'Mobile dialog opens');
 await page.keyboard.press('Tab');check(await page.evaluate(()=>!!document.activeElement.closest('dialog')),'Keyboard focus stays inside mobile dialog');
 await page.keyboard.press('Escape');check(await page.getByRole('button',{name:'Opna valmynd'}).evaluate(el=>el===document.activeElement),'Escape closes menu and restores focus');
 await page.getByRole('button',{name:'Opna valmynd'}).click();await page.locator('dialog').getByRole('link',{name:'Fiskidagatal',exact:true}).click();await page.waitForURL('**/fiskidagatal/');check(!await page.locator('dialog').evaluate(el=>el.open),'Mobile navigation reaches fish calendar and closes');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/');check(await page.locator('.intro').evaluate(el=>getComputedStyle(el).display==='none'),'Reduced motion suppresses intro');
 await page.setViewportSize({width:1440,height:900});await page.goto(base+'/reykhus/');check(await page.locator('.process-sticky').evaluate(el=>getComputedStyle(el).display==='none'),'Reduced motion replaces sticky story with static steps');check(await page.locator('.mobile-process-photo').first().isVisible(),'Reduced motion keeps process photography visible');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();await page.locator('.process-step').nth(3).scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.process-count').textContent==='04');report.push('Scroll story follows fourth step');await page.locator('.process-step').first().scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.process-count').textContent==='01');report.push('Reverse scroll restores first step');
 await page.emulateMedia({reducedMotion:'reduce'});check(await page.locator('.process-sticky').evaluate(el=>getComputedStyle(el).display==='none'),'Changing motion preference live restores static flow');
 check(errors.length===0,'No browser runtime errors');return report;
}
