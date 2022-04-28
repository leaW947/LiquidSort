class GameplayService{
    
    constructor(){
        this.canvas=null;
        this.assetManager=null;

        this.nbBottleToFill=0;

        this.particleEmitter=null;
        this.guiManager=null;
    }

    setCanvas(pCanvas){
        this.canvas=pCanvas;
    }

    setAssetManager(pAssetManager){
        this.assetManager=pAssetManager;
    }

    setParticleEmitter(pParticleEmitter){
        this.particleEmitter=pParticleEmitter;
    }

    setGuiManager(pGuiManager){
        this.guiManager=pGuiManager;
    }

}