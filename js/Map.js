/**
 * Created by Zane Wang on 2016/12/2.
 */
class Map{
    init(options){
        this.canvas = options.canvas;
        this.cxt = this.canvas.getContext("2d");
        this.width = options.width;
        this.height = options.height;
    }

    render(){
        this.cxt.fillStyle = "black";
        this.cxt.fillRect(0,0,this.width,this.height);
    }
}

export default new Map();