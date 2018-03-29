//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*            Creates a sphere and calculates the max speed and its accelaration            */
/*Returns an object of the position, maxSpeed, Accelaration and current speed of the sphere */

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// everybody sees the globalGeometry. It has radius 1 so if you scale it with number N it will have radius = 1*N
var globalGeometry = new THREE.SphereGeometry(1, 32, 32);

function createSphere(params) {

    var maxSpeed, accelaration, time;
    var speed = 0;

    var time = Date.now();

    // creating sphere

    var material = new THREE.MeshPhongMaterial({
        color: params.color
    });
    var sphere = new THREE.Mesh(globalGeometry, material);

    sphere.castShadow = true;

    // after I create the ball, I call scaleMe to scale it using params.scale 
    scaleMe({
        scale: params.scale
    });

    setMaxSpeed(getScale());

    setAcceleration(getScale());

    scene.add(sphere);

    setPosition(params.position);
    setDirection(params.direction);

    setTime();

    function getPosition() {
        return sphere.position.clone();
    }

    function setPosition(args) {
        if (args.x != undefined) {
            sphere.position.setX(args.x);
        }
        if (args.y != undefined) {
            sphere.position.setY(args.y);
        }
        if (args.z != undefined) {
            sphere.position.setZ(args.z);
        }


    }

    function getDirection() {
        return params.direction.clone();
    }

    function setDirection(args) {
        if (args.x != undefined) {
            params.direction.setX(args.x);
        }
        if (args.y != undefined) {
            params.direction.setY(args.y);
        }
        params.direction.normalize();
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


    function setAcceleration(args) {
        acceleration = Fpower / ((4 / 3) * Math.PI * args ^ 3);
    }

    function getAcceleration() {
        return acceleration;
    }

    function setSpeed(args) {

        speed = speed + getAcceleration() * args;
    }

    function getSpeed() {
        return speed;
    }

    function setMaxSpeed(args) {
        maxSpeed = (2000 / args) + 75;
    }

    function getMaxSpeed() {
        return maxSpeed;
    }

    function setTime() {
        time = Date.now();
    }

    function getTime() {
        return time;
    }

    return {
        getScale: getScale, // we should use a function instead of the property directly
        getPosition: getPosition,
        setPosition: setPosition,
        getDirection: getDirection,
        setDirection: setDirection,
        setSpeed: setSpeed,
        getSpeed: getSpeed,
        setTime: setTime,
        getTime: getTime,
        getAcceleration: getAcceleration,
        changeColor: changeColor,
        scaleMe: scaleMe,
        removeMe: removeMe,
        setMaxSpeed: setMaxSpeed,
        getMaxSpeed: getMaxSpeed
    };


}