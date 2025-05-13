import { useState, useEffect } from 'react';
import '../styles/dashboard/DeveloperDashboard.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function DeveloperDashboard() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/developers/files`)
      .then(res => res.json())
      .then(data => setFiles(data.files))
      .catch(err => console.error('File list error', err));
  }, []);

  const loadFile = (filename) => {
    fetch(`${API_BASE}/api/developers/files/${filename}`)
      .then(res => res.json())
      .then(data => {
        setSelectedFile(filename);
        setContent(data.content);
      });
  };

  const saveFile = () => {
    fetch(`${API_BASE}/api/developers/files/${selectedFile}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(() => setStatus('Failed to save'));
  };

  return (
    <div className="developer-dashboard">
      <h2>Developer Dashboard</h2>

      <div className="dev-files-section">
        <h3>Files</h3>
        <ul>
          {files.map((file, idx) => (
            <li key={idx}>
              <button onClick={() => loadFile(file)}>{file}</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedFile && (
        <div className="editor-section">
          <h3>Editing: {selectedFile}</h3>
          <textarea
            rows="20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={saveFile}>Save</button>
          {status && <p className="status-msg">{status}</p>}
        </div>
      )}
    </div>
  );
}
