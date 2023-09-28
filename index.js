const express = require("express");
const app = express();
const server = app.listen(process.env.PORT);
const payments = require("./routes/payments");
const bodyParser = require("body-parser");
const cors = require("cors");

// CORS Authentication
app.use(cors());

// Body Parsing (For API Requests)
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

// Unauthenticated Routes
const unauth = require("./routes/unauth");
app.get("/all_futures", unauth.getAllFutures);
app.get("/all_funding", unauth.allFundings);
app.get("/markets", unauth.getMarket); // Takes prop ?market_name=
app.get("/futures", unauth.getFuture); // Takes prop ?future=
app.get("/funding_rates", unauth.getFunding); // Takes prop ?future=
app.get("/next_rate", unauth.nextRate); // Takes prop ?future=

// Authenticated Routes
const auth = require("./routes/auth");
app.get("/lending", auth.getLending);
app.get("/account", auth.getAccount);
app.get("/funding_payments", auth.getPayments);
app.get("/subaccounts", auth.subAccounts);
app.get("/wallet/all_balances", auth.allBalances);
app.get("/wallet/balances", auth.getBalances);
app.get("/positions", auth.positions);
app.get("/orders", auth.getOrder);
app.get("/borrows", auth.getBorrows);
// app.get('/subpositions', auth.subPositions)

{
	/* CRUD OPERATIONS - 0924
const eth = require('./routes/spreads/eth/index')
const btc = require('./routes/spreads/btc/index')
const oneInch = require('./routes/spreads/1inch/index')
const aave = require('./routes/spreads/aave/index')
const doge = require('./routes/spreads/doge/index')
const grt = require('./routes/spreads/grt/index')
const sushi = require('./routes/spreads/sushi/index')
const link = require('./routes/spreads/link/index')
const sol = require('./routes/spreads/sol/index')
const yfi = require('./routes/spreads/yfi/index')
*/
}

app.get("/eth", eth.createSpread);
app.get("/btc", btc.createSpread);
app.get("/1inch", oneInch.createSpread);
app.get("/aave", aave.createSpread);
app.get("/doge", doge.createSpread);
app.get("/grt", grt.createSpread);
app.get("/sushi", sushi.createSpread);
app.get("/link", link.createSpread);
app.get("/sol", sol.createSpread);
app.get("/yfi", yfi.createSpread);

// GET
app.get("/spreads/eth", eth.getSpread); // Takes prop ?limit=
app.get("/spreads/btc", btc.getSpread); // Takes prop ?limit=
app.get("/spreads/1inch", oneInch.getSpread); // Takes prop ?limit=
app.get("/spreads/aave", aave.getSpread); // Takes prop ?limit=
app.get("/spreads/doge", doge.getSpread); // Takes prop ?limit=
app.get("/spreads/grt", grt.getSpread); // Takes prop ?limit=
app.get("/spreads/sushi", sushi.getSpread); // Takes prop ?limit=
app.get("/spreads/link", link.getSpread); // Takes prop ?limit=
app.get("/spreads/sol", sol.getSpread); // Takes prop ?limit=
app.get("/spreads/yfi", yfi.getSpread); // Takes prop ?limit=

// POST
app.post("/spreads/eth", eth.postSpread);
app.post("/spreads/btc", btc.postSpread);
app.post("/spreads/1inch", oneInch.postSpread);
app.post("/spreads/aave", aave.postSpread);
app.post("/spreads/doge", doge.postSpread);
app.post("/spreads/grt", grt.postSpread);
app.post("/spreads/sushi", sushi.postSpread);
app.post("/spreads/link", link.postSpread);
app.post("/spreads/sol", sol.postSpread);
app.post("/spreads/yfi", yfi.postSpread);

app.get("/payments", payments.paymentSystem);

{
	/* FOR ARCHIVING SPREADS INTO WASABI */
}
// const axios = require('axios')
// app.get('/eth0625', function (req, res) {
//     const options = {
//         method: 'GET',
//         url: 'https://s3.us-central-1.wasabisys.com/nexinity-eth0625/eths.json'
//     }
//     axios(options)
//     .then(function (response) {
//         res.send(response.data)
//     })
//     .catch(function (error) {
//         console.log(error)
//     })
// })
