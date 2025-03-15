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

export interface NewPlaceFormValue {
  title?: string;
  imageUrl?: string;
  description?: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export enum NewPlaceFormValueFields {
  Title = "title",
  Description = "description",
  Address = "address",
  Latitude = "lat",
  Longitude = "lng",
  ImageUrl = "imageUrl",
}

export interface LogInFormValue {
  name?: string;
  email: string;
  password: string;
}

export enum LogInFormValueFields {
  Name = "name",
  Email = "email",
  Password = "password",
}
