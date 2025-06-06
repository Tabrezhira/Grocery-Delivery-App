import { authRoutes } from "./auth";
import { orderRoutes } from "./orders";
import { categoryRoutes, productRoutes } from "./products";

const prefix = '/api';

export const registerRoutes = async (fastify) => {
    fastify.register(authRoutes,{prefix:prefix});
    fastify.register(productRoutes,{prefix:prefix});
    fastify.register(categoryRoutes,{prefix:prefix});
    fastify.register(orderRoutes,{prefix:prefix});
}