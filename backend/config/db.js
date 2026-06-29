/*import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://debojyotigdsc002_db_user:webel123@cluster0.hzhwibx.mongodb.net/Mock_Test_webel")
    .then(() =>{
        console.log("DB CONNECTED");
        console.log(process.env.MONGODB_URI);
    })
}*/

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("DB CONNECTED");
    } catch (err) {
        console.log(err);
    }
};