import React, { useState } from 'react';
import { MapPin, Phone, User, DollarSign, Navigation, Clock, Route } from 'lucide-react';
import Map from './map'

const DriverRequestPage = ({pd}) => {
  const [price, setPrice] = useState('');

  const handleAcceptRequest = () => {
    if (!price) {
      alert('Please enter price before accepting');
      return;
    }
    console.log('Request accepted with price:', price);
  };

  const handleRejectRequest = () => {
    console.log('Request rejected');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Request Panel */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 p-4 text-white">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <h1 className="text-xl font-semibold">New Ride Request</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Passenger and Trip Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Passenger Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Passenger</p>
                    <p className="font-medium">{pd.customerData.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">+91 6352759894</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Location Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{pd.travelData.from}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <Navigation className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{pd.travelData.to}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                <Route className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-blue-600">Distance</p>
                  <p className="font-medium text-blue-900"> 20km</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-blue-600">Est. Time</p>
                  <p className="font-medium text-blue-900">15 min</p>
                </div>
              </div>
            </div>

            {/* Price Input */}
            <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <input
                type="number"
                placeholder="Enter your price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-40 px-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleAcceptRequest}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Accept Request
              </button>
              <button 
                onClick={handleRejectRequest}
                className="flex-1 border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg ">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Trip Route</h2>
          </div>
          <div className="map-section">
            <Map from={pd.travelData.from} to={pd.travelData.to}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRequestPage;