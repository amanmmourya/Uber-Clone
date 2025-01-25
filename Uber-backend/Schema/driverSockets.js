import mongoose from "mongoose";

const Schema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    socketId:{
        type:String,
        require:true
    }

})
const driverSockets=mongoose.model('driverSockets',Schema)
export default driverSockets;