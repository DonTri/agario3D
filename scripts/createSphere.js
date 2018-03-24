//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*            Creates a sphere and calculates the max speed and its accelaration            */
/*Returns an object of the position, maxSpeed, Accelaration and current speed of the sphere */

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// everybody sees the globalGeometry. It has radius 1 so if you scale it with number N it will have radius = 1*N
var globalGeometry = new THREE.SphereGeometry(1, 32, 32);

function createSphere(params) {

    // creating sphere

    var material = new THREE.MeshPhongMaterial({
        color: params.color
    });
    var sphere = new THREE.Mesh(globalGeometry, material);

    sphere.castShadow = true;

    // after I create the ball, I call scaleMe to scale it using params.scale 
    scaleMe({
        scale: params.scale
    })

    scene.add(sphere);

    move(params.position);

    //calculate the accelaration of each sphere
    var acceleration = Fpower / ((4 / 3) * Math.PI * params.scale ^ 3);

    //calculate max speed of the sphere
    var maxSpeed = 1000 / (params.scale * 2);

    //calculate max speed of the sphere
    var speed = 0;

    var time = Date.now();


    function move(args) {
        sphere.position.set(args.x, args.y, args.z);
    }

    function changeColor(args) {
        // color se morfi 0xff0000(kokino)
        sphere.material.color.setHex(args.color);
    }

    function scaleMe(args) {
        params.scale = args.scale; // we store it for future use
        sphere.scale.set(args.scale, args.scale, args.scale); // we scale the mesh
    }

    function getScale() {
        return params.scale; // params object will always have the updated value of scale
    }

    function removeMe() {
        scene.remove(sphere);
    }

    return {
        getScale: getScale, // we should use a function instead of the property directly
        position: sphere.position,
        speed: speed,
        acceleration: acceleration,
        maxSpeed: maxSpeed,
        direction: params.direction,
        time: time,
        changeColor: changeColor,
        scaleMe: scaleMe,
        removeMe: removeMe
    };


}