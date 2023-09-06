import express from "express";
import * as dotenv from 'dotenv'

dotenv.config();

const router = express.Router()

const token = process.env.HP_TOKEN;
router.post('/dalle', async (req,res)=> {
    const {prompt} = req.body;
    console.log("Prompt is", prompt)
    try {
        
        return res.status(200).json({
            success:true, 
            
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Something went wrong while creating image');
    }   
})

export default router;