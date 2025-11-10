const display = document.getElementById("display");
const themeSwitch = document.getElementById("themeSwitch");
const clickSound = new Audio("click.mp3");
const historyList = document.getElementById("historyList");
clickSound.volume = 0.3; // optional: control volume

// ====== History Section ======
function addToHistory(entry) {
  if (!historyList) return; // avoid error if history is missing
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);

  // keep only last 10 entries
  if (historyList.childElementCount > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// ====== Sound ======
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// ====== Basic Functions ======
function appendValue(value) {
  playClick();
  display.value += value;
}

function clearDisplay() {
  playClick();
  display.value = "";
}

function deleteLast() {
  playClick();
  display.value = display.value.slice(0, -1);
}

// ====== Calculate Function (Fixed) ======
function calculate() {
  playClick();
  try {
    // Prevent calculation if display is empty
    if (display.value.trim() === "") {
      display.value = "";
      return;
    }

    // Prevent invalid endings like 2+, 4/
    if (/[\+\-\*\/\.]$/.test(display.value)) {
      display.value = "Error";
      return;
    }

    const result = eval(display.value);

    // Prevent invalid results
    if (isNaN(result) || result === Infinity || result === -Infinity) {
      display.value = "Error";
      return;
    }

    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// ====== Keyboard Support ======
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if ((key >= "0" && key <= "9") || "+-*/.".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// ====== Theme Toggle ======
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light");
});


let lastAnswer = 0;

function useAns() {
  appendValue(lastAnswer);
}

function toggleSign() {
  if (display.value.startsWith('-')) {
    display.value = display.value.substring(1);
  } else {
    display.value = '-' + display.value;
  }
}

function calculate() {
  playClick();
  try {
    const result = eval(display.value);
    addToHistory(display.value + " = " + result);
    display.value = result;
    lastAnswer = result; // save last answer
  } catch (error) {
    display.value = "Error";
  }
}
