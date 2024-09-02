let particles=[];

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(225);
    noStroke();
    colorMode(HSB,360, 100,100);

    for(let i=0; i<1000;i++){
        let x=random(width);
        let y=random(height);
        let radius=random(1,5);
        let velocityX=random(-1,1);
        let velocityY=random(-1,1);
        let hue=random(360);
        particles.push(new Particle(x,y,radius,velocityX,velocityY,hue));
    }
}

function draw(){
    background(255,255,255,50);
    for(let i=0;i<particles.length;i++){
        particles[i].update();
        particles[i].display();
    }
}

class Particle{
    constructor(x,y,radius,velocityX,velocityY,hue){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.velocityX=velocityX;
        this.velocityY=velocityY;
        this.hue=hue;
        this.lifespan=100;
    }

    update(){
        this.x+=this.velocityX;
        this.y+=this.velocityY;
        this.lifespan-=1;

        if(this.x>width||this.x<0){
            this.velocityX*=-1;
        }
        if(this.y>height||this.y<0){
            this.velocityY*=-1;
    }

    if(this.lifespan<0){
        this.x=random(width);
        this.y=random(height);
        this.lifespan=90;
    }
}

display(){
    fill(this.hue,100,100);
    ellipse(this.x,this.y,this.radius*2);
}}