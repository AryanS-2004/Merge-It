import express from 'express';
import auth from "../middleware/authMiddleware";
import {getIssues} from "../controllers/issueController";

const  router = express.Router();

router.route('/').get(auth, getIssues );

export default router;