// script.js
document.getElementById('buyButton').addEventListener('click', function() {
    window.open('https://pancakeswap.finance/swap?outputCurrency=0x5a429a76f6D5dABcF022D11c4f4B8f858FB370f8&inputCurrency=0x55d398326f99059fF775485246999027B3197955', '_blank');
});

document.getElementById('howItWorksButton').addEventListener('click', function() {
    var modal = document.getElementById('howItWorksModal');
    modal.style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function() {
    var modal = document.getElementById('howItWorksModal');
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    var modal = document.getElementById('howItWorksModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});