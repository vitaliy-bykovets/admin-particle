export interface Field {
  id: number;
  polygon?: google.maps.Polygon;
  path: {
    lat: number;
    lng: number;
  }[];
}
