"use strict";

import express from "express";
import TransactionController from "../controllers/transaction_controller";

export const router = express.Router();

router.post("/wallet/credit", (req, res, next) => {
  const controller = new TransactionController(req, res, next);
  controller.credit();
});

router.post("/wallet/debit", (req, res, next) => {
  const controller = new TransactionController(req, res, next);
  controller.debit();
});
  
