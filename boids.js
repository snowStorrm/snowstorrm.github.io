const maxForce = 0.2;
const maxSpeed = 5;
const boids = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);

    for (let i = 0; i < 150; i++) boids.push(new boid);
}
function draw() {
    background(51, 127.5);
    for (let boid of boids) {
        boid.edge();
        boid.flock(boids);
        boid.update();
        boid.show();
    }
}
class boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(1, 3));
        this.acc = createVector();
        this.sub = random(100, 255);
    }
    edge() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }
    steer(boids) {
        let range = 30;
        let near = 0;
        let avg = createVector();
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < range) {
                avg.add(other.vel);
                near++;
            }
        }
        if (near > 0) {
            avg.div(near);
            avg.setMag(maxSpeed);
            avg.sub(this.vel);
            avg.limit(maxForce);
        }
        return avg;
    }
    separate(boids) {
        let range = 28;
        let near = 0;
        let avg = createVector();
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < range) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.div(d * d);
                avg.add(diff);
                near++;
            }
        }
        if (near > 0) {
            avg.div(near);
            avg.setMag(maxSpeed);
            avg.sub(this.vel);
            avg.limit(maxForce);
        }
        return avg;
    }
    group(boids) {
        let range = 60;
        let near = 0;
        let avg = createVector();
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < range) {
                avg.add(other.pos);
                near++;
            }
        }
        if (near > 0) {
            avg.div(near);
            avg.sub(this.pos);
            avg.setMag(maxSpeed);
            avg.sub(this.vel);
            avg.limit(maxForce);
        }
        return avg;
    }
    flock(boids) {
        let steer = this.steer(boids);
        let separate = this.separate(boids);
        let group = this.group(boids);
        steer.mult(1.5);
        separate.mult(2);
        group.mult(1);
        this.acc.add(steer);
        this.acc.add(separate);
        this.acc.add(group);
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(maxSpeed);
        this.acc.mult(0);
    }
    show() {
        strokeWeight(12);
        stroke(this.sub, this.sub, 255);
        point(this.pos.x, this.pos.y);
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}