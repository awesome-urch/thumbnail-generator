"use strict";

import express from "express";
import AuthController from "../controllers/auth_controller";

export const router = express.Router();

router.post("/login", (req, res, next) => {
  const controller = new AuthController(req, res, next);
  controller.postLogin();
});

router.post("/register", (req, res, next) => {
  const controller = new AuthController(req, res, next);
  controller.postRegister();
});
  
