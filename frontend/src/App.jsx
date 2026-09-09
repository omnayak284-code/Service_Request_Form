import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: 'Lead Generation',
    description: ''
  });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRecords = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/service-requests`);
      const data = await res.json();
      if (data.success) setRecords(data.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/service-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Submission failed');

      setSuccessMsg(result.message);
      setFormData({
        name: '',
        email: '',
        requestType: 'Lead Generation',
        description: ''
      });
      await fetchRecords();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'Lead Generation':
        return { background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' };
      case 'Email Campaign':
        return { background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' };
      case 'Social Campaign':
        return { background: 'rgba(217, 70, 239, 0.15)', color: '#f0abfc', border: '1px solid rgba(217, 70, 239, 0.3)' };
      default:
        return { background: 'rgba(148, 163, 184, 0.15)', color: '#cbd5e1', border: '1px solid rgba(148, 163, 184, 0.3)' };
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0d14',
      color: '#f1f5f9',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      padding: '48px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Alerts */}
        {successMsg && (
          <div style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #059669',
            color: '#34d399',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✓ {successMsg}
          </div>
        )}

        {errorMsg && (
          <div style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #dc2626',
            color: '#f87171',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✕ {errorMsg}
          </div>
        )}

        {/* Split Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '28px',
          alignItems: 'start'
        }}>
          
          {/* Left: Service Request Form */}
          <div style={{
            backgroundColor: '#111622',
            border: '1px solid #1e2638',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px', color: '#fff' }}>
              Service Request Form
            </h2>
            <p style={{ color: '#8492a6', fontSize: '13px', margin: '0 0 24px' }}>
              Submit marketing and lead requests directly to the queue.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    backgroundColor: '#0a0d14',
                    border: '1px solid #232c3d',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
                  WORK EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    backgroundColor: '#0a0d14',
                    border: '1px solid #232c3d',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
                  SERVICE TYPE
                </label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    backgroundColor: '#0a0d14',
                    border: '1px solid #232c3d',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Lead Generation">Lead Generation</option>
                  <option value="Email Campaign">Email Campaign</option>
                  <option value="Social Campaign">Social Campaign</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
                  DETAILS
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Specify project objectives, audience, and scope..."
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    backgroundColor: '#0a0d14',
                    border: '1px solid #232c3d',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '6px',
                  padding: '12px 18px',
                  backgroundColor: loading ? '#374151' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Request →'}
              </button>
            </form>
          </div>

          {/* Right: Submitted Requests */}
          <div style={{
            backgroundColor: '#111622',
            border: '1px solid #1e2638',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#fff' }}>
                  Submitted Requests
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>PostgreSQL Persisted Data</span>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: '#1e2638',
                color: '#94a3b8',
                padding: '4px 12px',
                borderRadius: '999px'
              }}>
                {records.length} Total
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2638', color: '#64748b' }}>
                    <th style={{ padding: '12px 8px', fontWeight: '600' }}>ID</th>
                    <th style={{ padding: '12px 12px', fontWeight: '600' }}>Client</th>
                    <th style={{ padding: '12px 12px', fontWeight: '600' }}>Type</th>
                    <th style={{ padding: '12px 12px', fontWeight: '600' }}>Description</th>
                    <th style={{ padding: '12px 8px', fontWeight: '600', textAlign: 'right' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>
                        No service requests submitted yet.
                      </td>
                    </tr>
                  ) : (
                    records.map((r) => (
                      <tr key={r.id} style={{ borderBottom: '1px solid #161e2e' }}>
                        <td style={{ padding: '14px 8px', color: '#64748b', fontWeight: '500' }}>#{r.id}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <div style={{ fontWeight: '600', color: '#f1f5f9' }}>{r.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{r.email}</div>
                        </td>
                        <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            whiteSpace: 'nowrap',
                            ...getBadgeStyle(r.requestType)
                          }}>
                            {r.requestType}
                          </span>
                        </td>
                        <td style={{
                          padding: '14px 12px',
                          color: '#cbd5e1',
                          maxWidth: '240px',
                          lineHeight: '1.4',
                          wordBreak: 'break-word'
                        }}>
                          {r.description}
                        </td>
                        <td style={{ padding: '14px 8px', color: '#64748b', fontSize: '12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}