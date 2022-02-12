const toggleSwitch = document.querySelector('.right input[type="checkbox"]');
function switchTheme(e) {
  if (e.target.checked)
    document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.setAttribute("data-theme", "light");
}
toggleSwitch.addEventListener("change", switchTheme, false);

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    case "%":
      return reminder(a, b);
      break;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function reminder(a, b) {
  return a % b;
}

function storeVariables() {
  if (operatorValue === "") aValue = +bigNumDisplay;
  else bValue = +bigNumDisplay;
}

let aValue = 0;
let bValue = 0;
let operatorValue = "";
let bigNumDisplay = "";

const bigNum = document.querySelector(".bigNum");
const smallNum = document.querySelector(".smallNum");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.getElementById("clear");
const clearAll = document.getElementById("clear-all");
const not = document.getElementById("not");
const equals = document.getElementById("equals");

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (bigNumDisplay.length < 13) {
      bigNumDisplay += button.id;
      bigNum.textContent = bigNumDisplay;
      storeVariables();
    }
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (bValue !== 0) {
      aValue = operate(aValue, bValue, operatorValue);
      bigNumDisplay = aValue.toString();
      bigNum.textContent = bigNumDisplay;
      bValue = 0;
    }
    if (bigNumDisplay !== "") {
      smallNum.textContent = `${bigNumDisplay} ${button.innerHTML}`;
      operatorValue = button.id;
      bigNumDisplay = "";
    } else if (button.id === "-") {
      bigNumDisplay = "-";
      bigNum.textContent = bigNumDisplay;
      storeVariables();
    }
  });
});

clear.addEventListener("click", () => {
  bigNumDisplay = bigNumDisplay.slice(0, -1);
  bigNum.textContent = bigNumDisplay;
  storeVariables();
});

clearAll.addEventListener("click", () => {
  aValue = 0;
  bValue = 0;
  operatorValue = "";
  bigNumDisplay = "";
  bigNum.textContent = "";
  smallNum.textContent = "";
});

not.addEventListener("click", () => {
  if (bigNumDisplay !== "") {
    bigNumDisplay = (-Number(bigNumDisplay)).toString();
    bigNum.textContent = bigNumDisplay;
    storeVariables();
  }
});

equals.addEventListener("click", () => {
  if (aValue !== "" && bValue !== "") {
    smallNum.textContent += ` ${bigNumDisplay} =`;
    aValue = operate(aValue, bValue, operatorValue);
    bigNumDisplay = aValue.toString();
    bigNum.textContent = bigNumDisplay;
    bValue = undefined;
    operatorValue = "";
  }
});
