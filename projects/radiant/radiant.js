
let quarks = [];
function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    for (let i of quarks) {
        i.update();
        if (i.vis = 0) {
            let index = quarks.indexOf(i);
            quarks.splice(index, 1);
            continue;
        }
        i.show();
    }
}
function mousePressed() {
    quarks.push(new outQuark(createVector(random(0,width), height), 10));
}

class outQuark {
    constructor(origin, size) {
        this.pos = origin;
        this.vel = createVector();
        this.acc = createVector();
        this.dir = 0;
        this.vis = 255;
        this.size = size;
    }
    update() {
        this.dir = radians(random(0, 180));
        this.acc.setHeading(this.dir);
        this.acc.normalize();
        this.acc.limit(0.2);
        this.acc.mult(deltaTime * 1000);
        this.vel.add(this.acc);
        this.vel.limit(4);
        this.vel.mult(deltaTime * 1000);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    show() {
        stroke(map(this.vis, 0, 255, 60, -235), 255, this.vis);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}