const express = require('express');
const mongoose = require('mongoose');
const dot_env = require('dotenv').config();
const newsRoute = require('./routes/news')

mongoose.connect(process.env.DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }) );
    app.use('/uploads',express.static('./uploads'))
    app.use("/news", newsRoute)


    app.listen(process.env.PORT, () => {
        console.log(`Server Started at port : ${process.env.PORT}`)
    })
});

