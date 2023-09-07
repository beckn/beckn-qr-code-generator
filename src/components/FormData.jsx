import React, { useState } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import { useEffect } from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-100 p-4 h-full">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <div className='m-4'><img src="public\beckn-logo.png" alt="Logo"/></div>
        <div><img src="public\QR Code.gif" alt="Logo"/></div>
      </div>
    </nav>
  );
};

const FormData = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [jsondata, setData] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [searchString, setSearchString] = useState('');
  const [providerId, setProviderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  

  function generateUniqueId() {
    return uuid();
  }

  const postData = async () => {
    setIsLoading(true);
    setLoadingMessage('Loading...');
    const url = 'https://api-node-dev.mobilityreferencebap.becknprotocol.io/client/v2/search'; // Replace with your actual endpoint URL

    const data = {
      "context": {
        "domain": "retail"
      },
      "message": {
        "criteria": {
          "dropLocation": "48.85041854,2.343660901",
          "categoryName": "FoodEnglish",
          "providerId": providerId,
        }
      }
    };

    await axios.post(url, data)
      .then(response => {
        console.log(response);
        const jsonData = response;
        axios.post("http://localhost:3000/qrGenerator", jsonData)
          .then(response => {
            console.log(response)
            setQrCodeDataURL(response.data.uniqueId)
            setIsLoading(false); // Set loading state to false when done

          })
          .catch(error => {
            setResponseMessage('Error sending data');
            console.error('Error sending data:', error);
            setIsLoading(false); // Set loading state to false when done

          });
      })
      .catch(error => {
        setResponseMessage('Error sending data');
        console.error('Error sending data:', error);
      });
  };

  const postSearchData = async () => {
    setIsLoading(true);
    setLoadingMessage('Loading...');

    const url = 'https://api-node-dev.mobilityreferencebap.becknprotocol.io/client/v2/search'; // Replace with your actual endpoint URL

    const data = {
      "context": {
        "domain": "retail"
      },
      "message": {
        "criteria": {
          "dropLocation": "48.85041854,2.343660901",
          "categoryName": categoryName,
          "providerId": providerId,
          "searchString": searchString,
        }
      }
    };

    await axios.post(url, data)
      .then(response => {
        console.log(response);
        const jsonData = response;
        axios.post("http://localhost:3000/qrGenerator", jsonData)
          .then(response => {
            console.log(response)
            setQrCodeDataURL(response.data.uniqueId)
            setIsLoading(false); // Set loading state to false when done

          })
          .catch(error => {
            setResponseMessage('Error sending data');
            console.error('Error sending data:', error);
            setIsLoading(false); // Set loading state to false when done

          });
      })
      .catch(error => {
        setResponseMessage('Error sending data');
        console.error('Error sending data:', error);
      });
  };
  const messages = ['Did you know? Beckn can enable over 120,000 different types of commerce transactions', 'Creating QR code...', 'Almost there...', 'Just a moment...'];

  useEffect(() => {
    if (isLoading) {
      let index = 0;
      const interval = setInterval(() => {
        setLoadingMessage(messages[index]);
        index = (index + 1) % messages.length;
      }, 7000); // 10000 milliseconds = 10 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="flex">
      <div className="w-2/4">
        <Navbar />
      </div>
      <div className="w-2/4 p-4 bg-blue-100 flex justify-center items-center">
  <div className="bg-blue-100 rounded-lg">
          <div className="flex justify-between">
            <div>
            <label className="block mb-2">
                Provider ID:
                <input
                  type="text"
                  value={providerId}
                  onChange={(e) => setProviderId(e.target.value)}
                  className="border rounded py-2 px-3 w-full"
                />
              </label>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={postData}>
              Create QR of my entire Catalogue
            </button>
            </div>
         

            <div className="w-2/3 ml-4">
              <label className="block mb-2">
                Category Name:
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="border rounded py-2 px-3 w-full"
                />
              </label>

              <label className="block mb-2">
                Search String:
                <input
                  type="text"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  className="border rounded py-2 px-3 w-full"
                />
              </label>

              <label className="block mb-2">
                Provider ID:
                <input
                  type="text"
                  value={providerId}
                  onChange={(e) => setProviderId(e.target.value)}
                  className="border rounded py-2 px-3 w-full"
                />
              </label>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={postSearchData}>
                Create QR for a particular service
              </button>

              <p className="text-red-500 mt-2">{responseMessage}</p>
            </div>
          </div>
          {isLoading && <LoadingOverlay message={loadingMessage} />}
<div >
{qrCodeDataURL && !isLoading && (
  <div className="flex flex-col items-center mt-4">
    <QRCode value={`http://localhost:5173/ui/${qrCodeDataURL}`} />
    <div className="mt-2">
      <Link
        to={`/ui/${qrCodeDataURL}`}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
      >
        View QR Code Details
      </Link>
    </div>
    <div className="mt-2">
      <a
        href={`http://localhost:5173/ui/${qrCodeDataURL}`}
        download={`QR_Code_${qrCodeDataURL}.png`}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
      >
        Download QR Code
      </a>
    </div>
  </div>
)}


</div>
        </div>
      </div>
    </div>
  );
};

export default FormData;
