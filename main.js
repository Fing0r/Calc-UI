const calcBtns = document.querySelectorAll('[data-btn]');
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

calcBtns.forEach(calcBtn => calcBtn.addEventListener('click', definitionAction));

function definitionAction(e) {
  const errorReset = (resultInput.value === 'Error' && e.currentTarget.dataset.btn !== 'reset')
  if (errorReset) return;
  changeFontSize()
  switch (e.currentTarget.dataset.btn) {
    case 'del':
      return deleteChar(), changeFontSize();
    case 'num':
      return addChar(e), changeFontSize();
    case 'reset':
      return outputOnDisplay(), changeFontSize();
    case 'equals':
      return getResult(), changeFontSize();
    case 'operator':
      return addOperator(e), changeFontSize();
    default:
      break;
  }
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

function getResult() {
  if (!num2) return;
  num1 = Calc(OPERATORS[operator], +num1, +num2);
  outputOnDisplay(num1);
}

function addOperator(e) {
  !operator && (operator = e.currentTarget.textContent);

  if ((num2 || num2 === 0)) {
    num1 = Calc(OPERATORS[operator], +num1, +num2);
    operator = e.currentTarget.textContent;
    outputOnDisplay(num1, operator);
    return;
  }

  if (resultInput.value.includes(operator)) {
    operator = e.currentTarget.textContent;
    resultInput.value = resultInput.value.slice(0, length - 1) + operator;
    return;
  }

  resultInput.value += operator;
}

function outputOnDisplay(numOne, op, numTwo) {
  !op && (operator = '');
  !numTwo && (num2 = '');
  !numOne && (num1 = 0);
  resultInput.value = `${num1.toLocaleString('en-US', {maximumFractionDigits: 20})}${operator}${num2.toLocaleString('en-US', {maximumFractionDigits: 20})}`;
}

function deleteChar() {
  const reduceNum = (num) => String(num).length === 1 ? '' : +String(num).slice(0, length - 1);
  const isNegativeZero = (String(num1).length === 2 && String(num1)[0] === '-');
  const isFraction = num1 % 1;
  const isOperator = (!num2 && operator);

  if (isFraction) {
    num1 = reduceNum(num1);
    return outputOnDisplay(num1);
  }
  if (isNegativeZero) return outputOnDisplay();
  if (isOperator) return outputOnDisplay(num1);

  !operator ? (num1 = reduceNum(num1) || 0) : (num2 = reduceNum(num2))
  outputOnDisplay(num1, operator, num2);
}

function addChar(e) {
  const increaseNum = (num) => (String(num).length < 6) ? (num += e.currentTarget.textContent) : num;
  !operator ? (num1 = +increaseNum(num1)) : (num2 = +increaseNum(num2));
  (num2 === 0) && (num2 = e.currentTarget.textContent);
  outputOnDisplay(num1, operator, num2);
}