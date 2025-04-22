// ─────────────────────────────────────────────────────────────
// AboutPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// Static About page for FireFinder. Provides overview of the
// project and team members. Styled consistently with FireSafetyPage.
// ─────────────────────────────────────────────────────────────

import Header from '../components/Header.jsx';
import { useEffect } from 'react';
import { useBodyScroll } from '../hooks/useBodyScroll';
import '../styles/about.css';
import brianImage from '../assets/Brian.jpeg';
import rjImage from '../assets/RJ.jpeg';

function AboutPage() {
  useEffect(() => {
    // Makes sure it starts at the top of the page
    window.scrollTo(0, 0);
  }, []);

  const team = [
    { name: 'Dia Fallon', image: brianImage },
    { name: 'RJ Tabelon', image: rjImage },
    { name: 'Brian Paz', image: brianImage },
    { name: 'Asha Miller', image: brianImage }
  ];

  useBodyScroll(true);

  return (
    <div className="about-page">
      <Header />

      <div className="about-content">
        <h2>About</h2>
        <p className="about-overview">
          FireFinder is a wildfire awareness and response web platform built to help
          communities prepare for, monitor, and act on wildfire emergencies in real time.
          With an interactive map, safety guidance, and emergency resources, our goal is to make
          wildfire data more accessible and empower users to respond quickly and confidently.
        </p>
      </div>

      <div className="team-section">
        <h3>Meet the Team</h3>
        <div className="team-grid">
          {team.map((member) => (
            <div className={`team-member ${member.name.toLowerCase().replaceAll(' ', '-')}`} key={member.name}>
              <img
                src={member.image}
                alt={member.name}
                className={`team-photo ${member.name.toLowerCase().split(' ')[0]}-photo`}
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
