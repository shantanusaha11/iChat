import express from 'express';
import { getAllUsers, login, register, setAvatar } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.patch("/setAvatar/:id",auth,setAvatar);
router.get("/users/:id",auth,getAllUsers);

export default router;