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
    mainBall.setDirection(vector);
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
    var i = 0,
        camera_temp,
        x;

    if (mainBall.getDirection().length() == 0) return;

    x = calculateDistanceToMove(mainBall);

    checkBoarders(mainBall, x);
    camera_temp = mainBall.getPosition();
    camera.position.set(camera_temp.x, camera_temp.y, camera_position_z);
    weEat(); // go hunting. Function in hunting.js

    while (i < enemies.length) {
        if (enemies[i] != undefined) {
            hunting(enemies[i], i); // go hunting. Function in hunting.js
            x = calculateDistanceToMove(enemies[i]);
            checkBoardersAndMove(enemies[i], x);
        }
        i += 1;
    }
    enemies = createNewCleanArray(enemies); // createNewCleanArray chekare

}

/* this function takes an array with objects and undefined and gives back a clean array with same objects and no undefined */

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
    var x, targetVector, timeTraveled;

    timeTraveled = (Date.now() - sphere.getTime()) / 1000;
    sphere.setTime();

    if (sphere.getSpeed() < sphere.getMaxSpeed()) {
        sphere.setSpeed(timeTraveled);
        x = sphere.getSpeed() * timeTraveled;
    } else {
        x = sphere.getMaxSpeed() * timeTraveled;
    }

    targetVector = sphere.getDirection();
    targetVector.setLength(x);

    return targetVector;


}



/*Check before move. We check the future position of the object (before adding the new vector),
 so we can be sure that the object will stay in the battlefield*/

function checkBoardersAndMove(sphere, vectorMove) {

    var pos = sphere.getPosition(),
        dir = sphere.getDirection();

    if ((pos.x + sphere.getScale() + vectorMove.x + 0.01 <= wallsWidth) && (pos.x - sphere.getScale() + vectorMove.x - 0.01 >= -wallsWidth)) {
        sphere.setPosition({
            x: pos.x + vectorMove.x
        });

    } else if (pos.x + sphere.getScale() + vectorMove.x > wallsWidth) {
        sphere.setPosition({
            x: wallsWidth - sphere.getScale()
        });
        sphere.setDirection({
            x: -1 * Math.abs(dir.x)
        });


    } else if (pos.x - sphere.getScale() + vectorMove.x < -wallsWidth) {
        sphere.setPosition({
            x: -wallsWidth + sphere.getScale()
        });
        sphere.setDirection({
            x: Math.abs(dir.x)
        });

    }

    if ((pos.y + sphere.getScale() + vectorMove.y <= wallsWidth) && (pos.y - sphere.getScale() + vectorMove.y >= -wallsWidth)) {
        sphere.setPosition({
            y: pos.y + vectorMove.y
        });

    } else if (pos.y + sphere.getScale() + vectorMove.y > wallsWidth) {
        sphere.setPosition({
            y: wallsWidth - sphere.getScale()
        });
        sphere.setDirection({
            y: -1 * Math.abs(dir.y)
        });

    } else if (pos.y - sphere.getScale() + vectorMove.y < -wallsWidth) {

        sphere.setPosition({
            y: -wallsWidth + sphere.getScale()
        });
        sphere.setDirection({
            y: Math.abs(dir.y)
        });

    }
}



/*Check the boarders for the mainBALL. I create a new function to avoid if statements in 
the same function for enemies. Because in mainBall we don't need to change direction*/

function checkBoarders(sphere, vectorMove) {

    var pos = sphere.getPosition();

    if ((pos.x + sphere.getScale() + vectorMove.x + 0.01 <= wallsWidth) && (pos.x - sphere.getScale() + vectorMove.x - 0.01 >= -wallsWidth)) {
        sphere.setPosition({
            x: pos.x + vectorMove.x
        });

    } else if (pos.x + sphere.getScale() + vectorMove.x > wallsWidth) {
        sphere.setPosition({
            x: wallsWidth - sphere.getScale()
        });

    } else if (pos.x - sphere.getScale() + vectorMove.x < -wallsWidth) {
        sphere.setPosition({
            x: -wallsWidth + sphere.getScale()
        });

    }

    if ((pos.y + sphere.getScale() + vectorMove.y <= wallsWidth) && (pos.y - sphere.getScale() + vectorMove.y >= -wallsWidth)) {
        sphere.setPosition({
            y: pos.y + vectorMove.y
        });

    } else if (pos.y + sphere.getScale() + vectorMove.y > wallsWidth) {
        sphere.setPosition({
            y: wallsWidth - sphere.getScale()
        });

    } else if (pos.y - sphere.getScale() + vectorMove.y < -wallsWidth) {

        sphere.setPosition({
            y: -wallsWidth + sphere.getScale()
        });

    }

}