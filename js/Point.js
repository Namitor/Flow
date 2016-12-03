/**
 * Created by Zane Wang on 2016/12/2.
 */
import map from './Map'

export default class Point{
    constructor(options){
        if(options){
            this.x = options.x || 1;
            this.y = options.y || 1;
            this.radius = options.radius || 10;
            this.color = options.color || "red";
        }
    }

    moveTo(x, y){
        x = x<this.radius?this.radius:x;
        x = x>map.width-this.radius?map.width-this.radius:x;
        y = y<this.radius?this.radius:y;
        y = y>map.height-this.radius?map.height-this.radius:y;
        this.x = x;
        this.y = y;
    }

    render(){
        map.cxt.fillStyle = this.color;
        map.cxt.beginPath();
        map.cxt.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        map.cxt.closePath();
        map.cxt.fill();
    }
}