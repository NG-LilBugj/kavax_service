const fs = require("fs");
const multer = require("multer");
const express = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const serviceHandlers = require("../handlers/service.handlers");

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

serviceRouter.get('/deviceData', async (req, res) => {
    try {
        const result = await serviceHandlers.getDevice(req.body.data.id);
        if (result.success) {
            res.send({ device: result.device });
        }
        else throw new Error();
    }
    catch (e) {
        res.sendStatus(504)
    }
});
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
        res.sendStatus((504))
    }
});
serviceRouter.post('/deliver', upload, async (req, res) => {
    try {
        const bufferData = fs.readFileSync(`uploads/Upload ${timestamp}`)
        const data = req.body.data;
        const result = await serviceHandlers.deliverDevice({
            model: data.model,
            estimatedCost: data.estimatedCost,
            userId: jwt.decode(req.headers.authorization).userId,
            image: bufferData
        });
        if (result.success) {
            res.sendStatus(200);
            res.send({ message: "Device delivered" });
        }
        else throw new Error();
    }
    catch (e) {
        res.sendStatus(504);
    }
});
serviceRouter.delete('/deliver', async (req, res) => {
    try {

    }
    catch (e) {
        
    }
});

module.exports = { serviceRouter };
