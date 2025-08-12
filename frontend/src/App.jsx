import React from "react";
import EventDashboard from "./pages/EventDashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Header Section - Senior Planet Style */}
      <header className="senior-planet-header">
        <div className="header-container">
          <div className="logo-section">
            <h1 className="main-logo">Tech Me Kid</h1>
            <p className="tagline">The World of Technology for All</p>
          </div>

          <nav className="main-navigation">
            <ul className="nav-list">
              <li>
                <button
                  className="nav-link"
                  onClick={() =>
                    document
                      .getElementById("event-search-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() =>
                    document
                      .getElementById("map-container")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Map
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">Event Locator</h2>
            <p className="hero-subtitle">
              Empower Digital Citizens. Connect Passionate Student Volunteers
              with Seniors. Find Workshops and Sessions Near You!
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Live Events Available</button>
              <button className="secondary-btn">
                Student Volunteers Ready
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">
              <span className="floating-emojis">📚💻👵</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <EventDashboard />
      </main>

      {/* Footer */}
      <footer className="senior-planet-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>WHO WE ARE</h3>
            <p>
              Tech Me Kid is the West Coast’s largest student-run platform
              dedicated to teaching seniors technology. As a 501(c)(3)
              nonprofit, we’ve reached over 10,000 older adults, partnered with
              30+ leading sponsors, expanded to five international locations,
              and hosted thousands of tech-learning sessions worldwide. We aim
              to continue expanding this community, empowering each member to
              achieve their personal goals while bridging the generational gap
              through technology.
            </p>
          </div>

          <div className="footer-section">
            <h3>ABOUT US</h3>
            <ul>
              <li>
                <a href="#purpose">Our Purpose</a>
              </li>
              <li>
                <a href="#impact">Impact Areas</a>
              </li>
              <li>
                <a href="#team">Our Team</a>
              </li>
              <li>
                <a href="#sponsors">Our Sponsors</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>GET INVOLVED</h3>
            <ul>
              <li>
                <a href="#newsletter">Sign Up for Newsletters</a>
              </li>
              <li>
                <a href="#donate">Donate</a>
              </li>
              <li>
                <a href="#volunteer">Volunteer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TMK Event Locator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
