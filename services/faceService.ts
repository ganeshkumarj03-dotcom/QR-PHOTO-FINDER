// In a real implementation, this would import * from 'face-api.js'
// ensuring models are loaded from /public/models
import { MOCK_PHOTOS } from "../constants";
import { Photo, MatchResult } from "../types";

// Simulating the delay of loading AI models
export const loadModels = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 1500));
};

export const detectFace = async (imageElement: HTMLImageElement | HTMLVideoElement): Promise<boolean> => {
  // Simulate face detection processing
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Randomly return true for demo purposes usually, but let's assume we always find a face for the "Happy Path"
  return true;
};

export const findMatches = async (
  referenceImage: string, // base64 or url
  eventId: string
): Promise<MatchResult[]> => {
  // This simulates:
  // 1. Extracting embedding from referenceImage
  // 2. Fetching all photo embeddings for eventId from Firestore
  // 3. Computing Euclidean distance
  // 4. Sorting by distance
  
  await new Promise((resolve) => setTimeout(resolve, 2500)); // Searching is heavy

  // Return a random subset of mock photos as "matches"
  const shuffled = [...MOCK_PHOTOS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 8); // Return 8 matches

  return selected.map(photo => ({
    photo,
    distance: Math.random() * 0.4 // Simulated confidence score (0.0 is exact match)
  })).sort((a, b) => a.distance - b.distance);
};
