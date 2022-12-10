const EventListner = require("../lib/EventListener/EventListener").default
const ABI = [
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
const contractAddress = "0x609FE9E0317EBE4BFdcdb94b04eCd84ed7d3e8A5"
const init = new EventListner("wss://goerli.infura.io/ws/v3/e50ec47263f94a119f26be783410e7d7",contractAddress,ABI)
init.initiateEventMonitoring((data)=>{
	console.log(data)
})