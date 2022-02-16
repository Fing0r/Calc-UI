var calcBtnsNum = document.querySelectorAll('.calc__btn--num');
var calcBtnDel = document.querySelector('.calc__btn--del');
var calcBtnEquals = document.querySelector('.calc__btn--equals');
var calcBtnReset = document.querySelector('.calc__btn--reset');
var calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
var operationInput = document.querySelector('.calc__operation');
var resultInput = document.querySelector('.calc__result');
var oper = '';
var operation = '';

function Calc(operation, a, b) {
  var isNotValid = typeof a !== 'number' || typeof b !== 'number' || !operation || a !== a || b !== b;
  if (isNotValid) return "Error";
  var operations = {
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
    operationInput.value += calcBtnNum.textContent;
  });
});

calcBtnOperators.forEach(function (calcBtnOperator) {
  calcBtnOperator.addEventListener('click', function () {
    switch (calcBtnOperator.textContent) {
      case '+':
        oper = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'sum';
        break;

      case '–':
        oper = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'subt';
        break;

      case '×':
        oper = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'multi';
        break;

      case '÷':
        oper = calcBtnOperator.textContent;
        operationInput.value += calcBtnOperator.textContent;
        operation = 'div';
        break;

      default:
        var arr = operationInput.value.split(oper);
        resultInput.value = Calc(operation, +arr[0], +arr[1]);
        break;
    }
  });
});