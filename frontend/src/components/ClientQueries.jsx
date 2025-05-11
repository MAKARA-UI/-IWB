import { useState } from 'react';
import '../styles/dashboard/ClientQueries.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ClientQueries({ queries, setQueries }) {
  const [filter, setFilter] = useState('all');
  const [responseText, setResponseText] = useState('');

  const handleResponse = async (queryId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/queries/${queryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: responseText,
          status: 'complete'
        })
      });

      if (res.ok) {
        const updatedQuery = await res.json();
        setQueries(prev => prev.map(q => 
          q._id === queryId ? updatedQuery : q
        ));
        setResponseText('');
      }
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  const filteredQueries = queries.filter(q => 
    filter === 'all' ? true : q.status === filter
  );

  return (
    <div className="client-queries">
      <div className="filter-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Queries</option>
          <option value="pending">Pending</option>
          <option value="complete">Completed</option>
        </select>
      </div>

      <div className="queries-list">
        {filteredQueries.map(query => (
          <div key={query._id} className={`query-item ${query.status}`}>
            <div className="query-header">
              <span className="status">{query.status}</span>
              {query.autoResponded && <span className="auto">Auto-responded</span>}
            </div>
            <p className="question"><strong>Question:</strong> {query.question}</p>
            {query.response && (
              <p className="response"><strong>Response:</strong> {query.response}</p>
            )}
            
            {query.status === 'pending' && !query.autoResponded && (
              <div className="response-section">
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type response..."
                />
                <button onClick={() => handleResponse(query._id)}>
                  Send Response
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}