import foodModel from "../models/foodModel.js";
import fs from "fs";


//add food item
const addFood = async (req,res) =>{
    let image_filename = `${req.file.filename}`;
    
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try{
        await food.save();
        res.json({success: true, message: "Food Added Successfully"})
    } catch (error){
        console.log(error);
        res.json({success: false, message: "Error"})
    } 
}

//all food list
const listFood = async (req,res) =>{
    try{
        const foods = await foodModel.find();
        res.json({success: true, data: foods})
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

//remove food item
const removeFood = async (req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, async (err)=>{
            if(err){
                console.log(err);
                return
            }
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success: true, message: "Food Removed Successfully"})
        })
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

//update food item
const updateFood = async (req, res) => {
    try {
        console.log("Received Update Request:", req.body);

        const food = await foodModel.findById(req.body.id);
        if (!food) {
            console.log("Food item not found!");
            return res.json({ success: false, message: "Food item not found" });
        }

        let image_filename = food.image; // Keep the old image by default
        if (req.file) {
            image_filename = `${req.file.filename}`;
            console.log("New Image File:", req.file.filename);

            // Delete the old image only if a new one is uploaded
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) {
                    console.log("Error deleting old image:", err);
                } else {
                    console.log("Old image deleted successfully");
                }
            });
        }

        // Update food details
        food.name = req.body.name;
        food.description = req.body.description;
        food.price = req.body.price;
        food.category = req.body.category;
        food.image = image_filename;

        await food.save();
        console.log("Food updated successfully!");
        res.json({ success: true, message: "Food Updated Successfully" });

    } catch (error) {
        console.log("Error updating food:", error);
        res.json({ success: false, message: "Error updating food item" });
    }
};


export {addFood,listFood,removeFood,updateFood}