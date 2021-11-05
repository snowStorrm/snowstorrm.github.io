
let quarks = [];
function setup() {
    colorMode(HSB, 255);
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
    quarks.push(new outQuark(createVector(random(width), height), 10));
}

class outQuark {
    constructor(origin, size) {
        this.pos = origin;
        this.vel = createVector();
        this.acc = createVector();
        this.vis = 255;
        this.size = size;
    }
    update() {
        this.vis--;
        this.acc.mult(0);
        this.acc = p5.Vector.random2D();
        this.acc.normalize;
        this.acc.mult(deltaTime * 10);
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
    }
    show() {
        stroke(map(this.vis, 0, 255, 60, -235), 255, this.vis);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}