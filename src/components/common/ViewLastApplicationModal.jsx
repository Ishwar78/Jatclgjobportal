import React, { useState, useEffect } from 'react';
import { candidateApi } from '../../api/candidateApi';
import PrintableApplication from '../form/PrintableApplication';

export default function ViewLastApplicationModal({ isOpen, onClose, candidate }) {
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(null);
  const [showFullPrint, setShowFullPrint] = useState(false);

  useEffect(() => {
    if (isOpen && candidate?.registrationId) {
      setLoading(true);
      setShowFullPrint(false);
      candidateApi.getMyApplication(candidate.registrationId)
        .then(res => {
          if (res && res.application) {
            setApplication(res.application);
          } else {
            setApplication(null);
          }
        })
        .catch(err => {
          console.warn('Error fetching application:', err);
          setApplication(null);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, candidate?.registrationId]);

  if (!isOpen) return null;

  const fd = application?.formData || {};
  const files = application?.fileData || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="text-xl">📄</span>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Last Submitted Application</h3>
              <p className="text-xs text-slate-500">Recruitment application history for this account</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold text-lg w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-3"></div>
              <p className="text-sm font-semibold text-slate-600">Loading your application details...</p>
            </div>
          ) : application ? (
            <div className="space-y-6">
              {/* STATUS & POST BANNER */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-md">
                      {application.status || 'Submitted'}
                    </span>
                    <span className="text-xs font-mono text-emerald-800 font-bold">
                      {application.applicationNo}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Applying For: <span className="text-blue-700">{application.postAppliedFor || fd.postAppliedFor || 'Teaching Post'}</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submitted on: {new Date(application.createdAt || Date.now()).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <div className="shrink-0 flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                  >
                    🖨️ Print / PDF
                  </button>
                </div>
              </div>

              {/* CANDIDATE PARTICULARS */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1.5">
                  Candidate Details
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Candidate Name:</span>
                    <strong className="text-slate-800 text-sm">{application.candidateName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Father's Name:</span>
                    <strong className="text-slate-800 text-sm">{application.fatherName || fd.fatherName || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email Address:</span>
                    <span className="text-slate-800 font-medium">{application.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Mobile Number:</span>
                    <span className="text-slate-800 font-medium">{application.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Social Category:</span>
                    <span className="text-slate-800 font-medium">{fd.socialCategory || 'General'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date of Birth:</span>
                    <span className="text-slate-800 font-medium">{fd.dob || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* SCORES SUMMARY */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1.5">
                  Calculated Scores
                </h5>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Part I Academic</span>
                    <strong className="text-blue-700 text-base font-extrabold">{application.academicScore || fd.academicTotal || 0}</strong>
                    <span className="text-[10px] text-slate-400 block">/ 20</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Part II Teaching/Admin</span>
                    <strong className="text-emerald-700 text-base font-extrabold">{application.teachingScore || fd.teachingTotalScore || 0}</strong>
                    <span className="text-[10px] text-slate-400 block">/ 30</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Part III Research</span>
                    <strong className="text-purple-700 text-base font-extrabold">{application.researchScore || fd.resTotal || 0}</strong>
                  </div>
                </div>
              </div>

              {/* PAYMENT SUMMARY */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1.5">
                  Fee Payment
                </h5>
                <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                  <div>
                    <span className="text-slate-500">Amount Paid:</span>{' '}
                    <strong className="text-slate-800 text-sm">₹{application.paymentDetails?.amount || fd.paymentAmount || '1000'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">UTR No:</span>{' '}
                    <strong className="font-mono text-blue-700">{application.paymentDetails?.utrNo || fd.utrNo || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Method:</span>{' '}
                    <span className="font-medium text-slate-700">{application.paymentDetails?.upiProvider || fd.upiProvider || 'UPI'}</span>
                  </div>
                </div>
              </div>

              {/* TOGGLE FULL FORM PREVIEW */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowFullPrint(!showFullPrint)}
                  className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline py-2"
                >
                  {showFullPrint ? '▲ Hide Full Form Preview' : '▼ View Complete Form Preview'}
                </button>
                {showFullPrint && (
                  <div className="mt-4 border border-slate-200 rounded-xl p-4 bg-white max-h-[500px] overflow-y-auto">
                    <PrintableApplication
                      applicationNo={application.applicationNo}
                      candidate={{ ...candidate, ...application }}
                      values={fd}
                      tableValues={fd}
                      fileMeta={files}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* NO APPLICATION FOUND */
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                📝
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                No Submitted Application Found
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                You have not submitted a completed application form yet. Your application is currently saved as a draft. Once you complete all 17 steps and click Final Submit, your application will be saved here and available to download/print at any time.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition cursor-pointer"
              >
                Continue Application Form
              </button>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
