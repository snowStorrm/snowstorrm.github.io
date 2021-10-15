
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {

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
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}
class inQuark {
    constructor(origin, size) {
        this.pos = origin;
        this.vel = createVector();
        this.size = size;
    }
}