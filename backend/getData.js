const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.sreality.cz/en/search/for-sale/apartments';
const numItemsToScrape = 500;
const itemsPerPage = 20;

async function scrapePage(pageNumber) {
    try {
        // nacteni stranky pomoci puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${url}?page=${pageNumber}`);
        const html = await page.content();
        await browser.close();

        // data stranky
        const $ = cheerio.load(html);

        // pomocne promenne
        const data = [];

        const listingsItems = $('.property.ng-scope');
        if (listingsItems.length == 0) {
            console.log($.html());
            console.log('nic')
        }
        listingsItems.each((index, element) => {
            const title = $(element).find('.title').text().trim(); // title bez zbytecnych mezer
            const imageUrl = $(element).find('._2vc3VMce92XEJFrv8_jaeN img').attr('src');

            data.push({ title, imageUrl })
        });

        return data;
    } catch (error) {
        console.error(`Error fetching page ${pageNumber}:`, error);
        return { titles: [], imageUrls: [] };
    }
}

async function scrapeMultiplePages() {
    const totalPages = Math.ceil(numItemsToScrape / itemsPerPage);
    var scrapedData = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        console.log(pageNumber)
        const newData = await scrapePage(pageNumber);
        if (newData.length == 0) pageNumber--;

        scrapedData = joinArray(scrapedData, newData);
    }

    return scrapedData;
}

const joinArray = (array1, array2) => {
    const combinedArray = [...array1, ...array2];
    return combinedArray;
}

module.exports = scrapeMultiplePages;