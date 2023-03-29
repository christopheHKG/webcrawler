const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { sortPages } = require('./report.js');

// testing normalizeURL function:

test('/ at the end', () => {
    expect(normalizeURL('https://google.com/')).toBe('google.com');
});

test('cap letters', () => {
    expect(normalizeURL('https://goOGle.com/')).toBe('google.com');
});

test('http', () => {
    expect(normalizeURL('http://google.com/')).toBe('google.com');
});

test('www', () => {
    expect(normalizeURL('http://www.google.com/')).toBe('google.com');
});

// tests for getURLsFromHTML function:

test('get absolute URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
            <a href="https://blog.boot.dev/">Boot.dev Blog</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/", "https://blog.boot.dev/"];
    expect(actual).toEqual(expected)
});

test('get relative URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev Blog</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected)
});

test('get both absolute & relative URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">Boot.dev path1</a>
            <a href="https://blog.boot.dev/path2/">Boot.dev path2</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected)
});

test('invalid  URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Broken link</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected)
});

// test for the sortPages function:

test('sorting URLs with different numbers', () => {
    const pages = {
        'url1': 10,
        'url2': 50,
        'url3': 30
    }
    const actual = sortPages(pages);
    const expected = [
        ['url2', 50],
        ['url3', 30],
        ['url1', 10]
    ];
    expect(actual).toEqual(expected)
});