const display = document.querySelector(".display .screen");
const subDisplay = document.querySelector(".display .sub-screen");
const inputs = document.querySelectorAll(".input");

let previousNumber = "";
let operator = "";
let currentNumber = "";
let counted = false;

function inputDigit(input) {
  updateDisplay(input);
}

function updateDisplay(value) {
  if (counted === true) {
    display.innerText = value;
    counted = false;
  } else {
    if (display.innerText === "0") {
      display.innerText = value;
    } else {
      display.innerText += value;
    }

    if (operator === "") {
      previousNumber = display.innerText;
    } else {
      currentNumber = display.innerText;
    }
  }
}

function updateSubDisplay(value) {
  subDisplay.innerText = value;
}

function inputOperator(value) {
  if (display.innerText === "0") {
    return;
  }
  updateSubDisplay(display.innerText + value);
  display.innerText = "0";

  if (value === "×") {
    operator = "*";
  } else if (value === "÷") {
    operator = "/";
  } else if (value === "+") {
    operator = "+";
  } else {
    operator = "-";
  }
}

function inverseNumber() {
  if (display.innerText === "0") {
    return;
  }
  display.innerText = display.innerText * -1;

  if (operator === "") {
    previousNumber = display.innerText;
  } else {
    currentNumber = display.innerText;
  }
}

function commaOperator() {
  if (display.innerText.includes(".")) {
    return;
  }

  if (display.innerText === "0") {
    updateDisplay("0.");
  } else {
    updateDisplay(".");
  }
}

function resetDisplay() {
  display.innerText = "0";

  if (subDisplay.innerText === "0") {
    previousNumber = "0";
  } else {
    currentNumber = "0";
  }
}

function resetSubDisplay() {
  subDisplay.innerText = "0";
  operator = "";
  previousNumber = "0";
  currentNumber = "0";
  resetDisplay();
}

function countResult() {
  if (subDisplay.innerText === "") {
    return;
  }

  let result = eval(previousNumber + operator + currentNumber);
  display.innerText = result;

  counted = true;

  operator = "";
  previousNumber = "0";
  currentNumber = "0";
  subDisplay.innerText = "0";
}

function percentageOperator() {
  display.innerText = display.innerText / 100;
  if (operator === "") {
    previousNumber = display.innerText;
  } else {
    currentNumber = display.innerText;
  }
}

inputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("negative")) {
      inverseNumber();
    } else if (target.classList.contains("substract")) {
      inputOperator("-");
    } else if (target.classList.contains("add")) {
      inputOperator("+");
    } else if (target.classList.contains("multiply")) {
      inputOperator("×");
    } else if (target.classList.contains("divide")) {
      inputOperator("÷");
    } else if (target.classList.contains("equal")) {
      countResult();
    } else if (target.classList.contains("clear")) {
      resetDisplay();
    } else if (target.classList.contains("all-clear")) {
      resetSubDisplay();
    } else if (target.classList.contains("comma")) {
      commaOperator();
    } else if (target.classList.contains("percentage")) {
      percentageOperator();
    } else {
      inputDigit(target.textContent);
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "-") {
    inputOperator("-");
  } else if (e.key === "+") {
    inputOperator("+");
  } else if (e.key === "*") {
    inputOperator("×");
  } else if (e.key === "/") {
    inputOperator("÷");
  } else if (e.key === "=" || e.key === "Enter") {
    countResult();
  } else if (e.key === "Backspace") {
    resetDisplay();
  } else if (e.key === "Escape") {
    resetSubDisplay();
  } else if (e.key === ".") {
    commaOperator();
  } else if (e.key === "%") {
    percentageOperator();
  } else if (e.key >= "0" && e.key <= "9") {
    inputDigit(e.key);
  }
});
