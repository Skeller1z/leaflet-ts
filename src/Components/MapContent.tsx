// src/components/Map.tsx

import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BaseMap from './Layer/BaseMap';
const MapContent: React.FC = () => {

  return (
    <MapContainer
    center={[13, 100]}
    zoom={6}
    style={{ width: '100%', height: '100vh' }}
  >

    <BaseMap/>
  </MapContainer>
  );
};

export default MapContent;
