import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const getCoords = (location) => {
  if (location.includes("Чжэцзян")) return { lat: 29.0, lng: 120.0 };
  if (location.includes("Хунань")) return { lat: 29.3, lng: 113.0 };
  if (location.includes("Фуцзянь")) return { lat: 27.7, lng: 118.0 };
  if (location.includes("Юньнань")) return { lat: 25.0, lng: 102.0 };
  return { lat: 0, lng: 0 }; // default
};

const additionalTeas = [
  {
    id: "england",
    name: "Английский чай",
    desc: "Традиционный английский чай с молоком.",
    location: "Англия",
  },
  {
    id: "india",
    name: "Дарджилинг",
    desc: "Дарджилинг – элитный черный чай из Индии, выращиваемый в горах Дарджилинг. Известен своим мускусным вкусом и ароматом, часто называемый 'шампанским среди чаев'.",
    location: "Индия",
  },
  {
    id: "sochi",
    name: "Чай из Сочи-Красной Поляны",
    desc: "Горный чай из Красной Поляны.",
    location: "Сочи-Красная Поляна",
  },
];

const getCoordsAdditional = (location) => {
  if (location === "Англия") return { lat: 52.0, lng: 0.0 };
  if (location === "Индия") return { lat: 27.0, lng: 88.3 }; // Дарджилинг
  if (location === "Сочи-Красная Поляна") return { lat: 43.6, lng: 40.0 };
  return { lat: 0, lng: 0 };
};

export default function WorldMap({ teas }) {
  const allTeas = [...teas, ...additionalTeas];
  return (
    <MapContainer
      center={[30, 110]} // Center on China
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {allTeas.map((tea) => {
        const coords = ["england", "india", "sochi"].includes(tea.id)
          ? getCoordsAdditional(tea.location)
          : getCoords(tea.location);
        return (
          <Marker key={tea.id} position={[coords.lat, coords.lng]}>
            <Popup>
              <strong>{tea.name}</strong>
              <br />
              {tea.desc}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
