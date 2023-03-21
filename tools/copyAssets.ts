import * as shell from "shelljs";
// Copy all the view templates and assets in the public folder
shell.cp("-R", ["src/server/views", "src/server/public"], "dist/");

// Remove unnecessary files
shell.rm(["dist/public/js/*.ts", "dist/public/js/*.json"]);
