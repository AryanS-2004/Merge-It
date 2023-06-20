const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
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
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;