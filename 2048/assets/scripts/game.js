
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
    },

    drawBgBlocks(){
        this.blockSize=(cc.winSize.width-this.gap*5)/4;
        let x=this.gap+this.blockSize/2;
        let y=this.blockSize;
        let block=cc.instantiate(this.blockPrefab);
        block.width=this.blockSize;     
        block.height=this.blockSize; 
        this.bg.addChild(block);
        block.setPosition(x,y);
        this.getComponent('block').setNumber(0);
    }

   

    // update (dt) {},
});
