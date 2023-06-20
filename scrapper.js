const axios = require('axios');
const cheerio = require('cheerio');
// const fs = require('fs');

// Specify the URL of the GitHub repository you want to scrape
const url = 'https://github.com/FlowiseAI/Flowise/issues';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const issues = $('.js-navigation-container > div');

        issues.each((index, element) => {
            const titleElement = $(element).find('.h4');
            const issueTitle = titleElement.text().trim();
            const issueNumber = $(element).find('.opened-by').text().trim();
            const labels = $(element).find('.labels .Label')
                .map((index, element) => $(element).text().trim())
                .get();

            console.log('Issue Title:', issueTitle);
            console.log('Issue Number:', issueNumber);
            console.log('Labels:', labels);
            console.log('----------------------');
        });
    })
    .catch(error => {
        console.error(error);
    });
