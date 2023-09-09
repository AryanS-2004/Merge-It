"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuesAllModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const issueDataSchema = new mongoose_1.default.Schema({
    organization: String,
    repository: String,
    title: String,
    number: String,
    date: String,
    dateNum: Number,
    author: String,
    link: String,
    languages: [String],
    orgLink: String,
    repoLink: String,
});
const issuesAllSchema = new mongoose_1.default.Schema({});
exports.issuesAllModel = mongoose_1.default.model('issuesAllModel', issuesAllSchema);
