"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cv = require("opencv4nodejs");
var getMap_1 = require("./getMap");
var getRoute_1 = require("./getRoute");
var path_1 = require("./path");
var _a = require('./config.json'), inputDir = _a.inputDir, outputDir = _a.outputDir, resourceDir = _a.resourceDir;
var findRoute = function (filename) {
    /**
     * 裁剪原图
     */
    var originMat = cv.imread(path_1.default(inputDir, filename));
    var _a = originMat.sizes, width = _a[1];
    var rect = new cv.Rect(0, 250, width, 820);
    var croped = originMat.getRegion(rect);
    cv.imwrite(path_1.default(resourceDir, filename), croped);
    /**
     * 检测图片格子
     * input：格式化图片
     * output：points，startPoint
     */
    var maps = getMap_1.default(filename);
    console.log(maps, 999);
    /**
     * 计算路线
     * input：points，startPoint
     * outputs：路线
     */
    var points = getRoute_1.default(maps);
    console.log(points, '输出路线');
    /**
     * 输出图片
     * input：路线
     * outputs：结果图
     */
    var imgMat = cv.imread(path_1.default(resourceDir, filename));
    imgMat.drawCircle(points[points.length - 1], 10, new cv.Vec3(0, 0, 255), 10);
    points.forEach(function (d, i) {
        if (points[i + 1]) {
            imgMat.drawLine(d, points[i + 1], new cv.Vec3(0, 0, 255), 2);
        }
    });
    cv.imwrite(path_1.default(outputDir, filename), imgMat);
};
// findRoute('1602236517783995431.jpg');
// findRoute('60.jpeg');
findRoute('61.jpeg');
exports.default = findRoute;
