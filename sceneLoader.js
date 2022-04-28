class SceneLoader{
    constructor(){
        this.gameplayService=null;
        this.gameState="";

        this.sceneGame=new SceneGame();
    }

    load(pGameplayService){
        this.gameplayService=pGameplayService;
    }

    init(pGameState){
        this.gameState=pGameState;
        this.gameplayService.guiManager.totalDelete();

        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){
            this.sceneGame.load(this.gameplayService,this);
        }else if(this.gameState=="gameover"){

        }
    }

    update(dt){

        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){
            this.sceneGame.update(dt);
        }else if(this.gameState=="gameover"){
            
        }

        this.gameplayService.guiManager.update(dt);
    }

    draw(pCtx){
        this.gameplayService.guiManager.draw(pCtx);
        
        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){
            this.sceneGame.draw(pCtx);
        }else if(this.gameState=="gameover"){
            
        }
    }

    keypressed(pKey){

        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){

        }else if(this.gameState=="gameover"){
            
        }
    }

    mousepressed(pBtn,pX,pY){

        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){
            this.sceneGame.mousepressed(pBtn,pX,pY);
        }else if(this.gameState=="gameover"){
            
        }
    }
}