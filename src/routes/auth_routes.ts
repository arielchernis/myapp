import express from "express"
import Auth from '../controllers/auth'
import authenticate from "../common/auth_middleware"


const router = express.Router()


router.post('/register', Auth.register)

router.post('/login', Auth.login)

router.get("/refresh", Auth.renewToken)

router.get("/test", authenticate, Auth.test);

//router.get("/test2", Auth.test);


export = router