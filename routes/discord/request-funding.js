const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();
const key = process.env.DISCORD_TOKEN;

module.exports.funding = function () {
	client.on("message", (message) => {
		// Statement captures discord message when started wih a comma.
		if (message.content.charAt(0) === ",") {
			var text = message.content.substring(1).split(" ");

			// Axios Funding Request
			axios
				.get(`${process.env.SERVER_URL}/funding_rates?future=${text[0]}-perp`)
				.then(function (response) {
					// Limit Response
					let limit = text[1] || "500";
					let result = response.data.result.slice(0, limit);

					// Store Funding Rates
					let funding = [];
					result.forEach((r) => {
						funding.push(r.rate * 100);
					});

					// Get Average of Array
					var sum = funding.reduce(function (a, b) {
						return a + b;
					}, 0);

					// Count Positive, Negative, Zero Values
					var zeroCount = 0,
						posCount = 0,
						negativeCount = 0;
					funding.forEach((item) => {
						if (item === 0) {
							zeroCount++;
						} else if (item < 0) {
							negativeCount++;
						} else if (item > 0) {
							posCount++;
						}
					});

					// Discord Message
					const entryLog = `
						**${text[0].toUpperCase()} Last ${text[1] ? text[1] : "500"} Hours:**
						Total: ${JSON.stringify(sum).slice(0, 7)}%,
						Highest: ${JSON.stringify(Math.max(...funding)).slice(0, 7)}%,
						Lowest: ${JSON.stringify(Math.min(...funding)).slice(0, 7)}%,
						Average: ${JSON.stringify(sum / limit).slice(0, 7)}%,
						Summary: ${posCount} Positive, ${negativeCount} Negative, ${zeroCount} Zero
						${process.env.APP_URL}/coin/${text[0]}
					`;
					message.channel.send(entryLog);
					// Discord Message
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		// Discord Bots Key
	});
	client.login(key);
};
