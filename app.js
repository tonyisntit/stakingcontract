window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this dApp!');
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    const contractAddress = '0xa407B9F5d67cF9Ad140E6c97D237955ce6Ad3A2F';
    const contractABI = [
        [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
    ];

    const stakingContract = new web3.eth.Contract(contractABI, contractAddress);
    let currentAccount = null;

    const connectWalletButton = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('walletInfo');
    const accountSpan = document.getElementById('account');
    const balanceSpan = document.getElementById('balance');

    connectWalletButton.addEventListener('click', async () => {
        const accounts = await web3.eth.requestAccounts();
        currentAccount = accounts[0];
        accountSpan.innerText = currentAccount;

        const balance = await stakingContract.methods.balanceOf(currentAccount).call();
        balanceSpan.innerText = web3.utils.fromWei(balance, 'ether');

        walletInfo.classList.remove('hidden');
        document.getElementById('staking').classList.remove('hidden');
        document.getElementById('unstaking').classList.remove('hidden');
        document.getElementById('rewards').classList.remove('hidden');
    });

    const stakeButton = document.getElementById('stakeButton');
    stakeButton.addEventListener('click', async () => {
        const amount = document.getElementById('stakeAmount').value;
        await stakingContract.methods.stake(web3.utils.toWei(amount, 'ether')).send({ from: currentAccount });
    });

    const unstakeButton = document.getElementById('unstakeButton');
    unstakeButton.addEventListener('click', async () => {
        const amount = document.getElementById('unstakeAmount').value;
        await stakingContract.methods.unstake(web3.utils.toWei(amount, 'ether')).send({ from: currentAccount });
    });

    const claimRewardButton = document.getElementById('claimRewardButton');
    claimRewardButton.addEventListener('click', async () => {
        await stakingContract.methods.claimReward().send({ from: currentAccount });
    });
});
