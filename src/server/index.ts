"use strict";

// if(process.env.NODE_ENV !== 'production'){
//   require('dotenv').config({path: __dirname + '/.env'});
// }

// const express = require('express')
// const bodyParser = require('body-parser')

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", [
  require("./routes/auth_routes.ts"),
  require("./routes/user_routes.ts"),
]);

// app.use(require("./middleware/error_middleware.ts").all);

export { app };
