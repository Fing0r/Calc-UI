const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
const calcBtns = document.querySelectorAll('.calc__btn');
const calcBtnDel = document.querySelector('.calc__btn--del');
const calcBtnReset = document.querySelector('.calc__btn--reset');
const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
const operationInput = document.querySelector('.calc__operation');
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
    resultInput.style.fontSize = '60px'
  } else if (resultInput.value.length >= 9 && resultInput.value.length < 16) {
    resultInput.style.fontSize = '40px'
  } else if (resultInput.value.length >= 16) {
    resultInput.style.fontSize = '20px'
  } else {
    resultInput.style.fontSize = null
  }
}

function getResult() {
  if (operator in OPERATORS) {
    num1 = Calc(OPERATORS[operator], +num1, +num2)
    if (resultInput.value === 'Error') return;
    outputOnDisplay(num1)
  }
}

function addOperator(btn) {
  !operator && (operator = btn.textContent);

  for (const key in OPERATORS) {
    if ((num2 || num2 === 0) && operator === key) {
      num1 = Calc(OPERATORS[operator], +num1, +num2)
      if (resultInput.value === 'Error') return;
      operator = btn.textContent;
      outputOnDisplay(num1, operator);
      return;
    }

    if (resultInput.value.includes(key)) {
      operator = btn.textContent;
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
  resultInput.value = `${num1.toLocaleString('en-US', {maximumFractionDigits: 20}) }${operator}${num2.toLocaleString('en-US', {maximumFractionDigits: 20}) }`
}

calcBtnDel.addEventListener('click', function () {
  if (resultInput.value === 'Error') return;
  const reduceNum = (num) => String(num).length === 1 ? '' : +String(num).slice(0, length - 1);
  const isNegativeZero = (String(num1).length === 2 && String(num1)[0] === '-');
  const isFraction = num1 % 1;

  if (isFraction) {
    num1 = reduceNum(num1)
    return outputOnDisplay(num1);
  }

  if (isNegativeZero) {
    return outputOnDisplay()
  }

  if (!num2 && operator || num1 < 0) {
    if (operator) return outputOnDisplay(num1)
    num1 = reduceNum(num1)
    return outputOnDisplay(num1)
  }

  !operator ? (num1 = reduceNum(num1) || 0) : (num2 = reduceNum(num2))
  outputOnDisplay(num1, operator, num2)
});


calcBtnsNum.forEach(function (calcBtnNum) {
  calcBtnNum.addEventListener('click', function () {
    if (resultInput.value === 'Error') return;
    const increaseNum = (num) => (String(num).length < 6) ? (num += calcBtnNum.textContent) : num;

    !operator ? (num1 = +increaseNum(num1)) : (num2 = +increaseNum(num2));
    outputOnDisplay(num1, operator, num2)
  });
});

calcBtnOperators.forEach(function (calcBtnOperator) {
  calcBtnOperator.addEventListener('click', function () {
    (calcBtnOperator.textContent in OPERATORS) ? addOperator(calcBtnOperator): getResult();
  });
});

calcBtnReset.addEventListener('click', function () {
  outputOnDisplay();
})

calcBtns.forEach(calcBtn => {
  calcBtn.addEventListener('click', changeFontSize)
});