"use strict";
/**
 * 计算路线
 * input：points，startPoint
 * outputs：路线
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var distance;
var offset = 20;
// let fs = require('fs');
// 估算格子距离
function getDisrtance(points) {
    var ps = points.slice();
    ps.sort(function (a, b) { return a.y - b.y; });
    var mDis = [];
    ps.forEach(function (d, i) {
        if (!ps[i + 1])
            return;
        if (Math.abs(d.y - ps[i + 1].y) < 10) {
            mDis.push(Math.abs(d.x - ps[i + 1].x));
        }
    });
    mDis.sort();
    console.log(mDis, 11);
    return mDis[0];
}
function default_1(data) {
    var maps = __assign({}, data);
    distance = getDisrtance(maps.otherPoints);
    console.log(distance, 77777);
    var routes = { node: maps.startPoint, remain: maps.otherPoints, children: {}, path: '' };
    var find;
    digg(routes);
    console.log('find', find);
    // find = {path: '0000120000000000000000100001000'};
    var points = [maps.startPoint];
    if (find && find.path) {
        var path = find.path;
        var node = routes.children;
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
        if (find)
            return;
        var neighbors = getNeighbors(node.remain, node.node);
        // 子节点写入各自children
        for (var i = 0; i < neighbors.length; i++) {
            var remain = node.remain.slice();
            remain.splice(neighbors[i].index, 1);
            var childNode = { node: neighbors[i].point, remain: remain, children: {}, path: "" + node.path + i };
            node.children[i] = childNode;
            // console.log(routes, 918189)
            // fs.writeFileSync(`../resource/routes${i}.json`, JSON.stringify(routes))
            if (remain.length === 0) {
                find = {
                    path: "" + node.path + i,
                    tree: routes
                };
            }
            digg(childNode);
        }
    }
}
exports.default = default_1;
// 剩下的点中找可连接项
function getNeighbors(remainPoints, currentPoint) {
    var neighbors = [];
    remainPoints.forEach(function (d, index) {
        if (!d)
            return;
        var dsY = Math.abs(d.y - currentPoint.y);
        var dsX = Math.abs(d.x - currentPoint.x);
        // x 差一格
        var isXNear = (dsX < (distance + offset)) && (dsX > (distance - offset));
        // y 差一格
        var isYNear = (dsY < (distance + offset)) && (dsY > (distance - offset));
        // x 相同
        var isXSame = dsX < offset;
        // y 相同
        var isYSame = dsY < offset;
        if ((isYSame && isXNear) || (isXSame && isYNear)) {
            neighbors.push({
                index: index,
                point: d
            });
        }
    });
    return neighbors;
}
