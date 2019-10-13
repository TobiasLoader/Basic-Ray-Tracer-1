var ld;
function drawMatrix(){
// 	print(pixMatrix[0][0][1]);
	noStroke();
	for (var h=0; h<pixMatrix.length; h+=1){
		for (var w=0; w<pixMatrix[h].length; w+=1){
			if (pixMatrix[h][w][0]){
				if (pixMatrix[h][w][2]!==0){
					ld =  (1-bgLumi)*pow(1.00025,-sq(pixMatrix[h][w][2]));
				} else {
					ld = 0;
				}
// 				ld = 1;
				fill(pixMatrix[h][w][1][0]*(ld+bgLumi),pixMatrix[h][w][1][1]*(ld+bgLumi),pixMatrix[h][w][1][2]*(ld+bgLumi),255 * pow(1.0002,-sq(pixMatrix[h][w][0])));
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
	if (firstSceneClicked){
		if (!afterFirstClicked){
			  background(backCol);
			  qual = parseFloat(prompt("We now need to choose the RENDER QUALITY of the image:\n\nThis will be a positive integer between 1 and 5.\nThe lower the number, the higher the quality of image, but the slower it will take to render; eg: a quality of 2 may take one minute whilst a quality of 5 only a few seconds.\n\nNow please input your preferred render quality:"));
				if (isNaN(qual)){
					alert("The quality has defaulted to 3.");
					qual = 3;
				}
				loadingIntervals = ceil(10/qual);
			  reset();
			  frameRate(fps);10
		}
		if (done[1]===false) {
			background(backCol);
			if (PLAY){
				drawMatrix();
				loadingScreen();
				note("Render time: " + str(seconds()-startSec-pausedSec) + "s | Q" + qual);
			} else {
				fill(0,100);
				rect(W/2,H/2,W,H);
				popUp("PAUSED")
				note("Render time: " + str(pauseStart-startSec-pausedSec) + "s | Q" +qual);
			}
			photonsCalc();
	// 		print(lastThetaX);
		} else {
			background(backCol);
			drawMatrix();
			note("Render time: " + str(finalSec-startSec-pausedSec) + "s | Q"+qual);
		}
		afterFirstClicked = true;
	} else {
		firstScene();
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
	if (mouseX>(window.innerWidth/2 - 125) && mouseX<(window.innerWidth/2+125) && mouseY>13*window.innerHeight/20-20 && mouseY<13*window.innerHeight/20+20){
		firstSceneClicked = true;
	}
	if (!done[1]){
		if (PLAY){
			PLAY = false;
			pauseStart = seconds();
		} else {
			pausedSec += seconds()-pauseStart;
			PLAY = true;
		}
	}
// 	beep.stop();
}
