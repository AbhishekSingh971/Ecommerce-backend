const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const cors = require('cors')
const path = require('path');

//configure env
dotenv.config()

connectDB();

// rest object
const app = express();

//middelwares
var corsOptions = {
    origin: 'https://ecommerce-frontend-five-omega.vercel.app',
    optionsSuccessStatus: 200,
    AccessControlAllowOrigin: "https://ecommerce-frontend-five-omega.vercel.app"
// some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../build')))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute); 
app.use('/api/v1/product', productRoute); 

//REST api
app.use('*',function(req,res){
    // res.sendFile(path.join(__dirname, '../build/index.html'));
    res.send("hello");
});

// PORT
const PORT = process.env.B_PORT || 5000;

//run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.black);
})