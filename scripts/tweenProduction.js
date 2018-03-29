function tweenForHunter(args) {
    var start = args.sphere.getScale();
    var end = args.scale;
    var duration = 1000;


    // dilwse edw to object pou tha tweenareis
    var o = {
        scaleFactor: start
    };

    new TWEEN.Tween(o).to({
                scaleFactor: end
            },
            duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {

            args.sphere.scaleMe({
                scale: o.scaleFactor
            }); // we scale the mesh


        })
        .onComplete(function() {
            // edw teleiwnei
        })
        .start();


}



function tweenForVictim(args) {
    var start = args.sphere.getScale();
    var end = args.scale;
    console.log("start " + start + "end " + end);

    var duration = 1000;


    // dilwse edw to object pou tha tweenareis
    var o = {
        scaleFactor: start
    };

    new TWEEN.Tween(o).to({
                scaleFactor: end
            },
            duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {

            console.log(o.scaleFactor);

            args.sphere.scaleMe({
                scale: o.scaleFactor
            }); // we scale the mesh


        })
        .onComplete(function() {
            // edw teleiwnei
        })
        .start();


}


/*function tweenarisma() {
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


}*/