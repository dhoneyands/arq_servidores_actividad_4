/* UUID middleware

const sessions = [];

module.exports.sessions = sessions;

module.exports.checkAuth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split("Bearer ")[1];
    console.log(token);

    const session = sessions.find( x=> x.token === token);
    if (!session){
        return res.status(401).json({ message: "unathorized"})
    };
    
    next();
};
*/
const jwt = require("jsonwebtoken");
// JWT middleware

module.exports.checkAuth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split("Bearer ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};