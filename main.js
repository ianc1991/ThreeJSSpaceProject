import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// scene holds camera, objects, and lights
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // FOV, Aspect Ratio, View Frustum

const renderer = new THREE.WebGLRenderer ({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize (window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);

scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  // create randomly placed stars by generating random numbetween -100 and 100
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Create 200 stars
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Moon
const marsTexture = new THREE.TextureLoader().load('mars_1k_color.jpg');
const normalTexture = new THREE.TextureLoader().load('marsnormal2k.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);

mars.position.z = 30;
mars.position.setX(-10);

function moveCamera() {
  // get dimension of the viewport
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.z = t * -0.0002;
  camera.position.z = t * -0.0002;
}

// On scroll event
document.body.onscroll = moveCamera;

// Animate
function animate () {
  requestAnimationFrame( animate );

  //mars.rotation.x += 0.01;
  //mars.rotation.y += .001;
  //mars.rotation.z += 0.01;

  controls.update();


  renderer.render(scene, camera)

}

animate();