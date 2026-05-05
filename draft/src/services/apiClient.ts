import type { Charger } from "../types";

export const apiClient = {
  async fetchRealChargers(): Promise<Charger[]> {
    try {
      // Overpass API to fetch real EV charging stations near Jayanagar
      const query = `[out:json];node(around:5000,12.9307,77.5833)["amenity"="charging_station"];out;`;
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Overpass API failed");
      const data = await response.json();
      
      if (data.elements && data.elements.length > 0) {
        return data.elements.map((el: any) => ({
          id: el.id.toString(),
          name: el.tags.name || "Unknown EV Station",
          address: el.tags['addr:street'] || "Bengaluru",
          coordinates: { lat: el.lat, lng: el.lon },
          powerKw: el.tags['socket:type2:output'] ? parseInt(el.tags['socket:type2:output'].replace('kW', '')) : 50,
          pricePerKwh: 15 + Math.floor(Math.random() * 10),
          parkingFee: 0,
          availability: "Available",
          connectorType: el.tags['socket:type2'] ? "Type 2" : "CCS2"
        }));
      }
    } catch (err) {
      console.error("Overpass failed, using mocks", err);
    }

    // Fallback Mock Data
    return [
      { id: "1", name: "Ragigudda EV Hub", address: "9th Block, Jayanagar", coordinates: { lat: 12.9165, lng: 77.5925 }, powerKw: 50, pricePerKwh: 18, parkingFee: 20, availability: "Available", connectorType: "CCS2 (DC)" },
      { id: "2", name: "Banashankari Fast Charge", address: "Outer Ring Rd, Banashankari", coordinates: { lat: 12.9250, lng: 77.5739 }, powerKw: 60, pricePerKwh: 19, parkingFee: 15, availability: "In Use", connectorType: "Type 2 (AC)" }
    ];
  }
};
