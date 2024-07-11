//the entry point
import path from 'path'; //keeping built in node modules at the top
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const port = process.env.PORT || 5000;


connectDB();

const app = express();

//Body Parser Middleware
    app.use(express.json()); // for json
    app.use(express.urlencoded({extended: true})); // for url data. 
// cookie parser Middleware
    app.use(cookieParser());



app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes)


app.get('/api/config/paypal', (req, res)=>res.send({cliendId:process.env.PAYPAL_CLIENT_ID}));

const __dirname = path.resolve(); //set __dirname to current directory
app.use('/uploads',express.static(path.join(__dirname, '/uploads'))); // to make the folder Static

if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    //any route that is not api will be redirected to index.html
    app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    //using the react dev server if we are not in production.
    app.get('/', (req, res)=>{
        res.send('API is running');
    });
}

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`server running on port ${port}`));