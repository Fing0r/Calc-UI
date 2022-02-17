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
  } else if (resultInput.value.length >= 9 && resultInput.value.length < 13) {
    resultInput.style.fontSize = '40px'
  } else if (resultInput.value.length >= 13) {
    resultInput.style.fontSize = '20px'
  } else {
    resultInput.style.fontSize = null
  }
}

function getResult() {
  if (operator in OPERATORS) {
    resultInput.value = Calc(OPERATORS[operator], +num1, +num2);
    if (resultInput.value === 'Error') return;
    clearVariables()
  }
}

function clearVariables() {
  num1 = resultInput.value;
  num2 = '';
  operator = '';
}

function addOperator(btn) {
  if (!operator) operator = btn.textContent;

  for (const key in OPERATORS) {
    if (num2 && operator === key) {
      resultInput.value = Calc(OPERATORS[key], +num1, +num2);
      if (resultInput.value === 'Error') return;
      clearVariables()
      operator = btn.textContent;
      resultInput.value = num1 + operator;
      return;
    }

    if (resultInput.value.includes(key)) {
      operator = btn.textContent;
      resultInput.value = resultInput.value.slice(0, length - 1) + operator;
      return;
    }
  }
  resultInput.value += operator;
}

calcBtnDel.addEventListener('click', function () {
  if (resultInput.value === 'Error') return;
  const isZeroOrEmpty = (resultInput.value === '0' || resultInput.value.length === 1);

  resultInput.value = isZeroOrEmpty ? '0' : resultInput.value.slice(0, length - 1);
  !operator ? (num1 = resultInput.value) : (num2 = num2.slice(0, length - 1));
});

calcBtnReset.addEventListener('click', function () {
  resultInput.value = '0';
  clearVariables()
});

calcBtnsNum.forEach(function (calcBtnNum) {
  calcBtnNum.addEventListener('click', function () {
    if (resultInput.value === 'Error') return;

    !operator ? (num1 += calcBtnNum.textContent) : (num2 += calcBtnNum.textContent);
    resultInput.value = (resultInput.value === '0') ? calcBtnNum.textContent : (resultInput.value + calcBtnNum.textContent);
  });
});

calcBtnOperators.forEach(function (calcBtnOperator) {
  calcBtnOperator.addEventListener('click', function () {
    (calcBtnOperator.textContent in OPERATORS) ? addOperator(calcBtnOperator): getResult();
  });
});

calcBtns.forEach(calcBtn => {
  calcBtn.addEventListener('click', changeFontSize)
});