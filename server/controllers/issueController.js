const axios = require("axios");
const asyncHandler = require("express-async-handler");
const cheerio = require("cheerio");



const token = process.env.GITHUB_PAT;

// Set the headers with the token
const headers = {
    Authorization: `${token}`,
};


let ISSUES = [];

async function scrapeRepositoryLanguages(owner, repo) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, {headers});
        const languageObj = response.data;
        const sendLanguages = Object.keys(languageObj);
        return sendLanguages;
    } catch (error) {
        console.error(error);
        return [];
    }
}




const getIssues = asyncHandler(async (req, res) => {
    try {
        const REPO_URLS = req.user.repos;
        ISSUES=[];
        const scrapingPromises = REPO_URLS.map(async (url) => {
            const splittedUrl = url.split('/');
            const owner = splittedUrl[3];
            const repo = splittedUrl[4];

            let repoLanguages;

            try {
                repoLanguages = await scrapeRepositoryLanguages(owner, repo);
            } catch (error) {
                console.error(error);
                repoLanguages = [];
            }

            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            const issues = $('.js-navigation-container > div');

            issues.each((index, element) => {
                const titleElement = $(element).find('.h4');
                const issueTitle = titleElement.text().trim();
                const issueNumber = $(element).find('.opened-by').text().trim();
                let issueLink = $(element).find('.h4').attr('href');

                const splittedIssue = issueNumber.split(" ");

                // converting Date
                const dateStr = splittedIssue[13] + " " + splittedIssue[14] + " " + splittedIssue[15];
                const dateObj = new Date(dateStr);
                const formattedDate = dateObj.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                const year = dateObj.getFullYear();
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const day = dateObj.getDate().toString().padStart(2, '0');

                const formattedDate2 = `${year}${month}${day}`;

                const dateNum = parseInt(formattedDate2, 10);

                const splittedIssueLink = issueLink.split("/");
                issueLink = "https://github.com" + issueLink;
                const orgLink = "https://github.com/" + splittedIssueLink[1];
                const repoLink = "https://github.com/" + splittedIssueLink[1] +"/"+splittedIssueLink[2];


                const findIssue = ISSUES.find(issue => issue.number === splittedIssueLink[4] && issue.repository === repo);
                if(!findIssue)
                ISSUES.push({
                    organization: owner,
                    repository: repo,
                    title: issueTitle,
                    number: splittedIssueLink[4],
                    date: formattedDate,
                    dateNum: dateNum,
                    author: splittedIssue[28],
                    link: issueLink,
                    languages: repoLanguages,
                    orgLink: orgLink,
                    repoLink: repoLink
                });
            });
        });
        await Promise.all(scrapingPromises);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }

    ISSUES.sort((a,b) => b.dateNum - a.dateNum);
    res.status(200).send(ISSUES);
})

module.exports = getIssues;



