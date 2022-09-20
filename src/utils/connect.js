// import { Provider, Signer } from "@reef-defi/evm-provider";
// // import { WsProvider } from "@polkadot/rpc-provider";
// import { WsProvider } from "@polkadot/api";
// // import { options } from "@reef-defi/api";
// import {
// 	web3Accounts,
// 	web3Enable,
// 	web3FromSource,
// } from "@reef-defi/extension-dapp";
// import { stringToHex } from "@reef-defi/util";
// import axios from "axios";
// import { getBackend, getRPC } from "./network";
// // const WS_URL = 'wss://rpc-testnet.reefscan.com/ws';

// let provider;

// const Init = async () => {
// 	await web3Enable("Sqwid");
// 	return await web3Accounts();
// };

// const Connect = async account => {
// 	const injector = await web3FromSource(account.meta.source);

// 	const signRaw = injector?.signer?.signRaw;

// 	const { signer } = await Interact(account.address);

// 	if (!!signRaw) {
// 		if (!(await signer.isClaimed())) {
// 			return {
// 				evmClaimed: false,
// 				signer,
// 			};
// 		}
// 		let res = await axios.get(
// 			`${getBackend()}/nonce?address=${account.address}`
// 		);
// 		let { nonce } = res.data;

// 		const sres = await signRaw({
// 			address: account.address,
// 			data: stringToHex(nonce),
// 			type: "bytes",
// 		});

// 		const { signature } = sres;
// 		try {
// 			res = await axios(`${getBackend()}/auth`, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				data: JSON.stringify({
// 					address: account.address,
// 					signature: signature,
// 					evmAddress: await signer.getAddress(),
// 				}),
// 			});
// 		} catch (err) {
// 			// handle err like a normal person 👍
// 		}

// 		let json = res.data;

// 		if (json.status === "success") {
// 			localStorage.removeItem("collections");
// 			let jwts = localStorage.getItem("tokens");
// 			jwts = jwts ? JSON.parse(jwts) : [];

// 			let item = jwts.find(jwt => jwt.address === account.address);
// 			if (item) {
// 				item.token = json.token;
// 			} else {
// 				jwts.push({
// 					name: account.meta.name,
// 					address: account.address,
// 					token: json.token,
// 				});
// 			}

// 			localStorage.setItem("tokens", JSON.stringify(jwts));

// 			return {
// 				evmClaimed: await signer.isClaimed(),
// 				signer,
// 			};
// 		}
// 	}
// };

// const Interact = async (address = null) => {
// 	if (!address)
// 		address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
// 	const allInjected = await web3Enable("Sqwid");
// 	const injected = allInjected[0].signer;
// 	if (!provider)
// 		provider = new Provider({
// 			provider: new WsProvider(getRPC()),
// 			types: {
// 				AccountInfo: "AccountInfoWithTripleRefCount",
// 			},
// 		});
// 	await provider.api.isReady;

// 	const signer = new Signer(provider, address, injected);

// 	return {
// 		signer,
// 		provider,
// 	};
// };

// const GetProvider = async () => {
// 	if (!provider)
// 		provider = new Provider({
// 			provider: new WsProvider(getRPC()),
// 			types: {
// 				AccountInfo: "AccountInfoWithTripleRefCount",
// 			},
// 		});
// 	await provider.api.isReady;
// 	return provider;
// };

// export { Connect, Init, Interact, GetProvider };

import Web3 from "web3";
import axios from "axios";
import { getBackend, getRPC } from "./network";
import { ethers } from "ethers";

// import { PolyjuiceHttpProvider, PolyjuiceAccounts } from "@polyjuice-provider/web3";
import { AddressTranslator } from "nervos-godwoken-integration";
import constants from "./constants";


const addressTranslator = new AddressTranslator ();

let provider;
let signer;
let web3;
let account = {
    ethAddress: null,
    polyjuiceAddress: null
};

window.ethereum.on('accountsChanged', function (accounts) {
    if (accounts [0] !== account.ethAddress) {
        localStorage.removeItem("tokens");
		localStorage.removeItem("auth");
		localStorage.removeItem(`${constants.APP_NAME.toLowerCase()}__balance`);
        window.location.reload();
    }
})

// const polyjuiceConfig = {
//     web3Url: getRPC (), 
// };

const Init = async (reload = false) => {
    // await window.ethereum.enable ();
    if (!reload && account.ethAddress && signer) return account;
    web3 = new Web3 (getRPC ());
    // console.log (web3);
    // console.log (web3.eth.accounts);
    // provider = new ethers.providers.JsonRpcProvider(getRPC());
    // signer = provider.getSigner();

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
    signer = provider.getSigner();

    // provider = web3.providers.HttpProvider (getRPC ());
    // console.log (provider);
    // console.log (await web3.eth.getBalance (web3.eth.accounts.wallet[0].address));
    // provider = new PolyjuiceHttpProvider(
    //     getRPC (),
    //     polyjuiceConfig,
    // );
    // web3 = new Web3 (provider);

    // signer = new PolyjuiceAccounts (polyjuiceConfig, provider);
    // console.log (signer);
    // try {
    //     await signer.godwoker.init ();
    // } catch (err) {
    //     console.log (err);
    // }

    try {
        // Request account access if needed
        let acc = await window.ethereum.request ({ method: 'eth_requestAccounts' });
        account.ethAddress = acc[0];
        account.polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress (acc[0]);
        // console.log (account);
        return account;
    } catch (error) {
        // User denied account access...
        return null;
    }
}

const Connect = async (reload = false) => {
    if (!account.ethAddress) await Init (reload);

    let res = await axios.get(`${getBackend ()}/nonce?address=${account.ethAddress}`);
    let { nonce } = res.data;

    console.log (nonce);
    let msg = web3.utils.fromUtf8 (nonce);
    // console.log (msg);
    let signature = await window.ethereum.request ({ method: 'personal_sign', params: [msg, account.ethAddress] });
    // console.log ([msg, account.ethAddress]);
    try {
        res = await axios (`${getBackend ()}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify ({
                address: account.ethAddress,
                signature: signature,
                polyjuiceAddress: account.polyjuiceAddress,
            })
        });
    } catch(err) {
        // handle err like a normal person 👍
    }

    let json = res.data;

    if (json.status === 'success') {
        localStorage.removeItem ('collections');
        let jwts = localStorage.getItem ('tokens');
        jwts = jwts ? JSON.parse (jwts) : [];

        let item = jwts.find (jwt => jwt.address === account.address);
        if (item) {
            item.token = json.token;
        } else {
            jwts.push ({
                name: account.ethAddress,
                address: account.ethAddress,
                polyjuiceAddress: account.polyjuiceAddress,
                token: json.token
            });
        }

        localStorage.setItem ('tokens', JSON.stringify (jwts));

        // console.log ('account', account);

        // return {
        //     jwt: res.data.token
        // }
        return {
            signer,
            account
        }
    } else {
        // console.log ('error', json);
        return null;
    }

    // return true;
}

const Interact = async () => {
    // if (!address) address = JSON.parse (localStorage.getItem ("auth"))?.auth.address;
    // const allInjected = await web3Enable ('Sqwid');
    // const injected = allInjected[0].signer;
    // if (!provider) provider = new Provider ({
    //     provider: new WsProvider (getRPC ())
    // });
    // await provider.api.isReady;

    // const signer = new Signer (provider, address, injected);
    if (!account.ethAddress) await Init ();

    return {
        signer,
        provider
    }
}

const GetProvider = async () => {
    // if (!provider) provider = new Provider ({
    //     provider: new WsProvider (getRPC ())
    // });
    // await provider.api.isReady;
    // return provider;
	return null;
}

export { Connect, Init, Interact, GetProvider };