const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');
const decimalButton = document.querySelector("#numbers > div.bottom-row > button:nth-child(2)")

const numberArray = [];
let term = 0;
let operandAmount = 0;
let decimalCount = 0;
let operandChoice;
let secondOperandChoice;
let equationResult;
let firstTerm;
let secondTerm;
let equationResultRounded;
let isNumber;
let isOperand;
let decimalInSecondTerm;
let divideByZero = false;
let isDecimal = false;

// numberButtons
for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        let value = currentlyClickedButton.getAttribute('data-number');
        currentOperandElement.textContent += value;
        term += value
        isDecimalInTerm();
    });
}

// operandButtons
for (i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        if (operandAmount <1) operandChoice = currentlyClickedButton.getAttribute('data-operation');
        currentOperandElement.textContent += ' ' + operandChoice + ' ';
        // store first term given, if there is a second term, calculate result
        isDecimalInTerm();
        if (numberArray.length === 0) {
            numberArray.push(parseFloat(term));
            term = 0;
            operandAmount += 1;
        } else if (numberArray.length === 1) {
            operandAmount += 1;
            secondOperandChoice = currentlyClickedButton.getAttribute('data-operation')
            checkOperandAmountToCalculate();
        }
    });
}

equalButton.addEventListener('click', () => {
    numberArray.push(parseFloat(term));
    operate(operandChoice);
    previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResultRounded;
    currentOperandElement.textContent = equationResultRounded;
    operandChoice = '';
    term = 0;
    operandAmount = 0;
});

allClearButton.addEventListener('click', () => {
    numberArray.length = 0;
    term = 0;
    operandAmount = 0;
    operandChoice = '';
    equationResult = '';
    previousOperandElement.textContent = '';
    currentOperandElement.textContent = '';
    divideByZero = false;
    isDecimal = false;
    isDisableDecimalButtonTrue();
});

deleteButton.addEventListener('click', () => {

});

const checkOperandAmountToCalculate = function() {
    if (operandChoice != "" && operandAmount === 2) {
        numberArray.push(parseFloat(term));
        operate(operandChoice);
        operandChoice = secondOperandChoice;
        previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResultRounded;
        currentOperandElement.textContent = equationResultRounded + ' ' + operandChoice + ' ';
        term = 0;
        operandAmount = 1;
    }
}

const operate = function() {
    firstTerm = parseFloat(numberArray[0]);
    secondTerm = parseFloat(numberArray[1]);
    getEquationResult(operandChoice);
    if (divideByZero === true ) {
        equationResultRounded = 'Not allowed here bud';
        divideByZero = false;
    }
    numberArray.length = 0;
    numberArray.push(equationResultRounded);
    term = equationResultRounded;
}


const getEquationResult = function() {
    switch (operandChoice) {
        case '+':
            sum(numberArray);
            break;
        case '-':
            secondTerm = secondTerm * -1
            sum(numberArray);
            break;
        case 'x' :
        case '*' :
            multiply(numberArray);
            break;
        case '/' :
            divide(numberArray);
            break;
        case '^':
            power(numberArray);
            break;
        default:
            console.log('bug on getEquationResult switch statement')
            equationResult = 'error'
            break;
    }
}

const sum = function(numberArray) {
    let equationResult = firstTerm + secondTerm;
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return equationResultRounded;
};

const multiply = function(numberArray) {
    let equationResult = firstTerm * secondTerm;
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return parseFloat(equationResultRounded);
};

const divide = function(numberArray) {
    isSecondTermZero(secondTerm)
    if (divideByZero === false) {
        equationResult = firstTerm / secondTerm;
        equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
        return parseInt(equationResultRounded);
    } 
};

const power = function(numberArray) {
	equationResult = Math.pow(firstTerm, secondTerm);
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return parseInt(equationResultRounded);
};

function isSecondTermZero(numberArray) {
    if (secondTerm === 0) {
        return divideByZero = true;
    }
    
}

// keyboard support
window.addEventListener('keyup', function(e) {
    isNumber = isFinite(e.key);
    isOperand = /^[+-/*^]$/.test(e.key);
    isEqual = /^[=,]$/.test(e.key) || e.key == 'Enter';

    if (isNumber === true) {
        value = e.key;
        currentOperandElement.textContent += value;
        term += value;
    }
    if (isOperand === true) {
        if (operandAmount <1) operandChoice = e.key;
        currentOperandElement.textContent += ' ' + operandChoice + ' ';
        // store first term given, if there is a second term, calculate result
        if (numberArray.length === 0) {
            numberArray.push(parseFloat(term));
            term = 0;
            operandAmount += 1;
        } else if (numberArray.length === 1) {
            operandAmount += 1;
            secondOperandChoice = e.key;
            checkOperandAmountToCalculate();
        }
    }
    if (isEqual === true) {
        numberArray.push(parseFloat(term));
        operate(operandChoice);
        previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResultRounded;
        currentOperandElement.textContent = equationResultRounded;
        operandChoice = '';
        term = 0;
        operandAmount = 0;
    }
});

const isDecimalInTerm = function() {
    let inputDisplay = currentOperandElement.textContent;

    if (operandAmount == 0) {
        isDecimal = inputDisplay.includes('.');
        isDisableDecimalButtonTrue();
    } else if (operandAmount == 1) {
        decimalInSecondTerm = inputDisplay.split(operandChoice);
        isDecimal = decimalInSecondTerm[1].includes('.');
        isDisableDecimalButtonTrue();
    } else {

    }
    
}

const isDisableDecimalButtonTrue = function() {
    if (isDecimal == true) {
        decimalButton.disabled = true;
        decimalButton.classList.add('disabled');
    } else {
        decimalButton.disabled = false;
        decimalButton.classList.remove('disabled');
    }
}