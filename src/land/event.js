import * as THREE from "three";

const data = [1000, 1001, 1002];

const clear = (gltf) => {
  data.map((item) => {
    gltf.scene.children[item].material = new THREE.MeshBasicMaterial({
      color: "#008000",
    });
  });
};

const event = (gltf, setSelect) => {
  data.map((item, index) => {
    gltf.scene.children[item].cursor = "pointer";
    gltf.scene.children[item].on("click", function (ev) {
      setSelect({ name: ev.data.target.name, size: "", link: "", img: "" });
      console.log(ev);
      clear(gltf);
      gltf.scene.children[item].material = new THREE.MeshBasicMaterial({
        color: "#FF00FF",
      });
    });
  });
};

export default event;
