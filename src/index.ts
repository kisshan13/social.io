import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/error.middleware";
import tokenParser from "./middlewares/token-parser.middleware";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(tokenParser); // Used to parse the auth token from req header.

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);

app.use(errorHandler); // Global error handler.

app.get("/", (req, res) => {});

app.listen(3000, () => console.log("App Running on posrt 3000"));
