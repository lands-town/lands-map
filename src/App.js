import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import glb from "./static/map/map-v1.glb";
import texture from "./static/map/map-texture-v1.jpg";
import { Interaction } from "./static/Interaction/src/index.js";
import active from "./land/active";
import axios from "axios";
import handleCLick from "./land/event";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";

const App = () => {
  const webgl = useRef("");
  const [select, setSelect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

    /**
     * Loaders
     */
    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const backed = textureLoader.load(texture);
    backed.flipY = false;
    backed.encoding = THREE.sRGBEncoding;

    // GLTF loader
    const gltfLoader = new GLTFLoader();

    /**
     * Object
     */

    const materilgltf = new THREE.MeshBasicMaterial({ map: backed });

    axios
      .get(`https://api.lands.town/api/v1/map`, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      .then(({ data }) => {
        gltfLoader.load(glb, (gltf) => {
          gltf.scene.traverse((child) => {
            child.material = materilgltf;
          });
          active(gltf, data); //green lands
          handleCLick(gltf, setSelect, data); // select
          scene.add(gltf.scene);
          setIsLoading(false);
        });
      });

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 0;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    controls.maxPolarAngle = Math.PI / 2.3;

    // controls.enablePan = false;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;

    scene.background = new THREE.Color("#13141E");
    const interaction = new Interaction(renderer, scene, camera);

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <Layout select={select}>
      {isLoading && <Spinner />}
      <canvas className="webgl" ref={webgl}></canvas>
    </Layout>
  );
};

export default App;
