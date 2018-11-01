"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 检测图片格子
 * input：原图
 * output：points，startPoint
 */
var cv = require("opencv4nodejs");
var path_1 = require("./path");
var _a = require('./config.json'), inputDir = _a.inputDir, resourceDir = _a.resourceDir;
var option = new cv.SimpleBlobDetectorParams();
option.blobColor = 1;
option.filterByArea = true;
option.filterByCircularity = false;
option.filterByColor = false;
option.filterByConvexity = false;
option.filterByInertia = false;
option.maxArea = 20000;
option.minArea = 8000;
function default_1(filename) {
    var img = cv.imread(path_1.default(resourceDir, filename));
    var img2v = toGrey(img);
    cv.imwrite(path_1.default(resourceDir, "grey_" + filename), img2v);
    return {
        startPoint: getStartPoint(option)(filename),
        otherPoints: getNormalPoints(option)(img2v, filename)
    };
}
exports.default = default_1;
// 灰度， 二值化
function toGrey(img) {
    var imgGrey = img.cvtColor(cv.COLOR_BGR2GRAY);
    return imgGrey.threshold(240, 255, cv.THRESH_TOZERO_INV);
}
// 获取除起始点的斑点
function getNormalPoints(option) {
    return function (img2v, filename) {
        var detector = new cv.SimpleBlobDetector(option);
        var kp = detector.detect(img2v);
        // const imgCopy = new cv.Mat();
        // img.copyTo(imgCopy);
        var points = cv.imread(path_1.default(resourceDir, "grey_" + filename));
        kp.forEach(function (d) {
            points.drawCircle(d.point, 10, new cv.Vec3(0, 0, 255), 10);
        });
        // console.log(kp, 'Tag 普通点');
        cv.imwrite(path_1.default(resourceDir, "normal_points_" + filename), points);
        return kp.map(function (d) { return d.point; });
    };
}
// 获取起始点的斑点
function getStartPoint(option) {
    return function (filename) {
        var img = cv.imread(path_1.default(resourceDir, filename));
        var detector = new cv.SimpleBlobDetector(option);
        var kp = detector.detect(img);
        img.drawCircle(kp[0].point, 10, new cv.Vec3(255, 255, 255), 10);
        cv.imwrite(path_1.default(resourceDir, "points_" + filename), img);
        return kp[0].point;
    };
}
