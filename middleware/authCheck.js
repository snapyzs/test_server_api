const jwt = require("jsonwebtoken");

const authCheck = (req,res,next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({message:"Not auth"});
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401).json({message:"Not auth"});
    }
}

module.exports = authCheck;