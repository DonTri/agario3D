var camera, scene, renderer, mainBall, material, stats;
var Fpower = 4000;
var wallsWidth;
var enemies = [];
var controls;
var directionalLight;
var lightPos;
var lightPosInit;

init();
animate();

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    // Add renderer to page
    document.body.appendChild(renderer.domElement);


    // Create camera.
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 4100);
    camera.position.z = 2500;

    // Create scene.
    scene = new THREE.Scene();

    // controls = new THREE.OrbitControls(camera, renderer.domElement);


    // Create the grid
    wallsWidth = createGrid();

    // Create ambient light and add to scene.
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    lightPos = new THREE.Vector3(30, 10, 280);
    lightPosInit = new THREE.Vector3(30, 10, 280);
    // Create directional light and add to scene.
    directionalLight = new THREE.DirectionalLight(0xffffbe);
    directionalLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    directionalLight.castShadow = true;


    directionalLight.shadow.mapSize.width = 1024; // default
    directionalLight.shadow.mapSize.height = 1024; // default
    directionalLight.shadow.camera.near = 1; // default
    directionalLight.shadow.camera.far = 600; // default

    directionalLight.shadow.camera.left = -1000;
    directionalLight.shadow.camera.right = 1000;
    directionalLight.shadow.camera.top = 1000;
    directionalLight.shadow.camera.bottom = -1000;

    directionalLight.target.position.set(lightPos.x, lightPos.y, 0)

    // var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(helper);

    scene.add(directionalLight);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);


    // Create the mainBall.
    mainBall = createSphere({
        color: '#FF0040',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 20, // now I use this instead of radius
        direction: new THREE.Vector3(Math.random() - 1, Math.random() - 1, 0).normalize()

    });


    // Create the enemie balls
    for (var i = 50; i >= 0; i--) {

        enemies.push(createSphere({
            // radius: (20 * Math.random() + 0),
            scale: (20 * Math.random() + 10), // here too
            color: generateColor(),
            position: {
                x: 2 * wallsWidth * Math.random() - wallsWidth,
                y: 2 * wallsWidth * Math.random() - wallsWidth,
                z: 0
            },
            direction: new THREE.Vector3(Math.random() - 1, Math.random() - 1, 0).normalize()
        }));
    }

    // Add stats to page.
    // stats = new Stats();
    // document.body.appendChild(stats.dom);
}


function generateColor() {
    return '#' + (function co(lor) {
        return (lor +=
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) &&
            (lor.length == 6) ? lor : co(lor);
    })('');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// mouse move detection
var canvas = renderer.domElement;
canvas.onmousemove = calculateNewDirection;


function animate() {
    requestAnimationFrame(animate);
    /*  tsika.rotation.y += 0.01; */
    //moveSphere();
    renderer.render(scene, camera);

    // console.log("Item 1: " + "r" + mainBall.radius + "s" + mainBall.speed + "MS " + mainBall.maxSpeed);
    TWEEN.update();
    //theyEat();
    moveIt();

    lightPos.x = lightPosInit.x + camera.position.x;
    lightPos.y = lightPosInit.y + camera.position.y;

    // directionalLight.target.position.set(lightPos.x, lightPos.y, 0)
    // directionalLight.position.set(lightPos.x, lightPos.y, 100)
    // directionalLight.updateMatrixWorld();
    // directionalLight.target.updateMatrixWorld();

    //console.log("x ball position:" + mainBall.acceleration + "........ y ball position:" + mainBall.maxSpeed + "........ z ball position:" + mainBall.position.z);
    // stats.update();
}