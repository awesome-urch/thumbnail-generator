"use strict";

import * as Knex from "knex";
import { config as configuration } from "./src/config/db_config";

const config: { [key: string]: Knex.Config } = configuration;

module.exports = configuration;

export { config };


