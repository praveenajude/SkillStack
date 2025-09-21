import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, BookOpen, CheckCircle, Calendar, Plus, ExternalLink, Check } from 'lucide-react';
import { getAllSkills, createSkill, deleteSkill, addResourceToSkill, updateResource, deleteResource } from '../services/api';
import AddSkillModal from '../components/AddSkillModal';
import AddResourceModal from '../components/AddResourceModal';
import './skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (skillData) => {
    try {
      const newSkill = await createSkill(skillData);
      setSkills([...skills, newSkill]);
      setShowAddSkillModal(false);
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(skillId);
        setSkills(skills.filter(skill => skill.id !== skillId));
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleAddResource = (skill) => {
    setSelectedSkill(skill);
    setShowAddResourceModal(true);
  };

  const handleResourceAdded = async (resourceData) => {
    try {
      await addResourceToSkill(selectedSkill.id, resourceData);
      fetchSkills();
      setShowAddResourceModal(false);
      setSelectedSkill(null);
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const handleResourceToggle = async (resourceId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'not_started' : 'completed';
      await updateResource(resourceId, { status: newStatus });
      fetchSkills();
    } catch (error) {
      console.error('Error updating resource status:', error);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteResource(resourceId);
        fetchSkills();
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filterStatus !== 'all') {
      const progress = skill.progress_percentage || 0;
      switch (filterStatus) {
        case 'not_started':
          matchesFilter = progress === 0;
          break;
        case 'in_progress':
          matchesFilter = progress > 0 && progress < 100;
          break;
        case 'completed':
          matchesFilter = progress === 100;
          break;
        default:
          matchesFilter = true;
      }
    }
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="skills">
        <div className="loading">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="skills">
      <div className="skills-header">
        <h1>Your Skills</h1>
        <div className="skills-controls">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <Filter size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Skills</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            className="add-skill-btn"
            onClick={() => setShowAddSkillModal(true)}
          >
            <Plus size={20} />
            Add Skill
          </button>
        </div>
      </div>

      {filteredSkills.length === 0 ? (
        skills.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <BookOpen size={48} />
            </div>
            <h3>No skills added yet</h3>
            <p>Start your learning journey by adding your first skill!</p>
            <button
              className="add-first-skill-btn"
              onClick={() => setShowAddSkillModal(true)}
            >
              <Plus size={20} />
              Add Your First Skill
            </button>
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <Search size={48} />
            </div>
            <h3>No results found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )
      ) : (
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="skill-card" style={{ borderLeftColor: skill.color }}>
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteSkill(skill.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="skill-stats">
                <div className="stat">
                  <BookOpen size={16} />
                  <span>{skill.resources_count} resources</span>
                </div>
                <div className="stat">
                  <CheckCircle size={16} />
                  <span>{skill.progress_percentage}% complete</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-label">Progress</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${skill.progress_percentage}%`,
                      backgroundColor: skill.color
                    }}
                  />
                </div>
                <div className="progress-text">{skill.progress_percentage}%</div>
              </div>

              {/* Resources List */}
              {skill.resources && skill.resources.length > 0 && (
                <div className="resources-section">
                  <div className="resources-list">
                    {skill.resources.map((resource) => (
                      <div key={resource.id} className="resource-item">
                        <div className="resource-content">
                          <button
                            className={`resource-checkbox ${resource.status === 'completed' ? 'checked' : ''}`}
                            onClick={() => handleResourceToggle(resource.id, resource.status)}
                          >
                            {resource.status === 'completed' && <Check size={12} />}
                          </button>
                          
                          <div className="resource-info">
                            <span className={`resource-title ${resource.status === 'completed' ? 'completed' : ''}`}>
                              {resource.title}
                            </span>
                            {resource.link && (
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <button
                          className="resource-delete"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="add-resource-btn"
                onClick={() => handleAddResource(skill)}
              >
                <Plus size={16} />
                Add Resource
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddSkillModal && (
        <AddSkillModal
          onClose={() => setShowAddSkillModal(false)}
          onAdd={handleAddSkill}
        />
      )}

      {showAddResourceModal && selectedSkill && (
        <AddResourceModal
          skill={selectedSkill}
          onClose={() => {
            setShowAddResourceModal(false);
            setSelectedSkill(null);
          }}
          onAdd={handleResourceAdded}
        />
      )}
    </div>
  );
};

export default Skills;
