import React from 'react';

export default function NocDraftModal({
  isOpen,
  onClose,
  candidateName = '',
  fatherName = '',
  currentCollege = '',
  department = '',
  designation = '',
  collegeName = 'ALL INDIA JAT HEROES’ MEMORIAL COLLEGE'
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Pre-filled NOC Certificate Draft
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl font-bold px-2"
          >
            ×
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-800 space-y-4 font-serif leading-relaxed">
          <div className="text-center border-b border-slate-300 pb-3 font-sans">
            <p className="font-bold text-base uppercase tracking-wider text-slate-900">
              {currentCollege || "[Name of Current Employer / College]"}
            </p>
            <p className="text-xs text-slate-500">
              Department: {department || "[Department / Subject]"}
            </p>
          </div>

          <div className="text-center font-bold text-base underline decoration-slate-400 py-1">
            NO OBJECTION CERTIFICATE
          </div>

          <p>
            This is to certify that <strong>{candidateName || "__________________"}</strong>, 
            Son/Daughter of <strong>{fatherName || "__________________"}</strong>, is currently 
            working as <strong>{designation || "__________________"}</strong> in the Department of 
            <strong> {department || "__________________"}</strong> at <strong>{currentCollege || "this institution"}</strong>.
          </p>

          <p>
            This institution has no objection to his/her applying for the post of Principal / Faculty 
            at <strong>{collegeName}</strong>. If selected, he/she will be relieved from his/her duties 
            as per institutional rules.
          </p>

          <div className="pt-10 flex justify-between items-end font-sans text-xs">
            <div>
              <p>Date: ______________</p>
              <p>Place: _____________</p>
            </div>
            <div className="text-right">
              <p className="border-t border-slate-400 pt-2 font-semibold">
                Signature of Competent Authority
              </p>
              <p className="text-slate-500">(With Official Seal/Stamp)</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition"
          >
            Print / Save Draft
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
