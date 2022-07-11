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
let equationResultRounded;

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
            numberArray[1] = numberArray[1] * -1
            sum(numberArray);
            break;
        case 'x' :
            multiply(numberArray);
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

const sum = function(numberArray) {
    let equationResult = 0;
    for (i = 0; i < numberArray.length; i++) {
        equationResult += parseFloat(numberArray[i]);
    }
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return equationResultRounded;
};

const multiply = function(numberArray) {
    let equationResult = numberArray[0];
    for (i = 1; i < numberArray.length; i++) {
        equationResult *= numberArray[i]
    }
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return parseFloat(equationResultRounded);
};

const divide = function(firstTerm, secondTerm) {
    equationResult = firstTerm / secondTerm;
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return parseInt(equationResultRounded);
};

const power = function(firstTerm, secondTerm) {
	equationResult = Math.pow(firstTerm, secondTerm);
    equationResultRounded = equationResult.toFixed(4).replace(/\.0000$/, '');
    return parseInt(equationResultRounded);
};

