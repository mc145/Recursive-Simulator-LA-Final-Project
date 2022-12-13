let totWidth = 900; 
let totHeight = 900; 

let upTranslate = 30; 
let rightTranslate = 30; 

let totUnits = 10000; 

let mat = [[1,1],[1,0]]; 

let inp1, inp2, inp3, inp4; 

let inp5, inp6; 

let btn, btn2; 
let start = [0,1]; 
let toFit = 0; 

function setup(){
    createCanvas(totWidth+500, totHeight); 

    inp1 = createInput('1')
    inp1.position(totWidth+150, 70); 
    // inp1.size(90);    
    inp1.style('height', '80px');
    inp1.style('width', '80px'); 
    inp1.style('font-size', '40px'); 
    inp1.style('text-align', 'center'); 
    
    inp2 = createInput('1'); 
    inp2.position(totWidth+250, 70); 
    inp2.style('height', '80px');
    inp2.style('width', '80px'); 
    inp2.style('font-size', '40px'); 
    inp2.style('text-align', 'center'); 
    
    inp3 = createInput('1')
    inp3.position(totWidth+150, 170); 
    inp3.style('height', '80px');
    inp3.style('width', '80px'); 
    inp3.style('font-size', '40px'); 
    inp3.style('text-align', 'center'); 

    inp4 = createInput('0')
    inp4.position(totWidth+250, 170); 
    inp4.style('height', '80px');
    inp4.style('width', '80px'); 
    inp4.style('font-size', '40px'); 
    inp4.style('text-align', 'center'); 

    inp1.input(changeFirst); 
    inp2.input(changeSecond); 
    inp3.input(changeThird); 
    inp4.input(changeFourth); 


    inp5 = createInput('0')
    inp5.position(totWidth+200, 410); 
    // inp1.size(90);    
    inp5.style('height', '30px');
    inp5.style('width', '30px'); 
    inp5.style('font-size', '15px'); 
    inp5.style('text-align', 'center'); 

    inp5.input(changeFifth); 
    
    inp6 = createInput('1'); 
    inp6.position(totWidth+250, 410); 
    inp6.style('height', '30px');
    inp6.style('width', '30px'); 
    inp6.style('font-size', '15px'); 
    inp6.style('text-align', 'center'); 

    inp6.input(changeSixth); 
    
    btn = createButton('Fit the 1st Eigenvector Line');   
    btn.position(totWidth+30, 490); 
    btn.style('height', '40px'); 
    btn.style('background-color', 'blue'); 
    btn.style('color', 'white'); 
    btn.mousePressed(fitCurve); 
    
    btn2 = createButton('Fit the 2nd Eigenvector Line');   
    btn2.position(totWidth+250, 490); 
    btn2.style('height', '40px'); 
    btn2.style('background-color', 'blue'); 
    btn2.style('color', 'white'); 

    btn2.mousePressed(fitCurve2); 
}


function draw(){

    background(167, 155, 130); 
    textFont('Georgia');

    textSize(30); 

    noStroke(); 
    text("EIGENVALUE:", totWidth + 150, 310);
    if(findEigen() == 'Complex'){
        text('Complex', totWidth + 350, 310); 
    }
    else{
    text(findEigen()[0].toFixed(2) + " and " + findEigen()[1].toFixed(2), totWidth + 350, 310); 

    }
    fill(162, 149, 0); 
    rectMode(CENTER); 
    rect(totWidth/2,totHeight/2,totWidth, totHeight); 

    fill(255); 
    noStroke();
    stroke(255);
    strokeWeight(50); 

    drawCoordinateAxes(); 

    textSize(30); 

    textAlign(CENTER); 
    text('Input the Recursive Matrix:', totWidth + 250, 40);  
    text('Input your Desired Starting Vals:', totWidth + 250, 380);  
    

    
    strokeWeight(1); 
    quadraticBezier(); 

if(toFit == 1){
   let eigenval = findEigen()[0]; 
   let sta = start; 
   stroke(255,0,0); 
   strokeWeight(3); 
    line(coordToP(sta)[0], coordToP(sta)[1],coordToP(sta)[0] + 2000, coordToP(sta)[1] + 2000 * eigenval); 
}
else if(toFit == -1){

   let eigenval = findEigen()[1]; 
   let sta = start; 
   stroke(255,0,0); 
   strokeWeight(3); 
    line(coordToP(sta)[0], coordToP(sta)[1],coordToP(sta)[0] + 2000, coordToP(sta)[1] + 2000 * eigenval); 
}




    
}

function quadraticBezier(){
    let pa = start; 
    strokeWeight(10); 
    stroke(255); 
    point(coordToP(pa)[0], coordToP(pa)[1]); 
    

    // while(Math.abs(pa[0]) <= totUnits && Math.abs(pa[1]) <= totUnits){
    for(let i = 0; i<=50; i+=0.01){
        if(Math.abs(pa[0]) > totUnits || Math.abs(pa[1]) > totUnits){
            break; 
        }
        pa = twoByTwoMult(mat, pa); 
        point(coordToP(pa)[0], coordToP(pa)[1]); 
        // console.log(pa); 
    }
}



function twoByTwoMult(mat1, mat2){
    let val1 = mat1[0][0] * mat2[0] + mat1[0][1] * mat2[1]; 
    let val2 = mat1[1][0] * mat2[0] + mat1[1][1] * mat2[1]; 

    return [val1, val2]; 

}


function fitCurve(){
    if(toFit == 1){
        toFit = 0; 
    } 
   else {
        toFit = 1; 
    }
}
function fitCurve2(){
    if(toFit == -1){
        toFit = 0; 
    }
    else{
        toFit = -1; 
    }
}

function changeFirst(){
    if(Number.isFinite(int(this.value()))){
    mat[0][0] = int(this.value()); 
    console.log(this.value()); 
    }
}

function changeSecond(){
    if(Number.isFinite(int(this.value()))){

    mat[0][1] = int(this.value()); 
    
    }
}

function changeThird(){
    if(Number.isFinite(int(this.value()))){

    console.log(this.value()); 
    mat[1][0] = int(this.value()); 
}
}

function changeFourth(){
    if(Number.isFinite(int(this.value()))){

    console.log(this.value()); 
    mat[1][1] = int(this.value()); 
    console.log("D"); 
    }
}

function changeFifth(){
    if(Number.isFinite(int(this.value()))){
        console.log("HERE"); 
        start[0] = int(this.value()); 
    }
}

function changeSixth(){
    if(Number.isFinite(int(this.value()))){
        start[1] = int(this.value()); 
    }
}
function findEigen(){
    let a = mat[0][0]; 
    let b = mat[0][1]; 
    let c = mat[1][0]; 
    let d = mat[1][1]; 

    let lambda1 = 0.5 * (a + d + Math.sqrt(a*a + 2*a*d + d * d - 4*a*d + 4*b*c));
    let lambda2 = 0.5 * (a + d - Math.sqrt(a*a + 2*a*d + d * d - 4*a*d + 4*b*c));
    if(!Number.isFinite(lambda1)){
        return ['Complex']; 
    }
    return([lambda1, lambda2]); 
}

function coordToP(p){
    x = p[0]; 
    y = p[1]; 
    let pixelX = totWidth/2 + 0.5 * totWidth/totUnits * x; 
    let pixelY = totHeight/2 - 0.5 * totHeight/totUnits * y; 
    
    return [pixelX, pixelY]; 
}





function drawCoordinateAxes(){

    
    textSize(10); 

    stroke(255);
    strokeWeight(2); 

    line(0, totHeight/2, totWidth, totHeight/2); 
    line(totWidth/2, 0, totWidth/2, totHeight); 
    strokeWeight(10); 
    // point((totWidth)/2, (totHeight/2)); 
    strokeWeight(2); 

    

}
