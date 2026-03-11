import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <motion.main 
            className="landing-page-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <HeroSection />
            <Features />
        </motion.main>
    );
};

export default LandingPage;
