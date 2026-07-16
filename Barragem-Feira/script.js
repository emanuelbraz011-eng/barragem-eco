/* ==========================================================================
   0. PAINÉIS DE EXPLICAÇÃO INTERATIVA E METRICS DA LINHA DO TEMPO
   ========================================================================= */
const materialsData = {
    pet: { title: "🧴 Garrafa PET (Cinturão de Flutuação)", desc: "Garrafas PET vazias de 2 litros perfeitamente vedadas e enfileiradas dentro de malhas plásticas de alta resistência. Elas geram a força mecânica de empuxo necessária para manter toda a estrutura teórica flutuando na superfície." },
    madeira: { title: "🪵 Madeira Plástica (Chassi Estrutural)", desc: "A viga central que sustenta o protótipo planejado é feita de madeira plástica (gerada através de reciclagem industrial de plásticos descartados). Ela une os flutuadores e funciona como ancoragem de alta durabilidade que não apodrece na água." },
    rede: { title: "🕸️ Tela de Mosquiteiro (Filtro Subaquático)", desc: "Uma malha fina de mosquiteiro ou restos de rede de pesca fica submersa a cerca de 30 cm de profundidade. É o componente planejado para interceptar plásticos e sacolas flutuantes de forma passiva, deixando o fluxo natural e os peixes passarem livremente por baixo." },
    solar: { title: "☀️ Painel Fotovoltaico (Sinalização Noturna de Alerta)", desc: "Pequenas placas fotovoltaicas retiradas de luminárias solares velhas de jardim são planejadas no topo. Elas captam energia solar de dia para alimentar lâmpadas de alerta em LED piscantes à noite, evitando acidentes com barcos." }
};

function switchMaterial(event, key) {
    const buttons = event.target.parentNode.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('mat-title').innerText = materialsData[key].title;
    document.getElementById('mat-desc').innerText = materialsData[key].desc;
}

const faunaData = {
    peixes: { title: "🐟 Rota Livre por Baixo (Cardumes e Piracema)", desc: "Como a malha de mosquiteiro afunda no máximo 30 centímetros, ela atua apenas na lâmina d'água superficial onde o plástico flutua. Todo o leito do rio fica completamente livre, permitindo que peixes nadem por baixo sem qualquer risco. Espécies nativas migradoras (como Curimbatás, Dourados e Pintados) sobem os rios para se reproduzir de forma segura." },
    capivaras: { title: "🦦 Preservação de Mamíferos Semiaquáticos (Capivaras e Lontras)", desc: "Animais de médio e grande porte, como capivaras, ariranhas e lontras, possuem total discernimento espacial e excelente agilidade subaquática. Ao encontrarem a estrutura linear de 30 cm na superfície, elas simplesmente submergem por alguns segundos ou contornam as boias plásticas sem sofrer nenhum tipo de estresse mecânico, bloqueio ou aprisionamento." },
    aves: { title: "🦆 Rota de Aves Aquáticas (Patos, Garças e Mergulhões)", desc: "Aves como patos selvagens, biguás e garças interagem de forma totalmente segura com a EcoBarrier. Como os flutuadores de garrafas PET e madeira plástica foram calculados para formar uma barreira lisa e tensionada em diagonal, as aves podem usá-la como plataforma firme e temporária de descanso. Os mergulhões mantêm sua capacidade de caça passiva, submergindo antes da barreira para pescar nos canais livres do fundo do rio." }
};

function switchFauna(event, key) {
    const buttons = event.target.parentNode.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('fauna-title').innerText = faunaData[key].title;
    document.getElementById('fauna-desc').innerText = faunaData[key].desc;
}

const timelineData = {
    inicio: { title: "🚀 Mês 01: Implantação e Testes", desc: "A barreira de madeira ecológica e garrafas PET é lançada no rio. Neste estágio inicial, os níveis de poluição plástica flutuante estão no máximo (100%), sobrecarregando as margens.", value: "100% (Crítico)", width: "100%", class: "bar-danger" },
    m3: { title: "⚡ Mês 03: Contenção Ativa", desc: "Após três meses de retenção ativa, as coletas periódicas mostram resultados eficientes. O volume de lixo flutuante cai para 45%.", value: "45% (Moderado)", width: "45%", class: "bar-warning" },
    m6: { title: "🌳 Mês 06: Ecossistema Seguro", desc: "Com seis meses de uso, a poluição superficial caiu para 15%. O ecossistema fluvial dá sinais claros de recuperação natural.", value: "15% (Controlado)", width: "15%", class: "bar-success" },
    a1: { title: "📅 1 Ano: Estabilidade Mecânica", desc: "Após 12 meses, a estrutura de madeira plástica continua intacta sem apodrecer. A taxa de plásticos superficiais fixa-se em 10%.", value: "10% (Estável)", width: "10%", class: "bar-success" },
    a15: { title: "🛡️ 1 Ano e 6 Meses: Manutenção Coletiva", desc: "Troca preventiva das abraçadeiras e cabos de nylon. O índice de resíduos retidos mantém-se baixíssimo, protegendo o bioma.", value: "8% (Excelente)", width: "8%", class: "bar-success" },
    a2: { title: "🏆 2 Anos: Consolidação do Estudo", desc: "Resultados conclusivos comprovam que a fauna (peixes, patos e capivaras) adaptou-se perfeitamente à rota e o rio está despoluído.", value: "5% (Limpeza Máxima)", width: "5%", class: "bar-success" }
};

function switchTimeline(event, key) {
    const buttons = event.target.parentNode.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    const fill = document.getElementById('timeline-progress-fill');
    fill.className = "progress-fill " + timelineData[key].class;
    fill.style.width = timelineData[key].width;
    document.getElementById('timeline-value').innerText = timelineData[key].value;
    document.getElementById('timeline-title').innerText = timelineData[key].title;
    document.getElementById('timeline-desc').innerText = timelineData[key].desc;
}
/* ==========================================================================
   1. SIMULADOR COM RENDERIZAÇÃO VETORIAL REFINADA E CORREÇÃO DE DESTRAVAMENTO
   ========================================================================== */
const canvas = document.getElementById('ocean-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-game-btn');
const resetBtn = document.getElementById('reset-game-btn');
const lockScreen = document.getElementById('lock-screen');
const scoreVal = document.getElementById('score-val');
const capacityProgress = document.getElementById('capacity-progress');
const livesDisplay = document.getElementById('lives-display');
const statusText = document.getElementById('status-text');
const statusDot = document.querySelector('.status-dot');

const quizSectionWrapper = document.getElementById('quiz-section-wrapper');
const quizLockedMsg = document.getElementById('quiz-locked-msg');
const quizBoxReal = document.getElementById('quiz');

let gameActive = false, currentWeight = 0, lives = 3, trashItems = [];
const maxCapacity = 500, barrierLineY = 370; 
let waveOffset = 0;

canvas.addEventListener('mousedown', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = trashItems.length - 1; i >= 0; i--) {
        let t = trashItems[i];
        let dist = Math.hypot(clickX - t.x, clickY - t.y);

        if (dist <= t.radius + 15) { 
            currentWeight += t.weight;
            if (currentWeight >= maxCapacity) { currentWeight = maxCapacity; triggerBarrierLock(); }
            scoreVal.innerText = currentWeight;
            capacityProgress.style.width = `${(currentWeight / maxCapacity) * 100}%`;
            trashItems.splice(i, 1);
            break; 
        }
    }
});

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', unlockNextStepAndReset);

function startGame() {
    if (!gameActive) {
        gameActive = true; currentWeight = 0; lives = 3; trashItems = [];
        scoreVal.innerText = currentWeight; capacityProgress.style.width = '0%';
        livesDisplay.innerText = "❤️❤️❤️"; lockScreen.style.display = 'none';
        startBtn.style.display = 'none'; statusText.innerText = "Monitoramento HD Ativo";
        statusDot.style.backgroundColor = "#52b788"; spawnTrash(); gameLoop();
    }
}

function triggerBarrierLock() {
    gameActive = false; lockScreen.style.display = 'flex';
    statusText.innerText = "Barreira Saturada"; statusDot.style.backgroundColor = "#ffb703";
}

// CORREÇÃO CIRÚRGICA: Agora quando você clica em limpar os 500 KG, a Etapa 2 destrava de verdade!
function unlockNextStepAndReset() {
    lockScreen.style.display = 'none'; 
    startBtn.style.display = 'inline-block';
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    scoreVal.innerText = 0;
    capacityProgress.style.width = '0%'; 
    statusText.innerText = "Pronto";
    
    // Remove o bloqueio visual do CSS e exibe a caixa de perguntas do Quiz
    if (quizSectionWrapper) quizSectionWrapper.classList.remove('fade-disabled');
    if (quizLockedMsg) quizLockedMsg.style.display = 'none';
    if (quizBoxReal) quizBoxReal.style.display = 'block';
    
    quizSectionWrapper.scrollIntoView({ behavior: 'smooth' });
}

function spawnTrash() {
    if (!gameActive) return;
    const pool = [{ type: 'pet', weight: 15, radius: 14 }, { type: 'pneu', weight: 50, radius: 20 }, { type: 'caixa', weight: 30, radius: 18 }];
    const target = pool[Math.floor(Math.random() * pool.length)];
    trashItems.push({ x: Math.random() * (canvas.width - 60) + 30, y: -30, radius: target.radius, speed: 1.5 + Math.random() * 2, type: target.type, weight: target.weight });
    setTimeout(spawnTrash, 900); 
}

function drawRefinedTrash(t) {
    ctx.save(); ctx.translate(t.x, t.y);
    if (t.type === 'pet') {
        let gradient = ctx.createLinearGradient(-8, -15, 8, 15);
        gradient.addColorStop(0, '#a0aec0'); gradient.addColorStop(0.5, '#63b3ed'); gradient.addColorStop(1, '#3182ce');
        ctx.fillStyle = gradient; ctx.beginPath(); ctx.roundRect(-8, -16, 16, 32, 4); ctx.fill();
        ctx.fillStyle = '#e53e3e'; ctx.fillRect(-4, -20, 8, 4);
    } else if (t.type === 'pneu') {
        ctx.fillStyle = '#1a202c'; ctx.beginPath(); ctx.arc(0, 0, t.radius, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0b1a17'; ctx.beginPath(); ctx.arc(0, 0, t.radius * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#4a5568'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, t.radius * 0.7, 0, Math.PI * 2); ctx.stroke();
    } else if (t.type === 'caixa') {
        ctx.fillStyle = '#dd6b20'; ctx.fillRect(-16, -16, 32, 32);
        ctx.fillStyle = '#cbd5e0'; ctx.fillRect(-4, -16, 8, 32);
    }
    ctx.restore();
}

function gameLoop() {
    if (!gameActive) return;
    waveOffset += 0.05;
    ctx.fillStyle = '#0a1412'; ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(82, 183, 136, 0.04)'; ctx.lineWidth = 3;
    for (let k = 30; k < canvas.height - 65; k += 45) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
            let y = k + Math.sin(x * 0.02 + waveOffset + k) * 5;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    let woodGrad = ctx.createLinearGradient(0, barrierLineY, 0, barrierLineY + 12);
    woodGrad.addColorStop(0, '#9c6644'); woodGrad.addColorStop(1, '#5c3d24');
    ctx.fillStyle = woodGrad; ctx.fillRect(0, barrierLineY, canvas.width, 12);

    ctx.fillStyle = (Math.floor(waveOffset * 3) % 2 === 0) ? '#48bb78' : '#22543d';
    ctx.beginPath(); ctx.arc(canvas.width / 2, barrierLineY - 4, 5, 0, Math.PI * 2); ctx.fill();

    for (let i = trashItems.length - 1; i >= 0; i--) {
        let t = trashItems[i]; t.y += t.speed;
        drawRefinedTrash(t);
        ctx.fillStyle = '#cbd5e0'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
        ctx.fillText(`${t.weight} KG`, t.x, t.y + t.radius + 14);

        if (t.y >= barrierLineY - 5) {
            trashItems.splice(i, 1); lives--;
            livesDisplay.innerText = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
            if (lives <= 0) {
                gameActive = false; alert("Simulação Interrompida! Muitos resíduos escaparam para o mar.");
                lockScreen.style.display = 'none'; startBtn.style.display = 'inline-block'; statusText.innerText = "Reiniciando...";
            }
        }
    }
    requestAnimationFrame(gameLoop);
}
/* ==========================================================================
   2. QUIZ DE CONHECIMENTO TÉCNICO DE 5 PERGUNTAS E SISTEMA DE DESBLOQUEIO
   ========================================================================== */
const quizData = [
    { question: "1. Como as garrafas PET atuam teoricamente no projeto da nossa sala?", answers: ["A) Como revestimento estético lateral", "B) Como o núcleo flutuante de empuxo da barreira", "C) Para filtrar substâncias químicas dissolvidas", "D) Apenas como sinalizadores visuais coloridos"], correct: 1 },
    { question: "2. Qual a utilidade real da ripa de madeira ecológica colocada no chassi?", answers: ["A) Serve para dar rigidez estrutural e unir os flutuadores", "B) Serve para queimar e gerar energia térmica", "C) Serve apenas para os peixes nativos descansarem", "D) Bloquear completamente a luz solar superior"], correct: 0 },
    { question: "3. Qual é a capacidade limite configurada para o recolhimento seguro do protótipo?", answers: ["A) 100 KG de detritos", "B) 250 KG de detritos", "C) 500 KG de detritos", "D) 1200 KG de detritos"], correct: 2 },
    { question: "4. Qual tela reciclada pode ser reaproveitada abaixo da linha d'água?", answers: ["A) Lona plástica grossa impermeável", "B) Tela mosquiteira ou pedaço de rede de pesca velha", "C) Placas rígidas de metal galvanizado", "D) Tecido absorvente de algodão comum"], correct: 1 },
    { question: "5. O que acontece com os peixes na época da Piracema quando encontram a barreira?", answers: ["A) Ficam perigosamente aprisionados na estrutura", "B) Passam por baixo em rota livre, pois a malha é superficial", "C) São afastados por correntes elétricas sutis", "D) Mudam permanentemente de curso d'água"], correct: 1 }
];

let currentQuestionIndex = 0; let quizScore = 0;

function loadQuestion() {
    clearOptions(); let currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('quiz-progress-fill').style.width = `${(currentQuestionIndex / quizData.length) * 100}%`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button'); button.innerText = answer;
        button.classList.add('option-btn'); button.addEventListener('click', () => selectAnswer(index));
        document.getElementById('options').appendChild(button);
    });
}
function clearOptions() { const opt = document.getElementById('options'); while (opt.firstChild) { opt.removeChild(opt.firstChild); } }

function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.getElementById('options').querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        if (idx === currentQuestion.correct) btn.classList.add('correct');
        if (idx === selectedIndex && selectedIndex !== currentQuestion.correct) btn.classList.add('wrong');
    });
    if (selectedIndex === currentQuestion.correct) quizScore++;
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) { 
            loadQuestion(); 
        } else {
            document.getElementById('quiz-progress-fill').style.width = `100%`;
            document.getElementById('quiz-body').style.display = 'none'; 
            document.getElementById('quiz-result').style.display = 'block';
            document.getElementById('quiz-score-text').innerText = `Você obteve ${quizScore} de ${quizData.length} acertos possíveis.`;
            
            // AUTOMAÇÃO: Destrava a Etapa 3 imediatamente na tela sem precisar de botões extras!
            const step3Section = document.getElementById('step3-section-wrapper');
            const step3LockedMsg = document.getElementById('step3-locked-msg');
            const itemsBox = document.getElementById('items-check-box');
            const step3Instructions = document.getElementById('step3-instructions');
            
            if(step3Section) step3Section.classList.remove('fade-disabled');
            if(step3LockedMsg) step3LockedMsg.style.display = 'none';
            if(itemsBox) itemsBox.style.display = 'flex';
            if(step3Instructions) step3Instructions.style.display = 'block';
        }
    }, 1000); 
}

function restartQuiz() {
    currentQuestionIndex = 0; quizScore = 0;
    document.getElementById('quiz-body').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    loadQuestion();
}
function checkItem(element, isCorrect, feedbackMsg) {
    const feedbackTextBox = document.getElementById('step3-feedback-text');
    feedbackTextBox.innerText = feedbackMsg;
    if (isCorrect) { element.classList.add('chip-correct'); feedbackTextBox.style.color = '#52b788'; } 
    else { element.classList.add('chip-wrong'); feedbackTextBox.style.color = '#ef4444'; }
}

let totalComments = 2; // Começa com os 2 que já estão no HTML

function toggleCommentsSection() {
    const box = document.getElementById('comments-box'); const arrow = document.getElementById('acc-arrow');
    if (box.style.maxHeight && box.style.maxHeight !== "0px") { box.style.maxHeight = "0px"; arrow.classList.remove('rotated'); } 
    else { box.style.maxHeight = box.scrollHeight + "px"; arrow.classList.add('rotated'); }
}

// CORREÇÃO DO CONTADOR: Agora ele atualiza perfeitamente o número na aba retrátil!
function handleFeedbackSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('user-name').value; const rating = document.getElementById('rating').value; const opinion = document.getElementById('opinion').value;
    const starsHTML = "⭐".repeat(Number(rating));
    
    const list = document.getElementById('dynamic-comments-list'); const item = document.createElement('div');
    item.classList.add('comment-item');
    item.innerHTML = `<p class="comment-author">${name} <span>${starsHTML}</span></p><p class="comment-text">${opinion}</p>`;
    list.insertBefore(item, list.firstChild);
    
    // Incrementa a contagem de feedbacks enviados e renderiza o número atualizado na tela
    totalComments++;
    const counterDisplay = document.getElementById('comment-count');
    if (counterDisplay) {
        counterDisplay.innerText = totalComments;
    }
    
    const box = document.getElementById('comments-box'); 
    if (box.style.maxHeight && box.style.maxHeight !== "0px") { 
        box.style.maxHeight = box.scrollHeight + "px"; 
    }
    
    document.getElementById('evaluation-form').reset();
    document.getElementById('form-success').style.display = 'block'; 
    document.getElementById('form-success').innerText = `Avaliação registrada com sucesso na lista pública da Turma 210!`;
}

/* ==========================================================================
   4. SISTEMA DE ROTACIONAMENTO 3D DO RIO E POP-UPS POR CLIQUE REAL
   ========================================================================= */
const cenaContainer = document.getElementById('cena-maquete');
const popover = document.getElementById('popover-explicativo-js');

const popoverTextos = {
    madeira: "<strong>🪵 Viga de Madeira Plástica:</strong> Chassi estrutural feito de plástico reciclado fundido. Une os módulos e suporta o impacto dos resíduos sem degradar.",
    pet: "<strong>  Flutuadores (Garrafas PET):</strong> Gomos selados em série que utilizam a força de empuxo para manter a barreira flutuando perfeitamente na linha d'água.",
    rede: "<strong>🕸️ Filtro de Rede:</strong> Malha de mosquiteiro que desce apenas 30cm para barrar sacolas e plásticos sem interromper o leito profundo dos peixes.",
    solar: "<strong>☀️ Painel Solar:</strong> Armazena energia limpa de dia para manter lâmpadas de LED piscando à noite, garantindo a segurança de barcos comerciais."
};

document.querySelectorAll('.gatilho-info').forEach(gatilho => {
    gatilho.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const chave = e.target.getAttribute('data-info');
        popover.innerHTML = popoverTextos[chave];
        const rectCena = cenaContainer.getBoundingClientRect();
        const rectGatilho = e.target.getBoundingClientRect();
        const topoPopover = rectGatilho.top - rectCena.top - 75;
        const夹esquerdaPopover = rectGatilho.left - rectCena.left - 20;
        popover.style.top = `${topoPopover}px`;
        popover.style.left = `${esquerdaPopover}px`;
        popover.classList.add('popover-visivel');
    });
});

cenaContainer.addEventListener('click', () => { if(popover) popover.classList.remove('popover-visivel'); });

let estaArrastando = false;
let anguloX = -15; let anguloY = 35;  
let pontoInicialX = 0; let pontoInicialY = 0;

cenaContainer.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('gatilho-info')) return;
    estaArrastando = true; pontoInicialX = e.clientX; pontoInicialY = e.clientY;
});

window.addEventListener('mousemove', (e) => {
    if (!estaArrastando) return;
    const moduloRioReal = document.querySelector('.rio-3d-fluid');
    if (!moduloRioReal) return;
    
    const diferencaX = e.clientX - pontoInicialX;
    const diferencaY = e.clientY - pontoInicialY;
    anguloY += diferencaX * 0.4; anguloX -= diferencaY * 0.4;
    
    if (anguloX > 45) anguloX = 45; if (anguloX < -45) anguloX = -45;
    moduloRioReal.style.transform = `rotateX(${anguloX}deg) rotateY(${anguloY}deg)`;
    
    pontoInicialX = e.clientX; pontoInicialY = e.clientY;
});

window.addEventListener('mouseup', () => { estaArrastando = false; });

cenaContainer.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('gatilho-info')) return;
    estaArrastando = true; pontoInicialX = e.touches.clientX; pontoInicialY = e.touches.clientY;
});
window.addEventListener('touchmove', (e) => {
    if (!estaArrastando) return;
    const moduloRioReal = document.querySelector('.rio-3d-fluid');
    if (!moduloRioReal) return;
    
    const diferencaX = e.touches.clientX - pontoInicialX;
    const diferencaY = e.touches.clientY - pontoInicialY;
    anguloY += diferencaX * 0.4; anguloX -= diferencaY * 0.4;
    
    if (anguloX > 45) anguloX = 45; if (anguloX < -45) anguloX = -45;
    moduloRioReal.style.transform = `rotateX(${anguloX}deg) rotateY(${anguloY}deg)`;
    
    pontoInicialX = e.touches.clientX; pontoInicialY = e.touches.clientY;
});
window.addEventListener('touchend', () => { estaArrastando = false; });

// Inicializa as perguntas do questionário na memória local
loadQuestion();
