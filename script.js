const USDT_TO_GEMS = 1;
const BNB_TO_GEMS = 530;
const LOTS_PRICE = 0.0002; // LOTS price in dollars
const BNB_PRICE = 530; // BNB price in USD
const GAS_FEE_BNB = 0.001; // Gas fee in BNB

let gemsBalance = 0;
let lotsBalance = 0;

function updateBalances() {
    document.getElementById('gems-balance').innerText = gemsBalance.toFixed(2);
    document.getElementById('lots-balance').innerText = lotsBalance.toFixed(2);
}

function logTransaction(depositLog, depositFee, withdrawalLog, withdrawalFee) {
    const logTableBody = document.getElementById('log-table-body');
    const row = document.createElement('tr');

    const depositLogCell = document.createElement('td');
    depositLogCell.textContent = depositLog || 'n/a';
    row.appendChild(depositLogCell);

    const depositFeeCell = document.createElement('td');
    depositFeeCell.textContent = depositFee || 'n/a';
    row.appendChild(depositFeeCell);

    const withdrawalLogCell = document.createElement('td');
    withdrawalLogCell.textContent = withdrawalLog || 'n/a';
    row.appendChild(withdrawalLogCell);

    const withdrawalFeeCell = document.createElement('td');
    withdrawalFeeCell.textContent = withdrawalFee || 'n/a';
    row.appendChild(withdrawalFeeCell);

    logTableBody.insertBefore(row, logTableBody.firstChild);
}

function convertUSDT() {
    let usdtAmount = parseFloat(document.getElementById('usdt-deposit').value);
    if (isNaN(usdtAmount) || usdtAmount <= 0) {
        alert('Please enter a valid USDT amount.');
        return;
    }
    let gasFee = GAS_FEE_BNB * BNB_PRICE; // Gas fee in USD
    let gems = usdtAmount * USDT_TO_GEMS - gasFee;
    gemsBalance += gems;
    document.getElementById('usdt-result').innerText = `Converted to ${gems.toFixed(2)} Gems (Gas Fee: ${gasFee.toFixed(2)} USD)`;
    logTransaction(`${usdtAmount.toFixed(2)} USDT, Received ${gems.toFixed(2)} Gems`, `${gasFee.toFixed(2)} USD`, null, null);
    updateBalances();
}

function convertBNB() {
    let bnbAmount = parseFloat(document.getElementById('bnb-deposit').value);
    if (isNaN(bnbAmount) || bnbAmount <= 0) {
        alert('Please enter a valid BNB amount.');
        return;
    }
    let gasFee = GAS_FEE_BNB * BNB_PRICE; // Gas fee in USD
    let gems = bnbAmount * BNB_TO_GEMS - gasFee;
    gemsBalance += gems;
    document.getElementById('bnb-result').innerText = `Converted to ${gems.toFixed(2)} Gems (Gas Fee: ${gasFee.toFixed(2)} USD)`;
    logTransaction(`${bnbAmount.toFixed(2)} BNB, Received ${gems.toFixed(2)} Gems`, `${gasFee.toFixed(2)} USD`, null, null);
    updateBalances();
}

function convertLOTS() {
    let lotsAmount = parseFloat(document.getElementById('lots-deposit').value);
    if (isNaN(lotsAmount) || lotsAmount <= 0) {
        alert('Please enter a valid LOTS amount.');
        return;
    }
    let gasFeeInDollars = GAS_FEE_BNB * BNB_PRICE; // Gas fee in USD
    let gasFeeInLots = gasFeeInDollars / LOTS_PRICE;
    let lots = lotsAmount - gasFeeInLots;
    lotsBalance += lots;
    document.getElementById('lots-result').innerText = `Converted to ${lots.toFixed(2)} Lots (Gas Fee: ${gasFeeInLots.toFixed(2)} LOTS, ${gasFeeInDollars.toFixed(2)} USD)`;
    logTransaction(`${lotsAmount.toFixed(2)} LOTS, Received ${lots.toFixed(2)} LOTS`, `${gasFeeInDollars.toFixed(2)} USD`, null, null);
    updateBalances();
}

function withdrawLOTS() {
    let lotsAmount = parseFloat(document.getElementById('lots-withdraw').value);
    if (isNaN(lotsAmount) || lotsAmount <= 0) {
        alert('Please enter a valid LOTS amount.');
        return;
    }
    if (lotsAmount > lotsBalance) {
        alert('Insufficient LOTS balance.');
        return;
    }
    lotsBalance -= lotsAmount;
    document.getElementById('lots-withdraw-result').innerText = `Converted to ${lotsAmount.toFixed(2)} LOTS (No Fee)`;
    logTransaction(null, null, `${lotsAmount.toFixed(2)} LOTS, Received ${lotsAmount.toFixed(2)} LOTS`, `0.00 Gems`);
    updateBalances();
}

function withdrawGems(method) {
    let gemsAmount = parseFloat(document.getElementById('gems-withdraw').value);
    if (isNaN(gemsAmount) || gemsAmount < 10) {
        alert('Minimum withdrawal is 10 Gems.');
        return;
    }
    if (gemsAmount > gemsBalance) {
        alert('Insufficient Gems balance.');
        return;
    }

    let gasFee = GAS_FEE_BNB * BNB_PRICE; // Gas fee in USD
    let fee = gemsAmount * 0.002 + gasFee;
    let amountAfterFee = (gemsAmount - fee);

    if (method === 'BNB') {
        amountAfterFee /= BNB_TO_GEMS;
    }

    gemsBalance -= gemsAmount;
    document.getElementById('gems-withdraw-result').innerText = `Converted to ${amountAfterFee.toFixed(8)} ${method} (Fee: ${fee.toFixed(2)} Gems)`;
    logTransaction(null, null, `${gemsAmount.toFixed(2)} Gems, Received ${amountAfterFee.toFixed(8)} ${method}`, `${fee.toFixed(2)} Gems`);
    updateBalances();
}
