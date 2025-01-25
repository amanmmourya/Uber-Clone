import React from 'react'
import './css_file/loadingscreen.css'
import { Car, MapPin, Search } from 'lucide-react';

const DriverLoading = () => {
    return (
        <div className="loading-container">
          <div className="loading-content">
            <div className="icon-container">
              <div className="scanning-circle"></div>
              <Car className="car-icon" size={48} />
              <MapPin className="map-icon" size={32} />
              <Search className="search-icon" size={32} />
            </div>
            
            <div className="pulse-container">
              <div className="pulse"></div>
              <div className="pulse delay-1"></div>
              <div className="pulse delay-2"></div>
            </div>
    
            <div className="loading-text">
              <h2>Finding Nearby Drivers</h2>
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      );
}

export default DriverLoading