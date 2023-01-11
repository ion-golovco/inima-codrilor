import * as THREE from "./libs/three.js";
import { SVGLoader } from "./libs/SVGloader.js";
import { scene } from "./Scene.js";

function loadSVG(url, z) {
  const scale = 0.03;
  const loader = new SVGLoader();
  loader.load(url, function (data) {
    const paths = data.paths;
    const group = new THREE.Group();
    group.scale.multiplyScalar(scale);
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
    group.position.x = -683 * scale;
    group.position.y = 384 * scale;
    group.position.z = -z;
    scene.add(group);
  });
}

export default loadSVG;
