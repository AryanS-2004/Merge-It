import express from 'express';
import {addRepo, removeRepo} from "../controllers/repoController";
import auth from "../middleware/authMiddleware";

const router= express.Router();

router.route('/addRepo').put(auth, addRepo);
router.route('/removeRepo').delete(auth, removeRepo);


export default router;