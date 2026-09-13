import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/Layout';
import { getAdminApplicationByIdAPI } from '../../lib/api';
import { getFileUrl } from '../../api/candidateApi';
import PrintableApplication from '../../components/form/PrintableApplication';
import './Admin.css';

export default function AdminApplicantDetails() {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get('id');

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (appId) {
      fetchDetails(appId);
    } else {
      setLoading(false);
      setError('No application ID specified.');
    }
  }, [appId]);

  const fetchDetails = async (id) => {
    try {
      setLoading(true);
      const res = await getAdminApplicationByIdAPI(id);
      if (res.ok && res.data && res.data.application) {
        setApplication(res.data.application);
      } else {
        setError('Application record not found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch applicant details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Applicant Complete Profile">
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <Link
          to="/admin/applications"
          style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}
        >
          ‹ Back to All Applications
        </Link>
        {application && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              className="btn btn-primary"
              style={{ padding: '8px 18px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              🖨️ Print Application / PDF
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          Loading applicant complete profile...
        </div>
      ) : error ? (
        <div style={{ padding: '24px', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '10px' }}>
          {error}
        </div>
      ) : application ? (
        <div>
          {/* Render Full Application */}
          <PrintableApplication
            applicationNo={application.applicationNo}
            candidate={{
              candidateName: application.candidateName,
              fatherName: application.fatherName,
              email: application.email,
              mobile: application.mobile,
              registrationId: application.registrationId
            }}
            values={application.formData || {}}
            tableValues={application.formData || {}}
            fileMeta={application.fileData || {}}
          />

          {/* Uploaded Documents List */}
          <div className="no-print" style={{ marginTop: '24px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e3a8a' }}>
              📁 All Attached Files & Documents
            </h3>
            {application.fileData && Object.keys(application.fileData).length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {Object.entries(application.fileData).map(([key, f]) => (
                  <div
                    key={key}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block' }}>{key}</strong>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{f.originalName || 'Document'}</span>
                    </div>
                    {f.url ? (
                      <a
                        href={getFileUrl(f.url)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          marginTop: '8px',
                          display: 'inline-block',
                          color: '#2563eb',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          textDecoration: 'none'
                        }}
                      >
                        ↗ Open / View File
                      </a>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>Not uploaded</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>No attached documents found.</p>
            )}
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}