const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
const calcBtns = document.querySelectorAll('.calc__btn');
const calcBtnDel = document.querySelector('.calc__btn--del');
const calcBtnReset = document.querySelector('.calc__btn--reset');
const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
const operationInput = document.querySelector('.calc__operation');
const resultInput = document.querySelector('.calc__result');
let operator = '';
let a = '';
let b = '';

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
    resultInput.value = Calc(OPERATORS[operator], +a, +b);
    if (resultInput.value === 'Error') return;
    a = resultInput.value
    b = ''
    operator = ''
  }
}

function addOperator(btn) {
  if (!operator) operator = btn.textContent;

  for (const key in OPERATORS) {
    if (b && operator === key) {
      resultInput.value = Calc(OPERATORS[key], +a, +b);
      if (resultInput.value === 'Error') return;
      a = resultInput.value;
      b = '';
      operator = btn.textContent;
      resultInput.value = a + operator;
      return
    }

    if (resultInput.value.includes(key)) {
      operator = btn.textContent;
      resultInput.value = resultInput.value.slice(0, length - 1) + operator;
      return;
    }
  }
  resultInput.value += operator
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
    (calcBtnOperator.textContent in OPERATORS) ? addOperator(calcBtnOperator): getResult()
  });
});

calcBtns.forEach(calcBtn => {
  calcBtn.addEventListener('click', changeFontSize)
});

// console.log(`del a: ${a}, b: ${b}`);

// let flag = 0


// if (flag && !operator) { calcBtnNum
//   resultInput.value = '';
//   flag = 0;
//   a = '';
// }


// for (const key in operators) { result
//   if (operator === key) {
//     resultInput.value = Calc(operators[key], +a, +b);
//     operator = ''
//     a = resultInput.value
//     b = ''
//     flag = 1
//   }
// }

// for (const key in operators) {
//  if (key === operator) {
//    addOperator()
//  }
// }


// -------------------------------------------------

// switch (calcBtnOperator.textContent) {
// case '+':
//   addOperator()
//   break

// case '–':
//   addOperator()
//   break;

// case '×':
//   addOperator()
//   break;

// case '÷':
//   addOperator()
//   break;

// default:
//   resultInput.value = Calc(operator, +a, +b);
//   resultInput.style.fontSize = resultInput.value.length > 4 ? '40px' : null
//   operator = ''
//   a = resultInput.value
//   b = ''
//   flag = 1
//   break;
// }





// const calcBtnsNum = document.querySelectorAll('.calc__btn--num');
// const calcBtnDel = document.querySelector('.calc__btn--del');
// const calcBtnReset = document.querySelector('.calc__btn--reset');
// const calcBtnOperators = document.querySelectorAll('.calc__btn--operator');
// const operationInput = document.querySelector('.calc__operation');
// const resultInput = document.querySelector('.calc__result');
// let operator = '';
// let a = ''
// let b = ''

// function Calc(operation, a, b) {
//   const isNotValid = !operation;
//   if (isNotValid) return "Error";
//   const operations = {
//     '+': a + b,
//     '–': a - b,
//     '×': a * b,
//     '÷': b === 0 ? "Error" : a / b
//   };
//   return operations[operation];
// }

// calcBtnDel.addEventListener('click', function () {
//   const isZeroOrEmpty = (operationInput.value === '0' || operationInput.value.length === 1)
//   operationInput.value = isZeroOrEmpty ? '0' : operationInput.value.slice(0, length - 1)
// });

// calcBtnReset.addEventListener('click', function () {
//   operationInput.value = '0';
//   resultInput.value = '';
//   operator = '';
// });

// calcBtnsNum.forEach(function (calcBtnNum) {
//   calcBtnNum.addEventListener('click', function () {
//     !operator ? (a += calcBtnNum.textContent) : (b += calcBtnNum.textContent)
//     operationInput.value = operationInput.value === '0' ? calcBtnNum.textContent : (operationInput.value + calcBtnNum.textContent)
//   });
// });

// calcBtnOperators.forEach(function (calcBtnOperator) {
//   calcBtnOperator.addEventListener('click', function () {

//     function addOperator() {
//       if (operator) {
//         operator = calcBtnOperator.textContent;
//         operationInput.value = operationInput.value.slice(0, length - 1) + operator
//         return;
//       }

//       operator = calcBtnOperator.textContent;
//       operationInput.value += operator
//       return;
//     }

//     switch (calcBtnOperator.textContent) {
//       case '+':
//         addOperator()
//         break

//       case '–':
//         addOperator()
//         break;

//       case '×':
//         addOperator()
//         break;

//       case '÷':
//         addOperator()
//         break;

//       default:
//         const arrNum = operationInput.value.split(operator);
//         resultInput.value = Calc(operator, +arrNum[0], +arrNum[1]);
//         operationInput.value = '0'
//         break;
//     }
//   });
// });


// operationInput.value = operationInput.value.includes(operator) ? operationInput.value + '' : operationInput.value + calcBtnOperator.textContent