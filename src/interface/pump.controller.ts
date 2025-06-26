export interface IPump {
  pump_name: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  ownerID: string;
  address?: string;
  cng_status: "Available" | "Not Available" | "Unknown";
  createdAt?: Date;
  updatedAt?: Date;
  last_updated?: Date;
}
