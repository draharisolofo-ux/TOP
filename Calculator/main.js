const buttons = [
  'C', 'CE',  '%', '<', 
  '1/x', 'Vx', 'x²', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '+/-', '0', '.', '='
];
const operators = ['+', '-', '*', '/'];

const body = document.querySelector("#body");
const screen = document.querySelector("#screen");
const span = screen.firstElementChild;
console.log({span});
let value1 = 0, value2 = 0, operator = "";

body.addEventListener("click", handleUserAction);

function handleUserAction(event)
{
  const target = event.target;
  if(!target.classList.contains("btn-op"))
  {
    return;
  }
  if(operators.includes(operator) && operators.includes(target.value))
  {
    const response = operate(value1, value2, operator);
    span.textContent = response;
    value1 = response;
    value2 = 0;
    operator = target.value;
  }
  const parsed = parseInt(target.value, 10);
  if(!isNaN(parsed) && value1 && (operator && operator !== "="))
  {
    value2 += '' + parsed;
    value2 = parseInt(value2);
    span.textContent += parsed;
  }
  else if(!isNaN(parsed))
  {
    if(operator === '=')
    {
      value1 = parsed;
      span.textContent = "";
    }

    else
      value1 += '' + parsed;
    value1 = parseInt(value1);
    span.textContent += parsed;
  }
  else if(target.value === "=")
  {
    const response = operate(value1, value2, operator);
    span.textContent = response;
    value1 = response;
    value2 = 0;
    operator = "=";
  }
  else {
    switch(target.value)
    {
      case "C":
      case "CE":
        value1 = value2 = 0;
        operator = "";
        span.textContent = "";
        break;
      default:
        operator = target.value;
        span.textContent += operator;
        break;
    }
  }
}


createBtns();

function add(a, b)
{
  console.log({a, b, response : a + b });
  return a + b;
}

function substract(a, b)
{
  return a - b;
}

function divide(a, b)
{
  return a / b;
}

function multiply(a, b) 
{
  return a * b;
}

const operate = (x, y, operator) => {
  switch(operator)
  {
    case "+":
      return add(x, y);
    case "-":
      return substract(x, y);
    case "/":
      return divide(x, y);
    default:
      return multiply(x, y);
  }
}

function createBtns()
{
  for(let i = 0; i < buttons.length; i++)
  {
    const btn = document.createElement("button");
    btn.textContent = buttons[i];
    btn.value = buttons[i];
    btn.classList.add("btn-op");
    body.append(btn);
  }
}