import React from 'react';

export default function StatusBar() {
    return (
        <footer className="ide-statusbar">
            <div className="status-left">
                <span className="status-item"><i className="fa-solid fa-code-branch"></i> main*</span>
                <span className="status-item"><i className="fa-brands fa-react icon-cyan"></i> React 18 (JSX)</span>
                <span className="status-item"><i className="fa-regular fa-circle-check"></i> 0 errores</span>
            </div>
            <div className="status-right">
                <span className="status-item">UTF-8</span>
                <span className="status-item">HTML5 / CSS3 / React 18</span>
                <span className="status-item"><i className="fa-solid fa-wifi"></i> Conectado</span>
            </div>
        </footer>
    );
}
