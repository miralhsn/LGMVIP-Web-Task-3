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
        currentDisplay.textContent = currentInput; // Update current input display
      }
    });
  });

  clearButton.addEventListener('click', () => {
    currentInput = '';
    currentDisplay.textContent = ''; // Clear current input display
  });

  backspaceButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    currentDisplay.textContent = currentInput; // Update current input display on backspace
  });

  equalsButton.addEventListener('click', () => {
    try {
      const result = eval(currentInput);
      history.push(`${currentInput} = ${result}`);
      historyDisplay.textContent = `${currentInput} = ${result}`; // Update history display with calculation
      currentDisplay.textContent = result; // Update current input display with result
      currentInput = ''; // Clear current input after calculation
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
