// Lotto

document.addEventListener('DOMContentLoaded', () => {
    const playerList = document.getElementById('player-list');
    const arrow = document.getElementById('arrow');
    const selectedPlayersWrapper = document.createElement('div');
    selectedPlayersWrapper.className = 'selected-players-wrapper';
    document.body.appendChild(selectedPlayersWrapper);

    const totalPlayers = 250;
    let countdownInterval;
    let animation;
    let countdownCounter = 0;

    // Generate player elements
    const players = Array.from({ length: totalPlayers }, (_, i) => `Player ${i + 1}`);

    // Shuffle the player array
    players.sort(() => Math.random() - 0.5);

    // Append players to the player list
    players.forEach(playerName => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.textContent = playerName;
        playerList.appendChild(playerDiv);
    });

    function resetAnimationAndHighlight() {
        if (animation) {
            animation.kill();
        }
        const selectedPlayer = document.querySelector('.player.selected');
        if (selectedPlayer) {
            selectedPlayer.classList.remove('selected');
        }
    }

    function startCountdownAndSelectPlayer() {
        resetAnimationAndHighlight();

        const playerWidth = document.querySelector('.player').offsetWidth;
        const playerMargin = parseFloat(getComputedStyle(document.querySelector('.player')).marginLeft) +
            parseFloat(getComputedStyle(document.querySelector('.player')).marginRight);
        const totalWidth = (playerWidth + playerMargin) * totalPlayers;
        let speed = 400;
        const duration = totalWidth / speed;

        animation = gsap.to(playerList, {
            x: -totalWidth,
            duration: duration,
            ease: "none",
            onComplete: () => {
                stopAndHighlight();
            }
        });

        let countdown = 5;
        const countdownDisplay = document.getElementById('countdown');
        countdownDisplay.textContent = countdown;

        countdownInterval = setInterval(() => {
            countdown--;
            countdownDisplay.textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                stopAndHighlight();
            }
        }, 1000);
    }

    function stopAndHighlight() {
        if (animation) {
            animation.kill();
        }
        const arrowRect = arrow.getBoundingClientRect();
        const arrowX = arrowRect.left + arrowRect.width / 2;
        const containerRect = playerList.getBoundingClientRect();
        const containerX = containerRect.left;
        const containerWidth = containerRect.width;
        const playerIndex = Math.floor((arrowX - containerX) / (containerWidth / totalPlayers));
        const selectedPlayer = playerList.children[playerIndex];
        selectedPlayer.classList.add('selected');
    
        const selectedPlayerItem = document.createElement('div');
        selectedPlayerItem.classList.add('selected-player');
    
        const label = countdownCounter + 1;
        const labels = ['5th', '4th', '3rd', '2nd', '1st', 'JACKPOT'];
        const labelElement = document.createElement('div');
        labelElement.textContent = labels[label - 1];
        labelElement.classList.add('label');
        selectedPlayerItem.appendChild(labelElement);
    
        const playerNameElement = document.createElement('div');
        playerNameElement.textContent = selectedPlayer.textContent;
        playerNameElement.classList.add('player-name');
        selectedPlayerItem.appendChild(playerNameElement);
    
        let amount = 0;
        switch (labels[label - 1]) {
            case 'JACKPOT':
                amount = 54420;
                break;
            case '5th':
                amount = 120;
                break;
            case '4th':
                amount = 200;
                break;
            case '3rd':
                amount = 350;
                break;
            case '2nd':
                amount = 680;
                break;
            case '1st':
                amount = 1000;
                break;
            default:
                amount = 0;
                break;
        }
    
        const formattedAmount = amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    
        const amountContainer = document.createElement('div');
        amountContainer.classList.add('amount-container');
        const amountElement = document.createElement('div');
        amountElement.textContent = formattedAmount;
        amountElement.classList.add('amount');
        amountContainer.appendChild(amountElement);
        selectedPlayerItem.appendChild(amountContainer);
    
        selectedPlayersWrapper.insertBefore(selectedPlayerItem, selectedPlayersWrapper.firstChild);
    }
    

    startCountdownAndSelectPlayer();

    function countdownButtonClickHandler() {
        clearInterval(countdownInterval);
        resetAnimationAndHighlight();
        startCountdownAndSelectPlayer();
        countdownCounter++;
        if (countdownCounter >= 5) {
            clearInterval(countdownButtonInterval);
            countdownButton.removeEventListener('click', countdownButtonClickHandler);
        }
    }

    const countdownButtonInterval = setInterval(() => {
        if (countdownCounter < 5) {
            countdownButtonClickHandler();
        } else {
            clearInterval(countdownButtonInterval);
        }
    }, 7000);

    const countdownButton = document.getElementById('resetButton');
    countdownButton.addEventListener('click', countdownButtonClickHandler);
});


// JavaScript code to fetch and display the token price
document.addEventListener('DOMContentLoaded', () => {
    // Fetch token price from dexscreener
    fetch('https://api.dexscreener.com/eth/0xTokenPrice') // Replace '0xTokenPrice' with the actual token identifier
        .then(response => response.json())
        .then(data => {
            const tokenPrice = data.price; // Assuming the price is available in the 'price' field of the response
            const tokenPriceElement = document.getElementById('token-price');
            if (tokenPriceElement) {
                tokenPriceElement.textContent = `Token Price: ${tokenPrice}`; // Display token price next to the logo
            }
        })
        .catch(error => {
            console.error('Error fetching token price:', error);
        });
});

// JavaScript code to display the static token price
document.addEventListener('DOMContentLoaded', () => {
    const tokenPriceElement = document.getElementById('token-price');
    if (tokenPriceElement) {
        tokenPriceElement.textContent = '$0.0002741'; // Display static token price next to the logo
    }
});