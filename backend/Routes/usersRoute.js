import express from "express";
import { CreateUsers,LoginUsers, logoutUsers, updateUser, deleteUser } from "../Controllers/UsersController.js";
import { protectmiddleware } from "../Utils/authmiddleware.js";

const usersrouter = express.Router();


usersrouter.post("/user", CreateUsers);
usersrouter.get("/login", LoginUsers);
usersrouter.post("/logout", logoutUsers);
usersrouter.patch("/update", protectmiddleware, updateUser);
usersrouter.delete("/delete", protectmiddleware, deleteUser);

export default usersrouter;
