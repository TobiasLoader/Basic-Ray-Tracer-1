

COOR = [
			{x:12, y:-9, z:50},
			{x:20,y:0,z:60},
			{x:-5, y:-10, z:60},
			{x:-20, y:15, z:70},
			{x:-5, y:6, z:80},
	    {x:12, y:8, z:82},
	    {x:2, y:-10, z:90},
	    {x:-24, y:-14, z:100},
	 	];

function scene(pho){
	if (
		PlaneEqu({x:0,y:1,z:0},-10,"<",pho,color(255,200,200)) || 
		(done[0]===false && sphereEqu(lightPho,3,pho,color(0))) || //|| sphereEqu({x:0,y:0,z:60},10,pho,color(255)) 
		sphereEqu(COOR[0],3,pho,color(255)) ||
		sphereEqu(COOR[1],4,pho,color(255)) ||
		sphereEqu(COOR[2],10,pho,color(255)) ||	
		sphereEqu(COOR[3],4,pho,color(255)) || 
		sphereEqu(COOR[4],5,pho,color(255)) ||
// 		cuboidEqu(COOR[5],{x:2,y:2,z:30},pho,color(255)) ||
		sphereEqu(COOR[6],20,pho,color(255)) ||
		sphereEqu(COOR[7],15,pho,color(255)) ||
		sphereEqu({x:0,y:0,z:120},20,pho,color(255))
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