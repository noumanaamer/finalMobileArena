require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// built-in middleware
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// function to activate server
const port = process.env.PORT || 5000 

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => 
            console.log(`Server is listening at port ${port}`)
        ) 
    } catch (error) {
        console.log(error);
    }
}

//calling the function to start server
start();
