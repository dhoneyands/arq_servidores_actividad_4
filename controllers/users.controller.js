const User = require("../models/users.model");
//const {v4: uuidv4} = require('uuid');
//const { sessions } = require('../middlewares/auth.middleware');
const jwt = require("jsonwebtoken");

module.exports.create = (req,res) => {
    User.create(req.body).then((user) => {
        const token = jwt.sign({ sub: user.id}, process.env.JWT_SECRET);
        const verifyUrl = `http://localhost:8080/api/users/verify?token=${token}`;
        console.log(verifyUrl);
        res.json(user);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.verify = (req,res) => {
    const token = req.query.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        User.findByIdAndUpdate(decoded.sub, { active: true })
        .then((user) =>{
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({message: "user not found"});
            }
        })
        .catch(console.error);
    } catch (err) {
        res.status(401).json({ message: "unable to verify" });
    }
};

/*
module.exports.list = (req, res) => {
    User.find().then((users) => {
        res.json(users);
    })
    .catch(console.error);
};


module.exports.details = (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: "user not found"});
        }
    })
    .catch(console.error);
};

module.exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: "user not found"});
        }
    }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.delete = (req,res) => {
    User.findByIdAndDelete(req.params.id).then((user) =>{
        res.status(204).send();
    })
    .catch(console.error);
};
*/

/* login controller with uuid

module.exports.login = (req,res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
        if (user){
            const token = uuidv4();
            sessions.push({ userId: user.id, token });
            res.json({ token });
        } else {
            res.status(401).json({ message: "invalid credentials" });
        }
    })
    .catch(console.error);
};
*/
// login controller with jwt

module.exports.login = (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    } else {
    User.findOne({
        email: req.body.email, 
        password: req.body.password,
        active: true,
    })
    .then((user) => {
        if (user) {
            const token = jwt.sign(
                {
                    sub: user.id,
                    exp: Date.now() / 1000 + 3600,
                },
                process.env.JWT_SECRET
            );
            res.json({ token });
        } else {
            res.status(401).json({ message: "invalid credentials" });
        }
    })
    .catch(console.error);
    }
};

