/**
 * ==========================================================================
 * AI & WEB DEVELOPMENT - Educational Interactive Platform
 * Script Principal: Navegación SPA, Asistente de IA, Cuestionario y Demos
 * ==========================================================================
 */

// Estado global de la aplicación
const AppState = {
    currentSection: 'inicio',
    visitedSections: new Set(['inicio']),
    totalSections: 6,
    quiz: {
        currentIndex: 0,
        score: 0,
        answered: false,
        userAnswers: []
    }
};

// Metadatos de las pestañas estilo IDE
const SectionMeta = {
    inicio: { file: 'inicio.edu', breadcrumb: 'Raíz > Inicio' },
    ia: { file: 'ia_overview.md', breadcrumb: 'Raíz > Inteligencia Artificial' },
    webdev: { file: 'web_dev.html', breadcrumb: 'Raíz > Desarrollo Web' },
    lenguajes: { file: 'lenguajes.ts', breadcrumb: 'Raíz > Lenguajes de Programación' },
    herramientas: { file: 'tools.config', breadcrumb: 'Raíz > Herramientas' },
    cuestionario: { file: 'evaluacion.quiz', breadcrumb: 'Raíz > Cuestionario' }
};

/* ==========================================================================
   1. NAVEGACIÓN SPA (Single Page Application)
   ========================================================================== */
function initNavigation() {
    const navButtons = document.querySelectorAll('.sidebar-nav .nav-item');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            if (sectionId) {
                navigateToSection(sectionId);
            }
        });
    });

    // Atajo de teclado: Ctrl + K para enfocar la barra de búsqueda
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('quick-search');
            if (searchInput) searchInput.focus();
        }
    });

    // Búsqueda rápida
    const searchInput = document.getElementById('quick-search');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const term = searchInput.value.trim().toLowerCase();
                if (!term) return;
                handleQuickSearch(term);
                searchInput.value = '';
            }
        });
    }

    // Botones de toggle para móviles
    const toggleNavBtn = document.getElementById('toggle-nav');
    const sidebar = document.getElementById('panel-sidebar');
    if (toggleNavBtn && sidebar) {
        toggleNavBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    const toggleAssistantBtn = document.getElementById('toggle-assistant');
    const closeAssistantBtn = document.getElementById('close-assistant-btn');
    const assistant = document.getElementById('panel-assistant');
    if (toggleAssistantBtn && assistant) {
        toggleAssistantBtn.addEventListener('click', () => {
            assistant.classList.toggle('open');
            if (assistant.classList.contains('open')) {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) chatInput.focus();
            }
        });
    }
    if (closeAssistantBtn && assistant) {
        closeAssistantBtn.addEventListener('click', () => {
            assistant.classList.remove('open');
        });
    }

    // Botón rápido en la barra de tabs para ir al cuestionario
    const quickQuizBtn = document.getElementById('btn-quick-quiz');
    if (quickQuizBtn) {
        quickQuizBtn.addEventListener('click', () => navigateToSection('cuestionario'));
    }
}

/**
 * Cambia dinámicamente de sección en el panel central
 */
function navigateToSection(sectionId) {
    // 1. Ocultar todas las secciones
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(sec => sec.classList.remove('active'));

    // 2. Mostrar la sección destino
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        AppState.currentSection = sectionId;
        AppState.visitedSections.add(sectionId);
    }

    // 3. Actualizar estado activo en la barra lateral
    const navButtons = document.querySelectorAll('.sidebar-nav .nav-item');
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 4. Actualizar pestaña IDE y Breadcrumbs
    const tabIndicator = document.getElementById('tab-indicator');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const meta = SectionMeta[sectionId] || { file: `${sectionId}.edu`, breadcrumb: `Raíz > ${sectionId}` };

    if (tabIndicator) {
        const titleSpan = tabIndicator.querySelector('.tab-title');
        if (titleSpan) titleSpan.textContent = meta.file;
    }
    if (breadcrumbs) {
        breadcrumbs.textContent = meta.breadcrumb;
    }

    // 5. Scroll suave al inicio del contenedor
    const scrollArea = document.querySelector('.content-scroll-area');
    if (scrollArea) {
        scrollArea.scrollTop = 0;
    }

    // 6. Actualizar barra de progreso del estudiante
    updateStudentProgress();

    // 7. En pantallas móviles, cerrar la barra lateral si estaba abierta
    const sidebar = document.getElementById('panel-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
}

/**
 * Actualiza la barra y el texto de progreso del alumno en la barra lateral
 */
function updateStudentProgress() {
    const visitedCount = AppState.visitedSections.size;
    const percentage = Math.min(100, Math.round((visitedCount / AppState.totalSections) * 100));

    const progressFill = document.getElementById('overall-progress-bar');
    const progressText = document.getElementById('overall-progress-text');

    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${visitedCount} de ${AppState.totalSections} módulos (${percentage}%)`;
}

/**
 * Búsqueda rápida inteligente
 */
function handleQuickSearch(term) {
    if (term.includes('ia') || term.includes('inteligencia') || term.includes('machine') || term.includes('modelo') || term.includes('neuronal')) {
        navigateToSection('ia');
        showToast(`Navegando a: Inteligencia Artificial`);
    } else if (term.includes('web') || term.includes('html') || term.includes('css') || term.includes('front') || term.includes('back')) {
        navigateToSection('webdev');
        showToast(`Navegando a: Desarrollo Web`);
    } else if (term.includes('python') || term.includes('javascript') || term.includes('typescript') || term.includes('sql') || term.includes('lenguaje')) {
        navigateToSection('lenguajes');
        showToast(`Navegando a: Lenguajes de Programación`);
    } else if (term.includes('tool') || term.includes('herramienta') || term.includes('chatgpt') || term.includes('gemini') || term.includes('github') || term.includes('vscode')) {
        navigateToSection('herramientas');
        showToast(`Navegando a: Herramientas de IA y Dev`);
    } else if (term.includes('quiz') || term.includes('cuestionario') || term.includes('test') || term.includes('examen') || term.includes('pregunta')) {
        navigateToSection('cuestionario');
        showToast(`Navegando a: Cuestionario`);
    } else {
        // Enviar consulta al asistente
        askFAQ(term);
        showToast(`Consultando al Asistente: "${term}"`);
    }
}

/* ==========================================================================
   2. CUESTIONARIO INTERACTIVO (5 PREGUNTAS)
   ========================================================================== */
const QuizQuestions = [
    {
        category: "Desarrollo Web",
        question: "¿Cuál es la función primordial de HTML en una página web?",
        options: [
            "Aportar la estructura, el contenido y la semántica de la página.",
            "Definir únicamente los colores, animaciones y diseño adaptable.",
            "Procesar bases de datos y autenticar a los usuarios en el servidor.",
            "Compilar código fuente a lenguaje máquina binario."
        ],
        correct: 0,
        explanation: "HTML (HyperText Markup Language) es el esqueleto de la web: define los elementos estructurales como encabezados, párrafos, tablas, enlaces y formularios. Los estilos los maneja CSS y la interactividad JavaScript."
    },
    {
        category: "Inteligencia Artificial",
        question: "¿A qué categoría corresponde la Inteligencia Artificial que utilizamos hoy en día (como asistentes, filtros o modelos de lenguaje)?",
        options: [
            "Superinteligencia Artificial (ASI) con conciencia propia universal.",
            "Inteligencia Artificial Estrecha o Débil (ANI), especializada en tareas específicas.",
            "Inteligencia Artificial General (AGI), idéntica a la mente humana en todo ámbito.",
            "IA Simbólica Analógica pura sin entrenamiento matemático."
        ],
        correct: 1,
        explanation: "Toda la IA contemporánea es IA Estrecha (ANI): sistemas altamente entrenados para resolver una tarea concreta (como traducir texto, reconocer caras o sugerir contenido), sin poseer conciencia ni habilidades universales fuera de su campo."
    },
    {
        category: "Desarrollo Web",
        question: "¿Qué tecnología permite agregar interactividad dinámica en tiempo real directamente en el navegador del usuario?",
        options: [
            "SQL",
            "HTML5 básico",
            "JavaScript",
            "Markdown"
        ],
        correct: 2,
        explanation: "JavaScript es el lenguaje de programación estándar que se ejecuta de manera nativa en los navegadores web. Permite manipular el DOM, reaccionar a clics, validar formularios y actualizar datos sin recargar la página."
    },
    {
        category: "Arquitectura Web",
        question: "¿Cuál de las siguientes afirmaciones describe mejor la diferencia entre Frontend y Backend?",
        options: [
            "El Frontend se ejecuta en el navegador (lado cliente) y el Backend en el servidor (bases de datos y lógica).",
            "El Frontend solo se usa para inteligencia artificial y el Backend para diseño gráfico.",
            "El Frontend procesa pagos bancarios y el Backend solo muestra el diseño visual.",
            "Son exactamente lo mismo con dos nombres comerciales diferentes."
        ],
        correct: 0,
        explanation: "El Frontend es la capa visual y de interacción con la que interactúa el usuario en su navegador. El Backend es la capa de servidores, APIs y bases de datos encargada de la lógica de negocio, seguridad y persistencia de datos."
    },
    {
        category: "Inteligencia Artificial & Herramientas",
        question: "¿Por qué el lenguaje Python es el más utilizado en el ámbito de la Inteligencia Artificial y Machine Learning?",
        options: [
            "Porque es el único lenguaje que los navegadores web pueden leer.",
            "Porque su sintaxis es clara y posee un gigantesco ecosistema de librerías como TensorFlow, PyTorch y Scikit-Learn.",
            "Porque no requiere matemáticas ni computadoras para ejecutarse.",
            "Porque sustituye por completo a HTML y CSS en cualquier página web."
        ],
        correct: 1,
        explanation: "Python combina una curva de aprendizaje amigable y una sintaxis muy legible con las bibliotecas científicas y de Deep Learning más potentes y maduras del mundo tecnológico."
    }
];

function initQuiz() {
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    const q = QuizQuestions[AppState.quiz.currentIndex];
    const total = QuizQuestions.length;

    // Actualizar metadatos
    const stepLabel = document.getElementById('quiz-counter-text');
    const progressBar = document.getElementById('quiz-progress-bar');
    const liveScore = document.getElementById('quiz-live-score');

    if (stepLabel) stepLabel.textContent = `Pregunta ${AppState.quiz.currentIndex + 1} de ${total}`;
    if (progressBar) progressBar.style.width = `${((AppState.quiz.currentIndex + 1) / total) * 100}%`;
    if (liveScore) liveScore.textContent = `Puntaje: ${AppState.quiz.score}/${AppState.quiz.currentIndex}`;

    // Renderizar categoría y título
    const catElem = document.getElementById('q-category');
    const titleElem = document.getElementById('q-title');
    const optionsContainer = document.getElementById('q-options');
    const feedbackBox = document.getElementById('q-feedback');
    const nextBtn = document.getElementById('btn-next-question');

    if (catElem) catElem.textContent = q.category;
    if (titleElem) titleElem.textContent = q.question;
    if (feedbackBox) feedbackBox.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    AppState.quiz.answered = false;

    // Generar opciones con botones
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];

        q.options.forEach((optText, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerHTML = `
                <span class="option-letter">${letters[index]}</span>
                <span class="option-text">${optText}</span>
            `;
            btn.addEventListener('click', () => handleOptionSelection(index, btn));
            optionsContainer.appendChild(btn);
        });
    }
}

function handleOptionSelection(selectedIndex, clickedBtn) {
    if (AppState.quiz.answered) return;
    AppState.quiz.answered = true;

    const q = QuizQuestions[AppState.quiz.currentIndex];
    const isCorrect = (selectedIndex === q.correct);
    const optionsContainer = document.getElementById('q-options');
    const allOptionButtons = optionsContainer.querySelectorAll('.quiz-option-btn');

    // Deshabilitar todos los botones
    allOptionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) {
            btn.classList.add('selected-correct');
        }
    });

    if (isCorrect) {
        AppState.quiz.score++;
        clickedBtn.classList.add('selected-correct');
    } else {
        clickedBtn.classList.add('selected-wrong');
    }

    // Registrar respuesta del usuario
    AppState.quiz.userAnswers.push({
        questionIndex: AppState.quiz.currentIndex,
        selected: selectedIndex,
        correct: q.correct,
        isCorrect: isCorrect
    });

    // Actualizar puntaje en vivo
    const liveScore = document.getElementById('quiz-live-score');
    if (liveScore) liveScore.textContent = `Puntaje: ${AppState.quiz.score}/${AppState.quiz.currentIndex + 1}`;

    // Mostrar feedback
    showQuizFeedback(isCorrect, q.explanation);

    // Mostrar botón de siguiente
    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function showQuizFeedback(isCorrect, explanation) {
    const feedbackBox = document.getElementById('q-feedback');
    const iconElem = document.getElementById('q-feedback-icon');
    const titleElem = document.getElementById('q-feedback-title');
    const expElem = document.getElementById('q-feedback-explanation');

    if (!feedbackBox) return;

    feedbackBox.style.display = 'flex';
    if (isCorrect) {
        feedbackBox.className = 'quiz-feedback-box correct';
        iconElem.textContent = '✓';
        titleElem.textContent = '¡Excelente! Respuesta Correcta';
    } else {
        feedbackBox.className = 'quiz-feedback-box wrong';
        iconElem.textContent = '✕';
        titleElem.textContent = 'Respuesta Incorrecta';
    }
    expElem.textContent = explanation;
}

function nextQuestion() {
    if (AppState.quiz.currentIndex < QuizQuestions.length - 1) {
        AppState.quiz.currentIndex++;
        renderCurrentQuestion();
    } else {
        showFinalQuizResults();
    }
}

function showFinalQuizResults() {
    const quizCard = document.getElementById('quiz-card');
    const resultsCard = document.getElementById('quiz-results');
    const total = QuizQuestions.length;
    const score = AppState.quiz.score;
    const percentage = Math.round((score / total) * 100);

    if (quizCard) quizCard.style.display = 'none';
    if (resultsCard) resultsCard.style.display = 'block';

    const scoreNum = document.getElementById('final-score-num');
    const percentageText = document.getElementById('final-percentage-text');
    const headline = document.getElementById('results-headline');
    const subtitle = document.getElementById('results-subtitle');
    const trophyIcon = document.getElementById('results-icon');
    const breakdown = document.getElementById('results-breakdown');

    if (scoreNum) scoreNum.textContent = score;
    if (percentageText) percentageText.textContent = `${percentage}% de Aciertos`;

    if (score === 5) {
        headline.textContent = "¡Sobresaliente! Dominio Total";
        subtitle.textContent = "Has demostrado un conocimiento impecable en IA y Desarrollo Web.";
        trophyIcon.textContent = "🏆";
    } else if (score >= 3) {
        headline.textContent = "¡Muy Buen Trabajo!";
        subtitle.textContent = "Comprendes los conceptos fundamentales. Revisa los detalles para perfeccionarlo.";
        trophyIcon.textContent = "🌟";
    } else {
        headline.textContent = "¡Buen Intento!";
        subtitle.textContent = "Te recomendamos repasar las secciones de IA y Desarrollo Web antes de volver a intentar.";
        trophyIcon.textContent = "📚";
    }

    // Listado de desglose
    if (breakdown) {
        breakdown.innerHTML = '<h4 style="color:#fff; margin-bottom:0.5rem;">Desglose de Preguntas:</h4>';
        QuizQuestions.forEach((q, idx) => {
            const userAns = AppState.quiz.userAnswers[idx];
            const item = document.createElement('div');
            item.className = 'summary-item';
            const statusIcon = userAns && userAns.isCorrect ? '<span style="color:#34d399; font-weight:bold;">✓ Correcta</span>' : '<span style="color:#f43f5e; font-weight:bold;">✕ Incorrecta</span>';
            item.innerHTML = `
                <span><strong>Pregunta ${idx + 1}:</strong> ${q.category}</span>
                ${statusIcon}
            `;
            breakdown.appendChild(item);
        });
    }

    resultsCard.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
    AppState.quiz.currentIndex = 0;
    AppState.quiz.score = 0;
    AppState.quiz.answered = false;
    AppState.quiz.userAnswers = [];

    const quizCard = document.getElementById('quiz-card');
    const resultsCard = document.getElementById('quiz-results');

    if (quizCard) quizCard.style.display = 'block';
    if (resultsCard) resultsCard.style.display = 'none';

    renderCurrentQuestion();
}

/* ==========================================================================
   3. ASISTENTE DE APRENDIZAJE ("AI Learning Assistant")
   ========================================================================== */

/**
 * Base de Conocimiento Local para Respuestas Automáticas
 */
const AssistantKnowledgeBase = [
    {
        keywords: ['que es la ia', 'que es ia', 'inteligencia artificial', 'concepto de ia', 'definicion de ia'],
        response: `
            <p><strong>La Inteligencia Artificial (IA)</strong> es una disciplina informática que desarrolla sistemas capaces de realizar tareas que requieren cognición humana, tales como:</p>
            <ul>
                <li>Reconocer voz e imágenes.</li>
                <li>Comprender lenguaje natural y redactar respuestas.</li>
                <li>Aprender de datos históricos y tomar decisiones.</li>
            </ul>
            <p>Se divide principalmente en <em>IA Estrecha</em> (la actual, experta en una sola tarea) e <em>IA General</em> (aún en investigación).</p>
        `
    },
    {
        keywords: ['frontend y backend', 'frontend vs backend', 'diferencia entre frontend', 'cliente y servidor'],
        response: `
            <p><strong>Frontend vs Backend:</strong></p>
            <ul>
                <li><strong>Frontend (Cliente):</strong> Todo lo que el usuario ve y toca en el navegador. Se crea con <code>HTML</code> (estructura), <code>CSS</code> (estilos) y <code>JavaScript</code> (interactividad).</li>
                <li><strong>Backend (Servidor):</strong> La maquinaria interna invisible que procesa la lógica, administra la seguridad y guarda la información en bases de datos (usando Node.js, Python, PostgreSQL, etc.).</li>
            </ul>
            <p><em>Analogía:</em> El Frontend es la mesa y menú del restaurante; el Backend es la cocina donde se preparan los pedidos.</p>
        `
    },
    {
        keywords: ['que hace javascript', 'que es javascript', 'para que sirve javascript', 'para que sirve js'],
        response: `
            <p><strong>JavaScript (JS)</strong> es el lenguaje que otorga vida, lógica e interactividad a la web:</p>
            <ul>
                <li>Responde a eventos del usuario (clics, pulsaciones de teclas, desplazamientos).</li>
                <li>Modifica el contenido visual en vivo sin recargar la página.</li>
                <li>Envía y recibe datos desde servidores en segundo plano (vía APIs y JSON).</li>
            </ul>
            <p>¡Este mismo Asistente y los botones de esta página están programados en JavaScript!</p>
        `
    },
    {
        keywords: ['como aprende la ia', 'como funciona la ia', 'machine learning', 'aprendizaje automatico', 'entrenamiento'],
        response: `
            <p><strong>¿Cómo aprende la Inteligencia Artificial?</strong></p>
            <p>En lugar de recibir reglas fijas escritas por un programador, los modelos de <em>Machine Learning</em> aprenden mediante 4 pasos:</p>
            <ol style="margin-left:1.2rem; margin-bottom:0.5rem;">
                <li><strong>Ingesta de datos:</strong> Miles o millones de ejemplos (textos, fotos, registros).</li>
                <li><strong>Extracción de patrones:</strong> Redes neuronales detectan regularidades estadísticas.</li>
                <li><strong>Ajuste de parámetros:</strong> El sistema evalúa sus predicciones y corrige sus errores.</li>
                <li><strong>Inferencia:</strong> Aplica lo aprendido a situaciones o datos totalmente nuevos.</li>
            </ol>
        `
    },
    {
        keywords: ['por que usar vs code', 'por que vs code', 'visual studio code', 'ventajas de vs code'],
        response: `
            <p><strong>Visual Studio Code (VS Code)</strong> es el editor de código líder en la industria porque:</p>
            <ul>
                <li>Es gratuito, ligero y desarrollado con tecnologías web.</li>
                <li>Tiene miles de extensiones (Live Server, Prettier, GitHub Copilot).</li>
                <li>Integra terminal, control de versiones Git y depuración sin salir del editor.</li>
            </ul>
            <p>¡Es la herramienta ideal para aprender y trabajar profesionalmente en desarrollo web!</p>
        `
    },
    {
        keywords: ['ventajas de la ia', 'ventajas de la inteligencia artificial', 'beneficios de la ia', 'pros de la ia'],
        response: `
            <p><strong>Principales Ventajas de la IA:</strong></p>
            <ul>
                <li><strong>Automatización:</strong> Realiza tareas rutinarias a gran velocidad sin fatiga.</li>
                <li><strong>Precisión:</strong> Disminuye errores humanos en diagnósticos médicos y análisis financieros.</li>
                <li><strong>Disponibilidad 24/7:</strong> Funciona en todo momento para soporte y monitoreo.</li>
                <li><strong>Innovación:</strong> Ayuda a descubrir nuevos fármacos y optimizar el uso de energía.</li>
            </ul>
        `
    },
    {
        keywords: ['desventajas de la ia', 'riesgos de la ia', 'peligros de la ia', 'contras de la ia'],
        response: `
            <p><strong>Desafíos y Desventajas de la IA:</strong></p>
            <ul>
                <li><strong>Sesgos algorítmicos:</strong> Si los datos históricos tienen prejuicios, la IA los repetirá.</li>
                <li><strong>Impacto en el empleo:</strong> Requiere reeducación laboral ante la automatización.</li>
                <li><strong>Alto consumo energético:</strong> Entrenar modelos de gran escala exige mucha electricidad y refrigeración.</li>
                <li><strong>Desinformación:</strong> Riesgo de generación de noticias falsas y deepfakes si se usa sin ética.</li>
            </ul>
        `
    },
    {
        keywords: ['que es html', 'para que sirve html', 'definicion de html'],
        response: `
            <p><strong>HTML (HyperText Markup Language)</strong> es el lenguaje base de la web. No es un lenguaje de programación, sino de <em>marcado semántico</em>:</p>
            <p>Utiliza etiquetas como <code>&lt;h1&gt;</code> para títulos, <code>&lt;p&gt;</code> para párrafos, <code>&lt;a&gt;</code> para enlaces y <code>&lt;img&gt;</code> para fotos. Sin HTML, los navegadores no tendrían nada que dibujar.</p>
        `
    },
    {
        keywords: ['que es css', 'para que sirve css', 'definicion de css'],
        response: `
            <p><strong>CSS (Cascading Style Sheets)</strong> es el lenguaje de diseño de la web:</p>
            <p>Se encarga de los colores, tipografías, márgenes, bordes, sombras y de adaptar el sitio a celulares, tablets y computadoras (diseño <em>Responsive</em>). Transforma un documento HTML plano en una interfaz visual atractiva.</p>
        `
    },
    {
        keywords: ['chatgpt', 'openai', 'que es chatgpt'],
        response: `
            <p><strong>ChatGPT</strong> es un modelo de inteligencia artificial generativa conversacional desarrollado por OpenAI. Utiliza la arquitectura <em>Transformer</em> para predecir la palabra más coherente según el contexto previo, permitiendo responder dudas, resumir textos y generar código.</p>
        `
    },
    {
        keywords: ['gemini', 'google gemini', 'que es gemini'],
        response: `
            <p><strong>Google Gemini</strong> es la familia de modelos de IA de Google y DeepMind. Su mayor fortaleza es que fue concebido desde el principio como un modelo <em>multimodal nativo</em>: comprende texto, imágenes, video, audio y código fuente al mismo tiempo con una enorme ventana de contexto.</p>
        `
    },
    {
        keywords: ['github', 'que es github', 'git'],
        response: `
            <p><strong>GitHub</strong> es una plataforma en la nube que aloja proyectos utilizando el sistema de control de versiones <strong>Git</strong>. Te permite guardar un historial de todos los cambios de tu código, colaborar con otros programadores en equipo y publicar tu portafolio profesional.</p>
        `
    },
    {
        keywords: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos'],
        response: `
            <p>¡Hola! 👋 Qué gusto tenerte aquí en <strong>AI &amp; WEB DEVELOPMENT</strong>. ¿En qué tema de Inteligencia Artificial o Desarrollo Web te gustaría profundizar hoy?</p>
            <p>Puedes preguntarme sobre HTML, CSS, JavaScript, tipos de IA, herramientas como ChatGPT y mucho más.</p>
        `
    },
    {
        keywords: ['gracias', 'muchas gracias', 'perfecto', 'excelente'],
        response: `
            <p>¡De nada! 😊 Estoy aquí para ayudarte en tu camino como desarrollador y entusiasta de la IA. ¡Continúa aprendiendo y no dudes en hacer otra pregunta o probar el cuestionario interactivo!</p>
        `
    }
];

/**
 * Procesa la consulta del usuario y genera respuesta inteligente
 */
function processUserQuery(userText) {
    const cleanText = userText.toLowerCase().trim();

    // Buscar coincidencia en la base de conocimiento
    for (const item of AssistantKnowledgeBase) {
        for (const key of item.keywords) {
            if (cleanText.includes(key)) {
                return item.response;
            }
        }
    }

    // Respuesta por defecto con sugerencias si no hay coincidencia exacta
    return `
        <p>Interesante pregunta. Aunque todavía estoy aprendiendo sobre ese matiz específico, puedo ayudarte con los siguientes temas principales:</p>
        <ul>
            <li><strong>¿Qué es la IA</strong> y cómo funciona el entrenamiento?</li>
            <li><strong>Diferencias entre Frontend y Backend</strong>.</li>
            <li><strong>El rol de HTML, CSS y JavaScript</strong> en la web.</li>
            <li><strong>Herramientas clave:</strong> ChatGPT, Google Gemini, GitHub y VS Code.</li>
            <li><strong>Ventajas y desventajas</strong> de la tecnología actual.</li>
        </ul>
        <p>¿Te gustaría profundizar en alguno de estos puntos?</p>
    `;
}

function handleChatSubmit(event) {
    event.preventDefault();
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;

    const query = chatInput.value.trim();
    if (!query) return;

    // 1. Mostrar mensaje del usuario
    appendChatMessage('user', `<p>${escapeHTML(query)}</p>`);
    chatInput.value = '';

    // 2. Simular indicador de tipeo
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    const messagesContainer = document.getElementById('chat-messages');
    if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Respuesta con retraso natural
    setTimeout(() => {
        if (typingIndicator) typingIndicator.style.display = 'none';
        const botResponse = processUserQuery(query);
        appendChatMessage('bot', botResponse);
    }, 600);
}

function askFAQ(questionText) {
    // Asegurar que el asistente esté visible en móviles
    const assistant = document.getElementById('panel-assistant');
    if (assistant && !assistant.classList.contains('open') && window.innerWidth <= 992) {
        assistant.classList.add('open');
    }

    // Insertar pregunta del usuario y responder
    appendChatMessage('user', `<p>${escapeHTML(questionText)}</p>`);

    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    setTimeout(() => {
        if (typingIndicator) typingIndicator.style.display = 'none';
        const botResponse = processUserQuery(questionText);
        appendChatMessage('bot', botResponse);
    }, 500);
}

function appendChatMessage(sender, htmlContent) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const avatar = sender === 'bot' ? '🤖' : '👤';

    messageDiv.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-bubble">
            ${htmlContent}
            <span class="msg-time">${timeStr}</span>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function focusChatInput() {
    // Abrir asistente si está en móvil
    const assistant = document.getElementById('panel-assistant');
    if (assistant && window.innerWidth <= 992) {
        assistant.classList.add('open');
    }

    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.focus();
        chatInput.scrollIntoView({ behavior: 'smooth' });
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/* ==========================================================================
   4. DEMOS INTERACTIVAS
   ========================================================================== */

/**
 * Demo 1: Simulador de clasificación de frutas por IA
 */
function simulateAIClassification(fruitType) {
    const consoleOutput = document.getElementById('ai-demo-output');
    if (!consoleOutput) return;

    const fruitsData = {
        manzana: {
            features: "Color: Rojo / Forma: Esférica / Peso: ~180g / Textura: Lisa",
            prediction: "🍎 Manzana (Malus domestica)",
            confidence: "99.4%"
        },
        platano: {
            features: "Color: Amarillo / Forma: Alargada y Curva / Peso: ~150g / Textura: Suave",
            prediction: "🍌 Plátano / Banana (Musa)",
            confidence: "98.7%"
        },
        naranja: {
            features: "Color: Naranja brillante / Forma: Redonda / Textura: Porosa / Peso: ~210g",
            prediction: "🍊 Naranja Cítrica (Citrus sinensis)",
            confidence: "99.1%"
        }
    };

    const target = fruitsData[fruitType];
    if (!target) return;

    consoleOutput.innerHTML = `
        <span style="color:#64748b;">[Paso 1: Extrayendo características sensoriales]</span><br>
        &gt; ${target.features}<br><br>
        <span style="color:#64748b;">[Paso 2: Procesamiento en Red Neuronal Convolucional (CNN)]</span><br>
        &gt; Pesos sinápticos calculados exitosamente.<br><br>
        <span style="color:#34d399; font-weight:bold;">[Predicción Final]: ${target.prediction}</span><br>
        <span style="color:#38bdf8;">[Nivel de Confianza del Modelo]: ${target.confidence}</span>
    `;
}

/**
 * Demo 2: Laboratorio interactivo CSS
 */
function changeButtonColor(colorHex, element = null) {
    const demoBtn = document.getElementById('css-demo-button');
    if (demoBtn) {
        demoBtn.style.backgroundColor = colorHex;
    }

    // Actualizar clase activa en swatches
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(s => s.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    } else if (typeof window !== 'undefined' && window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
}

function changeButtonRadius(radiusVal) {
    const demoBtn = document.getElementById('css-demo-button');
    const radiusLabel = document.getElementById('radius-val');
    if (demoBtn) {
        demoBtn.style.borderRadius = `${radiusVal}px`;
    }
    if (radiusLabel) {
        radiusLabel.textContent = `${radiusVal}px`;
    }
}

/**
 * Demo 3: Contador reactivo en JavaScript
 */
let liveCounterValue = 0;

function updateCounter(step) {
    liveCounterValue += step;
    const counterDisplay = document.getElementById('js-counter');
    if (counterDisplay) {
        counterDisplay.textContent = liveCounterValue;
    }
}

function resetCounter() {
    liveCounterValue = 0;
    const counterDisplay = document.getElementById('js-counter');
    if (counterDisplay) {
        counterDisplay.textContent = 0;
    }
}

/**
 * Demo 4: Copiar Snippets de código al portapapeles
 */
function copySnippet(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.innerText || element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Código copiado al portapapeles");
    }).catch(() => {
        showToast("Selecciona el código para copiar");
    });
}

/**
 * Mostrar notificación Toast flotante
 */
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

/* ==========================================================================
   5. INICIALIZACIÓN AL CARGAR EL DOM
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initQuiz();
    updateStudentProgress();
    console.log("AI & WEB DEVELOPMENT IDE Platform inicializada correctamente.");
});
