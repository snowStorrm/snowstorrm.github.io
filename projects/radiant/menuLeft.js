function setup() {
    colorMode(HSB, 255);
    let canvas = createCanvas(windowWidth * 0.25, windowHeight);
    canvas.position(0, 0);
}
function windowResized() {
    let canvas = resizeCanvas(windowWidth * 0.25, windowHeight);
    canvas.position(0, 0);
}