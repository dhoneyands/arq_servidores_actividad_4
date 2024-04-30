const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");

//import auth middleware
const { checkAuth } = require('../middlewares/auth.middleware');

/* users CRUD
router.post("/users", users.create);
router.get("/api/users", users.list);
router.get("/users/:id", checkAuth, users.details);
router.patch("/users/:id", users.update); // actualiza info parcial
//router.put("/users/:id", users.update);  sustituye toda la info
router.delete("/users/:id", users.delete);
*/

// posts CRUD
router.post("/api/posts", checkAuth, posts.create);
router.get("/api/posts", checkAuth, posts.list);
router.get("/api/posts/:id", checkAuth, posts.details);
router.patch("/api/posts/:id", checkAuth, posts.update);
router.delete("/api/posts/:id", checkAuth, posts.delete);

// login and verification of user
router.post("/api/users", users.create);
router.get("/api/users/verify", users.verify);
router.post("/api/login", users.login);


module.exports = router;