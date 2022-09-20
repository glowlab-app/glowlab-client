const constants = {
	APP_NAME: "Glowlab",
	APP_DESCRIPTION: "Glowing with creativity",
	APP_ABOUT: "Where art meets the blockchain.",
	APP_WEBSITE: "https://glowlab.xyz",
	APP_SCAN_BASE_URL: "https://evm.evmos.org/",
	SOCIAL: {
		TWITTER_HANDLE: "glowlab-app",
		GITHUB_HANDLE: "glowlab-app",
	},
	STATE_TYPES: ["Available", "Sale", "Auction", "Raffle", "Loan"],
	STATE_EMPTY_MESSAGE_MAP: [
		'Looks like nothing\'s "Available" here 🤔',
		'Sorry pal, nothing\'s "On Sale" right now 😔',
		'This place is currently "Auctioned" away 😶',
		'This area seems to be "Raffled" off 📪',
		'This section is on "Loan" 🤩',
	],
	STATE_TYPES_KEYS: ["sale", "auction", "raffle", "loan"],
	STATE_EMOJI_MAP: {
		sale: "💰",
		auction: "⌛",
		raffle: "🎲",
		loan: "🏦",
	},
	CREATE_ACCEPTED_MIMETYPES: ["image/jpeg", "image/png", "video/mp4"],
	EXPLORE_PAGINATION_LIMIT: 12,
	COPY_WARNING: "Use this address only on the Evmos",
};

export default constants;
