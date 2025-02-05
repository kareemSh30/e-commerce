import express from "express";
import { CreateCategory } from "../Controllers/CategoriesController.js";

const categoriesRouter = express.Router();


categoriesRouter.post("/createcategory", CreateCategory);

export default categoriesRouter;
