

function movePhoton(coor,tx,ty){
	return {x:(coor.x+(qual/2)*sin(tx)),y:(coor.y+(qual/2)*sin(ty)*cos(tx)),z:(coor.z+(qual/2)*cos(ty)*cos(tx))};
/*
	coor.x+=(qual/2)*sin(tx);
	coor.y+=(qual/2)*sin(ty)*cos(tx);
	coor.z+=(qual/2)*cos(ty)*cos(tx);
	return coor;
*/
}
var PX;
var PY;
var d;
var d2;
var stored;

function approx(A,B,n){
	return A+n>B && A-n<B;
}

function ThreeToTwo(coor,f){
	PXq = floor((W/2+coor.x*(Dz/(coor.z)))/qual);
  PYq = floor((H/2-coor.y*(Dz/(coor.z)))/qual);
//   print(PYq);
  if (PXq>0 && PYq>0 && pixMatrix.length>PYq && pixMatrix[PYq].length>PXq){
	  d = sqrt(sq(coor.x-camPho.x)+sq(coor.y-camPho.y)+sq(coor.z-camPho.z));
	  stored = pixMatrix[PYq][PXq][0];
  	if (f==="c"){
			if (stored>d || stored === 0){
	  			pixMatrix[PYq][PXq] = [d,pixCol,0];
	  	}
	  }
	  if (f==="l"){
			if (approx(stored,d,qual)){
		  	d2 = sqrt(sq(coor.x-lightPho.x)+sq(coor.y-lightPho.y)+sq(coor.z-lightPho.z));
	  		pixMatrix[PYq][PXq][2] = d2;
  		}
  	}
  }
}
function photonsCalc(){
	stop = [false,false];
	if (done[0] === false){
		photonsCamera();
	}
	if (stop[0] === false){
		print("Camera Done");
// 		print(camPho);
		done[0] = true;
		if (done[1] === false){
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
function photonsCamera(){
	prev = seconds();
	for (var thetaX=lastThetaX; thetaX<Angle/2; thetaX+=(20*qual)/W){
		if (seconds() !== prev){
			lastThetaX = thetaX;
			stop[0] = true;
			break;
		} else {
			for (var thetaY=-Angle/2; thetaY<Angle/2; thetaY+=(20*qual)/H){
				pho1 = camPho;
				for (var i=0; i<200; i+=1){
					pho1 = movePhoton(pho1,thetaX+angleCamera[0],thetaY-angleCamera[1]);
				  collide = scene(pho1);
					if (collide){
						ThreeToTwo(pho1,"c");
						break;
					}
				}
			}
		}
	}
}

function photonsLight(){
	prev = seconds();
	for (var thetaX2=lastThetaX2; thetaX2<Angle; thetaX2+=(qual/20)){
		if (seconds() !== prev){
			lastThetaX2 = thetaX2;
			stop[1] = true;
			break;
		} else {
			for (var thetaY2=-Angle; thetaY2<Angle; thetaY2+=(qual/20)){
				pho2 = lightPho;
				for (var i=0; i<100; i+=1){
					pho2 = movePhoton(pho2,thetaX2+angleLight[0],thetaY2-angleLight[1]);
					collide = scene(pho2);
					if (collide){
// 						print("Collide");
						ThreeToTwo(pho2,"l");
						break;
					}
				}
			}
		}
	}
}