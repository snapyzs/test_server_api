const {Post} = require("../models/models");
const ExtError = require("../error/error");


class PostController {
    async getAllPost(req,res) {
        const posts = await Post.findAll();
        res.json({posts});
    }
    
    async createPost(req,res,next) {
        const {title,description} = req.body;
        if (!title || !description) {
            return next(ExtError.badRequest("Empty title or description post"));
        }
        const userId = req.user.id;
        const post = await Post.create({title,description,userId});
        res.json(post);
    }
    async editPost(req,res,next) {
        const {id,title,description} = req.body;
        if (!title || !description || !id) {
            return next(ExtError.badRequest("Empty title,id or description post"));
        }
        const result = await Post.update({title,description},{where:{id}});
        res.json(Boolean(result));
    }
    async deletePost(req,res,next) {
        const {id} = req.body;
        if (!id) {
            return next(ExtError.badRequest("Empty id for delete post"));
        }
        const result = await Post.destroy({where:{id}});
        res.json(Boolean(result));
    }
}

module.exports = new PostController();