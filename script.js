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

    const isDarkMode = document.body.classList.contains('dark-mode');
    document.documentElement.style.setProperty('--background-color', isDarkMode ? 'linear-gradient(to bottom right, #2c2c2c, #1a1a1a)' : 'linear-gradient(to bottom right, #ffffff, #a0e4f9)');
    document.documentElement.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#000000');
    document.documentElement.style.setProperty('--button-bg-color', isDarkMode ? '#555555' : '#f0f0f0');
    document.documentElement.style.setProperty('--button-text-color', isDarkMode ? '#ffffff' : '#000000');
  }

  themeToggleButton.addEventListener('click', toggleTheme);

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
