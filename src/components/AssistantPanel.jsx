import React, { useState, useEffect, useRef } from 'react';

export default function AssistantPanel({ isOpen, onClose }) {
    const knowledgeBase = [
        {
            keywords: ['hola', 'buenas', 'saludos', 'hey', 'buen dia', 'que tal'],
            answer: "¡Hola! Un gusto saludarte. Soy tu asistente educativo en React. Puedo resolver dudas sobre Inteligencia Artificial, Desarrollo Web, HTML, CSS, JavaScript o React. ¿En qué puedo ayudarte hoy?"
        },
        {
            keywords: ['que es la ia', 'que es inteligencia artificial', 'definicion de ia', 'concepto de ia'],
            answer: "La <strong>Inteligencia Artificial (IA)</strong> es una rama de la informática orientada a crear sistemas y algoritmos capaces de resolver tareas que tradicionalmente requerían inteligencia humana: aprendizaje, razonamiento y toma de decisiones."
        },
        {
            keywords: ['frontend', 'backend', 'diferencia entre frontend y backend'],
            answer: "<strong>Frontend vs Backend:</strong><br><br>• <strong>Frontend:</strong> Es la interfaz visual y la interacción en el navegador (HTML5, CSS3, JavaScript, React).<br>• <strong>Backend:</strong> Es el servidor que almacena la información, gestiona la seguridad y ejecuta la lógica de negocio (Python, Node.js, SQL)."
        },
        {
            keywords: ['que lenguaje aprender', 'primer lenguaje', 'que lenguaje debo aprender'],
            answer: "1. Si deseas crear <strong>sitios y aplicaciones web</strong>: Comienza con <strong>HTML, CSS, JavaScript y React</strong>.<br>2. Si buscas especializarte en <strong>IA y Data Science</strong>: <strong>Python</strong> es el estándar indiscutible."
        },
        {
            keywords: ['para que sirve javascript', 'que es javascript', 'javascript', 'js'],
            answer: "<strong>JavaScript</strong> es el lenguaje nativo de los navegadores web. Permite dotar de dinamismo e interactividad a las páginas, manipular el DOM y construir aplicaciones con bibliotecas como React."
        },
        {
            keywords: ['que es react', 'react', 'porque react'],
            answer: "<strong>React</strong> es una biblioteca declarativa y basada en componentes creada por Meta. Facilita la creación de interfaces de usuario interactivas mediante componentes reutilizables y un DOM virtual eficiente."
        },
        {
            keywords: ['que es un llm', 'llm', 'chatgpt', 'gemini'],
            answer: "Un <strong>LLM (Large Language Model)</strong> es un modelo neuronal entrenado con grandes volúmenes de texto para comprender y redactar lenguaje natural. Ejemplos destacados son <strong>ChatGPT (OpenAI)</strong> y <strong>Gemini (Google)</strong>."
        }
    ];

    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: '¡Hola! Soy tu <strong>AI Learning Assistant</strong> en React. 🚀<br>Pregúntame sobre IA, Desarrollo Web, HTML, CSS, JavaScript o React.',
            time: 'Ahora'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const faqChips = [
        "¿Qué es la IA?",
        "Frontend vs Backend",
        "¿Qué lenguaje aprender?",
        "¿Para qué sirve JS?",
        "¿Qué es React?",
        "¿Qué es un LLM?"
    ];

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = (textToSend) => {
        const query = (textToSend || inputValue).trim();
        if (!query) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setMessages(prev => [...prev, { sender: 'user', text: query, time: timeStr }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const clean = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let reply = `Excelente pregunta. Como asistente educativo de esta plataforma puedo orientarte en:<br><br>
                • <strong>IA & Machine Learning:</strong> modelos, inferencia, ventajas.<br>
                • <strong>Desarrollo Web:</strong> HTML5, CSS3, JS, React, Frontend vs Backend.<br>
                • <strong>Herramientas:</strong> ChatGPT, Gemini, Git y VS Code.`;

            for (const item of knowledgeBase) {
                for (const kw of item.keywords) {
                    const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    if (clean.includes(cleanKw)) {
                        reply = item.answer;
                        break;
                    }
                }
            }

            setMessages(prev => [...prev, { sender: 'bot', text: reply, time: timeStr }]);
            setIsTyping(false);
        }, 450);
    };

    return (
        <aside className={`panel right-panel ${isOpen ? 'open' : ''}`} id="assistant-panel">
            <div className="assistant-header">
                <div className="assistant-brand">
                    <div className="assistant-avatar">
                        <i className="fa-solid fa-robot"></i>
                        <span className="online-dot"></span>
                    </div>
                    <div>
                        <h3 className="assistant-name">AI Learning Assistant</h3>
                        <span className="assistant-status"><i className="fa-brands fa-react"></i> React State Active</span>
                    </div>
                </div>
                <button className="icon-btn close-assistant-btn mobile-only" onClick={onClose} title="Cerrar panel">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className="faq-container">
                <span className="faq-label"><i className="fa-solid fa-bolt"></i> Preguntas frecuentes:</span>
                <div className="faq-chips">
                    {faqChips.map((chip, i) => (
                        <button key={i} className="faq-chip" onClick={() => handleSend(chip)}>
                            {chip}
                        </button>
                    ))}
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.sender}`}>
                        <div className="msg-avatar">
                            <i className={`fa-solid ${msg.sender === 'bot' ? 'fa-robot' : 'fa-user'}`}></i>
                        </div>
                        <div className="msg-content">
                            <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                            <span className="msg-time">{msg.time}</span>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="chat-message bot typing">
                        <div className="msg-avatar"><i className="fa-solid fa-robot"></i></div>
                        <div className="msg-content">
                            <p><i className="fa-solid fa-ellipsis fa-fade"></i> Analizando consulta...</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="Escribe tu pregunta sobre IA o Web..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="chat-send-btn" aria-label="Enviar pregunta">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </aside>
    );
}
