
# Juggle 
<b>Object:</b> Keep the balls from hitting the floor

<b>Game Play</b>:
  - One Click 
    * Divides single paddle causing paddle halves to gradually drift apart
    * Or, makes already divided paddle halves drift together until re-merged
  - Two Clicks
    * Causes divided paddle to snap together

<b>Challenge:</b>
  Maximize the number of bounces within a game. As more balls are introduced the speed of the divided paddle's drift
  gradually increases along with the speed of the bouncing balls.

<div data-role="page">
<div id="game_title" data-role="header">                
<span id="green">J</span>
<span id="red">u</span>
<span id="purple">g</span>
<span id="blue">g</span>
<span id="grey">l</span>
<span id="pink">e</span>
</div>
<div id="content" data-role="main" class="ui-content">
<canvas id="canvas" width="600px" height="500px"></canvas>
</div>
            
<div data-role="footer">
<span id="balls">  Balls:   <span id="ballcount"></span></span> 
<span id="bounces">Bounces: <span id="bouncecount"></span></span> 
</div>
</div>
<script type="text/javascript" src="js/jquery-1.11.1.min.js" id="cordova-jquery"></script>
<script type="text/javascript" src="js/jquery-1.5.0.mobile.min.js"></script>
<script type="text/javascript" src="js/Game.js"></script>
<script type="text/javascript" src="js/index.js"></script>
