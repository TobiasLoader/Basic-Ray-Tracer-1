var ld;
function drawMatrix(){
// 	print(pixMatrix[0][0][1]);
	noStroke();
	for (var h=0; h<pixMatrix.length; h+=1){
		for (var w=0; w<pixMatrix[h].length; w+=1){
			if (pixMatrix[h][w][0]){
				if (pixMatrix[h][w][2]!==0){
					ld =  pow(1.00025,-sq(pixMatrix[h][w][2]));
				} else {
					ld = 0;
				}
// 				ld = 1;
				fill(pixMatrix[h][w][1][0]*ld,pixMatrix[h][w][1][1]*ld,pixMatrix[h][w][1][2]*ld,255 * pow(1.0002,-sq(pixMatrix[h][w][0])));
// 				fill(0);
				rect(w*qual,h*qual,qual,qual);
			}
		}
	}
}

function loadingScreen(){
	noStroke();
	fill(255);
	textSize((W+H)/30);
	textAlign(CENTER,CENTER);
	
	switch (round(seconds()/2)%4){
		case 0: loadingAddon = ""; break;
		case 1: loadingAddon = "."; break;
		case 2: loadingAddon = ".."; break;
		case 3: loadingAddon = "..."; break;
	}
	textFont(f[0]);
	text("loading"+loadingAddon,W/2,H/3);
	textSize((W+H)/40);
	text(str(round((((lastThetaX+lastThetaX2)/(2*AngleX)+0.5)*100))) + "%",W/2,2*H/3);
	stroke(255);
	strokeWeight(1);
// 	line(0,H/2,W*((lastThetaX+lastThetaX2)/(AngleX*2)+0.5),H/2);

	noStroke();
}

function draw() {
	background(backCol);
	if (done[1]===true){
		drawMatrix();
		note("Copyright © Tobias Codes | Render time: " + str(finalSec-startSec-pausedSec) + "s");
	} else {
		if (PLAY){
			drawMatrix();
			loadingScreen();
			note("Copyright © Tobias Codes | Render time: " + str(seconds()-startSec-pausedSec) + "s");
		} else {
			fill(0,100);
			rect(W/2,H/2,W,H);
			popUp("PAUSED")
			note("Copyright © Tobias Codes | Render time: " + str(pauseStart-startSec-pausedSec) + "s");
		}
		photonsCalc();
// 		print(lastThetaX);
	}
}



function keyPressed(){
	var element;
	var L = [];
	var inList = false;
	if (keyCode === 80 && done[1]===true){
		var STR = "[";
		for (var h=0; h<pixMatrix.length; h+=1){
			STR += "[";
			for (var w=0; w<pixMatrix[h].length; w+=1){
				element = "["+pixMatrix[h][w][0]+",["+pixMatrix[h][w][1]+"],0]";//+",color("+red(pixMatrix[h][w][1])+","+green(pixMatrix[h][w][1])+","+blue(pixMatrix[h][w][1])
				inList = false;
				for (var j=0; j<L.length; j+=1){
					if (element === L[j]){
						STR += "L["+j+"]";
						inList = true;
						break;
					}
				}
				if (!inList){
// 					STR += element;
					L.push(element);
					STR += "L["+(L.length-1)+"]";
				}
				if (w<pixMatrix[h].length-1){
					STR += ",";
				}
			}
			STR += "]";
			if (h<pixMatrix.length-1){
				STR += ",";
			}
		}
		print("var L = [" +L+"];\n\nvar sceneCalcArray = "+STR+"];");
	}
}
function keyReleased(){

}

function mouseDragged(){

}

window.onresize = function() {
  windowResize = true;
  canvas.size(window.innerWidth,window.innerHeight);
  width = W;
  height = H;
//   print(window.innerWidth, window.innerHeight);
//   firstDraw();
};

function mouseClicked(){
	if (!done[1]){
		if (PLAY){
			PLAY = false;
			pauseStart = seconds();
		} else {
			pausedSec += seconds()-pauseStart;
			PLAY = true;
		}
	}
	beep.stop();
}
