const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const QRCode = require('qrcode')
const uuid = require('uuid');

const app = express();
const cors = require('cors');
app.use(cors(
    {
        origin:["https://beckn-qr.vercel.app/","http://127.0.0.1:5173/",],
        methods: ["POST","GET"],
        credentials:true
    }
))

app.use(bodyParser.json());

function generateUniqueId() {
    return uuid.v4();
}

// MongoDB setup and schema definition

mongoose.set('strictQuery',false);

mongoose.connect('mongodb+srv://roshangeorge2003:Kolo100%40200@cluster1.yejrjjy.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    app.listen(3000,()=>{
        console.log("Server is listening on 3000");
    })
    console.log("Connected!")
}).catch((error)=>{
    console.log(error);
})

const dataSchema = new mongoose.Schema({
    uniqueId: String, // Unique identifier for each data entry
    jsonData: Object // The actual JSON data
});

const DataModel = mongoose.model('Data', dataSchema);

// Admin posts JSON data to generate QR code
app.post('/qrGenerator', async (req, res) => {
    const jsonData = req.body;

    // Save the data in the database and generate a unique identifier
    const uniqueId = generateUniqueId(); // Implement your own unique ID generation
    const dataEntry = new DataModel({
        uniqueId,
        jsonData
    });

    await dataEntry.save();


    res.send({ success: true, uniqueId });
});

// User scans QR code to retrieve and display data
app.get('/getData/:id', async (req, res) => {
    const uniqueId = req.params.id;

    // Retrieve data from the database based on the unique identifier
    const dataEntry = await DataModel.findOne({ uniqueId });

    if (dataEntry) {
        res.json(dataEntry.jsonData); // Send the JSON data as the response
    } else {
        res.status(404).send("Data not found.");
    }
});
