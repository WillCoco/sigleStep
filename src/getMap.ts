/**
 * 检测图片格子
 * input：原图
 * output：points，startPoint
 */
import * as cv from 'opencv4nodejs';
import path from './path';

const { inputDir, resourceDir } = require('./config.json');

const option = new cv.SimpleBlobDetectorParams();
option.blobColor = 1;
option.filterByArea = true;
option.filterByCircularity = true;
option.minCircularity = 0.1;
option.maxCircularity = 0.9;
option.filterByColor = false;
option.filterByConvexity = false;
option.filterByInertia = false;
option.maxArea = 20000;
option.minArea = 8000;


export default function(filename) {
    const img = cv.imread(path(resourceDir, filename));
    const img2v = toGrey(img);
    cv.imwrite(path(resourceDir, `grey_${filename}`), img2v);
    return {
        startPoint: getStartPoint(option)(filename),
        otherPoints: getNormalPoints(option)(img2v, filename)
    }
}

// 灰度， 二值化
function toGrey(img) {
    const imgGrey = img.cvtColor(cv.COLOR_BGR2GRAY);
    // return imgGrey.threshold(240, 250, cv.THRESH_BINARY);
    // return imgGrey.threshold(240, 250, cv.THRESH_BINARY_INV);
    // return imgGrey.threshold(240, 250, cv.THRESH_TRUNC);
    // return imgGrey.threshold(240, 250, cv.THRESH_TOZERO);
    const im = imgGrey.threshold(240, 250, cv.THRESH_TOZERO_INV); // 1
    return im.threshold(200, 250, cv.THRESH_TOZERO)
}


// 获取除起始点的斑点
export function getNormalPoints(option) {
    return (img2v, filename) => {
        const detector = new cv.SimpleBlobDetector(option);
        const kp = detector.detect(img2v);

        // const imgCopy = new cv.Mat();
        // img.copyTo(imgCopy);

        const points = cv.imread(path(resourceDir, `grey_${filename}`));

        kp.forEach((d) => {
            points.drawCircle(d.point, 10, new cv.Vec3(0, 0, 255), 10)
        });
        console.log(kp, 'Tag 普通点');
        cv.imwrite(path(resourceDir, `normal_points_${filename}`), points);
        return kp.map(d => d.point);
    }
}
// 获取起始点的斑点
function getStartPoint(option) {
    return (filename) => {
        const img = cv.imread(path(resourceDir, filename));
        const detector = new cv.SimpleBlobDetector(option);
        const kp = detector.detect(img);

        img.drawCircle(kp[0].point, 10, new cv.Vec3(255, 255, 255), 10);
        cv.imwrite(path(resourceDir, `points_${filename}`), img);

        return kp[0].point;
    }
}