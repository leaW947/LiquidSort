class SceneGame{
    constructor(){
        this.gameplayService=null;
        this.sceneLoader=null;

        this.bottleManager=null;
        this.particleEmitter=null;

        this.nbBottleCount=0;

        this.timerSpeed=10;
        this.timer=this.timerSpeed;

        this.txtLevel=null;
        this.nbLevel=0;
    }

    initGame(pNbBottle){
        this.timer=this.timerSpeed;

        if(pNbBottle<=3){
            this.gameplayService.nbBottleToFill=pNbBottle-1;
        }else{
            this.gameplayService.nbBottleToFill=pNbBottle-2;
        }
        
        this.bottleManager=new BottleManager(this.gameplayService);
        this.bottleManager.addBottle(pNbBottle);

        this.nbBottleCount=pNbBottle;

        this.particleEmitter=new ParticleEmitter(0,0);
        this.gameplayService.setParticleEmitter(this.particleEmitter);

    }

    load(pGameplayService,pSceneLoader){
        this.gameplayService=pGameplayService;
        this.sceneLoader=pSceneLoader;

        this.initGame(3);

        this.nbLevel=1;
        this.txtLevel=this.gameplayService.guiManager.createText((this.gameplayService.canvas.width/2)-60,60,
        "Level 0","50px Montana","80,80,80");
    }

    update(dt){
        this.txtLevel.text="Level "+this.nbLevel;

        if(this.gameplayService.nbBottleToFill<=0){

            this.timer-=0.1;

            if(this.timer<=0){
                this.timer=this.timerSpeed;
                this.nbLevel+=1;

                //////new level///////
                if(this.nbBottleCount==3){
                    this.initGame(5);

                }else{

                    if(this.nbBottleCount<8){
                        this.initGame(this.nbBottleCount+1);
                    }else{
                        this.initGame(this.nbBottleCount);
                    }
            
                }

            }
           
        }

        this.gameplayService.particleEmitter.update(dt);
        this.bottleManager.update(dt);
    }

    draw(pCtx){
        this.bottleManager.draw(pCtx);
        this.gameplayService.particleEmitter.draw(pCtx);
    }

    mousepressed(pBtn,pX,pY){
        this.bottleManager.mousepressed(pBtn,pX,pY);
    }
}