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
    weEat();

    while (i < enemies.length) {

        setDirection(enemies[i], i);
        x = calculateDistanceToMove(enemies[i]);
        checkBoarders(enemies[i]);
        enemies[i].position.add(x); /////////////
        i += 1;
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

function setDirection(sphere, j) {
    var distance;
    var nearest_ball = {
        min: 50,
        enemy_index: -1
    };

    for (var i = enemies.length - 1; i >= 0; i--) {
        if (i != j) {
            distance = Math.sqrt(Math.pow((sphere.position.x - enemies[i].position.x), 2) + Math.pow((sphere.position.y - enemies[i].position.y), 2));
            if (distance < nearest_ball.min) {
                nearest_ball.min = distance;
                nearest_ball.enemy_index = i
            }
        }
    }

    /*    distance = Math.sqrt(Math.pow((sphere.position.x - mainBall.position.x), 2) + Math.pow((sphere.position.y - mainBall.position.y), 2));
        if (distance < nearest_ball.min) {
            nearest_ball.min = distance;
            nearest_ball.enemy_index = i
        }*/


    if (nearest_ball.enemy_index != -1) {
        if (sphere.getScale() > enemies[nearest_ball.enemy_index].getScale()) {
            attack();
            if (nearest_ball.min < sphere.getScale()) {
                eat();
               // return -1;
            } 
        } else {
            abort();
            //return 0;
        }

    }





    function attack() {
        sphere.direction.setX(enemies[nearest_ball.enemy_index].position.x - sphere.position.x);
        sphere.direction.setY(enemies[nearest_ball.enemy_index].position.y - sphere.position.y);

        sphere.direction.normalize();

    }

    function abort() {
        sphere.direction.setX(sphere.position.x - enemies[nearest_ball.enemy_index].position.x);
        sphere.direction.setY(sphere.position.y - enemies[nearest_ball.enemy_index].position.y);

        sphere.direction.normalize();

        sphere.speed = sphere.speed /2;

    }



    function eat() {
        var r_plus
        r_plus = enemies[nearest_ball.enemy_index].getScale();
        enemies.splice(nearest_ball.enemy_index, 1);
        /*enemies[nearest_ball.enemy_index].changeColor({
            color: '0xff0000'
        });*/

        sphere.scaleMe({
            scale: Math.cbrt(Math.pow(sphere.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(sphere.getScale(), 2) * r_plus + 3 * sphere.getScale() * Math.pow(r_plus, 2))
        });


    }

}




function checkBoarders(sphere) {

    if (sphere.position.x + sphere.getScale() >= wallsWidth) {

        sphere.direction.setX(-1 * Math.abs(sphere.direction.getComponent(0)));

    } else if (sphere.position.x - sphere.getScale() <= -wallsWidth) {

        sphere.direction.setX(Math.abs(sphere.direction.getComponent(0)));

    }


    if (sphere.position.y + sphere.getScale() >= wallsWidth) {

        sphere.direction.setY(-1 * Math.abs(sphere.direction.getComponent(1)));

    } else if (sphere.position.y - sphere.getScale() <= -wallsWidth) {

        sphere.direction.setY(Math.abs(sphere.direction.getComponent(1)));

    }

}



/*function setdirection(sphere) {

    if (sphere.position.x + sphere.getScale() >= wallsWidth || sphere.position.x - sphere.getScale() <= -wallsWidth) {

        sphere.direction.setX(-1 * sphere.direction.getComponent(0));

    }
    if (sphere.position.y + sphere.getScale() >= wallsWidth || sphere.position.y - sphere.getScale() <= -wallsWidth) {

        sphere.direction.setY(-1 * sphere.direction.getComponent(1));

    }

}*/