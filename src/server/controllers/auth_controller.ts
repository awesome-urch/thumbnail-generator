"use strict";

// import { models as User } from "../models/index";

import { User } from "../models/user";

// const { User } = require('../modeljhs.ts')
import {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} from "../helpers/error_helper";


const postLogin = async (req, res, next) => {
  const username = String(req.body.username);
  const password = String(req.body.password);

  if (!username || !password) next(createError({
    status: BAD_REQUEST,
    message: "`username` + `password` are required fields"
  }));

  try{
    const user = await User.verify(username, password);
    if(user){
      res.json({
        ok: true,
        message: "Login successful",
        user
      });
    }
  }catch(err){
    next(createError({
          status: UNAUTHORIZED,
          message: err
        }));
  }
};

const postRegister = async (req, res, next) => {
  const props = req.body;
  const user = await User.findOne({ username: props.username });
  if(user) return next(createError({
    status: CONFLICT,
    message: "Username already exists"
  }));

  res.json({
    ok: true,
    message: "Registration successful",
    user
  });

};

module.exports = {
  postLogin,
  postRegister
};

export { postLogin,
  postRegister };
