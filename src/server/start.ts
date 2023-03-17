"use strict";

import "dotenv/config";

const PORT = process.env.PORT || 4000;

import express from "express";
import bodyParser from "body-parser";
import OAuth2Server from "oauth2-server";
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

import { router as authRoutes } from "./routes/auth_routes";
import { router as walletRoutes } from "./routes/wallet_routes";
import { router as transactionRoutes } from "./routes/transaction_routes";
import { router as transferRoutes } from "./routes/transfer_routes";
import { router as imageRoutes } from "./routes/image_routes";
import { all, authenticateHeader } from "./middleware/error_middleware";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
	  interface Application {
		oauth: OAuth2Server;
	  }
	}
  }

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.oauth = new OAuth2Server({
	model: require("./models/access_token"),
	accessTokenLifetime: 60 * 60 * 2,
	allowBearerTokensInQueryString: true
});

app.all("/oauth/token", obtainToken);

app.use("/", [
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

// function authenticateHeader(req: express.Request, res: express.Response, next: express.NextFunction) {
// 	const authHeader = req.headers.authorization;
// 	if (!authHeader || !authHeader.startsWith("Bearer ")) {
// 	  return res.status(401).send("Unauthorized");
// 	}
// 	const token = authHeader.split(" ")[1];
// 	console.log(token);
// 	// Check the validity of the token here
// 	// If valid, you can set a user object on the request object
// 	//req.user = { id: "12345" }; // Example user object
// 	next();
//   }

function obtainToken(req, res) {

	const request = new Request(req);
	const response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}