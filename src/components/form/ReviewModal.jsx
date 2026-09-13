import React, { useState } from 'react';

export default function ReviewModal({
  sections = [],
  values = {},
  tableValues = {},
  fileMeta = {},
  missingFields = [],
  onEditSection,
  onSubmit,
  onSaveForLater,
  submitting = false,
  savingForLater = false,
  submitError = null
}) {
  const [openSections, setOpenSections] = useState(
    sections.map((_, i) => i)
  );

  const toggleSection = (idx) => {
    setOpenSections(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleFinalSubmit = () => {
    if (window.confirm("Are you sure you want to submit your application? Once submitted, no further edits will be permitted.")) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-blue-950">
            Review Your Application
          </h2>
          <p className="text-xs md:text-sm text-blue-800 mt-1">
            Please review all details carefully before final submission. Click "Edit" next to any section to make corrections.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="border border-blue-400 bg-white hover:bg-blue-100 text-blue-900 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition whitespace-nowrap cursor-pointer"
        >
          🖨️ Print Preview
        </button>
      </div>

      {/* Missing Mandatory Fields Warning Banner */}
      {missingFields && missingFields.length > 0 && (
        <div className="validation-error-banner">
          <div className="validation-error-header">
            <span>⚠️</span>
            <span>Incomplete Application — The following {missingFields.length} mandatory field(s) are required:</span>
          </div>
          <ul className="validation-error-list">
            {missingFields.map((m, idx) => (
              <li key={idx}>
                <strong>Step {m.step}:</strong> {m.label}
                <span
                  className="validation-fix-link"
                  onClick={() => onEditSection(m.step)}
                >
                  [Go to Step {m.step}]
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm rounded-xl p-4">
          ⚠️ {submitError}
        </div>
      )}

      {/* Accordion List of Sections */}
      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const isOpen = openSections.includes(idx);
          return (
            <div
              key={sec.id || idx}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div
                onClick={() => toggleSection(idx)}
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">
                    {sec.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSection(idx + 1);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <span className="text-slate-400 text-sm">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {isOpen && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {(sec.fields || [])
                      .filter((f) => f.type !== 'heading')
                      .map((f) => {
                        const val = values[f.id];
                        const file = fileMeta[f.id];
                        const table = tableValues[f.id];

                        return (
                          <div key={f.id} className="bg-white p-3 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block mb-0.5">
                              {f.label}:
                            </span>
                            {f.type === 'file' ? (
                              file && file.url ? (
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 font-semibold hover:underline"
                                >
                                  {file.originalName || "Uploaded Document"}
                                </a>
                              ) : (
                                <span className="text-slate-400 italic">Not uploaded</span>
                              )
                            ) : f.type === 'table' ? (
                              <span className="text-slate-800 font-semibold">
                                {table && table.length ? `${table.length} rows entered` : 'None'}
                              </span>
                            ) : (
                              <span className="text-slate-900 font-medium">
                                {val !== undefined && val !== '' ? String(val) : <em className="text-slate-400">Not provided</em>}
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onSaveForLater}
          disabled={savingForLater}
          className="w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition"
        >
          {savingForLater ? "Saving..." : "Save for Later"}
        </button>

        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={submitting}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition"
        >
          {submitting ? "Submitting Application..." : "Submit Application Final"}
        </button>
      </div>
    </div>
  );
}
