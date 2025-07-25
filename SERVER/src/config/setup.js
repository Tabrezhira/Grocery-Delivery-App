import AdminJS from 'adminjs'
import AdminJSFastify from '@adminjs/fastify'
import * as AdminJSMongoose from '@adminjs/mongoose'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import * as Models from '../models/index.js' // Your Mongoose models
import { authenticate, COOKIE_PASSWORD, sessionStore } from './config.js'
import { dark, light, noSidebar } from '@adminjs/themes'


// AdminJS.registerAdapter(MongooseAdapter)
AdminJS.registerAdapter(AdminJSMongoose);


export const admin = new AdminJS({
    resources:[
        {
            resource:Models.Customer,
            Option:{
                listProperties:["phone",'role','isActivated'],
                filterProperties:['phone','role']
            },

        },{

            resource:Models.DeliveryPartner,
            Option:{
                listProperties:["email","role","isActivated"],
                filterProperties:["email","role"],
            },
        },
        {
            resource:Models.Admin,
            Option:{
                listProperties:["email","role","isActivated"],
                filterProperties:["email","role"],
            }

        },
        {resource:Models.Branch},
        {resource:Models.Product},
        {resource:Models.Category},
        {resource:Models.Order},
        {resource:Models.Counter},
    ],
    branding:{
        companyName:'Grocery Delivery App',
        withMadeWithLove:false,
    },
    defaultTheme:dark.id,
    availableThemes:[dark,light,noSidebar],
    rootPath:'/admin'
})

export const buildAdminRouter = async(app) => {
    await AdminJSFastify.buildAuthenticatedRouter(
        admin,{
            authenticate,
            cookiePassword:COOKIE_PASSWORD,
            cookieName:'adminJs'
        },
        app,
        {
            store:sessionStore,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie:{
                httpOnly:process.env.NODE_ENV === 'production',
                secure:process.env.NODE_ENV === 'production',
            }
        }
    )
}