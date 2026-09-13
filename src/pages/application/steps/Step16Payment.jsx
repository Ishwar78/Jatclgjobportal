import React from 'react';
import './Step16Payment.css';

export default function Step16Payment({
  values = {},
  errors = {},
  fileMeta = {},
  config = {},
  uploadingField = null,
  uploadProgress = 0,
  onValueChange,
  onFileChange,
  onFileRemove
}) {
  const screenshot = fileMeta.filePaymentScreenshot;
  const isUploading = uploadingField === 'filePaymentScreenshot';

  return (
    <div className="step16-container">
      <div className="step16-header">
        <h2 className="step16-title">Payment</h2>
        <p className="step16-subtitle">Application fee payment via UPI</p>
      </div>

      {/* Prominent QR Code Card */}
      <div className="step16-qr-card">
        <div className="step16-qr-wrapper">
          <img
            src="/QrCode.jpg"
            alt="UPI Payment QR"
            className="step16-qr-image"
          />
          <p className="step16-qr-caption">Scan with any UPI App (GPay, PhonePe, Paytm)</p>
        </div>

        <div className="step16-merchant-details">
          <div>
            <p className="step16-merchant-label">Merchant Name</p>
            <p className="step16-merchant-name">
              {config.payment_account_display_name || config.name || 'ALL INDIA JAT HEROES’ MEMORIAL COLLEGE'}
            </p>
          </div>

          <div className="step16-fee-callout">
            Pay the application fee of <strong>₹1,000</strong> using the QR code, note down the
            12-digit UTR/Transaction number, and upload the payment screenshot below.
          </div>
        </div>
      </div>

      {/* Payment Details Form */}
      <div className="step16-grid">
        <div className="step16-field-group">
          <label className="step16-label">
            Amount Paid (₹) <span className="step16-required">*</span>
          </label>
          <input
            type="number"
            value={values.paymentAmount || '1000'}
            onChange={(e) => onValueChange('paymentAmount', e.target.value)}
            className={`step16-input ${errors.paymentAmount ? 'step16-input-error' : ''}`}
          />
          {errors.paymentAmount && (
            <p className="step16-error-text">{errors.paymentAmount}</p>
          )}
        </div>

        <div className="step16-field-group">
          <label className="step16-label">
            UPI App / Provider <span className="step16-required">*</span>
          </label>
          <select
            value={values.upiProvider || 'Google Pay'}
            onChange={(e) => onValueChange('upiProvider', e.target.value)}
            className="step16-select"
          >
            <option value="Google Pay">Google Pay</option>
            <option value="PhonePe">PhonePe</option>
            <option value="Paytm">Paytm</option>
            <option value="BHIM">BHIM</option>
            <option value="Bank UPI">Bank UPI</option>
            <option value="Other UPI">Other UPI</option>
          </select>
        </div>

        <div className="step16-field-group step16-full-width">
          <label className="step16-label">
            Account Holder / Payer Name <span className="step16-required">*</span>
          </label>
          <input
            type="text"
            value={values.accountHolderName || ''}
            onChange={(e) => onValueChange('accountHolderName', e.target.value)}
            className={`step16-input ${errors.accountHolderName ? 'step16-input-error' : ''}`}
            placeholder="Name as registered on the bank/UPI account used to pay"
          />
          {errors.accountHolderName && (
            <p className="step16-error-text">{errors.accountHolderName}</p>
          )}
        </div>

        <div className="step16-field-group">
          <label className="step16-label">
            12-Digit UTR / Transaction No. <span className="step16-required">*</span>
          </label>
          <input
            type="text"
            value={values.utrNo || ''}
            onChange={(e) => onValueChange('utrNo', e.target.value)}
            className={`step16-input ${errors.utrNo ? 'step16-input-error' : ''}`}
            placeholder="e.g. 4032XXXXXXXX"
            maxLength={22}
          />
          {errors.utrNo && <p className="step16-error-text">{errors.utrNo}</p>}
        </div>

        <div className="step16-field-group">
          <label className="step16-label">
            Re-enter UTR / Transaction No. <span className="step16-required">*</span>
          </label>
          <input
            type="text"
            value={values.confirmUtrNo || ''}
            onChange={(e) => onValueChange('confirmUtrNo', e.target.value)}
            className={`step16-input ${errors.confirmUtrNo ? 'step16-input-error' : ''}`}
            placeholder="Re-enter same UTR No."
            maxLength={22}
          />
          {errors.confirmUtrNo && (
            <p className="step16-error-text">{errors.confirmUtrNo}</p>
          )}
        </div>

        {/* Screenshot Upload Field with Image Preview & 5MB Limit */}
        <div className="step16-field-group step16-full-width">
          <label className="step16-label">
            Upload Payment Screenshot (UTR Visible) <span className="step16-required">*</span>
          </label>

          {screenshot && screenshot.url ? (
            <div className="step16-file-preview" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <img
                src={screenshot.url}
                alt="Payment Screenshot Preview"
                style={{
                  width: '120px',
                  maxHeight: '140px',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc'
                }}
              />
              <div>
                <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: '13px', color: '#14532d' }}>
                  ✓ {screenshot.originalName || 'Payment Screenshot'}
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label className="step16-replace-btn" style={{ cursor: 'pointer', margin: 0 }}>
                    Change Screenshot
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onFileChange('filePaymentScreenshot', f, 5120);
                      }}
                    />
                  </label>
                  {onFileRemove && (
                    <button
                      type="button"
                      onClick={() => onFileRemove('filePaymentScreenshot')}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        border: '1px solid #fca5a5',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <label
              className={`step16-upload-card ${
                errors.filePaymentScreenshot ? 'step16-input-error' : ''
              }`}
            >
              <input
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange('filePaymentScreenshot', f, 5120);
                }}
              />
              {isUploading ? (
                <p style={{ fontWeight: 600, color: '#2563eb', margin: 0 }}>
                  Uploading... {uploadProgress}%
                </p>
              ) : (
                <>
                  <span style={{ fontSize: '26px', marginBottom: '4px' }}>📷</span>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#334155' }}>
                    Click to choose payment receipt / screenshot
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    Image format (Max 5 MB, JPG/PNG)
                  </p>
                </>
              )}
            </label>
          )}
          {errors.filePaymentScreenshot && (
            <p className="step16-error-text">{errors.filePaymentScreenshot}</p>
          )}
        </div>
      </div>
    </div>
  );
}
