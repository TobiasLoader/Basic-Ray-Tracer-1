var x;
var y;
var z;
var X;
var Y;
var Z;

function sphereEqu(coor,r,pho,col){
	if (sq((pho.x-coor.x))+sq((pho.y-coor.y))+sq((pho.z-coor.z))<=sq(r)){
		pixCol = col;
		return true;
	}
	return false;
}

function PlaneEqu(grads,val,ineq,pho,col){
	if (ineq===">"){if (grads.x*pho.x+grads.y*pho.y+grads.z*pho.z>val){pixCol = col; return true;}}
	if (ineq==="<"){if (grads.x*pho.x+grads.y*pho.y+grads.z*pho.z<val){pixCol = col; return true;}}
	return false;
}

function cuboidEqu(coor,dimensions,pho,col){
	if (pho.x>coor.x-dimensions.x && pho.x<coor.x+dimensions.x && pho.y>coor.y-dimensions.y && pho.y<coor.y+dimensions.y && pho.z>coor.z-dimensions.z && pho.z<coor.z+dimensions.z){
		pixCol = col;
		return true;
	}
	return false;
}

function pyramidEqu(coor,s,pho,col){
/*
	x = pho.x;
	y = pho.y;
	z = pho.z;
	X = coor.x;
	Y = coor.y;
	Z = coor.z;
	if (y<x+X-Y+z+Z && y<-x-X+Y+z+Z && y<x+X-Y-z-Z){ //y<x+X-Y+z+Z && y<-x-X+Y+z+Z && y<x+X-Y-z-Z && y<-x-X+Y-z-Z && y>Y-s
	 	pixCol = col;
	 	print("t");
	 	return true;
	}
	return false;
*/
}