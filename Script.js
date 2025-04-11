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
        result = (firstOperand / secondOperand).toFixed(7);
      }
  }
  return result;
}

const inputField = document.querySelector(".calculator-screen");
const numberButtons = document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    inputField.textContent += button.textContent;
  });
});
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  if (inputField.textContent) {
    inputField.textContent = "";
  }
});
const dotButton = document.querySelector(".dot");
dotButton.addEventListener("click", () => {
  if (
    !inputField.textContent.includes(".") &&
    inputField.textContent.length !== 0
  ) {
    inputField.textContent += dotButton.textContent;
  }
});
