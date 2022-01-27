import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sky, PointerLockControls } from "@react-three/drei"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const GamePage = () => {
    if (typeof window == 'undefined' || typeof document == 'undefined'){
        return(
            <div>Loading</div>
        )
    }
    const loader = new GLTFLoader();
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )


    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio( window.devicePixelRatio * 1.5 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement )


    const grid = new THREE.GridHelper(1000, 100, 0xffffff, 0x888888)
    grid.position.y = 0.55
    //scene.add(grid)

    scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 10, 50, 10 );
    hemiLight.intensity = 2
    scene.add( hemiLight );


    var dirLight = new THREE.DirectionalLight( 0xffffff, 2 );
    dirLight.position.set( 75, 300, -75 );
    dirLight.castShadow = true;
    dirLight.shadow.radius = 8;
    scene.add( dirLight );


    camera.position.set( 200, 100, 0 );

    const controls = new OrbitControls( camera, renderer.domElement );

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.2;

    controls.screenSpacePanning = false;

    controls.minDistance = 50;
    controls.maxDistance = 1000;

    controls.maxPolarAngle = Math.PI / 2.5; //not quite flat

    

    loader.load( '/models/tree_default.glb', function ( gltf ) {
        gltf.scene.scale.set(10,10,10)
        gltf.scene.position.x = 15
        gltf.scene.position.z = 5
        gltf.scene.position.y = 0.5
        gltf.scene.castShadow = true
        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    } );
    
    loader.load( '/models/ground_grass.glb', function ( gltf ) {
        gltf.scene.scale.set(10,10,10)
        gltf.scene.position.y = 0.5
        gltf.scene.visible = false
        for(var x = -10; x < 10; x++){
            for(var z = -10; z < 10; z++){
                var newModel = gltf.scene.clone()
                newModel.position.z = 5 + (z * 10)
                newModel.position.x = 5 + (x * 10)
                newModel.receiveShadow = true
                newModel.visible = true
                scene.add( newModel );
            }
        }
        

    }, undefined, function ( error ) {

        console.error( error );

    } );

    
    


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