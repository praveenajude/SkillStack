import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, CheckCircle, Target, BookOpen, Award } from 'lucide-react';
import { getDashboardStats } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_skills: 0,
    completed_skills: 0,
    active_skills: 0,
    overall_progress: 0,
    total_resources: 0,
    completed_resources: 0,
    total_certifications: 0,
    total_hours: 0,
    skill_progress: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };


  const skillProgressData = (stats.skill_progress || []).map(skill => ({
    ...skill,
    fill: skill.color || '#8B5CF6' 
  }));

  const completionData = [
    { name: 'Completed', value: stats.overall_progress, color: '#10B981' },
    { name: 'Remaining', value: 100 - stats.overall_progress, color: '#374151' }
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (stats.total_skills === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        
        <div className="empty-dashboard">
          <div className="empty-dashboard-icon">
            <Target size={48} />
          </div>
          <h2>No Skills Added Yet</h2>
          <p>Start your learning journey by adding your first skill!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Overall Progress</h3>
            <div className="stat-value">{stats.overall_progress}%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#3B82F6' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>Skills Completed</h3>
            <div className="stat-value">{stats.completed_skills}/{stats.total_skills}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10B981' }}>
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <div className="stat-value">{stats.active_skills}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#F59E0B' }}>
            <BookOpen size={24} />
          </div>
          <div className="stat-content">
            <h3>Resources Done</h3>
            <div className="stat-value">{stats.completed_resources}/{stats.total_resources}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#8B5CF6' }}>
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>Certifications</h3>
            <div className="stat-value">{stats.total_certifications}</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Skill Progress</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
                  {skillProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Overall Completion</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
