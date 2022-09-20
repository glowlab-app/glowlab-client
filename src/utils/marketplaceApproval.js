import { ethers } from "ethers";
import { Interact } from "./connect";
import contractABI from "../constants/contracts/SqwidERC1155";
import { getContract } from "./network";

const approveMarketplace = async () => {
	let { signer } = await Interact();

	let contract = new ethers.Contract(
		getContract("erc1155"),
		contractABI,
		signer
	);
	// console.log (contract);

	const tx = await contract.setApprovalForAll(
		getContract("marketplace"),
		true
	);
	// console.log (tx);
	return await tx.wait();
};

const isMarketplaceApproved = async () => {
	let { provider } = await Interact();
	// const address = await signer.getAddress();
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;

	let contract = new ethers.Contract(
		getContract("erc1155"),
		contractABI,
		provider
	);

	const isApproved = await contract.isApprovedForAll(
		address,
		getContract("marketplace")
	);
	return isApproved;
};

export { approveMarketplace, isMarketplaceApproved };
