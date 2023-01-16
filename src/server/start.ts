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
import { router as auth_routes } from "./routes/auth_routes";
import { router as user_routes } from "./routes/user_routes";
import { all } from "./middleware/error_middleware";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", [
//   require("./routes/auth_routes.ts"),
//   require("./routes/user_routes.ts"),
// ]);

app.use("/", [
  auth_routes,
  user_routes,
]);


// app.use(require("./middleware/error_middleware.ts").all);

app.use(all);

app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`);
}).on("error", err => {
  console.log("ERROR: ", err);
});
