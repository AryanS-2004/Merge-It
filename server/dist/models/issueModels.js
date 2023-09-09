"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const issueSchema = new mongoose_1.default.Schema({
    organization: {
        type: String,
    },
    repository: {
        type: String,
    },
    title: {
        type: String,
    },
    number: {
        type: String,
    },
    date: {
        type: String,
    },
    dateNum: {
        type: Number,
    },
    author: {
        type: String
    },
    link: {
        type: String
    },
    languages: [
        {
            type: String,
        }
    ],
    orgLink: {
        type: String
    },
    repoLink: {
        type: String
    }
});
const Issue = mongoose_1.default.model('Issue', issueSchema);
exports.default = Issue;
