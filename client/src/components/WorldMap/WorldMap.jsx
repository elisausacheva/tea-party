import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router";
import { Button } from "react-bootstrap";
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

const getCoordinates = (location) => {
  if (!location) return { lat: 30, lng: 110 }; // Дефолт (центр Азии)
  const loc = location.toLowerCase();

  // --- КИТАЙ (Провинции) ---
  if (loc.includes("юньнань") || loc.includes("пуэр"))
    return { lat: 24.5, lng: 101.5 };
  if (
    loc.includes("фуцзянь") ||
    loc.includes("улун") ||
    loc.includes("да хун пао")
  )
    return { lat: 26.1, lng: 118.3 };
  if (loc.includes("чжэцзян") || loc.includes("лунцзин"))
    return { lat: 30.2, lng: 120.1 };
  if (loc.includes("аньхой")) return { lat: 31.8, lng: 117.2 };
  if (loc.includes("сычуань")) return { lat: 30.6, lng: 104.0 };
  if (loc.includes("гуандун")) return { lat: 23.1, lng: 113.2 };

  // --- ТАЙВАНЬ ---
  if (
    loc.includes("тайвань") ||
    loc.includes("алишань") ||
    loc.includes("нантоу")
  )
    return { lat: 23.8, lng: 120.9 };

  // --- ИНДИЯ ---
  if (loc.includes("дарджилинг")) return { lat: 27.0, lng: 88.2 };
  if (loc.includes("ассам")) return { lat: 26.5, lng: 93.0 };
  if (loc.includes("нилгири")) return { lat: 11.4, lng: 76.7 };
  if (loc.includes("индия")) return { lat: 20.5, lng: 78.9 };

  // --- ЯПОНИЯ ---
  if (loc.includes("удзи") || loc.includes("киото"))
    return { lat: 34.9, lng: 135.8 };
  if (loc.includes("сидзуока")) return { lat: 35.0, lng: 138.4 };
  if (loc.includes("япония")) return { lat: 36.2, lng: 138.2 };

  // --- ШРИ-ЛАНКА ---
  if (loc.includes("цейлон") || loc.includes("шри-ланка"))
    return { lat: 6.9, lng: 80.7 };

  // --- АФРИКА ---
  if (loc.includes("кения") || loc.includes("африка")) return { lat: -0.4, lng: 35.3 };

  // --- РОССИЯ И СНГ ---
  if (
    loc.includes("сочи") ||
    loc.includes("краснодар") ||
    loc.includes("мацеста")
  )
    return { lat: 43.6, lng: 39.7 };
  if (loc.includes("грузия")) return { lat: 41.9, lng: 41.9 };
  if (loc.includes("азербайджан")) return { lat: 38.7, lng: 48.8 };

  // --- ДРУГИЕ ---
  if (loc.includes("англия") || loc.includes("британия"))
    return { lat: 51.5, lng: -0.1 };
  if (loc.includes("турция")) return { lat: 41.0, lng: 40.5 };
  if (loc.includes("вьетнам")) return { lat: 21.6, lng: 105.8 };

  // --- ПРОСТО КИТАЙ (если не указана провинция) ---
  if (loc.includes("китай")) return { lat: 35.0, lng: 105.0 };

  // Если ничего не нашли — ставим рандомно, чтобы точки не слипались
  return {
    lat: 30 + (Math.random() - 0.5) * 5,
    lng: 110 + (Math.random() - 0.5) * 5,
  };
};

// const additionalTeas = [
//   {
//     id: "england",
//     name: "Английский чай",
//     desc: "Традиционный английский чай с молоком.",
//     location: "Англия",
//   },
//   {
//     id: "india",
//     name: "Дарджилинг",
//     desc: "Дарджилинг – элитный черный чай из Индии, выращиваемый в горах Дарджилинг. Известен своим мускусным вкусом и ароматом, часто называемый 'шампанским среди чаев'.",
//     location: "Индия",
//   },
//   {
//     id: "sochi",
//     name: "Чай из Сочи-Красной Поляны",
//     desc: "Горный чай из Красной Поляны.",
//     location: "Сочи-Красная Поляна",
//   },
// ];

// const getCoordsAdditional = (location) => {
//   if (!location) return { lat: 30, lng: 110 }; // Дефолт (Китай)
//   if (location === "Англия") return { lat: 52.0, lng: 0.0 };
//   if (location === "Индия") return { lat: 27.0, lng: 88.3 }; // Дарджилинг
//   if (location === "Сочи-Красная Поляна") return { lat: 43.6, lng: 40.0 };
//   return { lat: 0, lng: 0 };
// };

export default function WorldMap({ teas = [] }) {
  // const allTeas = [...teas];
  return (
    <MapContainer
      attributionControl={false}
      center={[30, 110]} // Center on China
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {teas.map((tea) => {
        const coords = getCoordinates(tea.location);
        return (
          <Marker
            key={tea.id || Math.random()}
            position={[coords.lat, coords.lng]}
          >
            <Popup className="tea-popup">
              <div className="text-center p-1">
                <h6
                  className="fw-bold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {tea.name}
                </h6>

                <p className="small text-muted mb-2">
                  {tea.desc
                    ? `${tea.desc.substring(0, 60)}...`
                    : "Описание отсутствует"}
                </p>

                <Link to={`/onetea/${tea.id}`}>
                  <Button
                    size="sm"
                    className="btn-gold text-white w-100 rounded-pill"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Подробнее
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
