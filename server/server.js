const express = require('express');
const mongoose = require('mongoose');
const dot_env = require('dotenv').config();
const cors = require('cors')
const newsRoute = require('./routes/news')

mongoose.connect(process.env.DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }) );
    app.use(cors())
    
    app.use('/uploads',express.static('./uploads'))
    app.use("/news", newsRoute)


    app.listen(process.env.PORT, () => {
        console.log(`Server Started at port : ${process.env.PORT}`)
    })
});

