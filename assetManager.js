class ImageLoader{
    constructor(){
        this.lstPaths=[];
    }

    add(pPath){
        this.lstPaths.push(pPath);
    }
}

class SoundLoader{
    constructor(){
        this.lstPaths=[];
    }

    add(pPath){
        this.lstPaths.push(pPath);
    }
}


class AssetManager{
    constructor(){
        this.lstImages={};
        this.lstSounds={};

        this.callBack=null;

        this.imageLoader=new ImageLoader();
        this.soundLoader=new SoundLoader();

        this.loadedAssetsCount=0;
    }

    addImage(pPath){
        this.imageLoader.add(pPath);
    }

    getImage(pPath){
        return this.lstImages[pPath];
    }

    addSound(pPath){
        this.soundLoader.add(pPath);
    }

    getSound(pPath){
        return this.lstSounds[pPath];
    }

    start(pCallBack){
        this.callBack=pCallBack;

        this.imageLoader.lstPaths.forEach(path=>{
            let img=new Image();
            img.src=path;

            img.onload=this.assetLoaded.bind(this);

            this.lstImages[path]=img;
        });

        this.soundLoader.lstPaths.forEach(path=>{
            let sound=new Audio();
            sound.src=path;

            this.lstSounds[path]=sound;
            this.assetLoaded();
        });
    }

    assetLoaded(){
        this.loadedAssetsCount++;

        if(this.loadedAssetsCount==(this.imageLoader.lstPaths.length+this.soundLoader.lstPaths.length)){
            console.log("assets chargés!!");
            this.callBack();
        }
    }

}