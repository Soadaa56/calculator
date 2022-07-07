const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

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
    });
}

equalButton.addEventListener('click', () => {
    let result = ''
    previousOperandElement.textContent = currentOperandElement.textContent + ' = ' + result;
    currentOperandElement.textContent = result;
    console.log(equationArray);
});

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