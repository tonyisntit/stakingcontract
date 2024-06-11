window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this dApp!');
        return;
    }

    const web3 = new Web3(window.ethereum);

    try {
        await window.ethereum.enable();
        console.log('MetaMask is connected');
    } catch (error) {
        console.error('User denied account access', error);
        return;
    }

    const contractAddress = '0xa407B9F5d67cF9Ad140E6c97D237955ce6Ad3A2F';
    const contractABI = [
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

    const stakingContract = new web3.eth.Contract(contractABI, contractAddress);
    let currentAccount = null;

    const connectWalletButton = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('walletInfo');
    const accountSpan = document.getElementById('account');
    const balanceSpan = document.getElementById('balance');

    connectWalletButton.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.requestAccounts();
            currentAccount = accounts[0];
            console.log('Connected account:', currentAccount);
            accountSpan.innerText = currentAccount;

            const balance = await web3.eth.getBalance(currentAccount);
            console.log('Account balance:', balance);
            balanceSpan.innerText = web3.utils.fromWei(balance, 'ether');

            walletInfo.classList.remove('hidden');
            document.getElementById('staking').classList.remove('hidden');
            document.getElementById('unstaking').classList.remove('hidden');
            document.getElementById('rewards').classList.remove('hidden');
        } catch (error) {
            console.error('Error connecting to MetaMask', error);
        }
    });

    const stakeButton = document.getElementById('stakeButton');
    stakeButton.addEventListener('click', async () => {
        try {
            const amount = document.getElementById('stakeAmount').value;
            await stakingContract.methods.stake(web3.utils.toWei(amount, 'ether')).send({ from: currentAccount });
            console.log('Staked', amount);
        } catch (error) {
            console.error('Error staking tokens', error);
        }
    });

    const unstakeButton = document.getElementById('unstakeButton');
    unstakeButton.addEventListener('click', async () => {
        try {
            const amount = document.getElementById('unstakeAmount').value;
            await stakingContract.methods.unstake(web3.utils.toWei(amount, 'ether')).send({ from: currentAccount });
            console.log('Unstaked', amount);
        } catch (error) {
            console.error('Error unstaking tokens', error);
        }
    });

    const claimRewardButton = document.getElementById('claimRewardButton');
    claimRewardButton.addEventListener('click', async () => {
        try {
            await stakingContract.methods.claimReward().send({ from: currentAccount });
            console.log('Reward claimed');
        } catch (error) {
            console.error('Error claiming rewards', error);
        }
    });
});
