import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import allVehicles from './Schema/allVehicles.js'
import allDrivers  from './Schema/allDrivers.js'
import driverSockets from './Schema/driverSockets.js'
import dotenv from 'dotenv'
dotenv.config()
await mongoose.connect('mongodb://127.0.0.1:27017/uberDatabase',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const app =express()
const port =3000
// Using Langflow for agentic operations 

class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body) {
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.applicationToken}`
                },
                body: JSON.stringify(body)
            });

            const jsonResponse = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(jsonResponse)}`);
            }
            return jsonResponse;
        } catch (error) {
            console.error('API Request Error:', error.message);
            throw error;
        }
    }

    async runFlow(flowId, langflowId, inputValue) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`;
        return this.post(endpoint, { input_value: inputValue, input_type: 'chat', output_type: 'chat' });
    }
}
// langflow agent

async function callAgent(inputValue) {
    const flowId = 'uber_project'; // Replace with your actual flow ID or name
    const langflowId = '3e740dbf-e02f-4a3f-a60d-aba398f21b08'; // Replace with your actual LangFlow ID
    const applicationToken = process.env.applicationToken
    
    const client = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
        const response = await client.runFlow(flowId, langflowId, inputValue);
        if (response && response.outputs) {
            const output = response.outputs[0].outputs[0].outputs.message.message.text;
            console.log("From langflow",output);
            return output;
            
        } else {
            console.log("No valid response received from API.");
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
// Using langflow for distance and time fetch
async function callAgentForDistance(inputValue) {
    const flowId = 'uber_distance'; // Replace with your actual flow ID or name
    const langflowId = '3e740dbf-e02f-4a3f-a60d-aba398f21b08'; // Replace with your actual LangFlow ID
    const applicationToken = process.env.applicationToken
    
    const client = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
        const response = await client.runFlow(flowId, langflowId, inputValue);
        if (response && response.outputs) {
            const output = response.outputs[0].outputs[0].outputs.message.message.text;
            return output;
            
        } else {
            console.log("No valid response received from API.");
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}











// Connecting socket server
import { Server } from 'socket.io'
const io =new Server(8000,{
    cors:{
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
    }
})
    let pendingRequests=[]
// All socket connections handled here
io.on('connection',(socket)=>{
    socket.on('registerSocket',async (username)=>{
        const newSocketData={
            username:username,
            socketId:socket.id
        }
        console.log("from socket server",username,socket.id)
        const newSocket= new driverSockets(newSocketData)
        await newSocket.save()
    })
    socket.on('disconnect',async (reason)=>{
        await driverSockets.deleteMany({socketId:socket.id})
    })
    socket.on('acceptTheRide',async (driverUsername,passangerData,price)=>{
        const someVehicle=await allDrivers.findOne({username:driverUsername})
        const dataToPush={
            sid:socket.id,
            data:someVehicle,
            dun:driverUsername,
            pun:passangerData.customerData.username,
            price:price
        }
        pendingRequests.push(dataToPush)
    })
})


app.use(express.json())
app.use(cors())
app.use(express.text())

app.post('/agent',async (req,res)=>{
    console.log(req.body)
    const data=await callAgent(req.body)
    console.log(data)
    res.type('text/plain')
    res.send(data)
})

app.post('/signin',(req,res)=>{
    console.log(req.body)
    res.status(200).json({success:true,data:{'info1':'this is info','info2':'this is info2'}})
})
app.post('/driver-signin',async (req,res)=>{
    console.log(req.body)
    // here we will validate the driver
    const isRegistered=await allDrivers.exists({username:req.body.username,password:req.body.password})
    
    if(isRegistered){   
    // Here we have made the driver active status true
    const driver=await allDrivers.findOne({username:req.body.username})
    const vehicleId=driver.vehicleId
    await allVehicles.updateOne({vehicleId:vehicleId},{$set:{isActive:true}})
    res.status(200).json({success:true,message:"You are now logged in"})
    console.log("This is correct and you are now logged in")
    }else{
        res.status(400).json({success:false,message:"You are now logged in"})
        console.log("This is incorrect")
    }
    
})
app.post('/signup-driver',async (req,res)=>{
    // save the driver in the driver database
    const data={
        username:req.body.username,
        password:req.body.password,
        driverName:req.body.driverName,
        mobileNo:req.body.mobileNo,
        vehicleId:req.body.vehicleId,
        vehicleType:req.body.vehicleType
    }
    const newdriver=new allDrivers(data)
    console.log(req.body)
    await newdriver.save()

    // also save the user in vehicle database with a active status false
    const vehicleData={
        vehicleId:req.body.vehicleId,
        vehicleType:req.body.vehicleType,
        driverName:req.body.driverName,
        mobileNo:req.body.mobileNo,
        isActive:true
    }
    const newvehicle= new allVehicles(vehicleData)
    await newvehicle.save()
    res.status(400).json({success:true,data:{'info1':'this is info','info2':'this is info2'}})
})
app.post('/find-ride',async (req,res)=>{
    // fetching distance and time
    const fromLocation=req.body.travelData.from
    const toLocation=req.body.travelData.to
    const distance=await callAgent(`give only distance between ${fromLocation} and ${toLocation} and do not write anything extra`)
    const estTime=await callAgent(`give only estimated time between ${fromLocation} and ${toLocation} and do not write anything extra`)

    const allActiveDrivers=await driverSockets.find()
    allActiveDrivers.forEach(async (item)=>{
        const aDriver=await allDrivers.findOne({username:item.username})
        console.log(aDriver)
        if(aDriver.vehicleType==req.body.vehicleDemanded){
            io.to(item.socketId).emit('passangerRequest',req.body,distance,estTime)
        }
    })

    let intervalId=setInterval(function() {
        const pendingData=pendingRequests.find((data)=>{
            console.log(data.pun,req.body.customerData.username)
            return data.pun==req.body.customerData.username
        })
        
        console.log(pendingData)
        if(pendingData){
            res.status(200).json(pendingData)
            pendingRequests=pendingRequests.filter((item)=>{
                return item.pun!=req.body.customerData.username
            })
            clearInterval(intervalId);
        }
    }, 2000); 
   
    setTimeout(()=>{
        clearInterval(intervalId);
        res.status(200).json({notfound:true})
    },60000)
   

})
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`)
})