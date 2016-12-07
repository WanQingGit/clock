var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var appointedTime = new Date(2016, 10, 7, 18, 47, 52);
var remainingTime = 0;
var refresh = {};
var balls = [];
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];
//var refreshTime=0;
window.onload = function () {
    /* WINDOW_WIDTH = document.body.clientWidth;
     WINDOW_HEIGHT = document.body.clientHeight;
     MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
     RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1
     MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);*/
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    //remainingTime = getRemainingTime();
    console.info(convert(new Date().getTime()));
    //render(context);
    /*  console.info(WINDOW_WIDTH);
     console.info(WINDOW_HEIGHT);*/
    setInterval(function () {
        update();
        render(context);
        //remainingTime=getRemainingTime();
    }, 100)
}
function getRemainingTime() {
    var rest = Math.floor((appointedTime.getTime() - new Date().getTime() )/ 1000);
  /*  if(rest>0){

    }*/
    return rest > 0 ? rest : 0;
}
function convert(time) {
    var theRest = parseInt(time % 86400);
    var h = parseInt(theRest / 3600);
    return {
        days: parseInt(time / 86400),
        hours: h,
        minutes: parseInt((theRest - h * 3600) / 60),
        seconds: theRest % 60
    }
}
function render(context) {
    context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(refresh.hours / 10), context)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(refresh.hours % 10), context)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(refresh.minutes / 10), context);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(refresh.minutes % 10), context);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(refresh.seconds / 10), context);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(refresh.seconds % 10), context);
    for( var i = 0 ; i < balls.length ; i ++ ){
        context.fillStyle=balls[i].color;

        context.beginPath();
        context.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        context.closePath();

        context.fill();
    }
}
function renderDigit(x, y, num, context) {

    context.fillStyle = "rgb(0,102,153)";
    //alert(digit[num].length);
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                context.beginPath();
                context.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                context.closePath()

                context.fill()
            }
}
function update() {
    updateBalls();
    var refreshTime = getRemainingTime();
    if (refreshTime == remainingTime)
        return;
    var current = convert(remainingTime);
    refresh = convert(refreshTime);

       if( parseInt(current.hours/10) != parseInt(refresh.hours/10) ){
     addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(refresh.hours/10) );
     }
     if( parseInt(current.hours%10) != parseInt(refresh.hours%10) ){
     addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(refresh.hours/10) );
     }

     if( parseInt(current.minutes/10) != parseInt(refresh.minutes/10) ){
     addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(refresh.minutes/10) );
     }
     if( parseInt(current.minutes%10) != parseInt(refresh.minutes%10) ){
     addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(refresh.minutes%10) );
     }

     if( parseInt(current.seconds/10) != parseInt(refresh.seconds/10) ){
     addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(refresh.seconds/10) );
     }
     if( parseInt(current.seconds%10) != parseInt(refresh.seconds%10) ){
     addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(refresh.seconds%10) );
     }

    remainingTime = refreshTime;


    console.log( balls.length)
}
function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}
function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
}
function changeTime(){

var time=$("#index_date input");
    //alert(time[0].value);
    appointedTime=new Date(time[0].value,time[1].value,time[2].value);
    $("#myModal").modal('hide');
    alert(convert(getRemainingTime()).days);
}