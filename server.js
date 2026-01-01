const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
// Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    console.log(req.headers)
    res.send('Hello World!');
});






app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running...');
});