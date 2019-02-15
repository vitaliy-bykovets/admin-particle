export interface Field {
  id: number;
  name: string;
  description: string;s
  polygon?: google.maps.Polygon;
  path: {
    lat: number;
    lng: number;
  }[];
}
