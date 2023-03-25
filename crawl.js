function normalizeURL(baseURL) {
    //return a normalized version of the URL as a string
    // for future comparison
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

// normalizeURL('https://w3schools.com/js/js_string_methods.asp');
// normalizeURL('http://google.com/');
// normalizeURL('https://www.goOGLe.com');
// normalizeURL('https://googLe.com/');

module.exports = {
    normalizeURL
}
