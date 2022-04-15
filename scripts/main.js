window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
  
  let dealerHandDiv = document.getElementById('dealer-hand');
  let playerHandDiv = document.getElementById('player-hand');
  let dealBtn = document.getElementById('deal-button');
  let hitBtn = document.getElementById('hit-button');
  let standBtn = document.getElementById('stand-button');
  let resetBtn = document.getElementById('reset-button');
  let dealerHand = [];
  let playerHand = [];
  let dealerPoints = document.getElementById('dealer-points');
  let playerPoints = document.getElementById('player-points');

  function dealCard(player, playerArr, playerName) {
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
    }
  }
  
  function buildDeck() {
    let deck = [];
    for (let i = 1; i <= 13; i++) {
      let card = { rank: i, suit: 'hearts' };
      deck.push(card);
    }
    for (let i = 1; i <= 13; i++) {
      let card = { rank: i, suit: 'spades' };
      deck.push(card);
    }
    for (let i = 1; i <= 13; i++) {
      let card = { rank: i, suit: 'clubs' };
      deck.push(card);
    }
    for (let i = 1; i <= 13; i++) {
      let card = { rank: i, suit: 'diamonds' };
      deck.push(card);
    }
    return deck;
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
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
  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
  }

  let deck = buildDeck();

  dealBtn.addEventListener('click', () => {
    for (let i = 0; i < 2; i++) {
      dealCard(dealerHandDiv, dealerHand, "Dealer");
      dealCard(playerHandDiv, playerHand, "Player");
    }
    dealerPoints.innerText = getScore(dealerHand);
    playerPoints.innerText = getScore(playerHand);
    hitBtn.style.display = '';
    standBtn.style.display = '';
    dealBtn.style.display = 'none';
    
  })

  hitBtn.addEventListener('click', () => {
    dealCard(playerHandDiv, playerHand, "Player");
    playerPoints.innerText = getScore(playerHand);
  })

  standBtn.addEventListener('click', () => {
    while (getScore(dealerHand) < 17) {
      dealCard(dealerHandDiv, dealerHand, "Dealer")
      dealerPoints.innerText = getScore(dealerHand);
    }
    dealBtn.style.display = 'none';
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    resetBtn.style.display = '';

    console.log(getScore(dealerHand) > getScore(playerHand) == true && getScore(dealerHand) < 22 == true);
    if (getScore(dealerHand) > getScore(playerHand) === true && getScore(dealerHand) < 22)  {
      document.getElementById('messages').innerText = "Dealer Wins!";
    } else {
      document.getElementById('messages').innerText = "Player Wins!";
    }

  })

    resetBtn.addEventListener('click', () => {
      resetBtn.style.display = 'none';
      dealBtn.style.display = '';
      hitBtn.style.display = 'none';
      standBtn.style.display = 'none';
      dealBtn.setAttribute('class', 'btn btn-light');
      standBtn.setAttribute('class', 'btn btn-light');
      removeChildren(dealerHandDiv);
      removeChildren(playerHandDiv);
      document.getElementById('messages').innerText = " ";
      dealerPoints.innerText = " ";
      playerPoints.innerText = " ";  
      dealerHand = [];
      playerHand = [];
      deck = buildDeck();
  })

  


















})