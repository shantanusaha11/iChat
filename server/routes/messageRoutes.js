import express from 'express';
import {getMessage,addMessage} from '../controllers/messagesController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/getmsg",auth,getMessage);
router.post("/addmsg",auth,addMessage);

export default router;