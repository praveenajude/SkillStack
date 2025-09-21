import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, BookOpen, Award, Layers } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <Layers size={24} />
            </div>
            <div className="logo-text">
              <h1>SkillStack</h1>
              <p>Stack up your skills</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="header-bottom">
        <div className="header-content">
          <nav className="nav">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}`}
            >
              <BarChart3 size={20} />
              Dashboard
            </Link>
            <Link 
              to="/skills" 
              className={`nav-link ${location.pathname === '/skills' ? 'active' : ''}`}
            >
              <BookOpen size={20} />
              Skills
            </Link>
            <Link 
              to="/certifications" 
              className={`nav-link ${location.pathname === '/certifications' ? 'active' : ''}`}
            >
              <Award size={20} />
              Certifications
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
