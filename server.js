const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const { authRouter } = require("./routers/authRouter");
const { serviceRouter } = require("./routers/serviceRouter");
const { paymentRouter } = require("./routers/paymentRouter");
const userHandlers = require("./handlers/user.handlers");
const { connect } = require('./db/dbAccess');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    const users = await userHandlers.systemUsers();
    res.status(200);
    res.send({ users });
});

app.use('/auth', authRouter);
app.use('/service', serviceRouter);
app.use('/payment', paymentRouter);

app.listen(process.env.PORT, async () => {
    //await connect();
    console.log(`App is listening at port ${process.env.PORT}`)
});
