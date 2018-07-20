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
var player = { width:60, height:8, speed: 0.2, turnSpeed:Math.PI*0.005 };
var options = null;
var isActiveAuto = false;
var elementArea = null;
var controlsButtons = false;

var raycaster;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();
var mixer, facesClip, bonesClip,helper;
var time=0;
var count=0;
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();
var tube;
var splineCamera;
var parent;
var cont = 1;
var looptime = 350000;
var vertices = [];
var path;
var spline;
var drenos;


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

	    var blocker = document.getElementById( 'blocker' );
	    blocker.style.display = "block";
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

		var pointerlockchange = function ( event ) {
			if ( document.pointerLockElement === elementArea || document.mozPointerLockElement === elementArea || document.webkitPointerLockElement === elementArea ) {
				controls.enabled = true;
				blocker.style.display = 'none';
			} else {
				controls.enabled = false;
				blocker.style.display = 'block';
				instructions.style.display = '';
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
	elementArea.append(renderer.domElement);
	
	dataGui = new dat.GUI();
	var elementDataGui = dataGui.domElement.offsetParent;
	elementArea.appendChild(elementDataGui);

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );

	// Setup the camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 200000);
	//camera.position.set(player.width, player.height, -172);
	//camera.lookAt(new THREE.Vector3(player.width, player.height, 0));
	controls = new THREE.PointerLockControls(camera);
	scene.add( controls.getObject());

	// Add the lights 
	var light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );          
	light.position.set( -120, 80, 40 );
	scene.add( light );


	parent = new THREE.Object3D();
	scene.add( parent );

	// splineCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 200000 );
	// controls = new THREE.PointerLockControls(splineCamera);
	// parent.add( splineCamera );

	// //splineCamera.position.x = cordX[0];
	// splineCamera.position.y = 10;
	//splineCamera.position.z = cordY[0];  


	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );						
}
/************************************Fim init***********************/

function onKeyDown( event ) {
	switch ( event.keyCode ) {
		// case 38: // up
		case 87: // w
		if(isActiveAuto==true){
			//splineCamera.rotation.y = controls.getObject().rotation.y;
			
			time++;
			time++;
			time++;
			time++;
			time++;
			time++;
		drawPath();
		}
		    
		return moveForward = true;

		break;
		// case 37: // left
		case 65: // a
		return moveLeft = true;
		break;
		// case 40: // down
		case 83: // s
		return moveBackward = true;
		break;
		// case 39: // right
		case 68: // d
		return moveRight = true;
		break;		
	}

};

function onKeyUp( event ) {

	switch( event.keyCode ) {

				// case 38: // up
				case 87: // w
				return	moveForward = false;
				break;

				// case 37: // left
				case 65: // a
				return	moveLeft = false;
				break;

				// case 40: // down
				case 83: // s
				return moveBackward = false;
				break;

				// case 39: // right
				case 68: // d
				return moveRight = false;
				break;

			}

		};

		/************************************Inicio guiData***********************/
		function guiData() {
			var navegationButtonsElement = document.getElementById("btnNavigationWalk");
			var blocker = document.getElementById( 'blocker' );
			options = {
				navigation:{
					speed: 0.2, 
					autoNavigation: false,
					controlsButtons: false
				},
				audio: {
					volume: 0.5,
					mute: false
				},
				reset: function() {
					this.audio.volume = 0.2;
					this.audio.mute = false;
					this.navigation.speed = 300;
					this.autoNavigation = false;
					this.controlsButtons = false;
				}
			}

			var audio =  dataGui.addFolder("Audio");
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
			navigation.add(options.navigation, 'speed', 0.1, 1).onChange(function(){
				player.speed = options.navigation.speed;
			}).listen();
			navigation.add(options.navigation, 'controlsButtons').onChange(function(){
				if (controlsButtons === true ) {
					console.log("Disabled controls");
					navegationButtonsElement.style.display = "none";
					blocker.style.display = "block";
					controlsButtons = false;

				}else{

					console.log("Activated controls");
					navegationButtonsElement.style.display = "block";
					blocker.style.display = "none";
					controls.enabled = false;
					controlsButtons = true;
				}
			}).listen();
			navigation.open();
			navigation.add(options.navigation, 'autoNavigation').onChange(function(){
				if (isActiveAuto === true ) {

					console.log("Disabled auto navigation");
					isActiveAuto = false;
				}else{
					console.log("Activated auto navigation");

				controls.getObject().position.x = cordX[0];				
				controls.getObject().position.z = cordZ[0];  
				controls.getObject().rotation.y = -2.0;

				isActiveAuto = true;
					

				}
			}).listen();

			dataGui.add(options, 'reset')
		}
		/************************************Fim guiData***********************/



		/************************************Inicio initMesshesFirstFase***********************/
		function initMesshesFirstFase() {
			var casaA, casaB, terreno, animation;
			var arvore, arvore2, arvore3, arvore4,arvoreNova, arbustos, arvoreNova2;
			var barraca;
			var max_displacement = 0.2;
			var scale = 2;
			const manager = initLoadingManager();
			const loader = new THREE.JSONLoader(manager);
			var geometry = new THREE.BoxGeometry( 200000, 160000, 200000 );
			//primeira fase
			if (fase == 1) {
				loader.load( "../src/models/buildA.json", addModelToScene, manager.onProgress, manager.onError);
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


				loader.load( "../src/models/arvoreV9.json", addModelToScene15, manager.onProgress, manager.onError);
				function addModelToScene15( geometry, materials ) {
					arvoreNova = new THREE.Mesh( geometry, materials );
					arvoreNova.scale.set(40,40,40);
					arvoreNova.position.y = -40;
					arvoreNova.position.z = 200;
					arvoreNova.position.x = -550;
					arvoreNova.name = "arvoreNova";
					scene.add( arvoreNova );
					objects.push(arvoreNova);
				}


				loader.load( "../src/models/arvoreV10.json", addModelToScene16, manager.onProgress, manager.onError);
				function addModelToScene16( geometry, materials ) {
					arvoreNova2 = new THREE.Mesh( geometry, materials );
					arvoreNova2.scale.set(20,20,20);
					arvoreNova2.position.y = -40;
					arvoreNova2.position.z = 600;
					arvoreNova2.position.x = -550;
					arvoreNova2.name = "arvoreNova";
					scene.add( arvoreNova2 );
					objects.push(arvoreNova2);
				}

				loader.load( "../src/models/gradient.json", addModelToScene3, manager.onProgress, manager.onError);
				// After loading JSON from our file, we add it to the scene
				function addModelToScene3( geometry, materials ) {
					terreno = new THREE.Mesh( geometry, materials );
					terreno.scale.set(12,12,12);
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

				loader.load( "../src/models/drenos.json", addModelToScene13);
				// After loading JSON from our file, we add it to the scene
				function addModelToScene13( geometry, materials ) {
					drenos = new THREE.Mesh( geometry, materials );
					drenos.scale.set(40,40,40)
					drenos.position.y = -40;
					drenos.position.z = -20;
					drenos.position.x = -210;
					scene.add(drenos);

				}


				loader.load( "../src/models/knight.json", addModelToScene20);
				// After loading JSON from our file, we add it to the scene
				function addModelToScene20( geometry, materials ) {
						createScene( geometry, materials, 0, -40, -40, 5 );
				}


			} else if (fase == 2) {
				console.log("Fase 2 A carregar");
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
	function createScene( geometry, materials, x, y, z, s ) {

				//ensureLoop( geometry.animation );

				geometry.computeBoundingBox();
				var bb = geometry.boundingBox;
			    for ( var i = 0; i < materials.length; i ++ ) {

					var m = materials[ i ];
					m.skinning = true;
					m.morphTargets = true;

					m.specular.setHSL( 0, 0, 0.1 );

					m.color.setHSL( 0.6, 0, 0.6 );

				}

				animation = new THREE.SkinnedMesh( geometry, materials );
				animation.name = "Knight animation";
				animation.position.set( x,-40, z );
				animation.scale.set( s, s, s );
				scene.add( animation );

				animation.castShadow = true;
				animation.receiveShadow = true;

				helper = new THREE.SkeletonHelper( animation );
				helper.material.linewidth = 3;
				helper.visible = false;
				scene.add( helper );

				mixer = new THREE.AnimationMixer( animation );

				bonesClip = geometry.animations[0];
				facesClip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'facialExpressions', animation.geometry.morphTargets, 3 );

			

			}


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
function drawPath(){

	if(time < cordX.length){
	controls.getObject().position.x =  cordX[time];
	controls.getObject().position.z =  cordZ[time];


	  if (isActiveAuto) {
         cont++;
         if (!(cont > 0 && cont < looptime)) {
         	cont = 0;
         }
     }
 }else{
 	isActiveAuto=false;
 	time=0;
 }
}
/************************************Inicio animate***********************/
function animate() {

	detectColision();
	render();
	requestAnimationFrame( animate );	


}
/************************************Fim animate***********************/



function render(){

	renderer.render( scene, isActiveAuto === true ? camera : camera );

}

/************************************Inicio controls***********************/
function listenControls() {
	if ((controls.enabled === true && controlsButtons === false) || (controls.enabled === false && controlsButtons === true)) {
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		
	
		velocity.x -= velocity.x * 5.0 * delta;
		velocity.z -= velocity.z * 5.0 * delta;
		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveLeft ) - Number( moveRight );
		direction.normalize(); // this ensures consistent movements in all directions

		//para a normalizar colocamos o player.speed entre 0 e 1 e temos que multiplicar por 2000 == valor Max
		if ( moveForward || moveBackward ) velocity.z -= direction.z * player.speed * 2000 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * player.speed * 2000 * delta; 
 
		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );
		prevTime = time;
	
	}
}
/************************************Fim controls***********************/


function eventWalk(key){
	var event = { keyCode: key}
	onKeyDown(event);
}


function eventWalkStop(key){
	var event = { keyCode: key}
	onKeyUp(event);
}


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
    //         console.log(time + "-X" + controls.getObject().position.x+"K");
	 		// console.log(time + "-Z" + controls.getObject().position.z+"K");
	 		//  time++;
  
    count++;
    player.raycaster = new THREE.Raycaster();
    var i, collisions;
    if((controls.getObject().position.x > 660 && controls.getObject().position.x < 670) || (controls.getObject().position.x < -694 && controls.getObject().position.x > - 704) || (controls.getObject().position.z > 850 && controls.getObject().position.z < 950 ) || (controls.getObject().position.z < -850 && controls.getObject().position.z > -950) ){

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

// cilpControl( gui, mixer, bonesClip, [ null, animation] );
// clipControl( gui, mixer, facesClip, [ null, animation ] );
/************************************Inicio initAudio***********************/
function initAudio(){
	// create an AudioListener and add it to the camera
	var listener = new THREE.AudioListener();
	camera.add( listener );
	//splineCamera.add( listener);
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
}
/************************************Fim initAudio***********************/

function translate() {
	alert("A tradução ainda não foi implementada");
}
/************************************Inicio Fim Full Screen***********************/
function openScreen() {
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
		pointerLock();

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

