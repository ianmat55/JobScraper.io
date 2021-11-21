const puppeteer = require('puppeteer');

// example: `https://www.google.com/search?ei=HSq0Xt7IDoz5gQbGip6ABg&q=${techInput}+${locationInput}&oq=${techInput}+${locationInput}+jobs+&gs_lcp=CgZwc3ktYWIQAzIFCCEQoAEyBQghEKABMgUIIRCgATIFCCEQoAE6BggAEAgQHjoGCAAQFhAeUOYSWNIXYIIZaABwAHgAgAGrAYgB7QaSAQM1LjOYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&uact=5&ibp=htl;jobs&sa=X&ved=2ahUKEwiH6N6-iaLpAhX9QUEAHTWjBGMQiYsCKAF6BAgKEBE#fpstate=tldetail&htivrt=jobs&htidocid=odTsQfLDpmatfzNQAAAAAA%3D%3D`,

const templateURL = (title, location) => { 
 	url = `https://www.google.com/search?ei=HSq0Xt7IDoz5gQbGip6ABg&q=${title}+${location}&oq=${title}+${location}+jobs+&gs_lcp=CgZwc3ktYWIQAzIFCCEQoAEyBQghEKABMgUIIRCgATIFCCEQoAE6BggAEAgQHjoGCAAQFhAeUOYSWNIXYIIZaABwAHgAgAGrAYgB7QaSAQM1LjOYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&uact=5&ibp=htl;jobs&sa=X&ved=2ahUKEwiH6N6-iaLpAhX9QUEAHTWjBGMQiYsCKAF6BAgKEBE#fpstate=tldetail&htivrt=jobs&htidocid=odTsQfLDpmatfzNQAAAAAA%3D%3D`
    return url;
}

async function run() {
    const browser = await puppeteer.launch({
        headless: false, // using temporarily to see if its working, ideally we want this func to return json
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(templateURL('web developer', 'San Jose, CA USA'));
    // browser.close();
}
run();