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
var player = { width:60, height:8, speed: 0.25, turnSpeed:Math.PI*0.005 };
var options = null;
var isActiveAuto = false;
var elementArea = null;
var controlsButtons = false;
var semaforo = 0;
var RADIUS = 20;
var x = 50;
var y = 50;

var raycaster;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var isDoorOpen = false;


var doors=[];

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();
var close = true;
var timeDoor = 0;
var tube;
var parent;
var cont = 0;
var looptime = 350000;
var path;
var spline;
var drenos;
var camaraAuto;
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();

var crono = 0;
var mixer, mixer2, mixer3, mixer4, mixer5, mixer6, mixer7, facesClip, bonesClip,helper;
var animation, animation2, animation3, animation4, animation5, animation6, animation7;
var animationClips = [];
var pipeSpline = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -229,0, -165 ),
	new THREE.Vector3(142,0, -165 ),
	new THREE.Vector3(243,0, -121 ),
	new THREE.Vector3(282,0, -231),
	new THREE.Vector3(132,0, -178),
	new THREE.Vector3(70,0, -197),
	new THREE.Vector3(90,0, -291), 
	new THREE.Vector3(291,0, -291),
	new THREE.Vector3(291, 0, -310),
	new THREE.Vector3(43, 0, -310),
	new THREE.Vector3(43, 0, -210),
	new THREE.Vector3(-270, 0, -160),
	//casa2
	new THREE.Vector3( -275, 0, 400 ),
	new THREE.Vector3( 40, 0, 395 ),
	new THREE.Vector3( 105, 0, 411 ),
	new THREE.Vector3( 217, 0, 432 ),
	new THREE.Vector3( 290, 0, 465 ),
	new THREE.Vector3( 310, 0, 223 ),
	new THREE.Vector3( 310, 0, 170 ), 
	new THREE.Vector3( 155, 0, 170 ), 
	new THREE.Vector3( 155, 0, 215 ),
	new THREE.Vector3( 200, 0, 215 ),
	new THREE.Vector3( 270, 0, 190), 
	new THREE.Vector3( 300, 0, 310),
	new THREE.Vector3( 90, 0, 340),
	new THREE.Vector3( 80, 0, 160),
	new THREE.Vector3( 30, 0, 160),
	new THREE.Vector3( 30, 0, 190),
	new THREE.Vector3( 60, 0, 244 ),
	new THREE.Vector3( 55, 0, 375 ),
	new THREE.Vector3( -150, 0, 375)
	] );

var paramsPipe = {
	spline: 'PipeSpline',
	scale: 4,
	extrusionSegments: 100,
	radiusSegments: 3,
	closed: true,
	animationView: false,
	lookAhead: false,
	cameraHelper: false,
};

var materialPipe = new THREE.MeshLambertMaterial( { color: 0xff00ff } );

var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.3, wireframe: true, transparent: true } );

var splines = {
	
	PipeSpline: pipeSpline,
	SampleClosedSpline: sampleClosedSpline
};
var tubeGeometry;
var clock = new THREE.Clock();
var sampleClosedSpline = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( 0, -40, -40 ),
	new THREE.Vector3( 0, 40, -40 ),
	new THREE.Vector3( 0, 140, -40 ),
	new THREE.Vector3( 0, 40, 40 ),
	new THREE.Vector3( 0, -40, 40 )
	] );
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
    ///camera.lookAt(new THREE.Vector3(player.width, player.height, 0));
    controls = new THREE.PointerLockControls(camera);
    scene.add( controls.getObject());

	// Add the lights 
	var light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );          
	light.position.set( -120, 80, 40 );
	scene.add( light );



	parent = new THREE.Object3D();
	scene.add( parent );



	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );						
}
/************************************Fim init***********************/

function pointerLock(){
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	

	var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
	if ( havePointerLock ) {

		var pointerlockchange = function ( event ) {

			
			if ( document.pointerLockElement === elementArea || document.mozPointerLockElement === elementArea || document.webkitPointerLockElement === elementArea ) {
				controls.enabled = true;

				blocker.style.display = 'none';
				console.log('The pointer lock status is now locked');


			} else {
				controls.enabled = false;
				blocker.style.display = 'block';
				instructions.style.display = '';
				console.log('The pointer lock status is now unlocked');  

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






function onKeyDown( event ) {
	switch ( event.keyCode ) {
		// case 38: // up
		case 87: // w

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
					
					console.log(crono);
					console.log("Disabled auto navigation");
					isActiveAuto = false;
				}else{
					console.log(crono)
					console.log("Activated auto navigation");
					isActiveAuto = true;			
				}
			}).listen();

			dataGui.add(options, 'reset')
		}
		/************************************Fim guiData***********************/
			// FIM PLACAS

			/************************************Inicio initMesshesFirstFase***********************/
			function initMesshesFirstFase(){
				var casaA, casaB, terreno; 
				var arvore, arvore2, arvore3, arvore4,arvoreNova, arbustos, arvoreNova2;
				var barraca;
				var max_displacement = 0.2;
				var scale = 2;
				const manager = initLoadingManager();
				const loader = new THREE.JSONLoader(manager);
				const loaderFbx = new THREE.JSONLoader(manager);
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
										casaA.name = "CasaA";									
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
										casaB.name = "CasaB";
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
										arvoreNova.name = "arvore9";
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
										arvoreNova2.name = "arvore10";
										scene.add( arvoreNova2 );
										objects.push(arvoreNova2);
									}

									loader.load( "../src/models/gradient.json", addModelToScene3, manager.onProgress, manager.onError);
									// After loading JSON from our file, we add it to the scene
									function addModelToScene3( geometry, materials ) {
										terreno = new THREE.Mesh( geometry, materials );
										terreno.scale.set(12,12,12);
										terreno.position.y = 1458;
										terreno.position.z = -510;
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

							

									new THREE.ObjectLoader().load( "../src/models/doorV4.json", function ( model ) {

										model.scale.set(40,40,40);
										model.position.y = -40;
										model.position.z = -371;
										model.position.x = 260;
										model.name = "door";
										scene.add( model );
										doors.push(model);
										objects.push(model.children[0]);
										mixer = new THREE.AnimationMixer(model);
										mixer.getRoot().animations[0].name = 'porta1casa2';
										animationClips.push(mixer.getRoot().animations[0]);
										animation = mixer.clipAction(animationClips[0]);
										mixer.ativo = false;
																																					
										} );

									new THREE.ObjectLoader().load( "../src/models/doorV5.json", function ( door2 ) {

										door2.scale.set(40,40,40);
										door2.position.y = -40;
										door2.position.z = -370;
										door2.position.x = 117;
										door2.name = "door2";
										scene.add(door2);
										doors.push(door2);										
										objects.push(door2.children[0]);
										mixer2 = new THREE.AnimationMixer(door2);
										mixer2.getRoot().animations[0].name = 'porta2casa2';
										animationClips.push(mixer2.getRoot().animations[0]);
										animation2 = mixer2.clipAction(animationClips[1]);
										mixer2.ativo = false;
									});

									new THREE.ObjectLoader().load( "../src/models/doorV6.json", function ( door3 ) {

										door3.scale.set(40,40,40);
										door3.position.y = -40;
										door3.position.z = 84;
										door3.position.x = 118;
										door3.rotation.y = 1.5;
										door3.name = "door3";
										scene.add(door3);
										doors.push(door3);										
										objects.push(door3.children[0]);
										mixer3 = new THREE.AnimationMixer(door3);
										mixer3.getRoot().animations[0].name = 'porta1casa1';
										animationClips.push(mixer3.getRoot().animations[0]);
										animation3 = mixer3.clipAction(animationClips[2]);
										mixer3.ativo = false;
									});

									new THREE.ObjectLoader().load( "../src/models/doorV7.json", function ( door4 ) {

										door4.scale.set(40,40,40);
										door4.position.y = -40;
										door4.position.z = 228;
										door4.position.x = 118;
										door4.rotation.y = 1.5;
										door4.name = "door4";
										scene.add(door4);
										doors.push(door4);										
										objects.push(door4.children[0]);
										mixer4 = new THREE.AnimationMixer(door4);
										mixer4.getRoot().animations[0].name = 'porta2casa1';
										animationClips.push(mixer4.getRoot().animations[0]);
										animation4 = mixer4.clipAction(animationClips[3]);
										mixer4.ativo = false;
									});

									new THREE.ObjectLoader().load( "../src/models/doorV8.json", function ( door5 ) {

										door5.scale.set(40,40,40);
										door5.position.y = -40;
										door5.position.z = 84;
										door5.position.x = -114;
										door5.rotation.y = 1.5;
										door5.name = "door5";
										scene.add(door5);
										doors.push(door5);										
										objects.push(door5.children[0]);
										mixer5 = new THREE.AnimationMixer(door5);
										mixer5.getRoot().animations[0].name = 'porta3casa1';
										animationClips.push(mixer5.getRoot().animations[0]);
										animation5 = mixer5.clipAction(animationClips[4]);
										mixer5.ativo = false;
									});
										

									new THREE.ObjectLoader().load( "../src/models/doorV9.json", function ( door6 ) {

										door6.scale.set(40,40,40);
										door6.position.y = -40;
										door6.position.z = 150;
										door6.position.x = 330;										
										door6.name = "door6";
										scene.add(door6);
										doors.push(door6);										
										objects.push(door6.children[0]);
										mixer6 = new THREE.AnimationMixer(door6);
										mixer6.getRoot().animations[0].name = 'porta4casa1';
										animationClips.push(mixer6.getRoot().animations[0]);
										animation6 = mixer6.clipAction(animationClips[5]);
										mixer6.ativo = false;
									});	


									new THREE.ObjectLoader().load( "../src/models/doorV10.json", function ( door7 ) {

										door7.scale.set(40,40,40);
										door7.position.y = -40;
										door7.position.z = 195;
										door7.position.x = 135;										
										door7.name = "door7";
										scene.add(door7);
										doors.push(door7);										
										objects.push(door7.children[0]);
										mixer7 = new THREE.AnimationMixer(door7);
										mixer7.getRoot().animations[0].name = 'porta5casa1';
										animationClips.push(mixer7.getRoot().animations[0]);
										animation7 = mixer7.clipAction(animationClips[6]);
										mixer7.ativo = false;
									});	

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

function eventWalk(key){
	var event = { keyCode: key}
	onKeyDown(event);
}


function eventWalkStop(key){
	var event = { keyCode: key}
	onKeyUp(event);
}

/************************************Fim initMesshesFirstFase***********************/


/************************************Inicio animate***********************/
function animate() {

		if(!close){
			if(mixer.ativo){
				mixer.update(clock.getDelta());
			}
			if(mixer2.ativo){
				mixer2.update(clock.getDelta());
			}
			if(mixer3.ativo){
				mixer3.update(clock.getDelta());
			}
			if(mixer4.ativo){
				mixer4.update(clock.getDelta());
			}
			if(mixer5.ativo){
				mixer5.update(clock.getDelta());
			}
			if(mixer6.ativo){
				mixer6.update(clock.getDelta());
			}
			if(mixer7.ativo){
				mixer7.update(clock.getDelta());
			}
		}


	render();
	detectColision();

	if(isActiveAuto === true){
		crono++;
		drawPath();
	}else{
		crono = 0;
	} 
	// console.log("X" + controls.getObject().position.x);
	// console.log("Z" + controls.getObject().position.z);
	// console.log('R' + controls.getObject().rotation.y + "H");
	
	requestAnimationFrame( animate );	
}
/************************************Fim animate***********************/

function drawPath(){

	
	var extrudePath = splines[ paramsPipe.spline ];
	tubeGeometry = new THREE.TubeBufferGeometry( extrudePath, paramsPipe.extrusionSegments, 2, paramsPipe.radiusSegments, false );
	addGeometry( tubeGeometry );
	animationCamera();

}
function addGeometry( geometry ){
	
	// 3D shape
	controls.enabled = false;
	var mesh = new THREE.Mesh( geometry, materialPipe );
	var wireframe = new THREE.Mesh( geometry, wireframeMaterial );
	mesh.add( wireframe );
	mesh.visible = false;
	parent.add( mesh );

}


function animationCamera(){

	var looptime = 10 * 1000;
	var t = ( crono % looptime ) / looptime;

	
	var pos = tubeGeometry.parameters.path.getPointAt( t );
	console.log(crono);
			// pos.multiplyScalar( params.scale );
			var segments = tubeGeometry.tangents.length;
			var pickt = t * segments;
			var pick = Math.floor( pickt );
			var pickNext = ( pick + 1 ) % segments;

			binormal.subVectors( tubeGeometry.binormals[ pickNext ], tubeGeometry.binormals[ pick ] );
			binormal.multiplyScalar( pickt - pick ).add( tubeGeometry.binormals[ pick ] );

			var dir = tubeGeometry.parameters.path.getTangentAt( t );
			var offset = 15;

			//normal.copy( binormal ).cross( dir );
			pos.add( normal.clone().multiplyScalar( offset ) );

			controls.getObject().position.copy(pos);
			

			var lookAt = tubeGeometry.parameters.path.getPointAt( ( t + 30 / tubeGeometry.parameters.path.getLength() ) % 1 ).multiplyScalar( params.scale );

			if ( ! params.lookAhead ) lookAt.copy( pos ).add( dir );
			controls.getObject().matrix.lookAt( controls.getObject().position, lookAt, normal );
			controls.getObject().rotation.setFromRotationMatrix( controls.getObject().matrix, controls.getObject().rotation.order );
		}


		function render(){
			
			renderer.render( scene,  camera );

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

/************************************Inicio detectColision***********************/
function detectColision() {

// console.log(animationClips);
	var prev_pos_x = controls.getObject().position.x;
	var prev_pos_z = controls.getObject().position.z;
	var infoDoc = document.getElementById('modelsInfo');
	var imgCasaA = document.getElementById('imgCasaA');
	var imgCasaB = document.getElementById('imgCasaB');

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
		

			// if(collisionsDoors.length > 0){

			// 							

			// 	}



		if(collisions.length > 0){
	
				
				if(collisions[0].object.name === 'porta1casa2'){	
						
						playAnimation(collisions, animation, mixer);
						mixer.ativo = true;
					}


				if(collisions[0].object.name === 'porta2casa2'){
					playAnimation(collisions, animation2, mixer2);
					mixer2.ativo = true;
					mixer.ativo = false;									
				}

				if(collisions[0].object.name === 'porta1casa1'){
					playAnimation(collisions, animation3, mixer3);
					mixer.ativo = false;
					mixer2.ativo = false;
					mixer3.ativo = true;													
				}

				if(collisions[0].object.name === 'porta2casa1'){
					playAnimation(collisions, animation4, mixer4);
					mixer.ativo = false;
					mixer2.ativo = false;
					mixer3.ativo = false;
					mixer4.ativo = true;													
				}

				if(collisions[0].object.name === 'porta3casa1'){
					playAnimation(collisions, animation5, mixer5);
					mixer.ativo = false;
					mixer2.ativo = false;
					mixer3.ativo = false;
					mixer4.ativo = false;
					mixer5.ativo = true;													
				}

				if(collisions[0].object.name === 'porta4casa1'){
					playAnimation(collisions, animation6, mixer6);
					mixer.ativo = false;
					mixer2.ativo = false;
					mixer3.ativo = false;
					mixer4.ativo = false;
					mixer5.ativo = false;
					mixer6.ativo = true;													
				}

				if(collisions[0].object.name === 'porta5casa1'){
					playAnimation(collisions, animation7, mixer7);
					mixer.ativo = false;
					mixer2.ativo = false;
					mixer3.ativo = false;
					mixer4.ativo = false;
					mixer5.ativo = false;
					mixer6.ativo = false;
					mixer7.ativo = true;													
				}

			
			if(collisions[0].distance > 0  && collisions[0].distance < 60){

					 infoDoc.style.display = "block";

					 window.onkeyup = function(e) {
					 	var key = e.keyCode ? e.keyCode : e.which;
					 	displayModelsInfo(imgCasaA,key);

					 }


					}else{
						infoDoc.style.display = "none";
					}

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

				function playAnimation(collisions, animation, mixer){

						var distance = collisions[0].distance;
											
						if(distance < 60){

					    animation.setLoop(THREE.LoopOnce);
						animation.clampWhenFinished = true;
						animation.enabled = true;
						animation.play();
						
						close = false;
						isDoorOpen = true;
						}
						// }else if(distance > 80 && isDoorOpen){
						// 	animation.enabled = false;
						// 	isDoorOpen = false;
						// 	close = true;
						// 	animation.stop();
						// 	console.log(distance);
						// }
					
						
					}

		function displayModelsInfo(model,key){

			if (key === 13){
				if(model.style.display = "none"){								 		
					model.style.display = "block";
					semaforo++;
				}					
			}

			if(semaforo % 2 === 0){

				model.style.display = "none";

			}

		}


		function myKeyPress(e){
			var keynum;

    if(window.event) { // IE                    
    	keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
    	keynum = e.which;
    }

    alert(String.fromCharCode(keynum));
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
		//sound.play();
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

