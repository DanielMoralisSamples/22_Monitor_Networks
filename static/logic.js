Moralis.initialize("")// Application ID
Moralis.serverUrl = ""// Server URL
var web3;
checkWeb3();

function displayMessage(messageType, message){
    messages = {
        "00":`<div class= "alert alert-success"> ${message} </div>`,
        "01":`<div class= "alert alert-danger"> ${message} </div>`
    }
    document.getElementById("resultSpace").innerHTML = messages[messageType];
}

async function checkWeb3(){
    const ethereum = window.ethereum;
    if(!ethereum || !ethereum.on) {
        displayMessage("01", "This App Requires MetaMask, Please Install MetaMask");
    }
    else{
        //displayMessage("00", "Metamask is Installed");
        setWeb3Environment()
    }
}

function setWeb3Environment(){
    web3 = new Web3(window.ethereum);
    getNetwork();
    monitorNetwork();
}

async function getNetwork(){
    chainID = await web3.eth.net.getId();
    displayMessage("00","Active network is "+ getNetworkName(chainID));
}

function getNetworkName(chainID){
    networks = {
        1:"Ethereum Mainnet",
        4:"Ethereum Rinkeby",
        97:"Binance Smart Chain Testnet",
        80001:"Polygon Mumbai Testnet"
    }
    return networks[chainID];
}

function monitorNetwork(){
    Moralis.onChainChanged(function(){
        window.location.reload()
    })
}