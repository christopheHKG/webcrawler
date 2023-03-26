
function main() {
    // console.log(process.argv);

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
    try {
        const url = new URL(process.argv[2]);
        console.log(`webcrawler starting at the URL: ${process.argv[2]}`);
    }
    catch (err) {
        console.log(`error with the url provided : ${err.message}`)
    }
}

main()
