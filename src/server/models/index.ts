"use strict";

import fs from "fs";
import path from "path";
// import { knexDb } from "../../config/database";

const getModelFiles = dir => fs.readdirSync(dir)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.ts"))
  .map(file => path.join(dir, file));

// Gather up all model files (i.e., any file present in the current directory
// that is not this file) and export them as properties of an object such that
// they may be imported using destructuring like
// `const { MyModel } = require('./models')` where there is a model named
// `MyModel` present in the exported object of gathered models.
const files = getModelFiles(__dirname);

const models = files.reduce(async (modelsObj, filename) => {
  
  // const initModel = await import(filename);
  // const model = initModel(knexDb);

  // console.log(model);

  // if (model) modelsObj[model.name] = model;

  return modelsObj;
}, {});

// module.exports = models

export { models };
