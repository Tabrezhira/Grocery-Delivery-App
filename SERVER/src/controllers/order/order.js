import {Order, Branch, Customer,DeliveryPartner} from'./../../models/index'

export const createOrder = async(req,reply) => {
    try {
        const {userId} = req.user;
        const {items, branch, totalPrice} = req.body

        const customerData = await Customer.findById(userId)
        const branchData = await Branch.findById(branch)

        if(!customerData){
            return reply.status(404).send({message:'Customer not Found'});
        }

        const newOrder = new Order({
            customer:userId,
            items:items.map((item) => ({
                id:item.id,
                item:item.item,
                count:item.count
            })),
            branch,
            totalPrice,
            deliveryLocation:{
                latitude: customerData.liveLocation.latitude,
                longitude:customerData.liveLocation.longitude,
                address:customerData.address || 'No address available'
            },
            pickupLocation:{
                latitude: branchData.location.latitude,
                longitude:branchData.location.longitude,
                address:branchData.address || 'No address available'
            }
        })
        const saveOrder = await newOrder.save()
        return reply.status(201).send(saveOrder)
    } catch (error) {
        console.log(error);
        return reply.status(500).send({message:'Failed to create order', error})
    }
}

export const confirmOrder = async(req, reply) => {
    try {
        const {orderId} = req.params;
        const {userId} = req.user;
        const {deliveryPersonLocation} = req.body;

        const deliveryPerson = await DeliveryPartner.findById(userId);
        if(!deliveryPerson){
            return reply.status(404).send({message:'Delivery Person not found'})
        }
        const order = await Order.findById(orderId);
        if(!order) return reply.status(404).send({message:'Order not found'})
        
        if (order.status !== 'available'){
            return reply.status(400).send({message:'Order is not available'})
        }

        order.status = 'confirmed';

        order.deliveryPartner = userId;
        order.deliveryPersonLocation = {
            latitude: deliveryPersonLocation?.latitude,
            longitude:deliveryPersonLocation?.longitude,
            address: deliveryPersonLocation.address || '',
        };

        req.server.io.to(orderId).emit('orderConfirmed', order)
        await order.save()

        return reply.send(order)
    } catch (error) {
        console.log(error);
        return reply.status(500).send({message:'Failed to confirmOrder', error})
    }
}

export const updateOrderStatus = async(req, reply) => {

}