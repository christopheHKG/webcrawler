const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

// testing normalizeURL:

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


