"use strict";

import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  UNPROCESSABLE,
  GENERIC_ERROR
} from "../helpers/error_helper";
import AccessTokenModel from "../models/access_token";

const unauthorized = (err, _req, res, next) => {
  if (err.status !== UNAUTHORIZED) return next(err);

  res.status(UNAUTHORIZED).send({
    ok: false,
    message: err.message || "Unauthorized",
    errors: [err]
  });
};

const forbidden = (err, _req, res, next) => {
  if (err.status !== FORBIDDEN) return next(err);

  res.status(FORBIDDEN).send({
    ok: false,
    message: err.message || "Forbidden",
    errors: [err]
  });
};

const conflict = (err, _req, res, next) => {
  if (err.status !== CONFLICT) return next(err);

  res.status(CONFLICT).send({
    ok: false,
    message: err.message || "Conflict",
    errors: [err]
  });
};

const badRequest = (err, _req, res, next) => {
  if (err.status !== BAD_REQUEST) return next(err);

  res.status(BAD_REQUEST).send({
    ok: false,
    message: err.message || "Bad Request",
    errors: [err]
  });
};

const unprocessable = (err, _req, res, next) => {
  if (err.status !== UNPROCESSABLE) return next(err);

  res.status(UNPROCESSABLE).send({
    ok: false,
    message: err.message || "Unprocessable entity",
    errors: [err]
  });
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const notFound = (err, _req, res, next) => {
  if (err.status !== NOT_FOUND) return next(err);

  res.status(NOT_FOUND).send({
    ok: false,
    message: err.message || "The requested resource could not be found"
  });
};

// If there's still an error at this point, return a generic 500 error.
const genericError = (err, _req, res, _next) => {
  res.status(GENERIC_ERROR).send({
    ok: false,
    message: err.message || "Internal server error",
    errors: [err]
  });
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const catchall = (_req, res, _next) => {
  res.status(NOT_FOUND).send({
    ok: false,
    message: "The requested resource could not be found"
  });
};

export const authenticateHeader = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(UNAUTHORIZED).send({
        ok: false,
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];
    console.log("token to be displayed");
    console.log(token);

    const user = await new AccessTokenModel().findOne({ access_token: token });
    if(!user){
      return res.status(UNAUTHORIZED).send({
        ok: false,
        message: "Unauthorized. Invalid token",
      });
    }
    req.user = user.user_id;
    console.log(req.user);
    next();
  };

const exportables = {
  unauthorized,
  forbidden,
  conflict,
  badRequest,
  unprocessable,
  genericError,
  notFound,
  catchall
};

// All exportables stored as an array
export const all = Object.keys(exportables).map(key => exportables[key]);



