"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssues = void 0;
const axios_1 = __importDefault(require("axios"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cheerio_1 = __importDefault(require("cheerio"));
const userModels_1 = __importDefault(require("../models/userModels"));
const token = process.env.GITHUB_PAT;
const headers = {
    Authorization: `${token}`,
};
let ISSUES = [];
function scrapeRepositoryLanguages(owner, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
            const languageObj = response.data;
            const sendLanguages = Object.keys(languageObj);
            return sendLanguages;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.getIssues = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers['userId'];
        const user = yield userModels_1.default.findOne({ _id: userId });
        if (!user) {
            res.status(500).send({ msg: "Not able to find user" });
            return;
        }
        const REPO_URLS = user.repos;
        ISSUES = [];
        const scrapingPromises = REPO_URLS.map((url) => __awaiter(void 0, void 0, void 0, function* () {
            const splittedUrl = url.split("/");
            const owner = splittedUrl[3];
            const repo = splittedUrl[4];
            let repoLanguages;
            try {
                repoLanguages = yield scrapeRepositoryLanguages(owner, repo);
            }
            catch (error) {
                console.error(error);
                repoLanguages = [];
            }
            const response = yield axios_1.default.get(url);
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            const issues = $(".js-navigation-container > div");
            issues.each((index, element) => {
                const titleElement = $(element).find(".h4");
                const issueTitle = titleElement.text().trim();
                const issueNumber = $(element).find(".opened-by").text().trim();
                let issueLink = $(element).find(".h4").attr("href");
                const splittedIssue = issueNumber.split(" ");
                if (!issueLink) {
                    return res.status(500).send({
                        msg: "issue not found",
                    });
                }
                // converting Date
                const dateStr = splittedIssue[13] +
                    " " +
                    splittedIssue[14] +
                    " " +
                    splittedIssue[15];
                const dateObj = new Date(dateStr);
                const formattedDate = dateObj.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                const year = dateObj.getFullYear();
                const month = (dateObj.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                const day = dateObj.getDate().toString().padStart(2, "0");
                const formattedDate2 = `${year}${month}${day}`;
                const dateNum = parseInt(formattedDate2, 10);
                const splittedIssueLink = issueLink.split("/");
                issueLink = "https://github.com" + issueLink;
                const orgLink = "https://github.com/" + splittedIssueLink[1];
                const repoLink = "https://github.com/" +
                    splittedIssueLink[1] +
                    "/" +
                    splittedIssueLink[2];
                const findIssue = ISSUES.find((issue) => issue.number === splittedIssueLink[4] &&
                    issue.repository === repo);
                if (!findIssue)
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
                        repoLink: repoLink,
                    });
            });
        }));
        yield Promise.all(scrapingPromises);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
    ISSUES.sort((a, b) => b.dateNum - a.dateNum);
    res.status(200).send(ISSUES);
}));
