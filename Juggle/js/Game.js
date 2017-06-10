var WIDTH;
var HEIGHT;
var ctx;
var interid = 0;

var singlepaddlex;
var singlepaddleh;
var singlepaddlew;

var splitpadDistance = 0;
var splitsinglepaddlex;
var splitsinglepaddleh;
var splitsinglepaddlew;
var spreadpad;
var joinpad;
var splitpad = false;
var splitinc = .75;

var xcanmin;
var xcanmax;
var timecount = 0;
var Balls = [];
var colorlist = ["green", "red", "purple", "orange", "blue", "pink"];
var colorcount = 0;
var timelimit = 300;
var ballcount = 1;
var bouncecount = 0;
var mousposition;
var refreshrate = 30

function startGame() {
	  ctx = $('#canvas')[0].getContext("2d");
  	singlepaddlex = WIDTH / 2;
  	xcanmin = $("#canvas").offset().left;
  	xcanmax = xcanmin + WIDTH;
    loadballs();
    var ballstring = ballcount.toString();
    $("#ballcount").text(ballstring);
  	interid = setInterval(animategame, refreshrate);
    var bouncecountstring = bouncecount.toString();
    $("#bouncecount").text(bouncecountstring);
}


function createPaddle() {
  singlepaddlex = WIDTH / 2;
  singlepaddleh = .024*HEIGHT;
  singlepaddlew = .149*WIDTH;
  lsplitpaddle  = singlepaddlex;
  rsplitpaddle = singlepaddlex;
  lsplitpaddlew = singlepaddlew;
  rsplitpaddlew = singlepaddlew;
}

function setMouse() {
  xcanmin = $("#canvas").offset().left;
  xcanmax = xcanmin + WIDTH;
}

function loadballs(){
    var randelta_x;
    for(i = 0; i < colorlist.length; i++)
    {
      var randelta_y = Math.floor((Math.random() * 3) + 2);
      var choose = Math.random();
      if(choose > .5)
        randelta_x = Math.floor((Math.random() * -1)  - 2);
      else
        randelta_x = Math.floor((Math.random() * 2)  + 1);
      var aball = new ball(WIDTH/2,0,randelta_x,randelta_y,.009*WIDTH+.009*HEIGHT,colorlist[i]);
      Balls.push(aball);
    }
}

function onMouseMove(evt) {  
    if (evt.pageX > xcanmin && evt.pageX < xcanmax) {
      singlepaddlex = Math.max(evt.pageX - xcanmin - (singlepaddlew/2), 0);
      singlepaddlex = Math.min(WIDTH - singlepaddlew, singlepaddlex);
    }
}

$(document).mousemove(onMouseMove);

function OnClick(evt){
    // make first split
    if(splitpad == false){
      splitpad = true;
      joinpad = false;
      spreadpad = true;
      splitpadDistance = 0;
    }else if (splitpad == true && joinpad == false && spreadpad == true){
      joinpad = true;
      spreadpad = false;
    }else if (splitpad == true && joinpad == true && spreadpad == false){
      joinpad = false;
      spreadpad = true;
    }
}

$(document).click(OnClick);

function OnDbClick(evt){
     if(splitpad == true){
        splitpad = false;
        lsplitpaddle  = singlepaddlex;
        rsplitpaddle = singlepaddlex;
        lsplitpaddlew = singlepaddlew;
        rsplitpaddlew = singlepaddlew;
        splitpadDistance = 0;
    }
}
$(document).click(function(){
  $(document).dblclick(OnDbClick);
});

function circle(x,y,r,color) {  
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}


function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function printGameOver(){
  clear();
  ctx = $('#canvas')[0].getContext("2d");
  ctx.font = "30px papyrus Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", WIDTH/2, HEIGHT/2);
}

function ball(x,y,delta_x,delta_y,r,color){
    this.x = x;
    this.y = y;
    this.delta_x = delta_x;
    this.delta_y = delta_y;
    this.r = r;
    this.color = color;
} 

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function animategame() {
  clear();
  timecount += 1;
  if(timecount > timelimit){
      timelimit+=400;
      if(ballcount < Balls.length){
        ballcount+=1;
        var ballstring = ballcount.toString();
        $("#ballcount").text(ballstring);
        splitinc= splitinc - .09;

      }
      else{
        loadballs();
      }
  } 


    
  for(i = 0;i < ballcount; i++){

      circle(Balls[i].x, Balls[i].y, Balls[i].r, Balls[i].color);
  
      if(splitpad == true && joinpad == false && spreadpad == true){
          splitpadDistance += splitinc;
      }else if(splitpad == true && joinpad == true && spreadpad == false && splitpadDistance > 0){
            splitpadDistance -= splitinc;
      }else{
        splitpad = false;
        lsplitpaddle  = singlepaddlex;
        rsplitpaddle = singlepaddlex;
        lsplitpaddlew = singlepaddlew;
        rsplitpaddlew = singlepaddlew;
        //splitpadDistance = 0;
      }
      if(splitpad == true && splitpadDistance > 0){
        // hits the min end of canvas
        if(singlepaddlex - splitpadDistance > 0)
          lsplitpaddle  = singlepaddlex - splitpadDistance;
        else{
          lsplitpaddle = 0;
          joinpad == true;
          spreadpad == false;
        }
        // hits the max end of canvas
        if(singlepaddlex + splitpadDistance  + singlepaddlew/2 + singlepaddlew/5 < WIDTH){
          rsplitpaddle = singlepaddlex + splitpadDistance;
          rsplitpaddlew = singlepaddlew/2 + singlepaddlew/5;
        }
        else{
          rsplitpaddlew = (singlepaddlew/2 + singlepaddlew/5);
          rsplitpaddle = WIDTH - (singlepaddlew/2 + singlepaddlew/5);
          joinpad == true;
          spreadpad == false;
        }
        lsplitpaddlew = singlepaddlew/2 + singlepaddlew/5;
        
          rect(lsplitpaddle, HEIGHT-singlepaddleh, lsplitpaddlew, singlepaddleh);
          rect(rsplitpaddle, HEIGHT-singlepaddleh, rsplitpaddlew, singlepaddleh);
        
      }
      else{
      
          rect(singlepaddlex, HEIGHT-singlepaddleh, singlepaddlew, singlepaddleh);
        
      }

      if (Balls[i].x + Balls[i].delta_x + Balls[i].r> WIDTH || Balls[i].x  + Balls[i].delta_x - Balls[i].r< 0)
        Balls[i].delta_x = -Balls[i].delta_x;
      // change direction if hitting the ceiling
      if (Balls[i].y + Balls[i].delta_y < 0){
        Balls[i].delta_y = -Balls[i].delta_y;
      }// change direction if hitting the floor
      else if (Balls[i].y + Balls[i].delta_y + Balls[i].r > HEIGHT - singlepaddleh) {
        if ((Balls[i].x > singlepaddlex && Balls[i].x < singlepaddlex + singlepaddlew) && splitpad == false){
          bouncecount+=1;
          var bouncecountstring = bouncecount.toString();
          $("#bouncecount").text(bouncecountstring);
          Balls[i].delta_x = 2*((Balls[i].x -(singlepaddlex+singlepaddlew/2))/singlepaddlew);
          Balls[i].delta_y = -Balls[i].delta_y;
        }else if (Balls[i].x > lsplitpaddle && (Balls[i].x < lsplitpaddle + lsplitpaddlew) && (splitpad == true)){
          bouncecount+=1;
          var bouncecountstring = bouncecount.toString();
          $("#bouncecount").text(bouncecountstring);
          Balls[i].delta_x = ((Balls[i].x - (lsplitpaddle+lsplitpaddlew/2))/lsplitpaddlew);
          Balls[i].delta_y = -Balls[i].delta_y;
        }else if (Balls[i].x > rsplitpaddle && (Balls[i].x < rsplitpaddle + rsplitpaddlew) && (splitpad == true)){
          bouncecount+=1;
          var bouncecountstring = bouncecount.toString();
          $("#bouncecount").text(bouncecountstring);
          Balls[i].delta_x = ((Balls[i].x - (rsplitpaddle+rsplitpaddlew/2))/rsplitpaddlew);
          Balls[i].delta_y = -Balls[i].delta_y;
        }
        else{
          //clear();
          printGameOver();
          clearInterval(interid);
        }
      }
      Balls[i].x  += Balls[i].delta_x;
      Balls[i].y  += Balls[i].delta_y;
    }
}

fitCanvas = function () {
    var width = $('body').width();
    var height = $('body').height();
    var headerHeight = $('header').outerHeight();
    var footerHeight = $('footer').outerHeight();
    var TdivHeight1 = $('#game_title').height();
    var TdivHeight2 = $('#game_title').outerHeight();
    var canvaswidth =  width;
    var canvasheight =  height - headerHeight  - footerHeight - TdivHeight1 - TdivHeight2;
    $('#canvas').attr({width: canvaswidth, height: canvasheight});
    }
$(document).ready(function(){
  fitCanvas();
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height(); 
  startGame();
  createPaddle();
  setMouse();

});
 

