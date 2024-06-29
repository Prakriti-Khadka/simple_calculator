document.addEventListener("DOMContentLoaded", function() {
  // Selecting elements
  const output = document.getElementById('output');
  const integerButtons = document.querySelectorAll('.integer');
  const operationButtons = document.querySelectorAll('.operation');
  const clearButton = document.getElementById('clear');
  const equalButton = document.getElementById('equalT0');

  let currentInput = '';
  let currentOperation = null;
  let previousInput = '';

  // Function to update the output display
  function updateOutput() {
      output.textContent = currentInput;
  }

  // Function to handle integer button clicks
  integerButtons.forEach(button => {
      button.addEventListener('click', () => {
          if (button.textContent === '.' && currentInput.includes('.')) return;
          currentInput += button.textContent;
          updateOutput();
      });
  });

  // Function to handle operation button clicks
  operationButtons.forEach(button => {
      button.addEventListener('click', () => {
          if (currentInput === '') return;
          if (previousInput !== '') {
              calculate();
          }
          currentOperation = button.textContent;
          previousInput = currentInput;
          currentInput = '';
      });
  });

  // Function to handle clear button click
  clearButton.addEventListener('click', () => {
      currentInput = '';
      previousInput = '';
      currentOperation = null;
      updateOutput();
  });

  // Function to handle equal button click
  equalButton.addEventListener('click', () => {
      if (currentOperation === null || currentInput === '') return;
      calculate();
      previousInput = '';
      currentOperation = null;
  });

  // Function to perform calculation
  function calculate() {
      let result;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput || output.textContent); // Use edited content if available
      if (isNaN(prev) || isNaN(current)) return;
      switch (currentOperation) {
          case '+':
              result = prev + current;
              break;
          case '-':
              result = prev - current;
              break;
          case '*':
              result = prev * current;
              break;
          case '/':
              result = prev / current;
              break;
          case '%':
              result = prev % current;
              break;
          default:
              return;
      }
      currentInput = result.toString();
      updateOutput();
  }

  // Function to handle cursor movement in the output box
  output.addEventListener('click', () => {
      output.contentEditable = true;
      output.focus();
  });

  output.addEventListener('blur', () => {
      output.contentEditable = false;
      currentInput = output.textContent;
  });
});

