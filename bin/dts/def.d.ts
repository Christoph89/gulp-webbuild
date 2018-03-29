/// <reference types="node" />
/// <reference types="undertaker" />
import * as ts from "gulp-typescript";
import * as sourcemaps from "gulp-sourcemaps";
import { TaskFunction } from "undertaker";
/** Config for building web applications. */
export interface BuildConfig {
    /** Specifies the project directory. */
    prj?: string;
    /** Specifies whether to minify js/css output. */
    minify?: boolean;
    /** Specifies whether to create sourcemaps for js/css. */
    sourcemaps?: boolean;
    /** Specifies typescript compiler options. */
    tsc?: ts.Settings;
    /** Specifies java compiler options. */
    javac?: JavacOptions;
    /** Specifies custom variables which can be used for paths. */
    [vars: string]: any;
}
export interface ReadWriteStreamExt extends NodeJS.ReadWriteStream {
    logMsg?: string;
    meta?: any;
}
/** Merge stream. */
export interface MergedStream extends NodeJS.ReadWriteStream {
    add(source: NodeJS.ReadableStream): MergedStream;
    add(source: NodeJS.ReadableStream[]): MergedStream;
    isEmpty(): boolean;
}
/** Java compiler options. */
export interface JavacOptions {
}
/** Specifies sourcemap options. */
export interface SourcemapOptions extends sourcemaps.InitOptions, sourcemaps.WriteOptions {
    dest?: string;
}
/** Specifies build content types. */
export declare enum BuildContentType {
    Static = 0,
    Tpl = 1,
    Typescript = 2,
    Scss = 3,
    Json = 4,
    Java = 5,
}
/** Specifies build content. */
export interface BuildContent {
    contentType: BuildContentType;
}
/** Specfies static content. */
export interface StaticContent extends BuildContent {
    src: string | string[];
    dest: string | string[];
}
/** Specifies template content. */
export interface TplContent extends BuildContent {
    src: string | string[];
    dest: string | string[];
    path: string | string[];
    data?: any | ((file: any, content: TplContent) => any);
}
/** Specfies typescript content. */
export interface TSContent extends BuildContent {
    src: string;
    js: string;
    dts: string;
    options?: ts.Settings;
    sourcemap?: SourcemapOptions;
}
/** Specfies Scss content. */
export interface SCSSContent extends BuildContent {
    src: string;
    css: string;
    sourcemap?: SourcemapOptions;
}
/** Specfies java content. */
export interface JavaContent extends BuildContent {
    src: string;
    jar: string;
    classPath?: string[];
    options?: any;
}
/** Specifies json content. */
export interface JsonContent extends BuildContent {
    src: string | any;
    dest: string | any;
    base?: any;
    extend?: any;
    filter?: string[] | JsonFilter | (string[] | JsonFilter)[];
    replaceVars?: boolean;
    vars?: any;
}
/** Specifies a json filter. */
export interface JsonFilter {
    (json: any): any;
}
/** Specifies a gulp task. */
export interface GulpTask {
    name: string;
    group?: "build" | "test" | "none";
    dependencies?: string[];
    args?: string[];
    fn?: TaskFunction;
}
/** Destination map function. */
export interface DestinationMap {
    (file: any): any;
}
/** Build callback function. */
export interface BuildCallback {
    (error?: any): void;
}
