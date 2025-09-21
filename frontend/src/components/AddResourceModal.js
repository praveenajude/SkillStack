import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import './AddResourceModal.css';

const AddResourceModal = ({ skill, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    resource_type: 'video',
    platform: 'youtube',
    link: '',
    status: 'not_started',
    hours_spent: 0,
    notes: '',
    due_date: ''
  });

  const resourceTypes = [
    { value: 'video', label: 'Video' },
    { value: 'course', label: 'Course' },
    { value: 'article', label: 'Article' },
    { value: 'certification', label: 'Certification' }
  ];

  const platforms = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'udemy', label: 'Udemy' },
    { value: 'coursera', label: 'Coursera' },
    { value: 'edx', label: 'edX' },
    { value: 'khan_academy', label: 'Khan Academy' },
    { value: 'freecodecamp', label: 'FreeCodeCamp' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
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
    if (formData.title.trim()) {
      const cleanedData = {
        ...formData,
        hours_spent: parseFloat(formData.hours_spent) || 0,
        due_date: formData.due_date || null
      };
      onAdd(cleanedData);
      setFormData({
        title: '',
        resource_type: 'video',
        platform: 'youtube',
        link: '',
        status: 'not_started',
        hours_spent: 0,
        notes: '',
        due_date: ''
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Resource to {skill?.name}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Resource Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., React Hooks Tutorial"
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="resource_type">Resource Type</label>
              <select
                id="resource_type"
                name="resource_type"
                value={formData.resource_type}
                onChange={handleChange}
                className="form-select"
              >
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="platform">Platform</label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="form-select"
              >
                {platforms.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="link">Resource Link (Optional)</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hours_spent">Hours Spent</label>
              <input
                type="number"
                id="hours_spent"
                name="hours_spent"
                value={formData.hours_spent}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="due_date">Due Date (Optional)</label>
            <div className="date-input-container">
              <Calendar size={20} className="date-icon" />
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="form-input date-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes about this resource..."
              rows="3"
              className="form-textarea"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;
