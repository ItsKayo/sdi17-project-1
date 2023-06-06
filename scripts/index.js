window.onload = () => playRound();

const newRound = document.querySelector("#newRound");
newRound.addEventListener("click", function () {
    const compCards = document.querySelector(".computer")
    const playerCards = document.querySelector(".player")

    var compToDelete = compCards.getElementsByTagName('img');
    compToDelete[0].parentNode.removeChild(compToDelete[0]);

    var playerToDelete = playerCards.getElementsByTagName('img');
    playerToDelete[0].parentNode.removeChild(playerToDelete[0]);

    playRound();
})

async function playRound() {
    let deck = await getDeck();
    let deckID = deck.deck_id;

    let computerCard = await drawCard(deckID);
    let playerCard = await drawCard(deckID);

    let computerCardValue = computerCard.cards[0].value;
    let playerCardValue = playerCard.cards[0].value;

    const computermarkup = `<img class="compCards" src="${computerCard.cards[0].image}">`;
    const playermarkup = `<img class="playerCards" src="${playerCard.cards[0].image}">`;
    document.querySelector('.computer').insertAdjacentHTML('beforeend', computermarkup);
    document.querySelector('.player').insertAdjacentHTML('beforeend', playermarkup);

    await evaluate(computerCardValue, playerCardValue, deckID);
}

async function drawCard(deck_id) {
    const fetchCard = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const jsonified = await fetchCard.json();
    return jsonified;
}

async function getDeck() {
    const fetchDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const jsonified = await fetchDeck.json();
    return jsonified;
};

async function evaluate(computer, player, deck_id) {
    if (computer === 'JACK') {
        computer = '11';
    }
    else if (computer === 'QUEEN') {
        computer = '12';
    } else if (computer === 'KING') {
        computer = '13';
    } else if (computer === 'ACE') {
        computer = '14';
    }

    if (player === 'JACK') {
        player = '11';
    }
    else if (player === 'QUEEN') {
        player = '12';
    } else if (player === 'KING') {
        player = '13';
    } else if (player === 'ACE') {
        player = '14';
    }

    if (+computer == +player) {
        let computerCard = await drawCard(deck_id);
        let playerCard = await drawCard(deck_id);
        computer = computerCard.cards[0].value;
        player = playerCard.cards[0].value;

        const computermarkup = `<img src="${computerCard.cards[0].image}">`;
        const playermarkup = `<img src="${playerCard.cards[0].image}">`;
        document.querySelector('.computer').insertAdjacentHTML('beforeend', computermarkup);
        document.querySelector('.player').insertAdjacentHTML('beforeend', playermarkup);
        evaluate (computer, player, deck_id);
    } else if (+computer > +player) {
        setTimeout(() => updateComputerScore(), 500);
    }
    else {
        setTimeout(() => updateplayerScore(), 500);
    }
}

let computerScore = 0;
let playerScore = 0;
scoreContainer = document.getElementById("computerScore");
scoreContainer.innerHTML = `Computer: ${computerScore}`;
scoreContainer = document.getElementById("playerScore");
scoreContainer.innerHTML = `Player: ${playerScore}`;

function updateComputerScore() {
    scoreContainer = document.getElementById("computerScore");
    computerScore++;
    scoreContainer.innerHTML = `Computer: ${computerScore}`;
}

function updateplayerScore() {
    scoreContainer = document.getElementById("playerScore");
    playerScore++;
    scoreContainer.innerHTML = `Player: ${playerScore}`;
}