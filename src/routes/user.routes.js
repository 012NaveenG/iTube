import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/users.controler.js";
import {upload} from "../Middlewares/multer.middleware.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
        name:"coverImage",
        maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

// Secured Routes
router.route("/logout").post(verifyJWT,logoutUser)

export default router