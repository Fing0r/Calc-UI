const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
const calcBtns = document.querySelectorAll('.calc__btn');
const calcBtnDel = document.querySelector('.calc__btn--del');
const calcBtnReset = document.querySelector('.calc__btn--reset');
const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
const operationInput = document.querySelector('.calc__operation');
const resultInput = document.querySelector('.calc__result');
let operator = '';
let a = ''
let b = ''

function Calc(operation, a, b) {
  const operations = {
    'sum': a + b,
    'subt': a - b,
    'multi': a * b,
    'div': b === 0 ? "Error" : a / b
  };
  return operations[operation];
}

const operators = {
  '+': 'sum',
  '–': 'subt',
  '×': 'multi',
  '÷': 'div',
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

calcBtnDel.addEventListener('click', function () {
  if (resultInput.value === 'Error') return;

  const isZeroOrEmpty = (resultInput.value === '0' || resultInput.value.length === 1);
  resultInput.value = isZeroOrEmpty ? '0' : resultInput.value.slice(0, length - 1);

  !operator ? (a = resultInput.value) : (b = b.slice(0, length - 1))
});

calcBtnReset.addEventListener('click', function () {
  resultInput.value = '0';
  operator = ''
  a = '0'
  b = ''
});

calcBtnsNum.forEach(function (calcBtnNum) {
  calcBtnNum.addEventListener('click', function () {
    if (resultInput.value === 'Error') return;
    !operator ? (a += calcBtnNum.textContent) : (b += calcBtnNum.textContent);
    resultInput.value = (resultInput.value === '0') ? calcBtnNum.textContent : (resultInput.value + calcBtnNum.textContent);
  });
});

calcBtnOperators.forEach(function (calcBtnOperator) {
  calcBtnOperator.addEventListener('click', function () {

    function addOperator() {
      if (!operator) operator = calcBtnOperator.textContent;

      for (const key in operators) {
        if (b && operator === key) {
          resultInput.value = Calc(operators[key], +a, +b);
          if (resultInput.value === 'Error') return;
          a = resultInput.value;
          b = '';
          operator = calcBtnOperator.textContent;
          resultInput.value = a + operator;
          return
        }

        if (resultInput.value.includes(key)) {
          operator = calcBtnOperator.textContent;
          resultInput.value = resultInput.value.slice(0, length - 1) + operator;
          return;
        }
      }
      resultInput.value += operator
    }

    if (calcBtnOperator.textContent in operators) return addOperator()

    if (operator in operators) {
      resultInput.value = Calc(operators[operator], +a, +b);
      if (resultInput.value === 'Error') return;
      a = resultInput.value
      b = ''
      operator = ''
    }
  });
});


calcBtns.forEach(calcBtn => {
  calcBtn.addEventListener('click', changeFontSize)
});
