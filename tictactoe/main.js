//Choose Players
var player="";
var computer="";

$( "#playerOne" ).click(function() {
// alert( "You are player 1." );
  player ="x";
  computer ="o";
});

$( "#playerTwo" ).click(function() {
//  alert( "You are player 2." );
  player ="o";
  computer="x";
});

var turn= 0;
var move = 0;

var checkWin;
var playerWin;
var computerWin;
var winAlert;

var newGame;

var playerData =[];
var compData =["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];


//function to put input X/O
var newGame = function(){
  $(".card").one("click", function(event){
    if(turn === 0){
      if(player === "o"){
        $(this).css("background-image", "url(img/o.png)");
        var playerId= event.target.id;
        playerData.push(playerId);
        

      }
      else{
        $(this).css("background-image", "url(img/x.png)");
        var playerId2 = event.target.id;
        playerData.push(playerId2);
      }
      boardCheck();
      checkWin();
      turn = 1;
      compMove();
      boardCheck();
      checkWin();
    }
  });
};


// call function of game to run when doc is ready
$(document).ready(function () {
    newGame();
});

// computer move
var compMove = function () {
  var moveNo = Math.floor(Math.random()*9);
  // moves = moveNo.toString();
  console.log(moveNo);
  turn = 0;
};

// CREATES A FUNCTION TO DETECT WHAT IS IN EACH BOX AFTER EACH MOVE
boardCheck = function () {
    a1 = $('#a1').html();
    a2 = $('#a2').html();
    a3 = $('#a3').html();
    b1 = $('#b1').html();
    b2 = $('#b2').html();
    b3 = $('#b3').html();
    c1 = $('#c1').html();
    c2 = $('#c2').html();
    c3 = $('#c3').html();
};

// CREATES A FUNCTION TO DETECT A WIN OR A TIE
checkWin = function () { // CHECKS IF X WON
    if ((a1 == a2 && a1 == a3 && (a1 == "x")) || //first row
    (b1 == b2 && b1 == b3 && (b1 == "x")) || //second row
    (c1 == c2 && c1 == c3 && (c1 == "x")) || //third row
    (a1 == b1 && a1 == c1 && (a1 == "x")) || //first column
    (a2 == b2 && a2 == c2 && (a2 == "x")) || //second column
    (a3 == b3 && a3 == c3 && (a3 == "x")) || //third column
    (a1 == b2 && a1 == c3 && (a1 == "x")) || //diagonal 1
    (a3 == b2 && a3 == c1 && (a3 == "x")) //diagonal 2
    ) {
        xWin = true;
        winAlert();

    } else { // CHECKS IF O WON
        if ((a1 == a2 && a1 == a3 && (a1 == "o")) || //first row
        (b1 == b2 && b1 == b3 && (b1 == "o")) || //second row
        (c1 == c2 && c1 == c3 && (c1 == "o")) || //third row
        (a1 == b1 && a1 == c1 && (a1 == "o")) || //first column
        (a2 == b2 && a2 == c2 && (a2 == "o")) || //second column
        (a3 == b3 && a3 == c3 && (a3 == "o")) || //third column
        (a1 == b2 && a1 == c3 && (a1 == "o")) || //diagonal 1
        (a3 == b2 && a3 == c1 && (a3 == "o")) //diagonal 2
        ) {
            oWin = true;
            winAlert();

        } else { // CHECKS FOR TIE GAME IF ALL CELLS ARE FILLED
            if (((a1 == "x") || (a1 == "o")) && ((b1 == "x") || (b1 == "o")) && ((c1 == "x") || (c1 == "o")) && ((a2 == "x") || (a2 == "o")) && ((b2 == "x") || (b2 == "o")) && ((c2 == "x") || (c2 == "o")) && ((a3 == "x") || (a3 == "o")) && ((b3 == "x") || (b3 == "o")) && ((c3 == "x") || (c3 == "o"))) {
                alert("It's a tie!");
            }
        }
    }
};


// Determine the winner & alert winner
var winAlert = function () {
    if (xWin === true) {
        alert("You won!");
    } else {
        if (oWin === true) {
            alert("Sorry, you lose!");
        }
    }
};
