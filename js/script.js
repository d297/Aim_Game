const start = document.querySelector('.start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timer = document.querySelector('#time'),
      board = document.querySelector('#board'),
      colors = ['linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)', 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)', 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)','radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)']; 
let time = 0;
let score = 0;

start.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')){
        time = +e.target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRandomCircle();
    }
})


function startGame(){    
    setInterval(decreaseTime,1000);
    createRandomCircle();
    setTimeout(time);
};

function decreaseTime(){
    if(time === 0){
        finishGame();
    } else {
        let current = --time;
    if(time < 10){
        current = `0${time}`;
    }
    setTime(current);
    }    
}

function setTime(value){
    timer.innerHTML = `00:${value}`;
}


function finishGame(){
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
    timer.parentNode.classList.add('hide');
}

function createRandomCircle(){
    let circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    let num = getRandomNumber(0, colors.length - 1);
    console.log(num);
    circle.style.background = `${colors[num]}`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);
}