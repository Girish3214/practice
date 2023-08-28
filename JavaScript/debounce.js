function typingEffect(e) {
  console.log("cls...", e.target.value);
}
function debounce(cbFunc, delay) {
  let timer;
  return function (...arguments) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cbFunc(arguments[0]);
    }, delay);
  };
}

const d1 = debounce(function (e) {
  this.typingEffect(e);
}, 500);

document
  .getElementById("yourInputElement")
  .addEventListener("input", function (e) {
    d1(e);
  });
