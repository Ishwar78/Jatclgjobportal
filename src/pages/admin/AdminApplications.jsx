import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/Layout';
import { getAdminApplicationsAPI } from '../../lib/api';
import './Admin.css';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getAdminApplicationsAPI();
      if (res.ok && res.data && Array.isArray(res.data.applications)) {
        setApplications(res.data.applications);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch applications from server');
    } finally {
      setLoading(false);
    }
  };

  const filtered = applications.filter(app => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      (app.applicationNo && app.applicationNo.toLowerCase().includes(q)) ||
      (app.candidateName && app.candidateName.toLowerCase().includes(q)) ||
      (app.fatherName && app.fatherName.toLowerCase().includes(q)) ||
      (app.mobile && app.mobile.includes(q)) ||
      (app.email && app.email.toLowerCase().includes(q)) ||
      (app.postAppliedFor && app.postAppliedFor.toLowerCase().includes(q))
    );
  });

  return (
    <AdminLayout title="Submitted Applications Management">
      <div className="admin-table-card">
        <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <input
            className="form-control"
            placeholder="Search by Application No, Name, Mobile or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
          <button
            onClick={fetchApplications}
            className="btn btn-outline"
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            🔄 Refresh List
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading applications from database...
          </div>
        ) : error ? (
          <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '8px' }}>
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            {search ? 'No applications match your search query.' : 'No applications submitted yet.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Application No</th>
                  <th>Candidate Name</th>
                  <th>Father's Name</th>
                  <th>Post</th>
                  <th>Contact</th>
                  <th>Academic Score</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app._id}>
                    <td>
                      <strong style={{ color: '#1e3a8a', fontFamily: 'monospace' }}>
                        {app.applicationNo}
                      </strong>
                    </td>
                    <td><strong>{app.candidateName}</strong></td>
                    <td>{app.fatherName || '-'}</td>
                    <td>{app.postAppliedFor || 'Principal'}</td>
                    <td>
                      <div style={{ fontSize: '12px' }}>
                        <div>{app.mobile}</div>
                        <div style={{ color: '#64748b' }}>{app.email}</div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>
                        {app.academicScore || app.formData?.academicTotal || '0'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#15803d',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {app.status || 'Submitted'}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#64748b' }}>
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN') : '-'}
                    </td>
                    <td>
                      <Link
                        to={`/admin/applicant?id=${app._id}`}
                        className="btn btn-primary"
                        style={{ padding: '5px 12px', fontSize: '12px', textDecoration: 'none', display: 'inline-block' }}
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}