import React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

export default function MapComponent({ searchResult }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the search results into an object {lang: ...., lat: ...}
  const coordinates = searchResult?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // longitude: center.longitude,
    // latitude: center.latitude,
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 8,
  });

  return (
    <ReactMapGL
      mapboxAccessToken="pk.eyJ1IjoidGhhbWVyZ291aWRlciIsImEiOiJjbG5tejcxNjgwMTZ2MnFvZHUzN3IzYWt3In0.82qL38WJJSs1C-Uj4nsGYg"
      mapStyle="mapbox://styles/thamergouider/clnmz1u1j007l01p9dzfhc0sz"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      // {...viewport}
    >
      {searchResult?.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/* The Popup showed when i click the marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
