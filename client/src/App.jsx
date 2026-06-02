import React, { useState } from 'react';
import MyForm from './Form';
import MyData from './Data';
import MyReports from './Reports';

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    form: true,
    data: true
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEditPlayer = async (playerId) => {
    if (!playerId) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/player/${playerId}`);
      if (!response.ok) {
        console.error('Failed to load player for edit:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      setSelectedPlayer({ ...data, id: playerId });
    } catch (error) {
      console.error('Error loading player for edit:', error);
    }
  };

  const handleFormSaved = () => {
    setSelectedPlayer(null);
    setRefreshFlag((flag) => flag + 1);
  };

  return (
    <>
      <section id="form" className={`collapsible-section ${expandedSections.form ? 'expanded' : 'collapsed'}`}>
        <div className="section-header" onClick={() => toggleSection('form')}>
          <h3>Player Input Form</h3>
          <button type="button" className="toggle-btn" aria-expanded={expandedSections.form}>
            {expandedSections.form ? '▼' : '▶'}
          </button>
        </div>
        {expandedSections.form && (
          <div className="section-content">
            <MyForm initialData={selectedPlayer} onSaved={handleFormSaved} />
          </div>
        )}
      </section>
      <section id="data" className={`collapsible-section ${expandedSections.data ? 'expanded' : 'collapsed'}`}>
        <div className="section-header" onClick={() => toggleSection('data')}>
          <h3>Player Data</h3>
          <button type="button" className="toggle-btn" aria-expanded={expandedSections.data}>
            {expandedSections.data ? '▼' : '▶'}
          </button>
        </div>
        {expandedSections.data && (
          <div className="section-content">
            <MyData onEdit={handleEditPlayer} refreshFlag={refreshFlag} />
          </div>
        )}
      </section>
      <section id="reports" className={`collapsible-section ${expandedSections.reports ? 'expanded' : 'collapsed'}`}>
        <div className="section-header" onClick={() => toggleSection('reports')}>
          <h3>Tactical Reports</h3>
          <button type="button" className="toggle-btn" aria-expanded={expandedSections.reports}>
            {expandedSections.reports ? '▼' : '▶'}
          </button>
        </div>
        {expandedSections.reports && (
          <div className="section-content">
            <MyReports />
          </div>
        )}
      </section>
    </>
  );
}

export default App;
