import { EventData, Photo, UserRole } from './types';

export const APP_NAME = "Ganesh Studio";

export const GEMINI_MODEL_FLASH = 'gemini-2.5-flash';

// Mock Data for Demo Purposes
export const MOCK_EVENTS: EventData[] = [
  {
    id: 'wed-2024-june',
    name: 'Priya & Rahul Wedding',
    description: 'The grand celebration at The Oberoi.',
    coverImage: 'https://picsum.photos/800/400?random=1',
    date: '2024-06-15',
    location: 'Mumbai, India',
    storageUsed: 1200,
    storageLimit: 5000,
    photographerCode: '1234',
    active: true,
  },
  {
    id: 'tech-summit-24',
    name: 'Bangalore Tech Summit',
    description: 'Innovation meets culture.',
    coverImage: 'https://picsum.photos/800/400?random=2',
    date: '2024-09-10',
    location: 'Bangalore, India',
    storageUsed: 4500,
    storageLimit: 5000,
    photographerCode: '9999',
    active: true,
  }
];

export const MOCK_PHOTOS: Photo[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `photo-${i}`,
  url: `https://picsum.photos/600/800?random=${i + 10}`,
  thumbnailUrl: `https://picsum.photos/200/200?random=${i + 10}`,
  timestamp: Date.now() - i * 100000,
  eventId: 'wed-2024-june',
  hasFaces: Math.random() > 0.3,
  metadata: {
    width: 600,
    height: 800
  }
}));

export const CURRENT_USER_MOCK = {
  uid: 'user-123',
  email: 'demo@ganeshstudio.com',
  role: UserRole.ADMIN,
  name: 'Ganesh Admin'
};
