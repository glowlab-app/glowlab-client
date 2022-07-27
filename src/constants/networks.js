export const networks = {
	godwoken_testnet: {
		rpc: "https://godwoken-testnet-v1.ckbapp.dev",
		contracts: {
			marketplace: "0xCEdc1A9b6a3b0266f00d2e4198DA6B6e434896EA",
			erc1155: "0xa87071a188e3e8d3e30f53a335ecc329d88026b7",
			utility: "0xcedc1a9b6a3b0266f00d2e4198da6b6e434896ea",
		},
		// backend: "https://testnet-api.sqwid.app",
		backend: "http://localhost:8080",
	},
	godwoken_mainnet: {
		rpc: "https://godwoken-testnet-web3-v1-rpc.ckbapp.dev",
		contracts: {
			marketplace: "0xe124E8bD72Df842189e6E0762558191f267E5E9d",
			erc1155: "0x5728847Ca5d2466dE6AcD33597D874f480acdAdB",
			utility: "0x52CD9d5B4A9a3610Bd87668B5158B7d7259CA430",
		},
		backend: "https://mainnet-api.sqwid.app",
	},
};

export const defaultNetwork =
	process.env.REACT_APP_DEFAULT_NETWORK || "godwoken_testnet";
