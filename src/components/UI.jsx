import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CatalogDisplay = ({ data }) => {
  return (
    <div>
      <h1>Fetched Data Display</h1>
      {data ? (
        <div>
          {data.message.catalogs.map((catalog, index) => (
            <div key={index}>
              <h2>Catalog {index + 1}</h2>
              <h3>Catalog Context</h3>
              <pre>{JSON.stringify(catalog.context, null, 2)}</pre>
              <h3>Providers</h3>
              {catalog.message.catalog['bpp/providers'].map((provider, providerIndex) => (
                <div key={providerIndex}>
                  <h4>Provider {providerIndex + 1}</h4>
                  <p>Provider Name: {provider.descriptor.name}</p>
                  <h5>Items</h5>
                  {provider.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h6>Item {itemIndex + 1}</h6>
                      <p>Item Name: {item.descriptor.name}</p>
                      <p>Item Price: {item.price.listed_value} {item.price.currency}</p>
                      <p>Item Description: {item.descriptor.short_desc}</p>
                      <img src={item.descriptor.images[0]} alt={`Item ${itemIndex + 1}`} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

const UI = () => {
  const { qrCodeDataURL } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(qrCodeDataURL);
        const response = await axios.get(`http://127.0.0.1:3000/getData/${qrCodeDataURL}`);
        setData(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [qrCodeDataURL]);

  return <CatalogDisplay data={data} />;
};

export default UI;
