class Particle{
    constructor(pX,pY){
        this.x=pX;
        this.y=pY;

        let angle=rnd(Math.PI,2*Math.PI);

        this.vx=rnd(1,1.5)*Math.cos(angle);
        this.vy=rnd(3,6)*Math.sin(angle);

        this.radius=2;
        this.color="255,255,255";

        this.nbLives=rnd(2,5);
        this.maxLives=this.nbLives;

        this.coef=0;

    }

    update(dt){
        this.x+=this.vx*60*dt;
        this.y+=this.vy*60*dt;

        this.vy*=1;

        this.nbLives-=0.1;
    }

    draw(pCtx){
        drawCircle(pCtx,this.x,this.y,this.radius,this.color,this.color);
    }
}


class ParticleEmitter{
    constructor(pX,pY){
        this.lstParticle=[];

        this.x=pX;
        this.y=pY;
    }

    addParticle(pNbParticle){

        for(let i=0;i<pNbParticle;i++){
            let particle=new Particle(rnd(this.x-5,this.x+5),rnd(this.y-5,this.y+5));

            particle.color=rnd(0,255)+","+rnd(0,255)+","+rnd(0,255);

            this.lstParticle.push(particle);
        }
    }

    update(dt){

        for(let i=this.lstParticle.length-1;i>=0;i--){
            let particle=this.lstParticle[i];

            particle.update(dt);

            if(particle.nbLives<=0){
                this.lstParticle.splice(i,1);
            }
        }
    }

    draw(pCtx){

        this.lstParticle.forEach(particle=>{
            particle.draw(pCtx);
        });

    }
}