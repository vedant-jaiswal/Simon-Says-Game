let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(!started){
        console.log("Game Started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    highScore = Math.max(level, highScore);
    h2.innerHTML = `Level ${level} <br> Highest Score is : ${highScore}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function checkAns(idx) {
   
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length) setTimeout(levelUp, 1000);
    } else {
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(let bt of allbtns) {
    bt.addEventListener("click", btnPress);
}

function reset(){
        highScore = Math.max(highScore, level);
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br>Highest Score is ${highScore}<br>Press any Key to start`;
        started = false;
        level = 0;
        gameSeq=[];
        console.log("Game Over");
}