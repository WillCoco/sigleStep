/**
 * 计算路线
 * input：points，startPoint
 * outputs：路线
 */

let distance;
const offset = 20;
// let fs = require('fs');

// 估算格子距离
function getDisrtance(points) {
    const ps = [...points];
    ps.sort((a, b) => a.y - b.y);
    const mDis = [];
    ps.forEach((d, i) => {
        if (!ps[i + 1]) return;
        if (Math.abs(d.y - ps[i + 1].y) < 10) {
            mDis.push(Math.abs(d.x - ps[i + 1].x));
        }
    });
    mDis.sort();
    console.log(mDis, 11);
    return mDis[0];
}

export default function(data) {
    let maps = {...data};
    distance = getDisrtance(maps.otherPoints);
    console.log(distance, 77777)
    let routes = {node: maps.startPoint, remain: maps.otherPoints, children: {}, path: ''};
    let find;

    digg(routes);

    console.log('find', find);
    // find = {path: '0000120000000000000000100001000'};
    let points = [maps.startPoint];
    if (find && find.path) {
        let path = find.path;
        let node = routes.children;
        while (path.length > 0) {
            points.push(node[path[0]].node);
            node = node[path[0]].children;
            path = path.substring(1);
        }
    }
    return points;

    // 输入当前节点
    // 写入子节点
    // 递归
    function digg(node) {
        if (find) return;
        const neighbors = getNeighbors(node.remain, node.node);
        // 子节点写入各自children
        for(let i = 0; i < neighbors.length; i++) {
            const remain = [...node.remain];
            remain.splice(neighbors[i].index, 1);
            const childNode = {node: neighbors[i].point, remain, children: {}, path: `${node.path}${i}`};
            node.children[i] = childNode;

            // console.log(routes, 918189)
            // fs.writeFileSync(`../resource/routes${i}.json`, JSON.stringify(routes))
            if (remain.length === 0) {
                find = {
                    path: `${node.path}${i}`,
                    tree: routes
                }
            }
            digg(childNode);
        }
    }
}

// 剩下的点中找可连接项
function getNeighbors(remainPoints, currentPoint) {
    const neighbors = [];
    remainPoints.forEach((d, index) => {
        if (!d) return;
        const dsY = Math.abs(d.y - currentPoint.y);
        const dsX = Math.abs(d.x - currentPoint.x);
        // x 差一格
        const isXNear = (dsX < (distance + offset)) && (dsX > (distance - offset));
        // y 差一格
        const isYNear = (dsY < (distance + offset)) && (dsY > (distance - offset));
        // x 相同
        const isXSame = dsX < offset;
        // y 相同
        const isYSame = dsY < offset;
        if ((isYSame && isXNear) || (isXSame && isYNear)) {
            neighbors.push({
                index,
                point: d
            })
        }
    });
    return neighbors;
}
