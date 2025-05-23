import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";
import path from "path";

import "./v1/config/env.config";

import {
  authRoutes,
  botRoute,
  financeRoute,
  questionRoute,
  reportRoute,
  userRoute,
} from "./v1/routes";
import { uploadGeneratedPdfToS3 } from "./v1/services/s3UploadManager";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
// });
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: createError.TooManyRequests().status,
    message: createError.TooManyRequests().message,
  },
});

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://cheer-up-frontend-coo1.vercel.app",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
// Global variable appRoot with base dirname
global.appRoot = path.resolve(__dirname);

// Middlewares
app.use(helmet());
app.set("trust proxy", 1);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Welcome Route
app.all("/", (req, res, next) => {
  res.send({ message: "API is Up and Running on render 😎🚀" });
});

const apiVersion = "v1";

// Routes
app.use(`/${apiVersion}/auth`, authRoutes);
app.use(`/${apiVersion}/user`, userRoute);
app.use(`/${apiVersion}/bot`, botRoute);
app.use(`/${apiVersion}/finance`, financeRoute);
app.use(`/${apiVersion}/questions`, questionRoute);
app.use(`/${apiVersion}/report`, reportRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

// // Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Server Configs
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
  console.log(`connected to ${process.env.DATABASE_URL}`);
});
