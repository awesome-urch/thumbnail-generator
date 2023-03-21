import gulp from "gulp";
import ts from "gulp-typescript";
import del from "del";

const tsProject = ts.createProject("tsconfig.json");

// Task which would transpile typescript to javascript
gulp.task("typescript", () => {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

// Task which would delete the old dist directory if present
gulp.task("build-clean", () => {
  return del(["./dist"]);
});

// Task which would just create a copy of the current views directory in dist directory
gulp.task("views", () => {
  return gulp.src("./src/server/views/**/*.ejs").pipe(gulp.dest("./dist/server/views"));
});

// Task which would just create a copy of the current static assets directory in dist directory
gulp.task("assets", () => {
  return gulp.src("./src/server/public/assets/**/*").pipe(gulp.dest("./dist/server/public/assets"));
});

// The default task which runs at start of the gulpfile.js
gulp.task("default", gulp.series("build-clean", "typescript", "views", "assets"), () => {
  console.log("Done");
});
