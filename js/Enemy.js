/**
 * Created by Zane Wang on 2016/12/2.
 */
import Point from './Point'
import map from './Map'

export default class Enemy extends Point{
    constructor(options){
        super(options);
        if(options){
            this.vx = options.vx||1;
            this.vy = options.vy||1;
            this.speed = options.speed;
        }
    }

    speedUp(){
        this.speed++;
    }

    render(){
        if(this.x + this.vx*this.speed<this.radius||
            this.x + this.vx*this.speed>map.width-this.radius){
            this.vx *= -1;
        }
        if(this.y+this.vy*this.speed<this.radius||
        this.y+this.vy*this.speed>map.height-this.radius){
            this.vy *= -1;
        }
        this.x = this.x + this.vx*this.speed;
        this.y = this.y + this.vy*this.speed;
        super.render();
    }
}