const mongoose = require("mongoose");

const schema = mongoose.Schema({
    bid: {
        type: Number,
        required: true
    },
    ask: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("1inch", schema);