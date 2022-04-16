window.addEventListener('DOMContentLoaded', function () {
  // Execute after page load
  
  let deckSelector = document.getElementById('deckSelector');
  let outMessage = document.getElementById('outMessage');
  let dealerHandDiv = document.getElementById('dealer-hand');
  let playerHandDiv = document.getElementById('player-hand');
  let buttonsWrapper = document.getElementById('buttons')
  let dealBtn = document.getElementById('deal-button');
  let hitBtn = document.getElementById('hit-button');
  let standBtn = document.getElementById('stand-button');
  let resetBtn = document.getElementById('reset-button');
  let oneDeckBtn = document.getElementById('1deck');
  let threeDecksBtn = document.getElementById('3decks');
  let sixDecksBtn = document.getElementById('6decks');
  let dealerHand = [];
  let playerHand = [];
  let dealerPoints = document.getElementById('dealer-points');
  let playerPoints = document.getElementById('player-points');
  let deck = [];
  testy testy test
  
  // "Deals Card" / Adds card image to player data array and checks if player busts afterwards
  function dealCard(player, playerArr, playerName) {
    isDeckEmpty();
    shuffle(deck);
    let card = document.createElement('img');
    let cardImage = deck.pop();
    if (cardImage.rank == 13) {
      cardImage.rank = 'king';
      card.setAttribute('src', `./images/${cardImage.rank}_of_${cardImage.suit}.png`);
      cardImage.rank = 13;
    } else if (cardImage.rank == 12) {
      cardImage.rank = 'queen';
      card.setAttribute('src', `./images/${cardImage.rank}_of_${cardImage.suit}.png`);
      cardImage.rank = 12;
    } else if (cardImage.rank == 11) {
      cardImage.rank = 'jack';
      card.setAttribute('src', `./images/${cardImage.rank}_of_${cardImage.suit}.png`);
      cardImage.rank = 11;
    } else if (cardImage.rank == 1) {
      cardImage.rank = 'ace';
      card.setAttribute('src', `./images/${cardImage.rank}_of_${cardImage.suit}.png`);
      cardImage.rank = 1;
    } else {
      card.setAttribute('src', `./images/${cardImage.rank}_of_${cardImage.suit}.png`);
    }
    player.appendChild(card);
    playerArr.push(cardImage);
    if (getScore(playerArr) > 21) {
      document.getElementById('messages').innerText = `${playerName} busts!`;
      hitBtn.style.display = 'none';
      standBtn.style.display = 'none';
      resetBtn.style.display = '';
    } else if(getScore(playerArr) == 21) {
      document.getElementById('messages').innerText = `${playerName} wins!`;
      hitBtn.style.display = 'none';
      standBtn.style.display = 'none';
      resetBtn.style.display = '';
    }
  }

  // Build 1, 3, 6 decks
  function buildDeck(decks) {
    arr = [];
    for (let j = 0; j < decks; j++) {
      for (let i = 1; i <= 13; i++) {
        let card = { rank: i, suit: 'hearts' };
        arr.push(card);
      }
      for (let i = 1; i <= 13; i++) {
        let card = { rank: i, suit: 'spades' };
        arr.push(card);
      }
      for (let i = 1; i <= 13; i++) {
        let card = { rank: i, suit: 'clubs' };
        arr.push(card);
      }
      for (let i = 1; i <= 13; i++) {
        let card = { rank: i, suit: 'diamonds' };
        arr.push(card);
      }
    }
    return arr;
  }

  // Shuffle deck(s) array
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  
  // Return score from player data array
  function getScore(playerArr) {
    let score = 0;
    for (i in playerArr) {
      if (playerArr[i].rank == 13) {
        score += 10;
      } else if (playerArr[i].rank == 12) {
        score += 10;
      } else if (playerArr[i].rank == 11) {
        score += 10;
      } else {
        score += playerArr[i].rank;
      }
    }
    return score;
  }
  // Function to clear all elements from parent element
  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

   // Checks if deck is empty - if empty, re-select deck-size, then continue
  function isDeckEmpty() {
    if (deck.length == 0) {
      let hands = document.getElementsByClassName('player');
      for (let i = 0; i < hands.length; i++){
        hands[i].style.display = 'none';
      }
      
      outMessage.style.display = '';
      buttonsWrapper.style.display = 'none';
      deckSelector.style.display = '';
    }
   }
  
  // 'Deal' button
  dealBtn.addEventListener('click', () => {
    // Deal 2 cards to each player
    for (let i = 0; i < 2; i++) {
      dealCard(dealerHandDiv, dealerHand, "Dealer");
      dealCard(playerHandDiv, playerHand, "Player");
    }
    // Display score after cards are dealt
    dealerPoints.innerText = getScore(dealerHand);
    playerPoints.innerText = getScore(playerHand);
    hitBtn.style.display = '';
    standBtn.style.display = '';
    dealBtn.style.display = 'none';
    // If either player get's blackjack...
    if (getScore(playerHand) == 21 || getScore(dealerHand) == 21) {
      // Hide the buttons and show 'Reset' Button 
      dealBtn.style.display = 'none';
      hitBtn.style.display = 'none';
      standBtn.style.display = 'none';
      resetBtn.style.display = '';
      // Declare winner
      if (getScore(dealerHand) > getScore(playerHand) === true && getScore(dealerHand) < 22) {
        document.getElementById('messages').innerText = "Dealer Wins!";
      } else if (getScore(dealerHand) == getScore(playerHand)) {
        document.getElementById('messages').innerText = "Tie!";
      } else {
        document.getElementById('messages').innerText = "Player Wins";
      }
    }
    
  })

  // 'Hit' button
  hitBtn.addEventListener('click', () => {
    // Deal 1 card to player and then display points
    dealCard(playerHandDiv, playerHand, "Player");
    playerPoints.innerText = getScore(playerHand);
  })

  // 'Stand' button
  standBtn.addEventListener('click', () => {
    // While the dealer's score is less than 17, keep dealing card
    while (getScore(dealerHand) < 17) {
      dealCard(dealerHandDiv, dealerHand, "Dealer")
      dealerPoints.innerText = getScore(dealerHand);
    }
    // Hide the buttons and show 'Reset' Button 
    dealBtn.style.display = 'none';
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    resetBtn.style.display = '';
    // Declare winner
    if (getScore(dealerHand) > getScore(playerHand) === true && getScore(dealerHand) < 22) {
      document.getElementById('messages').innerText = "Dealer Wins!";
    } else if (getScore(dealerHand) == getScore(playerHand)) {
      document.getElementById('messages').innerText = "Tie!";
    } else {
      document.getElementById('messages').innerText = "Player Wins";
    }
  })


  // 'Reset' button
  resetBtn.addEventListener('click', () => {
    // Hide buttons 
    resetBtn.style.display = 'none';
    dealBtn.style.display = '';
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    // Remove cards from players' hands from GUI
    removeChildren(dealerHandDiv);
    removeChildren(playerHandDiv);
    // Clear winning message and points data
    document.getElementById('messages').innerText = " ";
    dealerPoints.innerText = " ";
    playerPoints.innerText = " ";
    dealerHand = [];
    playerHand = [];
  })
  
  // '1 Deck' button
  oneDeckBtn.addEventListener('click', () => {
    // Build 1 deck
    deck = buildDeck(1);
    // Hide deck selector
    outMessage.style.display = 'none';
    deckSelector.style.display = 'none';
    // Show player hands 
    let hands = document.getElementsByClassName('player');
    for (let i = 0; i < hands.length; i++){
      hands[i].style.display = '';
    }
    // Show buttons
    buttonsWrapper.style.display = ''; 
  })

  // '3 Decks' button
  threeDecksBtn.addEventListener('click', () => {
    // Build 3 decks
    deck = buildDeck(3);
    console.log(deck);
    // Hide 'out' message
    outMessage.style.display = '';
    // Hide deck selector
    outMessage.style.display = 'none';
    deckSelector.style.display = 'none';
    oneDeckBtn.style.display = 'none';
    threeDecksBtn.style.display = 'none';
    // Show player hands 
    let hands = document.getElementsByClassName('player');
    for (let i = 0; i < hands.length; i++){
      hands[i].style.display = '';
    }
    // Show buttons
    buttonsWrapper.style.display = ''; 
  })

  // '6 Decks' button
  sixDecksBtn.addEventListener('click', () => {
    // Build 6 decks
    deck = buildDeck(6);
    console.log(deck);
    // Hide deck selector
    outMessage.style.display = 'none';
    deckSelector.style.display = 'none';
    oneDeckBtn.style.display = 'none';
    threeDecksBtn.style.display = 'none';
    // Show player hands 
    let hands = document.getElementsByClassName('player');
    for (let i = 0; i < hands.length; i++){
      hands[i].style.display = '';
    }
    // Show buttons
    buttonsWrapper.style.display = ''; 
  })
  window.scrollTo(0, 1);
})