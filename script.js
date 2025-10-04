const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const car = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 4),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
car.position.y = 0.5;
scene.add(car);

camera.position.set(0, 5, 10);
camera.lookAt(car.position);

function animate() {
  requestAnimationFrame(animate);
  car.position.z -= 0.1;
  camera.position.z = car.position.z + 10;
  renderer.render(scene, camera);
}
animate();
