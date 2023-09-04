
speed = 50; // speed of light
mass = 50.0;
M = 1000;
G = 100; 
dt = 0.1;

deltaVx = 0;
deltaVy = 0;

x_massive = 375; //Defines radius of image
y_massive = 250;

x = 445; //Draws the Event Horizon
y = 250;

vx = 0;
vy = speed;

theta = 0;

function draw(){
    // Update velocities
    vx += deltaVx;
  	vy += deltaVy;

    // Update location
    x += vx*dt;
    y += vy*dt;

    // velocity is unchanged if there are no forces
    deltaVx = 0;
  	deltaVy = 0;
  
  	r = sqrt((x - x_massive)*(x-x_massive) + (y - y_massive)*(y - y_massive));
    Fgrav = G*M*mass/(r*r); // calculate Graviational Acceleration
  
  	theta = atan2(y - y_massive,x-x_massive);
  
  	Fx = -Fgrav*cos(theta);
    deltaVx = (Fx/mass)*dt; // = ax*dt;
  
  	Fy = -Fgrav*sin(theta);
    deltaVy = (Fy/mass)*dt; // = ay*dt;
  
    // This will clear the screen and re-draw it
    display();
  
    // Add more graphics here before the end of draw()
  	drawBlackHole(x_massive,y_massive,0,0,-Fx,-Fy);	
    drawBlob(x,y,vx,vy,Fx,Fy);
  	//print(sqrt(x*x+y*y));
  
  	// event horizon
    drawEllipse(x_massive,y_massive,2*G*M/(speed*speed),2*G*M/(speed*speed));
  
} // end draw()
