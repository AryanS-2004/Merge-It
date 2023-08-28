import mongoose from "mongoose";

const issueDataSchema = new mongoose.Schema({
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
})

const issuesAllSchema = new mongoose.Schema({

});

export const issuesAllModel = mongoose.model('issuesAllModel', issuesAllSchema);
