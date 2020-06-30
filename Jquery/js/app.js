var gridRender = []; 
var rows=7; 
var cols = 7; 
var validFigures=0;
var score = 0;
var moves = 0;
var timer;

$(document).ready(function(){
	$(".juego-terminado").hide();
	changeColor("green");
	construirTablero();
	$(".btn-reinicio").click(function(){
		console.log('score:',score,' moves:',moves)
		reiniciar(this);
		comboCandy(); 
	});
});
	
function reiniciar(obj){
	score = 0;
	moves = 0;
	$(".juego-terminado").hide();
	$(".time").show();
	$("#timer").html("02:00");
	$(".panel-tablero").fadeIn(1000);
	$(".panel-score").css("width","25%");
    $("#score-text").html("0");
    $("#movimientos-text").html("0");
    $(obj).html("REINICIAR");
	
	var timer2 = "02:00";
	clearInterval(timer);
	timer = setInterval(function() {
	  var timer = timer2.split(':');
	  var minutes = parseInt(timer[0], 10);
	  var seconds = parseInt(timer[1], 10);
	  --seconds;
	  minutes = (seconds < 0) ? --minutes : minutes;
	  seconds = (seconds < 0) ? 59 : seconds;
	  seconds = (seconds < 10) ? '0' + seconds : seconds;
	  timestr = '0'+minutes + ':' + seconds;
	  $('#timer').html(timestr);
	  if(timestr == '00:00'){
		$(".panel-tablero").fadeOut(1000,function(){$(".juego-terminado").show();$(".panel-score").css("width","100%");$(".time").hide();});
		$(obj).html("INICIAR");
	  }else{
		 timer2 = minutes + ':' + seconds; 
	  }
	}, 1000);
}

function changeColor (color){
	$(".main-titulo").animate({color:color}, "slow", function(){ 
		color == 'yellow'?changeColor("green"):changeColor("yellow") ;
	});
}

function construirTablero(){
  var grid = []; 
 for (var r = 0; r < rows; r++) {
   grid[r]=[];
   for (var c =0; c< cols; c++) {
      grid[r][c]= new candy(r,c,null,pickRandomCandy());
   }
  }
  
  var height = $('.panel-tablero').height(); 
  var cellHeight = height / 7;
  
  for (var r = 0; r < rows; r++) {
	for (var c =0; c< cols; c++) {
	  var cell = $("<img class='candy' id='candy_"+r+"_"+c+"' r='"+r+"' c='"+c+"'/>")
		.css('height', cellHeight + "px")
		.attr("src",grid[r][c].src)
		.attr("ondrop","_onDrop(event)")
		.attr("ondragover","_onDragOverEnabled(event)")
		.attr("ondragstart","_ondragstart(event)");
	  $(".col-"+(c+1)).append(cell);
	  grid[r][c].o = cell;
	}
  }
  gridRender = grid;
}

 function pickRandomCandy() {
	var candyType=["image/1.png", "image/2.png", "image/3.png", "image/4.png"];
    var pickInt = Math.floor((Math.random()*4));
    return candyType[pickInt];
 }
 
function candy(r,c,obj,src) {
	return {
		r: r, // fila
		c: c,  // columna
		src:src, // imagen
		locked:false, 
		isInCombo:false, 
		o:obj 
	}
}

function _ondragstart(a){
	a.dataTransfer.setData("text/plain", a.target.id);
}

function _onDragOverEnabled(e){
	e.preventDefault();
}

function _onDrop(e){
     var src = e.dataTransfer.getData("text");
     var sr = src.split("_")[1];
     var sc = src.split("_")[2];

     var dst = e.target.id;
     var dr = dst.split("_")[1];
     var dc = dst.split("_")[2];

     var ddx = Math.abs(parseInt(sr)-parseInt(dr));
     var ddy = Math.abs(parseInt(sc)-parseInt(dc));
     if (ddx > 1 || ddy > 1)
     {
       alert("Solo se puede cambiar dulces adyascentes");
       return;
     }
     else{
        var tmp = gridRender[sr][sc].src;
        gridRender[sr][sc].src = gridRender[dr][dc].src;
        gridRender[sr][sc].o.attr("src",gridRender[sr][sc].src);
        gridRender[dr][dc].src = tmp;
        gridRender[dr][dc].o.attr("src",gridRender[dr][dc].src);

        moves+=1;
        $("#movimientos-text").html(moves);

        comboCandy(); 
        
     }
}

function reponerCandy() {

 for (var r=0;r<rows;r++)
 {           
  for (var c=0;c<cols;c++)
  {  
	if (gridRender[r][c].isInCombo)  
	{
	  gridRender[r][c].o.attr("src","");
      gridRender[r][c].isInCombo=false;
	   
	  for (var sr=r;sr>=0;sr--)
	  {
		if (sr==0) break; 
		if (gridRender[sr-1][c].locked) break;       
		var tmp = gridRender[sr][c].src;
		gridRender[sr][c].src=gridRender[sr-1][c].src;
		gridRender[sr-1][c].src=tmp;
	  }
	} 
  }  
}   
				  
  for (var r=0;r<rows;r++)
  { for (var c = 0;c<cols;c++)
	{
	  gridRender[r][c].o.attr("src",gridRender[r][c].src);
	  gridRender[r][c].o.animate({opacity: 1}, 1000);
	  gridRender[r][c].isInCombo=false;
	  if (gridRender[r][c].src==null) 
		gridRender[r][c].respawn=true;
	  if (gridRender[r][c].respawn==true)
	  {  
		gridRender[r][c].o.off("ondragover");
		gridRender[r][c].o.off("ondrop");
		gridRender[r][c].o.off("ondragstart"); 
		gridRender[r][c].respawn=false; 
		gridRender[r][c].src=pickRandomCandy();
		gridRender[r][c].locked=false;
		gridRender[r][c].o.attr("src",gridRender[r][c].src);
		gridRender[r][c].o.attr("ondragstart","_ondragstart(event)");
		gridRender[r][c].o.attr("ondrop","_onDrop(event)");
		gridRender[r][c].o.attr("ondragover","_onDragOverEnabled(event)");
	  }
	}
  }
	  
  comboCandy();
 
} 


      function comboCandy()
      {    
      
       for (var r = 0; r < rows; r++)
        {           
        
        
          var prevCell = null;
          var figureLen = 0;
          var figureStart = null;
          var figureStop = null;
          
          for (var c=0; c< cols; c++)
          {
          
            if (gridRender[r][c].locked || gridRender[r][c].isInCombo)
            {
              figureStart = null;
              figureStop = null;
              prevCell = null;  
              figureLen = 1;
              continue;
            }
            
            if (prevCell==null) 
            {
              prevCell = gridRender[r][c].src;
              figureStart = c;
              figureLen = 1;
              figureStop = null;
              continue;
            }
            else
            {
              var curCell = gridRender[r][c].src;
              if (!(prevCell==curCell))
              {
                prevCell = gridRender[r][c].src;
                figureStart = c;
                figureStop=null;
                figureLen = 1;
                continue;
              }
              else
              {
                figureLen+=1;
                if (figureLen==3)
                {
                  validFigures+=1;
                  score+=10;
                  $("#score-text").html(score);
                  figureStop = c;
                  
                  for (var ci=figureStart;ci<=figureStop;ci++)
                  {
                     
                    gridRender[r][ci].isInCombo=true;
                    gridRender[r][ci].src=null;                     
                  }
                  prevCell=null;
                  figureStart = null;
                  figureStop = null;
                  figureLen = 1;
                  continue;
                }
              }
            }
                  
          }
        }
        
           
      
        for (var c=0; c< cols; c++)
        {              
          var prevCell = null;
          var figureLen = 0;
          var figureStart = null;
          var figureStop = null;
          
          for (var r = 0; r < rows; r++)
          {
            
            if (gridRender[r][c].locked || gridRender[r][c].isInCombo)
            {
              figureStart = null;
              figureStop = null;
              prevCell = null;  
              figureLen = 1;
              continue;
            }
            
            if (prevCell==null) 
            {
              prevCell = gridRender[r][c].src;
              figureStart = r;
              figureLen = 1;
              figureStop = null;
              continue;
            }
            else
            {
              var curCell = gridRender[r][c].src;
              if (!(prevCell==curCell))
              {
                prevCell = gridRender[r][c].src;
                figureStart = r;
                figureStop=null;
                figureLen = 1;
                continue;
              }
              else
              {
                figureLen+=1;
                if (figureLen==3)
                {
                  validFigures+=1;
                  score+=10;
                  $("#score-text").html(score);
                  figureStop = r;
                 
                  for (var ci=figureStart;ci<=figureStop;ci++)
                  {
                     
                    gridRender[ci][c].isInCombo=true;
                    gridRender[ci][c].src=null;         
                  }
                  prevCell=null;
                  figureStart = null;
                  figureStop = null;
                  figureLen = 1;
                  continue;
                }
              }
            }
                  
          }
        }
        
    
        
         var isCombo=false;
         for (var r = 0;r<rows;r++){
          for (var c=0;c<cols;c++){
            if (gridRender[r][c].isInCombo)
            { 
              isCombo=true; 
			  
              reponerCandy()
            }
		  }
			
		 }
		 
		 console.log('gridRender:',gridRender)
            
       if (isCombo)  
          limpiarCombos();
    
      }
    
  
    function limpiarCombos()
    {
         for (var r=0;r<rows;r++)  { 
          for (var c=0;c<cols;c++){
            if (gridRender[r][c].isInCombo)  
            {
              gridRender[r][c].o.animate({
                opacity:0
              },slow);
            } 
          }   
        } 
	}
      
   
