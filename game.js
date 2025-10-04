// Game.js

// Aliases for Matter.js modules
const { Engine, Render, Runner, World, Bodies, Events } = Matter;

// Create an engine and renderer
const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: document.createElement('canvas'),
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Set to true for debugging physics outlines
        background: '#1a1a1a'
    }
});

document.body.appendChild(render.canvas);

// Set up the game world
const world = engine.world;
world.gravity.y = 1;

// Create the bike
const bike = Bodies.circle(100, 100, 20, {
    density: 0.004,
    friction: 0.5,
    restitution: 0.4,
    label: 'bike',
    render: {
        fillStyle: 'rgb(255, 120, 0)'
    }
});

const wheels = {
    front: Bodies.circle(100, 120, 10, { friction: 0.8, render: { fillStyle: 'black' } }),
    back: Bodies.circle(80, 120, 10, { friction: 0.8, render: { fillStyle: 'black' } })
};

// Create track elements (e.g., ramps, platforms)
const track = [
    // Ground
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 50, { isStatic: true, render: { fillStyle: 'green' } }),
    // A ramp
    Bodies.rectangle(300, window.innerHeight - 150, 400, 20, { isStatic: true, angle: Math.PI * 0.1, render: { fillStyle: 'green' } }),
    // Another platform
    Bodies.rectangle(800, window.innerHeight - 100, 200, 20, { isStatic: true, render: { fillStyle: 'green' } })
];

// Add all bodies to the world
World.add(world, [bike, wheels.front, wheels.back, ...track]);

// Connect the wheels to the bike's body
const constraints = {
    front: Matter.Constraint.create({ bodyA: bike, bodyB: wheels.front, stiffness: 0.5, length: 30 }),
    back: Matter.Constraint.create({ bodyA: bike, bodyB: wheels.back, stiffness: 0.5, length: 30 })
};
World.add(world, [constraints.front, constraints.back]);

// Handle user input
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
        case 'd':
            Matter.Body.applyForce(bike, bike.position, { x: 0.05, y: 0 });
            break;
        case 'ArrowLeft':
        case 'a':
            Matter.Body.applyForce(bike, bike.position, { x: -0.05, y: 0 });
            break;
        case 'ArrowUp':
        case 'w':
            Matter.Body.applyForce(bike, bike.position, { x: 0, y: -0.05 });
            break;
    }
});

// Run the engine
Runner.run(Runner.create(), engine);
Render.run(render);

// Add camera follow effect (simplistic)
Events.on(engine, 'beforeUpdate', () => {
    const cameraX = bike.position.x - render.canvas.width / 2;
    Render.lookAt(render, {
        min: { x: cameraX, y: 0 },
        max: { x: cameraX + render.canvas.width, y: render.canvas.height }
    });
});
