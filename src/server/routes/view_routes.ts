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

router.get("/login", function(req, res){
  // Rendering our web page i.e. Demo.ejs
  // and passing title variable through it
  res.render("login", {
      title: "Login"
  });
});

router.get("/login", function(req, res){
  res.render("login");
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

router.get("/demo", function(req, res){
	const session = req.session as MySession;
	if (session.authenticated) {
		console.log("authenticated 0");
        res.render("Demo", {
            title: "View Engine Demo"
        });
    } else {
		console.log("NOT authenticated 0");
        // Redirect to login page if user is not authenticated
        res.redirect("/login");
    }
});

router.get("/create-image", function(req, res, next){
  const controller = new ViewController(req, res, next);
  controller.renderCreateImagePage();
	// const session = req.session as MySession;
  // console.log(session.userId);
	// if (session.authenticated) {
  //       res.render("create-image");
  //   } else {
  //       // Redirect to login page if user is not authenticated
  //       res.redirect("/login");
  //   }
});



  
