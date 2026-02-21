import React from 'react';
import './AthleteDashboard.css';

const AthleteDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h1 className="dashboard-title">Welcome back, Athlete!</h1>
                <p className="dashboard-subtitle">Here is your latest SPI data and analytics.</p>
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Meta Score</h3>
                        <div className="score-value">845</div>
                        <p className="score-label">Top 5% in your region</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Profile Views</h3>
                        <div className="score-value">124</div>
                        <p className="score-label">+12 this week</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Match Highlights</h3>
                        <div className="score-value">3</div>
                        <p className="score-label">Pending AI analysis</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteDashboard;
