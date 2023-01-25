const calculator = {
  screenValue: "0",
  firstValue: null,
  secondValue: false,
  operator: null,
};

function updateScreen() {
  const screen = document.querySelector("#screen");
  screen.value = calculator.screenValue.slice(0, 7);
}

updateScreen();

let buttons = document.querySelectorAll("button");

Array.from(buttons).forEach((b) => {
  b.addEventListener("click", (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches("button")) {
      return;
    }

    switch (value) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
      case ",":
        chooseOperator(value);
        break;
      case ".":
        inputDecimal(value);
        break;
      case "C":
        clearScreen(value);
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
    updateScreen();
  });
});

function inputDigit(digit) {
  const { screenValue, secondValue } = calculator;

  if (secondValue === true) {
    calculator.screenValue = digit;
    calculator.secondValue = false;
  } else {
    calculator.screenValue = screenValue === "0" ? digit : screenValue + digit;
  }
}

function inputDecimal(dot) {
  if (
    calculator.secondValue === false &&
    !calculator.screenValue.includes(dot)
  ) {
    calculator.screenValue += dot;
  } else if (calculator.secondValue === false) {
    calculator.secondValue = true;
    calculator.screenValue += dot;
  }
}

function chooseOperator(nextOperator) {
  const { firstValue, screenValue, operator } = calculator;
  const inputValue = parseFloat(screenValue);

  if (operator && calculator.secondValue) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstValue === null && !isNaN(inputValue)) {
    calculator.firstValue = inputValue;
  } else if (operator) {
    const result = calculate(firstValue, inputValue, operator);

    calculator.screenValue = result.toString();
    calculator.firstValue = result;
  }
  calculator.secondValue = true;
  calculator.operator = nextOperator;
}

const calculate = (firstValue, secondValue, operator) => {
  if (operator === "+") {
    return firstValue + secondValue;
  } else if (operator === "-") {
    return firstValue - secondValue;
  } else if (operator === "*") {
    return firstValue * secondValue;
  } else if (operator === "/") {
    return firstValue / secondValue;
  }
  return secondValue;
};

function clearScreen() {
  calculator.screenValue = "0";
  calculator.firstValue = null;
  calculator.secondValue = false;
  calculator.operator = null;
}
