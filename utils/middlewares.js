const jwt = require("jsonwebtoken");

module.exports = {

    tokenVerify: async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            if (decoded.userId) {
                next();
            }
            else throw new Error();
        }
        catch (e) {
            res.sendStatus(401);
        }
    },
}
