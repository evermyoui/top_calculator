let x = 0;
let y = 0;
let operator = null;
let displayValues = "";

const container = document.querySelector(".container");
const display = document.querySelector(".display");

const buttons = document.querySelectorAll('.buttons');
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const operatorBtn = document.querySelectorAll(".operator");

buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        const digit = button.textContent;
        displayValues += digit;
        display.textContent = displayValues;
    });
})

operatorBtn.forEach(button =>{
    button.addEventListener('click', ()=>{
        if (!displayValues && operator){
            operator = button.textContent;
            return;
        }
        if (x && operator && displayValues){
            y = displayValues;
            const result = operate(operator, x, y);
            x = result;
            display.textContent = result;
            displayValues = '';
        }
        else {
            x = displayValues;
            displayValues = '';
        }
        operator = button.textContent;
    })
})

equalBtn.addEventListener('click', ()=>{
    if (x && operator && displayValues){
            y = displayValues;
            const result = operate(operator, x, y);
            x = result;
            display.textContent = result;
            displayValues = '';
            operator = null;
        }
});

clearBtn.addEventListener('click', ()=>{
    x = 0;
    y = 0;
    operator = null;
    displayValues = "";
    display.textContent = "";
});

function operate(operator,x,y){
    x = Number(x);
    y = Number(y);
    if (operator ==="+"){
        return add(x,y);
    }else if (operator === "-"){
        return subtract(x,y);
    }else if (operator === "*"){
        return multiply(x,y);
    }else if (operator === "/"){
        return divide(x,y);
    }
}
function add(x,y){
    return x + y;
}
function subtract(x,y){
    return x - y;
}
function multiply(x,y){
    return x * y;
}
function divide(x,y){
    if (y ===0) return "ERROR";
    return x / y;
}