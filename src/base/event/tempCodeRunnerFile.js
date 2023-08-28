const multiObject = {};

function addObjectToKey(key, innerKey, value) {
  if (!multiObject[key]) {
    multiObject[key] = {}; // 创建内部对象
  }

  // 添加键值对到内部对象
  multiObject[key][innerKey] = value;
}

// 添加多个键值对到同一个键
addObjectToKey('key1', 'prop1', 'Value 1');
addObjectToKey('key1', 'prop2', 'Value 2');
addObjectToKey('key2', 'prop3', 'Value 3');

// 获取键对应的内部对象
console.log(multiObject['key1']); // 输出 { prop1: 'Value 1', prop2: 'Value 2' }
console.log(multiObject['key2']); // 输出 { prop3: 'Value 3' }
