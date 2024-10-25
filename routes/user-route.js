import express from "express";
import { createNewUser, getUserInfo, loginUser, logoutUser } from "../controllers/user-controller.js";
import { isAuthenticated } from "../middleware/isAuth.js";

const router = express.Router();

router.route("/create").post(createNewUser);

router.route("/login").post(loginUser);

router.route("/logout").post(isAuthenticated, logoutUser);
router.route("/get").get(isAuthenticated, getUserInfo);

export default router;
