const url = require("url");
const mongoose = require("mongoose");
const cron = require("node-cron");
const axios = require("axios");
const eth = require("./model");

let DBpath = process.env.DB_PATH;
mongoose.connect(DBpath, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;

// Establish Schema Upon Connection
if (!db) {
	console.log("BTC DB Error.");
} else {
	console.log("BTC Listening.");
}

// Create & Post BTC Data
module.exports.createSpread = function () {
	cron.schedule(process.env.CRONJOB_SCHEDULE, () => {
		let perp = `${process.env.SERVER_URL}/markets?market_name=btc-0924`;
		let usd = `${process.env.SERVER_URL}/markets?market_name=btc/usd`;

		// Get axios requests ready.
		const requestusd = axios.get(usd);
		const requestperp = axios.get(perp);

		axios.all([requestusd, requestperp]).then(
			axios.spread((...res) => {
				let i;
				let bidSpread =
					((res[0].data.result.bid - res[1].data.result.ask) /
						res[0].data.result.bid) *
					100;
				let askSpread =
					((res[0].data.result.ask - res[1].data.result.bid) /
						res[0].data.result.ask) *
					100;
				axios
					.post(`${process.env.SERVER_URL}/spreads/btc`, {
						id: i,
						bid: bidSpread,
						ask: askSpread,
					})
					.catch(function (error) {
						console.log(error);
					});
			})
		);
	});
};

// Save BTC Data in Mongo
module.exports.postSpread = async function (req) {
	const spread = new eth({
		bid: req.body.bid,
		ask: req.body.ask,
	});
	await spread.save();
	// console.log(spread)
};

// Display BTC Data
module.exports.getSpread = function (req, res) {
	var input = url.parse(req.url, true).query;
	let limit = input.limit;

	eth
		.find({}, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		})
		.sort({ $natural: -1 })
		.limit(parseInt(limit));
};
