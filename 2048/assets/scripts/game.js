const numbers=[2,4];
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Label,
        score:0,
        blockPrefab:cc.Prefab,
        gap:20,
        bg:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.drawBgBlocks();
        this.init();
        this.addEventHandler();
    },

    drawBgBlocks(){
        this.blockSize=(cc.winSize.width-this.gap*5)/4;
        let x=this.gap+this.blockSize/2;
        let y=this.blockSize;
        this.positions=[];
        for(let i=0;i<4;i++){
            this.positions.push([0,0,0,0])
            for(let j=0;j<4;j++){
                let block=cc.instantiate(this.blockPrefab);
                block.width=this.blockSize;     
                block.height=this.blockSize; 
                this.bg.addChild(block);
                block.setPosition(x,y);
                this.positions[i][j]={x,y}
                x+=this.gap+this.blockSize
                block.getComponent('block').setNumber(0);
            }
            y+=this.gap+this.blockSize
            x=this.gap+this.blockSize/2;
        }
    },
    init(){
       this.updateScore(0); 
       if(this.blocks){
           for(let i=0;i<this.blocks.length;i++){
               for(let j=0;j<this.blocks[i].length;j++){
                   if(this.blocks[i][j]!=null){
                       this.blocks[i][j].destroy();
                   }
               }
           }
       }
       this.data=[];
       this.blocks=[];
       for(let i=0;i<4;i++){
           this.blocks.push([null,null,null,null])
           this.data.push([0,0,0,0])
       }
       this.addBlock();
       this.addBlock();
       this.addBlock();
    },
    updateScore(number){
        this.score=number;
        this.scoreLabel.string="分数:+number";
    },
    getEmptyLocations(){
        let locations=[];
        for(let i=0;i<this.blocks.length;i++){
            for(let j=0;j<this.blocks[i].length;j++){
                if(this.blocks[i][j]==null){
                    locations.push({x:i,y:j})
                }
            }
        }
        return locations;
    },
    addBlock(){
        let locations=this.getEmptyLocations();
        if(locations.length==0) return false;
        let location=locations[Math.floor(Math.random() *locations.length)];
        let x=location.x;
        let y=location.y;
        let positions=this.positions[x][y];
        let block=cc.instantiate(this.blockPrefab);
        block.width=this.blockSize;     
        block.height=this.blockSize; 
        this.bg.addChild(block);
        block.setPosition(positions);
        let number=numbers[Math.floor(Math.random() *numbers.length)];
        block.getComponent('block').setNumber(number);
        this.blocks[x][y]=block;
        this.data[x][y]=number;
        return true;
    },
    addEventHandler(){
        this.bg.on('touchstart',(event)=>{
            this.startPoint=event.getLocation();
        })
        this.bg.on('touchend',(event)=>{
            this.endPoint=event.getLocation();
            cc.log(this.endPoint)
            let vec=this.endPoint.sub(this.startPoint);
            cc.log(vec)
            cc.log(vec.len())
            if(vec.len()>50){
                if(Math.abs(vec.x)>Math.abs(vec.y)){
                    if(vec.x>0){
                        this.moveRight();
                    }else{
                        this.moveLeft();
                    }
                }else{
                    if(vec.y>0){
                        this.moveUp();
                    }else{
                        this.moveDown();
                    }
                }
            }
        })
    },
    moveRight(){
        cc.log('moveRight')
    },
    moveLeft(){
        cc.log('moveLeft')
    },
    moveUp(){
        cc.log('moveUp')
    },
    moveDown(){
        cc.log('moveDown')
    }
});
