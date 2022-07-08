const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const equationArray = [];
let operandPosistion;
let equationResult;

// numberButtons
for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        let value = currentlyClickedButton.getAttribute('data-number');
        currentOperandElement.textContent += value;
        equationArray.push(value);
    });
}

// operands
for (i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        let operand = currentlyClickedButton.getAttribute('data-operation');
        currentOperandElement.textContent += ' ' + operand + ' ';
        equationArray.push(operand);
        operandPosistion = equationArray.indexOf(operand);
    });
}

equalButton.addEventListener('click', () => {
    operate();
    previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + equationResult;
    currentOperandElement.textContent = equationResult;
    equationArray.length = 0;
});

allClearButton.addEventListener('click', () => {
    equationArray.length = 0;
    operandPosistion = '';
    equationResult = '';
    previousOperandElement.textContent = '';
    currentOperandElement.textContent = '';
});

const operate = function() {
    // Allows array to be sliced; Combines multiple numbers into a singular term
    let expression = equationArray.toString().replace(/,/g,"");

    // Seperates the two terms from the operator
    termOne = parseInt(expression.slice(0, operandPosistion));
    termTwo = parseInt(expression.slice(operandPosistion + 1));
    operand = expression.charAt(operandPosistion);
    getEquationResult(operand);
}


const getEquationResult = function(operand) {
    switch (operand) {
        case '+':
            equationResult = termOne + termTwo;
            break;
        case '-':
            equationResult = termOne - termTwo;
            break;
        case 'x' :
            equationResult = termOne * termTwo;
            break;
        case '/' :
            equationResult = termOne / termTwo;
            break;
        default:
            console.log('bug on switch statement')
            equationResult = 'error'
            break;
    }
}
const sum = function(numbers) {
    let total = 0;
    for (i = 0; i < numbers.length; i++) {
        total += numbers[i]
    }
    return total;
};

const multiply = function(numbers) {
    let total = numbers[0];
    for (i = 1; i < numbers.length; i++) {
        total *= numbers[i]
    }
    return total;
};

const divide = function(numbers) {
    let total = numbers[0];
    for (i = 1; i < numbers.length; i++) {
        total /= numbers[i];
    }
    return total;
};

const power = function(a,b) {
	let total = Math.pow(a,b);
  return total;
};

