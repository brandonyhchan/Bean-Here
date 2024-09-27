export interface Cafe {
  id: number;
  name: string;
  stringId: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  profilePhotoURL: string;
  busyness: string;
  noisiness: string;
  price: string;
  location: Location;
  distance?: number;
  phoneNumber?: string;
  website?: string;
}

export type userCoords =  {
  latitude: number;
  longitude: number;
}
