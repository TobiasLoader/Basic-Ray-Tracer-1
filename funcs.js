{
var canvas;
var W = window.innerWidth;
var H = window.innerHeight;
var windowResize;
var fps;
var COOR;
var pixMatrix = [];
var qual;
var depth;
var Dz;
var AngleX;
var AngleY;
var pixCol;
var done;
var prev;
var camPho;
var lightPho;
var pho1;
var pho2;
var angleCamera;
var angleLight;
var lastThetaX;
var lastThetaX2;
var lightScattering;
var compLightScatter;
var stop;
var loadingAddon;
var f = ["Quicksand","PlayFair Display"];
var backCol;
var startSec;
var finalSec;
var pauseStart;
var pausedSec;
var collide;
var colCoor;
var reflectPho;
var reflectedAngles;
var reflectedDist;
var beep;
var PLAY = true;
var loadingIntervals;

} // Variables

function preload(){
	beep = loadSound("Beep.mp3"); // Originally called: "Analog Watch Alarm Sound" from "SoundBible.com"
}

function reset(){
	textFont(f[0],20);
	rectMode(CENTER,CENTER);
	textAlign(CENTER,CENTER);
	angleMode(DEGREES);
	W = window.innerWidth;
	H = window.innerHeight;
	windowResize = false;
	AngleX = 70;
	depth = 200;
	Dz = (W/2)/tan(AngleX/2);
	AngleY = 2*atan(H/(2*Dz));
	pixCol = [255,255,255];
	done = [false,false];
	prev;
	pho1;
	pho2;
	angleCamera = [0,0];
	angleLight = [-7,3];
	camPho = {x:0,y:0,z:0};
// 	lightPho = {x:-60*cos(angleLight[0]-90),y:0,z:60*sin(angleLight[0]-90)+60};
	lightPho = {x:8,y:5,z:-2};
	lastThetaX = -AngleX/2;
	lastThetaX2 = -AngleX/2;
	lightScattering = 1; // 0 <= x <= 1
	compLightScatter = (lightScattering)/2;
	stop = [false,false];
	loadingAddon = "";
	startSec = seconds();
	finalSec = 0;
	pauseStart = 0;
	pausedSec = 0;
	colCoor = {x:0,y:0,z:0};
	reflectPho = false;
	reflectedAngles = [];
	reflectedDist = 0;
	
	if (sceneCalcArray.length){
		done[0] = true;
		pixMatrix = sceneCalcArray;
	} else {
		for (var h=0; h<floor(H/qual); h+=1){
			pixMatrix.push([]);
			for (var w=0; w<floor(W/qual); w+=1){
				pixMatrix[h].push([0,[pixCol[0],pixCol[1],pixCol[2]],0,0]);
			}
		}
	}
	
// 	loadingScreen();
}

function setup() {
	backCol = color(100,150,200);
	loadingIntervals = 5;
	fps = 2/loadingIntervals;
// 	backCol = color(30);
	canvas = createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fps);
  background(backCol);
  qual = parseFloat(prompt("The quality as a positive number.\nLower the number, better the quality. Eg: 5"));
	if (isNaN(qual)){
		alert("The quality has defaulted to 5.");
		qual = 5;
	}
  reset();
 }

function seconds(){
	return round(millis()/1000);
}


function popUp(MESSAGE){
	if (W>800){
		textSize(W/50);
	} else {
		textSize(16);
	}
	fill(150,250,200,200);
	noStroke();
	rect(W/2,H/2,W/4,100,3);
	fill(255);
	textAlign(CENTER,CENTER);
	text(MESSAGE,W/2,H/2);
}

function note(MESSAGE){
	fill(255);
	textSize(12);
	noStroke();
	textAlign(CENTER,CENTER);
	text(MESSAGE,W/2,H-30);
}
