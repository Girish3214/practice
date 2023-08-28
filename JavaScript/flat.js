const flatArray = (arr, depth = 0) => {
  let result = [];

  arr.map((item, _, a) => {
    if (Array.isArray(item) && depth > 0) {
      const newArr = flatArray(item, depth - 1);
      result.push(...newArr);
    } else {
      result.push(item);
    }
  });
  return result;
};

const deepFalt = (arr) => {
  let result = [];

  arr.map((item) => {
    if (Array.isArray(item)) {
      result.push(...deepFalt(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

const arr = [1, 2, 3, [4, 5], [6, 7, [9, [10, 11]]], 8];

// console.log(flatArray(arr, 1));
// console.log(deepFalt(arr));
