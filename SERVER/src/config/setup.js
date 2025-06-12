import AdminJS from 'adminjs'
import AdminJSFastify from '@adminjs/fastify'
import * as AdminJSMongoose from '@adminjs/mongoose'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import * as Models from '../models/index.js' // Your Mongoose models
import { authenticate, COOKIE_PASSWORD } from './config.js'
import { dark, light, noSidebar } from '@adminjs/themes'