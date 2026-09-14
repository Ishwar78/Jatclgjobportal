import React from 'react';
import SelectionCriteriaTables from './SelectionCriteriaTables';
import TeachingAdminScoreTable from './TeachingAdminScoreTable';
import AcademicRecordScoreTable from './AcademicRecordScoreTable';
import ResearchScoreTable from './ResearchScoreTable';
import { formatIndianDate, formatIndianTime } from '../../utils/indianDateTime';

export default function FieldRenderer({
  section,
  values = {},
  tableValues = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  errors = {},
  onValueChange,
  onTableCellChange,
  onAddTableRow,
  onRemoveTableRow,
  onFileChange,
  onOpenNocDraft,
  config = {}
}) {
  if (!section) return null;

  const isTwoColumn = section.layout === 'two-column';

  // Check showIf condition
  const shouldShowField = (field) => {
    if (!field.showIf) return true;
    const { fieldId, equals } = field.showIf;
    return values[fieldId] === equals;
  };

  // Locked fields from candidate registration
  const lockedFields = {
    name: "From your registration — contact the office if this needs to change",
    fatherName: "From your registration — contact the office if this needs to change",
    email: "From your registration — contact the office if this needs to change",
    contactNo1: "From your registration — contact the office if this needs to change"
  };

  // 1. Special render for Step 10: Selection Criteria
  if (section.id === 'criteria_info') {
    const acceptanceField = (section.fields || []).find(f => f.type === 'checkbox') || {
      id: 'criteriaAccepted',
      label: 'I have read and understood the above criteria for selection of Principal',
      required: true
    };
    const isChecked = values[acceptanceField.id] === 'true' || values[acceptanceField.id] === true;
    const fieldError = errors[acceptanceField.id];

    return (
      <div className="space-y-6 font-sans">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Structured Criteria Tables */}
        <SelectionCriteriaTables />

        {/* Mandatory Acceptance Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 p-4 bg-blue-50/80 border-2 border-blue-200 rounded-xl cursor-pointer hover:bg-blue-100/60 transition">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onValueChange(acceptanceField.id, e.target.checked ? 'true' : 'false')}
              className="w-5 h-5 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 flex-shrink-0 cursor-pointer"
            />
            <span className="text-xs md:text-sm text-slate-900 font-semibold leading-relaxed">
              {acceptanceField.label} <span className="text-red-500 font-bold">*</span>
            </span>
          </label>
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1.5">{fieldError}</p>}
        </div>
      </div>
    );
  }


  // Special render for Step 11: Academic Record with Total Claim
  if (section.id === 'academic') {
    return (
      <div className="space-y-6 font-sans">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {section.subtitle}
            </p>
          )}
        </div>

        <AcademicRecordScoreTable
          values={values}
          errors={errors}
          onValueChange={onValueChange}
        />
      </div>
    );
  }

  // 2. Special render for Step 12: Teaching Experience & Admin Skills with Total Claim
  if (section.id === 'teaching_admin') {
    return (
      <div className="space-y-6 font-sans">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {section.subtitle}
            </p>
          )}
        </div>

        <TeachingAdminScoreTable
          values={values}
          errors={errors}
          onValueChange={onValueChange}
        />
      </div>
    );
  }

  // 3. Special render for Step 13/14: Research Score
  if (section.id === 'research') {
    return (
      <div className="space-y-6 font-sans">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {section.subtitle}
            </p>
          )}
        </div>

        <ResearchScoreTable
          values={values}
          errors={errors}
          onValueChange={onValueChange}
        />
      </div>
    );
  }

  // General field renderer for all other steps
  const renderField = (field) => {
    if (!shouldShowField(field)) return null;

    const fieldError = errors[field.id];
    const isLocked = !!lockedFields[field.id];

    // HEADING TYPE
    if (field.type === 'heading') {
      if (field.id === 'nocNote' && values.isPresEmployed === 'Yes') {
        return (
          <div key={field.id} className="col-span-1 md:col-span-2 bg-amber-50 border border-amber-200 rounded-xl p-4 my-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
              {field.label}
            </div>
            {onOpenNocDraft && (
              <button
                type="button"
                onClick={onOpenNocDraft}
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
              >
                Generate NOC Draft
              </button>
            )}
          </div>
        );
      }

      return (
        <div
          key={field.id}
          className="col-span-1 md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 my-2 text-xs md:text-sm text-slate-700 font-medium leading-relaxed shadow-sm"
        >
          {field.label}
        </div>
      );
    }

    // CHECKBOX TYPE
    if (field.type === 'checkbox') {
      const isChecked = values[field.id] === 'true' || values[field.id] === true;
      return (
        <div key={field.id} className="col-span-1 md:col-span-2 my-2">
          <label className="flex items-start gap-3 p-4 bg-blue-50/60 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50 transition">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onValueChange(field.id, e.target.checked ? 'true' : 'false')}
              className="w-5 h-5 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 flex-shrink-0 cursor-pointer"
            />
            <span className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
              {field.label} {field.required && <span className="text-red-500 font-bold">*</span>}
            </span>
          </label>
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1.5">{fieldError}</p>}
        </div>
      );
    }

    // HEADER / INFO BLOCK
    if (field.type === 'heading') {
      return (
        <div key={field.id} className={`col-span-1 md:col-span-2 mb-6 ${field.tableRow ? 'mt-8' : ''}`}>
          <h3 className="text-base font-bold text-slate-800 bg-slate-50/80 p-3 rounded-lg border border-slate-300 text-center">
            {field.label}
          </h3>
        </div>
      );
    }

    // IMAGE BLOCK
    if (field.type === 'image') {
      return (
        <div key={field.id} className="my-6 flex flex-col items-center justify-center w-full">
           <img src={field.src} alt={field.alt || 'Image'} className={field.className || 'max-w-xs md:max-w-sm rounded shadow-md border border-slate-200'} />
           {field.caption && <p className="text-sm font-semibold text-slate-600 mt-3 text-center">{field.caption}</p>}
        </div>
      );
    }

    // SELECT TYPE
    if (field.type === 'select') {
      return (
        <div key={field.id} className="flex flex-col mb-4">
          <label className="text-sm font-bold text-slate-700 mb-1.5">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={values[field.id] || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            className={`w-full px-3.5 py-2.5 text-base bg-white border rounded-lg outline-none transition ${
              fieldError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500'
            }`}
          >
            <option value="">Select...</option>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1">{fieldError}</p>}
        </div>
      );
    }

    // TEXTAREA TYPE
    if (field.type === 'textarea') {
      return (
        <div key={field.id} className="col-span-1 md:col-span-2 flex flex-col mb-4">
          <label className="text-sm font-bold text-slate-700 mb-1.5">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            rows={3}
            value={values[field.id] || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            className={`w-full px-3.5 py-2.5 text-base bg-white border rounded-lg outline-none transition ${
              fieldError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500'
            }`}
          />
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1">{fieldError}</p>}
        </div>
      );
    }

    // DATE TYPE
    if (field.type === 'date') {
      const val = values[field.id] || '';
      return (
        <div key={field.id} className="flex flex-col mb-4">
          <label className="text-sm font-bold text-slate-700 mb-1.5">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            value={val}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            className={`w-full px-3.5 py-2.5 text-base rounded-lg outline-none transition bg-white border ${
              fieldError ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500'
            }`}
          />
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1">{fieldError}</p>}
        </div>
      );
    }

    // FILE UPLOAD TYPE
    if (field.type === 'file') {
      const currentFile = fileMeta[field.id];
      const isUploading = uploadingField === field.id;
      const isPhoto = field.id === 'photo';
      const isSig = field.id === 'signature';
      const limitKB = isPhoto || isSig ? 51 : 512;

      return (
        <div key={field.id} className={`flex flex-col mb-4 ${field.fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
          <label className="text-sm font-bold text-slate-700 mb-1.5">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          {currentFile && currentFile.url ? (
            <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-emerald-600 text-xl">✓</span>
                <div>
                  <p className="text-xs font-bold text-emerald-900 truncate max-w-xs md:max-w-md">
                    {currentFile.originalName || "Uploaded File"}
                  </p>
                  <a
                    href={currentFile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    View / Download File
                  </a>
                </div>
              </div>
              <label className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 bg-white px-3 py-1.5 rounded-lg shadow-sm transition">
                Replace File
                <input
                  type="file"
                  className="hidden"
                  accept={isPhoto || isSig ? "image/jpeg,image/png,image/jpg" : "application/pdf,image/*"}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onFileChange(field.id, f, limitKB);
                  }}
                />
              </label>
            </div>
          ) : (
            <label className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer flex flex-col items-center justify-center transition ${
              fieldError ? 'border-red-400 bg-red-50/40' : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30'
            }`}>
              <input
                type="file"
                className="hidden"
                accept={isPhoto || isSig ? "image/jpeg,image/png,image/jpg" : "application/pdf,image/*"}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange(field.id, f, limitKB);
                }}
              />
              {isUploading ? (
                <div className="w-full py-2">
                  <p className="text-xs font-bold text-blue-600 mb-1">Uploading... {uploadProgress}%</p>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xl mb-1 text-slate-400">📁</span>
                  <p className="text-xs font-semibold text-slate-700">
                    Click to choose file <span className="text-slate-400 font-normal">({isPhoto || isSig ? 'image/*' : 'application/pdf,image/*'})</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Max size: {limitKB >= 1024 ? `${limitKB / 1024} MB` : `${limitKB} KB`}
                  </p>
                </>
              )}
            </label>
          )}
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1">{fieldError}</p>}
        </div>
      );
    }

    // TABLE TYPE (e.g. Step 5 Education Table)
    if (field.type === 'table') {
      const rows = tableValues[field.id] || [];
      const cols = field.columns || [];

      return (
        <div key={field.id} className="col-span-1 md:col-span-2 flex flex-col mb-6">
          <label className="text-sm font-bold text-slate-700 mb-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          <div className={`overflow-x-auto border rounded-xl shadow-sm bg-white ${
            fieldError ? 'border-red-400' : 'border-slate-200'
          }`}>
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200 w-10 text-center">#</th>
                  {field.rowLabels && <th className="p-2.5 border-r border-slate-200 min-w-[140px]">Examination / Degree</th>}
                  {cols.map((c, ci) => (
                    <th key={ci} className="p-2.5 border-r border-slate-200 min-w-[130px]">{c.label || c}</th>
                  ))}
                  {!field.fixedRows && <th className="p-2.5 w-12 text-center">Action</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50/80">
                    <td className="p-2 text-center font-semibold text-slate-400 border-r border-slate-100">
                      {ri + 1}
                    </td>
                    {field.rowLabels && (
                      <td className="p-2 font-semibold text-slate-800 border-r border-slate-100 bg-slate-50/50">
                        {/* If index exceeds predefined list, display 'Additional' */}
                        {field.rowLabels[ri] || 'Additional'}
                      </td>
                    )}
                    {cols.map((c, ci) => {
                      const colKey = c.id || `col_${ci}`;
                      return (
                        <td key={ci} className="p-1.5 border-r border-slate-100">
                          <input
                            type="text"
                            value={r[colKey] || ''}
                            onChange={(e) => onTableCellChange(field.id, ri, colKey, e.target.value)}
                            className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                          />
                        </td>
                      );
                    })}
                    {!field.fixedRows && (
                      <td className="p-1.5 text-center">
                        <button
                          type="button"
                          onClick={() => onRemoveTableRow(field.id, ri)}
                          className="text-slate-400 hover:text-red-600 font-bold text-sm px-1.5 py-0.5 rounded"
                          title="Remove row"
                        >
                          ×
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!field.fixedRows && onAddTableRow && (
            <div className="mt-2 flex justify-start">
              <button
                type="button"
                onClick={() => onAddTableRow(field.id)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-lg transition"
              >
                + Add Another Qualification
              </button>
            </div>
          )}

          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1.5">{fieldError}</p>}
        </div>
      );
    }

    // SCORE EVALUATION TYPE
    if (field.type === 'score') {
      return (
        <div key={field.id} className="flex flex-col mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-800 leading-snug">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.hint && <p className="text-[11px] text-slate-500 mt-0.5">{field.hint}</p>}
            </div>
            <div className="shrink-0 w-32">
              <input
                type="number"
                step="any"
                placeholder="Score"
                value={values[field.id] || ''}
                onChange={(e) => onValueChange(field.id, e.target.value)}
                className={`w-full px-3 py-1.5 text-xs font-bold text-blue-900 bg-white border rounded-lg outline-none text-right transition ${
                  fieldError ? 'border-red-400' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
            </div>
          </div>
          {fieldError && <p className="text-xs text-red-600 font-semibold mt-1">{fieldError}</p>}
        </div>
      );
    }

    // STANDARD TEXT / NUMBER / TEL / EMAIL TYPE
    return (
      <div key={field.id} className={`flex flex-col mb-4 ${field.fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
        <label className="text-sm font-bold text-slate-700 mb-1.5">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
          value={values[field.id] || ''}
          onChange={(e) => onValueChange(field.id, e.target.value)}
          placeholder={field.placeholder || ''}
          readOnly={isLocked}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg outline-none transition ${
            isLocked
              ? 'bg-slate-100/80 border border-slate-200 text-slate-500 cursor-not-allowed'
              : fieldError
              ? 'bg-white border border-red-400 focus:ring-2 focus:ring-red-100'
              : 'bg-white border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500'
          }`}
        />
        {isLocked && (
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            🔒 {lockedFields[field.id]}
          </p>
        )}
        {field.hint && !isLocked && (
          <p className="text-[11px] text-slate-400 mt-1">{field.hint}</p>
        )}
        {fieldError && <p className="text-xs text-red-600 font-semibold mt-1">{fieldError}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Step Title Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            {section.subtitle}
          </p>
        )}
      </div>

      {/* Step 1 Specific: Application Timeline Box */}
      {section.id === 'instructions' && config.deadline_date && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600 text-xl">
              📅
            </div>
            <div>
              <h3 className="font-bold text-red-900 text-base">Application Timeline</h3>
              <p className="text-red-800 text-xs md:text-sm mt-0.5">
                Closing Date: <span className="font-bold">{formatIndianDate(config.deadline_date)}</span> at <span className="font-bold">{formatIndianTime(config.deadline_time || "11:59 PM", true)}</span>
              </p>
            </div>
          </div>
          <div className="bg-white/70 px-4 py-2 rounded-lg border border-red-100 text-red-700 text-xs font-semibold">
            ⚠️ No consideration for incomplete and after last date application.
          </div>
        </div>
      )}

      {/* Step 16 Specific: Scan & Pay QR Code */}
      {section.id === 'payment' && (
        <div className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-sm mb-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center">
              <img
                src="/QrCode.jpg"
                alt="UPI Payment QR"
                className="w-72 h-72 md:w-96 md:h-96 object-contain border rounded-xl p-2 bg-white"
              />
              <p className="text-xs font-bold mt-2 text-slate-700">Scan with any UPI App (GPay, PhonePe, Paytm)</p>
            </div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Merchant Name</p>
                <p className="text-base font-bold text-slate-800">{config.payment_account_display_name || config.name}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl">
                Pay the application fee of <strong>₹1,000</strong> using the QR code, note down the 12-digit UTR/Transaction number, and upload the payment screenshot below.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className={`${isTwoColumn ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1' : 'space-y-1'}`}>
        {(section.fields || []).map(renderField)}
      </div>
    </div>
  );
}
