import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
	background: transparent;
	padding: 0.1rem;
	margin-right: 0.25rem;
`;

const NervosIcon = ({ size, centered }) => {
	const dimension = size ? size : `36`;
	return (
		<SVG
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={dimension}
			height={dimension}
			viewBox="0 0 64 64"
			enable-background="new 0 0 64 64"
			xmlSpace="preserve"
		>
			<circle fill="currentColor" cx="32" cy="32" r="32" />
			<g
				fill="black"
				transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
			>
				<path d="M406.6,401v-98.9l-30.9-1.9l-30.9-1.9l77.3-77.3l77.3-77.3v178.1v177.5H453h-46.4V401z" />
				<path d="M140.7,318.1V140.7H187h46.4v95.9v95.2l34,1.9l34,1.9l-80.4,80.4l-80.4,80.4V318.1z" />
			</g>
		</SVG>
	);
};

export default NervosIcon;
