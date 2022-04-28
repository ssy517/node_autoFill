const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: false,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page = await browser.newPage();
    await page.goto('link');
    await page.evaluate(() => {
      fun_zizum_select('14','1','');
      fun_days_select('2022-05-01','0');
      fun_theme_select('48','0');
    });
    page
    .waitForSelector('#theme_time_data', {visible : true})
    //.then(() => console.log('got it'));
    await page.evaluate(() => {
      fun_theme_time_select('1478','8');
      fun_submit();
    }); 
    await page.waitForNavigation({waitUntil: 'networkidle2'});
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

