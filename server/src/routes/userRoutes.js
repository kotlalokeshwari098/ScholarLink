import { Router } from "express";
import { verifyLogin } from "../middleware/authmiddleware.js";
import {userRegister, userLogin, userDashboard, userBookmarking, userBookmarks, userRemoveBookmark,userProfile } from '../controllers/userController.js'

const route = Router();

route.post("/register", userRegister);


route.post("/login", userLogin);


// verifyLogin to verify whether user logged in or not
route.get('/dashboard',verifyLogin,userDashboard)
route.get('/profile',verifyLogin,userProfile)

route.post('/bookmarking',verifyLogin,userBookmarking)

route.get('/bookmark',verifyLogin,userBookmarks)

route.delete('/remove',verifyLogin,userRemoveBookmark)

export default route;
