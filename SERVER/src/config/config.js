export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD
import ConnectMongoDBSession from 'connect-mongodb-session';
import fastifySession from '@fastify/session';

const MongoDbStore = ConnectMongoDBSession(fastifySession)

export const sessionStore = new MongoDbStore({
    uri:process.env.MONGO_URI,
    collection:'sessions'
})

sessionStore.on('error',(error) =>{
    console.log('Session store error', error)
})

export const authenticate = async(email,password)=>{
    if(email & password){
        if(email=='Tabrez.hira@gmail.com' && password=='Hamza.447'){
            return Promise.resolve({email: email, password:password})
        }else{
            return null
        }
    }

    // if(email && password){
    //     const user = await Admin.findOne({email});
    //     if(!user){
    //         return null
    //     }
    //     if(user.password===password){
    //         return Promise.resolve({email:email, password:password})
    //     }else{
    //         return null
    //     }
    // }
}