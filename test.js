const puppeteer = require('puppeteer');
const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36`;
(async () => {
  const browser = await puppeteer.launch({headless: false,userDataDir:`U:\\`});//打开浏览器
  
  let page = await browser.newPage();//打开一个空白页
  await Promise.all([
    page.setUserAgent(userAgent),
    // 允许运行js
    page.setJavaScriptEnabled(true),
    // 设置页面视口的大小
    page.setViewport({width: 1920, height: 1080}),
  ]);
  await page.goto('https://www.alimama.com/');//打开阿里妈妈登录页面
  await page.click('#J_menu_login');
  let iframe = await page.frames().find(f => f.name() === 'taobaoLoginIfr'); 
  while(typeof(iframe) == "undefined"){
    await page.waitFor(1000);
    iframe = await page.frames().find(f => f.name() === 'taobaoLoginIfr');
  }
  await page.waitForNavigation({
    waitUntil: 'load'
  });
  if(page.url() === 'https://www.alimama.com/index.htm'){ 
      //登录成功
    console.log('登录成功');
    await page.goto('https://pub.alimama.com/manage/overview/index.htm');//打开淘宝联盟
    let liitem = await page.$$('.li-item');
    
    while(liitem.length == 0){
      await page.waitFor(1000);
      liitem = await page.$$('.li-item');
    }
    await liitem[1].click();
    await page.waitFor(1000);
    let promtManage = await page.$$('.sub-li');
    await promtManage[0].click();
    await page.waitFor(3000);
    let pages = await browser.pages()
    
    page = pages[2];
    await Promise.all([
      page.setUserAgent(userAgent),
      // 允许运行js
      page.setJavaScriptEnabled(true),
      // 设置页面视口的大小
      page.setViewport({width: 1920, height: 1080}),
    ]);
    await page.waitFor(2000);
    

    const promtPoduct = await page.$(`a[href="#!/promo/self/items"]`);
    await promtPoduct.click();
    await page.waitFor(1000);
    let linkConvert = await page.$('a[href="#!/promo/self/links"]');
    await linkConvert.click();
    await page.waitFor(1000);
    await page.type('textarea',`https://detail.tmall.com/item.htm?spm=a230r.1.14.32.358e214040fEQj&id=562927644651&ns=1&abbucket=12`);
    await page.click('.btn.btn-size25.btn-blue');
    await page.waitFor(1000);
    await page.click('.btn.btn-size28.mr10');
    await page.waitFor(1000);
    let shortLink = await page.$('#clip3');
    let shortLinkCtn = await page.evaluate(e => {return e.innerHTML;}, shortLink);
    console.log(shortLinkCtn);
    await page.click('.dialog-ext-close-x');
    await page.waitFor(1000);
    await page.type('textarea',`https://detail.tmall.com/item.htm?spm=a1z10.4-b-s.w5003-18859323010.2.86c22b29KvpO6G&id=575885034633&scene=taobao_shop`);
    await page.click('.btn.btn-size25.btn-blue');
    await page.waitFor(1000);
    await page.click('.btn.btn-size28.mr10');
    await page.waitFor(1000);
    shortLink = await page.$('#clip3');
    shortLinkCtn = await page.evaluate(e => {return e.innerHTML;}, shortLink);
    console.log(shortLinkCtn);
    await page.click('.dialog-ext-close-x');
    
  }
  await page.screenshot({path: 'example.png'});//截个图
})();