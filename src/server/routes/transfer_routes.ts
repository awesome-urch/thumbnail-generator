"use strict";

import express from "express";
import TransferController from "../controllers/transfer_controller";

export const router = express.Router();

router.post("/wallet/transfer", (req, res, next) => {
  const controller = new TransferController(req, res, next);
  controller.transfer();
});


  
