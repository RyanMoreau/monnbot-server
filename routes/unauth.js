const url = require("url");
const axios = require("axios");

{
	/* Route Functions */
}
// Get All Futures
module.exports.getAllFutures = function (req, res) {
	const options = {
		method: "GET",
		url: "https://ftx.com/api/futures",
	};
	axios(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			console.log("getAllFutures", error);
		});
};

// All Fundings
module.exports.allFundings = function (req, res) {
	const options = {
		method: "GET",
		url: "https://ftx.com/api/funding_rates",
	};
	axios(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			console.log("allFundings", error);
		});
};

// Get Single Market
module.exports.getMarket = function (req, res) {
	var input = url.parse(req.url, true).query;
	const options = {
		method: "GET",
		url: "https://ftx.com/api/markets/" + input.market_name,
	};
	axios(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			console.log("getMarket", error);
		});
};

// Get Single Future
module.exports.getFuture = function (req, res) {
	var input = url.parse(req.url, true).query;
	const options = {
		method: "GET",
		url: "https://ftx.com/api/futures/" + input.future,
	};
	axios(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			console.log("getFuture", error);
		});
};

// Get Single Funding
module.exports.getFunding = function (req, res) {
	var input = url.parse(req.url, true).query;
	const options = {
		method: "GET",
		url: "https://ftx.com/api/funding_rates?future=" + input.future,
	};
	axios(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			console.log("getFunding", error);
		});
};

// Next Funding Rate
module.exports.nextRate = function (req, res) {
	var input = url.parse(req.url, true).query;
	const options = {
		method: "GET",
		url: "https://ftx.com/api/futures/" + input.future + `/stats`,
	};
	axios(options)
		.then(function (response) {
			res.send(response.data);
		})
		.catch(function (error) {
			console.log("nextRate", error);
		});
};
