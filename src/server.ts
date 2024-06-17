import express, {json} from 'express'
import productRouter from './routes/productRoutes'
import categoriesRouter from './routes/categoriesRoutes'
import authRouter from './routes/authRoutes'

const app = express()   //  initialize the application

app.use(json())          //add a body to the requests

// add all the middlewares and urls
app.use("/products",productRouter)
app.use("/categories", categoriesRouter)
app.use("/users", authRouter)


// start the application
app.listen(4000,()=>{
    console.log('Server Running..')
})
