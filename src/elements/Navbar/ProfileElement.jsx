import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@contexts/Auth/AuthContext";
import styled from "styled-components";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import EVMOSIcon from "@static/svg/EVMOSIcon";
import { DividerHorizontal } from "@elements/Default/Divider";
import { Link } from "react-router-dom";
import { getBalance } from "@utils/getBalance";
import { numberSeparator } from "@utils/numberSeparator";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import constants from "@utils/constants";
import bread from "@utils/bread";
import { truncateAddress } from "@utils/textUtils";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { getWithdrawableBalance, withdrawBalance } from "@utils/marketplace";
import { convertREEFtoUSD } from "@utils/convertREEFtoUSD";
import { formatReefPrice } from "@utils/formatReefPrice";

const BasicDetailsContainer = styled.div`
	display: flex;
	align-items: center;
	/* justify-content: center; */
	gap: 1rem;
	padding: 0.5rem 0;
	padding-bottom: 0;
	border-radius: 0.5rem;
	color: var(--app-text);
	text-decoration: none;
	user-select: none;
`;

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

const ProfilePicture = styled.div`
	height: 4rem;
	width: 4rem;
	border-radius: 1000rem;
	outline: 0.2rem solid white;
	background-color: var(--app-background);
	background-image: url("${props => props.url && props.url}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;

const ProfileDetails = styled.div`
	max-width: 10rem;
`;

const ProfileAddress = styled.h4`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-family: var(--font-family-mono);
	font-weight: 400;
	font-size: 1rem;
	color: var(--app-container-text-primary-hover);
`;

const ProfileName = styled.h3`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const BalanceContainer = styled.div`
	display: flex;
	align-items: center;
	svg:not(.loader) {
		width: 20px;
		height: 20px;
	}
`;

const BalanceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* padding: 0 1rem; */
`;

const Button = styled(NotStyledLink)`
	margin-left: auto;
	font-size: 0.875rem;
	background: var(--app-container-bg-secondary);
	color: var(--app-container-text-primary-hover);
	padding: 0.25rem 0.75rem;
	border-radius: 0.375rem;
`;

const ButtonContainer = styled(m.div)`
	padding: 0.375rem 0;
	width: 100%;
`;

const WithdrawWrapper = styled(m.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	background: var(--app-container-bg-secondary);
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	font-size: 0.875rem;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	h4 {
		color: var(--app-container-text-primary-hover);
		font-size: 1rem;
	}
`;

const WithdrawAmount = styled.p`
	font-weight: 900;
	font-size: 1rem;
	display: flex;
	align-items: center;
	box-shadow: none !important;
	span {
		max-width: 20rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const WithdrawAmountUSD = styled.p`
	/* align-self: flex-end;*/
	padding-left: 0.25rem;
	box-shadow: none !important;
	font-weight: 500;
	color: var(--app-container-text-primary);
`;

const WithdrawContainer = styled(BalanceContainer)`
	/* flex-direction: column; */
	display: flex;
	align-self: flex-end;
	margin-top: 0.5rem;
	flex-wrap: wrap;
`;

const LoaderContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const WithdrawContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Balance = () => {
	const [balance, setBalance] = useState(<FadeLoaderIcon />);
	useEffect(() => {
		const fetchBalance = async () => {
			const bal = await getBalance();
			// const balNum = Number(bal) / 10 ** 18;
			setBalance(numberSeparator((Number (bal).toFixed (4)).toString ()));
		};
		fetchBalance();
	}, []);
	return (
		<BalanceWrapper>
			<h4>Balance</h4>
			<BalanceContainer>
				<EVMOSIcon /> <span>{balance}</span>
			</BalanceContainer>
		</BalanceWrapper>
	);
};

const Withdraw = () => {
	const [price, setPrice] = useState();
	const [usdPrice, setUsdPrice] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPrice = async () => {
			const availableBalance = await getWithdrawableBalance();
			// const availableBalance = 1000;
			const usd = await convertREEFtoUSD(availableBalance);
			setPrice(isNaN(Number(availableBalance)) ? availableBalance : 0);
			setUsdPrice(usd?.toFixed(2) || 0);
		};
		fetchPrice();
	}, []);

	const handleWithdraw = async () => {
		setLoading(true);
		try {
			await withdrawBalance();
		} catch (err) {
			if (err.message.includes("No Reef to be claimed")) {
				bread("Not enough EVMOS to withdraw");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{price != null && usdPrice != null && price > 0 ? (
				<>
					<DividerHorizontal />
					<WithdrawWrapper
						whileHover={{
							scale: 1.05,
						}}
						whileTap={{
							scale: 0.99,
						}}
						onClick={handleWithdraw}
					>
						{loading ? (
							<LoaderContainer>
								<FadeLoaderIcon />
							</LoaderContainer>
						) : (
							<WithdrawContent>
								<h4>Available to withdraw</h4>
								<WithdrawContainer>
									<WithdrawAmount>
										<EVMOSIcon size={20} />{" "}
										<span
											title={formatReefPrice(
												numberSeparator(
													Math.trunc(price).toString()
												)
											)}
										>
											{numberSeparator(Math.trunc(price))}
										</span>
									</WithdrawAmount>
									<WithdrawAmountUSD>
										(${numberSeparator(usdPrice)})
									</WithdrawAmountUSD>
								</WithdrawContainer>
							</WithdrawContent>
						)}
					</WithdrawWrapper>
				</>
			) : null}
		</>
	);
};

const ProfileElement = () => {
	const [username, setUsername] = useState("");
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		auth && setUsername(auth.address);
	}, [auth]);

	//eslint-disable-next-line
	const copyAddress = () => {
		navigator.clipboard.writeText(auth.address).then(() => {
			bread(
				<>
					<p
						style={{
							lineHeight: "1",
							fontWeight: "900",
							color: "var(--app-container-text-primary-hover)",
						}}
					>
						Copied address to clipboard!
					</p>
					<p
						style={{
							fontWeight: "500",
							color: "var(--app-container-text-primary-hover)",
							fontSize: "0.875rem",
							lineHeight: "1",
						}}
					>
						{constants.COPY_WARNING}
					</p>
				</>
			);
		});
	};
	return (
		<>
			<BasicDetailsContainer>
				<div>
					<ProfilePicture url={getAvatarFromId(auth.address)} />
				</div>
				<ProfileDetails>
					<div>
						<ProfileName title={username}>{username}</ProfileName>
					</div>
					<ProfileAddress
						// onClick={copyAddress}
						title={auth.address}
					>
						{truncateAddress(auth.address, 6)}
					</ProfileAddress>
					<LazyMotion features={domAnimation}>
						<ButtonContainer
							whileHover={{
								y: -2.5,
								x: 0,
							}}
						>
							<Button to="/profile">View Profile</Button>
						</ButtonContainer>
					</LazyMotion>
				</ProfileDetails>
			</BasicDetailsContainer>
			<DividerHorizontal />
			<Balance />
			<Withdraw />
			<DividerHorizontal />
		</>
	);
};

export default ProfileElement;
