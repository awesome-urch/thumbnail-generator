"use strict";

import express from "express";
import WalletController from "../controllers/wallet_controller";

export const router = express.Router();

router.post("/wallet/create", (req, res, next) => {
  const controller = new WalletController(req, res, next);
  controller.createWallet();
});


  
