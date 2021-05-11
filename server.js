const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const { authRouter } = require("./routers/authRouter");
const { serviceRouter } = require("./routers/serviceRouter");
const { paymentRouter } = require("./routers/paymentRouter")
const { connect } = require('./db/dbAccess')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.status(200);
    res.send('<h1>HELLO, KOTUX!</h1>');
});

app.use('/auth', authRouter);
app.use('/service', serviceRouter);
app.use('/payment', paymentRouter);

app.listen(process.env.PORT, async () => {
    //await connect();
    console.log(`App is listening at port ${process.env.PORT}`)
});
