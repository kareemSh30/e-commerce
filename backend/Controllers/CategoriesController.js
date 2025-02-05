import Category from "../Models/category.js";

export const CreateCategory = async (req, res) => {
    try {
        const { name, icon, color } = req.body;

        // Create and directly save the category
        const category = await Category.create({ name, icon, color });

        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
