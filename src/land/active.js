import * as THREE from "three";

const active = (gltf, lands, color = "#2cc202") => {
  lands.map(({ child }) => {
    gltf.scene.children[Number(child)].material = new THREE.MeshBasicMaterial({
      color,
    });
  });
};

export default active;