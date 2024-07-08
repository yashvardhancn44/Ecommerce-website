
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';



//@desc: to create a new order
//route: POST /api/orders
//access: Private
const addOrderItems = asyncHandler(async(req, res)=>{
    res.send('add order items');
});


//@desc: Get Logged in user Orders
//route: GET /api/orders/mine
//access: Private
const getMyOrders = asyncHandler(async(req, res)=>{
    res.send('get my orders');
});


//@desc: Get order by ID
//route: GET /api/orders/:id
//access: Private
const getOrderById = asyncHandler(async(req, res)=>{
    res.send('get order by Id');
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