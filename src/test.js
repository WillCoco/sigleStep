"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cv = require("opencv4nodejs");
var path_1 = require("./path");
var getMap_1 = require("./getMap");
var _a = require("./config.json"), resourceDir = _a.resourceDir, inputDir = _a.inputDir;
function dev(p) {
    var devRoute = cv.imread('../input/cat.jpeg');
    devRoute.drawCircle(p, 10, new cv.Vec3(0, 0, 255), 10);
    cv.imwrite("../output/test.png", devRoute);
}
var p = { y: 546.6234741210938, x: 650.0029296875 };
// dev(new cv.Point2(p.x, p.y));
// 测试斑点识别成功率
var option = new cv.SimpleBlobDetectorParams();
// option.thresholdStep = 1;
// option.minThreshold = 0;
// option.maxThreshold = 250;
// option.minDistBetweenBlobs = 0;
option.filterByArea = true;
option.maxArea = 20000;
option.minArea = 8000;
option.filterByColor = false;
// option.blobColor = 0;
option.filterByCircularity = false; // 0.8 - 0.9
// option.minCircularity = 0.1;
// option.maxCircularity = 0.9;
option.filterByConvexity = false;
// option.minConvexity = 0.9;
// option.maxConvexity = 0.1;
option.filterByInertia = true;
option.minInertiaRatio = 0.9;
option.maxInertiaRatio = 1;
// 测试斑点识别成功率
var option2 = new cv.SimpleBlobDetectorParams();
// option2.thresholdStep = 10;
// option2.minThreshold = 0;
// option2.maxThreshold = 250;
// option2.minDistBetweenBlobs = 1000;
option2.filterByArea = true;
option2.maxArea = 20000;
option2.minArea = 8000;
option2.filterByColor = false;
// option.blobColor = 0;
option2.filterByCircularity = true; // 0.8 - 0.9
option2.minCircularity = 0.1;
option2.maxCircularity = 0.9;
option2.filterByConvexity = false;
option2.minConvexity = 0.9;
option2.maxConvexity = 0.1;
option2.filterByInertia = false;
option2.minInertiaRatio = 0.9;
option2.maxInertiaRatio = 1;
var points = cv.imread(path_1.default(resourceDir, 'grey_60.jpeg'));
getMap_1.getNormalPoints(option2)(points, '60.jpeg');
// const points = cv.imread(path(resourceDir, 'grey_10.jpeg'));
// getNormalPoints(option2)(points, '10.jpeg');
