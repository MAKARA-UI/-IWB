import { useState } from 'react';
import '../styles/dashboard/ClientQueries.css';

export default function ClientQueries({ queries, setQueries }) {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/queries/${id}/complete`, {
        method: 'PATCH'
      });
      if (!res.ok) throw new Error('Failed to update query');
      const updatedQuery = await res.json();
      setQueries(prev => prev.map(q => q._id === id ? updatedQuery : q));
    } catch (err) {
      console.error(err);
      alert('Error updating query');
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
        <p>No queries found for selected filter.</p>
      ) : (
        filteredQueries.map((query) => (
          <div key={query._id} className={`query-card ${query.status}`}>
            <p><strong>Status:</strong> {query.status}</p>
            <pre>{query.question}</pre>
            {query.response && (
              <p><strong>Auto-response:</strong> {query.response}</p>
            )}
            {query.status === 'pending' && (
              <button onClick={() => handleComplete(query._id)}>
                Mark as Complete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
