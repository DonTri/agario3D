//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*	  Function that checks the distances between balls and choose if someone eat another    */
/* 									or trying to catch him									*/

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function weEatOrDie() {


}


function theyEat() {

    var i = 0;

    while (i < enemies.length) {
        var hunting = true;
        var j = i + 1;
        var nearest_ball = {
            min: 50,
            hunter: -1,
            victim: -1
        };
        while (j < enemies.length && hunting == true) {

            var distance = Math.sqrt(((enemies[i].position.x - enemies[j].position.x) ^ 2) + (enemies[i].position.y - enemies[j].position.y) ^ 2);
            // console.log("x0...."+distance);
            if (enemies[i].radius > enemies[j].radius) {
                if (distance < enemies[i].radius) {
                    // console.log("x1...." + distance);
                    var r_plus = enemies[j].radius;
                    // enemies.splice(j, 1);
                    enemies[j].changeColor({
                        color: '0xff0000'
                    });
                    enemies[i].radius = Math.cbrt(enemies[i].radius ^ 3 + r_plus ^ 3 - 3 * enemies[i].radius ^ 2 * r_plus - 3 * enemies[i].radius * r_plus ^ 2);
                    j -= 1;

                } else if (distance < nearest_ball.min) {
                    // console.log("poutsa");
                    nearest_ball.min = distance;
                    nearest_ball.hunter = i;
                    nearest_ball.victim = j;

                }

            } else if (enemies[i].radius < enemies[j].radius) {

                if (distance < enemies[j].radius) {
                    // console.log("x2...." + distance);
                    var r_plus2 = enemies[i].radius;
                    enemies.splice(i, 1);
                    enemies[j].radius = Math.cbrt(enemies[j].radius ^ 3 + r_plus2 ^ 3 - 3 * enemies[j].radius ^ 2 * r_plus2 - 3 * enemies[j].radius * r_plus2 ^ 2);
                    hunting = false;
                    i -= 1;

                } else if (distance < nearest_ball.min) {
                    nearest_ball.min = distance;
                    nearest_ball.hunter = j;
                    nearest_ball.victim = i;

                }

            }
            j += 1;

        }

        /*if (nearest_ball.hunter > -1) {
            enemies[nearest_ball.hunter].direction.setX(enemies[nearest_ball.victim].position.x);
            enemies[nearest_ball.hunter].direction.setY(enemies[nearest_ball.victim].position.y);
            enemies[nearest_ball.hunter].direction.setZ(enemies[nearest_ball.victim].position.z);
            enemies[nearest_ball.hunter].direction.normalize();

            enemies[nearest_ball.victim].direction.setX(enemies[nearest_ball.hunter].position.x)
            enemies[nearest_ball.victim].direction.setY(enemies[nearest_ball.hunter].position.y)
            enemies[nearest_ball.victim].direction.setZ(enemies[nearest_ball.hunter].position.z)
            enemies[nearest_ball.victim].direction.normalize().multiplyScalar(-1);
        }*/

        i += 1;
    }

}