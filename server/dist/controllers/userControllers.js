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
exports.authUser = exports.registerUser = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const generateToken_1 = require("../config/generateToken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields.");
    }
    const userExists = yield userModels_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exist.");
    }
    else {
        const user = yield userModels_1.default.create({
            name, email, password
        });
        const userId = user === null || user === void 0 ? void 0 : user._id;
        if (user) {
            res.status(201).json({
                _id: userId,
                name: user.name,
                email: user.email,
                token: (0, generateToken_1.generateToken)(userId)
            });
        }
        else {
            res.status(401);
            throw new Error("Failed to create user, please try again.");
        }
    }
});
exports.registerUser = registerUser;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModels_1.default.findOne({ email });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    if (user && (yield user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: (0, generateToken_1.generateToken)(userId)
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
});
exports.authUser = authUser;
