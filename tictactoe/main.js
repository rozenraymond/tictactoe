//Choose Players
var player = "";
var computer = "";
var player1Score = 0;
var player2Score = 0;

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

var checkWin;
var playerWin;
var computerWin;
var winAlert;

var newGame;

var playerData = [];
var compData = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

var checkPlayerWin = [];
var checkCompWin = [];
var turn =0;
var move = 0;

//function to put input X/O
var newGame = function() {

    $(".card").on("click", function(event) {
        if (turn === 0) {
            if (player === "o") {
                $(this).css("background-image", "url(img/o.png)");

                var playerId = event.target.id;
                playerData.push(playerId);
                checkPlayerWin.push(playerId);

                var index = compData.indexOf(playerId);
                compData.splice(index, 1);

                console.log(checkPlayerWin);
                move += 1;

            } else {
                $(this).css("background-image", "url(img/x.png)");

                var playerId2 = event.target.id;
                playerData.push(playerId2);
                checkPlayerWin.push(playerId2);
                var index2 = compData.indexOf(playerId2);
                compData.splice(index2, 1);
                console.log(checkPlayerWin);
                move += 1;
            }

            checkWin();

            turn = 1;


            if(playerWin === true ){
                //alert("You win!");
                fallingSnow(); // Falling snow as reward
                swal({
                  title: 'You are the winner',
                  html: $('<div>')
                    .addClass('some-class')
                    .text('Great Job!'),
                  animation: false,
                  customClass: 'animated tada'
                }).then( function () {
                    player1Score++;
                    $( "#score1" ).html( "Score: " + player1Score );
                    newGame();
                  });

                return; // If the player wins, no need to execute the remaining code
            }
            compMove();
            checkWin();
            if(computerWin === true){
                // alert("Sorry, you lose");

                fallingSnow(); // Falling snow as reward
                swal({
                  title: 'You lose!',
                  html: $('<div>')
                    .addClass('some-class')
                    .text('Better luck next time!'),
                  animation: false,
                  customClass: 'animated tada'
                }).then( function () {
                  player1Score++;
                  $( "#score1" ).html( "Score: " + player1Score );
                  newGame();
                });

                return; // If the comp wins, no need to execute the remaining code
            }

            if (move > 9) {
                // alert("It's a tie!");
                swal({
                  title: "It's a tie",
                  html: $('<div>')
                    .addClass('some-class')
                    .text('Better luck next time!'),
                  animation: false,
                  customClass: 'animated tada'
                });
            }


        }
    });
};


// call function of game to run when doc is ready
$(document).ready(function() {
    newGame();
});

// computer move
var compMove = function() {

    var moveC = Math.floor(Math.random() * compData.length);
    var moveIndex = compData[moveC];
    if (computer === "o") {
        $("#" + moveIndex).css("background-image", "url(img/o.png)");
        checkCompWin.push(moveIndex);
    } else {
        $("#" + moveIndex).css("background-image", "url(img/x.png)");
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
var checkWin = function(x) {

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
                    // winAlert();
                    return playerWin;
                }
            } else if (winningCombinations[i].includes(checkCompWin[j])) {
                compMatches += 1;
                // set matches to be 0 again, to test the next of the winning combinations
                if (compMatches === 3) {
                    console.log("Hello World");
                    computerWin = true;
                    // winAlert();
                    return computerWin;
                }
            }
        }
    }
};


// Snow Falling
    function fallingSnow() {
        var $snowflakes = $(),
            createSnowflakes = function () {
                var qt = 100;
                for (var i = 0; i < qt; ++i) {
                    var $snowflake = $('<div class="snowflakes"></div>');
                    $snowflake.css({
                        'left': (Math.random() * $('#site').width()) + 'px',
                        'top': (- Math.random() * $('#site').height()) + 'px'
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
                            opacity : "0",
                        }, Math.random()*-2500 + 5000, function(){
                            // this particular snow flake has finished, restart again
                            $flake.css({
                                'left': (Math.random() * $('#site').width()) + 'px',
                                'top': (- Math.random() * $('#site').height()) + 'px',
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
