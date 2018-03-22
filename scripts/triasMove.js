var camera, scene, renderer, mainBall, material, stats;
var Fpower = 0.0001;
var wallsWidth;
var enemies = [];




init();
//animate();

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Add renderer to page
    document.body.appendChild(renderer.domElement);

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.z = 400;

    // Create scene.
    scene = new THREE.Scene();
    


    // Create the grid
    wallsWidth = createGrid();

    // Create ambient light and add to scene.
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    // Create directional light and add to scene.
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);

    
    // Create the mainBall.
    mainBall = createSphere({
        radius: 10,
        color: '#FF0040',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        direction: new THREE.Vector3(0, 0, 0)

    });


    // Create the enemie balls
    for (var i = 20; i >= 0; i--) {

        enemies.push(createSphere({
            radius: (10 * Math.random() + 1),
            color: generateColor(),
            position: {
                x: 2 * wallsWidth * Math.random() - wallsWidth,
                y: 2 * wallsWidth * Math.random() - wallsWidth,
                z: 0
            },
            direction: new THREE.Vector3(Math.random() - 1,  Math.random() - 1, 0).normalize()
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
canvas.onmousemove = animate;



function animate() {
    requestAnimationFrame(animate);
    /*  tsika.rotation.y += 0.01; */
    //moveSphere();
    renderer.render(scene, camera);
    // TWEEN.update();
    theyEat();
    moveIt();

    //console.log("x ball position:" + mainBall.acceleration + "........ y ball position:" + mainBall.maxSpeed + "........ z ball position:" + mainBall.position.z);
    // stats.update();
}