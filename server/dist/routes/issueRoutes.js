"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const issueController_1 = require("../controllers/issueController");
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.default, issueController_1.getIssues);
exports.default = router;
