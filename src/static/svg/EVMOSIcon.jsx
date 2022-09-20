import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
	background: transparent;
	padding: 0.1rem;
	margin-right: 0.25rem;
`;

const EVMOSIcon = ({ size, centered }) => {
	const dimension = size ? size : `36`;
	return (
		<SVG
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={dimension}
			height={dimension}
			viewBox="28 0 163 163"
			fill="currentColor"
		>
			<path d="M94.4616 35.2807C67.1544 45.8062 64.6529 72.7621 56.8228 85.3512C48.9 98.0897 30.7491 105.118 33.2312 111.61C35.7132 118.101 53.8857 111.129 68.2628 115.271C82.4695 119.364 102.292 137.717 129.599 127.191C143.51 121.83 153.583 110.794 158.215 97.7216C158.713 96.3185 157.782 94.8179 156.304 94.6793C155.386 94.5927 154.504 95.0756 154.09 95.9027C149.9 104.282 142.712 111.183 133.306 114.808C117.777 120.793 100.786 116.094 90.3514 104.308C87.9814 101.632 85.9544 98.5855 84.3543 95.2185C83.9144 94.2917 83.496 93.3498 83.1251 92.3754C82.752 91.4011 82.435 90.4202 82.1439 89.435C90.3514 85.5937 99.8225 81.5251 110.56 77.3872C121.087 73.3294 130.669 70.0382 139.199 67.4051C144.97 65.6253 150.26 64.1442 155.036 62.9338C155.382 62.8472 155.722 62.7606 156.061 62.6761C156.783 62.4964 157.525 62.884 157.792 63.5812L157.797 63.5942C157.954 64.0078 158.09 64.4235 158.237 64.8393C159.181 67.5221 159.889 70.233 160.356 72.9505C160.561 74.1392 161.855 74.7867 162.916 74.215C166.837 72.1017 170.423 70.0403 173.627 68.0569C185.568 60.6732 192.188 54.4112 190.829 50.8622C189.473 47.3111 180.381 47.1076 166.586 49.641C162.202 50.4465 157.342 51.5291 152.104 52.8695C151.198 53.1011 150.281 53.3415 149.354 53.5883C144.946 54.7619 140.297 56.1066 135.456 57.6115C126.453 60.4112 116.794 63.7653 106.822 67.6087C97.4936 71.2053 88.6521 74.9339 80.5438 78.6496C80.4446 62.8797 89.9395 47.9715 105.468 41.9866C114.872 38.3619 124.814 38.6586 133.513 42.0732C134.371 42.411 135.348 42.1772 135.976 41.4951C136.98 40.4016 136.672 38.6607 135.367 37.9505C123.214 31.3528 108.373 29.9194 94.4616 35.2807Z" />
		</SVG>
	);
};

export default EVMOSIcon;
