let field;
let xVel = [];
let yVel = [];
let magArray = [];
let magArray2 = [];
const Particle = function(px, py) {
    this.lifetime = 0;
    this.px = px;
    this.py = py;
}
Particle.prototype.update = function() {
    if (this.lifetime < 1) this.lifetime += 0.05;
    let index = floor(this.px) * (windowHeight + 76) + floor(this.py);
    this.px += xVel[index];
    this.py += yVel[index];
    fill(360 - magArray[index] * 360, 75, 90);
    ellipse(this.px - windowWidth / 2 - 38, this.py - windowHeight / 2 - 38, magArray2[index] * 75 * this.lifetime);
}
Particle.prototype.reset = function() {
    return (this.mag <= 0.07 || this.px >= windowWidth + 76 || this.px <= 0 || this.py >= windowHeight + 76 || this.py <= 0);
}

const ParticleSystem = function(n) {
    this.particles = [];
    for (let i = 0; i < n; i++) {
        this.particles[i] = new Particle(Math.random() * windowWidth + 38, Math.random() * windowHeight + 38);
    }
}
ParticleSystem.prototype.update = function() {
    for (let p of this.particles) {
        p.update();
        if (p.reset()) {
            p.px = Math.random() * windowWidth;
            p.py = Math.random() * windowHeight;
            p.lifetime = 0;
        }
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(HSB);
    noStroke();
    field = new ParticleSystem(300);
    for (let i = 0; i < windowWidth + 76; i++) {
        for (let j = 0; j < windowHeight + 76; j++) {
            let index = i * (windowHeight + 76) + j;  
            let angle = 9 * Math.PI * noise(-i * 0.001, j * 0.001);
            let mag = noise(i * 0.01, -j * 0.01);
            xVel[index] = 4 * mag * Math.cos(angle);
            yVel[index] = 4 * mag * Math.sin(angle);
            magArray[index] = mag;
            magArray2[index] = 4 * mag / 10;

        }
    }
}
function draw() {
    background(0, 0, 10);
    field.update();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    for (let i = 0; i < windowWidth + 76; i++) {
        for (let j = 0; j < windowHeight + 76; j++) {
            let index = i * (windowHeight + 76) + j;
            let angle = 9 * Math.PI * noise(-i * 0.001, j * 0.001);
            let mag = noise(i * 0.001, -j * 0.001);
            xVel[index] = 4 * mag * Math.cos(angle);
            yVel[index] = 4 * mag * Math.sin(angle);
            magArray[index] = mag;
            magArray2[index] = 4 * mag / 10;

        }
    }
}
