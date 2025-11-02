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
        this.currValue = "0";
        this.prevValue = "";
        this.operation = undefined;
    }
    appendNumber(number){
        if (this.currValue === "0" && number === "0") return;
        if ((this.currValue === "" && number === ".") || (this.currValue === "0" && number === ".")){
            this.currValue = "0.";
            return;
        }
        if (this.currValue === "0" && number !== "."){
            this.currValue = number;
            return;
        }
        if (this.displayResult){
            this.currValue = "";
            this.displayResult = false;
        }
        if (number === "." && this.currValue.includes(".")) return;
        this.currValue += number.toString();
    }
    displayCalc(){
        if (this.operation !== undefined){
            prevOperand.textContent = `${this.prevValue} ${this.operation}`;
        }else {
            prevOperand.textContent = this.prevValue;
        }
        this.currOperand.textContent = this.currValue === "" ? "0" : this.currValue;
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
        this.displayResult = true;
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
});

document.addEventListener("keydown", (e)=>{
    if(!isNaN(e.key) || e.key === "."){
        calculator.appendNumber(e.key);
        calculator.displayCalc();
        active("data-number", e.key, "numbers");
    }else if (["+","-","*","/"].includes(e.key)){
        let op = e.key;
        if (op === "/") op = "÷";
        calculator.chooseOperation(op);
        calculator.displayCalc();
        switch (op){
            case "+" : 
                active("data-operation", "+", "plus");
                break;
            case "-" : 
                active("data-operation", "-", "subtract");
                break;
            case "*" : 
                active("data-operation", "*", "multiply");
                break;
            case "÷" : 
                active("data-operation", "÷", "divide");
                break;
        }
    }

})

function active(selector, number, className){
    const button = document.querySelector(`[${selector}="${number}"]`);
    if (button){
        button.classList.add(`${className}`);
        setTimeout(() => {
            button.classList.remove(`${className}`);
        }, 200);
    }
}