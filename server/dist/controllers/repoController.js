"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRepo = exports.addRepo = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const axios_1 = __importDefault(require("axios"));
const checkRepoExistence = (link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const config = {
            headers: {
                Authorization: `${process.env.GITHUB_PAT}`
            }
        };
        const response = yield axios_1.default.get(link, config);
        if (response.status === 200) {
            return true; // Repository exists
        }
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return false; // Repository doesn't exist
        }
        throw error; // Error occurred while checking repository existence
    }
});
const addRepo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const userId = req.headers['userId'];
    if (!link)
        return;
    const repoExists = yield checkRepoExistence(link);
    if (!repoExists) {
        return res.status(404).send("Give a correct link to the repository");
    }
    const user = yield userModels_1.default.findById(userId, "-password");
    if (!user) {
        return res.status(404).send("User doesn't exist");
    }
    // Check if the repository link already exists in the user's repos array
    if (user.repos.includes(link)) {
        return res.status(400).send("Repository already exists in the user's database");
    }
    user.repos.push(link);
    const updatedUser = yield user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        repos: updatedUser.repos,
    });
});
exports.addRepo = addRepo;
const removeRepo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const userId = req.headers['userId'];
    if (!link)
        return;
    const repoExists = yield checkRepoExistence(link);
    if (!repoExists) {
        return res.status(404).send("Give a correct link to the repository");
    }
    const user = yield userModels_1.default.findById(userId);
    if (!user) {
        return res.status(404).send("User doesn't exist");
    }
    const repoIndex = user.repos.indexOf(link);
    if (repoIndex === -1) {
        return res.status(404).send("Repository doesn't exist in the user's database");
    }
    user.repos.splice(repoIndex, 1);
    const updatedUser = yield user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        repos: updatedUser.repos,
    });
});
exports.removeRepo = removeRepo;
