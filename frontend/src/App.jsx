import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [token, setToken] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [logs, setLogs] = useState([]);

  const register = async () => {
    try {
      const skillsArray = skills.split(',').map(s => s.trim());
      // Hitting the 'Civil Discourse' Middleware
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name, email: `${name}@test.com`, password: '123', skills: skillsArray, bio: "I love Unions" // Testing the filter
      });
      setToken(res.data.token);
      addLog(`> REGISTERED: ${res.data.user.name}`);
      addLog(`> STATUS: CITIZEN VERIFIED`);
    } catch (err) {
      addLog(`> ERROR: ${err.response?.data?.error || err.message}`);
    }
  };

  const findJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/opportunities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data.matches);
      addLog(`> MATCH ALGORITHM: ${res.data.message}`);
    } catch (err) {
      addLog(`> ERROR: ACCESS DENIED`);
    }
  };

  const addLog = (msg) => setLogs(p => [...p, msg]);

  return (
    <div style={{ padding: 20, fontFamily: 'monospace', background: '#222', color: '#0f0', minHeight: '100vh' }}>
      <h1>:: PROJECT EKTA ::</h1>
      
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} style={{ padding: 10, marginRight: 10 }} />
        <input placeholder="Skills (e.g. React, Driver)" onChange={e => setSkills(e.target.value)} style={{ padding: 10, marginRight: 10 }} />
        <button onClick={register} style={{ padding: 10 }}>1. JOIN REPUBLIC</button>
      </div>

      {token && (
        <button onClick={findJobs} style={{ padding: 10, background: 'cyan', border: 'none' }}>
          2. FIND OPPORTUNITY (MERIT CHECK)
        </button>
      )}

      <div style={{ marginTop: 20, border: '1px solid #444', padding: 10 }}>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>

      <div style={{ marginTop: 20 }}>
        {jobs.map((job, i) => (
          <div key={i} style={{ background: '#333', padding: 10, margin: 5 }}>
            JOB: {job.title} // REQ: {job.requiredSkills.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;