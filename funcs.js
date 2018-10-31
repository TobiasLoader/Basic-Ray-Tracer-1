{
var canvas;
var W = window.innerWidth;
var H = window.innerHeight;
var windowResize;
var fps;
var COOR;
var pixMatrix = [];
var qual;
var Dz;
var Angle;
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
var stop;
var loadingAddon;
var f = ["Quicksand","PlayFair Display"];
var backCol;
var startSec;
var finalSec;
var collide;
var beep;

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
	fps = 0.5;
	Angle = 50;
	Dz = (W/2)/tan(Angle/2);
	pixCol = color(255);
	done = [false,false];
	prev;
	pho1;
	pho2;
	angleCamera = [0,0];
	angleLight = [60,30];
	camPho = {x:0,y:0,z:0};
// 	lightPho = {x:-60*cos(angleLight[0]-90),y:0,z:60*sin(angleLight[0]-90)+60};
	lightPho = {x:-15,y:7,z:55};
	lastThetaX = -Angle/2;
	lastThetaX2 = -Angle;
	stop = [false,false];
	loadingAddon = "";
	startSec = seconds();
	finalSec = 0;
	for (var h=0; h<floor(H/qual); h+=1){
		pixMatrix.push([]);
		for (var w=0; w<floor(W/qual); w+=1){
			pixMatrix[h].push([0,pixCol]);
		}
	}
	
}

function setup() {
	backCol = color(100,150,200);
	canvas = createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fps);
  background(backCol);
  qual = int(prompt("The quality as an integer greater than 1.\nLower the integer, better the quality. Eg: 10"));
	if (!Number.isInteger(qual)){
		alert("The quality has defaulted to 10.");
		qual = 10;
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
	fill(150,200,250,200);
	noStroke();
	rect(50,50,W/4,100,3);
	fill(255);
	textAlign(CENTER,CENTER);
	text(MESSAGE,50+5,100,W/4-10);
}

function note(MESSAGE){
	fill(255);
	textSize(12);
	noStroke();
	textAlign(CENTER,CENTER);
	text(MESSAGE,W/2,H-30);
}
