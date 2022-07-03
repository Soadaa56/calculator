const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

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
}

const power = function(a,b) {
	let total = Math.pow(a,b);
  return total;
};

function operator() {
    operator = {
        sum, 
        multiply,
    }
}
