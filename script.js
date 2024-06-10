document.addEventListener("DOMContentLoaded", () => {
    const player1BalanceEl = document.getElementById("player1-balance");
    const player2BalanceEl = document.getElementById("player2-balance");
    const player1BetEl = document.getElementById("player1-bet");
    const player1JoinBtn = document.getElementById("player1-join");
    const player2AcceptBtn = document.getElementById("player2-accept");
    const countdownEl = document.getElementById("countdown");
    const winnerEl = document.getElementById("winner");
    const player1StatusEl = document.getElementById("player1-status");
    const player2StatusEl = document.getElementById("player2-status");

    let player1Balance = 1000;
    let player2Balance = 1000;
    let betAmount = 0;

    player1JoinBtn.addEventListener("click", () => {
        betAmount = parseInt(player1BetEl.value);
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > player1Balance) {
            player1StatusEl.textContent = "Invalid bet amount";
            return;
        }
        player1Balance -= betAmount;
        player1BalanceEl.textContent = player1Balance;
        player1StatusEl.textContent = `Player 1 bet ${betAmount} gems. Waiting for Player 2 to accept...`;
    });

    player2AcceptBtn.addEventListener("click", () => {
        if (betAmount <= 0 || betAmount > player2Balance) {
            player2StatusEl.textContent = "Invalid bet amount or no bet placed by Player 1";
            return;
        }
        player2Balance -= betAmount;
        player2BalanceEl.textContent = player2Balance;
        player2StatusEl.textContent = `Player 2 accepted the bet of ${betAmount} gems.`;
        startCountdown();
    });

    function startCountdown() {
        let timeLeft = 3;
        countdownEl.textContent = `Game starts in ${timeLeft}...`;
        winnerEl.textContent = "";
        
        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownEl.textContent = `Game starts in ${timeLeft}...`;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                determineWinner();
            }
        }, 1000);
    }

    function determineWinner() {
        const result = Math.random() * 100;
        let winner = "";
        if (result < 49) {
            player1Balance += betAmount * 2;
            winner = "Player 1 wins!";
        } else if (result < 98) {
            player2Balance += betAmount * 2;
            winner = "Player 2 wins!";
        } else {
            player1Balance += Math.floor(betAmount * 0.99);
            player2Balance += Math.floor(betAmount * 0.99);
            winner = "It's a draw!";
        }
        
        player1BalanceEl.textContent = player1Balance;
        player2BalanceEl.textContent = player2Balance;
        countdownEl.textContent = "";
        winnerEl.textContent = winner;

        // Reset game state
        setTimeout(resetGame, 3000);
    }

    function resetGame() {
        betAmount = 0;
        player1BetEl.value = "";
        player1StatusEl.textContent = "";
        player2StatusEl.textContent = "";
        winnerEl.textContent = "";
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const rulesButton = document.getElementById("rules-button");
    const rulesPopup = document.getElementById("popup-overlay");
    const closePopupButton = document.getElementById("close-popup"); // Close button inside the popup
    const closePopupButtonOutside = document.getElementById("popup-overlay"); // Close button outside the popup

    rulesButton.addEventListener("click", () => {
        rulesPopup.style.display = "block"; // Show the popup overlay
    });

    // Close the popup when clicking on the close button inside the popup
    closePopupButton.addEventListener("click", () => {
        rulesPopup.style.display = "none";
    });

    // Close the popup when clicking outside of it
    closePopupButtonOutside.addEventListener("click", (event) => {
        if (event.target === rulesPopup) {
            rulesPopup.style.display = "none";
        }
    });
});
