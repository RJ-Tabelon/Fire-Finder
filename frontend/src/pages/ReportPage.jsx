// ─────────────────────────────────────────────────────────────
// ReportPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This component provides an interface to submit their own fire reports.
// It collects a name, latitude, longitude, source, and an automatic timestamp.
// It sends this information to a MongoDB instance that holds the reports.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'; // For managing form and message states
import { useNavigate } from 'react-router-dom'; // For page redirection
import { useBodyScroll } from '../hooks/useBodyScroll';
import axios from 'axios'; // HTTP client to communicate with backend

function ReportPage() {
    const [form, setForm] = useState({
        fireName: '', location: '', latitude: '', longitude: '', source: '', moreInfo: ''}); // User input
    const [message, setMessage] = useState(''); // Feedback message
    const navigate = useNavigate(); // Function to change routes

    // Updates form values dynamically
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission for a new report
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/reports', form); // Send report data to backend
            setMessage('REPORT SUBMITTED SUCCESSFULLY !');
            setTimeout(() => navigate('/map'), 1500); // Go to map after delay
        } catch (err) {
            // Show error message if submission fails
            setMessage(err.response?.data?.message || 'ERROR CREATING REPORT !');
        }
    };

    useBodyScroll(true);

    //Input info is specific to ReportPage, signup style has been maintained bc it looks better
    return (
        <div className="form-container signup-container">
            <h2 className="signup-heading">CREATE REPORT</h2>
            <div className="form-box">
                <form onSubmit={handleSubmit} className="form-style">
                    <input
                        name="fireName"
                        placeholder="Name"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        name="latitude"
                        placeholder="Latitude"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        name="longitude"
                        placeholder="Longitude"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        name="source"
                        placeholder="Source"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        name="moreInfo"
                        placeholder="More Info"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <button type="submit" className="form-button">Submit</button>
                </form>

                <div className="form-signup-wrapper">
                    <p className="form-signup-text">
                        RETURN TO {' '}
                        <span onClick={() => navigate('/map')} className="signup-link">MAP</span>
                    </p>
                </div>
            </div>

            {/* Show response message */}
            {message && (
                <p className={message.startsWith('REPORT') ? 'form-message-success' : 'form-message-error'}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default ReportPage;
