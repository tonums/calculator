const numButtons= document.querySelectorAll(".number-btn");
const opButtons= document.querySelectorAll(".op-btn");
const equalButton= document.querySelector(".equal-btn");
const resultLabel= document.querySelector('.resultLabel');
const eqLabel= document.querySelector('.equaLabel');
const resetButton= document.querySelector('.reset-btn');
const backButton= document.querySelector('.back-btn');

let lastPressedButton=equalButton;
let x = [];
let op = [];

numButtons.forEach((button)=>{
    button.addEventListener("click", function(e){
        switch(getLastBtnClass()){
            case "equal-btn":
                resetCalc();
                updateDisplay(e.target.value);
                break;
            case "op-btn":
                updateDisplay(e.target.value);
                break;
            default:
                updateDisplay(getDisplay() + e.target.value);
        }
        lastPressedButton = e.target;
    });
});

opButtons.forEach((button)=>{
    button.addEventListener("click", function(e){
        switch(getLastBtnClass()){
            case "equal-btn":
                x.push(+getDisplay());
                replaceEqLabel(` ${getDisplay()} ${e.target.textContent}`);
                break;
            case "op-btn":
                op.pop();
                replaceEqLabel(eqLabel.textContent.slice(0,-1) + " " + e.target.textContent);
                break;
            default:
                x.push(+getDisplay());
                addEqLabel(` ${getDisplay()} ${e.target.textContent}`);
        }
        op.push(e.target.textContent);
        lastPressedButton = e.target;
    });
});


equalButton.addEventListener("click", function(e){
    if(getLastBtnClass()=="op-btn"){
        op.pop();
    }
    x.push(+getDisplay());
    if(op.length>0){
        addEqLabel(" "+getDisplay() + " =");
        updateDisplay(""+calculate());
    }
    lastPressedButton = e.target;
});

backButton.addEventListener("click", function(e){
    if(getLastBtnClass()=="number-btn"){
        if(getDisplay().length>1){
            updateDisplay(getDisplay().substr(0,getDisplay().length-1));
        }else{
            updateDisplay("0");
        }
        
    }
});

resetButton.addEventListener("click", function(e){
    resetCalc();
});

function resetCalc(){
    x=[];
    op=[];
    updateDisplay("0");
    replaceEqLabel("");
}

function getLastBtnClass(){
    if(lastPressedButton.classList.contains("number-btn")){
        return "number-btn";
    }
    if(lastPressedButton.classList.contains("equal-btn")){
        return "equal-btn";
    }
    if(lastPressedButton.classList.contains("op-btn")){
        return "op-btn";
    }
}

function updateDisplay(newNumber){
    if(newNumber.charAt(0)=="0" && newNumber.length>1){
        newNumber = newNumber.slice(1);
    }
    resultLabel.textContent=newNumber;
}

function replaceEqLabel(text){
    eqLabel.textContent = text; 
}
function addEqLabel(text){
    eqLabel.textContent +=text; 
}
function getDisplay() {
    return resultLabel.textContent;
}

function getDisplayValue() {
    return resultLabel.value;
}

function updateDisplayValue(newNumber){
    resultLabel.value=newNumber;
}

function calculate(){
    let result;
    while(op.length>0){
        result=operate(op[0],x[0],x[1]);
        op.shift();
        x.shift();
        x.shift();
        x.unshift(result);
    }
    x=[]
    return result;
}

function operate(operator, x, y){
    switch(operator){
        case "+":
             return add (x, y);
        case "-":
            return subtract (x, y);
        case "*":
            return multiply (x, y);
        case "/":
            return divide (x, y);
    }
}

function add (x, y) {
    return x+y;
}

function subtract (x, y) {
    return x-y;
}

function multiply (x, y) {
    return x*y;
}

function divide (x, y) {
    return x/y;
}