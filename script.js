let speed = 0;
let turn = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") speed = 0.2;
  if (e.key === "ArrowDown") speed = -0.2;
  if (e.key === "ArrowLeft") turn = 0.05;
  if (e.key === "ArrowRight") turn = -0.05;
});

document.addEventListener("keyup", () => {
  speed = 0;
  turn = 0;
});

function animate() {
  requestAnimationFrame(animate);
  car.rotation.y += turn;
  car.position.x += Math.sin(car.rotation.y) * speed;
  car.position.z += Math.cos(car.rotation.y) * speed;
  camera.position.set(car.position.x, 5, car.position.z + 10);
  camera.lookAt(car.position);
  renderer.render(scene, camera);
}
