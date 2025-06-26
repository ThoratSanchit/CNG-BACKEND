export interface IUserProfile {
  id?: string; // UUID (auto-generated)
  userID: string; // Authenticated user ID (_id or custom)
  city?: string;
  location?: [number, number]; // [longitude, latitude]
  createdAt?: Date;
  updatedAt?: Date;
}
