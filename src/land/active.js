import * as THREE from "three";

const data = [1000, 1001, 1002];

const active = (gltf) => {
  data.map((item) => {
    gltf.scene.children[item].material = new THREE.MeshBasicMaterial({
      color: "#008000",
    });
  });
};

export default active;
