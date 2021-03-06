var Ship = {
	prop: '',
	ship: '',
	rotZ: 0,
	targetPos: '',
	isLoaded: false,
	time: 0,

	init: function(scene) {

		var mtlLoader = new THREE.MTLLoader();
		var objLoader = new THREE.OBJLoader();

		mtlLoader.setPath('assets/spitfire/');
		mtlLoader.load('spitfire.mtl', function(materials) {
			materials.preload();
			objLoader.setMaterials(materials);
			objLoader.setPath('assets/spitfire/');
			objLoader.load('spitfire.obj', function(object) {

				object.position.set(0, 120, 100);

				Ship.targetPos = new THREE.Vector3(0, 120, 100);

				object.scale.set(5.0, 5.0, 5.0);
				scene.add(object);

				Ship.prop = object.children[10];
				Ship.ship = object;

				Ship.isLoaded = true;
			});
		});

	},

	time: 0,

	updateBeforeRender: function() {
		if (!Ship.isLoaded) {
			return;
		}

		Ship.time += 0.22;

		// moveTo

		if (Device.isDragging) {

			if (Math.abs(Ship.targetPos.x - Ship.ship.position.x) > 2.0) {
				if (Ship.targetPos.x < Ship.ship.position.x) {
					Ship.panLeft();
				} else {
					Ship.panRight();
				}
			}

			if (Math.abs(Ship.targetPos.z - Ship.ship.position.z) > 2.0) {
				if (Ship.targetPos.z < Ship.ship.position.z) {
					Ship.panForward();
				} else {
					Ship.panBack();
				}
			}

			Ship.ship.position.x = Ship.targetPos.x;
			Ship.ship.position.z = Ship.targetPos.z;

		}

		// move
		Ship.prop.rotation.set(0.0, 0.0, -Ship.rotZ + (-1 * Ship.time * 2));

		Ship.ship.rotation.set(0.0, 0.0, Ship.rotZ);

		if (Ship.rotZ > 0) {
			Ship.rotZ -= 0.04;
		}
		if (Ship.rotZ < 0) {
			Ship.rotZ += 0.04;
		}
	},

	moove: function(x, y) {

	},

	panLeft: function() {
		Ship.ship.position.x -= 2.0;
		if (Ship.rotZ < 1.1)
			Ship.rotZ += 0.08;
	},

	panRight: function() {
		Ship.ship.position.x += 2.0;

		if (Ship.rotZ > -1.1)
			Ship.rotZ -= 0.08;
	},

	panForward: function() {
		Ship.ship.position.z -= 2.0;
	},

	panBack: function() {
		Ship.ship.position.z += 2.0;
	},

	elevUp: function() {
		Ship.ship.position.y += 1.0;
	},

	elevDown: function() {
		Ship.ship.position.y -= 1.0;
	},
	moveTo: function(pos) {
		Ship.targetPos.x = pos.x;
		Ship.targetPos.y = pos.y; // flip
		Ship.targetPos.z = pos.z;
	}
}
