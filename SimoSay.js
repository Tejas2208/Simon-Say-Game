let gameSeq = [];
let userSeq = [];

let btns = ["red","yellow","green","purple"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(start == false){
        console.log("Started");
        start = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
    btn.classList.remove("flash")
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash")
    setTimeout(function(){
    btn.classList.remove("userFlash")
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    //random button choose
    gameFlash(randBtn);
}

let highScore = 0;
const highScoreDisplay = document.getElementById("highScoreDisplay");
if (localStorage.getItem("Simon_High_Score")) {
    highScore = parseInt(localStorage.getItem("Simon_High_Score"));
    highScoreDisplay,innerText = `High Score: ${highScore}`;
}


function checkAns(idx){
    // // console.log("current level",level);
    // let idx = level-1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,300);
        }
    } else{
        if(level > highScore) {
            highScore = level;
            localStorage.setItem("Simon_High_Score",highScore);
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to try again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white";            
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

   let userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click",btnPress);
}


function reset() {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

document.querySelector("body").style.backgroundImage = "avneet.png";