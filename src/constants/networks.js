export const networks = {
	godwoken_testnet: {
		rpc: "https://godwoken-testnet-v1.ckbapp.dev",
		contracts: {
			marketplace: "0xCEdc1A9b6a3b0266f00d2e4198DA6B6e434896EA",
			erc1155: "0xa87071a188e3e8d3e30f53a335ecc329d88026b7",
			utility: "0xcedc1a9b6a3b0266f00d2e4198da6b6e434896ea",
		},
		backend: "https://testnet-api.tephra.app",
		// backend: "http://localhost:8080",
	},
	godwoken_mainnet: {
		rpc: "https://godwoken-testnet-v1.ckbapp.dev",
		contracts: {
			marketplace: "0xCEdc1A9b6a3b0266f00d2e4198DA6B6e434896EA",
			erc1155: "0xa87071a188e3e8d3e30f53a335ecc329d88026b7",
			utility: "0xcedc1a9b6a3b0266f00d2e4198da6b6e434896ea",
		},
		backend: "https://testnet-api.tephra.app",
	},
};

// export const defaultNetwork =
// 	process.env.REACT_APP_DEFAULT_NETWORK || "godwoken_testnet";

export const defaultNetwork = "godwoken_testnet";