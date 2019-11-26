let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');
let colors = ['#33ccff','#ff99cc','#ff99ff','#99ffcc','#cccc00','#ff99ff','#ff9933','#00ccff']
let score = 0;
let isGameStarted = false;

$start.addEventListener('click',startGame);
$game.addEventListener('click',handelBoxClick)
$gameTime.addEventListener('input',setGameTime);


function hide(el){
    el.classList.add('hide');
}

function show(el){
    el.classList.remove('hide');
}

function startGame(){
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled',true)
    show($timeHeader);
    hide($resultHeader);
    isGameStarted = true;
    $start.classList.add('hide');
    $game.style.backgroundColor = '#fff';

    let interval = setInterval(function(){
        let time = parseFloat($time.textContent);
        if(time <=0){
            clearInterval(interval);
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }

    },100)

    renderBox();
}

function setGameTime(){
    show($timeHeader);
    hide($resultHeader);
    let time = parseInt($gameTime.value);
    if(!time){
        $time.textContent = '1.0';        
    }else{
        $time.textContent = time.toFixed(1);
    }
}

function endGame(){
    $gameTime.removeAttribute('disabled')
    isGameStarted = false;
    setGameScore();
    $start.classList.remove('hide');
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    show($resultHeader);
    hide($timeHeader);
}

function setGameScore(){
    $result.textContent = score.toString();
}

function renderBox(){
    $game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(30,100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width =  boxSize + "px";
    box.style.position =  'absolute';
    let colorStop1 = colors[getRandom(0,colors.length)];
    let colorStop2 = colors[getRandom(0,colors.length)];
    box.style.background = `linear-gradient(${colorStop1},${colorStop2})` 
    box.style.top =  getRandom(0,maxTop) + 'px';
    box.style.left =  getRandom(0,maxLeft) + 'px';
    box.style.cursor =  'pointer';
    box.setAttribute('data-box','true');
    
    $game.append(box);

}

function handelBoxClick(event){
    if(!isGameStarted){
        return;
    }

    if(event.target.dataset.box){
        score++;
        renderBox();
        // $game.style.background = colors[getRandom(0,colors.length)];
    }
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min ) + min)
}

