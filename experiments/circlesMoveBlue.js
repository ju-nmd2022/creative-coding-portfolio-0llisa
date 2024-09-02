let numCircles=500;
let circles=[];

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(0);
    noStroke();
    colorMode(HSB,360,100,100);

    for (let i=0;i<numCircles;i++){
        let x=random(width);
        let y=random(height);
        let radius=random(10,50);
        let variation=random(-10,10);
        let speed=random(0.05,0.09);
        let hue=random(150,250);
        circles.push(new Circle(x,y,radius,variation,speed,hue));
    }
}

function draw(){
    background(0,0,0,0.1);

    for(let i=0;i<circles.length;i++){
        circles[i].update();
        circles[i].display();

        for(let j=0;j<random(1,5);j++){
            let dotX=circles[i].x+random(-circles[i].radius,circles[i].radius);
            let dotY=circles[i].y+random(-circles[i].radius, circles[i].radius);
            let dotSize=random(1,5);
            fill(circles[i].hue,100,100);
            ellipse(dotX,dotY,dotSize,dotSize);
        }
    }
}

class Circle{
    constructor(x,y,radius,variation,speed,hue){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.variation=variation;
        this.angle=0;
        this.speed=speed;
        this.hue=hue;
    }

    update(){
        this.angle+=this.speed;
        this.radius+=this.variation*sin(this.angle);
        this.radius=constrain(this.radius,10,100);
        this.x+=sin(this.angle)*2;
        this.y+=cos(this.angle)*2;


        if(this.x>width||this.x<0){
            this.x=constrain(this.x,0,width);
            this.speed*=-1;
        }

        if(this.y>height||this.y<0){
            this.y=constrain(this.y,0,height); 
            this.speed*=-1;
        }
    }
    
    display(){
        fill(this.hue,100,100);
        ellipse(this.x,this.y,this.radius*2);
    }
}