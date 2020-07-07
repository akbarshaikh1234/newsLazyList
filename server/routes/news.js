const express = require("express")
const News = require("../models/news")
const multer = require('multer');
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }) );

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,new Date().toISOString() + file.originalname)
  }
});

const uploads = multer({storage:storage})

router.post("/articles", async (req, res, next) => {
    console.log(req.body)
    
    let skips = req.body.page_size * (req.body.page_num - 1);

    try{
        const totalEntries = await News.find().count();
        const news = await News.find().skip(skips).limit(req.body.page_size)

        res.send({
            statusCode:200,
            totalEntries:totalEntries,
            data:news
        });
    } catch(error){
        res.status(404).send({
            statusCode:404,
            message:error
        });
    }
   
    // .then(data => {
        
    // }).catch(err => {
    //     res.status(404).json({
    //         statusCode:404,
    //         message:err
    //     });
    // });
    
})

router.post("/",uploads.single('newsImage'), async (req, res, next) => {

    let newsData = {
        title:req.body.title,
        description:req.body.description,
        image:req.file.path
    }

    News.create(newsData)
    .then( doc => {
        res.status(200).send({
            statusCode:200,
            data:doc
        });
    }).catch( err => {
        res.status(404).send({
            statusCode:404,
            message: 'Error Occured'
        })
    })
})

router.delete("/:id", async (req, res) => {
  console.log(req.params)
})

module.exports = router
