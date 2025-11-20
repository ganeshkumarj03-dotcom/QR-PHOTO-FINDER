import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Upload, Search, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_EVENTS, MOCK_PHOTOS } from '../constants';
import { loadModels } from '../services/faceService';

export const EventLanding: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [isModelsLoading, setIsModelsLoading] = useState(true);
  
  const event = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];
  
  useEffect(() => {
    // Preload face detection models
    loadModels().then(() => setIsModelsLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
        <img 
          src={event.coverImage} 
          alt={event.name} 
          className="w-full h-64 sm:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">{event.name}</h1>
          <p className="text-slate-300 text-lg mb-4 flex items-center gap-2">
            <span className="bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-sm text-sm">
              {event.date}
            </span>
            <span className="bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-sm text-sm">
              {event.location}
            </span>
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Search className="text-indigo-400" />
            Find Your Photos
          </h2>
          <p className="text-slate-400 mb-6">
            Upload a selfie to instantly find all photos of you from this event using our secure AI face matching.
          </p>
          
          <div className="space-y-4">
            <Button 
              fullWidth 
              onClick={() => navigate(`/event/${eventId}/find`)}
              disabled={isModelsLoading}
              icon={<Camera size={20} />}
            >
              {isModelsLoading ? 'Initializing AI...' : 'Take / Upload Selfie'}
            </Button>
            
            <div className="flex items-start gap-3 text-xs text-slate-500 bg-slate-900/50 p-4 rounded-lg">
              <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
              <p>
                Your privacy is priority. Your selfie is processed locally in your browser to create a temporary face descriptor. The original photo is discarded immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
           <h2 className="text-xl font-bold text-white mb-4">Latest Uploads</h2>
           <div className="grid grid-cols-3 gap-2">
             {MOCK_PHOTOS.slice(0, 6).map((photo) => (
               <div key={photo.id} className="aspect-square rounded-lg overflow-hidden relative group">
                 <img 
                   src={photo.thumbnailUrl} 
                   alt="Event preview" 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                 />
               </div>
             ))}
           </div>
           <div className="mt-6 text-center">
             <Button variant="outline" fullWidth>View Full Gallery</Button>
           </div>
        </div>
      </div>
    </div>
  );
};
