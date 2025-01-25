import mongoose from "mongoose";

const Schema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true

    },
    driverName:{
        type:String,
        require:true
    },
    mobileNo:{
        type:String,
        require:true
    },
    vehicleId:{
        type:String,
        require:true
    },
    vehicleType:{
        type:String,
        require:true
    }

})
const allDrivers=mongoose.model('allDrivers',Schema)
export default allDrivers;