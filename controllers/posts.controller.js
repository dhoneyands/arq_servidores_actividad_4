const Post = require("../models/posts.model");

module.exports.create = (req,res) => {
    Post.create(req.body).then((post) => {
        res.json(post);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.list = (req, res) => {
    Post.find().then((posts) => {
        if (posts) {
            res.json(posts);
        } else {
            res.status(404).json({message: "no post was found"});
        }
    })
    .catch(console.error);
};

module.exports.details = (req, res) => {
    Post.findById(req.params.id).then((post) => {
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({message: "post not found"});
        }
    })
    .catch(console.error);
};

module.exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).then((post) => {
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({message: "post not found"});
        }
    }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.delete = (req,res) => {
    Post.findByIdAndDelete(req.params.id).then((post) =>{
        res.status(204).send();
    })
    .catch(console.error);
};
