import 'dotenv/config'
import { connectDb } from './src/config/connect.js'
import fastify from 'fastify'
import { PORT } from './src/config/config.js'

const start = async()=>{
    await connectDb(process.env.MONGO_URL)
    const app = fastify()

    app.listen({port:PORT,host:'0.0.0.0'},(err,addr) => {
        if(err){
            console.log(err)
        }else{
            console.log(`Grocery App is running on http://localhost:${PORT}`)
        }
    })
}

start()