var Device = {
	isDragging: false,

	init: function() {
		var container, stats;

		var camera, scene, renderer;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		var raycaster = new THREE.Raycaster(); // create once

		var time = 0;
		var stats;

		var targetList = [];
		var projector, mouse = {
			x: 0,
			y: 0
		};

		var worldWidth = 16,
			worldDepth = 16,
			worldHalfWidth = worldWidth / 2,
			worldHalfDepth = worldDepth / 2;

		var clock = new THREE.Clock();

		init();
		animate();

		function init() {

			container = document.createElement('div');
			document.body.appendChild(container);


			camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 4000);

			camera.position.x = 0;
			camera.position.y = 300;
			camera.position.z = 200;

			camera.up = new THREE.Vector3(0, 1, 0);
			camera.lookAt(new THREE.Vector3(0, 0, 0));


			scene = new THREE.Scene();
			projector = new THREE.Projector();
			scene.fog = new THREE.Fog(0x000000, 100, 4000);

			Ship.init(scene);

			var ambient = new THREE.AmbientLight(0xffffff);
			scene.add(ambient);

			var directionalLight = new THREE.DirectionalLight(0xffeedd);
			directionalLight.position.set(0, 0, 1).normalize();
			scene.add(directionalLight);

			renderer = new THREE.WebGLRenderer({
				//antialias':true,
				//alpha: false
				//clearAlpha: 1
				//premultipliedAlpha: true
			});

			renderer.setClearColor(0xcccccc, 1);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.sortObjects = false;

			container.appendChild(renderer.domElement);

			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			container.appendChild(stats.domElement);

			window.addEventListener('resize', onWindowResize, false);

			window.addEventListener('mousemove', onWindowMouseMove, false);
			window.addEventListener('mousedown', onWindowStartDrag, false);
			window.addEventListener('mouseup', onWindowStopDrag, false);

			window.addEventListener('touchmove', onWindowMouseMove, false);
			window.addEventListener('touchstart', onWindowStartDrag, false);
			window.addEventListener('touchend', onWindowStopDrag, false);

			//window.addEventListener( 'click', onWindowClick, false );

			Input.init();

		}

		function onWindowStartDrag() {
			Device.isDragging = true;
		}

		function onWindowStopDrag() {
			Device.isDragging = false;
		}

		function onWindowMouseMove(event) {
			if (Device.isDragging) {
				var planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), -120);
				var mv = new THREE.Vector3(
					(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1,
					0.5);


				raycaster.setFromCamera(mv, camera);

				var pos = raycaster.ray.intersectPlane(planeZ);

				Ship.moveTo(pos);
			}
		}


		function onWindowClick(event) {
			Device.isDragging = true;

			var planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), -120);
			var mv = new THREE.Vector3(
				(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1,
				0.5);
			var raycaster = projector.pickingRay(mv, camera);
			var pos = raycaster.ray.intersectPlane(planeZ);
			//console.log("x: " + pos.x + ", y: " + pos.y);

			Ship.moveTo(pos);
		}

		function onWindowResize() {

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

		}


		function animate() {

			requestAnimationFrame(animate);

			Input.update();

			Ship.updateBeforeRender();


			render();
			stats.update();
		}




		function render() {
			time += 0.02;


			renderer.render(scene, camera);
		}

	}
}
