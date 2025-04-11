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
  return result;
}

const memory = {
  firstOperand: null,
  secondOperand: null,
  previousOperation: null,
  currentOperation: null,
};

const operatorsArray = [];
const numbersArray = [];
const inputField = document.querySelector(".calculator-screen");

const numberButtons = document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    // inputField.textContent += button.textContent;
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
    for (let prop in memory) {
      memory[prop] = null;
    }
  }
});
const dotButton = document.querySelector(".dot");
dotButton.addEventListener("click", () => {
  if (
    !inputField.textContent.includes(".") &&
    inputField.textContent.length !== 0
  ) {
    inputField.textContent += dotButton.textContent;
    numbersArray.push(dotButton.textContent);
  }
});

const operatorButtons = document
  .querySelectorAll(".operator")
  .forEach((button) => {
    button.addEventListener("click", () => {
      if (inputField.textContent) {
        if (operatorsArray.length === 0) {
          operatorsArray.push(button.textContent);
          memory.firstOperand = Number(inputField.textContent);
          memory.currentOperation = operatorsArray[operatorsArray.length - 1];
          numbersArray.length = 0;
        } else if (operatorsArray.length === 1) {
          operatorsArray.push(button.textContent);
          memory.secondOperand = Number(inputField.textContent);
          memory.previousOperation = operatorsArray[operatorsArray.length - 2];
          memory.currentOperation = operatorsArray[operatorsArray.length - 1];
          let result = operate(
            memory.firstOperand,
            memory.secondOperand,
            memory.previousOperation
          );
          memory.firstOperand = result;
          memory.secondOperand = null;
          inputField.textContent = memory.firstOperand;
          numbersArray.length = 0;
        } else {
          if (
            button.textContent !== operatorsArray[operatorsArray.length - 1]
          ) {
            operatorsArray.push(button.textContent);
            memory.secondOperand = Number(inputField.textContent);
            memory.previousOperation =
              operatorsArray[operatorsArray.length - 2];
            memory.currentOperation = operatorsArray[operatorsArray.length - 1];
            let result = operate(
              memory.firstOperand,
              memory.secondOperand,
              memory.previousOperation
            );
            memory.firstOperand = result;
            memory.secondOperand = null;
            inputField.textContent = memory.firstOperand;
            numbersArray.length = 0;
          }
        }
      }
    });
  });

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  if (memory.firstOperand) {
    memory.secondOperand = Number(inputField.textContent);
    let result = operate(
      memory.firstOperand,
      memory.secondOperand,
      memory.currentOperation
    );
    inputField.textContent = result;
    numbersArray.length = 0;
    operatorsArray.length = 0;
    for (let prop in memory) {
      memory[prop] = null;
    }
  }
});

const unaryMinusButton = document.querySelector(".unary-minus");
unaryMinusButton.addEventListener("click", () => {
  if (inputField.textContent && inputField.textContent !== "0") {
    inputField.textContent = -+inputField.textContent;
    if (inputField.textContent.includes("-")) {
      numbersArray.unshift("-");
    } else {
      numbersArray.shift("-");
    }
  }
});

const allButtons = document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseover", () => (button.style.opacity = "0.7"));
  button.addEventListener("mouseout", () => (button.style.opacity = "1.0"));
});
