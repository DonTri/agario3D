//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*     			     Function that moves an Object to mouse position					    */

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function calculateNewDirection(e) {


    // upologizoume to x,y tou mouse alla me vasi to 0,0 na einai sto kentro ti othonis mas
    var xMouse = e.x - canvas.width / 2;
    var yMouse = canvas.height / 2 - e.y;


    // auti i sunartisi upologizei tin gwnia dedomenwn x kai y twn 2 shmeiwn. nomizw douleuei mono gia to panw deksia tetarthmorio
    var angle = getAngle(0, 0, xMouse, yMouse);

    // angle = toDegrees(angle);

    //console.log(toDegrees(getAngle(0, 0, xMouse, yMouse)));

    // ftiaxnoume ena vector me mikos 1, to peristrefoume se sxesi me ton aksona Z kata 'angle'  moires
    var vector = new THREE.Vector3(1, 0, 0);
    var axis = new THREE.Vector3(0, 0, 1);
    vector.applyAxisAngle(axis, angle);

    mainBall.direction = vector;

    //tweenarisma();


    function tweenarisma() {
        var start = mainBall.direction.clone();
        var end = new THREE.Vector3(0, 0, 0);

        var duration = 2 * mainBall.speed / mainBall.acceleration;

        var tween = new TWEEN.Tween(start).to(end, duration / 1000);


        tween.onUpdate(function () {
            // console.log("start.x:" + start.x + "........start.y:" + start.y + "    ......start.z:" + start.z);

            mainBall.position.x += start.x;
            mainBall.position.y += start.y;
            mainBall.position.z += start.z;

            camera.position.x += start.x;
            camera.position.y += start.y;
            camera.position.z += start.z;


        });

        tween.easing(TWEEN.Easing.Quartic.In);

        tween.start();


    }

}


var getAngle = function (x1, y1, x2, y2) {

    var dx = -x1 + x2,
        dy = -y1 + y2;

    return Math.atan2(dy, dx);
};

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}


function moveIt() {


    if (mainBall.direction.length() == 0) return;

    var x = calculateDistanceToMove(mainBall);

    mainBall.position.add(x);
    camera.position.add(x);
    weEat();

    for (var i = enemies.length - 1; i >= 0; i--) {
        setdirection(enemies[i]);
        x = calculateDistanceToMove(enemies[i]);
        enemies[i].position.add(x); /////////////

    }
}


function calculateDistanceToMove(sphere) {

    var timeTraveled = (Date.now() - sphere.time) / 1000;


    sphere.time = Date.now();

    if (sphere.speed < sphere.maxSpeed) {
        sphere.speed = sphere.speed + sphere.acceleration * timeTraveled;
        var x = sphere.speed * timeTraveled;
    } else {
        var x = sphere.maxSpeed * timeTraveled;
    }

    var targetVector = sphere.direction.clone();
    targetVector.setLength(x);

    return targetVector;


}


function setdirection(sphere) {

    if (sphere.position.x + sphere.getScale() >= wallsWidth || sphere.position.x - sphere.getScale() <= -wallsWidth) {

        sphere.direction.setX(-1 * sphere.direction.getComponent(0));

    }
    if (sphere.position.y + sphere.getScale() >= wallsWidth || sphere.position.y - sphere.getScale() <= -wallsWidth) {

        sphere.direction.setY(-1 * sphere.direction.getComponent(1));

    }

}