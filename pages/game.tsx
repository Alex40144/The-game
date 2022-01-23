import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, PointerLockControls } from "@react-three/drei"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const GamePage = () => {
    if (typeof window == 'undefined' || typeof document == 'undefined'){
        return(
            <div>Loading</div>
        )
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

    scene.background = new THREE.Color( 0xcccccc );
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    const grid = new THREE.GridHelper(1000, 10, 0x0000AA, 0x00AA00)
    scene.add(grid)

    const light = new THREE.AmbientLight()
    light.position.set(0, 0, 5)
    light.color.set('white')
    scene.add(light)

    camera.position.set( 200, 100, 0 );

    const controls = new OrbitControls( camera, renderer.domElement );

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.2;

    controls.screenSpacePanning = false;

    controls.minDistance = 250;
    controls.maxDistance = 1000;

    controls.maxPolarAngle = Math.PI / 2.5; //not quite flat


    function animate() {
        requestAnimationFrame( animate )
        //controls.update()
        //animation code

        renderer.render( scene, camera )
    };

    animate()

    window.addEventListener( 'resize', onWindowResize, false )

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize( window.innerWidth, window.innerHeight )

    }
  
    return (
        <>
        </>
    )
}

export default GamePage