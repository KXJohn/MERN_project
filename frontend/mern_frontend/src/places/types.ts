export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: Coordinates;
}
