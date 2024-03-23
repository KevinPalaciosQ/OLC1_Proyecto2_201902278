import controller from "../controller/api.controler"
import express from "express"
const router = express.Router();
router.get("/ping", controller.ping)
router.get("/index", controller.parse)
//router.post("/parse", controller.parse)
export default router;
