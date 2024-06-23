document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const historyList = document.getElementById('history-list');
    const historyDisplay = document.getElementById('history-display');
    const currentDisplay = document.getElementById('current-display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    const backspaceButton = document.getElementById('backspace');
    let history = [];
    let currentInput = '';
  
    themeToggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
          currentInput += value;
          currentDisplay.textContent = currentInput;
        }
      });
    });
  
    clearButton.addEventListener('click', () => {
      currentInput = '';
      currentDisplay.textContent = '';
    });
  
    equalsButton.addEventListener('click', () => {
      if (currentInput) {
        try {
          const result = eval(currentInput);
          history.push(`${currentInput} = ${result}`);
          updateHistory();
          currentInput = result;
          currentDisplay.textContent = result;
        } catch {
          currentDisplay.textContent = 'Error';
        }
      }
    });
  
    backspaceButton.addEventListener('click', () => {
      currentInput = currentInput.slice(0, -1);
      currentDisplay.textContent = currentInput;
    });
  
    function updateHistory() {
      historyList.innerHTML = '';
      history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
      });
    }
  });
  