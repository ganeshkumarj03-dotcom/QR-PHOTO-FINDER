import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Upload, RefreshCw, Check, AlertCircle, Download, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { detectFace, findMatches } from '../services/faceService';
import { MatchResult } from '../types';

export const FindPhotos: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [step, setStep] = useState<'capture' | 'processing' | 'results'>('capture');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!imageSrc) return;
    setStep('processing');

    try {
      // 1. Detect face
      // Note: in a real app, we would pass the image element/blob to face-api.js
      const hasFace = await detectFace(new Image()); 
      
      if (!hasFace) {
        alert("No face detected. Please try again with better lighting.");
        setStep('capture');
        return;
      }

      // 2. Find matches
      const results = await findMatches(imageSrc, eventId || '');
      setMatches(results);
      setStep('results');

    } catch (error) {
      console.error(error);
      alert("Something went wrong matching your face. Please try again.");
      setStep('capture');
    }
  };

  if (step === 'results') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => setStep('capture')} icon={<ArrowLeft size={16}/>}>
            Try Another Selfie
          </Button>
          <h2 className="text-2xl font-bold text-indigo-400">Found {matches.length} Photos</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {matches.map((match) => (
            <div key={match.photo.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-800 shadow-lg cursor-pointer">
              <img 
                src={match.photo.url} 
                alt="Matched" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                <span className="text-green-400 font-bold text-sm bg-green-900/80 px-2 py-1 rounded-full">
                  {Math.round((1 - match.distance) * 100)}% Match
                </span>
                <Button variant="primary" className="scale-90" icon={<Download size={16}/>}>
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {matches.length === 0 && (
            <div className="text-center py-20 bg-slate-800 rounded-2xl border border-slate-700">
                <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-300">No matches found</h3>
                <p className="text-slate-400 mt-2">We couldn't find any photos matching your selfie yet.</p>
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
       <h2 className="text-2xl font-bold text-center mb-6">
         {step === 'processing' ? 'Scanning Gallery...' : 'Upload Selfie'}
       </h2>

       <div className="bg-slate-800 p-4 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden">
          {step === 'processing' && (
            <div className="absolute inset-0 z-10 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-indigo-300 animate-pulse">Analyzing facial features...</p>
            </div>
          )}

          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-black mb-4">
             {imageSrc ? (
               <img src={imageSrc} alt="Selfie" className="w-full h-full object-cover transform scale-x-[-1]" />
             ) : (
               <Webcam
                 audio={false}
                 ref={webcamRef}
                 screenshotFormat="image/jpeg"
                 className="w-full h-full object-cover transform scale-x-[-1]"
                 videoConstraints={{ facingMode: "user" }}
               />
             )}
          </div>

          <div className="grid gap-3">
            {!imageSrc ? (
              <>
                <Button onClick={capture} fullWidth className="bg-white text-slate-900 hover:bg-slate-200">
                  Capture Photo
                </Button>
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                    <Button 
                        variant="secondary" 
                        fullWidth 
                        onClick={() => fileInputRef.current?.click()}
                        icon={<Upload size={18}/>}
                    >
                        Upload from Gallery
                    </Button>
                </div>
              </>
            ) : (
               <>
                 <Button onClick={processImage} fullWidth variant="primary" icon={<Check size={18}/>}>
                   Find My Photos
                 </Button>
                 <Button onClick={() => setImageSrc(null)} fullWidth variant="outline" icon={<RefreshCw size={18}/>}>
                   Retake
                 </Button>
               </>
            )}
          </div>
       </div>
    </div>
  );
};
