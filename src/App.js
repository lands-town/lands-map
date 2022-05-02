import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

import glb from "./static/map/map-v1.glb";
import texture from "./static/map/map-texture-v1.jpg";

const App = () => {
  const webgl = useRef();

  useEffect(() => {
    /**
     * Base
     */
    // Debug

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

    gltfLoader.load(glb, (gltf) => {
      gltf.scene.traverse((child) => {
        child.material = materilgltf;
      });
      scene.add(gltf.scene);
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
    camera.position.x = 2;
    camera.position.y = 32;
    camera.position.z = 16;
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

  return <canvas className="webgl" ref={webgl}></canvas>;
};

export default App;
