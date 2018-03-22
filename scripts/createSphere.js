//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*            Creates a sphere and calculates the max speed and its accelaration            */
/*Returns an object of the position, maxSpeed, Accelaration and current speed of the sphere */

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function createSphere(params) {

    // creating sphere
    var geometry = new THREE.SphereGeometry(params.radius, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        color: params.color
    });
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    move(params.position);

    //calculate the accelaration of each sphere
    var acceleration = Fpower / ((4 / 3) * Math.PI * params.radius ^ 3);

    //calculate max speed of the sphere
    var maxSpeed = 1.5;

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

    return {
        radius: params.radius,
        position: sphere.position,
        speed: speed,
        acceleration: acceleration,
        maxSpeed: maxSpeed,
        direction: params.direction,
        time: time,
        changeColor: changeColor
    };


}