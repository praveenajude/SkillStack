import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Trash2, Award, Calendar, ExternalLink } from 'lucide-react';
import { getAllCertifications, createCertification, deleteCertification } from '../services/api';
import AddCertificationModal from '../components/AddCertificationModal';
import './Certifications.css';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCertificationModal, setShowAddCertificationModal] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await getAllCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertification = async (certData) => {
    try {
      console.log('Adding certification with data:', certData);
      const newCert = await createCertification(certData);
      console.log('Certification created successfully:', newCert);
      setCertifications([...certifications, newCert]);
      setShowAddCertificationModal(false);
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Failed to add certification. Please check the console for details.');
    }
  };

  const handleDeleteCertification = async (certId) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await deleteCertification(certId);
        setCertifications(certifications.filter(cert => cert.id !== certId));
      } catch (error) {
        console.error('Error deleting certification:', error);
      }
    }
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="certifications">
        <div className="loading">Loading certifications...</div>
      </div>
    );
  }

  return (
    <div className="certifications">
      <div className="certifications-header">
        <h1>Your Certifications</h1>
        <div className="certifications-controls">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            className="add-certification-btn"
            onClick={() => setShowAddCertificationModal(true)}
          >
            <Plus size={20} />
            Add Certification
          </button>
        </div>
      </div>

      {filteredCertifications.length === 0 ? (
        certifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Award size={48} />
            </div>
            <h3>No certifications added yet</h3>
            <p>Start building your professional credentials by adding your first certification!</p>
            <button
              className="add-first-certification-btn"
              onClick={() => setShowAddCertificationModal(true)}
            >
              <Plus size={20} />
              Add Your First Certification
            </button>
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <Search size={48} />
            </div>
            <h3>No results found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )
      ) : (
        <div className="certifications-grid">
          {filteredCertifications.map((cert) => (
            <div key={cert.id} className="certification-card">
              <div className="certification-header">
                <h3>{cert.name}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCertification(cert.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="certification-content">
                <div className="certification-icon">
                  <Award size={32} />
                </div>
                
                <div className="certification-details">
                  {(cert.provided_by || cert.platform) && (
                    <div className="certification-provider">
                      {cert.provided_by && <strong>{cert.provided_by}</strong>}
                      {cert.provided_by && cert.platform && <span className="certification-separator">•</span>}
                      {cert.platform && <span className="certification-platform">{cert.platform}</span>}
                    </div>
                  )}
                  
                  {cert.notes && (
                    <p className="certification-notes">{cert.notes}</p>
                  )}
                </div>
                
                {cert.certification_url && (
                  <a 
                    href={cert.certification_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certification-url"
                  >
                    <ExternalLink size={16} />
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddCertificationModal && (
        <AddCertificationModal
          onClose={() => setShowAddCertificationModal(false)}
          onAdd={handleAddCertification}
        />
      )}
    </div>
  );
};

export default Certifications;
