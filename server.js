import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import QRCode from "qrcode"; // Import QR code library
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(bodyParser.json());

function generateUniqueId() {
    return uuidv4();
}

// MongoDB setup and schema definition

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://0.0.0.0:27017/beckn-admin').then(()=>{
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

// Function to generate QR code and return data URL
async function generateQRCode(data) {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(data);
        return qrCodeDataURL;
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }
}

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

    // Generate QR code with the unique identifier
    const qrCodeDataURL = await generateQRCode(uniqueId);

    res.send({ success: true, qrCodeDataURL });
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

