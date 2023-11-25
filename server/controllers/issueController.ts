import axios from "axios";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModels";
import dotenv from "dotenv";
dotenv.config();

export type IssueData = {
    organization: string;
    repository: string;
    title: string;
    number: string;
    date: string;
    dateNum: number;
    author: string;
    link: string;
    languages: string[];
    orgLink: string;
    repoLink: string;
};

const token: string | undefined = process.env.GITHUB_PAT;

// console.log(token);
const headers = {
    Authorization: `Bearer ${token}`,
};

let allIssues;

let ISSUES: IssueData[] = [];
let ISSUES2: IssueData[] = [];

async function getIssuesAll(owner: string, repo: string) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/issues`,
            config
        );
        allIssues = response.data;
        return allIssues;
    } catch (err: any) {
        console.log(err);
        // console.log(token);
    }
}

async function scrapeRepositoryLanguages(owner: string, repo: string) {
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/languages`,
            { headers }
        );
        const languageObj = response.data;
        const sendLanguages = Object.keys(languageObj);
        return sendLanguages;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.headers["userId"];
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(500).send({ msg: "Not able to find user" });
            return;
        }
        const REPO_URLS = user.repos;
        ISSUES = [];
        ISSUES2 = [];
        const scrapingPromises = REPO_URLS.map(async (url: string) => {
            const splittedUrl = url.split("/");
            const owner = splittedUrl[3];
            const repo = splittedUrl[4];

            let repoLanguages: string[];

            let allIssues: any;
            try {
                allIssues = await getIssuesAll(owner, repo);
                repoLanguages = await scrapeRepositoryLanguages(owner, repo);
            } catch (error) {
                console.error(error);
                repoLanguages = [];
            }

            allIssues.map((issue: any, index: number) => {
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
                const findIssue = ISSUES.find(
                    (issue) =>
                        issue.number === issueNumber &&
                        issue.repository === repo
                );
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
        });
        await Promise.all(scrapingPromises);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(error.message);
        return;
    }
    ISSUES.sort((a, b) => b.dateNum - a.dateNum);
    res.status(200).send(ISSUES);
});
