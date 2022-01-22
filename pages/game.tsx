import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, PointerLockControls } from "@react-three/drei"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from "three"
import { Vector3 } from 'three'


const GamePage = () => {
    if (typeof window == 'undefined' || typeof document == 'undefined'){
        return(
            <div>Loading</div>
        )
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    const grid = new THREE.GridHelper( 20, 20 );
    grid.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2)
    scene.add(grid)

    const light = new THREE.AmbientLight()
    light.position.set(0, 0, 5)
    light.color.set('white')
    scene.add(light)

    const controls = new OrbitControls(camera, renderer.domElement)
    camera.up.set( 0, 0, 1 );

    camera.position.z = 5

    function animate() {
        requestAnimationFrame( animate )
        controls.update()
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