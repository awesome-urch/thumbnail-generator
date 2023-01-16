#!/usr/bin/env node


"use strict";

import "dotenv/config";

const PORT = process.env.PORT || 4000;
// const PORT = 3000

// const app = require('../server.ts')

// import { app } from '../server/index'

import express from "express";
import bodyParser from "body-parser";

// import { router as auth_routes } from "./routes/auth_routes.js";
import { router as authRoutes } from "./routes/auth_routes";
import { router as userRoutes } from "./routes/user_routes";
import { router as walletRoutes } from "./routes/wallet_routes";
import { router as transactionRoutes } from "./routes/transaction_routes";
import { all } from "./middleware/error_middleware";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", [
  authRoutes,
  userRoutes,
  walletRoutes,
  transactionRoutes,
]);

app.use(all);

app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`);
}).on("error", err => {
  console.log("ERROR: ", err);
});
