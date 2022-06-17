import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//Positioning
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

scene.add(mesh);

// Difference between the center of the scene and the object position
console.log(
  "Distance of the object from the center of the scene: " +
    mesh.position.length()
);

// Will take the vector length and will reduce it so it becomes 1
mesh.position.normalize();
console.log(mesh.position.length());

// This does the same thing as the .x, .y, .z above
mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// Rotation
// mesh.rotation.y = 3.14159;
// If we tinker to much with rotation on the axises, we can get a gimble lock which messes everything up, so we can use the reorder method to let it do first the movement on the y, then the x, then the z. The reorder must be done before the rotation.
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// Axes helper. Size can be edited with the parameter
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Distance between the object and the camera
console.log(
  "Distance of the object from the camera: " +
    mesh.position.distanceTo(camera.position)
);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
