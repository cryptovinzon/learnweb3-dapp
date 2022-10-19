const MoodContractAddress = "0x12f3da0d0cac0181e97f8aa9e083530aafaf6b5d";
const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let MoodContract;
let signer;

// setup ethers provider
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

// request access to user's wallet, connect signer to your metamask, define new contract using our address, ABI, and signer
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
    });
});

// setup async functions to call smart contract functions
async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}

async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    console.log(Mood);
}
