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
