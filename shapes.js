var x;
var y;
var z;
var X;
var Y;
var Z;

function PlaneEqu(grads,val,pho,col,afterBounce,colCoor,reflect,A){
	var ineq = grads.x*pho.x+grads.y*pho.y+grads.z*pho.z;
	if (ineq+qual/2>val && ineq-qual/2<val){
		if (reflect && !done[0] && A && !reflectPho && !afterBounce){
			reflectedAngles = [A[0],-A[1]];
			reflectPho = true;
			pixCol = col;
		} else {
			pixCol = col;
			if (afterBounce && !done[0]){
				reflectedDist = solveAccuracyErrors(sqrt((pho.x-colCoor.x)*(pho.x-colCoor.x)+(pho.y-colCoor.y)*(pho.y-colCoor.y)+(pho.z-colCoor.z)*(pho.z-colCoor.z)));
			}
		}
		return true;
	}
	return false;
}


function sphereEqu(coor,r,pho,col,afterBounce,colCoor,reflect,A){
	if ((pho.x-coor.x)*(pho.x-coor.x)+(pho.y-coor.y)*(pho.y-coor.y)+(pho.z-coor.z)*(pho.z-coor.z)<r*r){
		if (reflect && !done[0] && A && !reflectPho && !afterBounce){
			reflectPho = true;
			pixCol = col;
		} else {
			pixCol = col;
			if (afterBounce && !done[0]){
				reflectedDist = solveAccuracyErrors(sqrt((pho.x-colCoor.x)*(pho.x-colCoor.x)+(pho.y-colCoor.y)*(pho.y-colCoor.y)+(pho.z-colCoor.z)*(pho.z-colCoor.z)));
			}
		}
		return true;
	}
	return false;
}

function cuboidEqu(coor,dimensions,pho,col,afterBounce,colCoor,reflect,A){
	if (pho.x>coor.x-dimensions.x/2 && pho.x<coor.x+dimensions.x/2 && pho.y>coor.y-dimensions.y/2 && pho.y<coor.y+dimensions.y/2 && pho.z>coor.z-dimensions.z/2 && pho.z<coor.z+dimensions.z/2){
		pixCol = col;
		return true;
	}
	return false;
}

function pyramidEqu(coor,s,pho,col,reflect,A){
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