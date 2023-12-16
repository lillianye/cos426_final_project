import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './floor.glb'; // Model obtained from https://poly.pizza/m/4qpvnIQNcl5
import * as THREE from 'three';

class Land extends Group {
    static width = 10; // x direction
    static height = 10; // z direction

    constructor() {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // gui: parent.state.gui,
            // dimensions: null,
            //width: null,
            //length: null
        };

        const loader = new GLTFLoader();

        this.name = 'land';

        loader.load(MODEL, (gltf) => {
            gltf.scene.position.x = 0;
            gltf.scene.position.y = 0;
            gltf.scene.position.z = 0;
            // gltf.scene.scale.set(1, 1, 1);
            // gltf.scene.rotateY(2*Math.PI*.165);
            // gltf.scene.rotation.set(0, 0, 0);
            const roundingBox = new THREE.Box3().setFromObject(gltf.scene);

            // Get the dimensions
            this.state.dimensions = roundingBox.getSize(new THREE.Vector3());
            this.state.boundingBox = roundingBox.clone();
            // console.log('Model Dimensions:', this.state.dimensions.x, this.state.dimensions.y, this.state.dimensions.z);
            console.log("bounding box original", roundingBox)
            console.log("width want", Land.width)
            console.log("but dimension is", this.state.dimensions.x)

            const scale = Land.width / this.state.dimensions.x * 2.5; // The 2.5 is voodoo magic
            console.log("so scale is ", scale)

            gltf.scene.scale.set(scale, scale, scale);

            // this.test = 'hi';
            // LAND_DIMENSIONS = boundingBox.getSize(new THREE.Vector3());
            console.log('new Dimensions:', new THREE.Box3().setFromObject(gltf.scene));

            let pos = new THREE.Vector3();
            this.getWorldPosition(pos);
            let thisBox = new THREE.Box3().setFromObject(this, true);
            console.log("Land bounding box", thisBox)
            let scl = new THREE.Vector3();
            this.getWorldScale(scl)
            console.log("World posiiton", pos, gltf.scene.position);
            console.log("World scale", scl, gltf.scene.scale);

            this.add(gltf.scene);
        });
    }

    get boundingBox() {
        return this._boundingBox;
    }

    set boundingBox(newValue) {
        this._boundingBox = newValue
    }
}

export default Land;
