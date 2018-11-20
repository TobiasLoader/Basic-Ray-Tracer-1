

COOR = [
			{x:12, y:10, z:35},
			{x:22,y:-5,z:42},
			{x:-5, y:-10, z:42},
			{x:-20, y:15, z:49},
			{x:-5, y:6, z:56},
	    {x:12, y:8, z:57},
	    {x:2, y:-10, z:63},
	    {x:-24, y:-14, z:70},
	 	];

function scene(pho,afterBounce,colCoor,A){
	if (!A){
		A = false;
	}
	if (
		PlaneEqu({x:0,y:1,z:0},-10,pho,[100,150,200],afterBounce,colCoor,true,A) || 
// 		PlaneEqu({x:0,y:0,z:1},50,">",pho,color(255)) //|| 
// 		(cuboidEqu(lightPho,{x:2,y:2,z:2},pho,[255,255,255])) ||// done[0]===false && 
		sphereEqu(COOR[0],3,pho,[26,83,92],afterBounce,colCoor) ||
		sphereEqu(COOR[1],4,pho,[247,255,247],afterBounce,colCoor) ||
		sphereEqu(COOR[2],10,pho,[28,205,196],afterBounce,colCoor) ||	
		sphereEqu(COOR[3],4,pho,[255,107,107],afterBounce,colCoor) || 
		sphereEqu(COOR[4],5,pho,[152,155,252],afterBounce,colCoor) ||
// 		cuboidEqu(COOR[5],{x:2,y:2,z:30},pho,color(255)) ||
		sphereEqu(COOR[6],20,pho,[255,230,109],afterBounce,colCoor) ||
		sphereEqu(COOR[7],15,pho,[206,206,224],afterBounce,colCoor)
// 		sphereEqu({x:0,y:0,z:120},20,pho,color(255))
/*
		cuboidEqu({x:-15,y:0,z:60},{x:5,y:20,z:40},pho,color(74, 111, 165)) ||
		cuboidEqu({x:-15,y:10,z:60},{x:20,y:5,z:40},pho,color(74, 111, 165)) ||
		
		sphereEqu({x:0,y:-5,z:50},10,pho,color(255)) ||
		
		cuboidEqu({x:15,y:-3,z:60},{x:2,y:14,z:40},pho,color(165, 79, 74)) ||
		cuboidEqu({x:17,y:2,z:60},{x:2,y:2,z:40},pho,color(165, 79, 74)) ||
		cuboidEqu({x:19,y:0,z:59},{x:2,y:2,z:40},pho,color(165, 79, 74)) ||
		cuboidEqu({x:21,y:2,z:59},{x:2,y:2,z:40},pho,color(165, 79, 74)) ||
		cuboidEqu({x:23,y:-3,z:59},{x:2,y:14,z:40},pho,color(165, 79, 74))
*/

	){
		return true;
	}
	return false;
}

function addDraw(){
	note("Tobias Codes");
}

function addKeyPressed(){

}

function addMouseClicked(){
	
}