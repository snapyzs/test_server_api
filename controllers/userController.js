const ExtError = require("../error/error");
const {User} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id,email) => {
    return jwt.sign({id:id,email},process.env.SECRET_KEY,{expiresIn:'24h'});
}

class UserController {
    async createUser(req,res,next) {
        const {email,password} = req.body;
        if (!email || !password) {
            return next(ExtError.badRequest("Not correct email or password"));
        }
        const userForCreate = await User.findOne({where:{email}});
        if (userForCreate) {
            return next(ExtError.badRequest("Email allready exist"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email,password:hashPassword});
        const token = await generateJwt(user.id,user.email);
        return res.json({token});

    }
    async loginUser(req,res,next) {
        const {email,password} = req.body;
        const user = await User.findOne({where:{email}});
        if (!user) {
            return next(ExtError.internalError("User not found"));
        }
        let comparePassword = bcrypt.compareSync(password,user.password);
        if (!comparePassword) {
            return next(ExtError.internalError("Not correct email or password"));
        }
        const token = generateJwt(user.id,user.email);
        return res.json({token,id:user.id});
    }
    async logoutUser() {
        
    }
}

module.exports = new UserController();