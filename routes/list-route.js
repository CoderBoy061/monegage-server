import express from 'express';
import {isAuthenticated} from "../middleware/isAuth.js"
import { getSavedLists, removeList, saveList, updateList } from '../controllers/list-controller.js';


const router = express.Router();

router.route("/getall").get(isAuthenticated,getSavedLists);
router.route("/save").post(isAuthenticated,saveList);
router.route("/remove/:id").delete(isAuthenticated,removeList);
router.route("/update/:id").patch(isAuthenticated,updateList);



export default router;