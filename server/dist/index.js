"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const issueRoutes_1 = __importDefault(require("./routes/issueRoutes"));
const repoRoutes_1 = __importDefault(require("./routes/repoRoutes"));
const db_1 = require("./config/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/user", userRoutes_1.default);
app.use("/api/issues", issueRoutes_1.default);
app.use("/api/repos", repoRoutes_1.default);
app.get("/", (req, res) => {
    res.json({ msg: "The server is working, Nothing to worry about." });
});
//Error handling 
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log("The server is listening on port " + port);
});
