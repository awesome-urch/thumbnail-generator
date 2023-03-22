"use strict";

import express from "express";
import { MySession } from "../common/types";
import ViewController from "../controllers/view_controller";
import AuthViewController from "../controllers/view_controllers/auth_controller";

export const router = express.Router();

router.get("/", function(req, res){
  res.render("index");
});

router.post("/login", (req, res, next) => {
  const controller = new AuthViewController(req, res, next);
  controller.postLogin();
});

router.post("/register", (req, res, next) => {
  const controller = new AuthViewController(req, res, next);
  controller.postRegister();
});

router.get("/login", function(req, res){
  res.render("login");
});

router.get("/register", function(req, res){
  res.render("register");
});

router.get("/logout", function(req, res){
  // Destroy session and redirect to login page
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
    } else {
      console.log("Session destroyed");
    }
  });
  res.redirect("/login");
});

router.get("/create-image", function(req, res, next){
  const controller = new ViewController(req, res, next);
  controller.renderCreateImagePage();
});



  
