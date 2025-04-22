// ─────────────────────────────────────────────────────────────
// FireSafetyPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// A static info page offering guidance before, during, and after
// a wildfire. Includes emergency contact info and helpful links.
// ─────────────────────────────────────────────────────────────

import Header from '../components/Header.jsx';
import { useEffect } from 'react';
import { useBodyScroll } from '../hooks/useBodyScroll';
import '../styles/fireSafety.css';

function FireSafetyPage() {

  // makes sure you can scroll in the fire safety page
  useBodyScroll(true);

  return (
    <div className="fire-safety-page" style={{ overflow: 'auto' }}>
      <Header />
      <div className="fire-safety-content">
        <h2>Wildfire Safety Guide</h2>
        <p className="fire-safety-overview">
          Wildfires can strike unexpectedly, leaving little time to react. 
          Whether you live in a wildfire-prone area or are simply visiting one, being prepared can save lives and property. 
          This guide outlines essential actions to take before, during, and after a wildfire to help you stay safe and informed. 
          From assembling emergency kits to knowing when to evacuate and how to recover, each section offers practical advice and 
          trusted resources to support you through every stage of a wildfire emergency.
        </p>

        <section>
          <h3>BEFORE a Wildfire</h3>
          <ul>
            <li><strong>Assemble a Go-Bag:</strong> Include water, non-perishable food, medications, flashlight, batteries, phone chargers, N95 masks, copies of important documents, and pet supplies.</li>
            <li><strong>Defensible Space:</strong> Clear leaves, brush, and flammable materials at least 30 feet away from your home. Trim tree branches at least 10 feet from chimneys and other trees.</li>
            <li><strong>Home Hardening:</strong> Install ember-resistant vents, seal roof eaves, and use non-combustible roofing and siding materials if possible. Close crawl spaces and deck gaps.</li>
            <li><strong>Emergency Plan:</strong> Designate multiple evacuation routes, choose a family meeting point, and identify emergency contacts. Practice fire drills with all household members.</li>
            <li><strong>Stay Informed:</strong> Sign up for local emergency alerts (e.g. CodeRED or FEMA) and monitor real-time fire maps from Fire Finder.</li>
          </ul>
        </section>

        <section>
          <h3>DURING a Wildfire</h3>
          <ul>
            <li><strong>Evacuate Early:</strong> Don’t wait for mandatory orders. Leave immediately if you feel unsafe — delay can be deadly. Take your emergency kit and pets.</li>
            <li><strong>Prepare Your Home if Time Allows:</strong> Shut windows and doors, leave lights on so your home is visible in smoke, and move flammable furniture away from windows.</li>
            <li><strong>Wear Protective Gear:</strong> Use N95 masks to limit smoke inhalation, long sleeves and pants to protect skin, and sturdy shoes in case you must walk over debris.</li>
            <li><strong>Stay Alert:</strong> Keep your phone charged and tuned into emergency radio stations or trusted fire information sources for route updates and shelter availability.</li>
            <li><strong>Drive Safely:</strong> Use headlights, keep windows up, and beware of reduced visibility or blocked roads. Avoid driving through thick smoke or active flames.</li>
          </ul>
        </section>

        <section>
          <h3>AFTER a Wildfire</h3>
          <ul>
            <li><strong>Wait for Clearance:</strong> Return home only when local officials confirm it’s safe. Wildfire areas may have downed power lines, toxic ash, or flare-ups.</li>
            <li><strong>Inspect Your Home:</strong> Check for structural damage, gas leaks, smoldering embers in crawl spaces, roofs, attics, and basements. Do not turn power on if you suspect damage.</li>
            <li><strong>Wear Protective Equipment During Cleanup:</strong> Use gloves, long sleeves, closed-toe shoes, and N95 masks when handling ash or debris to avoid respiratory and skin irritation.</li>
            <li><strong>Document Everything:</strong> Take photos or video of all damage before cleaning up. Contact your insurance provider with a detailed report and receipts.</li>
            <li><strong>Health and Water Safety:</strong> Don’t drink tap water unless authorities say it’s safe. Seek medical attention for symptoms from smoke exposure or injuries.</li>
          </ul>
        </section>

        <section>
        <h3>Emergency Contacts & Resources</h3>
        <ul>
          <li>
            <strong>Emergency:</strong> Dial 911 for immediate help with fire-related danger, evacuation needs, or medical emergencies.
          </li>
          <li>
            <strong>FEMA:</strong> Offers disaster assistance programs, evacuation guidance, and recovery resources after wildfires. 
            Visit: <a href="https://www.fema.gov" target="_blank" rel="noreferrer">www.fema.gov</a>
          </li>
          <li>
            <strong>Ready.gov - Wildfires:</strong> Provides comprehensive wildfire preparedness guides, evacuation planning tools, and safety checklists.
            Visit: <a href="https://www.ready.gov/wildfires" target="_blank" rel="noreferrer">www.ready.gov/wildfires</a>
          </li>
          <li>
            <strong>American Red Cross:</strong> Offers shelter locations, emergency relief services, and assistance with reunification during and after disasters.
            Visit: <a href="https://www.redcross.org" target="_blank" rel="noreferrer">www.redcross.org</a>
          </li>
        </ul>
      </section>

      </div>
    </div>
  );
}

export default FireSafetyPage;
