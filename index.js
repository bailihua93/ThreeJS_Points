$(function () {
    console.log("exe");
    var WIDTH = $(window).width();
    var HEIGHT = $(window).height();

    // console.log(WIDTH + ";" + HEIGHT);
    var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 100000);
    camera.position.set(300, 300, 300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    var scene = new THREE.Scene();

    var axis = new THREE.AxisHelper(500);
    scene.add(axis);

    var webglRender = new THREE.WebGLRenderer({ antialias: true });
    webglRender.setSize(WIDTH, HEIGHT);
    webglRender.setClearColor(0x000000);
    document.querySelector("#container").appendChild(webglRender.domElement);

    var pointsArray;

    function makePoints() {
        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 5,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: createPoint(),
            depthTest: false
        });

        var geometry = new THREE.Geometry();

        for (var index = 0; index < 1000; index++) {
            geometry.vertices.push(new THREE.Vector3(
                Math.floor(Math.random() * (-300) + 300),
                Math.floor(Math.random() * (-300) + 300),
                Math.floor(Math.random() * (-300) + 300)
            ));
        }

        pointsArray = new THREE.Points(geometry, material);
        scene.add(pointsArray);

        function createPoint() {
            var canvas = document.createElement("canvas");
            canvas.width = 16;
            canvas.height = 16;

            var context = canvas.getContext("2d");
            var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
            gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');

            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }
    }

    function pointsAnimation() {
        pointsArray.geometry.vertices.forEach(function (p, i) {
            p.set(
                Math.floor(Math.random() * (-300) + 300),
                Math.floor(Math.random() * (-300) + 300),
                Math.floor(Math.random() * (-300) + 300)
            );
        });

        pointsArray.geometry.verticesNeedUpdate = true;
    }

    function render() {
        pointsAnimation();
        requestAnimationFrame(render);

        webglRender.render(scene, camera);
    }

    makePoints();
    render();
});