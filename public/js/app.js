//Global variables
var scores, roundScores, activePlayer, isGamePlaying;

//initiate game
init();

//changing dice value
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isGamePlaying) {
        //getting a random no from 0 to 6
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').style.display = 'block';
        // console.log(dice);
        //changing the src of img tag
        document.querySelector('.dice').src = 'public/img/dice-' + dice + '.png';
        if (dice === 1) {
            //change players
            nextPlayer();

        } else {
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        }
    }
});

//changing players and retaining scores when hold is clicked
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isGamePlaying) {
        scores[activePlayer] += roundScores;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var finalScore;
        if (input) {
            finalScore = input;
        } else {
            finalScore = 100;
        }
        // console.log(input, finalScore);
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('.dice').style.display = 'none';
            isGamePlaying = false;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'winner';
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
        } else {
            //player change
            nextPlayer();
        }
    }

});

//new game button
document.querySelector('.btn-new').addEventListener('click', function () {
    init();
});

function nextPlayer() {
    document.querySelector('.dice').style.display = 'none';
    //toggling the active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //reset round scores
    roundScores = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScores;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
};

function init() {

    scores = [0, 0]; // all players score
    roundScores = 0; // each players score in a round
    activePlayer = 0; // two players 0 and 1
    isGamePlaying = true; // tells whether game is being played or fininshed

    //initialising the game with zero values
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    //removing previous games values
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
};