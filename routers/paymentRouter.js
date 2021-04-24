const express = require("express");
const paymentHandlers = require("../handlers/payment.handlers");

const paymentRouter = express.Router();

module.exports = { paymentRouter }
