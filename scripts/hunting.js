//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*	  Function that checks the distances between balls and choose if someone eat another    */
/* 									or trying to catch him									*/

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function weEat() {
    var enemy_pos, distance, r_plus;
    var mainBall_pos = mainBall.getPosition();

    for (var i = enemies.length - 1; i >= 0; i--) {
        enemy_pos = enemies[i].getPosition();
        distance = Math.sqrt(Math.pow((mainBall_pos.x - enemy_pos.x), 2) + Math.pow((mainBall_pos.y - enemy_pos.y), 2));
        // console.log(distance);
        if (mainBall.getScale() > enemies[i].getScale() && mainBall.getScale() > distance) {

            r_plus = enemies[i].getScale() / 3;

            enemies[i].removeMe();
            enemies.splice(i, 1);
            //enemies[nearest_ball.enemy_index] = undefined;

            /*mainBall.scaleMe({
                scale: Math.cbrt(Math.pow(mainBall.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(mainBall.getScale(), 2) * r_plus + 3 * mainBall.getScale() * Math.pow(r_plus, 2))
            });*/

            tweenForHunter({
                sphere: mainBall,
                scale: Math.cbrt(Math.pow(mainBall.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(mainBall.getScale(), 2) * r_plus + 3 * mainBall.getScale() * Math.pow(r_plus, 2))
            });

            mainBall.setMaxSpeed(mainBall.getScale());


        }
    }
}

// Function that check distances and send spheres to attack and eat
function hunting(sphere, j) {
    var victim_pos, distance, r_plus;
    var hunter_pos = sphere.getPosition();

    var nearest_ball = { //We use this object to save the closest enemy to the sphere that we check
        min: 150 + sphere.getScale(),
        enemy_index: -1
    };

    for (var i = enemies.length - 1; i >= 0; i--) { //finds the closest enemy
        if (i != j) {
            victim_pos = enemies[i].getPosition();
            distance = Math.sqrt(Math.pow((hunter_pos.x - victim_pos.x), 2) + Math.pow((hunter_pos.y - victim_pos.y), 2));
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
        sphere.setDirection({
            x: enemies[nearest_ball.enemy_index].getPosition().x - hunter_pos.x,
            y: enemies[nearest_ball.enemy_index].getPosition().y - hunter_pos.y
        });

    }

    function abort() {

        sphere.setDirection({
            x: hunter_pos.x - enemies[nearest_ball.enemy_index].getPosition().x,
            y: hunter_pos.y - enemies[nearest_ball.enemy_index].getPosition().y,
        });

    }

    // Function that remove the victim from the scene and increase the scale of the attacker
    function eat() {
        var r_plus;
        r_plus = enemies[nearest_ball.enemy_index].getScale() / 3;

        enemies[nearest_ball.enemy_index].removeMe();
        enemies.splice(nearest_ball.enemy_index, 1);
        //scene.remove(enemies[nearest_ball.enemy_index]);
        //enemies[nearest_ball.enemy_index] = undefined;

        sphere.scaleMe({
            scale: Math.cbrt(Math.pow(sphere.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(sphere.getScale(), 2) * r_plus + 3 * sphere.getScale() * Math.pow(r_plus, 2))
        });

        /*tweenForEating({
            sphere: sphere,
            scale: Math.cbrt(Math.pow(sphere.getScale(), 3) + Math.pow(r_plus, 3) + 3 * Math.pow(sphere.getScale(), 2) * r_plus + 3 * sphere.getScale() * Math.pow(r_plus, 2))
        });*/

        sphere.setMaxSpeed(sphere.getScale());


    }

}