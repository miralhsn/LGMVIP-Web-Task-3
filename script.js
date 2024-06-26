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

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

  themeToggleButton.addEventListener('change', toggleTheme);

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
    historyDisplay.textContent = '';
  });

  backspaceButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    currentDisplay.textContent = currentInput;
  });

  equalsButton.addEventListener('click', () => {
    try {
      const result = eval(currentInput);
      history.push(`${currentInput} = ${result}`);
      historyDisplay.textContent = `${currentInput} = ${result}`;
      currentDisplay.textContent = result;
      currentInput = '';
      updateHistory();
    } catch {
      currentDisplay.textContent = 'Error';
      currentInput = '';
    }
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
