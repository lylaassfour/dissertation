import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom'; // Add this import
import './HomePage.css';

const taglines = [
  "Empowering Seamless Access for SMBs and Non-Profits",
  "Integrate AD with Keycloak Effortlessly",
  "Secure, Scalable, and User-Friendly IAM",
  "Streamline Your Access Management Today"
];

const HomePage = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate(); // Add useNavigate hook
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    setShowAuthButtons(!showAuthButtons);
  };

  const handleAuth = (path) => {
    // Navigate to the specified path (e.g., '/login' or '/signup')
    navigate(path);
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <img src="/accesspilot-logo.png" alt="AccessPilot Logo" className="hero-logo" />
          <div className="hero-heading">
            <h1>Welcome to AccessPilot</h1>
            <p className="subtitle">{taglines[currentTagline]}</p>
          </div>
          <div className="button-container">
            <div className="get-started-container">
              <button onClick={handleGetStarted} className="action-button primary">
                Get Started
              </button>
              {showAuthButtons && (
                <div className="auth-buttons">
                  <button onClick={() => handleAuth('/login')} className="auth-button login">Login</button>
                  <button onClick={() => handleAuth('/signup')} className="auth-button signup">Signup</button>
                </div>
              )}
            </div>
            <a href="#learn-more" className="action-button secondary">Explore Features</a>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <div className="feature-card">
            <div className="feature-card-inner">
              <div className="feature-card-front">
                <span className="feature-icon">🔒</span>
                <h3>Secure Access</h3>
              </div>
              <div className="feature-card-back">
                <h3>Secure Access</h3>
                <p>Robust protocols ensure safe authentication with Windows Server AD and Keycloak integration.</p>
              </div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-card-inner">
              <div className="feature-card-front">
                <span className="feature-icon">📊</span>
                <h3>Smart Insights</h3>
              </div>
              <div className="feature-card-back">
                <h3>Smart Insights</h3>
                <p>AI-powered analytics to monitor access patterns and enhance security.</p>
              </div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-card-inner">
              <div className="feature-card-front">
                <span className="feature-icon">🔗</span>
                <h3>Easy Integration</h3>
              </div>
              <div className="feature-card-back">
                <h3>Easy Integration</h3>
                <p>Seamlessly connect with existing AD infrastructure and third-party tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section id="learn-more" className="learn-more-section">
        <div className="learn-more-content">
          <h2>About AccessPilot</h2>
          <p className="brief">
            AccessPilot is your go-to solution for secure and efficient access management, tailored for SMBs and non-profits. By bridging Windows Server Active Directory with Keycloak, it offers a powerful, user-friendly platform to manage authentication and authorization. Enjoy centralized control, smart analytics, and seamless integration with your existing IT infrastructure, all while ensuring top-tier security.
          </p>

          <h2>Getting Started with AccessPilot</h2>
          <div className="guide">
            <h3>Step-by-Step Guide</h3>
            <ol className="guide-list">
              <li>
                <strong>Sign Up: </strong>
                <p>Create an account with a secure password. Syncs with Keycloak and AD for instant access.</p>
              </li>
              <li>
                <strong>Log In: </strong>
                <p>Access your account securely via Keycloak, integrated with your AD policies.</p>
              </li>
              <li>
                <strong>Explore Dashboard: </strong>
                <p>Monitor user activity and manage access with an intuitive interface.</p>
              </li>
              <li>
                <strong>Manage Profile: </strong>
                <p>Update your details and roles for accurate access control.</p>
              </li>
              <li>
                <strong>Smart Insights: </strong>
                <p>Use AI analytics to optimize security and access policies.</p>
              </li>
              <li>
                <strong>Integrate Systems: </strong>
                <p>Connect AccessPilot with your AD and other tools effortlessly.</p>
              </li>
              <li>
                <strong>Ensure Security: </strong>
                <p>Leverage robust protocols to protect your organization’s data.</p>
              </li>
            </ol>
          </div>

          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            {[
              {
                question: "What is AccessPilot?",
                answer: "AccessPilot is an IAM solution that integrates Windows Server AD with Keycloak for secure access management."
              },
              {
                question: "Who can use AccessPilot?",
                answer: "It’s designed for SMBs and non-profits looking for scalable, secure access control."
              },
              {
                question: "How secure is AccessPilot?",
                answer: "It uses robust protocols, secure authentication, and AI-driven monitoring to ensure safety."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${faqOpen === index ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                </button>
                {faqOpen === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;