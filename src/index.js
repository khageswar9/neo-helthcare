import express from 'express';
import authController from'./controllers/auth.controller.js'
import usercontroller from'./controllers/user.controller.js'

const app = express();
app.use(express.json());
app.use("/",authController)
app.use("/user",usercontroller)
export default app