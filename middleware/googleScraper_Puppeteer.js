const puppeteer = require('puppeteer');

const googleURL = (title, location) => { 
 	url = `https://www.google.com/search?ei=HSq0Xt7IDoz5gQbGip6ABg&q=${title}+${location}&oq=${title}+${location}+jobs+&gs_lcp=CgZwc3ktYWIQAzIFCCEQoAEyBQghEKABMgUIIRCgATIFCCEQoAE6BggAEAgQHjoGCAAQFhAeUOYSWNIXYIIZaABwAHgAgAGrAYgB7QaSAQM1LjOYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&uact=5&ibp=htl;jobs&sa=X&ved=2ahUKEwiH6N6-iaLpAhX9QUEAHTWjBGMQiYsCKAF6BAgKEBE#fpstate=tldetail&htivrt=jobs&htidocid=odTsQfLDpmatfzNQAAAAAA%3D%3D`
    return url;
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function scrapeGoogle(title, location) {
    const browser = await puppeteer.launch({
        // headless is required for puppeteer to work
        headless: false,
        defaultViewport: null,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(googleURL(title, location));
    
    delay(4000);

    const titles = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".BjJfJf"),
            (element) => element.textContent
        )
    );

    const hrefs = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".pMhGee"),
            (element) => element.href
        )
    );

    const listings = {};
    titles.forEach((title, i) => listings[title] = hrefs[i]);

    console.log(listings);
    // console.log(Object.keys(listings).length);
    browser.close();
    return listings;
}

// scrapeGoogle('web developer', 'San Jose CA USA');

module.exports = { scrapeGoogle, googleURL };