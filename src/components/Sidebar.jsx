import React from 'react';

export default function Sidebar({ activeSection, onNavigate, isOpen, progressPercent }) {
    const navItems = [
        { id: 'inicio', label: 'Inicio', ext: '.edu', icon: 'fa-solid fa-house-chimney icon-cyan' },
        { id: 'ia', label: 'Inteligencia Artificial', ext: '.ai', icon: 'fa-solid fa-microchip icon-purple' },
        { id: 'web', label: 'Desarrollo Web & React', ext: '.html', icon: 'fa-solid fa-code icon-blue' },
        { id: 'lenguajes', label: 'Lenguajes de Programación', ext: '.dev', icon: 'fa-solid fa-terminal icon-yellow' },
        { id: 'herramientas', label: 'Herramientas de IA y Web', ext: '.tools', icon: 'fa-solid fa-toolbox icon-orange' },
        { id: 'cuestionario', label: 'Ejercicios y Cuestionario', ext: '.test', icon: 'fa-solid fa-square-check icon-green' }
    ];

    return (
        <aside className={`panel left-panel ${isOpen ? 'open' : ''}`} id="sidebar">
            <div className="sidebar-header">
                <span className="explorer-title"><i className="fa-solid fa-compass"></i> EXPLORADOR REACT</span>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section-label">CURRICULUM EDUCATIVO</div>

                <ul className="nav-list">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button 
                                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => onNavigate(item.id)}
                            >
                                <i className={`nav-icon ${item.icon}`}></i>
                                <span className="nav-text">{item.label}</span>
                                <span className="file-ext">{item.ext}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="nav-section-label mt-4">PROGRESO DEL ESTUDIANTE</div>
                <div className="progress-box">
                    <div className="progress-header">
                        <span>Avance Global</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <p className="progress-hint">
                        <i className="fa-regular fa-lightbulb"></i> Explora los módulos y completa el test final.
                    </p>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-chip">
                    <div className="user-avatar">
                        <i className="fa-solid fa-user-astronaut"></i>
                    </div>
                    <div className="user-info">
                        <span className="user-name">Estudiante Dev</span>
                        <span className="user-role"><i className="fa-brands fa-react"></i> React Component</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
