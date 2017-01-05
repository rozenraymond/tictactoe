//Choose Players
var player = "x";
var computer = "o";
var player1Score = 0;
var player2Score = 0;


var choosePlayer = function(){
  swal({
      title: 'Please choose player',
      showCancelButton: true,
      confirmButtonColor: '#FFF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Player One',
      cancelButtonText: 'Player Two',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
  }).then(function() {
      player = "x";
      computer = "o";
  }, function(dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
          player = "o";
          computer = "x";
      }
  });
};

var removeSnowflake = function(){
  var snowflakes = document.querySelectorAll( ".snowflakes" ); // Remove the snowflakes

  for ( var i = 0; i < snowflakes.length; i++ ) {
      snowflakes[ i ].remove();
  }
};


var checkWin;
var playerWin;
var computerWin;
var winAlert;

var newGame;

var playerData = [];
var compData = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

var checkPlayerWin = [];
var checkCompWin = [];
var turn = 0; //To determine if it's computer turn or player turn
var move = 0; //If move == 9, it's a tie

//function to put input X/O images when user click on the box (with the class name of card)
var newGame = function() {
  playerWin = false;
  computerWin = false;
  playerData = [];
  compData = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  checkPlayerWin = [];
  checkCompWin = [];

  turn = 0;
  move = 0;


    $(".card").on("click", function(event) {
        if (turn === 0) {
            if (player === "o") {
                $(this).css("background-image", "url(img/o_new.png)");
                $(this).css("background-size", "cover");

                var playerId = $(this).attr("id");
                if (playerData.includes(playerId)){
                  return;
                }
                else{
                playerData.push(playerId);
                checkPlayerWin.push(playerId);
                console.log("CheckPlayerWin" + checkPlayerWin);

                var index = compData.indexOf(playerId);
                compData.splice(index, 1);

                console.log(checkPlayerWin);
                move += 1;
              }
            } else {

                $(this).css("background-image", "url(img/x_new.png)");
                $(this).css("background-size", "cover");
                var playerId2 = event.target.id;
                if (playerData.includes(playerId2)){
                  return;
                }else {
                  playerData.push(playerId2);
                  checkPlayerWin.push(playerId2);
                  var index2 = compData.indexOf(playerId2);
                  compData.splice(index2, 1);
                  move += 1;
                }

            }

            checkWin();

            turn = 1;


            if (playerWin === true) {
                console.log(playerWin);
                fallingSnow(); // Falling snow as reward
                swal({
                    title: 'You are the winner',
                    html: $('<div>')
                        .addClass('some-class')
                        .text('Great Job!'),
                    animation: false,
                    customClass: 'animated tada'
                }).then(function() {

                    if (player === "x"){
                        player1Score++;
                        $("#score1").html("Score: " + player1Score);
                        secondGame();
                        // newGame();
                    }
                    else{
                        player2Score++;
                        $("#score2").html("Score: " + player2Score);
                        secondGame();
                        // newGame();
                    }

                });

                return; // If the player wins, no need to execute the remaining code
            }

            compMove();
            checkWin();


            if (computerWin === true) {

                swal({
                    title: 'You lose!',
                    html: $('<div>')
                        .addClass('some-class')
                        .text('Better luck next time!'),
                    animation: false,
                    customClass: 'animated tada'
                }).then(function() {
                    if (computer === "x"){
                        player1Score++;
                        $("#score1").html("Score: " + player1Score);
                        secondGame();
                    }
                    else{
                        player2Score++;
                        $("#score2").html("Score: " + player2Score);
                        secondGame();
                    }
                });

                return; // If the comp wins, no need to execute the remaining code
            }

            if (move > 9) {
                swal({
                    title: "It's a tie",
                    html: $('<div>')
                        .addClass('some-class')
                        .text('Better luck next time!'),
                    animation: false,
                    customClass: 'animated tada'
                }).then(function() {
                    if (computer === "x"){
                        $("#score1").html("Score: " + player1Score);
                        secondGame();
                    }
                    else{
                        $("#score2").html("Score: " + player2Score);
                        secondGame();
                    }
                });
                return;
            }


        }
    });
};

var secondGame = function(){
    removeSnowflake();
    $(".card").css("background-image", "none");
    newGame();
};

//When player wants to reset the game, changing the scores to 0
var resetGame = function (){
    $(".reset").on("click", function() {
      removeSnowflake();

      choosePlayer();

        player1Score = 0;
        $("#score1").html("Score: " + player1Score);

        player2Score = 0;
        $("#score2").html("Score: " + player2Score);

    $(".card").css("background-image", "none");

    newGame();

    });
};



// call function of game to run when doc is ready
$(document).ready(function() {
    choosePlayer();
    newGame();
    // secondGame();
    resetGame();

});

// computer move
var compMove = function() {

    var moveC = Math.floor(Math.random() * compData.length);
    var moveIndex = compData[moveC];
    if (computer === "o") {
        $("#" + moveIndex).css("background-image", "url(img/o_new.png)");
        $("#" + moveIndex).css("background-size", "cover");
        checkCompWin.push(moveIndex);
    } else {
        $("#" + moveIndex).css("background-image", "url(img/x_new.png)");
        $("#" + moveIndex).css("background-size", "cover");
        checkCompWin.push(moveIndex);
    }
    compData.splice(moveC, 1);
    move += 1;
    turn = 0;
};

var winningCombinations = [
    ["one", "two", "three"],
    ["four", "five", "six"],
    ["seven", "eight", "nine"],
    ["one", "four", "seven"],
    ["two", "five", "eight"],
    ["three", "six", "nine"],
    ["three", "five", "seven"],
    ["one", "five", "nine"]
];

// put this in a function that we call after every move:
var checkWin = function() {

    for (var i = 0; i < winningCombinations.length; i++) {
        var playerMatches = 0;
        var compMatches = 0;
        // winningCombinations[i] will be one winning combination.
        // Now iterate over all the elements in checkPlayerWin
        for (var j = 0; j < checkPlayerWin.length; j++) {
            if (winningCombinations[i].includes(checkPlayerWin[j])) {
                playerMatches += 1; //check if checkPlayer[j] is within the winningCombinations[i]
                if (playerMatches === 3) {
                    playerWin = true;
                    return playerWin;
                }
            } else if (winningCombinations[i].includes(checkCompWin[j])) {
                compMatches += 1;
                // set matches to be 0 again, to test the next of the winning combinations
                if (compMatches === 3) {
                    computerWin = true;
                    return computerWin;
                }
            }
        }
    }
};

var alertWin = function (){

};


// Snow Falling
function fallingSnow () {

    var $snowflakes = $(),
        createSnowflakes = function() {
            var qt = 100;
            for (var i = 0; i < qt; ++i) {
                var $snowflake = $('<div class="snowflakes"></div>');
                $snowflake.css({
                    'left': (Math.random() * $('#site').width()) + 'px',
                    'top': (-Math.random() * $('#site').height()) + 'px'
                });
                // add this snowflake to the set of snowflakes
                $snowflakes = $snowflakes.add($snowflake);
            }
            $('#snowZone').prepend($snowflakes);
        },

        runSnowStorm = function() {
            $snowflakes.each(function() {

                var singleAnimation = function($flake) {
                    $flake.animate({
                        top: "500px",
                        opacity: "0",
                    }, Math.random() * -2500 + 5000, function() {
                        // this particular snow flake has finished, restart again
                        $flake.css({
                            'left': (Math.random() * $('#site').width()) + 'px',
                            'top': (-Math.random() * $('#site').height()) + 'px',
                            'opacity': 1
                        });
                        singleAnimation($flake);
                    });
                };
                singleAnimation($(this));
            });
        };

    createSnowflakes();
    runSnowStorm();
}
