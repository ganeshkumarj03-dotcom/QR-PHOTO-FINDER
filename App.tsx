import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EventsList } from './pages/EventsList';
import { EventLanding } from './pages/EventLanding';
import { FindPhotos } from './pages/FindPhotos';
import { Photographer } from './pages/Photographer';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/event/:eventId" element={<EventLanding />} />
          <Route path="/event/:eventId/find" element={<FindPhotos />} />
          <Route path="/photographer" element={<Photographer />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
