# **smart-contract-event-monitor**

A simple npm package that allows any dev/hacker to monitor the events emitted from a smart contract and use those information to hack/build products.

Internally it uses ethers.js to monitor contracts. 

Here is a sample implementation to monitor events of a sample contract:

Lets start with the contract first: 
```js   

pragma solidity >=0.7.0 <0.9.0;

contract Test {

 event DemoEvent1(address indexed oldOwner, address indexed newOwner);
 event DemoEvent2(address indexed oldOwner, address indexed newOwner);

function EmitEvent1() public  {
    emit  DemoEvent1(msg.sender, msg.sender);
}

function EmitEvent2() public  {
    emit  DemoEvent2(msg.sender, msg.sender);
}
}
```
You can use remix editor to compile and deploy the contract to any of the test network. In my case, I have already deployed it on goerli test network.

Next, we will need a socket URL to monitor the contract events. I am using infura socket url.

Now that we have everything in place, lets 🕵️...

Create an empty folder. For my case, I will name it `test` using `mkdir test`.

Next, initiliase an empty node project through `npm init -y`.

Create an empty file `index.js` via `nano index.js` and copy the following code:

```js
const EventListner = require("smart-contract-event-monitor").default // import the package
const ABI = [ // define the ABI
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "DemoEvent1",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "DemoEvent2",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "EmitEvent1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "EmitEvent2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractAddress = "0x609FE9E0317EBE4BFdcdb94b04eCd84ed7d3e8A5" // contract address
const contractMonitor = new EventListner("wss://goerli.infura.io/ws/v3/<Project Id>",contractAddress,ABI) // initialise 
contractMonitor.initiateEventMonitoring((data)=>{ // call the initiateEventMonitoring to monitor the events
	console.log(data) // log the data
})
```

And thats all, we will start receiving the event and the data sent out in those event seamlessly!!.