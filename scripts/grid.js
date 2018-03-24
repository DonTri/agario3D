//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

/*                  Creates a grid helper and a yellow bar in each axe                      */

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function createGrid() {

    var size = 500;
    var divisions = 50;

    var gridHelper = new THREE.GridHelper(size, divisions, '#0F512C', '#0F512C');
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -19;
    scene.add(gridHelper);


    var field = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 5, 5), new THREE.MeshLambertMaterial({
        color: 0xD8D8D8
    }));

    field.receiveShadow = true;
    field.position.z = -20;

    scene.add(field);

    var axesy = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, size, 4),
        new THREE.MeshBasicMaterial({
            color: '#FFFF00'
        })
    );
    // scene.add(axesy);

    var axesx = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, size, 4),
        new THREE.MeshBasicMaterial({
            color: '#FFFF00'
        })
    );
    axesx.rotation.z = Math.PI / 2;
    // scene.add(axesx);

    var axesz = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, size, 4),
        new THREE.MeshBasicMaterial({
            color: '#FFFF00'
        })
    );
    axesz.rotation.x = Math.PI / 2;
    // scene.add(axesz);


    return size;

}