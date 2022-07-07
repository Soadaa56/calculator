const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

let operandPosistion;
const equationArray = [];

for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
        let currentlyClickedButton = e.target;
        let value = currentlyClickedButton.getAttribute('data-number');
        currentOperandElement.textContent += value;
        equationArray.push(value);
    });
}

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
    let result = ''
    operate();
    previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + result;
    currentOperandElement.textContent = result;
    equationArray.length = 0;
});

const operate = function() {
    let temp = equationArray.toString().replace(/,/g,"");
    temp = temp.slice(0, operandPosistion + 1);
    console.log(temp);
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

