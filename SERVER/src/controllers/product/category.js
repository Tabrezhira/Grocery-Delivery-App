import { Category } from '../../models/index.js'

export const getAllCategories = async(req, reply) => {
    try {
        const CategoryData = await Category.find();
        return reply.send(CategoryData)
    } catch (error) {
        return reply.status(500).send({message:"An error occurred", error})
    }
}