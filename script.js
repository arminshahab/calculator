const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const deleteButton = document.querySelector(".delete");
const allClear = document.querySelector(".all-clear");
const equals = document.querySelector(".equals");
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  apendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "" && this.previousOperand === "") {
      return;
    }
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
    if (this.operation !== undefined) {
      this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = this.previousOperand;
    }
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
}

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.apendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equals.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
