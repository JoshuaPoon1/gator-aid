document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('.login');
    const signUpBtn = document.querySelector('.signUp');
    const loginModal = document.getElementById('loginModal');
    const signUpModal = document.getElementById('signUpModal');
    const closeButtons = document.querySelectorAll('.auth-close');

    const showModal = (modal) => {
        modal.style.display = 'block';
    };

    const hideModal = (modal) => {
        modal.style.display = 'none';
    };

    loginBtn.addEventListener('click', () => showModal(loginModal));
    signUpBtn.addEventListener('click', () => showModal(signUpModal));

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideModal(loginModal);
            hideModal(signUpModal);
        });
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == loginModal) {
            hideModal(loginModal);
        }
        if (event.target == signUpModal) {
            hideModal(signUpModal);
        }
    };
});



//for mongo.
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('signUpForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                window.location.href = `/welcome.html?username=${encodeURIComponent(data.username)}&courses=${encodeURIComponent(data.courses.join(', '))}`;
            } else {
                console.log(data); // Handle errors or invalid login
            }
        });
    });

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('signUpUsername').value;
        const password = document.getElementById('signUpPassword').value;
        const major = document.getElementById('major').value;
        const year = parseInt(document.getElementById('year').value);
        const currentCourses = document.getElementById('currentCourses').value.split(','); // Assuming courses are comma-separated
        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password, major, year, currentCourses})
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                window.location.href = `/welcome.html?username=${encodeURIComponent(data.username)}&courses=${encodeURIComponent(data.courses.join(', '))}`;
            } else {
                console.log(data); // Handle errors or failed signup
            }
        });
    });
});










/*

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

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize
updateDisplay();

*/
