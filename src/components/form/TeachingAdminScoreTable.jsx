import React from 'react';

export default function TeachingAdminScoreTable({ values = {}, errors = {}, onValueChange }) {
  const exp15 = parseFloat(values.teachingExpAbove15 || 0) || 0;
  const v1 = parseFloat(values.adminJointDirector || 0) || 0;
  const v2 = parseFloat(values.adminRegistrar || 0) || 0;
  const v3 = parseFloat(values.adminHead || 0) || 0;
  const totalAdminClaim = v1 + v2 + v3;
  const totalTeachingScore = (exp15 + Math.min(totalAdminClaim, 25)).toFixed(2).replace(/\.00$/, '');

  React.useEffect(() => {
    if (values.teachingTotalScore !== totalTeachingScore) {
      onValueChange('teachingTotalScore', totalTeachingScore);
    }
  }, [totalTeachingScore, values.teachingTotalScore, onValueChange]);

  const handleScoreChange = (fieldId, rawVal, max = 25) => {
    if (rawVal === '') {
      onValueChange(fieldId, '');
      return;
    }
    const val = parseFloat(rawVal);
    if (isNaN(val)) return;
    if (val < 0) {
      onValueChange(fieldId, '0');
    } else if (val > max) {
      onValueChange(fieldId, String(max));
    } else {
      onValueChange(fieldId, rawVal);
    }
  };

  const thStyle = "p-3 border border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs";
  const tdStyle = "p-3 border border-slate-200 text-xs text-slate-700";

  return (
    <div className="space-y-6 my-2 font-sans">
      {/* SECTION A: TEACHING EXPERIENCE */}
      <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">
        <div className="bg-slate-100/80 p-2.5 text-center font-bold text-xs md:text-sm text-slate-800 border-b border-slate-200">
          A. Teaching Experience — Maximum 10 Marks
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className={`${thStyle} w-16 text-center`}>S.No.</th>
                <th className={`${thStyle} text-left`}>Particulars</th>
                <th className={`${thStyle} text-left w-64`}>Marks</th>
                <th className={`${thStyle} w-32 text-center`}>Self-Claimed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">1.</td>
                <td className={tdStyle}>
                  Above 15 years teaching experience <span className="text-red-500 font-bold">*</span>
                  {errors.teachingExpAbove15 && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.teachingExpAbove15}</p>
                  )}
                </td>
                <td className={tdStyle}>1 mark for each year</td>
                <td className="p-3 border border-slate-200 text-center">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max="10"
                    value={values.teachingExpAbove15 || ''}
                    onChange={(e) => handleScoreChange('teachingExpAbove15', e.target.value, 10)}
                    className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">Max: 10</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION B(i): ADMINISTRATIVE SKILL */}
      <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">
        <div className="bg-slate-100/80 p-2.5 text-center font-bold text-xs md:text-sm text-slate-800 border-b border-slate-200">
          B. Assessment of Administrative Skill — Maximum 25 Marks
        </div>
         <div className="bg-slate-100/80 p-2.5 text-left font-bold text-xs md:text-sm text-slate-800 border-b border-slate-200">
          B(i). Experience Of Administrative Responsibilities 
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className={`${thStyle} w-16 text-center`}>S.No.</th>
                <th className={`${thStyle} text-left`}>Particulars</th>
                <th className={`${thStyle} text-left w-64`}>Marks</th>
                <th className={`${thStyle} w-32 text-center`}>Self-Claimed</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">1.</td>
                <td className={tdStyle}>
                  Experience as Joint/Deputy/Assistant Director in Directorate of Higher Education
                </td>
                <td className={tdStyle}>1 mark for each year</td>
                <td className="p-3 border border-slate-200 text-center">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max="25"
                    value={values.adminJointDirector || ''}
                    onChange={(e) => handleScoreChange('adminJointDirector', e.target.value, 25)}
                    className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">Max: 25</div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">2.</td>
                <td className={tdStyle}>
                  Experience as Registrar or any other Administrative post in any University
                </td>
                <td className={tdStyle}>1 mark for each year</td>
                <td className="p-3 border border-slate-200 text-center">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max="25"
                    value={values.adminRegistrar || ''}
                    onChange={(e) => handleScoreChange('adminRegistrar', e.target.value, 25)}
                    className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">Max: 25</div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">3.</td>
                <td className={tdStyle}>
                  Experience as Head of Higher Education Institution (Principal / Officiating Principal / DDO)
                </td>
                <td className={tdStyle}>1 mark for each year</td>
                <td className="p-3 border border-slate-200 text-center">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max="25"
                    value={values.adminHead || ''}
                    onChange={(e) => handleScoreChange('adminHead', e.target.value, 25)}
                    className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">Max: 25</div>
                </td>
              </tr>

              {/* Total Claim Row */}
              <tr className="bg-emerald-50/70 border-t-2 border-slate-200 font-bold">
                <td colSpan={3} className="p-3.5 text-slate-900 text-sm">
                  Total Claim
                </td>
                <td className="p-3.5 text-center text-emerald-800 text-sm font-extrabold">
                  {Math.min(totalAdminClaim, 25)} / 25
                  {totalAdminClaim > 25 && (
                    <span className="block text-[10px] text-amber-700 font-normal mt-0.5">
                      (Capped at 25)
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
