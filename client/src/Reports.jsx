import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyReports = () => {
  const viteTacOpApiUrl = import.meta.env.VITE_TAC_OP_API_URL;
  const [reports, setReports] = useState([]);
  const [squadDepthSummary, setSquadDepthSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSquadDepthSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${viteTacOpApiUrl}/api/squadDepthSummary?team=13`);
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

  useEffect(() => {
    fetchSquadDepthSummary();
  }, []);

  const chartData = squadDepthSummary
    ? Object.entries(squadDepthSummary.combined_depth || {}).map(([position, depths]) => ({
        position,
        primary: depths.primary || 0,
        secondary: depths.secondary || 0,
      }))
    : [];

  return (
    <div>
      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
        <h3>Squad Depth Summary</h3>
        {loading && <p>Loading squad depth summary...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {squadDepthSummary && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', width: '100%' }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="primary" stackId="a" fill="#8884d8" name="Primary" />
                <Bar dataKey="secondary" stackId="a" fill="#82ca9d" name="Secondary" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyReports;