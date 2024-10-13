let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const timeDisplay = document.getElementById('timeDisplay');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return (
        (hours ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        milliseconds
    );
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 100);
    toggleButtons('start');
}

function pause() {
    clearInterval(timerInterval);
    toggleButtons('pause');
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00";
    laps = [];
    lapsList.innerHTML = '';
    toggleButtons('reset');
}

function lap() {
    const lapTime = formatTime(elapsedTime);
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(li);
}

function toggleButtons(action) {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    if (action === 'start') {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    } else if (action === 'pause') {
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    } else {
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

// Initialize buttons
toggleButtons('reset');
