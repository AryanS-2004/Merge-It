"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repoController_1 = require("../controllers/repoController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.route('/addRepo').put(authMiddleware_1.default, repoController_1.addRepo);
router.route('/removeRepo').delete(authMiddleware_1.default, repoController_1.removeRepo);
exports.default = router;
