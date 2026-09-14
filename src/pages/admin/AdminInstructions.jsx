import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/Layout';
import { getInstructionsAPI, updateInstructionsAPI } from '../../lib/api';
import {
  parseTo12Hour,
  formatIndianDate,
  formatIndianDateLong,
  formatIndianTime
} from '../../utils/indianDateTime';
import './AdminInstructions.css';

export default function AdminInstructions() {
  const [deadlineDate, setDeadlineDate] = useState('2026-03-31');
  const [hour, setHour] = useState('11');
  const [minute, setMinute] = useState('59');
  const [period, setPeriod] = useState('PM');
  const [warningText, setWarningText] = useState(
    '⚠️ No consideration for incomplete and after last date application.'
  );
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const presets = [
    { label: '11:59 PM (Midnight)', h: '11', m: '59', p: 'PM' },
    { label: '05:00 PM (Office Hours)', h: '05', m: '00', p: 'PM' },
    { label: '04:00 PM', h: '04', m: '00', p: 'PM' },
    { label: '12:00 PM (Noon)', h: '12', m: '00', p: 'PM' }
  ];

  useEffect(() => {
    fetchInstructions();
  }, []);

  const fetchInstructions = async () => {
    try {
      setLoading(true);
      const res = await getInstructionsAPI();
      if (res.ok && res.data && res.data.data) {
        const d = res.data.data;
        if (d.deadline_date) setDeadlineDate(d.deadline_date);
        if (d.deadline_time) {
          const parsed = parseTo12Hour(d.deadline_time);
          setHour(parsed.hour);
          setMinute(parsed.minute);
          setPeriod(parsed.period);
        }
        if (d.warning_text) setWarningText(d.warning_text);
        if (Array.isArray(d.instructions) && d.instructions.length > 0) {
          setInstructions(d.instructions);
        } else {
          setInstructions([
            {
              id: 'instr1',
              text: 'The last date for the receipt of hard copy of application will be the same as the closing date of the portal mentioned in the advertisement. Applications found incomplete and/or received after the due date will not be considered.'
            },
            {
              id: 'instr2',
              text: 'This application form should be properly filled. Photocopies of all certificates/testimonials must be attached. Originals will have to be shown at the time of Interview.'
            },
            {
              id: 'instr3',
              text: 'The applicants should send their applications after getting forwarded by their current employer. Printout of the completely filled application form must also be sent to the Dean of Colleges, M.D. University, Rohtak and also to the Director General Higher Education, Shiksha Sadan, Sector 5, Panchkula by the last date given in the advertisement.'
            },
            {
              id: 'instr4',
              text: 'Applications received after the due date or found incomplete will not be considered.'
            }
          ]);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch instructions from server');
    } finally {
      setLoading(false);
    }
  };

  const handleInstructionChange = (index, value) => {
    setInstructions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text: value };
      return copy;
    });
  };

  const handleAddInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      {
        id: `instr_${Date.now()}`,
        text: ''
      }
    ]);
  };

  const handleRemoveInstruction = (index) => {
    if (instructions.length <= 1) {
      alert('At least one instruction point is required.');
      return;
    }
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      setError(null);

      const formattedTime = `${hour}:${minute} ${period}`;
      const payload = {
        deadline_date: deadlineDate,
        deadline_time: formattedTime,
        warning_text: warningText,
        instructions: instructions.filter((item) => item.text.trim().length > 0)
      };

      const res = await updateInstructionsAPI(payload);
      if (res.ok) {
        setMessage('Instructions and Indian timeline updated successfully!');
        setTimeout(() => setMessage(null), 4000);
      } else {
        setError(res.data?.message || 'Failed to save changes');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Server error while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Manage Portal Instructions (Step 1)">
      <div className="admin-instructions-container">
        {message && <div className="admin-alert-success">✓ {message}</div>}
        {error && <div className="admin-alert-error">⚠️ {error}</div>}

        {loading ? (
          <p>Loading current instructions...</p>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Timeline Configuration Card */}
            <div className="admin-instructions-card">
              <h2 className="admin-card-title">Application Timeline & Deadline Settings (Indian Standard Time - IST)</h2>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Closing Date</label>
                  <input
                    type="date"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    className="admin-form-input"
                    required
                  />
                  <span style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Indian Date: <strong>{formatIndianDate(deadlineDate)}</strong> ({formatIndianDateLong(deadlineDate)})
                  </span>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">
                    Closing Time (Indian 12-Hour Style)
                  </label>
                  <div className="admin-time-picker-wrapper">
                    <select
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      className="admin-time-select"
                      aria-label="Hour"
                    >
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>

                    <span className="admin-time-colon">:</span>

                    <select
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      className="admin-time-select"
                      aria-label="Minute"
                    >
                      {[
                        '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '59'
                      ].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>

                    <div className="admin-ampm-group">
                      <button
                        type="button"
                        onClick={() => setPeriod('AM')}
                        className={`admin-ampm-btn ${period === 'AM' ? 'active' : ''}`}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setPeriod('PM')}
                        className={`admin-ampm-btn ${period === 'PM' ? 'active' : ''}`}
                      >
                        PM
                      </button>
                    </div>

                    <span className="admin-ist-badge">IST</span>
                  </div>

                  <div className="admin-presets-row">
                    <span className="admin-preset-label">Quick Presets:</span>
                    {presets.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setHour(p.h);
                          setMinute(p.m);
                          setPeriod(p.p);
                        }}
                        className="admin-preset-chip"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-form-label">Warning Notice Badge</label>
                  <input
                    type="text"
                    value={warningText}
                    onChange={(e) => setWarningText(e.target.value)}
                    className="admin-form-input"
                    placeholder="Notice badge text"
                  />
                </div>

                {/* Live Indian Style Preview Banner */}
                <div className="admin-indian-preview">
                  <div className="admin-indian-preview-header">
                    <span>🇮🇳</span>
                    <span>Live Portal Preview (Candidate View — Indian Format)</span>
                  </div>
                  <div className="admin-indian-preview-banner">
                    <div>
                      Closing Date: <strong>{formatIndianDate(deadlineDate)}</strong> {deadlineDate && `(${formatIndianDateLong(deadlineDate)})`}
                    </div>
                    <div style={{ color: '#059669', fontWeight: 600 }}>•</div>
                    <div>
                      Closing Time: <strong>{hour}:{minute} {period} (IST)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Points Card */}
            <div className="admin-instructions-card">
              <h2 className="admin-card-title">
                Portal Instructions List (Displayed on Step 1)
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '-8px', marginBottom: '16px' }}>
                Each point will appear in the candidate's first step with the exact same clean design.
              </p>

              <div>
                {instructions.map((item, idx) => (
                  <div key={item.id || idx} className="admin-instruction-row">
                    <span className="admin-instruction-badge">{idx + 1}</span>
                    <textarea
                      rows={2}
                      value={item.text}
                      onChange={(e) => handleInstructionChange(idx, e.target.value)}
                      className="admin-instruction-textarea"
                      placeholder={`Enter instruction text for point ${idx + 1}...`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(idx)}
                      className="admin-btn-delete"
                      title="Remove this point"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddInstruction}
                className="admin-btn-add"
              >
                + Add Another Instruction Point
              </button>
            </div>

            {/* Save Button Bar */}
            <div className="admin-save-bar">
              <button
                type="submit"
                disabled={saving}
                className="admin-btn-save"
              >
                {saving ? 'Saving Changes...' : 'Save Instructions'}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
