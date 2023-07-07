const puppeteer = require('puppeteer');
(async () => {
    try{
        const browser = await puppeteer.launch({headless: false, // headless: 백그라운드에서 작동하는 브라우저, false일 경우 가시적 확인 가능
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // 왜 굳이?
        });
        const page = await browser.newPage();
        await page.goto('link');
        await page.evaluate(() => { //자바스크립트 코드 사용
          fun_zizum_select('14','4','');
          fun_days_select('2023-07-13','12');
          fun_theme_select('48','0');
        });
        page
        .waitForSelector('#theme_time_data', {visible : true}) //해당 태그의 콘텐츠가 로드될 때까지 대기
        //.then(() => console.log('got it'));
        await page.evaluate(() => { //선택 가능한 태그 구분 가능?
          fun_theme_time_select('1470','0');
          fun_submit();
        }); 
        await page.waitForNavigation({waitUntil: 'networkidle0'}); //Waits for the page to navigate to a new URL or to reload networkidle2 ?
        page.click('[name="ck_agree"]');
        page.type('[name="name"]', '박민정');
        page.type('[name="mobile2"]', '2407');
        page.type('[name="mobile3"]', '8533');
        page.select('[name="person"]', '3');    
        
        //await page.waitForSelector('.spam_code');
        //let element = await page.$('.spam_code');
        //const codeVal = await page.evaluate(el => el.textContent, element);
        //console.log('%%%' + codeVal.trim());
        //await page.type('[name="str_spam"]', codeVal.trim());
    
        //await page.click('#but_exe');
    } catch(err){
        console.log(err);
    }
  })();

