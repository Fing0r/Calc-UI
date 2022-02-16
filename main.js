const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
const calcBtnDel = document.querySelector('.calc__btn--del');
const calcBtnReset = document.querySelector('.calc__btn--reset');
const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
const operationInput = document.querySelector('.calc__operation');
const resultInput = document.querySelector('.calc__result');
let operator = '';
let a = ''
let b = ''
let flag = 0

function Calc(operation, a, b) {
  const isNotValid = !operation;
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
  resultInput.style.fontSize = resultInput.value.length > 4 ? '40px' : '96px'
  const isZeroOrEmpty = (resultInput.value === '0' || resultInput.value.length === 1)
  resultInput.value = isZeroOrEmpty ? '0' : resultInput.value.slice(0, length - 1)

  return !operator && (a = resultInput.value)
});

calcBtnReset.addEventListener('click', function () {
  resultInput.style.fontSize = '96px'
  resultInput.value = '0';
  operator = ''
  a = ''
  b = ''
});

calcBtnsNum.forEach(function (calcBtnNum) {
  calcBtnNum.addEventListener('click', function () {
    console.log(resultInput.value.length)

    resultInput.style.fontSize = resultInput.value.length > 4 ? '40px' : '96px'
    if (flag && !operator) {
      resultInput.value = ''
      flag = 0;
      a = ''
    }!operator ? (a += calcBtnNum.textContent) : (b += calcBtnNum.textContent)
    resultInput.value = resultInput.value === '0' ? calcBtnNum.textContent : (resultInput.value + calcBtnNum.textContent)
  });
});

calcBtnOperators.forEach(function (calcBtnOperator) {
  calcBtnOperator.addEventListener('click', function () {

    function addOperator() {
      if (a && b && operator) {
        resultInput.value = Calc(operator, +a, +b);
        a = resultInput.value
        b = ''
        operator = calcBtnOperator.textContent;
        resultInput.value += operator
        return
      }

      if (operator) {
        operator = calcBtnOperator.textContent;
        resultInput.value = resultInput.value.slice(0, length - 1) + operator
        return;
      }

      operator = calcBtnOperator.textContent;
      resultInput.value += operator
      return;
    }

    switch (calcBtnOperator.textContent) {
      case '+':
        addOperator()
        break

      case '–':
        addOperator()
        break;

      case '×':
        addOperator()
        break;

      case '÷':
        addOperator()
        break;

      default:
        resultInput.value = Calc(operator, +a, +b);
        operator = ''
        a = resultInput.value
        b = ''
        flag = 1
        break;
    }
  });
});


