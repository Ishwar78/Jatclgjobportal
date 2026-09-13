import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationLayout from '../../components/ApplicationLayout';
import './Personal.css';

export default function Personal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = [
    'Post Applied For',
    'Category',
    'Full Name',
    "Father's Name",
    "Mother's Name",
    'Date of Birth',
    'Email',
    'Mobile Number',
    'WhatsApp Number',
    'Nationality',
    'Present Address',
    'Permanent Address',
  ];

  function handleChange(fieldName, value) {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    setErrors({
      ...errors,
      [fieldName]: false,
    });
  }

  function handleNext() {
    const newErrors = {};

    fields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/application/references');
    }
  }

  return (
    <ApplicationLayout title="Personal Information">
      <div className="form-card personal-page">

        <p className="section-note">
          Enter the personal and contact details exactly as per your official records.
        </p>

        <div className="form-grid">

          {/* Post Applied For */}
          <div>
            <label className="label">
              Post Applied For <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="text"
              value={formData['Post Applied For'] || ''}
              onChange={(e) =>
                handleChange('Post Applied For', e.target.value)
              }
            />

            {errors['Post Applied For'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="label">
              Category <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="text"
              value={formData['Category'] || ''}
              onChange={(e) =>
                handleChange('Category', e.target.value)
              }
            />

            {errors['Category'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="label">
              Full Name <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="text"
              value={formData['Full Name'] || ''}
              onChange={(e) =>
                handleChange('Full Name', e.target.value)
              }
            />

            {errors['Full Name'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Father's Name */}
          <div>
            <label className="label">
              Father's Name <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="text"
              value={formData["Father's Name"] || ''}
              onChange={(e) =>
                handleChange("Father's Name", e.target.value)
              }
            />

            {errors["Father's Name"] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Mother's Name */}
          <div>
            <label className="label">
              Mother's Name <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="text"
              value={formData["Mother's Name"] || ''}
              onChange={(e) =>
                handleChange("Mother's Name", e.target.value)
              }
            />

            {errors["Mother's Name"] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label">
              Date of Birth <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="date"
              value={formData['Date of Birth'] || ''}
              onChange={(e) =>
                handleChange('Date of Birth', e.target.value)
              }
            />

            {errors['Date of Birth'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              Email <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="email"
              value={formData['Email'] || ''}
              onChange={(e) =>
                handleChange('Email', e.target.value)
              }
            />

            {errors['Email'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="label">
              Mobile Number <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="tel"
              value={formData['Mobile Number'] || ''}
              onChange={(e) =>
                handleChange('Mobile Number', e.target.value)
              }
            />

            {errors['Mobile Number'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="label">
              WhatsApp Number <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="tel"
              value={formData['WhatsApp Number'] || ''}
              onChange={(e) =>
                handleChange('WhatsApp Number', e.target.value)
              }
            />

            {errors['WhatsApp Number'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label className="label">
              Nationality <span className="req">*</span>
            </label>

            <input
              className="form-control"
              type="text"
              value={formData['Nationality'] || ''}
              onChange={(e) =>
                handleChange('Nationality', e.target.value)
              }
            />

            {errors['Nationality'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Present Address */}
          <div>
            <label className="label">
              Present Address <span className="req">*</span>
            </label>

            <textarea
              className="form-control"
              rows="4"
              value={formData['Present Address'] || ''}
              onChange={(e) =>
                handleChange('Present Address', e.target.value)
              }
            />

            {errors['Present Address'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

          {/* Permanent Address */}
          <div>
            <label className="label">
              Permanent Address <span className="req">*</span>
            </label>

            <textarea
              className="form-control"
              rows="4"
              value={formData['Permanent Address'] || ''}
              onChange={(e) =>
                handleChange('Permanent Address', e.target.value)
              }
            />

            {errors['Permanent Address'] && (
              <div className="field-error">
                Required
              </div>
            )}
          </div>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="btn btn-outline"
          >
            Save Draft
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            Save & Continue
          </button>

        </div>

      </div>
    </ApplicationLayout>
  );
}