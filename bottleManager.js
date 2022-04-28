/////////////////////////////CLASS LIQUID////////////////////////////////
class Liquid{
    constructor(pX,pY,pW,pH,pId){
        this.x=pX;
        this.y=pY;

        this.width=pW;
        this.height=pH;

        this.id=pId;
        this.bOnTransfer=false;

        this.lstColor={
            white:"255,255,255",
            blue:"0,89,222",
            red:"241,0,0",
            yellow:"255,238,0",
            orange:"255,81,10",
            pink:"255,0,119",
            purple:"221,0,255",
            green:"0,237,12"
        };

        this.color="";
    }

    colorChoice(pIdColor){
        let color="";
    
        switch(pIdColor){
            
            case 1:
                color=this.lstColor.blue;
                break;
            
            case 2:
                color=this.lstColor.red;
                break;

            case 3:
                color=this.lstColor.yellow;
                break;

            case 4:
                color=this.lstColor.orange;
                break;

            case 5:
                color=this.lstColor.pink;
                break;

            case 6:
                color=this.lstColor.purple;
                break;

            case 7:
                color=this.lstColor.green;
                break;

            default:
                break;
        }
        
        return color;
    }

    update(dt,pBottleX,pBottleY,pbOnTransfer,pFlipX){
        this.bOnTransfer=pbOnTransfer;

        if(!this.bOnTransfer){
            this.x=pBottleX+3;
            this.y=(pBottleY+(this.id*this.height))+30;

        }else{
            /////////transfer liquid(animation)////////
            if(pFlipX==-1){
                
                this.x=pBottleX+(this.id*this.height)+29;
                this.y=pBottleY+2;

            }else{
                this.x=pBottleX+((4-this.id)*this.height)-36;
                this.y=pBottleY+2;
            }
         
        }
        
    }

    draw(pCtx){

        if(this.color!=this.lstColor.white){
            pCtx.fillStyle="rgb("+this.color+")";

            if(!this.bOnTransfer){
                pCtx.fillRect(this.x,this.y,this.width+1,this.height+1);
            }else{
                pCtx.fillRect(this.x-1,this.y,this.height+1,this.width+1);
            }
           
        }
        
    }
}



////////////////////////////////////////CLASS BOTTLE////////////////////////
class Bottle{
    constructor(pX,pY,pId,pGameplayService){
        this.gameplayService=pGameplayService;

        this.x=pX;
        this.y=pY;

        this.vx=0;
        this.vy=0;

        this.oldX=0;
        this.oldY=0;

        this.initialY=this.y;
        this.initialX=this.x;

        this.flipX=1;

        this.id=pId;

        this.lstLiquid=[];

        this.imgNormal=this.gameplayService.assetManager.getImage("images/bottleNormal.png");
        this.imgSelect=this.gameplayService.assetManager.getImage("images/bottleSelect.png");
        this.imgComplete=this.gameplayService.assetManager.getImage("images/bottleComplete.png");
        this.imgTransfer=this.gameplayService.assetManager.getImage("images/transferBottle.png");
        this.imgTransferMirror=this.gameplayService.assetManager.getImage("images/transferBottleMirror.png");
        this.imgTarget=this.gameplayService.assetManager.getImage("images/bottleSelectTarget.png");

        this.width=this.imgNormal.width;
        this.height=this.imgComplete.height;

        this.bIsFull=false;
        this.bIsSelect=false;
        this.bOnTransfer=false;
        this.bIsTarget=false;

        this.bagColor=[];

        this.tweening={
           time:0,
           duration:0,
           distance:0,
           begin:0,
           type:""
        };
    }


    addLiquid(pEmptyBottleIndex,pEmptyBottleIndex2,pbagColor){
        let liquid=null;
        
        for(let i=4-1;i>=0;i--){
            let liquid=new Liquid(this.x+3,this.y+(i*(this.height/4)),95,41.5,i);
 
            if(this.id!=pEmptyBottleIndex && this.id!=pEmptyBottleIndex2){

                let nBagColor=Math.floor(rnd(0.5,(pbagColor.length-1)+0.5));
                liquid.color=liquid.colorChoice(pbagColor[nBagColor]);

                pbagColor.splice(nBagColor,1);

            }else{
                liquid.color=liquid.lstColor.white;
            }
          
            
            this.lstLiquid[i]=liquid;
        }

    }

    update(dt){
        this.oldX=this.x;
        this.oldY=this.y;

        this.x+=this.vx*60*dt;
        this.y+=this.vy*60*dt;


        ///tweening///
        if(this.tweening.time<this.tweening.duration){

            if(this.tweening.type=="horizontal"){
            
                this.x=easeOutSine(this.tweening.time,this.tweening.begin,
                    this.tweening.distance,this.tweening.duration);
    
            }else if(this.tweening.type=="vertical"){
    
                this.y=easeOutSine(this.tweening.time,this.tweening.begin,
                    this.tweening.distance,this.tweening.duration);
    
            }
    
            this.tweening.time+=0.01;
    
            if(this.tweening.time>=this.tweening.duration){
                this.tweening.time=this.tweening.duration;
            }
    


        }else{

            ///////select bottle/////
            if(this.vy==0 && !this.bOnTransfer){
                if(this.bIsSelect){
                    this.y=this.initialY-50;
                }else{
                    this.y=this.initialY;
                }
            }
        }
        

        for(let i=this.lstLiquid.length-1;i>=0;i--){
            let liquid=this.lstLiquid[i];

            liquid.update(dt,this.x,this.y,this.bOnTransfer,this.flipX);
        }
    }

    draw(pCtx,pColorTransfer){

        ///liquid
        this.lstLiquid.forEach(myLiquid=>{
            myLiquid.draw(pCtx);
        });

        ////img///
        if(!this.bOnTransfer){

            ///////no transfer
            if(!this.bIsFull){

                if(this.bIsTarget){
                    pCtx.drawImage(this.imgTarget,this.x,this.y);
                }else{
                    pCtx.drawImage(this.imgNormal,this.x,this.y);
                }
                
            }else{
                pCtx.drawImage(this.imgComplete,this.x,this.y);
            }
           
            
            if(this.bIsSelect){
                pCtx.drawImage(this.imgSelect,this.x-5,this.y-5);
            }

        }else{

            //transfer///
            if(this.flipX==1){

                ///liquid transfer////
                if(pColorTransfer!="" && pColorTransfer!="255,255,255"){
                    
                    pCtx.fillStyle="rgb("+pColorTransfer+")";
                    pCtx.fillRect(this.x+(this.imgTransfer.width-6),this.y+(this.imgTransfer.height-(this.imgTransfer.height/3)),5,100);
                }

                pCtx.drawImage(this.imgTransfer,this.x,this.y,this.imgTransfer.width,this.imgTransfer.height);

            }else if(this.flipX==-1){

                ///liquid transfer
                if(pColorTransfer!="" && pColorTransfer!="255,255,255"){
                    
                    pCtx.fillStyle="rgb("+pColorTransfer+")";
                    pCtx.fillRect(this.x+2,this.y+(this.imgTransfer.height-(this.imgTransfer.height/3)),5,100);
                }

                pCtx.drawImage(this.imgTransferMirror,this.x,this.y,this.imgTransfer.width,this.imgTransfer.height);
                
            }
         
        }
       
     
    }
}



///////////////////////////////CLASS BOTTLE MANAGER////////////////////////////////////////
class BottleManager{

    constructor(pGameplayService){
        this.gameplayService=pGameplayService;

        this.lstBottle=[];

        this.currentBottle=null;
        this.targetBottle=null;

        this.nbBottle=0;

        this.transfer={
            color:"",
            nbLiquid:0,
            lstLiquidClear:[],
            bIsFinish:false,
            bOnAnimation:false,
            timer:0,
            timerSpeed:2
        };

        this.nbExplore=0;
        this.bagColor=[];

        this.sndTransfer=this.gameplayService.assetManager.getSound("sounds/ogg/sf_ecoulement_eau_goutiere_01.ogg");
        this.sndSelect=this.gameplayService.assetManager.getSound("sounds/ogg/FGBS(11).ogg");
        this.sndBottleComplete=this.gameplayService.assetManager.getSound("sounds/ogg/FGBS(17).ogg");
    
    }

    initBag(pNbColor){
        this.bagColor=[];

        for(let i=0;i<pNbColor;i++){
            this.bagColor.push(i+1);
            this.bagColor.push(i+1);
            this.bagColor.push(i+1);
            this.bagColor.push(i+1);
        }
    }

    addBottle(pNbBottle){

        let indexBottleEmpty=-1;
        let indexBottleEmpty2=-1;

        let nbColor=0;
        this.nbBottle=pNbBottle;

        ///////////index bottle empty and number color///////
        if(pNbBottle==3){
            
            nbColor=pNbBottle-1;
            indexBottleEmpty=Math.floor(rnd(0.5,(pNbBottle-1)+0.5));

        }else{
            nbColor=pNbBottle-2;
            indexBottleEmpty=Math.floor(rnd(0.5,(pNbBottle-1)+0.5));
            
            if(indexBottleEmpty>0 && indexBottleEmpty<this.nbBottle-1){
                let rndIndex=Math.floor(rnd(1.5,2.5));

                if(rndIndex==1){
                    indexBottleEmpty2=indexBottleEmpty+1;
                }else{
                    indexBottleEmpty2=indexBottleEmpty-1;
                }

            }else if(indexBottleEmpty==0){
                indexBottleEmpty2=indexBottleEmpty+1;

            }else if(indexBottleEmpty==this.nbBottle-1){
                indexBottleEmpty2=indexBottleEmpty-1;
            }

        }

        this.initBag(nbColor);

        ///////////init bottles//////////

        let x=0;
        let y=0;
        
        if(pNbBottle==3){
            x=this.gameplayService.canvas.width/4;
            y=this.gameplayService.canvas.height/3;

        }else{
            x=this.gameplayService.canvas.width/6;
            y=this.gameplayService.canvas.height/5;
        }

        let initialX=x;
        let initialY=y;

        for(let i=0;i<pNbBottle;i++){
            let rndDuration=rnd(0.3,1.5);
            
            let bottle=new Bottle(x,y,i,this.gameplayService);
            bottle.addLiquid(indexBottleEmpty,indexBottleEmpty2,this.bagColor);
            
            if(bottle.x==initialX){
                ////tweening horizontal(direction right)
                bottle.x=0-bottle.width;

                bottle.tweening={
                    time:0,
                    duration:rndDuration,
                    distance:Math.abs(bottle.x)+bottle.initialX,
                    begin:bottle.x,
                    type:"horizontal"
                }

            }else{
                //////////////id for the tweening horizontal(left direction)///
                let id=-1;
                let id2=-1;

                if(this.nbBottle==3){
                    id=2;
                }else{
                    id=3;
                    id2=7;
                }

                if(bottle.id==id || bottle.id==id2){
                    ////tweening horizontal(direction left)
                    bottle.x=this.gameplayService.canvas.width;
    
                    bottle.tweening={
                        time:0,
                        duration:rndDuration,
                        distance:bottle.initialX-Math.abs(bottle.x),
                        begin:bottle.x,
                        type:"horizontal"
                    }
                }
               
            }
            
           

             ////tweening vertical
            if(bottle.tweening.distance==0){

                if(bottle.y==initialY){

                    /////tweening vertical(down direction)
                    bottle.y=0-bottle.height;

                    bottle.tweening={
                        time:0,
                        duration:rndDuration,
                        distance:Math.abs(bottle.y)+bottle.initialY,
                        begin:bottle.y,
                        type:"vertical"
                    }

                }else{

                    /////tweening vertical(up direction)
                    bottle.y=this.gameplayService.canvas.height;

                    bottle.tweening={
                        time:0,
                        duration:rndDuration,
                        distance:bottle.initialY-Math.abs(bottle.y),
                        begin:bottle.y,
                        type:"vertical"
                    }
 
                }

            }
           
            

            this.lstBottle.push(bottle);

            x+=bottle.width*1.5;

            if(x>=this.gameplayService.canvas.width-bottle.width){
                x=initialX;
                y+=bottle.height*1.2;
            }
        }

    }

    exploreBottle(){
        
        this.nbExplore+=1;

        while(this.nbExplore<=this.nbBottle){
            let myBottle=this.lstBottle[this.nbExplore-1];

            if(!myBottle.bIsFull){
    
                if(myBottle.lstLiquid[0].color!="255,255,255"){
    
                    if(myBottle.lstLiquid[0].color==myBottle.lstLiquid[1].color && 
                        myBottle.lstLiquid[1].color==myBottle.lstLiquid[2].color &&
                        myBottle.lstLiquid[2].color==myBottle.lstLiquid[3].color){
    
                        myBottle.bIsFull=true;
                        this.gameplayService.nbBottleToFill-=1;
                        
                        ///animation particle/////
                        this.gameplayService.particleEmitter.x=myBottle.x+(myBottle.width/2);
                        this.gameplayService.particleEmitter.y=myBottle.y;
                     
                        this.gameplayService.particleEmitter.addParticle(150);

                        this.sndBottleComplete.play();
                    }
    
                }
    
            }

            this.exploreBottle();
        }
      
    

    }


    animTransfer(pCurrentBottle,pTargetBottle){
        let currentBottle=pCurrentBottle;
        let targetBottle=pTargetBottle;

        let distance=-1;
        let angle=-1;

        /////calcul angle and calcul distance
        if(currentBottle.x<targetBottle.x){
            currentBottle.flipX=1;

            distance=dist(currentBottle.x+currentBottle.width,currentBottle.y,
                targetBottle.x,targetBottle.y-(targetBottle.height/4));

            angle=getAngle(currentBottle.x+currentBottle.width,currentBottle.y,targetBottle.x,targetBottle.y-(targetBottle.height/4));
        
        }else{
            currentBottle.flipX=-1;

            distance=dist(currentBottle.x,currentBottle.y,targetBottle.x+currentBottle.width,
                targetBottle.y-(targetBottle.height/4));

            angle=getAngle(currentBottle.x,currentBottle.y,targetBottle.x+currentBottle.width,targetBottle.y-(targetBottle.height/4));
        }
    

        /////////move current bottle//////////
    
        if(Math.abs(distance)>10 && !currentBottle.bOnTransfer){

            currentBottle.vy=5*Math.sin(angle); 
            currentBottle.vx=5*Math.cos(angle);

        }else{ 
            
            this.transfer.timer+=0.1;
            
            currentBottle.bIsSelect=false;
            currentBottle.bOnTransfer=true; 

            currentBottle.vx=0;
            currentBottle.vy=0;
            
            ////////flip//////
            if(currentBottle.flipX==-1){
                currentBottle.x=targetBottle.x+(currentBottle.width/2);
            }else{
                currentBottle.x=targetBottle.x-(currentBottle.width*1.5);
            }

            currentBottle.y=targetBottle.y-(targetBottle.height/2);
            this.sndTransfer.play();
            
            if(this.transfer.timer>=this.transfer.timerSpeed){
                this.transfer.timer=0;
                this.transfer.bOnAnimation=false;
            }
            
        }
    }


    transferLiquid(pCurrentBottle,pTargetBottle){

        let currentBottle=pCurrentBottle;
        let targetBottle=pTargetBottle;

        let colorClear="255,255,255";
        
        ///////////////////////////////current bottle/////////////////
        if(this.transfer.lstLiquidClear.length==0){

            ////liquid 0///
            if(currentBottle.lstLiquid[0].color!=colorClear){
                this.transfer.color=currentBottle.lstLiquid[0].color;

                ///liquid 0 and 1
                if(currentBottle.lstLiquid[0].color==currentBottle.lstLiquid[1].color){
                    
                    ///liquid 0,1 and 2
                    if(currentBottle.lstLiquid[1].color==currentBottle.lstLiquid[2].color){

                        this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[0];
                        this.transfer.lstLiquidClear[1]=currentBottle.lstLiquid[1];
                        this.transfer.lstLiquidClear[2]=currentBottle.lstLiquid[2];
                        
                        this.transfer.nbLiquid=3;

                    }else{
                        this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[0];
                        this.transfer.lstLiquidClear[1]=currentBottle.lstLiquid[1];

                        this.transfer.nbLiquid=2;   
                    }
                
                }else{
                    this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[0];
                    this.transfer.nbLiquid=1;
                }
            

            ////liquid 1/////////
            }else if(currentBottle.lstLiquid[1].color!=colorClear){
                this.transfer.color=currentBottle.lstLiquid[1].color;

                ///liquid 1 and 2
                if(currentBottle.lstLiquid[1].color==currentBottle.lstLiquid[2].color){

                    ////liquid 1,2 and 3
                    if(currentBottle.lstLiquid[2].color==currentBottle.lstLiquid[3].color){

                        this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[1];
                        this.transfer.lstLiquidClear[1]=currentBottle.lstLiquid[2];
                        this.transfer.lstLiquidClear[2]=currentBottle.lstLiquid[3];

                        this.transfer.nbLiquid=3;

                    }else{
                        this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[1];
                        this.transfer.lstLiquidClear[1]=currentBottle.lstLiquid[2];
                        
                        this.transfer.nbLiquid=2;
                    }

                }else{
                    this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[1];
                    this.transfer.nbLiquid=1;
                }


            //////liquid 2/////////
            }else if(currentBottle.lstLiquid[2].color!=colorClear){
                this.transfer.color=currentBottle.lstLiquid[2].color;

                if(currentBottle.lstLiquid[2].color==currentBottle.lstLiquid[3].color){
                    
                    this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[2];
                    this.transfer.lstLiquidClear[1]=currentBottle.lstLiquid[3];

                    this.transfer.nbLiquid=2;

                }else{
                    this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[2];
                    this.transfer.nbLiquid=1;
                }

            ////////liquid 3/////////
            }else if(currentBottle.lstLiquid[3].color!=colorClear){
                this.transfer.color=currentBottle.lstLiquid[3].color;
                
                this.transfer.lstLiquidClear[0]=currentBottle.lstLiquid[3];
                this.transfer.nbLiquid=1;


            }else{
                this.transfer.bIsFinish=true;
            }


        
        }else{
    
            //////////////////////////target bottle///////////////

            ////liquid 0
            if(targetBottle.lstLiquid[0].color==colorClear){

                ///liquid 0 and 1
                if(targetBottle.lstLiquid[1].color==colorClear){
                    
                    ///liquid 0,1 and 2
                    if(targetBottle.lstLiquid[2].color==colorClear){
                        
                        ///liquid 1,2 and 3
                        if(targetBottle.lstLiquid[3].color==colorClear){

                            /////animation transfer
                            if(!currentBottle.bOnTransfer){
                                this.transfer.bOnAnimation=true;
                            }


                            ////transfer
                            if(currentBottle.bOnTransfer){
                                
                                targetBottle.lstLiquid[3].color=this.transfer.color;
                                this.transfer.lstLiquidClear[0].color=colorClear;
    
                                if(this.transfer.nbLiquid>=2){
    
                                    targetBottle.lstLiquid[2].color=this.transfer.color;
                                    this.transfer.lstLiquidClear[1].color=colorClear;
    
                                }
                                
                                if(this.transfer.nbLiquid>=3){
    
                                    targetBottle.lstLiquid[1].color=this.transfer.color;
                                    this.transfer.lstLiquidClear[2].color=colorClear;
                                }

                            }
                           
                            
                        }else{

                            ////liquid 0,1 and 2
                            if(targetBottle.lstLiquid[3].color==this.transfer.color){

                                /////animation transfer
                                if(!currentBottle.bOnTransfer){
                                    this.transfer.bOnAnimation=true;
                                }

                                 ////transfer
                                if(currentBottle.bOnTransfer){

                                    targetBottle.lstLiquid[2].color=this.transfer.color;
                                    this.transfer.lstLiquidClear[0].color=colorClear;
        
                                    if(this.transfer.nbLiquid>=2){
                                    
                                        targetBottle.lstLiquid[1].color=this.transfer.color;
                                        this.transfer.lstLiquidClear[1].color=colorClear;
        
                                    }
    
                                    if(this.transfer.nbLiquid>=3){
    
                                        targetBottle.lstLiquid[0].color=this.transfer.color;
                                        this.transfer.lstLiquidClear[2].color=colorClear;
                                    
                                    }

                                }
  
                            }

                        }


                    }else{

                        ////liquid 0 and 1
                        if(targetBottle.lstLiquid[2].color==this.transfer.color){

                            /////animation transfer
                            if(!currentBottle.bOnTransfer){
                                this.transfer.bOnAnimation=true;
                            }

                            ////transfer
                            if(currentBottle.bOnTransfer){

                                targetBottle.lstLiquid[1].color=this.transfer.color;
                                this.transfer.lstLiquidClear[0].color=colorClear;

                                if(this.transfer.nbLiquid>=2){

                                    targetBottle.lstLiquid[0].color=this.transfer.color;
                                    this.transfer.lstLiquidClear[1].color=colorClear;
                                    
                                }

                            }
                        

                        }

                    }

                }else{

                    ////liquid 0
                    if(targetBottle.lstLiquid[1].color==this.transfer.color){
                        
                        ///animation transfer
                        if(!currentBottle.bOnTransfer){
                            this.transfer.bOnAnimation=true;
                        }

                        ///////transfer
                        if(currentBottle.bOnTransfer){
                            targetBottle.lstLiquid[0].color=this.transfer.color;
                            this.transfer.lstLiquidClear[0].color=colorClear;
                        }
                        

                    }

                }
            }


            //////////finish transfer////////
            if(!this.transfer.bOnAnimation){
                this.transfer.bIsFinish=true;
            }
        
        }
    }

    update(dt){

        if(this.currentBottle!=null && this.targetBottle!=null){

            if(this.transfer.bOnAnimation){
                this.animTransfer(this.currentBottle,this.targetBottle);
            }else{
                this.transferLiquid(this.currentBottle,this.targetBottle);
            }
            
        }

        //////////finish transfer///////
        if(this.transfer.bIsFinish){
            this.currentBottle.bOnTransfer=false;   

            this.currentBottle.x=this.currentBottle.initialX;
            this.currentBottle.y=this.currentBottle.initialY;

            this.currentBottle.bIsSelect=false;
            this.targetBottle.bIsTarget=false;

            this.currentBottle=null;
            this.targetBottle=null;

            this.transfer={
                color:"",
                nbLiquid:0,
                lstLiquidClear:[],
                bIsFinish:false,
                bOnAnimation:false,
                timer:0,
                timerSpeed:2
            };
        }

        ////explore bottles/////
        this.exploreBottle();

        if(this.nbExplore>this.nbBottle){
            this.nbExplore=0;
        }


        for(let i=this.lstBottle.length-1;i>=0;i--){
            let myBottle=this.lstBottle[i];

            myBottle.update(dt);
        }

    }


    draw(pCtx){
        
        this.lstBottle.forEach(myBottle=>{

            if(this.currentBottle==null){
                myBottle.draw(pCtx,this.transfer.color);

            }else{
                if(myBottle.id!=this.currentBottle.id){
                    myBottle.draw(pCtx,this.transfer.color);
                }

                this.currentBottle.draw(pCtx,this.transfer.color);
            }
          
        });

    }


    mousepressed(pBtn,pX,pY){

        if(pBtn==0){
            
            this.lstBottle.forEach(myBottle=>{

                if(myBottle.tweening.time==myBottle.tweening.duration){

                    if(pX>=myBottle.x && pX<=myBottle.x+myBottle.width){
                        if(pY>=myBottle.y && pY<=myBottle.y+myBottle.height){
    
                            /////////select current bottle////////
                            if(this.currentBottle==null && this.targetBottle==null){
    
                                if(!myBottle.bIsFull){
                                    myBottle.bIsSelect=true;
                                    this.currentBottle=myBottle;
    
                                    this.sndSelect.play();
                                }
    
                            }else if(this.currentBottle!=null && this.targetBottle==null){
    
                                ///////////select target bottle////////
                                if(this.currentBottle.id!=myBottle.id){
    
                                    if(!myBottle.bIsFull){
                                        myBottle.bIsTarget=true;
                                        this.targetBottle=myBottle;
    
                                        this.sndSelect.play();
    
                                    }else{
                                        this.currentBottle.bIsSelect=false;
                                        this.currentBottle=null;
                                    }
                                    
                                }
    
                            }
    
                        }
                    }

                }

            });

        }

    }

    
}