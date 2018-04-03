/// <reference types="jquery" />
import * as sh from "shelljs";
import * as $linq from "linq";
export { BuildConfig, BuildCallback, MergedStream, JavacOptions, SourcemapOptions, GulpTask, StaticContent, TplContent, JsonContent, TSContent, SCSSContent, JavaContent, DestinationMap } from "./def";
export { BuildUtil, log, logMeta, task, runTask, series, registeredTasks, zip } from "./util";
export { Build } from "./build";
export { Clean } from "./clean";
export { VSCode, VSCodeConfig, VSCodeDebuggers } from "./vscode";
export { VSCodeTask, VSCodeTaskPresentation, VSCodeDebugger } from "./vscode-schemas";
export { Gulp as gulp } from "gulp";
export declare var shell: typeof sh;
export declare var merge: any;
export declare var linq: typeof $linq;
export declare var q: typeof $linq.from;
export declare var jquery: JQueryStatic<HTMLElement>;
