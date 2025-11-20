import React, { useState, useRef } from 'react';
import { Cloud, UploadCloud, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Button } from '../components/Button';
import { generatePhotoCaption } from '../services/geminiService';

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  caption?: string;
}

export const Photographer: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newUploads: UploadItem[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending'
    }));
    setUploads(prev => [...newUploads, ...prev]); // Add to top
    
    // Simulate auto-upload start for new files
    newUploads.forEach(item => simulateUpload(item.id, item.file));
  };

  const simulateUpload = async (id: string, file: File) => {
    // 1. Uploading Phase
    setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'uploading' } : u));
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setUploads(prev => prev.map(u => u.id === id ? { ...u, progress: i } : u));
    }

    // 2. Processing Phase (Face Gen + Captioning)
    setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'processing', progress: 100 } : u));
    
    // Convert file to base64 for mock caption gen
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        const base64 = reader.result as string;
        // Mock call to Gemini for caption (optional feature)
        const caption = await generatePhotoCaption(base64.split(',')[1]); 
        
        setUploads(prev => prev.map(u => u.id === id ? { 
            ...u, 
            status: 'completed',
            caption: caption 
        } : u));
    };
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Photographer Hub</h1>
          <p className="text-slate-400 mt-1">Auto-upload photos for real-time face matching.</p>
        </div>
        <div className="text-right">
           <span className="block text-xs text-slate-500 uppercase tracking-wider">Cloud Storage</span>
           <div className="flex items-center gap-2">
             <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[70%]"></div>
             </div>
             <span className="text-sm font-mono text-indigo-300">3.5GB / 5GB</span>
           </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div 
        className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" multiple className="hidden" ref={fileInputRef} accept="image/*" />
        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Cloud className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Drop photos here to upload</h3>
        <p className="text-slate-400 mt-2">or click to browse from your camera card</p>
      </div>

      {/* Upload List */}
      <div className="mt-8 space-y-4">
        {uploads.map((item) => (
          <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
              {/* Displaying local preview */}
              <img 
                src={URL.createObjectURL(item.file)} 
                alt="preview" 
                className="w-full h-full object-cover opacity-70" 
                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium text-white truncate">{item.file.name}</p>
                <span className={`text-xs font-medium uppercase ${
                    item.status === 'completed' ? 'text-green-400' : 
                    item.status === 'processing' ? 'text-amber-400' : 'text-indigo-400'
                }`}>
                  {item.status === 'processing' ? 'AI Processing...' : item.status}
                </span>
              </div>
              
              {item.status === 'completed' ? (
                  <p className="text-xs text-slate-500 truncate">
                      AI Caption: {item.caption}
                  </p>
              ) : (
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                    className="bg-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                    ></div>
                </div>
              )}
            </div>

            <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
              {item.status === 'completed' ? <CheckCircle size={20} className="text-green-500"/> : <X size={20} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
