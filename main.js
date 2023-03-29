const { crawlPage } = require('./crawl.js');
const { sortPages } = require('./report.js');

async function main() {

    // tests to make sure the user has only passed 1 URL
    if (process.argv.length <= 2) {
        console.log('no website provided');
        process.exit(1);
    }

    if (process.argv.length >= 4) {
        console.log('too many websites provided');
        process.exit(1);
    }

    //test to check that the URL passed has a valid format
    // note that we should be passing a baseURL without any final '/' at the end
    try {
        const url = new URL(process.argv[2]);
        console.log(`webcrawler starting at the URL: ${process.argv[2]}\n`);

        const pages = await crawlPage(process.argv[2], process.argv[2], {});
        // for (const page of Object.entries(pages)) {
        //     console.log(page);
        // }

        // console.log(pages);

        // print a report:
        console.log('webcrawler completed!\n');

        console.log('******************');
        console.log('Webcrawler report:');
        console.log('******************');

        const sortedPages = sortPages(pages);
        for (const page of sortedPages) {
            console.log(`Found ${page[1]} internal links to ${page[0]}`);
        };


    }
    catch (err) {
        console.log(`error with the url provided : ${err.message}`)
    }
}

main()
