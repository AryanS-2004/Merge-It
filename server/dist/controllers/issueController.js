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
const userModels_1 = __importDefault(require("../models/userModels"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.GITHUB_PAT;
// console.log(token);
const headers = {
    Authorization: `Bearer ${token}`,
};
let allIssues;
let ISSUES = [];
let ISSUES2 = [];
function getIssuesAll(owner, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = yield axios_1.default.get(`https://api.github.com/repos/${owner}/${repo}/issues`, config);
            allIssues = response.data;
            return allIssues;
        }
        catch (err) {
            console.log(err);
            // console.log(token);
        }
    });
}
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
        const userId = req.headers["userId"];
        const user = yield userModels_1.default.findOne({ _id: userId });
        if (!user) {
            res.status(500).send({ msg: "Not able to find user" });
            return;
        }
        const REPO_URLS = user.repos;
        ISSUES = [];
        ISSUES2 = [];
        const scrapingPromises = REPO_URLS.map((url) => __awaiter(void 0, void 0, void 0, function* () {
            const splittedUrl = url.split("/");
            const owner = splittedUrl[3];
            const repo = splittedUrl[4];
            let repoLanguages;
            let allIssues;
            try {
                allIssues = yield getIssuesAll(owner, repo);
                repoLanguages = yield scrapeRepositoryLanguages(owner, repo);
            }
            catch (error) {
                console.error(error);
                repoLanguages = [];
            }
            allIssues.map((issue, index) => {
                const issueTitle = issue.title;
                const issueNumber = issue.number;
                const dateObj = new Date(issue.created_at);
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
                const author = issue.user.login;
                const issueLink = issue.html_url;
                const orgLink = `https://github.com/${owner}`;
                const repoLink = `https://github.com/${owner}/${repo}`;
                const findIssue = ISSUES.find((issue) => issue.number === issueNumber &&
                    issue.repository === repo);
                if (!findIssue) {
                    ISSUES.push({
                        organization: owner,
                        repository: repo,
                        title: issueTitle,
                        number: issueNumber,
                        date: formattedDate,
                        dateNum: dateNum,
                        author: author,
                        link: issueLink,
                        languages: repoLanguages,
                        orgLink: orgLink,
                        repoLink: repoLink,
                    });
                }
            });
        }));
        yield Promise.all(scrapingPromises);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
        return;
    }
    ISSUES.sort((a, b) => b.dateNum - a.dateNum);
    res.status(200).send(ISSUES);
}));
