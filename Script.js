function operate(firstOperand, secondOperand, operation) {
  let result;
  switch (operation) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "x":
      result = firstOperand * secondOperand;
      break;
    case "/":
      if (secondOperand === 0) {
        result = "Infinity";
      } else {
        result = (firstOperand / secondOperand).toFixed(4);
      }
  }
  return Number(result);
}

const memory = {
  firstOperand: null,
  secondOperand: null,
  previousOperation: null,
  currentOperation: null,
};

const operatorsArray = [];
let numbersArray = [];
const inputField = document.querySelector(".calculator-screen");
let isEqualPressed = false;

const numberButtons = document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    numbersArray.push(button.textContent);
    inputField.textContent = numbersArray.join("");
  });
});
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  if (inputField.textContent) {
    inputField.textContent = "";
    operatorsArray.length = 0;
    numbersArray.length = 0;
    isEqualPressed = false;
    for (let prop in memory) {
      memory[prop] = null;
    }
  }
});
const dotButton = document.querySelector(".dot");
dotButton.addEventListener("click", () => {
  if (!numbersArray.includes(".") && numbersArray.length !== 0) {
    numbersArray.push(".");
    inputField.textContent = numbersArray.join("");
  }
});

const operatorButtons = document
  .querySelectorAll(".operator")
  .forEach((button) => {
    button.addEventListener("click", () => {
      if (numbersArray.length !== 0) {
        operatorsArray.push(button.textContent);
        if (operatorsArray.length === 1) {
          memory.firstOperand = Number(inputField.textContent);
          memory.currentOperation = operatorsArray[operatorsArray.length - 1];
          numbersArray.length = 0;
        } else {
          memory.secondOperand = Number(inputField.textContent);
          memory.previousOperation = operatorsArray[operatorsArray.length - 2];
          memory.currentOperation = operatorsArray[operatorsArray.length - 1];
          let result = operate(
            memory.firstOperand,
            memory.secondOperand,
            memory.previousOperation
          );
          memory.firstOperand = result;
          inputField.textContent = result;
          memory.secondOperand = null;
          numbersArray.length = 0;
        }
      } else if (isEqualPressed) {
        memory.firstOperand = Number(inputField.textContent);
        operatorsArray.push(button.textContent);
        isEqualPressed = false;
      }
    });
  });

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  if (memory.firstOperand && numbersArray.length !== 0) {
    memory.secondOperand = Number(inputField.textContent);
    memory.currentOperation = operatorsArray[operatorsArray.length - 1];
    let result = operate(
      memory.firstOperand,
      memory.secondOperand,
      memory.currentOperation
    );
    inputField.textContent = result;
    numbersArray.length = 0;
    memory.firstOperand = result;
    memory.currentOperation = operatorsArray[operatorsArray.length - 1];
    memory.previousOperation =
      operatorsArray.length > 1
        ? operatorsArray[operatorsArray.length - 2]
        : null;
    isEqualPressed = true;
  }
});

const unaryMinusButton = document.querySelector(".unary-minus");
unaryMinusButton.addEventListener("click", () => {
  if (
    numbersArray.length !== 0 &&
    numbersArray.length === 1 &&
    numbersArray[1] !== "0"
  ) {
    numbersArray.unshift("-");
  } else {
    numbersArray.shift("-");
  }
  inputField.textContent = numbersArray.join("");
});

const allButtons = document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseover", () => (button.style.opacity = "0.7"));
  button.addEventListener("mouseout", () => (button.style.opacity = "1.0"));
});
