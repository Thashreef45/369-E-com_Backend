//Razor pay


import Razorpay from "razorpay";


const razorpayInstance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});


 // Use USD as the currency
 const currency = 'USD';
 const amount = 50
 const orderCreated = {
    _id : 'dummy order id(mongo._id)'
 }

 // Create Razorpay order
 const razorpayOrder = await razorpayInstance.orders.create({
     amount, // amount in cents
     currency,
     receipt: String(orderCreated._id),
 });


const createOrder = () => {
    
}