"use strict";

import express from "express";

const router = express.Router();

import { postUsers, getUsers, getUser, putUser, deleteUser } from "../controllers/user_controller";

router.route("/users")
  .post(postUsers)
  .get(getUsers);

router.route("/users/:id")
  .get(getUser)
  .put(putUser)
  .delete(deleteUser);

export { router };
