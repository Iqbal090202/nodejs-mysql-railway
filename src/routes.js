import express from 'express';
import { getUserByID, getUsers, addUser, deleteUser, updateUser } from "./controller/user-controller.js";

const router = express.Router()
router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/update", updateUser)
router.get("/users/:id", getUserByID)
router.get("/users/delete/:id", deleteUser)

export default router