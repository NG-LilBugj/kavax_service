const express = require("express");
const userHandlers = require("../handlers/user.handlers");

const authRouter = express.Router();

authRouter.use('/signup', async (req, res) => {
    try {
        const result = await userHandlers.signUpUser(req.body.userData);
        if (result.success) {
            res.sendStatus(200);
            res.send({ message: "Success sign up", accessToken: result.token });
        }
        else throw new Error();
    }
    catch (e) {
        res.sendStatus(403);
    }
});
authRouter.use('/signin', async (req, res) => {
    try {
        const result = await userHandlers.logInUser(req.body.userData);
        if (result.success) {
            res.sendStatus(200);
            res.send({message: "Success login", accessToken: result.token});
        }
        else throw new Error()
    }
    catch (e) {
        res.sendStatus(401)
    }
});
authRouter.use('/signdown', async (req, res) => {
    try {
        
    }
    catch (e) {
        
    }
})



module.exports = { authRouter };
