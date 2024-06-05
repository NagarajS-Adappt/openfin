const {
	MouseButton,
	OpenFinHome,
	OpenFinNotifications,
	OpenFinProxy,
	OpenFinSystem,
	WebDriver,
	WebDriverKeys
} = require('@openfin/automation-helpers');
const { NativeDriver, NativeDriverKeys } = require('@openfin/automation-native');
const expectChai = require('chai').expect;
// const { By } = require('selenium-webdriver');  
const { expect, browser, $ } = require('@wdio/globals');
const { Key } = require('webdriverio');
const request = require('supertest');


describe('Register with Home', () => {
	it('The runtime is ready', async () => {
		const isReady = await OpenFinSystem.waitForReady(10000);
		expectChai(isReady).to.equal(true);
    await browser.pause(2000);
	});

	it('Can switch to platform window', async () => {
        await browser.switchWindow('Platform Provider');
        console.log('Switched to platform window');
        await browser.pause(2000);
	});


  //   it('The runtime version should be set', async () => {
	// 	const fin = await OpenFinProxy.fin();
	// 	const version = await fin.System.getVersion();
	// 	expectChai(version).to.equal('34.118.78.80');
	// });

    it('The identity should be set', async () => {
		const fin = await OpenFinProxy.fin();
		expectChai(fin.me.identity.name).to.equal('register-with-home');
		expectChai(fin.me.identity.uuid).to.equal('register-with-home');
	});

    it('Can get a list of windows', async () => {
        const handles = await browser.getWindowHandles();
        // await browser.switchToWindow(handles[0])
        expectChai(handles.length).to.greaterThan(0);
         console.log('Title :', await browser.getTitle())
    });

  //   it('Can launch notification center in a security realm', async () => {
	// 	const launched = await OpenFinNotifications.launch();
	// 	expectChai(launched).to.equal(true);

	// 	if(launched) {
	// 		await OpenFinNotifications.toggle();
	// 	}
	// });

    it('Can open the home window', async () => {
		const isShown = await OpenFinHome.show(30000);
		expectChai(isShown).to.equal(true);

		await WebDriver.saveScreenshot();
		//await OpenFinNotifications.toggle();
	});

    it('Can perform a conditional Node Webdriver specific test', async () => {
		if(browser) {
            const elem = await $('//*[@id="search-input"]');
            expectChai(elem).to.exist;
            //  type
            // await elem.setValue('test')
        }
	});

	it('Can perform a conditional specific test', async () => {
		if(browser) {
            const elem = await $('//*[@id="search-input"]');
            expectChai(elem).to.exist;
            // await elem.setValue('test')
        }        
	});

    const baseurl = 'https://reqres.in';
	it('should retrieve a list of users', async () => {
        const response = await request(baseurl)
          .get('/api/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
    
        
        expect(response.body).toHaveProperty('page');
        expect(response.body).toHaveProperty('per_page');
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('total_pages');
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
      });

    it('Can perform an actions test with keys and mouse', async () => {      
        const elem = await $('//*[@id="search-input"]');
        await elem.setValue('call');

        // hit enter
        await browser.keys([Key.Enter]);
        await browser.pause(2000);

        await browser.switchWindow('Call Application');

       // h1 Call Application
        let header = await $('h1*=Call Application')
        expectChai(header).to.exist;
       // Start the call
        await $('#action').click();
        await browser.pause(5000);
        
        // End the call
        await $('#action').click();
        
       // await browser.pause(5000);

        // const isReady = await OpenFinSystem.waitForReady(10000);
		    // expectChai(isReady).to.equal(true);
        
        // await browser.switchWindow('Platform Provider'); 
        // await browser.pause(3000);
        // console.log('Switched to platform window');

        // const elem1 = await $('//*[@id="search-input"]');
        // await elem1.setValue('Participant Selection');
        // await browser.keys([Key.Enter]);
        // await browser.pause(2000);

    });

});
