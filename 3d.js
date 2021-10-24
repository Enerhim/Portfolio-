import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

var pointLight, ambientLight;
var moon, moon2;

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(300));
  
    star.position.set(x, y, z);
    scene.add(star);
}

function makeObjects() {
    // Lighting
    pointLight = new THREE.PointLight(0x666666);
    ambientLight = new THREE.AmbientLight(0xffffff);
    
    pointLight.position.set(20, 20, -35);
 
    // Moon
    const moonTx = new THREE.TextureLoader().load('img/moon.jpg');
    const normalTx = new THREE.TextureLoader().load('img/normal.jpg');
    const moon2Tx = new THREE.TextureLoader().load('img/moon2.jpg');
    const normal2Tx = new THREE.TextureLoader().load('img/normal2.jpg');

    moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
          map: moonTx,
          normalMap: normalTx,
        })
    );      
    moon2 = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
          map: moon2Tx,
          normalMap: normal2Tx,
        })
    );      
    moon.position.z = -30;
    moon2.position.x = -30;
    moon2.position.y = 20;
    moon2.position.z = -60;

    // Stars
    Array(200).fill().forEach(addStar);  
    
    // Add to Scene
    scene.add(pointLight, moon, moon2)
}

function init() {
    
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    window.addEventListener( 'resize', onWindowResize, false );
    
    camera.position.setZ(10);    
    document.body.onscroll = moveCamera;

    const backgroundTx = new THREE.TextureLoader().load('img/bg.png');
    scene.background = backgroundTx;

    makeObjects();
}

function moveCamera() {
    const top = document.body.getBoundingClientRect().top;

    camera.rotation.y = top * -0.0001;
}

function animate() {
    requestAnimationFrame(animate);
  
    moon.rotation.y += 0.005;
    moon.rotation.x += 0.001;

    moon2.rotation.y -= 0.01;
    moon2.rotation.z += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth/ window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
moveCamera()
animate();