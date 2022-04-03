const button = document.getElementById('addBar');
const barContainer = document.getElementById('allBars');

const addProgressBar = function() {
    const container = document.createElement('div');
    container.classList.add('bar-container');

    const status = document.createElement('div');
    status.classList.add('status');
    status.style.width = '0%';

    container.appendChild(status);
    barContainer.appendChild(container);

    return status;
}

const maxActive = 3;
const queue = [];
let isRunning = false;

const startProgress = function() {
    const nextStatus = document.querySelector('.status:not(.active)');
    nextStatus.classList.add('active');

    let interval = setInterval(() => {
        let width = parseInt(nextStatus.style.width);

        if (width < 100) {
            width++;
            nextStatus.style.width = `${width}%`;
        } else {
            clearInterval(interval);
            queue.shift();

            isRunning = queue.length >= maxActive;

            if (queue.length >= maxActive) {
                startProgress();
            }
        }
    }, 30);
}

const throttleProgress = function() {
    if (isRunning) {
        return;
    }

    isRunning = queue.length >= maxActive;
    startProgress();
}

button.addEventListener('click', () => {
    queue.push(addProgressBar());
    throttleProgress();
})