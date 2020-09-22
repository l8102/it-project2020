// todo fix this
// const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    
    try {
        const token = req.header("x-auth-token");

        //if no token found 
        if (!token) {
            return res.status(401).json({ msg: "No authentication token found, access denied." });
        }

        //incorrect token found 
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({ msg: "Token verification failed, access denied." });
        }

        //correct token 
        req.user = verified.id;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
};

module.exports = authenticate;