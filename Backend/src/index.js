require('dotenv').config();
const connectDB = require('./db/db');
const app = require('./app');

connectDB()
.then(()=>{
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=>{
        console.log(`Server is Runnig at PORT : ${PORT}`);
    })
})
.catch((error)=>{
    console.log('Mongodb connection error ', error);
})

