//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*	  Function that checks the distances between balls and choose if someone eat another    */
/* 									or trying to catch him									*/

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function weEat() {
    var distance;

    for (var i = enemies.length - 1; i >= 0; i--) {

        distance = Math.sqrt(Math.pow((mainBall.position.x - enemies[i].position.x), 2) + Math.pow((mainBall.position.y - enemies[i].position.y), 2));
        // console.log(distance);
        if (mainBall.getScale() > enemies[i].getScale() && mainBall.getScale() > distance) {

            enemies[i].changeColor({
                color: '0xff0000'
            });


        }
    }
}


function theyEat() {
    var r_plus;
    var i = 0;

    while (i < enemies.length) {
        var hunting = true;
        var j = i + 1;
        var nearest_ball = {
            min: 5,
            hunter: -1,
            victim: -1
        };
        while (j < enemies.length && hunting == true) {

            var distance = Math.sqrt(Math.pow((enemies[i].position.x - enemies[j].position.x), 2) + Math.pow((enemies[i].position.y - enemies[j].position.y), 2));

            if (enemies[i].getScale() > enemies[j].getScale()) {
                if (distance < enemies[i].getScale()) {

                    r_plus = enemies[j].getScale();
                    enemies.splice(j, 1);
                    /*enemies[j].changeColor({
                        color: '0xff0000'
                    });*/

                    enemies[i].scaleMe({
                        scale: Math.cbrt(Math.pow(enemies[i].getScale(), 3) + Math.pow(r_plus, 3) - 3 * Math.pow(enemies[i].getScale(), 2) * r_plus - 3 * enemies[i].getScale() * Math.pow(r_plus, 2))
                    });


                    j -= 1;

                } else if (distance < nearest_ball.min) {

                    nearest_ball.min = distance;
                    nearest_ball.hunter = i;
                    nearest_ball.victim = j;

                }

            } else if (enemies[i].getScale() < enemies[j].getScale()) {

                if (distance < enemies[j].getScale()) {

                    r_plus = enemies[i].getScale();
                    enemies.splice(i, 1);
                    /*enemies[i].changeColor({
                        color: '0xff0000'
                    });*/
                    enemies[j].scaleMe({
                        scale: Math.cbrt(Math.pow(enemies[j].getScale(), 3) + Math.pow(r_plus, 3) - 3 * Math.pow(enemies[j].getScale(), 2) * r_plus - 3 * enemies[j].getScale() * Math.pow(r_plus, 2))
                    });
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

        if (nearest_ball.hunter > -1) {
            enemies[nearest_ball.hunter].direction.setX(enemies[nearest_ball.victim].position.x);
            enemies[nearest_ball.hunter].direction.setY(enemies[nearest_ball.victim].position.y);
            enemies[nearest_ball.hunter].direction.setZ(enemies[nearest_ball.victim].position.z);
            enemies[nearest_ball.hunter].direction.normalize();

            enemies[nearest_ball.victim].direction.setX(enemies[nearest_ball.hunter].position.x)
            enemies[nearest_ball.victim].direction.setY(enemies[nearest_ball.hunter].position.y)
            enemies[nearest_ball.victim].direction.setZ(enemies[nearest_ball.hunter].position.z)
            enemies[nearest_ball.victim].direction.normalize().multiplyScalar(-1);
        }

        i += 1;
    }

}