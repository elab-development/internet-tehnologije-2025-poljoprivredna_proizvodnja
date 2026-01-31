import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "80%",
  height: "600px"
};

const center = {
  lat: 44.8176,
  lng: 20.4569
};

const FarmMap = ({ locations, apiKey }) => (
  <LoadScript googleMapsApiKey={apiKey}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {locations.map(loc => (
        <Marker
          key={loc.id}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
        />
      ))}
    </GoogleMap>
  </LoadScript>
);

export default FarmMap;
