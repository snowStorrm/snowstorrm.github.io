
let quarks = [];
function setup() {
    colorMode(HSB, 255);
    let canvas = createCanvas(windowWidth * 0.5, windowHeight);
    canvas.position(windowWidth * 0.25, 0);
}
function windowResized() {
    let canvas = resizeCanvas(windowWidth * 0.5, windowHeight);
    canvas.position(windowWidth * 0.25, 0);
}
function draw() {
    background(228, 19, 18);
    for (let i of quarks) {
        i.update();
        if (i.vis >= 255) {
            let index = quarks.indexOf(i);
            quarks.splice(index, 1);
            continue;
        }
        i.show();
    }
}
function mousePressed() {
    quarks.push(new outQuark(createVector(random(width), height), 10, 0));
}

class outQuark {
    constructor(origin, size) {
        this.pos = origin;
        this.vel = createVector();
        this.acc = createVector();
        this.vis = 0;
        this.size = size;
    }
    update() {
        this.vis += (deltaTime / 200) * 10;
        this.acc.mult(0);
        this.acc = p5.Vector.random2D();
        this.acc.normalize;
        this.acc.mult((deltaTime / 300) * 10);
        this.vel.add(this.acc);
        this.vel.y = constrain(this.vel.y, -2, 0);
        this.vel.x = constrain(this.vel.x, -1, 1);
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, 0, width);
    }
    show() {
        stroke(map(this.vis, 0, 255, -235, 60), 255, 255 - this.vis, 255 - this.vis);
        fill(map(this.vis, 0, 255, -235, 60), 255, 255 - this.vis, 255 - this.vis);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}