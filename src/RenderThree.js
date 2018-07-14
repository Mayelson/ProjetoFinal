if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var params = location.search.slice(1);
var fase = params.split('=')[1];
// var fase = chaveValor[1];
let camera, renderer, scene, sound, controls, dataGui; 
let areaWidth = 1075;	
let areaHeight = 510;
var keyboard = {};
var objects = [];
var valuesForReturns = {}; 
var player = { width:60, height:8, speed:1.8, turnSpeed:Math.PI*0.005 };
var options = null;
var isActiveAuto = false;
var elementArea = null;


var raycaster;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();
var controlsEnabled = false;
/************************************Inicio initLoadingManager***********************/
function initLoadingManager() {

	const manager = new THREE.LoadingManager();
	const progressBar = document.getElementById("progressBar");
	const loadingOverlay = document.getElementById("progressBarContainer");
	const texProgressBar = document.getElementById("texProgressBar");

	let percentComplete = 1;
	let frameID = null;

 	const updateAmount = 5; // in percent of bar width, should divide 100 evenly
 	
 	var tempoInicial = Date.now();
 	
 	const animateBar = () => {
 		percentComplete += updateAmount;

	    // if the bar fills up, just reset it.
	    if ( percentComplete >= 100 ) {
	    	// progressBar.style.backgroundColor = 'green'
	    	percentComplete = 1;
	    }

	    progressBar.style.width = percentComplete + '%';
	    texProgressBar.innerHTML = percentComplete + "%";

	    frameID = requestAnimationFrame( animateBar )
	}
	// enquanto carrega os modelos executa esta funcao
	manager.onStart = () => {
	    // prevent the timer being set again
	    // if onStart is called multiple times
	    if ( frameID !== null ) return;

	    animateBar();
	};
	// depois de terminar de carregar todos os modelos e texturas executa esta
	manager.onLoad = function ( ) {

		loadingOverlay.classList.add( 'progress-bar-container-hidden' );
		// area.style.display = 'flex';
	    // reset the bar in case we need to use it again
	    percentComplete = 0;
	    progressBar.style.width = 0;
	    cancelAnimationFrame( frameID );
	    var duracao = (Date.now() - tempoInicial)/1000;
	    console.log("Demorou" + " " + duracao + " " +"segundos"+" " + "a ser carregado");
	    
	    initAudio();
	    guiData();
	    
	};

	manager.onError = function ( e ) { 

		console.error( e ); 
		progressBar.style.backgroundColor = 'red';

	}

	return manager;
}
/************************************Fim initLoadingManager***********************/

function pointerLock(){
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
	if ( havePointerLock ) {
		console.log("chegou")
		var pointerlockchange = function ( event ) {
			if ( document.pointerLockElement === elementArea || document.mozPointerLockElement === elementArea || document.webkitPointerLockElement === elementArea ) {
				controlsEnabled = true;
				controls.enabled = true;
				blocker.style.display = 'none';
				console.log("chegou adasd")

			} else {
				controls.enabled = false;
				blocker.style.display = 'block';
				instructions.style.display = '';
				console.log("chegolllllllllllllllllllllllllu")

			}
		};
		var pointerlockerror = function ( event ) {
			instructions.style.display = '';
		};
		// Hook pointer lock state change events
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
		instructions.addEventListener( 'click', function ( event ) {
			instructions.style.display = 'none';
			// Ask the browser to lock the pointer
			elementArea.requestPointerLock = elementArea.requestPointerLock || elementArea.mozRequestPointerLock || elementArea.webkitRequestPointerLock;
			elementArea.requestPointerLock();
		}, false );
	} else {
		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
	}

}
/************************************Inicio init***********************/
function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	elementArea = document.getElementById("area");
	
	dataGui = new dat.GUI();
	var elementDataGui = dataGui.domElement.offsetParent;

	elementArea.append(renderer.domElement);
	elementArea.appendChild(elementDataGui);
	scene = new THREE.Scene();


	scene.background = new THREE.Color( 0xffffff );

	// Setup the camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 200000);
	//camera.position.set(player.width, player.height, -172);
	//camera.lookAt(new THREE.Vector3(player.width, player.height, 0));

	controls = new THREE.PointerLockControls(camera);
	
	scene.add( controls.getObject());
	console.log('ola mundo', controls.getObject());
	// Add the lights 
	var light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );          
	light.position.set( -120, 80, 40 );
	scene.add( light );

/*
	function keyDown(event){
		keyboard[event.keyCode] = true;
	}

	function keyUp(event){
		keyboard[event.keyCode] = false;
	}

	window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUp);*/

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			// case 38: // up
			case 87: // w
			moveForward = true;
			break;

			// case 37: // left
			case 65: // a
			moveLeft = true; break;

			// case 40: // down
			case 83: // s
			moveBackward = true;
			break;

			// case 39: // right
			case 68: // d
			moveRight = true;
			break;

			// case 32: // space
			// if ( canJump === true ) velocity.y += 350;
			// canJump = false;
			// break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

				// case 38: // up
				case 87: // w
				moveForward = false;
				break;

				// case 37: // left
				case 65: // a
				moveLeft = false;
				break;

				// case 40: // down
				case 83: // s
				moveBackward = false;
				break;

				// case 39: // right
				case 68: // d
				moveRight = false;
				break;

			}

		};

		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );						


		//raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	}
	/************************************Fim init***********************/


	/************************************Inicio guiData***********************/
	function guiData() {
		options = {
			navigation:{
				speed: 1.8,
				turnSpeed:Math.PI*0.02, 
				autoNavigation: false
			},
			audio: {
				volume: 0.5,
				mute: false
			},
			reset: function() {
				this.audio.volume = 0.5;
				this.audio.mute = false;
				this.navigation.speed = 1.8;
				this.navigation.turnSpeed = Math.PI*0.005;
				this.autoNavigation = false;
			}
		}

		var audio =  dataGui.addFolder("Son");
		audio.add(options.audio, 'volume', 0, 1).onChange(function(){
			sound.setVolume(options.audio.volume);
		}).listen();
		audio.add(options.audio, 'mute').onChange(function(){
			if (sound.isPlaying) {
				sound.stop();
			}else{
				sound.play();
			}
		}).listen();
		audio.open();

		var navigation = dataGui.addFolder("Navigation");
		navigation.add(options.navigation, 'speed', 0.5, 20).onChange(function(){
			velocity.x *= options.navigation.speed;
		}).listen();
		navigation.add(options.navigation, 'turnSpeed', 0, 0.1, 0.001).onChange(function(){
			player.turnSpeed = Math.PI*options.navigation.turnSpeed;
		}).listen();
		navigation.open();
		navigation.add(options.navigation, 'autoNavigation').onChange(function(){
			if (isActiveAuto === true ) {
				console.log("Disabled auto navigation");
				isActiveAuto = false;
			}else{
				console.log("Activated auto navigation");
				isActiveAuto = true;
			}
		}).listen();

		dataGui.add(options, 'reset')
	}
	/************************************Fim guiData***********************/


	/************************************Inicio initMesshesFirstFase***********************/
	function initMesshesFirstFase() {
		var casaA, casaB, terreno;
		var arvore, arvore2, arvore3, arvore4, arbustos;
		var barraca;
		var max_displacement = 0.2;
		var scale = 2;
		const manager = initLoadingManager();
		const loader = new THREE.JSONLoader(manager);
		var geometry = new THREE.BoxGeometry( 200000, 160000, 200000 );

		loader.load( "../src/models/fase1Texture.json", addModelToScene, manager.onProgress, manager.onError);
		// After loading JSON from our file, we add it to the scene
		function addModelToScene( geometry, materials ) {
			var casaA = new THREE.Mesh( geometry, materials );
			casaA.scale.set(40,40,40);
			casaA.position.y = -40;
			casaA.position.z = -20;
			casaA.position.x = -210;
			scene.add( casaA );
			objects.push(casaA);
		}

		loader.load( "../src/models/buildB.json", addModelToScene2, manager.onProgress, manager.onError);
		// After loading JSON from our file, we add it to the scene
		function addModelToScene2( geometry, materials ) {
			casaB = new THREE.Mesh( geometry, materials );
			casaB.scale.set(40,40,40);
			casaB.position.y = -40;
			casaB.position.z = 0;
			casaB.position.x = -220;
			casaB.name = "casaB";
			scene.add( casaB );
			objects.push(casaB);
		}

		loader.load( "../src/models/gradient.json", addModelToScene3, manager.onProgress, manager.onError);
		// After loading JSON from our file, we add it to the scene
		function addModelToScene3( geometry, materials ) {
			terreno = new THREE.Mesh( geometry, materials );
			terreno.scale.set(20,20,20);
			terreno.position.y = -40;
			terreno.position.z = -500;
			terreno.position.x = Math.PI/2;
			scene.add( terreno );
		}

		loader.load( "../src/models/arbustosv3.json", addModelToScene5, manager.onProgress, manager.onError);
		// After loading JSON from our file, we add it to the scene
		function addModelToScene5( geometry, materials ) {
			arbustos = new THREE.Mesh( geometry, materials );
			arbustos.scale.set(0.3,0.3,0.3);
			arbustos.position.y = -40;
			arbustos.position.z = 100;
			arbustos.position.x = -550;
			scene.add( arbustos );
		}

		loader.load( "../src/models/sobreiro.json", addModelToScene12);
		// After loading JSON from our file, we add it to the scene
		function addModelToScene12( geometry, materials ) {
			arvore4 = new THREE.Mesh( geometry, materials );
			arvore4.scale.set(30,30,30)
			arvore4.position.y = -40;
			arvore4.position.z = -200;
			arvore4.position.x = -500;
			arvore4.name = "sobreiro";
			var arvore5 = arvore4.clone();
			arvore5.scale.set(40,40,40)
			arvore5.position.y = -40;
			arvore5.position.z = -500;
			arvore5.position.x = -300;
			scene.add( arvore4 );
			scene.add( arvore5 );
			objects.push(arvore4);
			objects.push(arvore5);
		}

		loader.load( "../src/models/barraca.json", addModelToScene13, manager.onProgress, manager.onError);
		// After loading JSON from our file, we add it to the scene
		function addModelToScene13( geometry, materials ) {
			barraca = new THREE.Mesh( geometry, materials );
			barraca.scale.set(40,40,40)
			barraca.position.y = -40;
			barraca.position.z = -400;
			barraca.position.x = -500;
			scene.add( barraca );
		}
		initTexture(manager); 
		// //Load Textures
		// var imagePrefix = "../src/img/mirobriga/panoramica/";
		// var directions = ["posx","negx","","","posz","negz"];
		// var imageSuffix = ".jpg";
		// var cubeMaterials = [];
		// for(var i = 0; i < 6; i++ )
		// 	cubeMaterials.push(new THREE.MeshBasicMaterial({
		// 		map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix),
		// 		side: THREE.BackSide
		// 	}));
		// var cube = new THREE.Mesh( geometry, cubeMaterials );
		// cube.position.set(50000,59000,0);
		// scene.add( cube );
		// cube.rotation.y=9;
}
	/************************************Fim initMesshesFirstFase***********************/


/************************************Inicio animate***********************/
function initTexture(manager) {

	// instantiate a loader
	var geometry = new THREE.BoxGeometry( 200000, 160000, 200000 );
	var imagePrefix = "../src/img/mirobriga/panoramica/";
	var directions = ["posx","negx","posy","posy","posz","negz"];
	var imageSuffix = ".jpg";
	// var url = imagePrefix + directions[i] + imageSuffix;
	var cubeMaterials = [];
	var loader = new THREE.TextureLoader(manager);

	for(var i = 0; i < 6; i++ )
		// if (imagePrefix + directions[i] + imageSuffix === "../src/img/mirobriga/panoramica/.jpg") {continue;}
	cubeMaterials.push(new THREE.MeshBasicMaterial({
		map: loader.load(imagePrefix + directions[i] + imageSuffix, undefined, manager.onProgress),
		side: THREE.BackSide
	}));
	var cube = new THREE.Mesh( geometry, cubeMaterials );
	cube.position.set(50000,59000,0);
	scene.add( cube );
	cube.rotation.y=9;
}
/************************************Fim initMesshesFirstFase***********************/


/************************************Inicio animate***********************/
function animate() {
	

	detectColision();
	requestAnimationFrame( animate );	
	renderer.render(scene, camera);

}
/************************************Fim animate***********************/


/************************************Inicio controls***********************/
function listenControls(key) {


	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;

	velocity.x -= velocity.x * 5.0 * delta;
	velocity.z -= velocity.z * 5.0 * delta;



	direction.z = Number( moveForward ) - Number( moveBackward );
	direction.x = Number( moveLeft ) - Number( moveRight );
					direction.normalize(); // this ensures consistent movements in all directions

					if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
					if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

					controls.getObject().translateX( velocity.x * delta );
					controls.getObject().translateY( velocity.y * delta );
					controls.getObject().translateZ( velocity.z * delta );

					if ( controls.getObject().position.y < 10 ) {

						velocity.y = 0;
						controls.getObject().position.y = 10;

						canJump = true;

					}

					prevTime = time;
	/*if(keyboard[87] || key == 87){ // W key
	//   if (camera.position.z < 281) {		
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	 //console.log("x", camera.position);
	}
	if(keyboard[83] || key == 83){ // S key

		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65] || key == 63){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68] || key == 68){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37] || key == 37){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39] || key == 39){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}*/
}
/************************************Fim controls***********************/


/************************************Inicio detectColision***********************/
function detectColision() {
	var prev_pos_x = controls.getObject().position.x;
	var prev_pos_z = controls.getObject().position.z;
	player.mesh = new THREE.Object3D();
	listenControls();
	player.rays = [
	new THREE.Vector3(0, 0, 1),
	new THREE.Vector3(1, 0, 1),
	new THREE.Vector3(1, 0, 0),
	new THREE.Vector3(1, 0, -1),
	new THREE.Vector3(0, 0, -1),
	new THREE.Vector3(-1, 0, -1),
	new THREE.Vector3(-1, 0, 0),
	new THREE.Vector3(-1, 0, 1)
	];

	player.raycaster = new THREE.Raycaster();
	var i, collisions;
	if((controls.getObject().position.x > 660 && controls.getObject().position.x < 670) || (controls.getObject().position.x < -694 && controls.getObject().position.x > - 704) || (controls.getObject().position.z > 850 && controls.getObject().position.z < 950 ) || (controls.getObject().position.z < -850 && controls.getObject().positionn.z > -950) ){
		
		prev_pos_x = controls.getObject().position.x;
		prev_pos_z = controls.getObject().position.z;
	}
	if(controls.getObject().position.x > 670 || controls.getObject().position.x < -704 || controls.getObject().position.z > 950 || controls.getObject().position.z < -950 ){
		
		controls.getObject().position.x = prev_pos_x;
		controls.getObject().position.z = prev_pos_z;
	}
	
	for(i = 0; i<player.rays.length; i++){
		player.raycaster.set(controls.getObject().position, player.rays[i] );
		collisions = player.raycaster.intersectObjects(objects);
		if(collisions.length > 0){
			
			if(collisions[0].distance > 4 && collisions[0].distance < 10){
				prev_pos_x = controls.getObject().position.x;
				prev_pos_z = controls.getObject().position.z;
			}
			if(collisions[0].distance < 3){

				controls.getObject().position.x = prev_pos_x;
				controls.getObject().position.z = prev_pos_z;
			}
		}
	}
}
/************************************Fim detectColision***********************/

/************************************Inicio initAudio***********************/
function initAudio(){
	// create an AudioListener and add it to the camera
	var listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	sound = new THREE.Audio( listener );
	// load a sound and set it as the Audio object's buffer
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load( '../src/sounds/Vento.wav', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume(0.5);
		sound.play();
	});
	// sessionStorage.setItem('modelIsLoaded', true);

}
/************************************Fim initAudio***********************/


/************************************Inicio Fim Full Screen***********************/
function openScreen() {
	console.log("entrou")
	if(IsFullScreenCurrently()){
		GoOutFullscreen();
	}
	else{
		var element = document.getElementsByTagName("canvas")[0]
		element.style.width =  "100%";
		element.style.height = "100%";
		element.style.margin = "0";
		var el = document.getElementById("area")
		GoInFullscreen(el);
		GoInFullscreen(el);
		el.style.width =  "100%";
		el.style.height = "100%";
		el.style.margin = "0";
	}
}
/* Get into full screen */
function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}
/* Get out of full screen */
function GoOutFullscreen() {

	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}
/* Is currently in full screen or not */
function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	
	// If no element is in full-screen
	if(full_screen_element === null)
		return false;
	else
		return true;
}
/************************************Fim Full Screen***********************/


if (fase == 1) {
	pointerLock();
	init();
	initMesshesFirstFase();
	animate();
	
}else if (fase == 2 ) {
	alert("A função: initMesshesSecondFase() falta implementar");
	// init();
	// initMesshesSecondFase();
	// animate();
}else{
	console.log("not found")
	window.location.href = "http://localhost:8080/notFound.html";
}

