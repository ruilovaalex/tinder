export interface ProfileEntity {
  id: number;
  userId: number;
  bio: string | null;
  gender: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  isOnline: boolean;
  lastSeen: Date | null;
}
