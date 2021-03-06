import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import glb from "./static/map/map-v1.glb";
import texture from "./static/map/map-texture-v1.jpg";
import Header from "./components/Header";
import leftClick from "./static/icons/left-click.svg";
import scroll from "./static/icons/scroll.svg";
import rightClick from "./static/icons/right-click.svg";
import { Interaction } from "./static/Interaction/src/index.js";
import BuyDialog from "./components/BuyDialog";
import active from "./land/active";
import axios from "axios";
import handleCLick from "./land/event";

const API = "https://api.lands.town/api/v1/map";

const App = () => {
  const webgl = useRef();
  const [select, setSelect] = useState(null);

  const params = window.location.search;
  const searchParams = new URLSearchParams(params);
  const child = searchParams.get("child");

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

    axios.get(!!child ? `${API}/${child}` : API).then(({ data }) => {
      gltfLoader.load(glb, (gltf) => {
        gltf.scene.traverse((child) => {
          child.material = materilgltf;
        });

        if (!!child) {
          const { name, size, image, link, location } = data;
          active(gltf, [data], "#0164d8");
          setSelect({ name, size, image, link, location, isPreview: true });
          return scene.add(gltf.scene);
        }

        active(gltf, data); //green lands
        handleCLick(gltf, setSelect, data); // select
        return scene.add(gltf.scene);
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
    <>
      <Header />
      <canvas className="webgl" ref={webgl}></canvas>

      <ul className="hint">
        <li>
          <img src={leftClick} />
          Rotate
        </li>
        <li>
          <img src={scroll} />
          Zoom
        </li>
        <li>
          <img src={rightClick} />
          Move
        </li>
      </ul>
      {select && <BuyDialog select={select} />}
    </>
  );
};

export default App;
