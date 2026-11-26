import React, { useState } from 'react';
import InteractiveQuiz from './InteractiveQuiz.jsx';

export default function MainContent({ activeSection, onNavigate }) {
    const tabs = [
        { id: 'inicio', label: 'inicio.edu', icon: 'fa-solid fa-file-code icon-cyan' },
        { id: 'ia', label: 'inteligencia-artificial.ai', icon: 'fa-solid fa-brain icon-purple' },
        { id: 'web', label: 'desarrollo-web.html', icon: 'fa-solid fa-globe icon-blue' },
        { id: 'lenguajes', label: 'lenguajes.dev', icon: 'fa-solid fa-terminal icon-yellow' },
        { id: 'herramientas', label: 'herramientas.tools', icon: 'fa-solid fa-wrench icon-orange' },
        { id: 'cuestionario', label: 'evaluacion.test', icon: 'fa-solid fa-circle-question icon-green' }
    ];

    const [sentimentInput, setSentimentInput] = useState('');
    const [sentimentResult, setSentimentResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [labTheme, setLabTheme] = useState('neon');
    const [labClicks, setLabClicks] = useState(0);
    const [labConsole, setLabConsole] = useState('Console: Estado React inicializado. Listo para interacciones.');

    const [copiedSnippet, setCopiedSnippet] = useState(null);

    const handleAnalyzeSentiment = () => {
        if (!sentimentInput.trim()) {
            setSentimentResult({ type: 'warning', text: 'Por favor, escribe un comentario para analizar.' });
            return;
        }
        setIsAnalyzing(true);
        setTimeout(() => {
            const lower = sentimentInput.toLowerCase();
            const positiveWords = ['excelente', 'increible', 'encanta', 'fascinante', 'bueno', 'genial', 'facil', 'futuro', 'amor', 'feliz', 'perfecto', 'util', 'rapido'];
            const negativeWords = ['malo', 'dificil', 'odio', 'horrible', 'lento', 'error', 'aburrido', 'complicado', 'peligroso', 'peor', 'falla'];
            
            let score = 0;
            const words = lower.split(/\s+/);
            words.forEach(w => {
                const cleaned = w.replace(/[^a-záéíóúñ]/g, '');
                if (positiveWords.includes(cleaned)) score++;
                if (negativeWords.includes(cleaned)) score--;
            });

            if (score > 0) {
                setSentimentResult({ type: 'positive', text: 'Predicción: Sentimiento Positivo (Confianza estimada: 94.2%)' });
            } else if (score < 0) {
                setSentimentResult({ type: 'negative', text: 'Predicción: Sentimiento Crítico o Negativo (Confianza estimada: 89.7%)' });
            } else {
                setSentimentResult({ type: 'neutral', text: 'Predicción: Sentimiento Neutro o Informativo (Confianza estimada: 78.5%)' });
            }
            setIsAnalyzing(false);
        }, 400);
    };

    const handleCopyCode = (id, codeText) => {
        navigator.clipboard.writeText(codeText);
        setCopiedSnippet(id);
        setTimeout(() => setCopiedSnippet(null), 2000);
    };

    return (
        <main className="panel center-panel" id="main-content">
            <div className="editor-tabs">
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        className={`tab ${activeSection === tab.id ? 'active' : ''}`}
                        onClick={() => onNavigate(tab.id)}
                    >
                        <i className={`tab-icon ${tab.icon}`}></i>
                        <span>{tab.label}</span>
                    </div>
                ))}
            </div>

            <div className="content-scroll-area">
                {activeSection === 'inicio' && (
                    <section className="content-section active">
                        <div className="hero-banner">
                            <div className="hero-badge">
                                <i className="fa-brands fa-react"></i> Bienvenidos a la Educación del Mañana • React 18
                            </div>
                            <h1 className="hero-title">Descubre el futuro de la tecnología</h1>
                            <p className="hero-subtitle">Aprende Inteligencia Artificial y Desarrollo Web de manera sencilla e interactiva</p>
                            
                            <div className="hero-actions">
                                <button className="btn btn-primary" onClick={() => onNavigate('ia')}>
                                    <i className="fa-solid fa-rocket"></i> Iniciar Ruta de Aprendizaje
                                </button>
                                <button className="btn btn-secondary" onClick={() => onNavigate('cuestionario')}>
                                    <i className="fa-solid fa-clipboard-check"></i> Probar Cuestionario
                                </button>
                            </div>
                        </div>

                        <h2 className="section-title"><i className="fa-solid fa-cubes"></i> Módulos de Aprendizaje</h2>
                        <div className="modules-grid">
                            <div className="module-card card-ia" onClick={() => onNavigate('ia')}>
                                <div className="card-icon-box"><i className="fa-solid fa-microchip"></i></div>
                                <h3>Inteligencia Artificial</h3>
                                <p>Comprende qué es la IA, redes neuronales, Machine Learning, sus aplicaciones reales y el debate ético moderno.</p>
                                <div className="card-footer-info">
                                    <span><i className="fa-regular fa-clock"></i> 5 Lecciones</span>
                                    <span className="card-link">Explorar <i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                            </div>

                            <div className="module-card card-web" onClick={() => onNavigate('web')}>
                                <div className="card-icon-box"><i className="fa-solid fa-code"></i></div>
                                <h3>Desarrollo Web & React</h3>
                                <p>Domina los fundamentos de la web moderna: HTML, CSS, JavaScript y la arquitectura por componentes con React.</p>
                                <div className="card-footer-info">
                                    <span><i className="fa-regular fa-clock"></i> 5 Lecciones</span>
                                    <span className="card-link">Explorar <i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                            </div>

                            <div className="module-card card-lenguajes" onClick={() => onNavigate('lenguajes')}>
                                <div className="card-icon-box"><i className="fa-solid fa-terminal"></i></div>
                                <h3>Lenguajes de Programación</h3>
                                <p>Conoce los lenguajes fundamentales como Python para IA, JavaScript/TypeScript para la web y su interoperabilidad.</p>
                                <div className="card-footer-info">
                                    <span><i className="fa-regular fa-clock"></i> 3 Lenguajes</span>
                                    <span className="card-link">Explorar <i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                            </div>

                            <div className="module-card card-tools" onClick={() => onNavigate('herramientas')}>
                                <div className="card-icon-box"><i className="fa-solid fa-toolbox"></i></div>
                                <h3>Herramientas Esenciales</h3>
                                <p>Descubre el poder de ChatGPT, Google Gemini, GitHub y Visual Studio Code para acelerar tu desarrollo.</p>
                                <div className="card-footer-info">
                                    <span><i className="fa-regular fa-clock"></i> 4 Herramientas</span>
                                    <span className="card-link">Explorar <i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                            </div>

                            <div className="module-card card-quiz" onClick={() => onNavigate('cuestionario')}>
                                <div className="card-icon-box"><i className="fa-solid fa-award"></i></div>
                                <h3>Retos y Cuestionario</h3>
                                <p>Pon a prueba tus conocimientos con nuestro cuestionario interactivo de 5 preguntas y obtén tu calificación al instante.</p>
                                <div className="card-footer-info">
                                    <span><i className="fa-solid fa-check-double"></i> 5 Preguntas</span>
                                    <span className="card-link">Evaluarme <i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                            </div>
                        </div>

                        <div className="interactive-preview-box">
                            <div className="preview-header">
                                <i className="fa-solid fa-lightbulb"></i>
                                <span>¿Por qué unir Inteligencia Artificial y Desarrollo Web?</span>
                            </div>
                            <div className="preview-body">
                                <p>El desarrollo web actual integra modelos de lenguaje, visión por computadora y análisis predictivo en tiempo real para ofrecer experiencias personalizadas. ¡Aquí aprenderás cómo se conectan ambos mundos!</p>
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'ia' && (
                    <section className="content-section active">
                        <div className="section-header-banner ia-gradient">
                            <div className="header-badge"><i className="fa-solid fa-brain"></i> Módulo 01</div>
                            <h2>Inteligencia Artificial (IA)</h2>
                            <p>Aprende cómo las máquinas procesan información, aprenden de datos y resuelven problemas complejos.</p>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">01</span>
                                <h3>¿Qué es la Inteligencia Artificial?</h3>
                            </div>
                            <p className="topic-text">
                                La <strong>Inteligencia Artificial (IA)</strong> es una disciplina de las ciencias de la computación dedicada a crear sistemas y algoritmos capaces de realizar tareas que habitualmente requieren de la inteligencia humana: razonamiento, aprendizaje automático y reconocimiento de patrones.
                            </p>
                            <div className="callout callout-info">
                                <i className="fa-solid fa-circle-info"></i>
                                <div>
                                    <strong>Dato clave:</strong> La IA no "piensa" como un ser humano; utiliza modelos matemáticos y estadísticos para calcular la probabilidad de la respuesta más acertada según datos previos.
                                </div>
                            </div>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">02</span>
                                <h3>¿Cómo funciona la IA? El Ciclo de Aprendizaje</h3>
                            </div>
                            <p className="topic-text">
                                En la IA el sistema aprende las reglas por sí mismo analizando miles o millones de ejemplos a través de un ciclo continuo:
                            </p>

                            <div className="ai-flowchart">
                                <div className="flow-step">
                                    <div className="flow-icon"><i className="fa-solid fa-database"></i></div>
                                    <h4>1. Recolección de Datos</h4>
                                    <p>Fotos, textos, audios o mediciones del mundo real.</p>
                                </div>
                                <div className="flow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                                <div className="flow-step">
                                    <div className="flow-icon"><i className="fa-solid fa-gears"></i></div>
                                    <h4>2. Entrenamiento</h4>
                                    <p>Algoritmos de Machine Learning ajustan parámetros matemáticos.</p>
                                </div>
                                <div className="flow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                                <div className="flow-step">
                                    <div className="flow-icon"><i className="fa-solid fa-network-wired"></i></div>
                                    <h4>3. Modelo Resultante</h4>
                                    <p>Estructura neuronal optimizada para reconocer patrones.</p>
                                </div>
                                <div className="flow-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                                <div className="flow-step">
                                    <div className="flow-icon"><i className="fa-solid fa-bullseye"></i></div>
                                    <h4>4. Inferencia</h4>
                                    <p>Predice o genera respuestas ante datos nuevos.</p>
                                </div>
                            </div>

                            <div className="interactive-simulator">
                                <h4><i className="fa-solid fa-flask"></i> Simulador Práctico: Clasificador de Comentarios (Estado React)</h4>
                                <p>Escribe un comentario y el modelo heurístico clasificará el sentimiento en tiempo real:</p>
                                <div className="sim-input-row">
                                    <input 
                                        type="text" 
                                        className="sim-input" 
                                        placeholder="Ej: Me encanta aprender a programar, es fascinante..."
                                        value={sentimentInput}
                                        onChange={(e) => setSentimentInput(e.target.value)}
                                    />
                                    <button className="btn btn-primary" onClick={handleAnalyzeSentiment} disabled={isAnalyzing}>
                                        <i className="fa-solid fa-wand-magic-sparkles"></i> {isAnalyzing ? 'Analizando...' : 'Analizar Sentimiento'}
                                    </button>
                                </div>
                                <div className="sim-result">
                                    {!sentimentResult && <span className="placeholder-text">Esperando tu texto para predecir...</span>}
                                    {sentimentResult && (
                                        <div style={{ color: sentimentResult.type === 'positive' ? 'var(--accent-green)' : sentimentResult.type === 'negative' ? 'var(--accent-orange)' : 'var(--cyan-primary)', fontWeight: 600 }}>
                                            <i className={`fa-solid ${sentimentResult.type === 'positive' ? 'fa-face-smile' : sentimentResult.type === 'negative' ? 'fa-face-frown' : 'fa-face-meh'}`}></i> {sentimentResult.text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">03</span>
                                <h3>Tipos de Inteligencia Artificial</h3>
                            </div>
                            <div className="cards-subgrid">
                                <div className="subcard">
                                    <div className="subcard-tag tag-ani">Actual</div>
                                    <h4>IA Estrecha o Débil (ANI)</h4>
                                    <p>Especializada en una única tarea específica (reconocer rostros, jugar ajedrez, traducir texto). Es la única IA existente hoy en día.</p>
                                </div>
                                <div className="subcard">
                                    <div className="subcard-tag tag-agi">En Desarrollo</div>
                                    <h4>IA General (AGI)</h4>
                                    <p>Hipotética IA con la habilidad de entender, aprender y aplicar conocimiento en cualquier área al mismo nivel cognitivo que un ser humano.</p>
                                </div>
                                <div className="subcard">
                                    <div className="subcard-tag tag-asi">Teórica</div>
                                    <h4>Superinteligencia (ASI)</h4>
                                    <p>Concepto teórico de una máquina cuya inteligencia superaría ampliamente a toda la mente humana en todos los campos.</p>
                                </div>
                            </div>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">04</span>
                                <h3>Aplicaciones en la Vida Cotidiana</h3>
                            </div>
                            <div className="features-grid">
                                <div className="feature-item">
                                    <i className="fa-solid fa-microphone-lines icon-cyan"></i>
                                    <div>
                                        <h5>Asistentes Virtuales</h5>
                                        <p>Siri, Google Assistant o Alexa procesan lenguaje natural (NLP) para responder.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <i className="fa-solid fa-film icon-purple"></i>
                                    <div>
                                        <h5>Motores de Recomendación</h5>
                                        <p>Netflix, Spotify y YouTube predicen qué contenido te gustará.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <i className="fa-solid fa-car icon-blue"></i>
                                    <div>
                                        <h5>Vehículos Autónomos</h5>
                                        <p>Sistemas como Tesla o Waymo analizan cámaras y sensores para maniobrar en tráfico.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <i className="fa-solid fa-notes-medical icon-green"></i>
                                    <div>
                                        <h5>Medicina y Diagnóstico</h5>
                                        <p>Detección temprana de anomalías en radiografías y diseño molecular de fármacos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">05</span>
                                <h3>Ventajas y Desventajas de la IA</h3>
                            </div>
                            <div className="comparison-grid">
                                <div className="comparison-col pros">
                                    <h4><i className="fa-solid fa-circle-check text-green"></i> Ventajas</h4>
                                    <ul>
                                        <li><strong>Automatización:</strong> Tareas repetitivas 24/7 sin fatiga.</li>
                                        <li><strong>Velocidad de análisis:</strong> Procesa billones de datos en milisegundos.</li>
                                        <li><strong>Reducción de errores:</strong> Alta precisión en cálculos complejos.</li>
                                        <li><strong>Innovación médica:</strong> Avances en diagnóstico y genética.</li>
                                    </ul>
                                </div>
                                <div className="comparison-col cons">
                                    <h4><i className="fa-solid fa-triangle-exclamation text-orange"></i> Desventajas y Retos</h4>
                                    <ul>
                                        <li><strong>Sesgos algorítmicos:</strong> Si los datos tienen sesgos, la IA los repetirá.</li>
                                        <li><strong>Desafíos laborales:</strong> Desplazamiento y reconversión de empleos.</li>
                                        <li><strong>Consumo energético:</strong> Gran demanda eléctrica en centros de datos.</li>
                                        <li><strong>Privacidad y seguridad:</strong> Riesgos de suplantación y deepfakes.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'web' && (
                    <section className="content-section active">
                        <div className="section-header-banner web-gradient">
                            <div className="header-badge"><i className="fa-brands fa-react"></i> Módulo 02</div>
                            <h2>Desarrollo Web & React</h2>
                            <p>Descubre los pilares que construyen internet y cómo se interconectan el frontend y el backend.</p>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">01</span>
                                <h3>¿Qué es el Desarrollo Web?</h3>
                            </div>
                            <p className="topic-text">
                                El <strong>Desarrollo Web</strong> es el proceso de diseñar, programar, construir y mantener aplicaciones web que se ejecutan a través de navegadores. Gracias a <strong>React</strong>, hoy en día creamos Single Page Applications (SPA) ultrarrápidas y modulares.
                            </p>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">02</span>
                                <h3>La Trinidad de la Web + React</h3>
                            </div>
                            <div className="tech-trio-grid">
                                <div className="tech-box html-border">
                                    <div className="tech-header">
                                        <i className="fa-brands fa-html5 icon-orange"></i>
                                        <h4>HTML5 (Estructura)</h4>
                                    </div>
                                    <p>Define los elementos del documento: párrafos, títulos, imágenes y botones semánticos.</p>
                                    <div className="code-snippet-small">
                                        <code>&lt;button className="btn"&gt;Click&lt;/button&gt;</code>
                                    </div>
                                </div>

                                <div className="tech-box css-border">
                                    <div className="tech-header">
                                        <i className="fa-brands fa-css3-alt icon-blue"></i>
                                        <h4>CSS3 (Diseño & Estilo)</h4>
                                    </div>
                                    <p>Otorga estilo visual: paleta de colores, tipografías, sombras y diseño responsivo para celulares.</p>
                                    <div className="code-snippet-small">
                                        <code>.btn &#123; background: #06b6d4; &#125;</code>
                                    </div>
                                </div>

                                <div className="tech-box js-border">
                                    <div className="tech-header">
                                        <i className="fa-brands fa-react icon-cyan"></i>
                                        <h4>React (Componentes)</h4>
                                    </div>
                                    <p>Crea componentes reutilizables con estado reactivo (Hooks) que actualizan la interfaz automáticamente.</p>
                                    <div className="code-snippet-small">
                                        <code>const [count, setCount] = useState(0);</code>
                                    </div>
                                </div>
                            </div>

                            <div className="interactive-lab">
                                <h4><i className="fa-solid fa-laptop-code"></i> Mini Laboratorio: React State en Vivo</h4>
                                <p>Interactúa con los controles para ver cómo React actualiza el estado y re-renderiza el componente:</p>
                                
                                <div className="lab-controls">
                                    <div className="control-group">
                                        <label><i className="fa-solid fa-palette"></i> Cambiar Estilo CSS:</label>
                                        <button className="lab-btn" onClick={() => { setLabTheme('neon'); setLabConsole('Console: Estado labTheme cambiado a "neon"'); }}>Neón Cyan</button>
                                        <button className="lab-btn" onClick={() => { setLabTheme('purple'); setLabConsole('Console: Estado labTheme cambiado a "purple"'); }}>Morado Futurista</button>
                                        <button className="lab-btn" onClick={() => { setLabTheme('warning'); setLabConsole('Console: Estado labTheme cambiado a "warning"'); }}>Gradiente Dorado</button>
                                    </div>
                                    <div className="control-group">
                                        <label><i className="fa-solid fa-bolt"></i> Acción React State:</label>
                                        <button className="lab-btn" onClick={() => { 
                                            const next = labClicks + 1;
                                            setLabClicks(next); 
                                            setLabConsole(`Console: setLabClicks invocado. Nuevo estado: ${next}`); 
                                        }}>
                                            Disparar Evento Clic
                                        </button>
                                    </div>
                                </div>

                                <div className="lab-preview-box">
                                    <div className={`lab-sample ${labTheme}`}>
                                        <i className="fa-brands fa-react"></i>
                                        <span>Componente React Activo: {labClicks} clics</span>
                                    </div>
                                    <div className="lab-log">{labConsole}</div>
                                </div>
                            </div>
                        </div>

                        <div className="topic-card">
                            <div className="topic-header">
                                <span className="topic-number">03</span>
                                <h3>Frontend vs. Backend: ¿En qué se diferencian?</h3>
                            </div>
                            <div className="comparison-grid">
                                <div className="comparison-col front-col">
                                    <h4><i className="fa-solid fa-desktop icon-cyan"></i> Frontend (Cliente)</h4>
                                    <ul>
                                        <li><strong>¿Dónde corre?</strong> En el navegador web del usuario final.</li>
                                        <li><strong>¿De qué se encarga?</strong> UI/UX, animaciones, accesibilidad y componentes React.</li>
                                        <li><strong>Tecnologías:</strong> HTML5, CSS3, JavaScript, React, Tailwind CSS.</li>
                                    </ul>
                                </div>
                                <div className="comparison-col back-col">
                                    <h4><i className="fa-solid fa-server icon-purple"></i> Backend (Servidor)</h4>
                                    <ul>
                                        <li><strong>¿Dónde corre?</strong> En servidores remotos o en la nube.</li>
                                        <li><strong>¿De qué se encarga?</strong> Lógica de negocio, bases de datos, APIs y seguridad.</li>
                                        <li><strong>Tecnologías:</strong> Python, Node.js, PostgreSQL, MongoDB, Docker.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'lenguajes' && (
                    <section className="content-section active">
                        <div className="section-header-banner lang-gradient">
                            <div className="header-badge"><i className="fa-solid fa-terminal"></i> Módulo 03</div>
                            <h2>Lenguajes de Programación Clave</h2>
                            <p>Explora la sintaxis y características de los lenguajes más demandados en la era de la IA y la Web.</p>
                        </div>

                        <div className="lang-showcase">
                            <div className="lang-card">
                                <div className="lang-header">
                                    <div className="lang-title-box">
                                        <i className="fa-brands fa-python icon-yellow"></i>
                                        <div>
                                            <h3>Python</h3>
                                            <span className="lang-role">El estándar en Inteligencia Artificial & Data Science</span>
                                        </div>
                                    </div>
                                    <span className="badge-role">Backend & IA</span>
                                </div>
                                <p className="lang-desc">
                                    Famoso por su sintaxis limpia y legible. Es el lenguaje predilecto para entrenar redes neuronales con PyTorch y TensorFlow.
                                </p>
                                <div className="code-editor-mock">
                                    <div className="mock-header">
                                        <span>prediccion.py</span>
                                        <button className="copy-btn" onClick={() => handleCopyCode('python', 'import numpy as np\ndef activar_neurona(entradas, pesos, sesgo):\n    return 1 / (1 + np.exp(-(np.dot(entradas, pesos) + sesgo)))')}>
                                            <i className="fa-regular fa-copy"></i> {copiedSnippet === 'python' ? '¡Copiado!' : 'Copiar'}
                                        </button>
                                    </div>
                                    <pre><code><span className="code-keyword">import</span> numpy <span className="code-keyword">as</span> np

<span className="code-keyword">def</span> <span className="code-func">activar_neurona</span>(entradas, pesos, sesgo):
    suma = np.dot(entradas, pesos) + sesgo
    <span className="code-keyword">return</span> 1 / (1 + np.exp(-suma))

resultado = activar_neurona([0.8, 0.4], [0.5, 0.9], 0.1)
<span className="code-func">print</span>(<span className="code-string">f"Activación calculada: &#123;resultado:.3f&#125;"</span>)</code></pre>
                                </div>
                            </div>

                            <div className="lang-card">
                                <div className="lang-header">
                                    <div className="lang-title-box">
                                        <i className="fa-brands fa-react icon-cyan"></i>
                                        <div>
                                            <h3>JavaScript & React (JSX)</h3>
                                            <span className="lang-role">El ecosistema interactivo de la Web</span>
                                        </div>
                                    </div>
                                    <span className="badge-role">Frontend & React</span>
                                </div>
                                <p className="lang-desc">
                                    React permite declarar cómo debe verse la UI en función del estado, gestionando automáticamente las actualizaciones del DOM.
                                </p>
                                <div className="code-editor-mock">
                                    <div className="mock-header">
                                        <span>ComponenteReact.jsx</span>
                                        <button className="copy-btn" onClick={() => handleCopyCode('react', 'function Asistente() {\n  const [query, setQuery] = useState("");\n  return <input value={query} onChange={e => setQuery(e.target.value)} />;\n}')}>
                                            <i className="fa-regular fa-copy"></i> {copiedSnippet === 'react' ? '¡Copiado!' : 'Copiar'}
                                        </button>
                                    </div>
                                    <pre><code><span className="code-keyword">function</span> <span className="code-func">AsistenteIA</span>() &#123;
    <span className="code-keyword">const</span> [respuesta, setRespuesta] = <span className="code-func">useState</span>(<span className="code-string">""</span>);

    <span className="code-keyword">return</span> (
        &lt;<span className="code-keyword">div</span> className=<span className="code-string">"card"</span>&gt;
            &lt;<span className="code-keyword">h4</span>&gt;Respuesta del Modelo:&lt;/<span className="code-keyword">h4</span>&gt;
            &lt;<span className="code-keyword">p</span>&gt;&#123;respuesta || <span className="code-string">"Esperando consulta..."</span>&#125;&lt;/<span className="code-keyword">p</span>&gt;
        &lt;/<span className="code-keyword">div</span>&gt;
    );
&#125;</code></pre>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'herramientas' && (
                    <section className="content-section active">
                        <div className="section-header-banner tools-gradient">
                            <div className="header-badge"><i className="fa-solid fa-toolbox"></i> Módulo 04</div>
                            <h2>Herramientas de IA y Desarrollo</h2>
                            <p>Las tecnologías líderes que multiplican la productividad de los desarrolladores modernos.</p>
                        </div>

                        <div className="tools-grid">
                            <div className="tool-card">
                                <div className="tool-top">
                                    <div className="tool-icon-circle green-glow"><i className="fa-solid fa-comments"></i></div>
                                    <div>
                                        <h3>ChatGPT (OpenAI)</h3>
                                        <span className="tool-category">Modelo de Lenguaje (LLM)</span>
                                    </div>
                                </div>
                                <p className="tool-text">Revolucionó el acceso a la inteligencia artificial mediante interfaces conversacionales basadas en Transformers.</p>
                                <div className="tool-usecases">
                                    <strong>Casos de uso para desarrolladores:</strong>
                                    <ul>
                                        <li><i className="fa-solid fa-check"></i> Generación de funciones y componentes React.</li>
                                        <li><i className="fa-solid fa-check"></i> Explicación de errores y stack traces complejos.</li>
                                        <li><i className="fa-solid fa-check"></i> Creación de pruebas unitarias y documentación.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tool-card">
                                <div className="tool-top">
                                    <div className="tool-icon-circle blue-glow"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                                    <div>
                                        <h3>Gemini (Google)</h3>
                                        <span className="tool-category">IA Multimodal Nativa</span>
                                    </div>
                                </div>
                                <p className="tool-text">Diseñado nativamente para ser multimodal: procesa texto, código, imágenes y video con ventanas de contexto gigantes.</p>
                                <div className="tool-usecases">
                                    <strong>Casos de uso para desarrolladores:</strong>
                                    <ul>
                                        <li><i className="fa-solid fa-check"></i> Análisis de maquetas de diseño (UI a código React).</li>
                                        <li><i className="fa-solid fa-check"></i> Razonamiento profundo sobre repositorios enteros.</li>
                                        <li><i className="fa-solid fa-check"></i> Integración fluida en Android y Google Cloud.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tool-card">
                                <div className="tool-top">
                                    <div className="tool-icon-circle purple-glow"><i className="fa-brands fa-github"></i></div>
                                    <div>
                                        <h3>GitHub</h3>
                                        <span className="tool-category">Control de Versiones & Git</span>
                                    </div>
                                </div>
                                <p className="tool-text">La plataforma donde vive el código del mundo. Permite colaborar en equipo, revisar Pull Requests y desplegar proyectos.</p>
                                <div className="tool-usecases">
                                    <strong>Casos de uso para desarrolladores:</strong>
                                    <ul>
                                        <li><i className="fa-solid fa-check"></i> Historial completo y seguro de versiones.</li>
                                        <li><i className="fa-solid fa-check"></i> Integración con GitHub Actions y CI/CD.</li>
                                        <li><i className="fa-solid fa-check"></i> Publicación con GitHub Pages.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="tool-card">
                                <div className="tool-top">
                                    <div className="tool-icon-circle cyan-glow"><i className="fa-solid fa-laptop-file"></i></div>
                                    <div>
                                        <h3>Visual Studio Code</h3>
                                        <span className="tool-category">Entorno de Desarrollo (IDE)</span>
                                    </div>
                                </div>
                                <p className="tool-text">El editor de código más popular del mundo. Ligero, altamente personalizable y con extensiones para React.</p>
                                <div className="tool-usecases">
                                    <strong>Casos de uso para desarrolladores:</strong>
                                    <ul>
                                        <li><i className="fa-solid fa-check"></i> Terminal integrada, depuración y Git visual.</li>
                                        <li><i className="fa-solid fa-check"></i> Extensiones para React, ESLint y Prettier.</li>
                                        <li><i className="fa-solid fa-check"></i> Autocompletado inteligente impulsado por IA.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'cuestionario' && (
                    <InteractiveQuiz onNavigateHome={() => onNavigate('inicio')} />
                )}
            </div>
        </main>
    );
}
