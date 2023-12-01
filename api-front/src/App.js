import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [poods, setPoods] = useState([]);
  const [newPood, setNewPood] = useState({
    poodName: '',
    poodAsukoht: '',
    contactInfo: '',
  });

  const [graafiks, setGraafiks] = useState([]);
  const [newGraafik, setNewGraafik] = useState({
    poodId: '',
    paev: '',
    avatudAeg: '',
    suletudAeg: '',
  });

  useEffect(() => {
    fetchGraafiks();
    fetchPoods();
  }, []);

  const fetchPoods = async () => {
    try {
      const response = await fetch('https://localhost:7123/api/Pood');
      const data = await response.json();
      setPoods(data);
    } catch (error) {
      console.error('Error fetching poods:', error);
    }
  };

  const fetchGraafiks = async () => {
    try {
      const response = await fetch('https://localhost:7123/api/Graafik');
      const data = await response.json();
      setGraafiks(data);
    } catch (error) {
      console.error('Error fetching graafiks:', error);
    }
  };

  const addPood = async () => {
    try {
      await fetch('https://localhost:7123/api/Pood/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPood),
      });
      // Fetch updated pood list after adding
      fetchPoods();
    } catch (error) {
      console.error('Error adding pood:', error);
    }
  };

  const addGraafik = async () => {
    try {
      await fetch('https://localhost:7123/api/Graafik/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGraafik),
      });
      // Fetch updated pood list after adding
      fetchGraafiks();
    } catch (error) {
      console.error('Error adding graafik:', error);
    }
  };

  const deletePood = async (id) => {
    try {
      await fetch(`https://localhost:7123/api/Pood/delete/${id}`, {
        method: 'DELETE',
      });
      // Fetch updated pood list after deleting
      fetchPoods();
    } catch (error) {
      console.error('Error deleting pood:', error);
    }
  };

  const deleteGraafik = async (id) => {
    try {
      await fetch(`https://localhost:7123/api/Graafik/delete/${id}`, {
        method: 'DELETE',
      });
      // Fetch updated pood list after deleting
      fetchGraafiks();
    } catch (error) {
      console.error('Error deleting graafik:', error);
    }
  };

  const getPoodName = (poodId) => {
    const foundPood = poods.find((pood) => pood.id === poodId);
    return foundPood ? foundPood.poodName : 'Pood Not Found';
  };

  return (
    <div>
      <h1>Pood List</h1>
      <table>
        <thead>
          <tr>
            <th>Pood Name</th>
            <th>Pood Location</th>
            <th>Contact Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {poods.map((pood) => (
            <tr key={pood.id}>
              <td>{pood.poodName}</td>
              <td>{pood.poodAsukoht}</td>
              <td>{pood.contactInfo}</td>
              <td>
                <button onClick={() => deletePood(pood.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Pood</h2>
      <div>
        <label>Pood Name:</label>
        <input
          type="text"
          value={newPood.poodName}
          onChange={(e) => setNewPood({ ...newPood, poodName: e.target.value })}
        />
      </div>
      <div>
        <label>Pood Location:</label>
        <input
          type="text"
          value={newPood.poodAsukoht}
          onChange={(e) => setNewPood({ ...newPood, poodAsukoht: e.target.value })}
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          value={newPood.contactInfo}
          onChange={(e) => setNewPood({ ...newPood, contactInfo: e.target.value })}
        />
      </div>
      <button onClick={addPood}>Add Pood</button>

      <h1>Pood Graafik</h1>
      <table>
        <thead>
          <tr>
            <th>Pood Name</th>
            <th>Päev</th>
            <th>Avatud Aeg</th>
            <th>Suletud Aeg</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {graafiks.map((graafik) => (
            <tr key={graafik.id}>
               <td>{getPoodName(graafik.poodId)}</td>
              <td>{graafik.paev}</td>
              <td>{graafik.avatudAeg}</td>
              <td>{graafik.suletudAeg}</td>
              <td>
                <button onClick={() => deleteGraafik(graafik.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Graafik</h2>
      <div>
      <label>Pood Name:</label>
      
        <select
          value={newGraafik.poodId} /*newGraafik.poodId*/
          onChange={(e) => setNewGraafik({ ...newGraafik, poodId: e.target.value })}
        >
          <option value="" disabled>Select a pood</option>
          {poods.map((pood) => (
            <option key={pood.id} value={pood.id}>
              {pood.id}
            </option>
          ))}

        </select>
      </div>
      <div>
        <label>Päev:</label>
        <input
          type="text"
          value={newGraafik.paev}
          onChange={(e) => setNewGraafik({ ...newGraafik, paev: e.target.value })}
        />
      </div>
      <div>
        <label>Avatud aeg:</label>
        <input
          type="time"
          value={newGraafik.avatudAeg}
          onChange={(e) => setNewGraafik({ ...newGraafik, avatudAeg: e.target.value })}
        />
      </div>
      <div>
        <label>Suletud aeg:</label>
        <input
          type="time"
          value={newGraafik.suletudAeg}
          onChange={(e) => setNewGraafik({ ...newGraafik, suletudAeg: e.target.value })}
        />
      </div>
      <button onClick={addGraafik}>Add Graafik</button>
    </div>
  );
}

export default App;

