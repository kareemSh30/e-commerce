import express from "express";
import dotenv from "dotenv";
import connectDB from "./Connections/MongoDBConnect.js";
import usersrouter from "./Routes/usersRoute.js";
import categoriesrouter from "./Routes/CategoriesRoute.js";

dotenv.config();

const PORT = process.env.PORT || 6000;

const app = express();
app.use(express.json());

// Correctly mount the route
app.use("/api/shop", usersrouter);
app.use("/api/categories", categoriesrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
