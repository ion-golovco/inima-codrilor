let w, h, canvas;

let layers = [];
class Layer {
  constructor(_img) {
    this.pos = createVector();
    this.img = _img;
  }
}

function preload() {
  for (let i = 0; i < 2; i++) {
    layers.push(new Layer(loadSVG(`./layers/layer${i}.svg`)));
  }
}

function setup() {
  h = windowHeight;
  w = windowWidth;
  canvas = createCanvas(w, h, SVG);
  canvas.position(0, 0);
  canvas.style("z-index", "-9999");
  canvas.style("position", "fixed");
}
function windowResized() {
  h = windowHeight;
  w = windowWidth;
  resizeCanvas(windowWidth, windowHeight);
  loop();
}

function draw() {
  clear();
  var r = (frameCount % 200) * Math.sqrt(2);
  background(255);
  image(layers[1].img, 0, 0, w, h);
  image(layers[0].img, 0, 0, w,(frameCount % h));
  
  
}
