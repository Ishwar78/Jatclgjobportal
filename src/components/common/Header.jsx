import React, { useState } from 'react';
import ViewLastApplicationModal from './ViewLastApplicationModal';

export default function Header({
  collegeName = "ALL INDIA JAT HEROES’ MEMORIAL COLLEGE",
  tagline = "Rohtak, Haryana",
  logoUrl = "https://udbhhoxrstnjytgxpwje.supabase.co/storage/v1/object/public/tenant-assets/tenants/all-india-jat-heroes-memorial-college/logo-1788680557280.png",
  currentStep = 1,
  totalSteps = 17,
  isReview = false,
  candidate = null,
  onLogout
}) {
  const [showLastAppModal, setShowLastAppModal] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Logout now? Your progress up to your last "Save & Next" is kept — anything typed since then on this page will be lost.')) {
      if (onLogout) onLogout();
    }
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Left: College Logo & Name */}
          <div className="flex items-center gap-3">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={collegeName}
                className="w-11 h-8 object-contain flex-shrink-0"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div>
              <h1 className="text-sm md:text-base font-bold text-slate-900 leading-snug tracking-tight">
                {collegeName}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {tagline}
              </p>
            </div>
          </div>

          {/* Right: Step Indicator & Logout Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Application Portal
              </div>
              <div className="text-xs text-blue-600 font-bold">
                {isReview ? "Review & Submit" : `Step ${currentStep} of ${totalSteps}`}
              </div>
            </div>

            {candidate && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowLastAppModal(true)}
                  title="View your previous submitted application"
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>📄</span> View Last Application
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-semibold text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* View Last Application Modal */}
      <ViewLastApplicationModal
        isOpen={showLastAppModal}
        onClose={() => setShowLastAppModal(false)}
        candidate={candidate}
      />
    </>
  );
}
