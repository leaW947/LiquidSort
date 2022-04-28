
/////////////////////////////////////CLASS PROGRESS BAR//////////////////////////
class ProgressBar{
    constructor(pX,pY,pMaxValue){
        this.x=pX;
        this.y=pY;

        this.imgProgress=null;
        this.imgBar=null;

        this.maxValue=pMaxValue;
        this.value=0;

        this.type="progressBar";

        this.ratio=0;
    }

    addImages(pImgProgress,pImgBar){
        this.imgProgress=pImgProgress;
        this.imgBar=pImgBar;
    }

    update(dt){
        this.ratio=this.value/this.maxValue;
    }

    draw(pCtx){

        if(this.imgBar!=null && this.imgProgress!=null){
            pCtx.drawImage(this.imgBar,this.x,this.y);
            pCtx.drawImage(this.imgProgress,this.x,this.y,this.imgProgress.width*this.ratio,this.imgProgress.height);
        }
    }
}


///////////////////////////////////CLASS CHECK BOX////////////////////
class CheckBox{
    constructor(pX,pY){
        this.x=pX;
        this.y=pY;

        this.bIsActive=false;
        this.type="checkBox";

        this.imgActive=null;
        this.imgNoActive=null;
    }

    addImages(pImgNoActive,pImgActive){
        this.imgActive=pImgActive;
        this.imgNoActive=pImgNoActive;
    }

    draw(pCtx){
        
        if(this.bIsActive && this.imgActive!=null){
            pCtx.drawImage(this.imgActive,this.x,this.y);
        }else{

            if(this.imgNoActive!=null){
                pCtx.drawImage(this.imgNoActive,this.x,this.y);
            }
         
        }

    }

    mousepressed(pBtn,pX,pY){

        if(pBtn==0){

            if(pX>=this.x && pX<=this.x+this.imgNormal.width){
                if(pX>=this.y && pY<=this.y+this.imgNormal.height){
                    this.bIsActive=true;

                }else{
                    this.bIsActive=false;
                }

            }else{
                this.bIsActive=false;
            }

        }
    }
}




////////////////////////CLASS BUTTON/////////////////////////////////////////
class Button{

    constructor(pX,pY){
        this.x=pX;
        this.y=pY;

        this.bIsHover=false;
        this.bIsPressed=false;

        this.type="button";

        this.imgNormal=null;
        this.imgPressed=null;
        this.imgHover=null;
    }

    addImages(pImgNormal,pImgHover,pImgPressed){
        this.imgNormal=pImgNormal;
        this.imgHover=pImgHover;
        this.imgPressed=pImgPressed;
    }

    update(dt){
    }

    draw(pCtx){

        if(!this.bIsHover && !this.bIsPressed && this.imgNormal!=null){
            pCtx.drawImage(this.imgNormal,this.x,this.y);

        }else if(!this.bIsPressed && this.bIsHover && this.imgHover!=null){
            pCtx.drawImage(this.imgHover,this.x,this.y);

        }else if(!this.bIsHover && this.bIsPressed && this.imgPressed!=null){
            pCtx.drawImage(this.imgPressed,this.x,this.y);
        }

    }

    mousemove(pX,pY){
    
        if(pX>=this.x && pX<=this.x+this.imgNormal.width){
            if(pX>=this.y && pY<=this.y+this.imgNormal.height){

                if(!this.bIsPressed){
                    this.bIsHover=true;
                    this.pressed=false;
                }
            
            
            }else{
                this.bIsHover=false;
            }

        }else{
            this.bIsHover=false;
        }
    }

    mousepressed(pBtn,pX,pY){

        if(pBtn==0){
            
            if(pX>=this.x && pX<=this.x+this.imgNormal.width){
                if(pX>=this.y && pY<=this.y+this.imgNormal.height){

                    this.bIsPressed=true;
                    this.bIsHover=false;

                }else{
                    this.bIsPressed=false;
                }

            }else{
                this.bIsPressed=false;
            }

        }

    }
}




////////////////////////////CLASS TEXT///////////////////////////////////////
class Text{
    
    constructor(pX,pY,pText,pFont,pColor){
        this.x=pX;
        this.y=pY;

        this.text=pText;
        this.type="text";

        this.color=pColor;

        this.font=pFont;
    }


    draw(pCtx){
        pCtx.font=this.font;
        pCtx.fillStyle="rgb("+this.color+")";
        pCtx.fillText(this.text,this.x,this.y);
    }
}



/////////////////////////////////////CLASS GUI MANAGER/////////////////////////////////////////
class GUIManager{
    
    constructor(){
        this.lstGui=[];
    }

    createButton(pX,pY){
        let button=new Button(pX,pY);
        this.lstGui.push(button);

        return button;
    }

    createText(pX,pY,pText,pFont,pColor){
        let text=new Text(pX,pY,pText,pFont,pColor);

        this.lstGui.push(text);

        return text;
    }

    createCheckBox(pX,pY){
        let checkBox=new CheckBox();
        this.lstGui.push(checkBox);

        return checkBox;
    }

    createProgressBar(pX,pY,pMaxValue){
        let progressBar=new ProgressBar(pX,pY,pMaxValue);
        this.lstGui.push(progressBar);

        return progressBar;
    }

    update(dt){

        this.lstGui.forEach(gui=>{
            if(gui.type=="progressBar"){
                gui.update(dt);
            }
        });

    }

    totalDelete(){
        this.lstGui=[];
    }

    draw(pCtx){

        this.lstGui.forEach(gui=>{
            gui.draw(pCtx);
        });
    }

    mousemove(pX,pY){
        
        this.lstGui.forEach(gui=>{
            
            if(gui.type=="button"){
                gui.mousemove(pX,pY);
            }
        });
    }

    mousepressed(pBtn,pX,pY){
        
        this.lstGui.forEach(gui=>{

            if(gui.type=="button" && gui.type=="checkBox"){
                gui.mousepressed(pX,pY);
            }

        });
    }

}