/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

import *  as handlers from './handlers.js';

import * as THREE from "three";
import * as pages from "./pages.js";
import './styles.css';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(9.2, 18, -15.5);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
// controls.minDistance = 4;
// controls.maxDistance = 16;
controls.update();


// global variables 
// inspired from https://harveyw24.github.io/Glider/ 
const keypress = {};
const screens = { "menu": true, "ending": false, "pause": false };
const playerA = 'playerA';
const playerB = 'playerB';

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    // reset game: need to reset character

    controls.update();

    // reset the game on menu screen
    if (screens['menu']) {

    }

    window.requestAnimationFrame(onAnimationFrameHandler);

    // on game screen and not paused
    if (!screens["menu"] && !screens["ending"] && !screens["pause"] && !scene.state.gameEnded) {

        renderer.render(scene, camera);
        // console.log(camera.position);
        scene.update && scene.update(timeStamp);

        // start game
        handlers.handlePlayerAControls(scene, keypress, playerA, timeStamp);
        handlers.handlePlayerBControls(scene, keypress, playerB, timeStamp);

    }



};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// add event listeners
window.addEventListener('keydown', event => handlers.handleKeyDown(event, keypress), false);
window.addEventListener('keyup', event => handlers.handleKeyUp(event, keypress), false);

window.addEventListener('keydown', event => handlers.handleScreens(event, screens, document, canvas, scene));

// let game_ongoing = false;

// window.addEventListener('click', function (event) {
//     console.log("clicked");
//     if (!game_ongoing) {
//         game_ongoing = true;
//         pages.start_game(document, canvas);
//     }
//     // if (!animationLoopRunning) {
//     //     startAnimationLoop();
//     // }
//     // Check if the pressed key is the space key (key code 32)
//     // if (event.code === 'Space') {
//     //     // If the game has not started, start it
//     //     if (!gameStarted) {
//     //         gameStarted = true;
//     //         // Call the renderGame function
//     //         renderGame();
//     //     }
//     // }

window.addEventListener('dblclick', function(event) {
    this.location.reload(true);
});

pages.init_page(document, canvas);
// export default scene;
