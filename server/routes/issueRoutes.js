const express  = require('express');
const auth = require("../middleware/authMiddleware");
const getIssues = require("../controllers/issueController");
const router = express.Router();


router.route('/').get(auth, getIssues );

module.exports = router;