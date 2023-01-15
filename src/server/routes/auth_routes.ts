"use strict";

import express from "express";

import {
  postLogin,
  postRegister
} from "../controllers/auth_controller";

export const router = express.Router();
// const {
//   postLoginTest,
//   postLogin,
//   postRegister
// } = require('../controllers/auth_controller.ts')

router.post("/login", postLogin);

router.route("/register")
  .post(postRegister);

// export { router }
