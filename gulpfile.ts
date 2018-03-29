import * as $ from "./src/index";
import * as gulp from "gulp";
import * as data from "gulp-data";
import * as fs from "fs";
import { relative } from "path";
import * as jmerge from "gulp-merge-json";

/** Installs all dependencies and prepares the project. */
$.task("prep", function (cb) {
  return new $.VSCode()
    // exclude all paths from .gitignore
    .excludeGitIgnores()
    // add all gulp task runners to vsc
    .addGulpTasks() 
    // add debuggers to vsc
    .addDebugger($.VSCodeDebuggers.Gulp())
    // don't forget to run
    .run(cb);
});

/** Fixes the gulp-merge-json dts file. */
$.task("fix-gulp-merge-json", function (cb)
{
   new $.Build({})
    .add("./src/fix/gulp-merge-json.d.ts", "./node_modules/gulp-merge-json/index.d.ts")
    .run(cb);
});

/** Builds the project unminified with sourcemaps. */
$.task("build", ["fix-gulp-merge-json"], function (cb) {;
  return new $.Build({ minify: false, sourcemaps: true })
    .addTs("./src/*.ts", "./bin/js", "./bin/dts")
    .run(cb);
});

/** Cleans the project. */
$.task("clean", function (cb) {
  new $.Clean()
    .delVSCodeExcludes("node_modules")
    .del("./bin")
    .run(cb);
});

/** Rebuilds the project. */
$.task("rebuild", $.series("clean", "build"));