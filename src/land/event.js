import * as THREE from "three";

const clear = (gltf, lands) => {
  lands.map(({ child }) => {
    gltf.scene.children[Number(child)].material = new THREE.MeshBasicMaterial({
      color: "#2cc202",
    });
  });
};

const handleCLick = (gltf, setSelect, lands) => {
  lands.map(({ child, name, size, link, image, location }) => {
    gltf.scene.children[Number(child)].cursor = "pointer";
    gltf.scene.children[Number(child)].on("click", function (ev) {
      setSelect({ name, size, link, image, location });
      clear(gltf, lands);
      gltf.scene.children[Number(child)].material = new THREE.MeshBasicMaterial(
        {
          color: "#0164d8",
        }
      );
    });
  });
};

export default handleCLick;
