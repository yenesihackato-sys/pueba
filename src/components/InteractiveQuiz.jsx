import React, { useState } from 'react';

export default function InteractiveQuiz({ onNavigateHome }) {
    const questions = [
        {
            question: "1. ¿Cuál es el rol primordial de HTML en el desarrollo web moderno?",
            options: [
                "Definir la estructura y el contenido semántico de una página web.",
                "Añadir efectos visuales avanzados, sombras y paletas de color.",
                "Gestionar las bases de datos y la autenticación de usuarios en el servidor.",
                "Compilar código en lenguaje de máquina para la CPU."
            ],
            correct: 0,
            explanation: "¡Correcto! HTML aporta el esqueleto y la estructura semántica de los sitios y componentes web."
        },
        {
            question: "2. ¿Qué tipo de Inteligencia Artificial es la única existente hoy en día?",
            options: [
                "Superinteligencia Artificial (ASI) con conciencia propia.",
                "Inteligencia Artificial Estrecha o Débil (ANI), especializada en tareas específicas.",
                "Inteligencia Artificial General (AGI), capaz de igualar la mente humana en cualquier campo.",
                "Matriz Cuántica Universal autónoma."
            ],
            correct: 1,
            explanation: "¡Exacto! Toda la IA contemporánea (incluyendo ChatGPT, visión por computadora y asistentes) es IA Estrecha (ANI)."
        },
        {
            question: "3. ¿Qué beneficio central ofrece React en el desarrollo web Frontend?",
            options: [
                "Reemplazar por completo el uso de bases de datos relacionales.",
                "Construir interfaces de usuario mediante componentes reutilizables con estado reactivo.",
                "Evitar el uso de hojas de estilo CSS en todo el proyecto.",
                "Aumentar la velocidad del disco duro de la computadora del usuario."
            ],
            correct: 1,
            explanation: "¡Excelente! React permite diseñar componentes independientes y reutilizables que reaccionan a los cambios de estado eficientemente."
        },
        {
            question: "4. ¿Cuál es la principal diferencia entre el Frontend y el Backend?",
            options: [
                "El Frontend se ejecuta en el servidor y el Backend en Photoshop.",
                "El Frontend es la interfaz gráfica que ve el usuario; el Backend gestiona servidores, datos y seguridad.",
                "El Frontend solo usa Python y el Backend solo usa hojas de estilo CSS.",
                "No existe ninguna diferencia; son términos sinónimos."
            ],
            correct: 1,
            explanation: "¡Muy bien! El Frontend vive en el cliente (navegador) y el Backend opera en el servidor custodiando datos y lógica."
        },
        {
            question: "5. ¿Para qué se utiliza GitHub en la industria del software?",
            options: [
                "Para navegar por internet y ver transmisiones en vivo.",
                "Para alojar repositorios Git, colaborar en equipo y llevar control de versiones.",
                "Como sustituto del sistema operativo Windows.",
                "Para fabricar microprocesadores."
            ],
            correct: 1,
            explanation: "¡Perfecto! GitHub es la plataforma en la nube basada en Git que permite trabajar colaborativamente y rastrear cambios en el código."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const currentQ = questions[currentIndex];
    const letters = ['A', 'B', 'C', 'D'];

    const handleSelectOption = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        if (index === currentQ.correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsFinished(false);
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <section className="content-section active">
            <div className="section-header-banner quiz-gradient">
                <div className="header-badge"><i className="fa-solid fa-award"></i> Componente React: Quiz State Machine</div>
                <h2>Cuestionario de Conocimientos</h2>
                <p>Responde 5 preguntas clave sobre Inteligencia Artificial y Desarrollo Web para evaluar tu comprensión.</p>
            </div>

            <div className="quiz-container-card">
                {!isFinished ? (
                    <div>
                        <div className="quiz-tracker">
                            <div className="tracker-info">
                                <span>Pregunta {currentIndex + 1} de {questions.length}</span>
                                <span id="quiz-score-badge">Aciertos: {score}</span>
                            </div>
                            <div className="tracker-bar-bg">
                                <div className="tracker-bar-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        <div className="question-header">
                            <h3>{currentQ.question}</h3>
                        </div>

                        <div className="options-list">
                            {currentQ.options.map((opt, idx) => {
                                let btnClass = "option-btn";
                                if (selectedOption !== null) {
                                    if (idx === currentQ.correct) {
                                        btnClass += " correct";
                                    } else if (idx === selectedOption) {
                                        btnClass += " wrong";
                                    }
                                }
                                return (
                                    <button 
                                        key={idx}
                                        className={btnClass}
                                        onClick={() => handleSelectOption(idx)}
                                        disabled={selectedOption !== null}
                                    >
                                        <span className="option-letter">{letters[idx]}</span>
                                        <span className="option-text">{opt}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedOption !== null && (
                            <div className={`quiz-feedback ${selectedOption === currentQ.correct ? 'success' : 'error'}`}>
                                <div className="feedback-icon">
                                    <i className={`fa-solid ${selectedOption === currentQ.correct ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ fontSize: '1.4rem' }}></i>
                                </div>
                                <div className="feedback-text">
                                    <strong>{selectedOption === currentQ.correct ? '¡Excelente! ' : 'Incorrecto. '}</strong>
                                    {currentQ.explanation}
                                </div>
                            </div>
                        )}

                        {selectedOption !== null && (
                            <div className="quiz-actions">
                                <button className="btn btn-primary" onClick={handleNext}>
                                    {currentIndex === questions.length - 1 ? (
                                        <>Ver Resultados <i className="fa-solid fa-trophy"></i></>
                                    ) : (
                                        <>Siguiente Pregunta <i className="fa-solid fa-arrow-right"></i></>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="quiz-results-screen">
                        <div className="result-badge-circle">
                            <i className={`fa-solid ${score === 5 ? 'fa-crown' : score >= 3 ? 'fa-medal' : 'fa-book-open-reader'}`} style={{ color: score === 5 ? '#facc15' : score >= 3 ? '#38bdf8' : '#a855f7' }}></i>
                        </div>
                        <h3>
                            {score === 5 ? '¡Puntaje Perfecto! Maestro Tech 🚀' : score >= 3 ? '¡Muy Buen Trabajo! Conocimientos Sólidos 👏' : '¡Buen Intento! Sigue Aprendiendo 💡'}
                        </h3>
                        <p className="result-score-text">Tu puntaje final es:</p>
                        <div className="score-display">
                            {score} / {questions.length}
                        </div>
                        <p className="result-summary">
                            {score === 5 
                                ? '¡Impresionante! Has demostrado un dominio absoluto de los conceptos clave de Inteligencia Artificial y Desarrollo Web con React.' 
                                : score >= 3 
                                ? 'Has aprobado con éxito la evaluación. Tienes claros los fundamentos técnicos.' 
                                : 'El aprendizaje es un proceso iterativo. Te recomendamos repasar las lecciones antes de reintentar.'}
                        </p>
                        <div className="result-actions">
                            <button className="btn btn-primary" onClick={handleRestart}>
                                <i className="fa-solid fa-rotate-left"></i> Reintentar Cuestionario
                            </button>
                            <button className="btn btn-secondary" onClick={onNavigateHome}>
                                <i className="fa-solid fa-house"></i> Volver al Inicio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
