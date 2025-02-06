import express from "express";
import { CreateCategory, getAllCategories, getcategoryById, deleteCategory, updateCategory } from "../Controllers/CategoriesController.js";
import { protectmiddleware } from "../Utils/authmiddleware.js";

const categoriesRouter = express.Router();


categoriesRouter.post("/createcategory", CreateCategory);
categoriesRouter.get("/getallcategories", getAllCategories);
categoriesRouter.get("/getcategorybyid/:id", getcategoryById);
categoriesRouter.delete("/deletecategory/:id",protectmiddleware, deleteCategory);
categoriesRouter.put("/updatecategory/:id",protectmiddleware, updateCategory);

export default categoriesRouter;
