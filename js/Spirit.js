/**
 * Created by Zane Wang on 2016/12/2.
 */
import Point from './Point';
import map from './Map';

function detect(arr, val){
    return arr.some(function(v){
        return val.match(v);
    });
}
const devices = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone", "mobile"];
const agent = navigator.userAgent.toLowerCase();
const isMobile = detect(devices, agent);
let lastRoundX = -1;
let lastRoundY = -1;

export default class Spirit extends Point {
    constructor(options){
        super(options);
        if(options){
            this.enemies = options.enemies;
        }
        if(lastRoundX != -1){
            this.touchStartX = lastRoundX;
        }
        if(lastRoundY != -1){
            this.touchStartY = lastRoundY;
        }
        this.dead = false;
        this.bind();
    }

    bind(){
        if(isMobile){
            window.addEventListener('touchstart', e => {
                e.preventDefault();
                if(!this.dead){
                    lastRoundX = e.touches[0].pageX;
                    lastRoundY = e.touches[0].pageY;
                    this.touchStartX = e.touches[0].pageX;
                    this.touchStartY = e.touches[0].pageY;
                }
            });
            window.addEventListener('touchmove', e => {
                e.preventDefault();
                if(!this.dead){
                    let moveX = e.touches[0].pageX - this.touchStartX;
                    let moveY = e.touches[0].pageY - this.touchStartY;
                    this.moveTo(this.x + moveX, this.y + moveY);
                    this.touchStartX = e.touches[0].pageX;
                    this.touchStartY = e.touches[0].pageY;
                }
            });
        }else{
            //TODO: Coordinate transformation
            window.addEventListener('mousemove', e => {
                this.moveTo(e.clientX, e.clientY);
            })
        }
    }
}