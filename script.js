// Element references
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const minutesElement = document.getElementById('timer-minutes');
const secondsElement = document.getElementById('timer-seconds');
const pomodoroTimer = document.querySelector('.pomodoro-timer');
const modeDisplay = document.querySelector('.mode-display');

// Timer settings
let mode = 'work'; // Different Timers: 'work', 'shortBreak', 'longBreak'
let workSessions = 0;
const workDuration = 25 * 60;
const shortBreakDuration = 5 * 60;
const longBreakDuration = 15 * 60;
let timerTime = workDuration; //initialize timer with work timer
let intervalId = null;

function updateDisplay() {
    const minutes = Math.floor(timerTime / 60);
    const seconds = timerTime % 60;
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

function switchMode(newMode) {
    mode = newMode;
    switch (newMode) {
        case 'work':
            timerTime = workDuration;
            pomodoroTimer.className = 'pomodoro-timer work-mode';
            modeDisplay.textContent = 'Work';
            break;
        case 'shortBreak':
            timerTime = shortBreakDuration;
            pomodoroTimer.className = 'pomodoro-timer short-break-mode';
            modeDisplay.textContent = 'Short Break';
            break;
        case 'longBreak':
            timerTime = longBreakDuration;
            pomodoroTimer.className = 'pomodoro-timer long-break-mode';
            modeDisplay.textContent = 'Long Break';
            break;
    }
    updateDisplay();
}

function completeSession() {
    workSessions++;
    if (workSessions % 4 === 0) {
        switchMode('longBreak');
    } else {
        switchMode('shortBreak');
    }
}

function startTimer() {
    if (intervalId !== null) return; 

    intervalId = setInterval(() => {
        timerTime--;
        updateDisplay();

        if (timerTime === 0) {
            clearInterval(intervalId);
            intervalId = null;
            if (mode === 'work') {
                completeSession();
            } else {
                switchMode('work');
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    workSessions = 0; // Resets counter
    switchMode('work'); // Resets mode to default
}

document.addEventListener('DOMContentLoaded', function() {
    var audioBtn = document.getElementById('audioToggle');
    var myAudio = document.getElementById('myAudio');

    audioBtn.addEventListener('click', function() {
        if (myAudio.paused) {
            myAudio.play();
            audioBtn.textContent = 'Pause Music';
        } else {
            myAudio.pause();
            audioBtn.textContent = 'Play Music';
        }
    });
});

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize
updateDisplay();
