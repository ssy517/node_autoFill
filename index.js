const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: false, // headless: 백그라운드에서 작동하는 브라우저
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page = await browser.newPage();
    await page.goto('link');
    await page.evaluate(() => { //자바스크립트 코드 사용
      fun_zizum_select('14','1','');
      fun_days_select('2022-05-01','0');
      fun_theme_select('48','0');
    });
    page
    .waitForSelector('#theme_time_data', {visible : true}) //해당 태그의 콘텐츠가 로드될 때까지 대기
    //.then(() => console.log('got it'));
    await page.evaluate(() => { //선택 가능한 태그 구분 가능?
      fun_theme_time_select('1478','8');
      fun_submit();
    }); 
    await page.waitForNavigation({waitUntil: 'networkidle0'}); //Waits for the page to navigate to a new URL or to reload networkidle2 ?
    await page.type('[name="name"]', '박민정');
    await page.type('[name="mobile2"]', '2407');
    await page.type('[name="mobile3"]', '8533');
    await page.select('[name="person"]', '3');
    await page.click('[name="ck_agree"]');
    
    await page.waitForSelector('.spam_code');
    let element = await page.$('.spam_code');
    const codeVal = await page.evaluate(el => el.textContent, element);
    //console.log('%%%' + codeVal.trim());
    await page.type('[name="str_spam"]', codeVal.trim());

    await page.click('#but_exe');
  })();

