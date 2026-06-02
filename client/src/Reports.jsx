import { useState, useEffect } from 'react';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [squadDepthSummary, setSquadDepthSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching reports
    const fetchReports = async () => {
      // Replace this with your actual API call
      const response = await fetch('http://localhost:5000/api/reports');
      const data = await response.json();
      setReports(data);
    };

    fetchReports();
  }, []);

  const fetchSquadDepthSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/squadDepthSummary');
      if (!response.ok) {
        throw new Error('Failed to fetch squad depth summary');
      }
      const data = await response.json();
      setSquadDepthSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>{report.name}: {report.value}</li>
        ))}
      </ul>

      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
        <h3>Squad Depth Summary</h3>
        <button 
          onClick={fetchSquadDepthSummary} 
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Fetch Squad Depth Summary'}
        </button>
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {squadDepthSummary && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
            <pre>{JSON.stringify(squadDepthSummary, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyReports;