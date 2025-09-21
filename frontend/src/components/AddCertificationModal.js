import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AddCertificationModal.css';

const AddCertificationModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    provided_by: '',
    platform: '',
    certification_url: '',
    notes: ''
  });

  const platforms = [
    { value: 'coursera', label: 'Coursera' },
    { value: 'udemy', label: 'Udemy' },
    { value: 'edx', label: 'edX' },
    { value: 'google', label: 'Google' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'aws', label: 'AWS' },
    { value: 'ibm', label: 'IBM' },
    { value: 'oracle', label: 'Oracle' },
    { value: 'cisco', label: 'Cisco' },
    { value: 'comptia', label: 'CompTIA' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAdd(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Certification</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Certification Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., AWS Certified Solutions Architect, Google Cloud Professional"
              required
              className="form-input"
            />
          </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="provided_by">Provided By (Optional)</label>
            <input
              type="text"
              id="provided_by"
              name="provided_by"
              value={formData.provided_by}
              onChange={handleChange}
              placeholder="e.g., Google, Microsoft, AWS"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="platform">Platform (Optional)</label>
            <select
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Platform</option>
              {platforms.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div className="form-group">
            <label htmlFor="certification_url">Certification URL (Optional)</label>
            <input
              type="url"
              id="certification_url"
              name="certification_url"
              value={formData.certification_url}
              onChange={handleChange}
              placeholder="https://example.com/certificate"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes about this certification..."
              rows="3"
              className="form-textarea"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificationModal;
