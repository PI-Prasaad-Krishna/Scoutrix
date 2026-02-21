import React from 'react';
import './AthleteDashboard.css'; // Reusing styles for simplicity

const RecruiterDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1 className="dashboard-title">Welcome back, Recruiter!</h1>
                <p className="dashboard-subtitle">Discover top talent tailored to your organization.</p>
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Saved Profiles</h3>
                        <div className="score-value">28</div>
                        <p className="score-label">Athletes bookmarked</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>New Matches</h3>
                        <div className="score-value">5</div>
                        <p className="score-label">Based on your criteria</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Messages</h3>
                        <div className="score-value">2</div>
                        <p className="score-label">Unread inquiries</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
