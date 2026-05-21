import React, { useState, useEffect } from 'react';

function MyData() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/players');
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
  });

  return (
    <div>
      <h2>Player Data</h2>
      <table align='center' border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Left Rating</th>
            <th>Right Rating</th>
            <th>Primary Position</th>
            <th>Secondary Position</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
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