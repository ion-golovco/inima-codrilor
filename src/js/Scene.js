import * as THREE from "./libs/three.js";
import loadSVG from "./LoadSVG.js";

//setup la canvas
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//adăugam antialias pentru un look mai clean
const renderer = new THREE.WebGLRenderer({ antialias: true });

let animationScripts = [];
let scrollPercent = 0;

const colors = [new THREE.Color(0xE9F2DC), new THREE.Color(0x98C05E)];

//creăm cortina pe care stă textul principal de pe canvas
let geometry = new THREE.PlaneGeometry( 250, 250 );
let material = new THREE.MeshBasicMaterial( {color: colors[1], transparent:true} );
const cortina = new THREE.Mesh( geometry, material );
cortina.position.z = -10
cortina.rotation.z = Math.PI / 2

for (let i = 0; i < 4; i++) {
  loadSVG(`./assets/layer${i}.svg`, 12 + 8 * i, -0.75*i);
}

initial();
function initial() {
  
  scene.add( cortina );
  scene.background = colors[0];

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
}

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  playScrollAnimations();
  renderer.render(scene, camera);
}
animate();

function lerp(x, y, a) {
  return (1 - a) * x + a * y;
}
function scalePercent(start, end) {
  return (scrollPercent - start) / (end - start);
}

function playScrollAnimations() {
  animationScripts.forEach((a) => {
    if (scrollPercent >= a.start && scrollPercent < a.end) {
      a.func();
    }
  });
}
animationScripts.push({
  start: 0,
  end: 1,
  func: () => {
    camera.position.y = lerp(0, -5, scalePercent(0, 1));
  },
});
animationScripts.push({
  start: 1,
  end: 20,
  func: () => {
    cortina.material.opacity = lerp(1, 0, scalePercent(1, 20));; 
    camera.position.y = lerp(-5, 0, scalePercent(1, 20));
  },
});
animationScripts.push({
  start: 1,
  end: 50,
  func: () => {
    camera.position.z = lerp(0, -50, scalePercent(10,60));
  },
});

const resizeUpdateInterval = 300;
let timesRezized = 0
function onWindowResize() {
  setTimeout(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    if (camera.aspect > 0.6 || timesRezized == 0) {
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      timesRezized++
    }
  }, resizeUpdateInterval);
}
document.body.onscroll = () => {
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) *
    100;
};
