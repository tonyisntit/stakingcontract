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
let stakingContract;

document.getElementById('stakeButton').addEventListener('click', async () => {
    const amount = document.getElementById('stakeAmount').value;
    if (amount > 0) {
        try {
            stakingContract = new web3.eth.Contract(contractABI, contractAddress);
            const accounts = await web3.eth.getAccounts();
            await stakingContract.methods.stake(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
            alert('Staking successful');
        } catch (error) {
            console.error('Staking failed', error);
            alert('Staking failed');
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
            await stakingContract.methods.unstake(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
            alert('Unstaking successful');
        } catch (error) {
            console.error('Unstaking failed', error);
            alert('Unstaking failed');
        }
    } else {
        alert('Enter a valid amount');
    }
});

document.getElementById('claimRewardButton').addEventListener('click', async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        await stakingContract.methods.claimReward().send({ from: accounts[0] });
        alert('Rewards claimed successfully');
    } catch (error) {
        console.error('Claiming rewards failed', error);
        alert('Claiming rewards failed');
    }
});

// Additional functions if needed

async function loadRewardPool() {
    try {
        const accounts = await web3.eth.getAccounts();
        await stakingContract.methods.loadRewardPool().send({ from: accounts[0] });
        alert('Reward pool loaded successfully');
    } catch (error) {
        console.error('Loading reward pool failed', error);
        alert('Loading reward pool failed');
    }
}

// Call this function periodically to distribute rewards if required
async function distributeRewards() {
    try {
        const accounts = await web3.eth.getAccounts();
        await stakingContract.methods.distributeRewards().send({ from: accounts[0] });
        alert('Rewards distributed successfully');
    } catch (error) {
        console.error('Distributing rewards failed', error);
        alert('Distributing rewards failed');
    }
}
