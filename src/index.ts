import * as cv from "opencv4nodejs";

import getMap from './getMap';
import getRoute from './getRoute';
import path from './path';

const { inputDir, outputDir, resourceDir } = require('./config.json');


const findRoute = (filename) => {
    /**
     * 裁剪原图
     */
    const originMat = cv.imread(path(inputDir, filename));
    const [height, width] = originMat.sizes;
    const gameArea = 1.1 * width;
    const sY = (height - gameArea) / 2;
    const rect = new cv.Rect(0, sY, width, gameArea);

    const croped = originMat.getRegion(rect);
    cv.imwrite(path(resourceDir, filename), croped);

    /**
     * 检测图片格子
     * input：格式化图片
     * output：points，startPoint
     */
    const maps = getMap(filename);
    console.log(maps, 999);

    /**
     * 计算路线
     * input：points，startPoint
     * outputs：路线
     */

    const points = getRoute(maps);

    console.log(points, '输出路线');


    /**
     * 输出图片
     * input：路线
     * outputs：结果图
     */
    const imgMat = cv.imread(path(resourceDir, filename));

    imgMat.drawCircle(points[points.length - 1], 10, new cv.Vec3(0, 0, 255), 10);

    points.forEach((d, i) => {
        if (points[i+1]) {
            imgMat.drawLine(d, points[i+1], new cv.Vec3(0, 0, 255), 2);
        }
    });
    cv.imwrite(path(outputDir, filename), imgMat);
};

// findRoute('1602236517783995431.jpg');
// findRoute('60.jpeg');
// findRoute('10.jpeg');

export default findRoute;