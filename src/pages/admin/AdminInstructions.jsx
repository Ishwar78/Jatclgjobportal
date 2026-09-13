import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/Layout';
import { getInstructionsAPI, updateInstructionsAPI } from '../../lib/api';
import './AdminInstructions.css';

export default function AdminInstructions() {
  const [deadlineDate, setDeadlineDate] = useState('2026-03-31');
  const [deadlineTime, setDeadlineTime] = useState('23:59:59');
  const [warningText, setWarningText] = useState(
    '⚠️ No consideration for incomplete and after last date application.'
  );
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
        if (d.deadline_time) setDeadlineTime(d.deadline_time);
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

      const payload = {
        deadline_date: deadlineDate,
        deadline_time: deadlineTime,
        warning_text: warningText,
        instructions: instructions.filter((item) => item.text.trim().length > 0)
      };

      const res = await updateInstructionsAPI(payload);
      if (res.ok) {
        setMessage('Instructions and timeline updated successfully!');
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
              <h2 className="admin-card-title">Application Timeline & Deadline Settings</h2>

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
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Closing Time</label>
                  <input
                    type="text"
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                    className="admin-form-input"
                    placeholder="e.g. 23:59:59 or 05:00 PM"
                    required
                  />
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
