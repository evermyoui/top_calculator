// import doc elements
const prevOperand = document.querySelector(".prev-operand");
const currOperand = document.querySelector(".curr-operand");
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const allClear = document.querySelector("#all-clear");
const deleteBtn = document.querySelector(".delete-btn");
const equalBtn = document.querySelector("#equal-btn");

class Calculator {
    constructor(prevOperand, currOperand){
        this.prevOperand = prevOperand;
        this.currOperand = currOperand;
        this.operation = undefined;
        this.clear();
    }
    clear(){
        this.currValue = "";
        this.prevValue = "";
    }
    appendNumber(number){
        if (number === "." && this.currValue.includes(".")) return;
        this.currValue = this.currValue.toString() + number.toString();
    }
    displayCalc(){
        currOperand.textContent = this.currValue;
    }
    chooseOperation(operation){
        if (this.currValue === "") return;
        this.operation = operation;
        prevOperand.textContent = this.currValue;
        this.currValue = "";
    }
}

const calculator = new Calculator(prevOperand, currOperand);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.textContent);
        calculator.displayCalc();
    })
});
operations.forEach(operation => {
    operation.addEventListener("click", ()=> {
        calculator.chooseOperation(operation);
        calculator.displayCalc();
    })
})