'use strict';

// Elements Selection
    const player0 = document.querySelector('.player--0');
    const player1 = document.querySelector('.player--1');
    const score0=document.getElementById('score--0');
    const score1=document.getElementById('score--1');
    const current0 = document.getElementById('current--0');
    const current1 = document.getElementById('current--1');
    const diceEl = document.querySelector('.dice');
    const btnNew = document.querySelector('.btn--new');
    const btnRoll = document.querySelector('.btn--roll');
    const btnHold = document.querySelector('.btn--hold');

    let currentScore=0, scores, activePlayer,playing;

//function declaration to reinitialize the game
const init=function()
{
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceEl.classList.add('hidden');
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;  
    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active'); 
}

//init function call
init();

//switch active player declaration
const switchActivePlayer=function()
{
    //const chkActive=document.querySelector('.player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//roll the dice
const roll=function()
{
    
    if (playing)
    {
        //Dice Number Generation
        let num=Math.trunc(Math.random()*6)+1;
        console.log(num);
        //show dice on based on number being generated
        diceEl.classList.remove('hidden');
        diceEl.src=`dice-${num}.png`;

        //roll the dice till once
        if(num!==1)
        {
            currentScore+=num;
          document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else
    {
        //call switch player
        switchActivePlayer();
    }
    }
    
 
    
}

const hold=function () {
    if (playing) {
        if (currentScore>1)
        {
      // 1. Add current score to active player's score
      scores[activePlayer] += currentScore;
      // scores[1] = scores[1] + currentScore
  
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
  
      // 2. Check if player's score is >= 20
      if (scores[activePlayer] >= 20) {
        // Finish the game
        playing = false;
        diceEl.classList.add('hidden');
  
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      } else {
        // Switch to the next player
        switchActivePlayer();
      }
    }
  }
}

  //window.onload=init;

btnRoll.addEventListener('click',roll);

btnHold.addEventListener('click',hold);

btnNew.addEventListener('click',init);