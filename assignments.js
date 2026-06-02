// ============================================================
// ASSIGNMENTS.JS — Interactive Exercises Engine
// IT Learning Platform
// ============================================================

// ============================================================
// RESULT TRACKER — saves score, errors, date, status
// ============================================================
const ResultTracker = {
    _getUserKey() {
        if (typeof AppState !== 'undefined') {
            const u = AppState.getCurrentUser();
            if (u && u.id) return u.id;
        }
        return 'guest';
    },
    save(lessonId, data) {
        const uid = this._getUserKey();
        const key = `result_${uid}_${lessonId}`;
        const now = new Date();
        const record = {
            lessonId,
            score: data.score,           // 0–100
            errors: data.errors || [],   // array of strings
            date: now.toLocaleDateString('ru-RU'),
            time: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            status: data.score >= 60 ? 'done' : 'failed',
            attempts: (ResultTracker.get(lessonId)?.attempts || 0) + 1
        };
        localStorage.setItem(key, JSON.stringify(record));
        return record;
    },
    get(lessonId, specificUserId) {
        const uid = specificUserId || this._getUserKey();
        try {
            const raw = localStorage.getItem(`result_${uid}_${lessonId}`);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    },
    renderBadge(lessonId) {
        const r = ResultTracker.get(lessonId);
        if (!r) return '<span class="tracker-pill pending">Басталған жоқ</span>';
        if (r.status === 'done')
            return `<span class="tracker-pill done">✓ Орындалды — ${r.score}%</span>
                    <span class="tracker-pill" style="background:var(--bg-secondary);color:var(--text-muted);">${r.date} ${r.time}</span>
                    <span class="tracker-pill" style="background:var(--bg-secondary);color:var(--text-muted);">Әрекеттер: ${r.attempts}</span>`;
        return `<span class="tracker-pill failed">✗ Қателер — ${r.score}%</span>
                <span class="tracker-pill" style="background:var(--bg-secondary);color:var(--text-muted);">${r.date} ${r.time}</span>
                <span class="tracker-pill" style="background:var(--bg-secondary);color:var(--text-muted);">Әрекеттер: ${r.attempts}</span>`;
    }
};

// ============================================================
// CISCO DRAG-AND-DROP TOPOLOGY BUILDER
// ============================================================

const CiscoAssignments = {

    // Stage configs: expected connections for validation
    stages: {
        cisco_1: {
            title: 'Желіні жина: құрылғыларды дұрыс орналастыр',
            instructions: 'Құрылғыларды палитрадан жұмыс аймағына сүйре. Содан кейін "Кабель" режимін таңдап, құрылғыларды дұрыс ретпен қос. "Схеманы тексеру" түймесін бас.',
            requiredDevices: ['pc', 'switch', 'router', 'server', 'internet'],
            // Expected topology: PC→Switch, Switch→Router, Router→Internet, Server→Switch
            correctConnections: [
                { from: 'pc',     to: 'switch',   reason: 'Компьютерлер роутерге тікелей емес, коммутаторға (свитчке) қосылады.' },
                { from: 'switch', to: 'router',   reason: 'Коммутатор басқа желілерге кіру үшін маршрутизаторға (роутерге) қосылады.' },
                { from: 'router', to: 'internet', reason: 'Роутер жергілікті желіні интернетпен байланыстырады.' },
                { from: 'server', to: 'switch',   reason: 'Серверлер де соңғы құрылғылар болып табылады, олар свитчке қосылады.' }
            ]
        },
        cisco_2: {
            title: 'IP-адрестеу: құрылғыларды бір желіге қос',
            instructions: 'Компьютер, свитч және роутерден тұратын желі құр. Компьютердің свитчпен, ал свитчтің роутермен байланысқанына көз жеткіз.',
            requiredDevices: ['pc', 'switch', 'router'],
            correctConnections: [
                { from: 'pc',     to: 'switch', reason: 'ДК коммутаторға қосылады.' },
                { from: 'switch', to: 'router', reason: 'Коммутатор роутерге қосылады — ол шлюз (Default Gateway) қызметін атқарады.' }
            ]
        },
        cisco_3: {
            title: 'Роутерді баптау: базалық топологияны жина',
            instructions: 'Жұмыс аймағына роутер мен екі компьютерді қой. Компьютерлер роутердің әртүрлі порттарына қосылуы керек — бұл әртүрлі желілерді білдіреді.',
            requiredDevices: ['pc', 'pc2', 'router'],
            correctConnections: [
                { from: 'pc',  to: 'router', reason: 'ПК0 роутердің бірінші интерфейсіне қосылған (GigabitEthernet0/0).' },
                { from: 'pc2', to: 'router', reason: 'ПК1 роутердің екінші интерфейсіне қосылған (GigabitEthernet0/1).' }
            ]
        },
        cisco_4: {
            title: 'Желілік қызметтер: DHCP, DNS және Web-сервер',
            instructions: 'Сервер, коммутатор және бірнеше ДК-ні орналастыр. Сервер IP таратады (DHCP), сондықтан ол барлық ДК-лер сияқты свитчке қосылады.',
            requiredDevices: ['pc', 'server', 'switch', 'router'],
            correctConnections: [
                { from: 'pc',     to: 'switch',  reason: 'ДК DHCP-серверден свитч арқылы IP алады.' },
                { from: 'server', to: 'switch',  reason: 'Сервер (DHCP/DNS) — соңғы құрылғы, свитчке қосылады.' },
                { from: 'switch', to: 'router',  reason: 'Свитч барлығын роутермен (интернетке шығу) байланыстырады.' }
            ]
        },
        cisco_5: {
            title: 'Финалдық жоба: толық желілік топология',
            instructions: 'Толық желіні жина: 2 компьютер, свитч, роутер, сервер және Интернетке шығу. Бұл барлық курстың финалдық тапсырмасы!',
            requiredDevices: ['pc', 'pc2', 'switch', 'router', 'server', 'internet'],
            correctConnections: [
                { from: 'pc',      to: 'switch',   reason: 'ПК0 → Свитч (барлық соңғы құрылғылар свитчке).' },
                { from: 'pc2',     to: 'switch',   reason: 'ПК1 → Свитч (барлық соңғы құрылғылар свитчке).' },
                { from: 'server',  to: 'switch',   reason: 'Сервер → Свитч (сервер де соңғы құрылғы).' },
                { from: 'switch',  to: 'router',   reason: 'Свитч → Роутер (свитч трафикті маршрутизаторға жинақтайды).' },
                { from: 'router',  to: 'internet', reason: 'Роутер → Интернет (роутер сыртқы желіге шлюз болып табылады).' }
            ]
        }
    },

    deviceDefs: {
        pc:       { icon: '🖥️', label: 'Компьютер' },
        pc2:      { icon: '💻', label: 'ДК №2' },
        switch:   { icon: '🔀', label: 'Свитч' },
        router:   { icon: '📡', label: 'Роутер' },
        hub:      { icon: '🔌', label: 'Хаб' },
        server:   { icon: '🗄️', label: 'Сервер' },
        internet: { icon: '🌐', label: 'Интернет' },
        cable:    { icon: '🔗', label: 'Кабель' }
    },

    // Runtime state
    state: {
        nodes: [],       // { id, type, x, y }
        connections: [], // { from, to }
        mode: 'move',    // 'move' | 'cable'
        cableStart: null,
        dragNode: null,
        dragOffX: 0,
        dragOffY: 0
    },

    render(lessonId, container) {
        const cfg = this.stages[lessonId];
        if (!cfg) return;

        // Reset state
        this.state = { nodes: [], connections: [], mode: 'move', cableStart: null, dragNode: null };

        const existing = ResultTracker.get(lessonId);

        container.innerHTML = `
          <div class="assignment-header">
            <div>
              <h3>🌐 ${cfg.title}</h3>
              <p>${cfg.instructions}</p>
            </div>
            <span class="assignment-badge">Drag & Drop</span>
          </div>
          <div class="assignment-body">
            <!-- Toolbar -->
            <div class="cisco-toolbar">
              <button class="tool-btn active" id="tool-move" onclick="CiscoAssignments.setMode('move')">✋ Жылжыту</button>
              <button class="tool-btn" id="tool-cable" onclick="CiscoAssignments.setMode('cable')">🔗 Кабель</button>
              <button class="tool-btn" onclick="CiscoAssignments.clearCanvas()">🗑️ Тазарту</button>
              <button class="btn btn-primary" style="margin-left:auto;" onclick="CiscoAssignments.validate('${lessonId}')">✔ Схеманы тексеру</button>
            </div>
            <!-- Workspace -->
            <div class="cisco-workspace">
              <div class="cisco-palette" id="cisco-palette">
                <div class="cisco-palette-title">Жабдықтар</div>
                ${this.buildPalette(cfg)}
              </div>
              <div class="cisco-canvas" id="cisco-canvas">
                <svg class="canvas-svg" id="canvas-svg"></svg>
                <!-- Nodes rendered here -->
              </div>
            </div>
            <!-- Hint -->
            <div class="cisco-hint-panel" id="cisco-hint"></div>
            <!-- Feedback -->
            <div class="assignment-feedback" id="cisco-feedback"></div>
            <!-- Tracker -->
            ${typeof GenericQuizManager !== 'undefined' ? GenericQuizManager.render(lessonId, this) : ''}
            <div class="stage-result-tracker">
              <span class="tracker-label">Тапсырма статусы:</span>
              ${ResultTracker.renderBadge(lessonId)}
            </div>
          </div>`;

        this.attachCanvasEvents(lessonId);
    },

    buildPalette(cfg) {
        const allDevices = ['pc', 'pc2', 'switch', 'router', 'hub', 'server', 'internet'];
        return allDevices.map(type => {
            const def = this.deviceDefs[type];
            return `<div class="cisco-device" draggable="true" data-type="${type}"
                         ondragstart="CiscoAssignments.onPaletteDragStart(event)">
                      <span class="device-emoji">${def.icon}</span>
                      <span>${def.label}</span>
                    </div>`;
        }).join('');
    },

    setMode(mode) {
        this.state.mode = mode;
        this.state.cableStart = null;
        document.getElementById('tool-move')?.classList.toggle('active', mode === 'move');
        document.getElementById('tool-cable')?.classList.toggle('active', mode === 'cable');

        const hint = document.getElementById('cisco-hint');
        if (mode === 'cable') {
            hint.textContent = '💡 Кабель: бірінші құрылғыны, содан кейін екінші құрылғыны нұқыңыз — сызық автоматты түрде пайда болады.';
            hint.classList.add('visible');
        } else {
            hint.classList.remove('visible');
        }
    },

    onPaletteDragStart(e) {
        e.dataTransfer.setData('device-type', e.currentTarget.dataset.type);
    },

    attachCanvasEvents(lessonId) {
        const canvas = document.getElementById('cisco-canvas');
        if (!canvas) return;

        canvas.addEventListener('dragover', e => { e.preventDefault(); canvas.classList.add('drag-over'); });
        canvas.addEventListener('dragleave', () => canvas.classList.remove('drag-over'));
        canvas.addEventListener('drop', e => {
            e.preventDefault();
            canvas.classList.remove('drag-over');
            const type = e.dataTransfer.getData('device-type');
            if (!type) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - 45;
            const y = e.clientY - rect.top - 45;
            this.addNode(type, Math.max(5, x), Math.max(5, y));
        });
    },

    addNode(type, x, y) {
        const def = this.deviceDefs[type];
        const id = `node_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
        this.state.nodes.push({ id, type, x, y });
        this.renderCanvas();
    },

    renderCanvas() {
        const canvas = document.getElementById('cisco-canvas');
        if (!canvas) return;

        // Keep SVG, remove old nodes
        canvas.querySelectorAll('.net-node').forEach(n => n.remove());

        this.state.nodes.forEach(node => {
            const def = this.deviceDefs[node.type] || { icon: '❓', label: node.type };
            const el = document.createElement('div');
            el.className = 'net-node';
            el.id = node.id;
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
            el.innerHTML = `
              <button class="delete-btn" onclick="CiscoAssignments.deleteNode('${node.id}')">✕</button>
              <span class="net-node-icon">${def.icon}</span>
              <span class="net-node-label">${def.label}</span>`;

            // Click in cable mode → draw connection
            el.addEventListener('click', () => {
                if (this.state.mode !== 'cable') return;
                if (!this.state.cableStart) {
                    this.state.cableStart = node.id;
                    el.classList.add('selected');
                } else if (this.state.cableStart !== node.id) {
                    this.state.connections.push({ from: this.state.cableStart, to: node.id });
                    document.getElementById(this.state.cableStart)?.classList.remove('selected');
                    this.state.cableStart = null;
                    this.renderLines();
                }
            });

            // Drag to move
            el.addEventListener('mousedown', e => {
                if (this.state.mode !== 'move') return;
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
                this.state.dragNode = node.id;
                this.state.dragOffX = e.clientX - rect.left - node.x;
                this.state.dragOffY = e.clientY - rect.top - node.y;

                const onMove = ev => {
                    if (!this.state.dragNode) return;
                    const r = canvas.getBoundingClientRect();
                    node.x = Math.max(5, ev.clientX - r.left - this.state.dragOffX);
                    node.y = Math.max(5, ev.clientY - r.top  - this.state.dragOffY);
                    el.style.left = `${node.x}px`;
                    el.style.top  = `${node.y}px`;
                    this.renderLines();
                };
                const onUp = () => {
                    this.state.dragNode = null;
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });

            canvas.appendChild(el);
        });

        this.renderLines();
    },

    renderLines() {
        const svg = document.getElementById('canvas-svg');
        if (!svg) return;
        svg.innerHTML = '';

        this.state.connections.forEach(conn => {
            const fromEl = document.getElementById(conn.from);
            const toEl   = document.getElementById(conn.to);
            if (!fromEl || !toEl) return;
            const canvas = document.getElementById('cisco-canvas');
            const cr = canvas.getBoundingClientRect();

            const fr = fromEl.getBoundingClientRect();
            const tr = toEl.getBoundingClientRect();

            const x1 = fr.left - cr.left + fr.width  / 2;
            const y1 = fr.top  - cr.top  + fr.height / 2;
            const x2 = tr.left - cr.left + tr.width  / 2;
            const y2 = tr.top  - cr.top  + tr.height / 2;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1); line.setAttribute('y1', y1);
            line.setAttribute('x2', x2); line.setAttribute('y2', y2);
            line.setAttribute('class', `connection-line ${conn.correct === true ? 'correct' : conn.correct === false ? 'incorrect' : ''}`);
            svg.appendChild(line);
        });
    },

    deleteNode(id) {
        this.state.nodes = this.state.nodes.filter(n => n.id !== id);
        this.state.connections = this.state.connections.filter(c => c.from !== id && c.to !== id);
        document.getElementById(id)?.remove();
        this.renderLines();
    },

    clearCanvas() {
        this.state.nodes = [];
        this.state.connections = [];
        document.querySelectorAll('.net-node').forEach(n => n.remove());
        const svg = document.getElementById('canvas-svg');
        if (svg) svg.innerHTML = '';
    },

    validate(lessonId) {
        const cfg = this.stages[lessonId];
        const feedback = document.getElementById('cisco-feedback');

        const placedTypes = this.state.nodes.map(n => n.type);
        const errors = [];
        const correct = [];

        // Check required devices
        cfg.requiredDevices.forEach(req => {
            if (!placedTypes.includes(req)) {
                const def = this.deviceDefs[req];
                errors.push(`❌ Құрылғы жетіспейді: <strong>${def?.label || req}</strong>. Оны палитрадан қосыңыз.`);
            }
        });

        // Map node types to IDs
        const typeToId = {};
        this.state.nodes.forEach(n => { typeToId[n.type] = n.id; });

        // Check each expected connection
        let correctCount = 0;
        cfg.correctConnections.forEach(exp => {
            const fromId = typeToId[exp.from];
            const toId   = typeToId[exp.to];
            if (!fromId || !toId) return; // device missing, already reported

            const hasConn = this.state.connections.some(c =>
                (c.from === fromId && c.to === toId) ||
                (c.from === toId   && c.to === fromId)
            );

            if (hasConn) {
                correctCount++;
                correct.push(exp);
            } else {
                const fromDef = this.deviceDefs[exp.from];
                const toDef   = this.deviceDefs[exp.to];
                errors.push(`❌ Қосылым жоқ: <strong>${fromDef?.label}</strong> ↔ <strong>${toDef?.label}</strong>. ${exp.reason}`);
            }
        });

        // Mark lines
        this.state.connections.forEach(conn => {
            const fromNode = this.state.nodes.find(n => n.id === conn.from);
            const toNode   = this.state.nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return;

            const isCorrect = cfg.correctConnections.some(exp => {
                const fromId = typeToId[exp.from];
                const toId   = typeToId[exp.to];
                return (conn.from === fromId && conn.to === toId) ||
                       (conn.from === toId   && conn.to === fromId);
            });
            conn.correct = isCorrect;
        });

        this.renderCanvas();

        const total = cfg.correctConnections.length;
        const score = Math.round((correctCount / Math.max(total, 1)) * 100);
        const result = ResultTracker.save(lessonId, { score, errors });

        if (errors.length === 0) {
            feedback.className = 'assignment-feedback visible success';
            feedback.innerHTML = `
              <div class="feedback-title">🎉 Керемет! Схема дұрыс жиналды!</div>
              <p>Барлық құрылғылар дұрыс орналасқан және дұрыс қосылған. Сіздің ұпайыңыз: <strong>${score}%</strong></p>
              ${this.buildResultStats(result)}`;
            AppState.completeLesson(lessonId);
            document.querySelector('.stage-result-tracker').innerHTML =
                `<span class="tracker-label">Тапсырма статусы:</span> ${ResultTracker.renderBadge(lessonId)}`;
        } else {
            feedback.className = 'assignment-feedback visible error';
            feedback.innerHTML = `
              <div class="feedback-title">⚠️ Схемада қателер бар (${score}% дұрыс)</div>
              <ul class="feedback-list">
                ${errors.map(e => `<li>${e}</li>`).join('')}
              </ul>
              <div style="margin-top:15px; padding:12px; background:rgba(14,165,233,0.08); border-radius:8px; font-size:0.88rem;">
                <strong>💡 Кеңес:</strong> Қалыпты желіде: ДК және Сервер → Свитч → Роутер → Интернет.
                Хаб свитчтің орнына тек өте ескі желілерде қолданылады.
              </div>
              ${this.buildResultStats(result)}`;
            document.querySelector('.stage-result-tracker').innerHTML =
                `<span class="tracker-label">Тапсырма статусы:</span> ${ResultTracker.renderBadge(lessonId)}`;
        }

        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    buildResultStats(result) {
        return `<div class="result-stats">
          <div class="result-stat"><span class="result-stat-label">Ұпай</span><span class="result-stat-val">${result.score}%</span></div>
          <div class="result-stat"><span class="result-stat-label">Статус</span><span class="result-stat-val">${result.status === 'done' ? '✅ Орындалды' : '❌ Орындалмады'}</span></div>
          <div class="result-stat"><span class="result-stat-label">Күн</span><span class="result-stat-val">${result.date}</span></div>
          <div class="result-stat"><span class="result-stat-label">Әрекеттер</span><span class="result-stat-val">${result.attempts}</span></div>
        </div>`;
    }
};


// ============================================================
// PYTHON MINI CODE EDITOR
// ============================================================
const PythonAssignments = {

    stages: {
        py_1: {
            title: '1-тапсырма: Атыңызды print арқылы шығарыңыз',
            desc: '<code>print()</code> функциясының көмегімен экранға өз атыңызды шығаратын бағдарлама жазыңыз.\n\nМысал: <em>print("Айдос")</em>',
            starterCode: '# Өз атыңызды шығарыңыз\n',
            check(code, output) {
                const errors = [];
                if (!code.includes('print')) errors.push({ msg: 'print() функциясы қолданылмайды. Ол мәтінді экранға шығару үшін қажет.', fix: 'Қосыңыз: print("Сіздің атыңыз")' });
                if (!output.trim()) errors.push({ msg: 'Бағдарлама ештеңе шығарған жоқ.', fix: 'print(...) ішінде тырнақшадағы мәтін бар екеніне көз жеткізіңіз.' });
                return errors;
            },
            simulate(code) {
                return PythonAssignments.evalSafe(code, '');
            }
        },
        py_2: {
            title: '2-тапсырма: input функциясын қолдану',
            desc: 'Мына бағдарламаны жазыңыз:\n1. <code>input()</code> арқылы пайдаланушының атын сұрап, оны айнымалыға сақтайды.\n2. <code>print()</code> арқылы сәлемдесуді шығарады.\n\nКүтілетін нәтиже: <em>Сәлем, [Аты]</em>',
            starterCode: '# Атын сұрап, сәлемдесуді шығарыңыз\n',
            check(code, output) {
                const errors = [];
                if (!code.includes('input')) errors.push({ msg: 'input() функциясы қолданылмайды.', fix: 'Қосыңыз: name = input("Атың кім? ")' });
                if (!code.includes('print')) errors.push({ msg: 'print() функциясы қолданылмайды.', fix: 'Қосыңыз: print("Сәлем, " + name)' });
                if (!output.includes('Сәлем')) errors.push({ msg: 'Нәтижеде "Сәлем" сөзі жоқ. Сәлемдесудің дұрыс шығып тұрғанына көз жеткізіңіз.', fix: 'Қолданыңыз: print("Сәлем, " + name)' });
                return errors;
            },
            simulate(code) {
                let result = code.replace(/input\s*\([^)]*\)/g, '"Студент"');
                return PythonAssignments.evalSafe(result, 'Студент');
            }
        },
        py_3: {
            title: '3-тапсырма: if/else жазу',
            desc: 'Бағдарлама жазыңыз:\n1. Жас мөлшерін орнатыңыз: <code>age = 20</code> (немесе input арқылы сұраңыз)\n2. Егер жасы >= 18 болса — "Кіруге рұқсат" деп шығарыңыз\n3. Әйтпесе — "Кіруге тыйым салынған"',
            starterCode: '# Жас мөлшерін тексеру\nage = 20\n',
            check(code, output) {
                const errors = [];
                if (!code.includes('if')) errors.push({ msg: 'if операторы жоқ. Шартты тексеру үшін if қажет.', fix: 'Қосыңыз: if age >= 18:' });
                if (!code.includes('else')) errors.push({ msg: 'else операторы жоқ. Қарама-қарсы жағдайды да өңдеу керек.', fix: 'Қосыңыз: else: және оның астындағы код блогы' });
                return errors;
            },
            simulate(code) {
                const testCode = code.replace(/input\s*\([^)]*\)/g, '"20"');
                return PythonAssignments.evalSafe(testCode, '20');
            }
        },
        py_4: {
            title: '4-тапсырма: 1-ден 10-ға дейінгі сандарды шығару',
            desc: '<code>for</code> немесе <code>while</code> циклін қолданып, экранға 1-ден 10-ға дейінгі (қоса алғанда) сандарды шығарыңыз.',
            starterCode: '# 1-ден 10-ға дейінгі сандарды шығарыңыз\n',
            check(code, output) {
                const errors = [];
                const lines = output.split('\n').filter(Boolean);
                const nums = lines.map(Number).filter(n => !isNaN(n));
                if (!code.includes('for') && !code.includes('while')) errors.push({ msg: 'Цикл (for немесе while) жоқ.', fix: 'Қолданыңыз: for i in range(1, 11):' });
                if (!nums.includes(1) || !nums.includes(10)) errors.push({ msg: 'Нәтижеде 1 немесе 10 сандары жоқ. Диапазон қате берілген.', fix: 'Циклдың 1-ден 10-ға дейін (қоса алғанда) ауысатынына көз жеткізіңіз.' });
                return errors;
            },
            simulate(code) {
                let out = '';
                for (let i = 1; i <= 10; i++) out += i + '\n';
                if ((code.includes('for') || code.includes('while')) && code.includes('print')) return out.trim();
                return '[Қате] Цикл логикасын тексеріңіз.';
            }
        },
        py_5: {
            title: '5-тапсырма: Қарапайым калькулятор',
            desc: 'Мыналарды орындайтын калькулятор жасаңыз:\n1. Екі сан мен операция белгісін (+, -, *, /) сұрайды\n2. Нәтижені шығарады\n3. Нөлге бөлуді тексереді',
            starterCode: 'num1 = float(input("Бірінші сан: "))\nop   = input("Операция (+,-,*,/): ")\nnum2 = float(input("Екінші сан: "))\n\n# Логиканы осында жазыңыз\n',
            check(code, output) {
                const errors = [];
                if (!code.includes('if') || !code.includes('elif')) errors.push({ msg: 'Операцияларға арналған if/elif тізбегі жоқ.', fix: '+, -, * және / үшін шарттар қосыңыз' });
                if (!code.includes('!= 0') && !code.includes('== 0')) errors.push({ msg: 'Нөлге бөлуді тексеру жоқ!', fix: 'Қосыңыз: elif op == "/" and num2 != 0:' });
                return errors;
            },
            simulate(code) {
                if (code.includes('if') && code.includes('elif')) {
                    return 'Бірінші сан: 10\nОперация: +\nЕкінші сан: 5\nНәтиже: 15.0';
                }
                return '[Қате] Шарттарды тексеріңіз.';
            }
        }
    },

    render(lessonId, container) {
        const cfg = this.stages[lessonId];
        if (!cfg) return;

        const existing = ResultTracker.get(lessonId);
        const savedCode = localStorage.getItem(`pycode_${lessonId}`) || cfg.starterCode;

        container.innerHTML = `
          <div class="assignment-header">
            <div>
              <h3>🐍 ${cfg.title}</h3>
              <p>Кодты жазыңыз, тексеру үшін ▶ Іске қосу түймесін басыңыз.</p>
            </div>
            <span class="assignment-badge">Code Editor</span>
          </div>
          <div class="assignment-body">
            <div class="python-task-box">
              <div class="python-task-title">📋 Тапсырма:</div>
              <div class="python-task-desc">${cfg.desc.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="python-editor-layout">
              <div class="editor-panel">
                <div class="editor-panel-header">
                  <span><span class="lang-dot"></span>Python 3</span>
                  <span>Код редакторы</span>
                </div>
                <textarea class="code-editor-area" id="py-editor" spellcheck="false"
                  oninput="PythonAssignments.saveCode('${lessonId}')">${savedCode}</textarea>
              </div>
              <div class="editor-panel">
                <div class="editor-panel-header">
                  <span>⬛ Шығару консолі</span>
                  <span id="run-status">Күтуде...</span>
                </div>
                <div class="output-panel" id="py-output">Нәтижені көру үшін ▶ Іске қосу түймесін басыңыз.</div>
              </div>
            </div>
            <div class="editor-actions">
              <button class="run-btn" onclick="PythonAssignments.run('${lessonId}')">▶ Іске қосу</button>
              <button class="hint-btn" onclick="PythonAssignments.toggleHint('${lessonId}')">💡 Кеңес</button>
              <button class="reset-btn" onclick="PythonAssignments.reset('${lessonId}')">↺ Қалпына келтіру</button>
            </div>
            <div class="hint-popup" id="py-hint"></div>
            <div class="assignment-feedback" id="py-feedback"></div>
            ${typeof GenericQuizManager !== 'undefined' ? GenericQuizManager.render(lessonId, this) : ''}
            <div class="stage-result-tracker">
              <span class="tracker-label">Тапсырма статусы:</span>
              ${ResultTracker.renderBadge(lessonId)}
            </div>
          </div>`;

        // Tab key inserts spaces in textarea
        document.getElementById('py-editor')?.addEventListener('keydown', e => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const ta = e.target;
                const start = ta.selectionStart;
                ta.value = ta.value.slice(0, start) + '    ' + ta.value.slice(ta.selectionEnd);
                ta.selectionStart = ta.selectionEnd = start + 4;
            }
        });
    },

    saveCode(lessonId) {
        const code = document.getElementById('py-editor')?.value || '';
        localStorage.setItem(`pycode_${lessonId}`, code);
    },

    reset(lessonId) {
        const cfg = this.stages[lessonId];
        const editor = document.getElementById('py-editor');
        if (editor && cfg) { editor.value = cfg.starterCode; this.saveCode(lessonId); }
        const output = document.getElementById('py-output');
        if (output) { output.textContent = 'Код қалпына келтірілді. ▶ Іске қосу түймесін басыңыз.'; output.className = 'output-panel'; }
    },

    toggleHint(lessonId) {
        const cfg = this.stages[lessonId];
        const code = document.getElementById('py-editor')?.value || '';
        const errors = cfg.check(code, '');
        const hintEl = document.getElementById('py-hint');
        if (hintEl.classList.contains('visible')) { hintEl.classList.remove('visible'); return; }

        if (errors.length > 0) {
            hintEl.innerHTML = `<strong>💡 Кодыңыз бойынша кеңестер:</strong><br>` +
                errors.map(e => `• ${e.msg}<br><em style="color:var(--color-accent)">→ ${e.fix}</em>`).join('<br><br>');
        } else {
            hintEl.innerHTML = '<strong>✅ Код дұрыс көрінеді!</strong> Финалдық тексеру үшін ▶ Іске қосу түймесін басыңыз.';
        }
        hintEl.classList.add('visible');
    },

    run(lessonId) {
        const cfg = this.stages[lessonId];
        const code = document.getElementById('py-editor')?.value || '';
        const output = document.getElementById('py-output');
        const status = document.getElementById('run-status');
        const feedback = document.getElementById('py-feedback');

        // Simulate execution
        let simOutput = '';
        try { simOutput = cfg.simulate(code); }
        catch (err) { simOutput = `[Орындалу қатесі] ${err.message}`; }

        const isError = simOutput.startsWith('[Қате]');
        output.textContent = `>>> Бағдарламаны іске қосу...\n\n${simOutput}`;
        output.className = `output-panel ${isError ? 'has-error' : ''}`;
        status.textContent = isError ? '⛔ Қате' : '✅ Орындалды';

        // Static analysis
        const errors = cfg.check(code, simOutput);
        const score = Math.max(0, Math.round((1 - errors.length / 4) * 100));
        const result = ResultTracker.save(lessonId, { score, errors: errors.map(e => e.msg) });

        if (errors.length === 0 && !isError) {
            feedback.className = 'assignment-feedback visible success';
            feedback.innerHTML = `<div class="feedback-title">🎉 Керемет! Код дұрыс жазылған!</div>
              <p>Бағдарлама дұрыс нәтиже шығарды. Ұпай: <strong>${score}%</strong></p>
              ${this.buildResultStats(result)}`;
            AppState.completeLesson(lessonId);
        } else {
            feedback.className = 'assignment-feedback visible error';
            feedback.innerHTML = `<div class="feedback-title">⚠️ Кодта қателер бар (${score}% дұрыс)</div>
              <ul class="feedback-list">
                ${errors.map(e => `<li><strong>${e.msg}</strong><br><em style="color:var(--color-accent); font-size:0.82rem;">→ Қалай түзеуге болады: ${e.fix}</em></li>`).join('')}
              </ul>
              ${this.buildResultStats(result)}`;
        }

        document.querySelector('.stage-result-tracker').innerHTML =
            `<span class="tracker-label">Тапсырма статусы:</span> ${ResultTracker.renderBadge(lessonId)}`;
    },

    evalSafe(code, fakeInput) {
        // Safe simulation — extract print statements
        const prints = [];
        const lines = code.split('\n');
        let vars = {};

        // Very simple variable tracker for demonstration
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('print(')) {
                const inner = trimmed.slice(6, -1);
                try {
                    // Evaluate simple string concatenations
                    let val = inner.replace(/name/g, `"${fakeInput}"`).replace(/"/g, '').replace(/'/g, '').replace(/\+/g, '');
                    prints.push(val.trim());
                } catch { prints.push('[шығару]'); }
            }
        });

        if (code.includes('"Сәлем"') || code.includes("'Сәлем'") || code.includes('"Сәлем"') ||
            (code.includes('print') && code.includes('name'))) {
            return `Сәлем, ${fakeInput}`;
        }
        if (code.includes('Кіруге') || code.includes('рұқсат') || code.includes('тыйым') || code.includes('Кіру')) {
            if (code.includes('>= 18')) return fakeInput >= 18 ? 'Кіруге рұқсат' : 'Кіруге тыйым салынған';
        }
        if (prints.length > 0) return prints.join('\n');
        return '[Бағдарлама нәтижесіз аяқталды]';
    },

    buildResultStats(result) {
        return `<div class="result-stats">
          <div class="result-stat"><span class="result-stat-label">Ұпай</span><span class="result-stat-val">${result.score}%</span></div>
          <div class="result-stat"><span class="result-stat-label">Статус</span><span class="result-stat-val">${result.status === 'done' ? '✅ Орындалды' : '❌ Орындалмады'}</span></div>
          <div class="result-stat"><span class="result-stat-label">Күн</span><span class="result-stat-val">${result.date}</span></div>
          <div class="result-stat"><span class="result-stat-label">Әрекеттер</span><span class="result-stat-val">${result.attempts}</span></div>
        </div>`;
    }
};


// ============================================================
// AR/VR INTERACTIVE QUIZ CARDS & MATCHING
// ============================================================
const ARVRAssignments = {

    stages: {
        arvr_1: {
            title: 'AR және VR — Интерактивті карточкалар',
            desc: 'Негізгі анықтамаларды білу үшін карточкаларды аударыңыз. Содан кейін тестілеуден өтіңіз.',
            cards: [
                { icon: '🕶️', front: 'VR',         back: { title: 'Virtual Reality', text: 'Толық цифрлық әлем. Шындықты блоктайды. Ойындарда, жаттығуларда, симуляцияларда қолданылады.' } },
                { icon: '📱', front: 'AR',         back: { title: 'Augmented Reality', text: 'Цифрлық нысандарды экран немесе көзілдірік арқылы нақты әлемге қабаттастырады. Pokemon GO, IKEA Place.' } },
                { icon: '🌐', front: 'MR',         back: { title: 'Mixed Reality', text: 'Аралас шындық: цифрлық және физикалық нысандар нақты уақытта өзара әрекеттеседі. HoloLens.' } },
                { icon: '🎮', front: '6 DOF',      back: { title: 'Еркіндіктің 6 дәрежесі', text: 'Қозғалысты 3 ось (X, Y, Z) + 3 бұрылыс бұрышы бойынша қадағалау. Толық ену.' } },
            ],
            questions: [
                { q: 'Қай технология пайдаланушыны нақты әлемнен толығымен оқшаулайды?', options: ['AR', 'VR', 'GPS', 'IoT'], ans: 1 },
                { q: 'AR (Augmented Reality) дегеніміз не?', options: ['Шындықты цифрлыққа ауыстыру', 'Цифрлықты нақтылыққа қабаттастыру', 'Интернет арқылы бейнеқоңырау', 'Голографиялық телефон'], ans: 1 },
                { q: 'Аралас шындық (MR) дегеніміз не?', options: ['Тек виртуалды әлем', 'Нақты және сандық нысандардың өзара әрекеттесуі', 'Компьютерлік ойын түрі', 'Смартфондағы камера'], ans: 1 },
                { q: 'AR-ды қай жерде қолдануға болады?', options: ['Тек ойындарда', 'Тек кинода', 'Білім беру, медицина, навигация', 'Қолдану мүмкін емес'], ans: 2 }
            ]
        },
        arvr_2: {
            title: 'VR құрылғылары — Біліміңізді тексеріңіз',
            desc: 'Құрылғыны оның сипаттамасымен сәйкестендіріңіз, содан кейін сұрақтарға жауап беріңіз.',
            cards: [
                { icon: '🎯', front: 'Meta Quest', back: { title: 'Дербес дулыға', text: 'Stand-alone дулыға. ДК қажет емес. Кіріктірілген процессор мен аккумулятор. Ең танымал формат.' } },
                { icon: '💻', front: 'Valve Index', back: { title: 'PC VR дулығасы', text: 'Қуатты ДК-ге қосылады. Максималды графика сапасы. Қуатты жабдықты қажет етеді.' } },
                { icon: '👁️', front: 'Inside-out', back: { title: 'Трекинг түрі', text: 'Дулыға ішіндегі камералар кеңістіктегі орынды қадағалайды. Сыртқы базалық станциялар қажет емес.' } },
                { icon: '📡', front: 'Outside-in', back: { title: 'Трекинг түрі', text: 'Сыртқы сенсорлар (базалық станциялар) дулығаның орнын қадағалайды. Дәлірек, бірақ баптау қиынырақ.' } },
            ],
            questions: [
                { q: 'ДК-ге қосылуды қажет етпейтін VR құрылғылары қалай аталады?', options: ['PC VR', 'Tethered', 'Дербес (Stand-alone)', 'Аналогты'], ans: 2 },
                { q: '6 DOF (Еркіндіктің 6 дәрежесі) дегеніміз не?', options: ['Дисплейдің 6 түсі', '3 ось бойынша жылжу және бұрылу', 'Жиынтықта 6 контроллер', '6 GHz Wi-Fi'], ans: 1 },
                { q: 'Inside-out трекингі қалай жұмыс істейді?', options: ['Сыртқы камералар арқылы', 'Дулыға ішіндегі камералар арқылы', 'GPS арқылы', 'Wi-Fi арқылы'], ans: 1 },
                { q: 'Ең танымал дербес VR дулығасын атаңыз:', options: ['Meta Quest', 'Valve Index', 'HTC Vive', 'Oculus Rift CV1'], ans: 0 }
            ]
        },
        arvr_3: {
            title: 'AR/VR қолдану — Сәйкестендіру',
            desc: 'Қолдану саласын сипаттамасымен сәйкестендіріңіз. Содан кейін сұрақтарға жауап беріңіз.',
            cards: [
                { icon: '🏥', front: 'Медицина',      back: { title: 'Хирургиялық симуляциялар', text: 'Студент-хирургтар науқастарға қауіп төндірмей, органдардың VR-модельдерінде жаттығады.' } },
                { icon: '🏗️', front: 'Сәулет',   back: { title: 'Виртуалды турлар', text: 'Клиенттер құрылыс басталмас бұрын болашақ ғимаратты VR арқылы аралайды.' } },
                { icon: '🎓', front: 'Білім беру',   back: { title: 'Виртуалды зертханалар', text: 'Химия, физика, биология салаларындағы эксперименттер қауіпсіз виртуалды ортада.' } },
                { icon: '🏭', front: 'Өнеркәсіп', back: { title: 'Прототиптеу', text: 'Инженерлер физикалық прототиптерді жасамас бұрын көліктер мен ұшақтардың дизайнын VR-де тексереді.' } },
            ],
            questions: [
                { q: 'Қай салада VR нақты науқастарға қауіп төндірмей операцияларды тәжірибеден өткізуге мүмкіндік береді?', options: ['Ритейл', 'Медицина', 'Банкинг', 'Логистика'], ans: 1 },
                { q: 'AR сәулет саласына қандай пайда әкеледі?', options: ['Құрылысшыларды роботтармен алмастыру', 'Болашақ ғимарат бойынша виртуалды тур', 'Интернетті жылдамдату', 'Құрылыстағы ойындар'], ans: 1 },
                { q: 'Виртуалды зертханалардың басты артықшылығы неде?', options: ['Қауіпсіздік және қолжетімділік', 'Нақты химиялық реактивтер', 'Қымбат құралдарды қажет етеді', 'Қауіпті'], ans: 0 },
                { q: 'Инженерлер VR-ды прототиптеуде не үшін қолданады?', options: ['Тек көңіл көтеру үшін', 'Физикалық прототиптерді жасамас бұрын дизайнды тексеру', 'Интернеттен іздеу үшін', 'Компьютерді салқындату үшін'], ans: 1 }
            ]
        },
        arvr_4: {
            title: '3D-көріністер және Unity компоненттері',
            desc: 'Карточкаларды аударыңыз, содан кейін компонентті оның мақсатымен сәйкестендіріңіз.',
            cards: [
                { icon: '📐', front: 'Transform',    back: { title: 'Позиция, Бұрылу, Масштаб', text: 'Unity-дегі әрбір нысанда Transform бар. Ол нысанның қайда орналасқанын, қалай бұрылғанын және өлшемін анықтайды.' } },
                { icon: '🧱', front: 'Mesh',         back: { title: '3D-нысанның пішіні', text: 'Mesh Filter нысанның пішінін (куб, сфера, кастомдық модель) анықтайды. Ал Mesh Renderer оны бейнелейді.' } },
                { icon: '🏋️', front: 'Rigidbody',   back: { title: 'Нысан физикасы', text: 'Гравитация мен физикалық мінез-құлықты қосады. Нысан құлайды, серпіледі, массаға ие болады.' } },
                { icon: '🎯', front: 'Collider',     back: { title: 'Физикалық шекаралар', text: 'Соқтығысуларды өңдеуге арналған нысанның көрінбейтін шекаралары. Онсыз нысан еденнен «өтіп кетеді».' } },
            ],
            questions: [
                { q: 'Unity-де қандай компонент нысанның физикасы мен гравитациясына жауап береді?', options: ['Transform', 'Mesh Filter', 'Rigidbody', 'Camera'], ans: 2 },
                { q: 'Collider компоненті жоқ нысанмен не болады?', options: ['Ол көрінбейтін болып қалады', 'Ол еденнен құлап түседі (өтіп кетеді)', 'Ол аспанға ұшып кетеді', 'Ол жарқырай бастайды'], ans: 1 },
                { q: 'Transform компоненті нені анықтайды?', options: ['Нысанның түсін', 'Позиция, Бұрылу, Масштаб', 'Дыбыс', 'Жарық'], ans: 1 },
                { q: 'Нысанның пішінін (куб, сфера) қай компонент береді?', options: ['Mesh Filter', 'Transform', 'Rigidbody', 'Audio Source'], ans: 0 }
            ]
        },
        arvr_5: {
            title: 'AR/VR бойынша финалдық тест',
            desc: 'Бүкіл курс бойынша білімді толық тексеру. Барлық тақырыптар бойынша сұрақтар.',
            cards: [],
            questions: [
                { q: 'XR Interaction Toolkit дегеніміз не?', options: ['Графикалық редактор', 'VR-өзара әрекеттесулерге арналған Unity компоненттерінің жиынтығы', 'Google компаниясының VR-дулығасы', 'Blender-ге арналған плагин'], ans: 1 },
                { q: 'Қандай компонент VR-да нысанды қолмен алуға мүмкіндік береді?', options: ['XR Grab Interactable', 'Rigidbody', 'Box Collider', 'Camera Tracker'], ans: 0 },
                { q: 'AR-дың VR-дан айырмашылығы қандай?', options: ['AR арзанырақ', 'AR сандықты нақтыға қабаттастырады, VR шындықты алмастырады', 'AR тек iPhone-да жұмыс істейді', 'Ешқандай айырмашылық жоқ'], ans: 1 },
                { q: 'Мобильді AR үшін қандай ойын қозғалтқышы жиі қолданылады?', options: ['GameMaker', 'RPG Maker', 'Unity', 'Flash'], ans: 2 }
            ]
        }
    },

    state: {},

    render(lessonId, container) {
        const cfg = this.stages[lessonId];
        if (!cfg) return;

        this.state[lessonId] = { answers: {}, matched: [] };

        const cardsHtml = cfg.cards.length > 0 ? `
            <h4 style="margin-bottom:12px; font-size:0.95rem;">📇 Карточкалар — аудару үшін басыңыз:</h4>
            <div class="flip-card-container">
              ${cfg.cards.map((c, i) => `
                <div class="flip-card" onclick="this.classList.toggle('flipped')">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <div class="card-icon">${c.icon}</div>
                      <div class="card-label">${c.front}</div>
                      <div class="card-hint">Басыңыз ↻</div>
                    </div>
                    <div class="flip-card-back">
                      <div class="back-title">${c.back.title}</div>
                      <div>${c.back.text}</div>
                    </div>
                  </div>
                </div>`).join('')}
            </div>` : '';

        const questionsHtml = cfg.questions.map((q, qi) => `
            <div class="arvr-question-block">
              <div class="arvr-question-num">Сұрақ ${qi + 1} / ${cfg.questions.length}</div>
              <div class="arvr-question-text">${q.q}</div>
              <div class="arvr-options-grid">
                ${q.options.map((opt, oi) => `
                  <div class="arvr-option" id="opt_${lessonId}_${qi}_${oi}"
                       onclick="ARVRAssignments.selectOption('${lessonId}', ${qi}, ${oi})">
                    <span class="option-letter">${String.fromCharCode(65+oi)}</span>
                    ${opt}
                  </div>`).join('')}
              </div>
            </div>`).join('');

        container.innerHTML = `
          <div class="assignment-header">
            <div>
              <h3>🕶️ ${cfg.title}</h3>
              <p>${cfg.desc}</p>
            </div>
            <span class="assignment-badge">Quiz + Cards</span>
          </div>
          <div class="assignment-body">
            <div class="arvr-quiz-layout">
              ${cardsHtml}
              <h4 style="margin-bottom:12px; font-size:0.95rem; margin-top:${cfg.cards.length>0?'20px':'0'};">✅ Тест — дұрыс жауапты таңдаңыз:</h4>
              ${questionsHtml}
            </div>
            <div style="margin-top:20px;">
              <button class="btn btn-primary" style="width:100%; padding:14px;" onclick="ARVRAssignments.submit('${lessonId}')">
                Барлық жауаптарды тексеру
              </button>
            </div>
            <div class="assignment-feedback" id="arvr-feedback"></div>
            ${typeof GenericQuizManager !== 'undefined' ? GenericQuizManager.render(lessonId, this) : ''}
            <div class="stage-result-tracker">
              <span class="tracker-label">Тапсырма статусы:</span>
              ${ResultTracker.renderBadge(lessonId)}
            </div>
          </div>`;
    },

    selectOption(lessonId, qi, oi) {
        const cfg = this.stages[lessonId];
        const st  = this.state[lessonId];
        if (!st || st.answers[qi] !== undefined) return; // already answered this Q

        // Mark selection visually
        const opts = document.querySelectorAll(`[id^="opt_${lessonId}_${qi}_"]`);
        opts.forEach(o => o.classList.remove('selected'));
        document.getElementById(`opt_${lessonId}_${qi}_${oi}`)?.classList.add('selected');
        st.answers[qi] = oi;
    },

    submit(lessonId) {
        const cfg = this.stages[lessonId];
        const st  = this.state[lessonId];
        const feedback = document.getElementById('arvr-feedback');
        const errors = [];
        let correct = 0;

        cfg.questions.forEach((q, qi) => {
            const chosen = st.answers[qi];
            const allOpts = document.querySelectorAll(`[id^="opt_${lessonId}_${qi}_"]`);

            if (chosen === undefined) {
                errors.push(`❌ Сұрақ ${qi+1}: жауап таңдалмаған. Варианттардың бірін таңдаңыз.`);
                return;
            }

            // Lock and reveal
            allOpts.forEach((el, oi) => {
                if (oi === q.ans) el.classList.add('correct');
                else if (oi === chosen && chosen !== q.ans) el.classList.add('wrong');
                el.style.pointerEvents = 'none';
            });

            if (chosen === q.ans) {
                correct++;
            } else {
                const wrongAns = q.options[chosen];
                const rightAns = q.options[q.ans];
                errors.push(`❌ Сұрақ ${qi+1}: сіз "<em>${wrongAns}</em>", дұрысы — "<em>${rightAns}</em>".`);
            }
        });

        const score = Math.round((correct / cfg.questions.length) * 100);
        const result = ResultTracker.save(lessonId, { score, errors });

        if (errors.length === 0) {
            feedback.className = 'assignment-feedback visible success';
            feedback.innerHTML = `<div class="feedback-title">🎉 Керемет! Барлық жауаптар дұрыс!</div>
              <p>Нәтиже: <strong>${correct}/${cfg.questions.length}</strong> дұрыс жауап — <strong>${score}%</strong></p>
              ${this.buildResultStats(result)}`;
            AppState.completeLesson(lessonId);
        } else {
            feedback.className = `assignment-feedback visible ${score >= 60 ? 'partial' : 'error'}`;
            feedback.innerHTML = `<div class="feedback-title">${score>=60?'👍':'⚠️'} Нәтиже: ${correct}/${cfg.questions.length} (${score}%)</div>
              <ul class="feedback-list">
                ${errors.map(e => `<li>${e}</li>`).join('')}
              </ul>
              ${this.buildResultStats(result)}`;
            if (score >= 60) AppState.completeLesson(lessonId);
        }

        document.querySelector('.stage-result-tracker').innerHTML =
            `<span class="tracker-label">Тапсырма статусы:</span> ${ResultTracker.renderBadge(lessonId)}`;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    buildResultStats(result) {
        return `<div class="result-stats">
          <div class="result-stat"><span class="result-stat-label">Ұпай</span><span class="result-stat-val">${result.score}%</span></div>
          <div class="result-stat"><span class="result-stat-label">Статус</span><span class="result-stat-val">${result.status === 'done' ? '✅ Орындалды' : '❌ Орындалмады'}</span></div>
          <div class="result-stat"><span class="result-stat-label">Күн</span><span class="result-stat-val">${result.date}</span></div>
          <div class="result-stat"><span class="result-stat-label">Әрекеттер</span><span class="result-stat-val">${result.attempts}</span></div>
        </div>`;
    }
};


// ============================================================
// DISPATCHER — called from lessons.html
// ============================================================
function renderAssignment(lessonId, container) {
    if (!lessonId || !container) return;

    if (lessonId.startsWith('cisco_')) {
        CiscoAssignments.render(lessonId, container);
    } else if (lessonId.startsWith('py_')) {
        PythonAssignments.render(lessonId, container);
    } else if (lessonId.startsWith('arvr_')) {
        ARVRAssignments.render(lessonId, container);
    } else {
        container.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted);">
            Бұл кезеңнің тапсырмасы әзірленуде.</div>`;
    }
}


// ============================================================
// GENERIC QUIZ RENDERER (Appended to Cisco and Python)
// ============================================================
const GenericQuizManager = {
    state: {},
    getQuestions(lessonId) {
        const quizzes = {
            'cisco_1': [
                { q: 'MAC-мекенжайлар кестесі негізінде деректер кадрларын тек нақты алушыға жіберетін құрылғы?', options: ['Хаб (Концентратор)', 'Свитч (Коммутатор)', 'Қайталағыш', 'Кабель'], ans: 1 },
                { q: 'Жергілікті желіні интернетпен байланыстыратын құрылғы?', options: ['Роутер', 'Свитч', 'Компьютер', 'Принтер'], ans: 0 },
                { q: 'Барлық порттарға сигналды көбейтетін ескірген құрылғы?', options: ['Роутер', 'Свитч', 'Хаб', 'Сервер'], ans: 2 }
            ],
            'cisco_2': [
                { q: 'Егер тағайындалған мекенжай өзінің жергілікті желісінен тыс болса, компьютер пакеттерді қайда жібереді?', options: ['DNS-серверге', 'Негізгі шлюзге (Default Gateway)', 'Коммутаторға', 'Веб-серверге'], ans: 1 },
                { q: 'IPv4 мекенжайы қандай форматта болады?', options: ['4 сандық октет', 'Тек әріптер', 'MAC-мекенжай сияқты', 'Тек екілік код'], ans: 0 },
                { q: 'Ішкі желі маскасының қызметі қандай?', options: ['Желі мен түйін бөліктерін анықтау', 'Деректерді шифрлау', 'Вирустардан қорғау', 'Веб-сайт ашу'], ans: 0 }
            ],
            'cisco_3': [
                { q: 'Cisco CLI интерфейс баптауларында оны қосу (белсендіру) үшін қандай пәрмен қолданылады?', options: ['enable port', 'no shutdown', 'startup', 'interface up'], ans: 1 },
                { q: 'Артықшылықты режимге кіру пәрмені:', options: ['configure', 'enable', 'start', 'login'], ans: 1 },
                { q: 'Баптауларды сақтау пәрмені қандай?', options: ['save config', 'write memory', 'export', 'store'], ans: 1 }
            ],
            'cisco_4': [
                { q: 'Жергілікті желідегі компьютерлерге IP-мекенжайларды автоматты түрде беруге қандай қызмет жауапты?', options: ['DNS', 'HTTP', 'DHCP', 'FTP'], ans: 2 },
                { q: 'Домендік атауларды (мысалы, yandex.kz) IP-мекенжайға айналдыратын қызмет?', options: ['DNS', 'DHCP', 'HTTP', 'SMTP'], ans: 0 },
                { q: 'Веб-беттерді сақтайтын сервер қызметі:', options: ['FTP', 'HTTP', 'DNS', 'DHCP'], ans: 1 }
            ],
            'cisco_5': [
                { q: 'Жинақталған финалдық жобада компьютерлер қандай әдепкі шлюздің (Default Gateway) IP-мекенжайын алуы керек?', options: ['192.168.10.1', '192.168.10.100', '255.255.255.0', '192.168.1.1'], ans: 0 },
                { q: 'Серверде DHCP қызметі қайда бапталады?', options: ['Desktop қойындысы', 'Services -> DHCP', 'CLI', 'Switch ішінде'], ans: 1 },
                { q: 'Пинг (Ping) пәрмені не үшін қажет?', options: ['Интернет жылдамдығын өлшеу', 'Құрылғылар арасындағы байланысты тексеру', 'Деректерді жою', 'IP мекенжайды өзгерту'], ans: 1 }
            ],
            'py_1': [
                { q: 'Пайдаланушы пернетақтадан енгізген деректерді оқу үшін қандай функция қолданылады?', options: ['print()', 'read()', 'input()', 'get()'], ans: 2 },
                { q: 'Экранға мәтін шығаратын функция?', options: ['show()', 'print()', 'display()', 'output()'], ans: 1 },
                { q: 'Python-да бүтін сан типі қалай аталады?', options: ['float', 'str', 'int', 'bool'], ans: 2 }
            ],
            'py_2': [
                { q: 'Python синтаксисінде "әйтпесе-егер" операторы қалай дұрыс жазылады?', options: ['else if', 'elseif', 'elif', 'elsif'], ans: 2 },
                { q: 'Теңдікті тексеру үшін қандай оператор қолданылады?', options: ['=', '==', '!=', '==='], ans: 1 },
                { q: 'Егер шарт орындалмаса, қай блок іске қосылады?', options: ['if', 'while', 'else', 'for'], ans: 2 }
            ],
            'py_3': [
                { q: '"while count < 5:" циклінің орындалуын count айнымалысының қандай мәні аяқтайды?', options: ['4', '0', '5', '3'], ans: 2 },
                { q: 'Сандық диапазонда жұмыс істеу үшін қандай функция қолданылады?', options: ['range()', 'list()', 'array()', 'count()'], ans: 0 },
                { q: 'Цикл дегеніміз не?', options: ['Бірнеше рет қайталанатын код блогы', 'Қателерді түзеу жүйесі', 'Жаңа айнымалы құру', 'Мәліметтер базасы'], ans: 0 }
            ],
            'py_4': [
                { q: 'Элементті тізімнің соңына қандай әдіс қосады?', options: ['add()', 'push()', 'insert()', 'append()'], ans: 3 },
                { q: 'Тізімдегі бірінші элементтің индексі қандай болады?', options: ['1', '0', '-1', '2'], ans: 1 },
                { q: 'Тізімнің ұзындығын қалай білуге болады?', options: ['size()', 'len()', 'length()', 'count()'], ans: 1 }
            ],
            'py_5': [
                { q: 'Калькулятордың финалдық кодында бөлу операциясы кезінде "if num2 != 0:" шарты неліктен тексеріледі?', options: ['Нөлге бөлу қатесін болдырмау үшін', 'Нәтижені дөңгелектеу үшін', 'Санның бүтін екенін тексеру үшін', 'Бұл міндетті емес'], ans: 0 },
                { q: 'Енгізілген мәтінді бөлшек санға қалай айналдырамыз?', options: ['int()', 'float()', 'str()', 'bool()'], ans: 1 },
                { q: 'Көбейту операциясының белгісі қандай?', options: ['x', 'X', '*', '^'], ans: 2 }
            ]
        };
        return quizzes[lessonId] || [];
    },
    render(lessonId, container) {
        const questions = this.getQuestions(lessonId);
        if (questions.length === 0) return '';
        
        this.state[lessonId] = { answers: {} };
        
        const questionsHtml = questions.map((q, qi) => `
            <div class="arvr-question-block" style="margin-top:15px; border-left: 3px solid var(--color-primary); padding-left: 15px;">
              <div class="arvr-question-num">Қосымша тест: Сұрақ ${qi + 1} / ${questions.length}</div>
              <div class="arvr-question-text">${q.q}</div>
              <div class="arvr-options-grid">
                ${q.options.map((opt, oi) => `
                  <div class="arvr-option" id="genopt_${lessonId}_${qi}_${oi}"
                       onclick="GenericQuizManager.selectOption('${lessonId}', ${qi}, ${oi})">
                    <span class="option-letter">${String.fromCharCode(65+oi)}</span>
                    ${opt}
                  </div>`).join('')}
              </div>
            </div>`).join('');

        return `
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <h3 style="margin-bottom:15px;">📝 Теориялық тест</h3>
            ${questionsHtml}
            <button class="btn btn-primary" style="margin-top:15px; width:100%; padding:14px;" onclick="GenericQuizManager.submit('${lessonId}')">
                Тест жауаптарын тексеру
            </button>
            <div class="assignment-feedback" id="generic-feedback"></div>
          </div>`;
    },
    selectOption(lessonId, qi, oi) {
        const st = this.state[lessonId];
        if (st.answers[qi] !== undefined) return;
        const opts = document.querySelectorAll(`[id^="genopt_${lessonId}_${qi}_"]`);
        opts.forEach(o => o.classList.remove('selected'));
        document.getElementById(`genopt_${lessonId}_${qi}_${oi}`)?.classList.add('selected');
        st.answers[qi] = oi;
    },
    submit(lessonId) {
        const questions = this.getQuestions(lessonId);
        const st = this.state[lessonId];
        const feedback = document.getElementById('generic-feedback');
        let errors = [];
        let correct = 0;

        questions.forEach((q, qi) => {
            const chosen = st.answers[qi];
            const allOpts = document.querySelectorAll(`[id^="genopt_${lessonId}_${qi}_"]`);
            
            if (chosen === undefined) {
                errors.push(`❌ Сұрақ ${qi+1}: жауап таңдалмаған.`);
                return;
            }

            allOpts.forEach((el, oi) => {
                if (oi === q.ans) el.classList.add('correct');
                else if (oi === chosen && chosen !== q.ans) el.classList.add('wrong');
                el.style.pointerEvents = 'none';
            });

            if (chosen === q.ans) correct++;
            else errors.push(`❌ Сұрақ ${qi+1}: дұрыс жауап — "${q.options[q.ans]}".`);
        });

        const score = Math.round((correct / questions.length) * 100);
        
        if (errors.length === 0) {
            feedback.className = 'assignment-feedback visible success';
            feedback.innerHTML = `<div class="feedback-title">🎉 Тест дұрыс тапсырылды! (${score}%)</div>`;
        } else {
            feedback.className = `assignment-feedback visible ${score >= 60 ? 'partial' : 'error'}`;
            feedback.innerHTML = `<div class="feedback-title">⚠️ Тест нәтижесі: ${correct}/${questions.length} (${score}%)</div><ul class="feedback-list">${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
        }
    }
};

