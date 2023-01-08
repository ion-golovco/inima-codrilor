import * as THREE from './libs/three.js'
import { SVGLoader } from './libs/SVGloader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
let mouse = new THREE.Vector2();

const colors = [new THREE.Color(0xffffff), new THREE.Color(0xffe799)];
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: colors[1] });
const cube = new THREE.Mesh(geometry, material);

let c = {
  scrollDist: 5,
  scrollPos: 0,
};

function loadSVG(url) {
  const loader = new SVGLoader();
  loader.load(url, function (data) {
    const paths = data.paths;
    const group = new THREE.Group();
    group.scale.multiplyScalar(0.03);
    group.position.x = -15;
    group.position.y = 15;
    group.scale.y *= -1;
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const fillColor = path.userData.style.fill;
      if (fillColor !== undefined && fillColor !== "none") {
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setStyle(fillColor),
          opacity: path.userData.style.fillOpacity,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const shapes = SVGLoader.createShapes(path);
        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j];

          const geometry = new THREE.ShapeGeometry(shape);
          const mesh = new THREE.Mesh(geometry, material);

          group.add(mesh);
        }
      }
      const strokeColor = path.userData.style.stroke;
      if (strokeColor !== undefined && strokeColor !== "none") {
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setStyle(strokeColor),
          opacity: path.userData.style.strokeOpacity,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        for (let j = 0, jl = path.subPaths.length; j < jl; j++) {
          const subPath = path.subPaths[j];
          const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
          if (geometry) {
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }
      }
    }
    scene.add(group);
  });
}
loadSVG('./assets/layer1.svg')


initial();
function initial() {
  camera.position.z = 5;
  scene.add(cube);
  scene.background = colors[0];

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
}

function animate() {
  requestAnimationFrame(animate);
  scrollUpdate();
  renderer.render(scene, camera);
  cube.rotation.y += 0.01;
}
animate();

function scrollUpdate() {
  window.addEventListener("wheel", onMouseWheel);
  if (c.scrollDist < 18 && c.scrollPos > 0) {
    c.scrollDist += c.scrollPos;
  } else if (c.scrollDist > -1000 && c.scrollPos < 0) {
    c.scrollDist += c.scrollPos;
  }
  c.scrollPos *= 0.93;
  cameraMovement();
}
function cameraMovement() {
  let z = c.scrollDist / 2 + 4;
  camera.rotation.x = mouse.y / 24;
  camera.rotation.y = -mouse.x / 12;

  camera.position.z = z;
}
function onMouseWheel(event) {
  c.scrollPos = -0.001 * event.deltaY;
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
function addScroll() {
  c.scrollDist -= 3;
}
