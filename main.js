const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
const calcBtnDel = document.querySelector('.calc__btn--del');
const calcBtnEquals = document.querySelector('.calc__btn--equals');
const calcBtnReset = document.querySelector('.calc__btn--reset');
const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
const operationInput = document.querySelector('.calc__operation');
const resultInput = document.querySelector('.calc__result');
let operator = '';
let operation = '';

function Calc(operation, a, b) {
  const isNotValid = typeof a !== 'number' || typeof b !== 'number' || !operation || a !== a || b !== b;
  if (isNotValid) return "Error";
  const operations = {
    sum: a + b,
    subt: a - b,
    multi: a * b,
    div: b === 0 ? "Error" : a / b
  };
  return operations[operation];
}

calcBtnDel.addEventListener('click', function () {
  operationInput.value = operationInput.value.slice(0, length - 1);
});

calcBtnReset.addEventListener('click', function () {
  operationInput.value = '0';
  resultInput.value = '';
});

calcBtnsNum.forEach(function (calcBtnNum) {
  calcBtnNum.addEventListener('click', function () {
    if (operationInput.value === '0') {
      operationInput.value = calcBtnNum.textContent;
    } else {
      operationInput.value += calcBtnNum.textContent;
    }
  });
});

calcBtnOperators.forEach(function (calcBtnOperator) {
  calcBtnOperator.addEventListener('click', function () {
    switch (calcBtnOperator.textContent) {
      case '+':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'sum';
        break;

      case '–':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'subt';
        break;

      case '×':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'multi';
        break;

      case '÷':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'div';
        break;

      default:
        const arrNum = operationInput.value.split(operator);
        resultInput.value = Calc(operation, +arrNum[0], +arrNum[1]);
        break;
    }
  });
});