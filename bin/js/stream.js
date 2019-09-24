"use strict";
exports.__esModule = true;
var linq = require("linq");
var pathutil = require("path");
var gulp = require("gulp");
var concat = require("gulp-concat");
var multiDest = require("gulp-multi-dest");
var file = require("gulp-file");
var data = require("gulp-data");
var empty = require("gulp-empty");
var util_1 = require("./util");
var index_1 = require("./index");
var log = require("./log");
/** Extended gulp stream. */
var GulpStream = /** @class */ (function () {
    function GulpStream(cfg, stream, meta) {
        this.cfg = cfg;
        this.stream = stream;
        if (!this.stream)
            log.verbose("empty src stream");
        else if (meta)
            this.stream.meta = index_1.merge(this.stream.meta || {}, meta);
    }
    /** Return the source stream for the specified path. */
    GulpStream.src = function (cfg, path) {
        path = util_1.BuildUtil.getPath(path, cfg);
        log.silly("src", path);
        return new GulpStream(cfg, path ? gulp.src(path) : null, { src: path });
    };
    /** Return the source stream for the specified content. */
    GulpStream.contentSrc = function (cfg, content) {
        var str = (typeof content == "string") ? content : (content ? JSON.stringify(content) : null);
        log.silly("content src", str);
        return new GulpStream(cfg, str ? file("src", str, { src: true }, { contentSrc: content }) : null);
    };
    /** Pipes the current stream to the specified desination stream. */
    GulpStream.prototype.pipe = function (destination, minify) {
        if (!this.stream)
            return this;
        var output = this.stream.pipe(destination);
        return new GulpStream(this.cfg, output, this.stream.meta);
    };
    /** Sets the destination for the current stream. */
    GulpStream.prototype.dest = function (path, preDestPipe) {
        if (!this.stream) {
            log.verbose("empty dest stream for", path);
            return null;
        }
        // destination is function?
        if (typeof path == "function")
            return this.stream.pipe(data(path));
        // get path
        path = util_1.BuildUtil.getPath(path, this.cfg);
        if (path && path.length == 1)
            path = path[0];
        // add meta to src stream
        this.stream.meta = index_1.merge(this.stream.meta || {}, { dest: path });
        log.silly("dest", path);
        var filename;
        var destStream;
        if (typeof path == "string") {
            filename = pathutil.extname(path) ? pathutil.basename(path) : null;
            if (filename)
                destStream = this.stream.pipe(concat(filename)).pipe(preDestPipe || empty()).pipe(gulp.dest(pathutil.dirname(path)));
            else
                destStream = this.stream.pipe(preDestPipe || empty()).pipe(gulp.dest(path));
        }
        else {
            var paths = linq.from(path).select(function (p) {
                if (!pathutil.extname(p))
                    return p;
                filename = pathutil.basename(p);
                return pathutil.dirname(p);
            }).toArray();
            // @@todo multiDest calls finish before files are copied
            if (filename)
                destStream = this.stream.pipe(concat(filename)).pipe(preDestPipe || empty()).pipe(multiDest(paths));
            else
                destStream = this.stream.pipe(preDestPipe || empty).pipe(multiDest(paths));
        }
        // add meta to dest stream
        destStream.meta = this.stream.meta;
        // return dest stream
        return destStream;
    };
    return GulpStream;
}());
exports.GulpStream = GulpStream;
