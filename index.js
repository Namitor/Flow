/**
 * Created by Zane Wang on 2016/12/2.
 */
import map from './js/Map';
import Spirit from './js/Spirit';
import Enemy from './js/Enemy';

const raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
    };

let spirit;
let enemies = [];
let timer;
let holdingTime = 0;
let bestTime = 0;

const enemyCount = 10;
const pointRadius = 30;
const minSpeed = 10;
const secondsSpeedUp = 5;
const canvas = document.getElementById("mainCanvas");
const cxt = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

map.init({
    canvas:canvas,
    width:canvas.width,
    height:canvas.height
});

function initSpirit(){
    spirit = new Spirit({
        x:map.width/2,
        y:map.height/2,
        radius:pointRadius,
        color:'green',
        enemies:enemies
    });
}

function initEnemies(){
    enemies = [];
    for(let i = 0;i<enemyCount;i++){
        let x = pointRadius + Math.random()*(map.width-2*pointRadius);
        let y = pointRadius + Math.random()*(map.height-2*pointRadius);
        let vx = Math.random()*2-1;
        let vy = Math.random()*2-1;
        let speed = Math.random()*minSpeed+minSpeed;
        enemies.push(new Enemy({
            x:x,
            y:y,
            radius:pointRadius,
            color:"red",
            vx:vx,
            vy:vy,
            speed:speed
        }));
    }
}

function collision(enemy, spirit){
    let diffX = enemy.x - spirit.x;
    let diffY = enemy.y - spirit.y;
    return Math.hypot(diffX, diffY)<enemy.radius+spirit.radius;
}

function renderTimer() {
    cxt.textAlign = 'left';
    cxt.textBaseline = 'top';
    cxt.strokeStyle = 'white';
    cxt.font = 'bold 36px arial';
    cxt.fillStyle = 'white';
    cxt.fillText("Time: "+holdingTime+"  Best: "+bestTime, 5,10);
}
function animate(){
    map.render();
    renderTimer();
    if(spirit.dead){
        reset();
    }
    spirit.render();
    for(let i = 0;i<enemyCount;i++){
        enemies[i].render();
        if(collision(enemies[i], spirit)){
            spirit.dead = true;
        }
    }
    raf(animate);
}

function initTimer() {
    holdingTime = 0;
    clearTimeout(timer);
    let time = function() {
        timer = setTimeout(function() {
            holdingTime++;
            if(bestTime<holdingTime){
                bestTime = holdingTime;
            }
            if (holdingTime % secondsSpeedUp === 0) {
                for (let i = 0; i < enemies.length; i++) {
                    enemies[i].speedUp();
                }
            }
            clearTimeout(timer);
            time();
        }, 1000);
    };
    time();
}
function reset(){
    initEnemies();
    initSpirit();
    initTimer();
}

function start() {
    reset();
    animate();
}

start();