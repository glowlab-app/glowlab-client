import axios from "axios";

export const convertREEFtoUSD = async price => {
	try {
		let res = await axios(
			"https://api.coingecko.com/api/v3/simple/price?ids=evmos&vs_currencies=usd"
		);
		let conversionRate = res.data["evmos"].usd;
		return Number(price) * Number(conversionRate);
	} catch (err) {
		return null;
	}
};
