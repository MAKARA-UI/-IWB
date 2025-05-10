import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'client'  // default to 'client'
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', credentials);

    // Simulate backend auth + redirect
    if (credentials.role === 'client') {
      navigate('/client');
    } else {
      navigate('/'); // other roles can have different redirects
    }
  };

  return (
    <main className="login">
      <div className="login-container">
        <div className="login-card">
          <h1>IWB Portal</h1>
          <p>Sign in to access your account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="role">Login as</label>
              <select
                id="role"
                value={credentials.role}
                onChange={(e) =>
                  setCredentials({ ...credentials, role: e.target.value })
                }
              >
                <option value="client">Client</option>
                <option value="sales">Sales</option>
                <option value="developer">Developer</option>
                <option value="investor">Investor</option>
                <option value="finance">Finance</option>
                <option value="partner">Partner</option>
              </select>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>Restricted to IWB personnel only</p>
          </div>
        </div>
      </div>
    </main>
  );
}
