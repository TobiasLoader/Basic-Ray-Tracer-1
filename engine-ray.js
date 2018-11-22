

function movePhoton(coor,tx,ty){
	return {x:(coor.x+(qual)*sin(tx)),y:(coor.y+(qual)*sin(ty)*cos(tx)),z:(coor.z+(qual)*cos(ty)*cos(tx))};
/*
	coor.x+=(qual/2)*sin(tx);
	coor.y+=(qual/2)*sin(ty)*cos(tx);
	coor.z+=(qual/2)*cos(ty)*cos(tx);
	return coor;
*/
}
var PXqD;
var PYqD;
var diffX;
var diffY;
var Ps;
var d;
var d2;
var stored;
var stored2;
var loopNum;

function approx(A,B,n){
	return A+n>B && A-n<B;
}

function solveAccuracyErrors(A){
	if (approx(A,round(A),0.001)){
		return round(A);
	}
	if (approx(A,floor(A)+0.5,0.001)){
		return floor(A)+0.5;
	}
	return A;
}

function ThreeToTwo(coor,f){
	PXqD = (W/2+coor.x*(Dz/coor.z))/qual;
  PYqD = (H/2-coor.y*(Dz/coor.z))/qual;
  PXq = round(PXqD);
  PYq = round(PYqD);

  //   print(PYq);
  if (PXq>0 && PYq>0 && pixMatrix.length>PYq && pixMatrix[PYq].length>PXq){
	  stored = pixMatrix[PYq][PXq][0];
		d = solveAccuracyErrors(sqrt(sq(coor.x-camPho.x)+sq(coor.y-camPho.y)+sq(coor.z-camPho.z)));
  	if (f==="c"){
	  	if (stored>d || stored === 0){
	  		pixMatrix[PYq][PXq][0] = d;
	  		pixMatrix[PYq][PXq][1] = pixCol;
	  		pixMatrix[PYq][PXq][3] = reflectedDist;
	  	}
	  }
	  if (f==="l"){
		  Ps = [[PXq],[PYq]];
			diffX = PXqD-PXq;
			diffY = PYqD-PYq;
		  if (PXq>1 && PXq<pixMatrix[PYq].length-1 && PYq>1 && PYq<pixMatrix.length-1){
			  if (diffX<compLightScatter && diffX>0){
				  Ps[0].push(PXq+1);
			  } else if (diffX>-compLightScatter && diffX<0){
				  Ps[0].push(PXq-1);
			  }
			  if (diffY<compLightScatter && diffY>0){
				  Ps[1].push(PYq+1);
			  } else if (diffY>-compLightScatter && diffY<0){
				  Ps[1].push(PYq-1);
			  }
		  }
		  if (Ps[0].length===2 && Ps[1].length===2){
			  loopNum = 2;
		  } else {
			  loopNum = 1;
		  }
// 		  print(PXq  + "-" + PYq);
		  d2 = solveAccuracyErrors(sqrt(sq(coor.x-lightPho.x)+sq(coor.y-lightPho.y)+sq(coor.z-lightPho.z)));
			for (var i=0; i<loopNum; i+=1){
				if (pixMatrix[Ps[1][i]][Ps[0][i]][2] === 0 && approx(stored,d,qual)){
		  		pixMatrix[Ps[1][i]][Ps[0][i]][2] = d2+2*pixMatrix[PYq][PXq][3];
// 		  		print(d2);
				}
	  	}
  	}
  }
}
function photonsCalc(){
	if (PLAY){
		stop = [false,false];
		if (done[0] === false){
			photonsCamera();
		}
		if (stop[0] === false){
			if (!done[0]){
				print("Camera Done");
				done[0] = true;
			}
// 			print("lastThetaX2:",lastThetaX2);
			
			if (done[1] === false){
/*
				for (var i=0; i<pixMatrix.length; i+=1){
					for (var j=0; j<pixMatrix[i].length; j+=1){
						print(pixMatrix[i][j][2])
					}	
				}	
*/
				photonsLight();
			}
			if (stop[1] === false){
				done[1] = true;
				print("Light Done");
				finalSec = seconds();
				beep.play();
	// 			print(lightPho);
	// 			print(pixMatrix);
			}
		}
	}
}
function photonsCamera(){
	prev = seconds();
	for (var thetaX=lastThetaX; thetaX<AngleX/2; thetaX+=(AngleX*qual)/(2*W)){
		if (seconds() > prev+loadingIntervals-1){
			lastThetaX = thetaX;
			stop[0] = true;
			break;
		} else {
			for (var thetaY=-AngleY/2; thetaY<AngleY/2; thetaY+=(AngleY*qual)/(2*H)){
				pho1 = camPho;
				colCoor = false;
				for (var i=0; i<depth/qual; i+=1){
					pho1 = movePhoton(pho1,thetaX+angleCamera[0],thetaY+angleCamera[1]);
					if (scene(pho1,false,false,[thetaX+angleCamera[0],thetaY+angleCamera[1]])){
						colCoor = pho1;
						if (reflectPho){
							for (var i=0; i<depth/qual; i+=1){
								pho1 = movePhoton(pho1,reflectedAngles[0],reflectedAngles[1]);
								if (scene(pho1,true,colCoor,[])){
									break;
								}
							}
							reflectPho = false;
							reflectedAngles = [];
						}
						ThreeToTwo(colCoor,"c");
						colCoor = false;
						reflectedDist = 0;
						break;
					}
				}
			}
		}
	}
}

function photonsLight(){
	prev = seconds();
// 	print(lightPho);
	for (var thetaX2=lastThetaX2; thetaX2<AngleX/2; thetaX2+=(AngleX*qual)/(2*W)){
		if (seconds() > prev+loadingIntervals-1){
			lastThetaX2 = thetaX2;
			stop[1] = true;
			break;
		} else {
			for (var thetaY2=-AngleX/2; thetaY2<AngleX/2; thetaY2+=(AngleX*qual)/(2*H)){
				pho2 = lightPho;
				for (var i=0; i<depth/qual; i+=1){
					pho2 = movePhoton(pho2,thetaX2+angleLight[0],thetaY2+angleLight[1]);
					if (scene(pho2)){
						ThreeToTwo(pho2,"l");
						break;
					}
				}
			}
		}
// 		print(thetaX2);
	}
	
}