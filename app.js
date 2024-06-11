document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            document.getElementById('account').innerText = account;

            const balance = await web3.eth.getBalance(account);
            document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether');

            document.getElementById('walletInfo').classList.remove('hidden');
            document.getElementById('staking').classList.remove('hidden');
            document.getElementById('unstaking').classList.remove('hidden');
            document.getElementById('rewards').classList.remove('hidden');
        } catch (error) {
            console.error('User denied account access or there was an error', error);
        }
    } else {
        alert('MetaMask not detected. Please install MetaMask.');
    }
});

const contractABI = [
    {
        "inputs": [],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimUnstaked",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "distributeRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "loadRewardPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "RewardClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "RewardPoolLoaded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardAmount",
                "type": "uint256"
            }
        ],
        "name": "RewardsDistributed",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "Unstaked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardPool",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "rewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stakers",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "stakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unstakeWaitTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xe913071698524897F2d9DE76B08293F09e2b663c';
const tokenAddress = '0xf90DeC6C5E36572a0bb10E54B5fB67a0A7dB1058'; // Address of the ERC20 token
const tokenABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let stakingContract;
let tokenContract;

document.getElementById('stakeButton').addEventListener('click', async () => {
    const amount = document.getElementById('stakeAmount').value;
    if (amount > 0) {
        try {
            stakingContract = new web3.eth.Contract(contractABI, contractAddress);
            tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
            const accounts = await web3.eth.getAccounts();
            const stakeAmount = web3.utils.toWei(amount, 'ether');

            // Check allowance
            const allowance = await tokenContract.methods.allowance(accounts[0], contractAddress).call();
            if (parseFloat(allowance) < parseFloat(stakeAmount)) {
                // Approve tokens
                await tokenContract.methods.approve(contractAddress, stakeAmount).send({ from: accounts[0] });
            }

            // Stake tokens
            const gasEstimate = await stakingContract.methods.stake(stakeAmount).estimateGas({ from: accounts[0] });
            await stakingContract.methods.stake(stakeAmount).send({ from: accounts[0], gas: gasEstimate });
            alert('Staking successful');
        } catch (error) {
            console.error('Staking failed', error);
            alert('Staking failed: ' + error.message);
        }
    } else {
        alert('Enter a valid amount');
    }
});

document.getElementById('unstakeButton').addEventListener('click', async () => {
    const amount = document.getElementById('unstakeAmount').value;
    if (amount > 0) {
        try {
            const accounts = await web3.eth.getAccounts();
            const gasEstimate = await stakingContract.methods.unstake(web3.utils.toWei(amount, 'ether')).estimateGas({ from: accounts[0] });
            await stakingContract.methods.unstake(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0], gas: gasEstimate });
            alert('Unstaking successful');
        } catch (error) {
            console.error('Unstaking failed', error);
            alert('Unstaking failed: ' + error.message);
        }
    } else {
        alert('Enter a valid amount');
    }
});

document.getElementById('claimRewardButton').addEventListener('click', async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const gasEstimate = await stakingContract.methods.claimReward().estimateGas({ from: accounts[0] });
        await stakingContract.methods.claimReward().send({ from: accounts[0], gas: gasEstimate });
        alert('Rewards claimed successfully');
    } catch (error) {
        console.error('Claiming rewards failed', error);
        alert('Claiming rewards failed: ' + error.message);
    }
});

// Additional functions if needed

async function loadRewardPool() {
    try {
        const accounts = await web3.eth.getAccounts();
        const gasEstimate = await stakingContract.methods.loadRewardPool().estimateGas({ from: accounts[0] });
        await stakingContract.methods.loadRewardPool().send({ from: accounts[0], gas: gasEstimate });
        alert('Reward pool loaded successfully');
    } catch (error) {
        console.error('Loading reward pool failed', error);
        alert('Loading reward pool failed: ' + error.message);
    }
}

// Call this function periodically to distribute rewards if required
async function distributeRewards() {
    try {
        const accounts = await web3.eth.getAccounts();
        const gasEstimate = await stakingContract.methods.distributeRewards().estimateGas({ from: accounts[0] });
        await stakingContract.methods.distributeRewards().send({ from: accounts[0], gas: gasEstimate });
        alert('Rewards distributed successfully');
    } catch (error) {
        console.error('Distributing rewards failed', error);
        alert('Distributing rewards failed: ' + error.message);
    }
}
