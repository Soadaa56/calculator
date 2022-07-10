const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const numberArray = [];
let term = 0;
let operandAmount = 0;
let operandChoice;
let secondOperandChoice;
let equationResult;
let firstTerm;
let secondTerm;

// numberButtons
for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        let value = currentlyClickedButton.getAttribute('data-number');
        currentOperandElement.textContent += value;
        term += value
    });
}

// operandButtons
for (i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        if (operandAmount <1) operandChoice = currentlyClickedButton.getAttribute('data-operation');
        currentOperandElement.textContent += ' ' + operandChoice + ' ';
        // store first term given, if there is a second term, calculate result
        if (numberArray.length === 0) {
            numberArray.push(term);
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
    numberArray.push(term);
    operate(operandChoice);
    previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResult;
    currentOperandElement.textContent = equationResult;
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
});

deleteButton.addEventListener('click', () => {

});

const checkOperandAmountToCalculate = function() {
    if (operandChoice != "" && operandAmount === 2) {
        numberArray.push(term);
        operate(operandChoice);
        operandChoice = secondOperandChoice;
        previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResult;
        currentOperandElement.textContent = equationResult + ' ' + operandChoice + ' ';
        term = 0;
        operandAmount = 1;
    }
}

const operate = function() {
    firstTerm = parseInt(numberArray[0]);
    secondTerm = parseInt(numberArray[1]);
    getEquationResult(operandChoice);
    numberArray.length = 0;
    numberArray.push(equationResult);
    term = equationResult;
}


const getEquationResult = function() {
    switch (operandChoice) {
        case '+':
            sum(firstTerm, secondTerm);
            break;
        case '-':
            subtract(firstTerm, secondTerm);
            break;
        case 'x' :
            multiply(firstTerm, secondTerm);
            break;
        case '/' :
            divide(firstTerm, secondTerm);
            break;
        case '^':
            power(firstTerm, secondTerm);
            break;
        default:
            console.log('bug on switch statement')
            equationResult = 'error'
            break;
    }
}

const sum = function(firstTerm, secondTerm) {
    equationResult = firstTerm + secondTerm;
    return equationResult;
};

const subtract = function(firstTerm, secondTerm) {
    equationResult = firstTerm - secondTerm;
    return equationResult;
};

const multiply = function(firstTerm, secondTerm) {
    equationResult = firstTerm * secondTerm;
    return equationResult;
};

const divide = function(firstTerm, secondTerm) {
    equationResult = firstTerm / secondTerm
    return equationResult;
};

const power = function(firstTerm, secondTerm) {
	let equationResult = Math.pow(firstTerm, secondTerm);
  return equationResult;
};

