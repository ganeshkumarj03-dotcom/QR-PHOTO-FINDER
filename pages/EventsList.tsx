import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../constants';
import { Calendar, MapPin } from 'lucide-react';

export const EventsList: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Ganesh Studio</h1>
        <p className="text-slate-400 text-lg">Find your event to discover your photos.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_EVENTS.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id} className="group">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.coverImage} 
                  alt={event.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{event.name}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2">{event.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
