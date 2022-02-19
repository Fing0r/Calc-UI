const calcBtns = document.querySelectorAll('button[data-btn]');
const resultInput = document.querySelector('.calc__result');

let operator = '';
let num1 = '';
let num2 = '';

const OPERATORS = {
  '+': 'sum',
  '–': 'subt',
  '×': 'multi',
  '÷': 'div',
}

function Calc(operation, a, b) {
  const operations = {
    'sum': a + b,
    'subt': a - b,
    'multi': a * b,
    'div': b === 0 ? "Error" : a / b
  };
  return operations[operation];
}

function changeFontSize() {
  if (resultInput.value.length > 5 && resultInput.value.length < 9) {
    resultInput.style.fontSize = '60px';
  } else if (resultInput.value.length >= 9 && resultInput.value.length < 15) {
    resultInput.style.fontSize = '40px';
  } else if (resultInput.value.length >= 15) {
    resultInput.style.fontSize = '20px';
  } else {
    resultInput.style.fontSize = null;
  }
}

function getResult(e) {
  if (e.currentTarget.dataset.btn !== 'equals') return;

  if (num2 === '') return;
  if (operator in OPERATORS) {
    num1 = Calc(OPERATORS[operator], +num1, +num2);
    if (resultInput.value === 'Error') return;
    outputOnDisplay(num1);
  }
}

function addOperator(e) {
  if (e.currentTarget.dataset.btn !== 'operator') return;
  !operator && (operator = e.currentTarget.textContent);

  for (const key in OPERATORS) {
    if ((num2 || num2 === 0) && operator === key) {
      num1 = Calc(OPERATORS[operator], +num1, +num2);
      if (resultInput.value === 'Error') return;
      operator = e.currentTarget.textContent;
      outputOnDisplay(num1, operator);
      return;
    }

    if (resultInput.value.includes(key)) {
      operator = e.currentTarget.textContent;
      resultInput.value = resultInput.value.slice(0, length - 1) + operator;
      return;
    }
  }
  if (resultInput.value === 'Error') return;
  resultInput.value += operator;
}

function outputOnDisplay(numOne, op, numTwo) {
  !op && (operator = '');
  !numTwo && (num2 = '');
  !numOne && (num1 = 0);
  resultInput.value = `${num1.toLocaleString('en-US', {maximumFractionDigits: 20})}${operator}${num2.toLocaleString('en-US', {maximumFractionDigits: 20})}`;
}

function deleteChar(e) {
  if (e.currentTarget.dataset.btn !== 'del') return;

  if (resultInput.value === 'Error') return;
  const reduceNum = (num) => String(num).length === 1 ? '' : +String(num).slice(0, length - 1);
  const isNegativeZero = (String(num1).length === 2 && String(num1)[0] === '-');
  const isFraction = num1 % 1;

  if (isFraction) {
    num1 = reduceNum(num1);
    return outputOnDisplay(num1);
  }

  if (isNegativeZero) {
    return outputOnDisplay();
  }

  if (!num2 && operator || num1 < 0) {
    if (operator) return outputOnDisplay(num1);
    num1 = reduceNum(num1);
    return outputOnDisplay(num1);
  }

  !operator ? (num1 = reduceNum(num1) || 0) : (num2 = reduceNum(num2))
  outputOnDisplay(num1, operator, num2);
}

function addChar(e) {
  if (e.currentTarget.dataset.btn !== 'num') return;

  if (resultInput.value === 'Error') return;
  const increaseNum = (num) => (String(num).length < 6) ? (num += e.currentTarget.textContent) : num;

  !operator ? (num1 = +increaseNum(num1)) : (num2 = +increaseNum(num2));

  (num2 === 0) && (num2 = e.currentTarget.textContent);

  outputOnDisplay(num1, operator, num2);
}

calcBtns.forEach(calcBtn => {
  calcBtn.addEventListener('click', function (e) {
    if (e.currentTarget.dataset.btn !== 'reset') return;
    outputOnDisplay();
  });
  calcBtn.addEventListener('click', function (e) {
    (e.currentTarget.textContent in OPERATORS) ? addOperator(e): getResult(e);
  });
  calcBtn.addEventListener('click', deleteChar);

  calcBtn.addEventListener('click', addChar);
  calcBtn.addEventListener('click', changeFontSize);
});

// console.log(`NUM num1: ${num1}, num2: ${num2}, operator: ${operator}`);