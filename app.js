window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this dApp!');
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [
        // Add your contract's ABI here
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
