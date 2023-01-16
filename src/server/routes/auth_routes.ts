"use strict";

import express from "express";

// import {
//   postLogin,
//   postRegister
// } from "../controllers/auth_controller";
import AuthController from "../controllers/auth_controller";

export const router = express.Router();

// router.post("/login", postLogin);

// router.route("/register")
//   .post(postRegister);

router.post("/login", (req, res, next) => {
  const controller = new AuthController(req, res, next);
  controller.postLogin();
});

router.post("/register", (req, res, next) => {
  const controller = new AuthController(req, res, next);
  controller.postRegister();
});
  
