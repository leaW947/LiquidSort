let gameplayService=new GameplayService();
let sceneLoader=new SceneLoader();
let assetManager=new AssetManager();
let guiManager=new GUIManager();


let bGameReady=false;


function keyDown(t){
    t.preventDefault();
    sceneLoader.keypressed(t.code);
}

function mouseDown(e){
    sceneLoader.mousepressed(e.button,e.offsetX,e.offsetY);
}

function load(){
    document.addEventListener("keydown",keyDown,false);
    document.addEventListener("mousedown",mouseDown,false);
    
    //add images and sounds
    assetManager.addImage("images/bottleNormal.png");
    assetManager.addImage("images/bottleSelect.png");
    assetManager.addImage("images/bottleComplete.png");
    assetManager.addImage("images/transferBottle.png");
    assetManager.addImage("images/transferBottleMirror.png");
    assetManager.addImage("images/bottleSelectTarget.png");

    assetManager.addSound("sounds/ogg/sf_ecoulement_eau_goutiere_01.ogg");
    assetManager.addSound("sounds/ogg/FGBS(11).ogg");
    assetManager.addSound("sounds/ogg/FGBS(17).ogg");

    assetManager.start(startGame);
}

function startGame(){

    gameplayService.setCanvas(canvas);
    gameplayService.setAssetManager(assetManager);
    gameplayService.setGuiManager(guiManager);

    sceneLoader.load(gameplayService);
    sceneLoader.init("gameplay");
    
    bGameReady=true;
}

function update(dt){

    if(!bGameReady){
        return;
    }

    sceneLoader.update(dt);
}

function draw(pCtx){
    
    if(!bGameReady){
        return;
    }

    sceneLoader.draw(pCtx);

}