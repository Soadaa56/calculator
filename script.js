const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const numberArray = [];
let operandChoice;
let equationResult;
let term = 0;
let firstTerm;
let secondTerm;

// numberButtons
for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        let value = currentlyClickedButton.getAttribute('data-number');
        currentOperandElement.textContent += value;
        // Stops initial term value 0 being dragged along into numberArray
        if (term === 0) {
            term = value
        } else {
            term = 0
            term += value
        }
    });
}

// operandButtons
for (i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        operandChoice = currentlyClickedButton.getAttribute('data-operation');
        currentOperandElement.textContent += ' ' + operandChoice + ' ';
        // store first term given, second term calculates equationResult
        if (numberArray.length === 0) {
            numberArray.push(term);
            term = 0;
        } else if (numberArray.length === 1) {
            
        }
    });
}

equalButton.addEventListener('click', () => {
    numberArray.push(term);
    operate(operandChoice);
    previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResult;
    currentOperandElement.textContent = equationResult;
});

allClearButton.addEventListener('click', () => {
    numberArray.length = 0;
    operandChoice = '';
    equationResult = '';
    previousOperandElement.textContent = '';
    currentOperandElement.textContent = '';
});

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

