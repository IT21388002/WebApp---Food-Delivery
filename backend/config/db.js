import mongoose from 'mongoose';

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://pawarahasamal22:eDWDLBzChFyAT6Ub@cluster1.nlban.mongodb.net/fooddel')
        .then(() => console.log("DB Connected"))
}
