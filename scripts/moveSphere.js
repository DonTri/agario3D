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


        tween.onUpdate(function() {
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


var getAngle = function(x1, y1, x2, y2) {

    var dx = -x1 + x2,
        dy = -y1 + y2;

    return Math.atan2(dy, dx);
};

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}


function moveIt() {
    var i = 0;
    var shift_back = 0;

    if (mainBall.direction.length() == 0) return;

    var x = calculateDistanceToMove(mainBall);

    mainBall.position.add(x);
    camera.position.add(x);
    weEat(); // go hunting. Function in hunting.js

    while (i < enemies.length) {
        if (enemies[i] != undefined) {
            hunting(enemies[i], i); // go hunting. Function in hunting.js
            x = calculateDistanceToMove(enemies[i]);
            checkBoardersAndMove(enemies[i], x);

        } else {
            enemies.splice(i, 1);
        }
        i += 1;
    }
    enemies = createNewCleanArray(enemies); // createNewCleanArray chekare

}

// this functions takes an array with objects and undefined and gives back a clean array with same objects and no undefined
function createNewCleanArray(oldArray) {

    var newArray = [];

    for (var i = 0; i < oldArray.length; i++) {
        if (oldArray[i] != undefined) {
            newArray.push(oldArray[i]);
        }
    }

    return newArray;
}


/* We calculate the distance that the object traveled, based on the principle of accelerated motion smoothness */
function calculateDistanceToMove(sphere) {

    var timeTraveled = (Date.now() - sphere.time) / 1000;


    sphere.time = Date.now();

    if (sphere.speed < sphere.getMaxSpeed()) {
        sphere.speed = sphere.speed + sphere.getAcceleration() * timeTraveled;
        var x = sphere.speed * timeTraveled;
    } else {
        var x = sphere.getMaxSpeed() * timeTraveled;
    }

    var targetVector = sphere.direction.clone();
    targetVector.setLength(x);

    return targetVector;


}

/*Check before move. We check the future position of the object (before adding the new vector),
 so we can be sure that the object will stay in the battlefield*/
function checkBoardersAndMove(sphere, vectorMove) {

    if ((sphere.position.x + sphere.getScale() + vectorMove.x + 0.01 <= wallsWidth) && (sphere.position.x - sphere.getScale() + vectorMove.x - 0.01 >= -wallsWidth)) {

        sphere.position.setX(sphere.position.x + vectorMove.x);

    } else if (sphere.position.x + sphere.getScale() + vectorMove.x > wallsWidth) {
        sphere.position.setX(wallsWidth - sphere.getScale());
        sphere.direction.setX(-1 * Math.abs(sphere.direction.getComponent(0)));


    } else if (sphere.position.x - sphere.getScale() + vectorMove.x < -wallsWidth) {
        sphere.position.setX(-wallsWidth + sphere.getScale());
        sphere.direction.setX(Math.abs(sphere.direction.getComponent(0)));

    }

    if ((sphere.position.y + sphere.getScale() + vectorMove.y <= wallsWidth) && (sphere.position.y - sphere.getScale() + vectorMove.y >= -wallsWidth)) {

        sphere.position.setY(sphere.position.y + vectorMove.y);
    } else if (sphere.position.y + sphere.getScale() + vectorMove.y > wallsWidth) {
        sphere.position.setY(wallsWidth - sphere.getScale());
        sphere.direction.setY(-1 * Math.abs(sphere.direction.getComponent(1)));


    } else if (sphere.position.y - sphere.getScale() + vectorMove.y < -wallsWidth) {
        sphere.position.setY(-wallsWidth + sphere.getScale());
        sphere.direction.setY(Math.abs(sphere.direction.getComponent(1)));

    }


}