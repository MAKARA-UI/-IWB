import { useEffect, useState } from 'react';
import '../styles/dashboard/ClientQueries.css';

export default function ClientQueries() {
  const [queries, setQueries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/queries`);
        const data = await res.json();
        setQueries(data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch queries');
      }
    };
    fetchQueries();
  }, []);

  const handleRespond = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/queries/${id}/respond`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: responseText }),
      });

      if (!res.ok) throw new Error('Failed to respond');

      const updated = await res.json();
      setQueries((prev) => prev.map(q => q._id === id ? updated : q));
      setEditingId(null);
      setResponseText('');
    } catch (err) {
      console.error(err);
      alert('Error responding to query');
    }
  };

  const filteredQueries = queries.filter(q => {
    if (filterStatus === 'pending') return q.status === 'pending';
    if (filterStatus === 'complete') return q.status === 'complete';
    return true;
  });

  return (
    <div className="client-queries">
      <div className="header">
        <h2>Client Queries</h2>
        <select
          className="query-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      {filteredQueries.length === 0 ? (
        <p>No queries found.</p>
      ) : (
        filteredQueries.map((q) => (
          <div key={q._id} className={`query-card ${q.status}`}>
            <p><strong>Name:</strong> {q.name}</p>
            <p><strong>Email:</strong> {q.email}</p>
            <p><strong>Message:</strong> {q.message}</p>
            <p><strong>Status:</strong> {q.status}</p>

            {q.response && (
              <p><strong>Response:</strong> {q.response}</p>
            )}

            {q.status === 'pending' && editingId !== q._id && (
              <button onClick={() => setEditingId(q._id)}>Respond</button>
            )}

            {editingId === q._id && (
              <div className="response-form">
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows="4"
                  placeholder="Type your response..."
                />
                <button onClick={() => handleRespond(q._id)}>Send Response</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
