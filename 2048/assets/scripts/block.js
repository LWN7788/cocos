import colors from 'colors'

cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel:cc.Label
    },

    start () {

    },

    setNumber(number){
        if(number==0){
            this.numberLabel.active=false;
        }
        this.numberLabel.string=number;
        this.node.color=colors[number];
    }
});
