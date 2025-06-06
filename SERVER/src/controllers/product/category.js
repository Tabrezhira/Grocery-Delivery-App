import Category, { Category } from '../../models/index.js'

export const getAllCategories = async(req, reply) => {
    try {
        const Category = await Category.find();
        return reply.send(Category)
    } catch (error) {
        return reply.status(500).send({message:"An error occurred", error})
    }
}