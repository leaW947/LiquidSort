let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");

let lastUpdate=0;

function init(){
    ctx.imageSmoothingEnabled=false;
    ctx.mozImageSmoothingEnabled=false;
    ctx.msImageSmoothingEnabled=false;
    ctx.webkitImageSmoothingEnabled=false;

    load();

    requestAnimationFrame(run);
}

function run(time){
    let dt=(time-lastUpdate)/1000;
    lastUpdate=time;

    update(dt);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw(ctx);


    requestAnimationFrame(run);
}

init();