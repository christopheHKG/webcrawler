module.exports = {
    sortPages
};

function sortPages(pages) {
    // pages is an object containing pairs of:
    // key: URL path string
    // value: number of occurence

    //returns an array of [URL strings, count]

    //convert the object into an array and sort by values:
    const sortedPages = Object.entries(pages).sort(([, a], [, b]) => {
        return (b - a)
    });

    return sortedPages;
}