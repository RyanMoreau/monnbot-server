const url = require("url");
const FTXRest = require("ftx-api-rest");

// FTX Read-Only Keys. Will need to update these in the future.
// LOL I was wrong - goodbye FTX 👋
let key = process.env.FTX_KEY;
let secret = process.env.FTX_SECRET;

{
	/* Route Functions */
}
// Lending Rates
module.exports.getLending = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/spot_margin/lending_rates",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Get Account Details
module.exports.getAccount = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/account",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Accounts Funding Payments
module.exports.getPayments = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/funding_payments",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Get Subaccount Data
module.exports.subAccounts = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/subaccounts",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Get Account Balance
module.exports.getBalances = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/wallet/balances",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Get Subaccount Balances
module.exports.allBalances = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/wallet/all_balances",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Get Sub Account Totals
module.exports.subBalance = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/subaccounts/" + input.sub + `/balances`,
		})
		.then(function (response) {
			res.send(response);
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Get Account Spot Positions
module.exports.positions = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/positions",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// Account Order History
module.exports.getOrder = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/orders/history?market=" + input.market,
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

module.exports.getBorrows = function (req, res) {
	const ftx = new FTXRest({
		key: key,
		secret: secret,
		// subaccount: keys.subaccount
	});

	ftx
		.request({
			method: "GET",
			path: "/spot_margin/borrow_history",
		})
		.then(function (response) {
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};
