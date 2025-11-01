// import doc elements
const prevOperand = document.querySelector(".prev-operand");
const currOperand = document.querySelector(".curr-operand");
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const allClear = document.querySelector("#all-clear");
const deleteBtn = document.querySelector(".delete-btn");
const equalBtn = document.querySelector("#equal-btn");

class Computation {
    constructor(prev, curr){
        this.prev = prev;
        this.curr = curr;
    }
    sum(prev,curr){
        return prev + curr;
    }
    subtract(prev,curr){
        return prev - curr;
    }
    multiply(prev,curr){
        return prev * curr;
    }
    divide(prev,curr){
        return prev / curr;
    }
}

class Calculator {
    constructor(prevOperand, currOperand){
        this.prevOperand = prevOperand;
        this.currOperand = currOperand;
        this.operation = undefined;
        this.clear();
        this.computation = new Computation();
    }
    clear(){
        this.currValue = "";
        this.prevValue = "";
        this.operation = undefined;
    }
    appendNumber(number){
        if (number === "." && this.currValue.includes(".")) return;
        this.currValue = this.currValue.toString() + number.toString();
    }
    displayCalc(){
        if (this.operation !== undefined){
            prevOperand.textContent = `${this.prevValue} ${this.operation}`;
        }else {
            prevOperand.textContent = this.prevValue;
        }
        currOperand.textContent = this.currValue;
    }
    chooseOperation(operation){
        if (this.currValue === "") return;
        if (this.currValue.endsWith(".")) return;
        if (this.prevValue !== "") this.execute();
        this.operation = operation;
        this.prevValue = this.currValue;
        this.currValue = "";
    }
    execute(){
        let result = 0;
        const prev = parseFloat(this.prevValue);
        const curr = parseFloat(this.currValue);

        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+' :
                result = this.computation.sum(prev,curr);
                break;
            case '-' :
                result = this.computation.subtract(prev,curr);
                break;
            case '*' :
                result = this.computation.multiply(prev,curr);
                break;
            case '÷' :
                if (curr === 0){
                    this.currValue = "Error";
                    this.prevValue = "";
                    this.operation = undefined;
                    return;
                }
                result = this.computation.divide(prev,curr);
                break;
        }
        this.currValue = parseFloat(result.toFixed(6)).toString();
        this.prevValue = "";
        this.operation = undefined;
    }
    delete(){
        if (this.currValue === "") return;
        this.currValue = this.currValue.slice(0,-1);
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
        calculator.chooseOperation(operation.textContent);
        calculator.displayCalc();
    })
})

allClear.addEventListener('click', ()=> {
    calculator.clear();
    calculator.displayCalc();
})
deleteBtn.addEventListener('click', ()=>{
    calculator.delete();
    calculator.displayCalc();
})

equalBtn.addEventListener("click", ()=>{
    calculator.execute();
    calculator.displayCalc();
})