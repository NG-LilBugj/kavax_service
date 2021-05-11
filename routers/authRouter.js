const express = require("express");
const userHandlers = require("../handlers/user.handlers");

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const result = await userHandlers.signUpUser(req.body.userData);
        if (result.success) {
            res.status(200);
            res.send({ message: "Success sign up", accessToken: result.token });
        }
        else throw new Error();
    }
    catch (e) {
        res.status(403);
        res.send({ error: e });
    }
});
authRouter.post('/signin', async (req, res) => {
    try {
        const result = await userHandlers.logInUser(req.body.userData);
        if (result.success) {
            res.status(200);
            res.send({message: "Success login", accessToken: result.token});
        }
        else throw new Error()
    }
    catch (e) {
        res.send({ error: e });
        res.status(401);
    }
});
authRouter.delete('/signdown', async (req, res) => {
    try {
        
    }
    catch (e) {

    }
})



module.exports = { authRouter };
