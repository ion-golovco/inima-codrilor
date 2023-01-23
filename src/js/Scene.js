import * as THREE from "./libs/three.js";

import loadSVG from "./LoadSVG.js";

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
let mouse = new THREE.Vector2();

let animationScripts = [];
let scrollPercent = 0;

const colors = [new THREE.Color(0xffffff), new THREE.Color(0xffe799)];
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: colors[1] });
const cube = new THREE.Mesh(geometry, material);


for(let i = 0;i<4;i++){
  loadSVG(`./assets/layer${i}.svg`,20+8*i);
}


initial();
function initial() {
  camera.position.z = 0;
  //scene.add(cube);
  scene.background = colors[0];

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
}

const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

function animate() {
  requestAnimationFrame(animate);
  playScrollAnimations();
  cameraMovement()
  render();
  cube.rotation.y += 0.01;
}

function render() {
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

function cameraMovement() {
  let z = -scrollPercent*2;
  //camera.rotation.x = mouse.y / 24;
  //camera.rotation.y = -mouse.x / 12;
  
  camera.position.z = z;
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
document.body.onscroll = () => {
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) *
    100;
};
