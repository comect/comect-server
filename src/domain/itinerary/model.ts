export type Itinerary = {
  markers: Marker[];
  routes: Location[];
};

export type Marker = {
  name: string;
  type: string; // Grower | Batch | Producer | Brew | Venues
  location: Location;
};

export type Location = {
  long: number;
  lat: number;
};
