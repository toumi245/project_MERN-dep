import express from 'express'

import products from './data/products.js'
import dotenv from 'dotenv'
import colors from 'colors' 
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import pcProductsRoutes from './routes/pcProductsRoutes.js'
import cors from 'cors'
import path from 'path'

import connectDB from './config/db.js'
import { Error } from 'mongoose'
import pcProducts from './data/pcproducts.js'
dotenv.config()
connectDB()
const app=express()
app.use(express.json())
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/toumi',pcProductsRoutes)
app.get(`api/config/paypal`,(req,res)=>
    res.send(process.env.PAYPAL_CLIENT_ID)
)
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('FronEnd/build'));

    app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'FronEnd', 'build','index.html')));
  }
app.use(notFound)
app.use(errorHandler)
app.use((req,res,next)=>{
    const error=new Error(`NOT Found -${req.originalUrl}`)
    res.status(404)
    next(error)
})
app.use((err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json(err.message)
})
// if (process.env.NODE_ENV === 'production') {
//     //*Set static folder up in production
//     app.use(express.static('FronEnd/build'));

//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'FronEnd', 'build','index.html')));
//   }
// app.use(cors({
//     origin:["http://localhost:3000",'https://client-xak7.onrender.com']
// }
// ))
const PORT=process.env.PORT ||5001
app.listen(PORT,console.log(`server is running in ${PORT}`.yellow.bold))
