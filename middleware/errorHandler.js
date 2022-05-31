const ExtError = require("../error/error");

module.exports = function(err,req,res,next) {
    if (err instanceof ExtError) {
        return res.status(err.status).json({message:err.message});
    }
    return res.status(500).json({message:"Not await error"});
}