const person = {
  isMarried: true,
  name: "Nemo",
  age: 5,
  hobbies: ["swimming", "diving", 1],
  address: {
    doorNo: "ocean",
  },
};

const stringifing = (obj) => {
  if (typeof obj === "string") {
    return `"${obj}"`;
  }
  if (typeof obj === "number" || typeof obj === "boolean") {
    return `${obj}`;
  }

  if (Array.isArray(obj)) {
    let res = "[";
    obj.map((item) => {
      res += `${stringifing(item)},`;
    });
    res = res.substring(0, res.length - 1) + "]";
    return res;
  }

  if (typeof obj === "object") {
    let res = "{";

    for (let key in obj) {
      res += `"${key}":${stringifing(obj[key])},`;
    }
    res = res.substring(0, res.length - 1) + "}";
    return res;
  }
};

const parsing = (str) => {
  console.log(typeof str);
  return eval("(" + str + ")");
  if (str.startsWith("[")) {
    return str;
  }

  if (isFinite(+str)) {
    return +str;
  }

  if (str === "true" || str === "false") {
    return str.toLowerCase() === "true";
  }

  if (str.startsWith("{")) {
    let arr = str
      .substring(1)
      .substring(0, str.length - 2)
      .split(",");
    let res = {};
    console.log(arr);
    arr.map((item) => {
      item = item.split(":");
      const key = item[0];
      const value = item[1].substring(1).substring(0, item[1].length - 2);
      res[key] = value;
    });
    return res;
  }
  return str;
};

const groupBy = (values, keyFinder) => {
  return values.reduce((acc, curr) => {
    const key =
      typeof keyFinder === "function" ? keyFinder(curr) : curr[keyFinder];
    if (!acc[key]) {
      acc[key] = [curr];
    } else {
      acc[key] = [...acc[key], curr];
    }

    return acc;
  }, {});
};

// console.log(JSON.stringify(person));
// console.log(parsing(stringifing(person)));

console.log(groupBy(["one", "two1", "three"], "length"));
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
