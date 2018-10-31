var ld;
function drawMatrix(){
	noStroke();
	for (var h=0; h<pixMatrix.length; h+=1){
		for (var w=0; w<pixMatrix[h].length; w+=1){
			if (pixMatrix[h][w][0]){
				if (pixMatrix[h][w][2]!==0){
					ld =  pow(1.00025,-sq(pixMatrix[h][w][2]));
				} else {
					ld = 0;
				}
				fill(red(pixMatrix[h][w][1])*ld,green(pixMatrix[h][w][1])*ld,blue(pixMatrix[h][w][1])*ld,255 * pow(1.00025,-sq(pixMatrix[h][w][0])));
				rect(w*qual,h*qual,qual,qual);
			}
		}
	}
}

function loading(){
	noStroke();
	fill(255);
	textSize((W+H)/30);
	textAlign(CENTER,CENTER);
	
	switch (seconds()%4){
		case 0: loadingAddon = ""; break;
		case 1: loadingAddon = "."; break;
		case 2: loadingAddon = ".."; break;
		case 3: loadingAddon = "..."; break;
	}
	textFont(f[0]);
	text("loading"+loadingAddon,W/2,H/3);
	textSize((W+H)/40);
	text(str(round((((lastThetaX+0.5*lastThetaX2)/(Angle*2)+0.5)*100))) + "%",W/2,2*H/3);
	stroke(255);
	strokeWeight(1);
	line(0,H/2,W*((lastThetaX+0.5*lastThetaX2)/(Angle*2)+0.5),H/2);
	noStroke();
}

function draw() {
	background(backCol);
	if (done[1]===true){
		drawMatrix();
		note("Copyright © Tobias Codes | Render time: " + str(finalSec-startSec) + "s");
	} else {
		loading();
		photonsCalc();
		note("Copyright © Tobias Codes | Render time: " + str(seconds()-startSec) + "s");
// 		print(lastThetaX);
	}
}



function keyPressed(){

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
//   firstDraw();
};

function mouseClicked(){
	beep.stop();
}
