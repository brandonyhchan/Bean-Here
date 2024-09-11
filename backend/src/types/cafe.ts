export type Cafe = {
  id: number;
  name: string;
  stringId: string;
  street: string;
  city: string;
  province: string;
  profilePhotoURL: string;
  busyness: string;
  noisiness: string;
  price: string;
  latitude: number;
  longitude: number;
  distance: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type distance<T> = T & {
  distance: number;
};
