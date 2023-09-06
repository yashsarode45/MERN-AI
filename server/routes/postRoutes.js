import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    //!    ########   Configuring the Cloudinary to Upload MEDIA ########
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

router.get("/post", async (req, res) => {
    try {
      const posts = await Post.find();
       res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });

router.post("/post", async (req,res)=> {
    try {
        const {name, prompt, model} = req.body
        console.log("name, prompt, model", name, prompt, model)
        const photo = req.files.photoFile;
        console.log(photo)
        const photoURL = await cloudinary.uploader.upload(photo.tempFilePath,{folder:process.env.FOLDER_NAME,resource_type : "auto" })
        console.log("Cloudinary upload done")
        const newPost = await Post.create({
            name,
            prompt,
            model,
            photo:photoURL.url
        }) 

        return res.status(200).json({ success: true, data: newPost });

    } catch (error) {
        console.log("Error in /post", error)
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
})
export default router;