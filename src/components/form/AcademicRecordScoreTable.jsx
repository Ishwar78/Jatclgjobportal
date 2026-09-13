import React from 'react';

export default function AcademicRecordScoreTable({ values = {}, errors = {}, onValueChange }) {
  const m = parseFloat(values.academicMasters || 0) || 0;
  const g = parseFloat(values.academicGrad || 0) || 0;
  const h = parseFloat(values.academic12th || 0) || 0;
  const s = parseFloat(values.academicMatric || 0) || 0;
  const totalAcademic = (m + g + h + s).toFixed(2).replace(/\.00$/, '');

  const handleScoreChange = (fieldId, rawVal, max = 5) => {
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
    <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white my-2 font-sans">
      <div className="bg-slate-100/80 p-2.5 text-center font-bold text-xs md:text-sm text-slate-800 border-b border-slate-200">
        Marks claimed by the applicant according to criteria of selection (Maximum 20 Marks)
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className={`${thStyle} w-16 text-center`}>S.No.</th>
              <th className={`${thStyle} text-left`}>Particulars</th>
              <th className={`${thStyle} text-left w-72`}>Marks Criteria</th>
              <th className={`${thStyle} w-32 text-center`}>Obtained</th>
            </tr>
          </thead>
          <tbody>
            {/* Masters */}
            <tr>
              <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">1.</td>
              <td className={tdStyle}>
                Above 55% marks in Master's degree <span className="text-red-500 font-bold">*</span>
                {errors.academicMasters && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.academicMasters}</p>
                )}
              </td>
              <td className={tdStyle}>0.5 marks for each percentage above 55% (Maximum 5 Marks)</td>
              <td className="p-3 border border-slate-200 text-center">
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="5"
                  value={values.academicMasters || ''}
                  onChange={(e) => handleScoreChange('academicMasters', e.target.value, 5)}
                  className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
                <div className="text-[10px] text-slate-400 mt-1">Max: 5</div>
              </td>
            </tr>

            {/* Graduation */}
            <tr>
              <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">2.</td>
              <td className={tdStyle}>
                Above 55% marks in Graduation <span className="text-red-500 font-bold">*</span>
                {errors.academicGrad && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.academicGrad}</p>
                )}
              </td>
              <td className={tdStyle}>0.4 marks for each percentage above 55% (Maximum 5 Marks)</td>
              <td className="p-3 border border-slate-200 text-center">
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="5"
                  value={values.academicGrad || ''}
                  onChange={(e) => handleScoreChange('academicGrad', e.target.value, 5)}
                  className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
                <div className="text-[10px] text-slate-400 mt-1">Max: 5</div>
              </td>
            </tr>

            {/* 10+2 */}
            <tr>
              <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">3.</td>
              <td className={tdStyle}>Above 55% marks in 10+2/Prep.</td>
              <td className={tdStyle}>0.3 marks for each percentage above 55% (Maximum 5 Marks)</td>
              <td className="p-3 border border-slate-200 text-center">
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="5"
                  value={values.academic12th || ''}
                  onChange={(e) => handleScoreChange('academic12th', e.target.value, 5)}
                  className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
                <div className="text-[10px] text-slate-400 mt-1">Max: 5</div>
              </td>
            </tr>

            {/* Matric */}
            <tr>
              <td className="p-3 border border-slate-200 text-center font-semibold text-slate-500">4.</td>
              <td className={tdStyle}>Above 55% marks in Matriculation</td>
              <td className={tdStyle}>0.2 marks for each percentage above 55% (Maximum 5 Marks)</td>
              <td className="p-3 border border-slate-200 text-center">
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="5"
                  value={values.academicMatric || ''}
                  onChange={(e) => handleScoreChange('academicMatric', e.target.value, 5)}
                  className="w-20 px-2.5 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
                <div className="text-[10px] text-slate-400 mt-1">Max: 5</div>
              </td>
            </tr>

            {/* Total Claim */}
            <tr className="bg-emerald-50/70 border-t-2 border-slate-200 font-bold">
              <td colSpan={3} className="p-3.5 text-slate-900 text-sm">
                Total Claim
              </td>
              <td className="p-3.5 text-center text-emerald-800 text-sm font-extrabold">
                {totalAcademic} / 20
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
