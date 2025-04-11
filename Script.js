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
