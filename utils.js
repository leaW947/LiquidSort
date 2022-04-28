function rnd(pMin,pMax){
    return (Math.random()*(pMax-pMin))+pMin;
}

function getAngle(pX1,pY1,pX2,pY2){
    return Math.atan2((pY2-pY1),(pX2-pX1));
}

function dist(pX1,pY1,pX2,pY2){
    return ((pX2-pX1)^2+(pY2-pY1)^2)^0.5;
}

function checkCollision(pX1,pY1,pW1,pH1,pX2,pY2,pW2,pH2){

    if(pX1+pW1>=pX2 && pX1<=pX2+pW2 && pY1+pH1>=pY2 && pY1<=pY2+pH2){
        return true;
    }

    return false;
}

function drawCircle(pCtx,pX,pY,pRadius,pColorFill,pColorStroke){
    
    pCtx.beginPath();
    pCtx.fillStyle="rgb("+pColorFill+")";
    pCtx.strokeStyle="rgb("+pColorStroke+")";
    pCtx.arc(pX,pY,pRadius,0,2*Math.PI);
    pCtx.fill();
    pCtx.stroke();
}

function drawTriangle(pCtx,pX,pY,pX2,pY2,pX3,pY3,pColor){
    
    pCtx.beginPath();
    pCtx.fillStyle="rgba("+pColor+")";
    pCtx.moveTo(pX,pY);
    pCtx.lineTo(pX2,pY2);
    pCtx.lineTo(pX3,pY3);
    pCtx.fill();
}


function easeOutSine(t,b,c,d){
    return c*Math.sin(t/d*(Math.PI/2))+b;
}