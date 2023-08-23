import React, { useState } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';

const FormData = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [jsondata,setData] = useState('');

  function generateUniqueId() {
    return uuid();
}

  const postData = async () => {
    const url = 'https://api-node-dev.mobilityreferencebap.becknprotocol.io/client/v2/search'; // Replace with your actual endpoint URL

    const data = {
      
        "context": {
            "domain": "retail"
        },
        "message": {
            "criteria": {
                "dropLocation": "48.85041854,2.343660901",
                "categoryName": "FoodEnglish",
                "providerId": "./retail.kirana/ind.blr/101@retail-osm-prod.becknprotocol.io.provider"
            }
        }
    
    };
    

    await axios.post(url, data)
      .then(response => {
        console.log(response);
        const jsonData = response;
        axios.post("http://127.0.0.1:3000/qrGenerator",jsonData)
        .then(response=>{
          console.log(response)
          setQrCodeDataURL(response.data.uniqueId)
        })
        .catch(error => {
          setResponseMessage('Error sending data');
          console.error('Error sending data:', error);
        });
      })
      .catch(error => {
        setResponseMessage('Error sending data');
        console.error('Error sending data:', error);
      });


    
  };




  return (
    <div>
      <div>
        <button onClick={postData}>Create QR for my buisness</button>
        <p>{responseMessage}</p>
        {qrCodeDataURL && (
          <div>
              <Link to={`/ui/${qrCodeDataURL}`}>View QR Code Details</Link>
              <QRCode value={`http://localhost:5173/ui/${qrCodeDataURL}`} style={{ marginRight: 50 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormData;