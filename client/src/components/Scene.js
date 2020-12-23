import React, { Component } from 'react';
import * as THREE from "three";
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Scene extends Component {
    constructor(props) {
        super(props);
        this.mount = React.createRef();
    }
    componentDidMount() {
        this.renderPlayer(this.createScene());
    }
    createScene = () => {
        let { width, height } = {
            width: this.mount.current.scrollWidth,
            height: this.mount.current.scrollHeight
        }
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );
        this.mount.current.appendChild( renderer.domElement );
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);
        scene.background = new THREE.Color( 0x11f8bb );
        camera.position.y = 5;
        camera.position.z = 20;
        const animate = function () {
            requestAnimationFrame( animate );
            //if (!waddle) return;
            /*waddle.rotation.x += 0.01;
            waddle.rotation.y += 0.01;*/
            renderer.render( scene, camera );
        };
        const renderScene = () => {
            requestAnimationFrame( renderScene );
            renderer.render( scene, camera );
        }
        renderScene();
        return { scene, camera };
    }
    renderPlayer = ({ scene, camera }) => {
        const canvas = this.mount.current;
        let plane = new THREE.Plane(new THREE.Vector3(0, 5, 5), 0); // it's up to you how you will create THREE.Plane(), there are several methods
        const loader = new GLTFLoader();
        const raycaster = new THREE.Raycaster();
        var intersectPoint = new THREE.Vector3();//for reuse
        const mouse = new THREE.Vector3();
        let waddle;
        loader.load('assets/waddle.glb', (gltf) => {
            waddle = gltf.scene;
            scene.add(waddle);
        });
        canvas.addEventListener('mousemove', (e) => {
            const getMousePosition = () => {
                let canvasPosition = {
                    x: e.clientX - canvas.offsetLeft,
                    y: e.clientY - canvas.offsetTop
                }
                mouse.x = ( canvasPosition.x / canvas.scrollWidth ) * 2 - 1;
                mouse.y = - ( canvasPosition.y / canvas.scrollHeight ) * 2 + 1;
                mouse.z = mouse.y < -0.39 ? 5 : -5;
                //raycaster.set(waddle.position, mouse);
                raycaster.setFromCamera(mouse, camera);//set raycaster
                raycaster.ray.intersectPlane(plane, intersectPoint); // find the point of intersection
                //console.dir(intersectPoint)
                //waddle.lookAt(intersectPoint); // face our arrow to this point
                waddle.lookAt(new THREE.Vector3(intersectPoint.x, 0, mouse.z));
                //console.dir(`${canvasPosition.x}, ${canvasPosition.y}`);
            }
            getMousePosition();
        });
        canvas.addEventListener('click', (e) => {
            // get CURRENT coordinates so that in case of clicking mid-path, new path is calculated from current position, not starting position
            // start animation
            // calculate path and length,
            // css transition to that point,
            // stop animation
        })
        /* window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                waddle.translateY(1);
            }
            if (e.key === 'ArrowDown') {
                waddle.translateY(-1);
            }
            if (e.key === 'ArrowLeft') {
                waddle.translateX(-1);
            }
            if (e.key === 'ArrowRight') {
                waddle.translateX(1);
            }
        }); // */
    }
    render() {
        return (
            <div className="Canvas" ref={this.mount}>
            </div>
        )
    }
}