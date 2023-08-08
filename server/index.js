const express = require('express');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const repoRoutes = require('./routes/repoRoutes');
const connectDB = require('./config/db');
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const dotenv= require('dotenv');
const cors = require('cors');

dotenv.config();

connectDB();


const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/user", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/repos", repoRoutes);



// async function scrapeRepositoryLanguages(owner, repo) {
//     try {
//         const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`);
//         const languageObj = response.data;
//         const sendLanguages = Object.keys(languageObj);
//         return sendLanguages;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// app.get('/', async (req, res) => {
//     try {
//         const scrapingPromises = REPO_URLS.map(async (url) => {
//             const splittedUrl = url.split('/');
//             const owner = splittedUrl[3];
//             const repo = splittedUrl[4];
//
//             let repoLanguages;
//
//             try {
//                 repoLanguages = await scrapeRepositoryLanguages(owner, repo);
//             } catch (error) {
//                 console.error(error);
//                 repoLanguages = [];
//             }
//
//             const response = await axios.get(url);
//             const html = response.data;
//             const $ = cheerio.load(html);
//             const issues = $('.js-navigation-container > div');
//
//             issues.each((index, element) => {
//                 const titleElement = $(element).find('.h4');
//                 const issueTitle = titleElement.text().trim();
//                 const issueNumber = $(element).find('.opened-by').text().trim();
//                 let issueLink = $(element).find('.h4').attr('href');
//
//                 const splittedIssue = issueNumber.split(" ");
//
//                 // converting Date
//                 const dateStr = splittedIssue[13] + " " + splittedIssue[14] + " " + splittedIssue[15];
//                 const dateObj = new Date(dateStr);
//                 const formattedDate = dateObj.toLocaleDateString('en-GB', {
//                     day: '2-digit',
//                     month: '2-digit',
//                     year: 'numeric'
//                 });
//                 const year = dateObj.getFullYear();
//                 const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
//                 const day = dateObj.getDate().toString().padStart(2, '0');
//
//                 const formattedDate2 = `${year}${month}${day}`;
//
//                 const dateNum = parseInt(formattedDate2, 10);
//
//                 const splittedIssueLink = issueLink.split("/");
//                 issueLink = "https://github.com" + issueLink;
//
//                 ISSUES.push({
//                     organization: owner,
//                     repository: repo,
//                     title: issueTitle,
//                     number: splittedIssueLink[4],
//                     date: formattedDate,
//                     dateNum : dateNum,
//                     author: splittedIssue[28],
//                     link: issueLink,
//                     languages: repoLanguages
//                 });
//             });
//         });
//
//         await Promise.all(scrapingPromises);
//
//         // Sort the ISSUES array based on dates
//
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error.message);
//     }
//     ISSUES.sort((a, b) => {
//         return (new Date(b.dateNum) - new Date(a.dateNum))
//     });
//
//     res.status(200).send(ISSUES);
// });


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log("The server is listening on port " + port);
});