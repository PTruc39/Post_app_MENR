const express = require('express');
const { getAllUser,signup, login, sendPass,checkToken,changePassword} =require("../controllers/user-controller");

const router = express.Router();

router.get("/",getAllUser);
router.post("/signup",signup)
router.post("/login",login)
router.post("/sendpasswordlink",sendPass)
router.get("/forgotpassword/:id/:token",checkToken)
router.post("/:id/:token",changePassword)


module.exports=router;