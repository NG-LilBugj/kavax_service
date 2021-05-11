const fs = require("fs");
const multer = require("multer");
const express = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const serviceHandlers = require("../handlers/service.handlers");
const { tokenVerify } = require("../utils/middlewares");

const timestamp = moment.now().toString();

const serviceRouter = express.Router();
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, `Upload ${timestamp}`);
    }
});
const upload = multer({ storageConfig: storageConfig }).single('device_pic');

serviceRouter.use(tokenVerify);
serviceRouter.get('/device', async (req, res) => {
    try {
        const result = await serviceHandlers.getDevice(req.body.id);
        if (result.success) {
            res.status(200);
            res.send({ device: result.device });
        }
        else throw new Error();
    }
    catch (e) {
        res.status(504);
        res.send({ error: e })
    }
});
serviceRouter.get('/deviceList', async (req, res) => {
    try {
        const { userId } = jwt.decode(req.headers.authorization)
        const result = await serviceHandlers.deviceList(userId);
        if (result.success) {
            res.status(200);
            res.send({ devices: result.devices });
        }
        else throw new Error();
    }
    catch (e) {
        res.status(504);
        res.send({ error: e })
    }
})
serviceRouter.get('/deviceImg', async (req, res) => {
    try {
        const result = await serviceHandlers.getDevice(req.body.data.id);
        if (result.success) {
            res.writeHead(200, { "Content-type": "image/png" });
            res.send(result.device.getDataValue("image"))
        }
        else throw new Error();
    }
    catch (e) {
        res.status(504);
        res.send({ error: e })
    }
});
serviceRouter.post('/deliver', upload, async (req, res) => {
    try {
        const bufferData = fs.readFileSync(`uploads/Upload ${timestamp}`)
        const data = req.body;
        const result = await serviceHandlers.deliverDevice({
            model: data.model,
            estimatedCost: data.estimatedCost,
            userId: jwt.decode(req.headers.authorization).userId,
            image: bufferData
        });
        if (result.success) {
            res.status(200);
            res.send({ message: "Device delivered" });
        }
        else throw result.error;
    }
    catch (e) {
        res.status(504);
        res.send({ error: e });
    }
});
serviceRouter.delete('/ship', async (req, res) => {
    try {
        const result = await serviceHandlers.shipDevice(req.query.id);
        if (result.success) {
            res.status(200);
            res.send({ message: "Device shipped back", device: result.device })
        }
        else {
            throw result.error
        }
    }
    catch (e) {
        res.status(e.message === "Device is not ready to be shipped" ? 403 : 504);
        res.send({ error: e });
    }
});

module.exports = { serviceRouter };
