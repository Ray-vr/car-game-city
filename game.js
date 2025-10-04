// game.js
const assets = {};
const assetFiles = ['assets/bike.png', 'assets/player.png', 'assets/track_segment.png'];
let assetsLoaded = 0;

function loadAssets() {
    assetFiles.forEach(src => {
        const img = new Image();
        img.onload = () => {
            assetsLoaded++;
            if (assetsLoaded === assetFiles.length) {
                // All assets are loaded, start the game
                startGame();
            }
        };
        img.src = src;
        assets[src] = img;
    });
}

function startGame() {
    // Original game logic goes here...
}

loadAssets();
