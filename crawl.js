const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
    console.log(`now crawling: ${currentURL}`);

    try {
        const resp = await fetch(currentURL);

        // check for unsuccessful status response:
        console.log(resp.status);
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`);
            return;
        }

        //check that the fetch requests is returning http content:
        const contentType = resp.headers.get('content-type');
        // console.log(resp.headers);
        console.log(contentType);
        if (!contentType.includes("text/html")) {
            console.log(`wrong html response, wrong content type: ${contentType} on page: ${currentURL}`);
            return;
        }

        // console.log(await resp.text());
    } catch (err) {
        console.log(`error in fetch: ${err.message} on page: ${currentURL}`);
    }

}

crawlPage('https://wagslane.dev');
// crawlPage('https://wagslane.dev/sitemap.xml');

// crawlPage('https://wagslane.dev/garbagePath');


function getURLsFromHTML(htmlBody, baseURL) {
    //hmtlBody: HMTL text, string format
    //baseURL: URL,string format 
    //return an array of strings representing absolute URLs
    // note: baseURL is not supposed to have a final '/'

    const urls = [];

    const dom = new JSDOM(htmlBody);
    //extract all the link elements
    const linkElements = dom.window.document.querySelectorAll('a');

    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative url
            try {
                const urlObj = new URL(baseURL + linkElement.href);
                urls.push(urlObj.href);
            }
            catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        }
        else {
            // absolute url
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            }
            catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    };
    return urls;
}

function normalizeURL(baseURL) {
    //return a normalized version of the URL as a string
    // input and output formats are both string

    // parse the url:
    let formattedURL = new URL(baseURL);

    // console.log(formattedURL);

    let urlHostname = formattedURL.hostname;
    let urlPathname = formattedURL.pathname;

    // remove 'www.' from hotsname if present:
    if (urlHostname.slice(0, 3) === 'www') {
        urlHostname = urlHostname.slice(4, urlHostname.length);
    }

    //remove '/' from pathname if present
    if (urlPathname[urlPathname.length - 1] === '/') {
        urlPathname = urlPathname.slice(0, urlPathname.length - 1);
    }

    //return the formatted url hostname+pathname
    // console.log(urlHostname + urlPathname);
    return urlHostname + urlPathname;
}

// normalizeURL('https://w3schools.com/js/js_string_methods.asp/');
// normalizeURL('http://google.com/');
// normalizeURL('https://www.goOGLe.com');
// normalizeURL('https://googLe.com/');

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
