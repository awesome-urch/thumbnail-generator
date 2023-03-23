"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const PORT = process.env.PORT || 4000;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./dist/src/server/routes/auth_routes");
const wallet_routes_1 = require("./dist/src/server/routes/wallet_routes");
const transaction_routes_1 = require("./dist/src/server/routes/transaction_routes");
const transfer_routes_1 = require("./dist/src/server/routes/transfer_routes");
const image_routes_1 = require("./dist/src/server/routes/image_routes");
//view routes
const view_routes_1 = require("./dist/src/server/routes/view_routes");
const error_middleware_1 = require("./dist/src/server/middleware/error_middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Set up session and cookie middleware
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "da24af169ba7f675699f84a1b09",
    resave: false,
    saveUninitialized: false
}));

///home/autodpom/openthumbnail.com/src/server/views

//src/server/views
//
app.set("views", path_1.default.join(__dirname, "src/server/views"));
app.use(express_1.default.static(__dirname + "src/server/public"));
// app.set("views", path_1.default.join(__dirname, "views"));
// app.use(express_1.default.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use("/", [
    view_routes_1.router,
]);
app.use("/api", [
    auth_routes_1.router,
    error_middleware_1.authenticateHeader,
    wallet_routes_1.router,
    transaction_routes_1.router,
    transfer_routes_1.router,
    image_routes_1.router
]);
app.use(error_middleware_1.all);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}).on("error", err => {
    console.log("ERROR: ", err);
});
//# sourceMappingURL=start.js.map