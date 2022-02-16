const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
const calcBtnDel = document.querySelector('.calc__btn--del');
const calcBtnEquals = document.querySelector('.calc__btn--equals');
const calcBtnReset = document.querySelector('.calc__btn--reset');
const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
const operationInput = document.querySelector('.calc__operation');
const resultInput = document.querySelector('.calc__result');
let operator = '';

function Calc(operation, a, b) {
  const isNotValid = typeof a !== 'number' || typeof b !== 'number' || !operation || a !== a || b !== b;
  if (isNotValid) return "Error";
  const operations = {
    '+': a + b,
    '–': a - b,
    '×': a * b,
    '÷': b === 0 ? "Error" : a / b
  };
  return operations[operation];
}

calcBtnDel.addEventListener('click', function () {
    const isZeroOrEmpty = (operationInput.value === '0' || operationInput.value.length  ===  1)
    operationInput.value = isZeroOrEmpty ? '0' : operationInput.value.slice(0, length - 1)
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
        break;

      case '–':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        break;

      case '×':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        break;

      case '÷':
        operator = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        break;

      default:
        const arrNum = operationInput.value.split(operator);
        resultInput.value = Calc(operator, +arrNum[0], +arrNum[1]);
        break;
    }
  });
});