"use strict";

import express from "express";
import ImageController from "../controllers/image_controller";

export const router = express.Router();

router.post("/image/test", (req, res, next) => {
  console.log("image/test");
  const controller = new ImageController(req, res, next);
  controller.test();
});


  
