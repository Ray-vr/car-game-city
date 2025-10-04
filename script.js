const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x228B22 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Load GLB model
let car;
const loader = new THREE.GLTFLoader();
loader.load('models/car.glb', function(gltf) {
  car = gltf.scene;
  car.scale.set(0.5, 0.5, 0.5);
  car.position.set(0, 0.5, 0);
  scene.add(car);
}, undefined, function(error) {
  console.error('Error loading model:', error);
});

camera.position.set(0, 5, 10);

function animate() {
  requestAnimationFrame(animate);
  if (car) {
    car.position.z -= 0.1;
    camera.position.z = car.position.z + 10;
    camera.lookAt(car.position);
  }
  renderer.render(scene, camera);
}
animate();
