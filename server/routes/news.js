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
    let hops = req.body.page_size * (req.body.page_num - 1);

    try{
        const totalEntries = await News.estimatedDocumentCount();
        const news = await News.find().skip(hops).limit(req.body.page_size)

        res.send({
            statusCode:200,
            totalEntries:totalEntries,
            current_page:req.body.page_num,
            page_size:req.body.page_size,
            data:news,
        });
    } catch(error){
        res.status(404).send({
            statusCode:404,
            message:error
        });
    }
    
})

router.post("/",uploads.single('newsImage'), async (req, res, next) => {
    try{
        let newsData = {
            title:req.body.title,
            description:req.body.description,
            image:req.file.path
        }
    
        const result = await News.create(newsData);
        if(!result)
            throw 'No Records Added';
        
        res.status(200).send({
            statusCode:200,
            data:result
        });
    } catch (error) {
        res.status(404).send({
            statusCode:404,
            message: 'Error Occured'
        })
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const result = await News.deleteOne({_id : req.params.id});
        console.log(result);
        if(!result.ok || !result.deletedCount)
            throw 'No entries Found';

        res.status(200).send({
            statusCode:200,
            message:"Successful deletion"
        });
       
    } catch (error){
        res.status(404).send({
            statusCode:404,
            message: 'Error Occured | ' + error
        })
    }
  
  
})

module.exports = router
