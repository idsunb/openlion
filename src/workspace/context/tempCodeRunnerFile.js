const _ = require('lodash');
const obj1 = {
    name: 'John',
    address: {
      city: 'New York',
      zip: '10001'
    },
    hobbies: ['Reading', 'Hiking']
  };
  
  const obj2 = {
    address: {
      state: 'NY',
      zip: '10001'
    },
    age: 30,
    hobbies: ['Swimming', 'Cooking']
  };
  
  const obj3 = {
    address: {
      country: 'USA'
    },
    hobbies: ['Traveling']
  };
  
  // 使用merge函数进行深度合并
  const mergedObj = _.merge({}, obj1, obj2, obj3);
  console.log(mergedObj);