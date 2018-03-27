//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*	  Function that checks the distances between balls and choose if someone eat another    */
/* 									or trying to catch him									*/

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function weEat() {
    var distance, r_plus;;

    for (var i = enemies.length - 1; i >= 0; i--) {

        distance = Math.sqrt(Math.pow((mainBall.position.x - enemies[i].position.x), 2) + Math.pow((mainBall.position.y - enemies[i].position.y), 2));
        // console.log(distance);
        if (mainBall.getScale() > enemies[i].getScale() && mainBall.getScale() > distance) {

            r_plus = enemies[i].getScale();

            enemies[i].removeMe();

            enemies.splice(i, 1);
            scene.remove(enemies[i]);
            //enemies[nearest_ball.enemy_index] = undefined;

            mainBall.scaleMe({
                scale: Math.cbrt(Math.pow(mainBall.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(mainBall.getScale(), 2) * r_plus + 3 * mainBall.getScale() * Math.pow(r_plus, 2))
            });

            mainBall.setMaxSpeed(mainBall.getScale());


        }
    }
}

// Function that check distances and send spheres to attack and eat
function hunting(sphere, j) {
    var distance;
    var nearest_ball = { //We use this object to save the closest enemy to the sphere that we check
        min: 200,
        enemy_index: -1
    };

    for (var i = enemies.length - 1; i >= 0; i--) { //finds the closest enemy
        if (i != j) {
            distance = Math.sqrt(Math.pow((sphere.position.x - enemies[i].position.x), 2) + Math.pow((sphere.position.y - enemies[i].position.y), 2));
            if (distance < nearest_ball.min) {
                nearest_ball.min = distance;
                nearest_ball.enemy_index = i;
            }
        }
    }

    // checks if the closest enemy is bigger or smaller and choose to attack or try to escape
    if (nearest_ball.enemy_index != -1) {
        if (sphere.getScale() > enemies[nearest_ball.enemy_index].getScale()) {
            attack();
            if (nearest_ball.min < sphere.getScale()) {
                eat();
            }
        } else {
            abort();

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

    }

    // Function that remove the victim from the scene and increase the scale of the attacker
    function eat() {
        var r_plus;
        r_plus = enemies[nearest_ball.enemy_index].getScale();

        enemies[nearest_ball.enemy_index].removeMe();

        enemies.splice(nearest_ball.enemy_index, 1);
        scene.remove(enemies[nearest_ball.enemy_index]);
        //enemies[nearest_ball.enemy_index] = undefined;

        sphere.scaleMe({
            scale: Math.cbrt(Math.pow(sphere.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(sphere.getScale(), 2) * r_plus + 3 * sphere.getScale() * Math.pow(r_plus, 2))
        });

        sphere.setMaxSpeed(sphere.getScale());


    }

}