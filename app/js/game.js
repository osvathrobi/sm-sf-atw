function onDeviceReady(scene) {
	Ship.init(scene);
	Input.init();
};

function onAnimate() {
	Input.update();
	Ship.updateBeforeRender();
};

Device.init(onDeviceReady, onAnimate);
