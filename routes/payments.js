const url = require("url");
const axios = require("axios");

{
	/* Account Schema
    ---
    - Account Name
    - Lending Fees
    - Funding Payment
    - Time
*/
}

module.exports.paymentSystem = function (req, res) {
	// Get Lending & Funding Payments
	let lending = `${process.env.SERVER_URL}/borrows`;
	let funding = `${process.env.SERVER_URL}/funding_payments`;

	const requestLending = axios.get(lending);
	const requestFunding = axios.get(funding);

	axios
		.all([requestLending, requestFunding])
		.then(
			axios.spread((...responses) => {
				const lending = responses[0].data.result.slice(0, 4);
				const funding = responses[1].data.result.slice(0, 4);
				// Lending Breakdown

				// Funding Breakdown
				let calcRate = [];
				let calcFunding = [];
				funding.forEach((f) => {
					// Funding Rate
					calcRate.push(f.rate * 100);
					// Funding Payout
					calcFunding.push(f.payment);
				});
				// Formulate Funding Alert
				console.log(
					`Average Rate: ${JSON.stringify(
						calcRate.reduce(function (a, b) {
							return a + b;
						}, 0) / 4
					).slice(0, 5)}%`
				);
				console.log(
					`Total Payment: $${JSON.stringify(
						calcFunding.reduce(function (a, b) {
							return a + b;
						}, 0)
					).slice(0, 5)}`
				);
			})
		)
		.catch((errors) => {
			console.log(errors);
		});
};
