var pox;
var poy;

function mousePressed() {
  pox = mouseX;
  poy = mouseY;
  x = pox;
  y = height-poy;
  vx = 0;
  vy = 0;
}

function drawSlingshot() {
 	if (mouseIsPressed) {
  x = pox;
  y = height-poy;
  vx = 0;
  vy = 0;
  stroke(255,0,0);
  strokeWeight(3);
	line(mouseX,mouseY,pox,poy);
  dy = mouseY - poy;
  dx = mouseX - pox;
  vel_angle = atan2(-dy,dx);
  tri_width=7;
  triangle(mouseX+sin(vel_angle)*tri_width/2,mouseY+cos(vel_angle)*tri_width/2,mouseX-sin(vel_angle)*tri_width/2,mouseY-cos(vel_angle)*tri_width/2,mouseX+cos(vel_angle)*10,mouseY-sin(vel_angle)*10)    
  }
}

function mouseReleased() {
	vx = 0.2*(mouseX - pox);
  vy = -0.2*(mouseY - poy);
//  if (vx*vx + vy*vy > c*c) {
    vel_angle = atan2(vy,vx);
    vx = speed*cos(vel_angle);
    vy = speed*sin(vel_angle);
 // }
  x = pox;
  y = height-poy;
}



xhistory = [];
yhistory = [];

function setup(){
    createCanvas(750, 500);
  	ellipseMode(RADIUS);
}

// Size of the ship
var r = 12;

var showarrows = true;

iterations = 0;

// Draw the ship and other stuff
function display() {
    wrapEdges();
    background(255);
    textSize(12);
    textStyle(NORMAL);

//    stroke(0);
    strokeWeight(10);
//    println("lets do this");
    var tri_width=7;
    if (showarrows) {
            var x_line=5;
            var y_line=5;
            var line_len=100;
            drawLine(x_line,y_line,x_line,y_line+line_len);
            drawLine(x_line,y_line,x_line+line_len,y_line);
        fill(0);
        drawTriangle(x_line-tri_width/2,y_line+line_len,x_line+tri_width/2,y_line+line_len,x_line,y_line+line_len+10);
        drawTriangle(x_line+line_len,y_line-tri_width/2,x_line+line_len,y_line+tri_width/2,x_line+line_len+10,y_line);
            strokeWeight(0);
            drawText("+x",x_line+line_len+15,y_line);
            drawText("+y",x_line,y_line+line_len+15);
    }

    if (showarrows) {
    textSize(20);
    strokeWeight(0);
    fill(255,0,0);
    text("Velocity",0.8*width,0.8*height+25);
    fill(0,0,255);
    text("Force",0.8*width,0.8*height+50);
  //  fill(204,0,204);
//    text("Acceleration",0.8*width,0.8*height+75);
    }

 //   ship(x,y,vx,vy,deltaVx/dt,deltaVy/dt,theta);
	  stroke(0);
    fill(0);
  	strokeWeight(0);
    textSize(12);
//    text("left right arrows to turn, tap up arrow to thrust, press H to hide the arrows, press U to un-hide",10,10);

      if (iterations%3 == 1) {  
    append(xhistory,x);
    append(yhistory,y);
    }

    iterations += 1;   

  
    if (keyIsPressed) {
     isrunning = true; 
    }
  
    MaxLength = 50;
  	if (xhistory.length > MaxLength) {
    xhistory = subset(xhistory,xhistory.length-MaxLength,xhistory.length);
    yhistory = subset(yhistory,yhistory.length-MaxLength,yhistory.length);  
    }  
  
    for( i = 0; i < xhistory.length ; i+= 1) {
     drawPoint(xhistory[i],yhistory[i]);
    }
  
  	drawSlingshot();
  
  	if( (x - x_massive)*(x-x_massive)+(y-y_massive)*(y-y_massive) < 15*15 ) {
     drawText("You're dead!",320,400); 
     noLoop();
    }
  
    fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);
  
}

function wrapEdges() {
    var buffer = r*2;
    if (x > width +  buffer) x = -buffer;
    else if (x <    -buffer) x = width+buffer;
    if (y > height + buffer) y = -buffer;
    else if (y <    -buffer) y = height+buffer;
}

function drawBlob( _x,  _y){
    strokeWeight(2);
    //    fill(255);
    noFill();
    stroke(0);
    ellipse(_x, height - _y, 50, 50);  
}


function drawBlob( _x,  _y, _vx, _vy, _Fx, _Fy){
    strokeWeight(2);
    //    fill(255);
    noFill();
    stroke(0);
    ellipse(_x, height - _y, 12, 12);  
  
            strokeWeight(10);
    var tri_width=7;

    // Draw velocity arrow
    var v_scaling=5.0;
    stroke(255,0,0); // makes the line red
    strokeWeight(3); // makes the line thicker

    if ( ((_vx !== 0) || (_vy !== 0)) && showarrows) {
        drawLine(_x,_y,_x+v_scaling*_vx,_y+v_scaling*_vy);
        var vel_angle = -atan2(_vy,_vx);
        fill(255,0,0); // makes the triangle red
        drawTriangle(_x+v_scaling*_vx+sin(vel_angle)*tri_width/2,_y+v_scaling*_vy+cos(vel_angle)*tri_width/2,_x+v_scaling*_vx-sin(vel_angle)*tri_width/2,_y+v_scaling*_vy-cos(vel_angle)*tri_width/2,_x+v_scaling*_vx+cos(vel_angle)*10,_y+v_scaling*_vy-sin(vel_angle)*10);
    }
  
    var a_scaling=2;
    f_angle = -atan2(_Fy,_Fx);
    if (((_Fx !== 0) || (_Fy !== 0)) && showarrows) {
    //stroke(204,0,204); // makes the line purple
    stroke(0,0,255); // blue
    drawLine(_x,_y,_x+a_scaling*_Fx,_y+a_scaling*_Fy);
    //fill(204,0,204); // makes the triangle purple
    fill(0,0,255); // blue
    drawTriangle(_x+a_scaling*_Fx+sin(f_angle)*tri_width/2,_y+a_scaling*_Fy+cos(f_angle)*tri_width/2,_x+a_scaling*_Fx-sin(f_angle)*tri_width/2,_y+a_scaling*_Fy-cos(f_angle)*tri_width/2,_x+a_scaling*_Fx+cos(f_angle)*10,_y+a_scaling*_Fy-sin(f_angle)*10);
    }
  

      fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);

}

function ship( _x,  _y, _vx, _vy, _ax, _ay, _theta)
{
    strokeWeight(2);
    //    fill(255);
    noFill();
    stroke(0);

    stroke(0);
    strokeWeight(2);
    push();
    translate(_x,height-_y);
    rotate(-theta+PI/2);
    fill(175);
    // A triangle
    beginShape();
    vertex(-r,r);
    vertex(0,-1.5*r);
    vertex(r,r);
    endShape(CLOSE);
    rectMode(CENTER);
    pop();
    fill(0);
    strokeWeight(0);
  
  
  
    strokeWeight(10);
    var tri_width=7;

    // Draw velocity arrow
    var v_scaling=1.0;
    stroke(255,0,0); // makes the line red
    strokeWeight(3); // makes the line thicker

    if ( ((_vx !== 0) || (_vy !== 0)) && showarrows) {
        drawLine(_x,_y,_x+v_scaling*_vx,_y+v_scaling*_vy);
        var vel_angle = -atan2(_vy,_vx);
        fill(255,0,0); // makes the triangle red
        drawTriangle(_x+v_scaling*_vx+sin(vel_angle)*tri_width/2,_y+v_scaling*_vy+cos(vel_angle)*tri_width/2,_x+v_scaling*_vx-sin(vel_angle)*tri_width/2,_y+v_scaling*_vy-cos(vel_angle)*tri_width/2,_x+v_scaling*_vx+cos(vel_angle)*10,_y+v_scaling*_vy-sin(vel_angle)*10);
    }

     // Draw force arrow
    var f_scaling=2.25;
//    var f_scaling=5.0;
    var Fx = mass*_ax;
    var Fy = mass*_ay;
    var f_angle = -atan2(Fy,Fx);

    if (((Fx !== 0) || (Fy !== 0)) && showarrows) {
//    if (((Fx != 0) || (Fy != 0)) && 0 ) {
    stroke(0,0,255); // makes the line blue
    drawLine(_x,_y,_x+f_scaling*Fx,_y+f_scaling*Fy);
    fill(0,0,255); // makes the triangle blue
    drawTriangle(_x+f_scaling*Fx+sin(f_angle)*tri_width/2,_y+f_scaling*Fy+cos(f_angle)*tri_width/2,_x+f_scaling*Fx-sin(f_angle)*tri_width/2,_y+f_scaling*Fy-cos(f_angle)*tri_width/2,_x+f_scaling*Fx+cos(f_angle)*10,_y+f_scaling*Fy-sin(f_angle)*10);    
    }
  
    var a_scaling=2.25;
    f_angle = -atan2(_ay,_ax);
    if (((_ax !== 0) || (_ay !== 0)) && showarrows) {
    stroke(204,0,204); // makes the line purple
    drawLine(_x,_y,_x+a_scaling*_ax,_y+a_scaling*_ay);
    fill(204,0,204); // makes the triangle purple
    drawTriangle(_x+a_scaling*_ax+sin(f_angle)*tri_width/2,_y+a_scaling*_ay+cos(f_angle)*tri_width/2,_x+a_scaling*_ax-sin(f_angle)*tri_width/2,_y+a_scaling*_ay-cos(f_angle)*tri_width/2,_x+a_scaling*_ax+cos(f_angle)*10,_y+a_scaling*_ay-sin(f_angle)*10);
    }
  

      fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);

}


/*
function drawBlob( _x,  _y, _r){
  strokeWeight(2);
  ellipse(_x, height - _y, _r, _r);  
}*/

function drawEllipse( _x,  _y,  _w,  _h){
  noFill();
  stroke(0);
  strokeWeight(1);
  ellipse(_x, height - _y, _w, _h);  
}

function drawLine( _x1,  _y1,  _x2,  _y2){
  strokeWeight(3);
  line(_x1, height - _y1, _x2, height - _y2);  
//  strokeWeight(0);
}

function drawPoint( _x,  _y){
    strokeWeight(3);
    point(_x, height - _y);  
    strokeWeight(0);
}

function drawQuad( _x1,  _y1,  _x2,  _y2,  _x3,  _y3,  _x4,  _y4){
  quad(_x1, height - _y1, _x2, height - _y2, _x3, height - _y3, _x4, height - _y4);  
}

function drawRect( _x,  _y,  _w,  _h){
  rect(_x, height - _y, _w, _h);  
}

function drawRect( _x,  _y,  _w,  _h,  _r){
  rect(_x, height - _y, _w, _h, _r);  
}

function drawRect( _x,  _y,  _w,  _h,  _tl,  _tr,  _br,  _bl){
  rect(_x, height - _y, _w, _h, _tl, _tr, _br, _bl);  
}

function drawTriangle( _x1,  _y1,  _x2,  _y2,  _x3,  _y3){
  triangle(_x1, height - _y1, _x2, height - _y2, _x3, height - _y3);
}

function drawText( _str,  _x, _y){
    if (isNumeric(_str)){
        _str = round(100*_str)/100;
    }
    textSize(20);  
    strokeWeight(1);
    text(_str, _x, height- _y);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}





function drawSun( _x,  _y, _vx, _vy, _Fx, _Fy){
    strokeWeight(2);
    //    fill(255);
    //noFill();
    fill(255,255,0); //yellow
    stroke(0);
    ellipse(_x, height - _y, 50, 50);  
  
            strokeWeight(10);
    var tri_width=7;

    // Draw velocity arrow
    var v_scaling=5.0;
    stroke(255,0,0); // makes the line red
    strokeWeight(3); // makes the line thicker

    if ( ((_vx !== 0) || (_vy !== 0)) && showarrows) {
        drawLine(_x,_y,_x+v_scaling*_vx,_y+v_scaling*_vy);
        var vel_angle = -atan2(_vy,_vx);
        fill(255,0,0); // makes the triangle red
        drawTriangle(_x+v_scaling*_vx+sin(vel_angle)*tri_width/2,_y+v_scaling*_vy+cos(vel_angle)*tri_width/2,_x+v_scaling*_vx-sin(vel_angle)*tri_width/2,_y+v_scaling*_vy-cos(vel_angle)*tri_width/2,_x+v_scaling*_vx+cos(vel_angle)*10,_y+v_scaling*_vy-sin(vel_angle)*10);
    }
  
    var a_scaling=2;
    f_angle = -atan2(_Fy,_Fx);
    if (((_Fx !== 0) || (_Fy !== 0)) && showarrows) {
    //stroke(204,0,204); // makes the line purple
    stroke(0,0,255); // blue  
    drawLine(_x,_y,_x+a_scaling*_Fx,_y+a_scaling*_Fy);
    //fill(204,0,204); // makes the triangle purple
    fill(0,0,255);  
    drawTriangle(_x+a_scaling*_Fx+sin(f_angle)*tri_width/2,_y+a_scaling*_Fy+cos(f_angle)*tri_width/2,_x+a_scaling*_Fx-sin(f_angle)*tri_width/2,_y+a_scaling*_Fy-cos(f_angle)*tri_width/2,_x+a_scaling*_Fx+cos(f_angle)*10,_y+a_scaling*_Fy-sin(f_angle)*10);
    }
  

      fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);

}

function drawBlackHole( _x,  _y, _vx, _vy, _Fx, _Fy){
    strokeWeight(2);
    //    fill(255);
    //noFill();
    fill(0,0,0); //yellow
    stroke(0);
    ellipse(_x, height - _y, 12, 12);  
  
            strokeWeight(10);
    var tri_width=7;

    // Draw velocity arrow
    var v_scaling=5.0;
    stroke(255,0,0); // makes the line red
    strokeWeight(3); // makes the line thicker

    if ( ((_vx !== 0) || (_vy !== 0)) && showarrows) {
        drawLine(_x,_y,_x+v_scaling*_vx,_y+v_scaling*_vy);
        var vel_angle = -atan2(_vy,_vx);
        fill(255,0,0); // makes the triangle red
        drawTriangle(_x+v_scaling*_vx+sin(vel_angle)*tri_width/2,_y+v_scaling*_vy+cos(vel_angle)*tri_width/2,_x+v_scaling*_vx-sin(vel_angle)*tri_width/2,_y+v_scaling*_vy-cos(vel_angle)*tri_width/2,_x+v_scaling*_vx+cos(vel_angle)*10,_y+v_scaling*_vy-sin(vel_angle)*10);
    }
  
    var a_scaling=2;
    f_angle = -atan2(_Fy,_Fx);
    if (((_Fx !== 0) || (_Fy !== 0)) && showarrows) {
    //stroke(204,0,204); // makes the line purple
    stroke(0,0,255); // blue  
    drawLine(_x,_y,_x+a_scaling*_Fx,_y+a_scaling*_Fy);
    //fill(204,0,204); // makes the triangle purple
    fill(0,0,255);  
    drawTriangle(_x+a_scaling*_Fx+sin(f_angle)*tri_width/2,_y+a_scaling*_Fy+cos(f_angle)*tri_width/2,_x+a_scaling*_Fx-sin(f_angle)*tri_width/2,_y+a_scaling*_Fy-cos(f_angle)*tri_width/2,_x+a_scaling*_Fx+cos(f_angle)*10,_y+a_scaling*_Fy-sin(f_angle)*10);
    }
  

      fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);

}
