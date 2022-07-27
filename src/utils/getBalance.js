import { Interact } from "./connect";
// import axios from "axios";
// import { getBackend } from "./network";
// import Web3 from "web3";
import { formatEther } from "ethers/lib/utils";

export const getBalance = async () => {
	const { provider } = await Interact();
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	return formatEther (await provider.getBalance (address));
};

// export const getBalanceA = async () => {
// 	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
// 	let jwt = address
// 		? JSON.parse(localStorage.getItem("tokens")).find(
// 				token => token.address === address
// 		  )
// 		: null;
// 	const res = await axios(`${getBackend()}/get/marketplace/balance`, {
// 		headers: {
// 			Authorization: `Bearer ${jwt.token}`,
// 		},
// 	});
// 	return res.error ? 0 : Number(res.data.balance);
// };
