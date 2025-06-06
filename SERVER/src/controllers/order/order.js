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
        
    } catch (error) {
        console.log(err);
        return reply.status(500).send({message:'Failed to create order', error})
    }
}