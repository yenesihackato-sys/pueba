import React from 'react';

export default function TopNav({ activeSection, onToggleSidebar, onToggleAssistant }) {
    const fileNames = {
        'inicio': 'inicio.edu',
        'ia': 'inteligencia-artificial.ai',
        'web': 'desarrollo-web.html',
        'lenguajes': 'lenguajes.dev',
        'herramientas': 'herramientas.tools',
        'cuestionario': 'evaluacion.test'
    };

    return (
        <header className="top-nav">
            <div className="top-nav-left">
                <button 
                    id="toggle-sidebar-btn" 
                    className="icon-btn mobile-only" 
                    onClick={onToggleSidebar}
                    aria-label="Abrir Menú"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="ide-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="brand-title">
                    <i className="fa-solid fa-brain brand-icon"></i>
                    <span className="brand-text">AI & WEB DEVELOPMENT</span>
                    <span className="brand-badge"><i className="fa-brands fa-react"></i> React 18</span>
                </div>
            </div>

            <div className="top-nav-center">
                <div className="breadcrumb">
                    <i className="fa-solid fa-folder-open"></i>
                    <span>workspace</span>
                    <i className="fa-solid fa-chevron-right separator"></i>
                    <span className="active-file">{fileNames[activeSection] || 'inicio.edu'}</span>
                </div>
            </div>

            <div className="top-nav-right">
                <div className="status-indicator">
                    <span className="status-pulse"></span>
                    <span className="status-label">React Activo</span>
                </div>
                <button 
                    id="toggle-assistant-btn" 
                    className="icon-btn mobile-only" 
                    onClick={onToggleAssistant}
                    aria-label="Abrir Asistente"
                >
                    <i className="fa-solid fa-robot"></i>
                </button>
            </div>
        </header>
    );
}
