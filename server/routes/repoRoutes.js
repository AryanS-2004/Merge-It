const express = require('express');
const {addRepo, removeRepo} = require("../controllers/repoController");
const auth = require("../middleware/authMiddleware");
const router= express.Router();

router.route('/addRepo').put(auth, addRepo);
router.route('/removeRepo').delete(auth, removeRepo);


module.exports = router;