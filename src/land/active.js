import * as THREE from "three";

const active = (gltf, lands) => {
  lands.map(({ child }) => {
    gltf.scene.children[Number(child)].material = new THREE.MeshBasicMaterial({
      color: "#2cc202",
    });
  });
};

export default active;
