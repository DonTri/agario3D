function tweenForHunter(args) {
    var start = args.sphere.getScale();
    var end = args.scale;
    console.log("start"+ start + "end" + end);

    var duration = 2000;

    var tween = new TWEEN.Tween(start).to(end, duration);

    tween.onUpdate(function() {
        console.log(args);
        //console.log("start.x:" + start + "........start.y:" + start + "    ......start.z:" + start);
        args.sphere.scaleMe({
        scale: start
        }); // we scale the mesh


    });

    tween.easing(TWEEN.Easing.Linear.None);

    tween.start();


}

// function tweenForVictim(args) {
//     var start = ;
//     var end = ;
    
//     console.log("start"+ start + "end" + end);

//     var duration = 2000;

//     var tween = new TWEEN.Tween(start).to(end, duration);

//     tween.onUpdate(function() {
//         console.log(args);
//         //console.log("start.x:" + start + "........start.y:" + start + "    ......start.z:" + start);
//         args.sphere.scaleMe({
//         scale: start
//         }); // we scale the mesh


//     });

//     tween.easing(TWEEN.Easing.Linear.None);

//     tween.start();


// }