import { useState, useEffect } from 'react';

function MyData({ onEdit, refreshFlag }) {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teams');
        if (!response.ok) {
          console.error('Failed to fetch teams:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        let url = 'http://localhost:5000/api/players';
        if (selectedTeam) {
          url += `?team=${encodeURIComponent(selectedTeam)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          console.error('Failed to fetch players:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [refreshFlag, selectedTeam]);

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === parseInt(teamId));
    return team ? team.name : teamId;
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <label htmlFor="teamFilter" style={{ marginRight: '0.5rem' }}>
          Filter by team:
        </label>
        <select id="teamFilter" value={selectedTeam} onChange={(event) => setSelectedTeam(event.target.value)}>
          <option value="">All teams</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <table align='center' border="1">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Name</th>
            <th>Team</th>
            <th>Age</th>
            <th>Left Rating</th>
            <th>Right Rating</th>
            <th>Primary Position</th>
            <th>Secondary Position</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id ?? player.name}>
              <td>
                <button type="button" onClick={() => onEdit?.(player.id)}>
                  Edit
                </button>
              </td>
              <td>{player.name}</td>
              <td>{getTeamName(player.team)}</td>
              <td>{player.age}</td>
              <td>{player.leftRating}</td>
              <td>{player.rightRating}</td>
              <td>{player.primaryPosition}</td>
              <td>{player.secondaryPosition}</td>
              <td>{player.available ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyData;