
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';



//@desc: to create a new order
//route: POST /api/orders
//access: Private
const addOrderItems = asyncHandler(async(req, res)=>{
    const{
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;
    
    if(orderItems && orderItems.length ===0){
        res.status(400);
        throw new Error('No order Items');
    }else{
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
    
    const createOrder = await order.save();
    res.status(201).json(createOrder);

    }
});


//@desc: Get Logged in user Orders
//route: GET /api/orders/mine
//access: Private
const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});


//@desc: Get order by ID
//route: GET /api/orders/:id
//access: Private
const getOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});


//@desc: Update Order to Paid
//route: PUT /api/orders/:id/pay
//access: Private
const updateOrderToPaid = asyncHandler(async(req, res)=>{
    res.send('update order to paid');
});

//@desc: Update order to delivered
//route: PUT /api/orders/:id/deliver
//access: Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    res.send('updateOrderToDelivered');
});

//@desc: get all orders
//route: GET /api/orders/:id/deliver
//access: Private/Admin
const getOrders = asyncHandler(async(req, res)=>{
    res.send('get orders');
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};