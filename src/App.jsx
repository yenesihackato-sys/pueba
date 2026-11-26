import React, { useState } from 'react';
import TopNav from './components/TopNav.jsx';
import Sidebar from './components/Sidebar.jsx';
import MainContent from './components/MainContent.jsx';
import AssistantPanel from './components/AssistantPanel.jsx';
import StatusBar from './components/StatusBar.jsx';

export default function App() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [visitedSections, setVisitedSections] = useState(new Set(['inicio']));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    const handleNavigate = (sectionId) => {
        setActiveSection(sectionId);
        setVisitedSections(prev => new Set([...prev, sectionId]));
        setIsSidebarOpen(false);
        setIsAssistantOpen(false);
    };

    const totalSections = 6;
    const progressPercent = Math.round((visitedSections.size / totalSections) * 100);

    return (
        <div className="app-root">
            <TopNav 
                activeSection={activeSection}
                onToggleSidebar={() => {
                    setIsSidebarOpen(prev => !prev);
                    setIsAssistantOpen(false);
                }}
                onToggleAssistant={() => {
                    setIsAssistantOpen(prev => !prev);
                    setIsSidebarOpen(false);
                }}
            />

            <div className="ide-container">
                <Sidebar 
                    activeSection={activeSection}
                    onNavigate={handleNavigate}
                    isOpen={isSidebarOpen}
                    progressPercent={progressPercent}
                />

                <MainContent 
                    activeSection={activeSection}
                    onNavigate={handleNavigate}
                />

                <AssistantPanel 
                    isOpen={isAssistantOpen}
                    onClose={() => setIsAssistantOpen(false)}
                />
            </div>

            <StatusBar />
        </div>
    );
}
