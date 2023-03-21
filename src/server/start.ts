"use strict";

import "dotenv/config";

const PORT = process.env.PORT || 4000;

import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import { router as authRoutes } from "./routes/auth_routes";
import { router as walletRoutes } from "./routes/wallet_routes";
import { router as transactionRoutes } from "./routes/transaction_routes";
import { router as transferRoutes } from "./routes/transfer_routes";
import { router as imageRoutes } from "./routes/image_routes";

//view routes
import { router as viewRoutes } from "./routes/view_routes";

import { all, authenticateHeader } from "./middleware/error_middleware";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Set up session and cookie middleware
app.use(cookieParser());
app.use(session({
    secret: "da24af169ba7f675699f84a1b09", // Change this to a random string of characters
    resave: false,
    saveUninitialized: false
}));

app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use("/",[
	viewRoutes,
]);

app.use("/api", [
	authRoutes,
	authenticateHeader,
	walletRoutes,
	transactionRoutes,
	transferRoutes,
	imageRoutes
  ]);


app.use(all);

app.listen(PORT, () => {


  console.log(`Server started on port ${ PORT }`);
}).on("error", err => {
  console.log("ERROR: ", err);
});
