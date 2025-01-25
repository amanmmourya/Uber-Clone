import mongoose from "mongoose";

const Schema=mongoose.Schema({
    vehicleId:{
        type:String,
        require:true
    },
    vehicleType:{
        type:String,
        require:true

    },
    driverName:{
        type:String,
        require:true
    },
    mobileNo:{
        type:String,
    },
    isActive:{
        type:Boolean,
        require:true
    }

})
const allVehicles=mongoose.model('allVehicles',Schema)
export default allVehicles;