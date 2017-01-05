var player = "x";
var computer = "o";
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

var move = 0;

var newGame = function (){
    var playerWin = false;
    var computerWin = false;

    var playerData = [];

    var checkPlayerWin = [];

    var turn = 0;
    move = 0;

    //remove the falling balloons
    var snowflakes = document.querySelectorAll( ".snowflakes" ); // Remove the snowflakes

    for ( var i = 0; i < snowflakes.length; i++ ) {
        snowflakes[ i ].remove();
    }

    // remove all the x and o images
    $(".card").css("background-image", "none");

    // player turn to choose
    $(".card").on("click", function() {
        //turn = 0, indicating player turn to choose
        if (turn === 0) {
            if (player === "o") {
                $(this).css("background-image", "url(img/o_new.png)");
                $(this).css("background-size", "cover");

                var playerId = $(this).attr("id");

                playerData.push(playerId);
                checkPlayerWin.push(playerId);

                var index = compData.indexOf(playerId);
                compData.splice(index, 1);

                move += 1;
                checkWin();
                alertWin();
                turn = 1;

            }
        } else{
            $(this).css("background-image", "url(img/x_new.png)");
            $(this).css("background-size", "cover");
            var playerId2 = event.target.id;
            playerData.push(playerId2);
            checkPlayerWin.push(playerId2);
            var index2 = compData.indexOf(playerId2);
            compData.splice(index2, 1);
            move += 1;
            checkWin();
            alertWin();
            turn = 1;
        }

    });

    compMove();

};

// computer move
var compMove = function() {
    var compData = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var checkCompWin = [];

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
    checkWin();
    alertWin();
};


// winning combination
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

//Check Win
var checkWin = function(){
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

//Alert Win
var alertWin = function (){

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
        return;
        });
    }

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
        });
        return;
    }

};


$(document).ready(function(){
    newGame();
});
