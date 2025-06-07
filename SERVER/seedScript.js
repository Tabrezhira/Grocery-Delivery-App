import 'dotenv/config.js';
import mongoose from 'mongoose';
import {Category,Product} from './src/models/index.js'
import {categories,products} from './seedData.js'


async function seedData() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        await Product.deleteMany({});
        await Category.deleteMany({});

        const categoryDocs = await Category.insertMany(categories);
        const categoryMap = categoryDocs.reduce((map,Category) =>{
            map[Category.name] = Category._id;
            return map
        },{})

        const productWithCategoryIds = products.map((product) =>({
            ...product,
            category: categoryMap[product.category]
        }))

        await Product.insertMany(productWithCategoryIds)
        console.log('Database Seeded Successfully')
    } catch (error) {
        console.error('Error Seeding database', error)
    }finally{
        mongoose.connection.close()
    }
}

seedData()