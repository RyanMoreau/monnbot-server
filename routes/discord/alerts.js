const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();
const key = process.env.DISCORD_TOKEN;
const cron = require("node-cron");
const numeral = require("numeral");

module.exports.perpfuts = function () {
	cron.schedule("00 00 */1 * * * *", () => {
		client.on("ready", () => {
			// Define Short/Long Emojis
			const emojiShort = "<:pepeshort:851247283261800469>";
			const emojiLong = "<:pepelong:851247283063619605>";

			// Ping The Server
			client.channels.cache
				.find((channel) => channel.name === "funding-alerts")
				.send(`*Ping! Top Performers Last Hour:*`);

			// Get Message Details
			axios
				.get(`${process.env.SERVER_URL}/all_futures`)
				.then(function (response) {
					const all = response.data.result;

					// Get Perpetuals
					let allPerps = [];
					all.forEach((p) => {
						if (p.type === "perpetual") {
							allPerps.push(p);
						}
					});

					// Get Futures
					let allFutures = [];
					all.forEach((f) => {
						if (f.type === "future") {
							allFutures.push(f);
						}
					});

					// Match Perp with Future, Request Data
					allPerps.forEach((ap) => {
						allFutures.forEach((af) => {
							if (ap.underlying === af.underlying) {
								let pf = `${process.env.SERVER_URL}/funding_rates?future=${af.underlying}-perp`;
								axios.get(pf).then(function (response) {
									let name = response.data.result[0].future;
									let rate = JSON.stringify(
										response.data.result[0].rate * 100
									).slice(0, 7);

									// Calculate Spread
									const askSpread = JSON.stringify(
										((ap.bid - af.ask) / ap.bid) * 100
									).substr(0, 5);
									const bidSpread = JSON.stringify(
										((ap.ask - af.bid) / ap.ask) * 100
									).substr(0, 5);

									// Post To Discord
									if (
										Math.sign(rate) == -1 &&
										rate <= -0.005 &&
										af.volumeUsd24h > 150000
									) {
										// If Negative Rate
										client.channels.cache
											.find((channel) => channel.name === "funding-alerts")
											.send(
												`${emojiShort} **${name}, ${rate}** \nPerp Volume: ${numeral(
													ap.volumeUsd24h
												).format("$0,0.00")} | Fut Volume: ${numeral(
													af.volumeUsd24h
												).format(
													"$0,0.00"
												)}\nBid Spread: ${bidSpread} | Ask Spread: ${askSpread}`
											);
									} else if (
										Math.sign(rate) == 1 &&
										rate >= 0.005 &&
										af.volumeUsd24h > 150000
									) {
										// If Positive Rate
										client.channels.cache
											.find((channel) => channel.name === "funding-alerts")
											.send(
												`${emojiLong} **${name}, ${rate}**\nPerp Volume: ${numeral(
													ap.volumeUsd24h
												).format("$0,0.00")} | Fut Volume: ${numeral(
													af.volumeUsd24h
												).format(
													"$0,0.00"
												)}\nBid Spread: ${bidSpread} | Ask Spread: ${askSpread}`
											);
									} else {
										// If Requirements Not Met
										null;
									}
								});
							}
						});
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		});
		client.login(key);
	});
};
