import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CatalogDisplay = ({ data }) => {
  return (
    <div className="p-4 bg-blue-100">
      <h1 className="text-3xl font-semibold mb-6">Fetched Data Display</h1>
      {data ? (
        <div>
          {data.message.catalogs.map((catalog, index) => (
            <div key={index} className="mb-8 bg-white p-4 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Catalog {index + 1}</h2>
              {catalog.message?.catalog ? (
                <div>
                  {/* ... (other catalog-related code) */}
                  <h3 className="text-xl font-medium mt-4">Providers</h3>
                  {catalog.message.catalog['bpp/providers'] ? (
                    <div>
                      {catalog.message.catalog['bpp/providers'].map((provider, providerIndex) => (
                        <div key={providerIndex} className="mb-6 p-4 bg-gray-100 rounded-lg">
                          {provider.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex mb-6 bg-white p-4 rounded-lg shadow">
                              <div className="w-1/4">
                                <img
                                  src={item.descriptor.images[0]}
                                  alt={`Item ${itemIndex + 1}`}
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="w-3/4 pl-4">
                                <h6 className="text-lg font-semibold mb-2">{item.descriptor.name}</h6>
                                <p className="mb-1">
                                  Price: {item.price.listed_value} {item.price.currency}
                                </p>
                                <p className="mb-4">{item.descriptor.short_desc}</p>
                                <div className="flex space-x-2 text-sm font-medium justify-start">
                                  <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600">
                                    <span>Add Cart</span>
                                  </button>
                                  <button className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No providers available for this catalog.</p>
                  )}
                </div>
              ) : (
                <p>No catalog data available.</p>
              )}
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
        const response = await axios.get(`https://beckn-qr-141g.vercel.app/getData/${qrCodeDataURL}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [qrCodeDataURL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <CatalogDisplay data={data} />
    </div>
  );
};

export default UI;
