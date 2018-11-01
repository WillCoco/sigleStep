import * as cv from "opencv4nodejs";

function dev(p: cv.Point2) {
    const devRoute = cv.imread('../input/cat.jpeg');
    devRoute.drawCircle(p, 10, new cv.Vec3(0, 0, 255), 10);
    cv.imwrite(`../output/test.png`, devRoute);
}

const p = { y: 546.6234741210938, x: 650.0029296875 };
dev(new cv.Point2(p.x, p.y));