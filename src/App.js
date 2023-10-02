import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [currentOperand, setCurrentOperand] = useState("0");
  const [expression, setExpression] = useState("");
  
  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  }
  
  const buttonClick = (symbol) => {
    if (symbol === "clear") {
      setCurrentOperand(0);
      setExpression("");
    } else if (isOperator(symbol)) {
        if (symbol === "-") {
          if (expression.match(/[-+*/]\s+[-+/*]\s$/) !== null) {
            return;
          } else {
            setExpression(expression + " " + symbol + " ");
            setCurrentOperand(symbol);
          }
          if (expression.includes("=")) {
            // or match(/=\s-?\d{0,}\.?\d{0,}$/g);
            let result = expression.match(/=\s-?\d*\.?\d*$/g);
            let lastNumber = result[0].split(/=/);
            let answer = lastNumber[lastNumber.length - 1].trim();
            setExpression(answer + " " + symbol + " ");
            setCurrentOperand(symbol);
          }

        } else {
            // check if the last operator is symbol
            if (expression.match(/[-+/*]\s$/) !== null) {
              if (expression.match(/[-+/*]\s+[-+/*]\s$/) !== null) {
                setExpression(expression.slice(0, -5) + symbol + " ");
                setCurrentOperand(symbol); 
              } else {
                setExpression(expression.slice(0, -2) + symbol + " ");
                setCurrentOperand(symbol);
              }
            } else {
              setExpression(expression + " " + symbol + " ");
              setCurrentOperand(symbol);
            }
            if (expression.includes("=")) {
              // get result
              let result = expression.match(/=\s-?\d*\.?\d*$/g);
              let lastNumber = result[0].split(/=/);
              let answer = lastNumber[lastNumber.length - 1].trim();
              // need another regex who matches the decimal numbers
              setExpression(answer + " " + symbol + " ");
              setCurrentOperand(symbol);
            }
        }
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
        const lastNumber = expression.split(/[-+/*]/g).pop().trim();
        if (lastNumber !== "0") { 
          setExpression(expression + symbol);
          setCurrentOperand(lastNumber + symbol);
        }
    } else if (symbol === ".") {
      //check if last operator is symbol or if it is an empty string
      if ((expression.match(/[-+/*]\s$/) !== null) || (expression === "")){
        setExpression(expression + "0" + symbol);
        setCurrentOperand("0" + symbol);
      } else {
        // split by operators and get the last number
        const lastNumber = expression.split(/[-+/*]/g).pop();
        // if the last number already have a decimal, don't add another
        if (lastNumber.includes(".")) return;
        setExpression(expression + symbol);
        setCurrentOperand(lastNumber + symbol);
      }
    } else {
      const lastNumber = expression.split(/[-+/*]/g).pop().trim();
      if (lastNumber.charAt(0) === "0" && lastNumber.includes(".") === false) {
        setExpression(expression.trim().slice(0, -1) + symbol);
        setCurrentOperand(symbol);
      } else {
        setExpression(expression + symbol);
        setCurrentOperand(lastNumber + symbol);
      }
    }
  }

  const calculate = () => {
    if (expression.match(/[-+/*]\s$/) !== null) {
      if (expression.match(/[-+/*]\s+[-+/*]\s$/) !== null) {
        let slicedExpression = expression.slice(0, -5);
        let result = eval(slicedExpression);
        result = roundNumber(result);
        setExpression(slicedExpression + " " + "=" + " " + result);
        setCurrentOperand(result);
      } else {
        let slicedExpression = expression.slice(0, -2);
        let result = eval(slicedExpression);
        result = roundNumber(result);
        setExpression(slicedExpression + " " + "=" + " " + result);
        setCurrentOperand(result);
      }
    } else {
      let result = eval(expression);
      result = roundNumber(result);
      setExpression(expression + " " + "=" + " " + result);
      setCurrentOperand(result);
    }
  };

  const roundNumber = (num) => {
    return Math.round(num * 100000) / 100000;
  }

  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid-item" id="display">
          <div id="expression">{expression}</div>
          <div id="answer">{currentOperand}</div>
        </div> 
        <button onClick={() => buttonClick("clear")} className="grid-item" id="clear">AC</button>
        <button onClick={() => buttonClick("/")} className="grid-item" id="divide">/</button>
        <button onClick={() => buttonClick("*")} className="grid-item" id="multiply">*</button>
        <button onClick={() => buttonClick("7")} className="grid-item" id="seven">7</button>
        <button onClick={() => buttonClick("8")} className="grid-item" id="eight">8</button>
        <button onClick={() => buttonClick("9")} className="grid-item" id="nine">9</button>
        <button onClick={() => buttonClick("-")} className="grid-item" id="subtract">-</button>
        <button onClick={() => buttonClick("4")} className="grid-item" id="four">4</button>
        <button onClick={() => buttonClick("5")} className="grid-item" id="five">5</button>
        <button onClick={() => buttonClick("6")} className="grid-item" id="six">6</button>
        <button onClick={() => buttonClick("+")} className="grid-item" id="add">+</button>
        <button onClick={() => buttonClick("1")} className="grid-item" id="one">1</button>
        <button onClick={() => buttonClick("2")} className="grid-item" id="two">2</button>
        <button onClick={() => buttonClick("3")} className="grid-item" id="three">3</button>
        <button onClick={() => buttonClick("=")} className="grid-item" id="equals">=</button>
        <button onClick={() => buttonClick("0")} className="grid-item" id="zero">0</button>
        <button onClick={() => buttonClick(".")} className="grid-item" id="decimal">.</button>
      </div>
    </div>
  );
}

export default App;
