**微信小程序 "一步画完" 自动解题程序。**

解题过程：

1.opencv 识别游戏初始截图，输出游戏地图坐标

2.根据坐标寻得路径

使用方式：

1.拷贝截图到input

<img src="https://github.com/WillCoco/sigleStep/blob/master/input/60.jpeg" width="375" /> 

2.npm start

3.若解题成功，output输出解题结果

<img src="https://github.com/WillCoco/sigleStep/blob/master/output/60.jpeg" width="375" /> 

### 抽象成这个问题
 ```
 /**
 * 地图信息
 * 成员元素0位置代表单元所在地图的行序号
 * 成员元素1位置代表单元所在地图的列序号
 * 指定起点,只能往相邻且没有走过的单元,最后需走完所有单元
 */
const oneStepData2 = [
  [1, 1], [1, 2], [1, 3], [1, 4],
  [2, 1], [2, 2], [2, 3], [2, 4],
  [3, 1], [3, 2], [3, 3], [3, 4],
  [4, 1], [4, 2], [4, 3], [4, 4]
];

/**
 * 寻找路径
 * param: {object} data - 地图信息
 * param: {number} startIndex - 起点
 * param: {boolean} isFindAll - 是否找出全部路径
 */
function routing(data, startIndex, isFindAll) {
  const startStacks = [[...data[startIndex]]];
  const startData = [...data];
  startData.splice(startIndex, 1);

  let hasFind = false;
  let result = [];

  iterateFn(startData, startStacks);

  return result;

  function iterateFn(data, stacks) {
    const nowNode = stacks[stacks.length - 1];

    if (stacks.length === oneStepData2.length) {
      hasFind = true;
      result.push(stacks);
      return;
    }

    if (data.length < 0) {
      result.push('无解');
      return;
    }

    data.forEach(function(node, index) {
      const isValid = isValidStep(nowNode, node);
      if (isValid) {
        const {newData, newStacks} = step(data, stacks, index);

        if (!hasFind || isFindAll) {
          iterateFn(newData, newStacks);
        }
      }
    })
  }

  // 有效的相邻步
  function isValidStep(nowNode, nextNode) {
    const firstDiff = Math.abs(nowNode[0] - nextNode[0]);
    const secondDiff = Math.abs(nowNode[1] - nextNode[1]);

    return (
      (firstDiff === 1 && secondDiff === 0) || (firstDiff === 0 && secondDiff === 1)
    )
  }

  function step(data, stacks, index) {
    const newData = [...data];
    newData.splice(index, 1);
    const newStacks = [...stacks, data[index]];
    return {
      newData,
      newStacks,
    }
  }
}
 ```
