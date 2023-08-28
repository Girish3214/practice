// const products = [
//   { name: "Product 1", category: "Electronics", price: 200 },

//   { name: "Product 2", category: "Electronics", price: 500 },

//   { name: "Product 3", category: "Books", price: 30 },

//   { name: "Product 4", category: "Books", price: 40 },

//   { name: "Product 5", category: "Furniture", price: 700 },

//   { name: "Product 6", category: "Furniture", price: 800 },
// ];

// const costly = products.reduce((acc, curr) => {
//   if (acc.price < curr.price) {
//     acc = curr;
//   }
//   return acc;
// }, products[0]);

// console.log(costly.name);

const arr = [-2, 0, 1, 3, 4, 5, 6, 8, 2, 9];
const x = 7;

function possibility(array, sum) {
  let result = [];
  array.sort();
  console.log(array);
  let left = 0;

  let right = array.length - 1;

  while (left < right) {
    if (array[left] + array[right] === sum) {
      result.push([array[left], array[right]]);
      right--;
      left++;
    } else if (array[left] + array[right] < sum) {
      left++;
    } else {
      right--;
    }
  }
  return result;
}

console.log(possibility(arr, x));
