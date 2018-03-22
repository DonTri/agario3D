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
    scene.add(gridHelper);

    var texture = THREE.ImageUtils.loadTexture('img/pic.jpg');
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    var field = new THREE.Mesh(new THREE.PlaneGeometry(180, 140, 5, 5), material);

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