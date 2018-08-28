/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



// declare variables
var scores, activePlayer, roundScore, gamePlaying, winningScore, previouslySix;

var init = function() {
	// initialize variables
	activePlayer = 0;
	roundScore = 0;
	scores = [0, 0];
	gamePlaying = true;
	winningScore = 100;
	previouslySix = false;
	
	// reset winning score to 100
	document.getElementById('winningScore').innerHTML = winningScore;

	// Hide dice when page loads
	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';

	// set current scores to '0' on page load
	document.getElementById('score-0').innerHTML = '0';
	document.getElementById('score-1').innerHTML = '0';

	// set round scores to '0' on page load
	document.getElementById('current-0').innerHTML = '0';
	document.getElementById('current-1').innerHTML = '0';
	
	// remove winner class from player panels
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	
	// set player 1 as acctive
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	
	// remove winner from UI
	document.getElementById('name-0').innerHTML = 'Player 1';
	document.getElementById('name-1').innerHTML = 'Player 2';
}

init();

// set up event handler for mouse click of roll button
document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		// generating random number for dice from 1 to 6
		var dices = [0, 0];
		dices[0] = Math.floor(Math.random() * 6) + 1;
		dices[1] = Math.floor(Math.random() * 6) + 1;
		
		// change image for dice-0
		document.querySelector('.dice-0').src="images/dice-" + dices[0] + '.png';
		document.querySelector('.dice-0').style.display = 'block';
		
		// change image for dice-1
		document.querySelector('.dice-1').src="images/dice-" + dices[1] + '.png';
		document.querySelector('.dice-1').style.display = 'block';
		
		// set up action for dice roll
		if((dices[0] !== 1) && (dices[1] !== 1)){
			// update round score
			roundScore += dices[0] + dices[1];
			
			// display round score
			document.getElementById('current-' + activePlayer).innerHTML = roundScore;
		} else {
			// Next Player
			nextPlayer();
		}
	}
});


// add event listener for hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		// add score
		scores[activePlayer] += roundScore;
		
		// display round score in html
		document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
		
		// check if player won the game
		if (scores[activePlayer] >= winningScore) {
			// activePlayer is winner!
			document.getElementById('name-' + activePlayer).innerHTML = 'Winner!';
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			
			gamePlaying = false;
		} else {
			// next player
			nextPlayer();
		}
	}
});

var nextPlayer = function() {
	// set round score to '0'
	roundScore = 0;
	
	// display round score as '0' on page 
	document.getElementById('current-' + activePlayer).innerHTML = '0';
	
	// toggle active player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	
	// hide dice
	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';
	
	// change active player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
};

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-setWinMinus').addEventListener('click', function() {
	if(gamePlaying){
		if(winningScore > 50) {
			// reduce winning score by 50
			winningScore -= 50;
			
			// display winning score in UI
			document.getElementById('winningScore').innerHTML = winningScore;
		}
	}
});

document.querySelector('.btn-setWinPlus').addEventListener('click', function() {
	if (gamePlaying) {
		if(winningScore < 1000) {
			// increase winning score by 50
			winningScore += 50;
			
			// display winning score in UI
			document.getElementById('winningScore').innerHTML = winningScore;
		}
	}
});