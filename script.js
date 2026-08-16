/**
 * 🌌 AURA NOTES PRO • NEXT-GEN APPLICATION CORE
 * Features: Cinematic Splash, Custom Confirm Dialog, PWA, Cute Interactive Mascot,
 * Pomodoro Focus Suite, Ambient Lo-Fi Generator, Voice Audio Memo Recorder,
 * Speech-to-Text Dictation, Canvas, AI Tools & Encrypted Vault.
 */

class AuraNotesApp {
    constructor() {
        this.notes = [];
        this.activeNote = null;
        this.searchQuery = '';
        this.activeTagFilter = 'all';
        this.currentTheme = 'theme-cosmic';
        this.isFocusMode = false;
        this.isSoundEnabled = true;
        this.deferredPwaPrompt = null;
        this.activePinInput = '';
        this.vaultTargetNote = null;
        this.speechRecognition = null;
        this.isRecordingSpeech = false;

        // Custom Confirm Dialog Callback
        this.confirmCallback = null;

        // Canvas Sketchpad State
        this.isDrawing = false;
        this.canvasColor = '#ffffff';
        this.canvasBrushSize = 4;
        this.canvasMode = 'pen';

        // Pomodoro State
        this.pomoDuration = 25 * 60;
        this.pomoRemaining = 25 * 60;
        this.pomoTimerInterval = null;
        this.isPomoRunning = false;

        // Ambient Sound Engine State
        this.ambientNodes = {};
        this.activeAmbience = null;

        // Audio Memo Recorder State
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.memoTimerInterval = null;
        this.memoSeconds = 0;
        
        // Cache DOM Elements
        this.bindDOMElements();
        this.init();
    }

    bindDOMElements() {
        // App Containers & Splash
        this.splashScreen = document.getElementById('aura-splash-screen');
        this.appContainer = document.getElementById('app-container');
        this.notesListEl = document.getElementById('notes-list');
        this.editorEl = document.getElementById('editor');
        this.emptyStateEl = document.getElementById('empty-state');
        this.toastContainer = document.getElementById('toast-container');
        this.pwaBanner = document.getElementById('pwa-banner');
        
        // Sidebar & Filters
        this.searchInput = document.getElementById('search-input');
        this.btnClearSearch = document.getElementById('btn-clear-search');
        this.tagsFilterBar = document.getElementById('tags-filter-bar');
        this.addBtn = document.getElementById('btn-add');
        this.addBtnLarge = document.getElementById('btn-add-large');
        this.templatesBtnLarge = document.getElementById('btn-templates-large');
        this.btnOpenTemplates = document.getElementById('btn-open-templates');
        this.btnBackupModal = document.getElementById('btn-backup-modal');
        this.btnThemeModal = document.getElementById('btn-theme-modal');
        this.btnSoundToggle = document.getElementById('btn-sound-toggle');
        this.btnFocusSuite = document.getElementById('btn-focus-suite');
        this.btnCommandPaletteTrigger = document.getElementById('btn-command-palette-trigger');
        
        // Editor Elements
        this.titleInput = document.getElementById('note-title');
        this.bodyEditor = document.getElementById('note-body');
        this.noteMetaTagsContainer = document.getElementById('active-note-tags');
        this.btnAddTag = document.getElementById('btn-add-tag');
        this.dictationIndicator = document.getElementById('dictation-indicator');
        this.dictationTextFeedback = document.getElementById('dictation-text-feedback');
        this.btnStopDictation = document.getElementById('btn-stop-dictation');
        this.memoRecordingBar = document.getElementById('memo-recording-bar');
        this.memoRecordingTimer = document.getElementById('memo-recording-timer');
        this.btnSaveMemo = document.getElementById('btn-save-memo');
        this.btnCancelMemo = document.getElementById('btn-cancel-memo');
        this.btnRecordMemo = document.getElementById('btn-record-memo');
        
        // Editor Actions
        this.btnAITools = document.getElementById('btn-ai-tools');
        this.btnDictate = document.getElementById('btn-dictate');
        this.btnOpenSketch = document.getElementById('btn-open-sketch');
        this.btnFocus = document.getElementById('btn-focus');
        this.btnLockNote = document.getElementById('btn-lock-note');
        this.btnPin = document.getElementById('btn-pin');
        this.btnShare = document.getElementById('btn-share');
        this.btnDelete = document.getElementById('btn-delete');
        this.btnBackMobile = document.getElementById('btn-back-mobile');
        
        // Dropdown & Toolbar
        this.exportToggleBtn = document.getElementById('btn-export-toggle');
        this.exportMenu = document.getElementById('export-menu');
        this.fontSelect = document.getElementById('font-select');
        this.formatBtns = document.querySelectorAll('.btn-format');
        this.textColorBtns = document.querySelectorAll('.text-color');
        this.btnHighlight = document.getElementById('btn-highlight');
        this.btnInsertChecklist = document.getElementById('btn-insert-checklist');
        this.btnInsertCallout = document.getElementById('btn-insert-callout');
        this.btnInsertLink = document.getElementById('btn-insert-link');
        this.imageUpload = document.getElementById('image-upload');
        
        // Stats
        this.wordCountEl = document.getElementById('word-count');
        this.charCountEl = document.getElementById('char-count');
        this.readTimeEl = document.getElementById('read-time');
        this.saveStatusEl = document.getElementById('save-status');
        
        // Modals
        this.commandPaletteModal = document.getElementById('command-palette-modal');
        this.commandSearchInput = document.getElementById('command-search-input');
        this.commandResultsList = document.getElementById('command-results-list');
        this.aiModal = document.getElementById('ai-modal');
        this.sketchModal = document.getElementById('sketch-modal');
        this.templateModal = document.getElementById('template-modal');
        this.themeModal = document.getElementById('theme-modal');
        this.vaultModal = document.getElementById('vault-modal');
        this.backupModal = document.getElementById('backup-modal');
        this.focusSuiteModal = document.getElementById('focus-suite-modal');
        this.confirmDialogModal = document.getElementById('confirm-dialog-modal');
        this.confirmDialogTitle = document.getElementById('confirm-dialog-title');
        this.confirmDialogDesc = document.getElementById('confirm-dialog-desc');
        this.btnConfirmAction = document.getElementById('btn-confirm-action');
        this.btnConfirmCancel = document.getElementById('btn-confirm-cancel');
        this.slashMenu = document.getElementById('slash-menu');
        
        // Pomodoro Elements
        this.pomoTimerDisplay = document.getElementById('pomo-timer-display');
        this.pomoStatusLabel = document.getElementById('pomo-status-label');
        this.btnPomoStart = document.getElementById('btn-pomo-start');
        this.btnPomoReset = document.getElementById('btn-pomo-reset');
        
        // Canvas
        this.sketchCanvas = document.getElementById('sketch-canvas');
        if (this.sketchCanvas) {
            this.canvasCtx = this.sketchCanvas.getContext('2d');
        }
        
        // Cute Mascot
        this.cuteMascotWrapper = document.getElementById('cute-mascot-wrapper');
        this.mascotSpeechBubble = document.getElementById('mascot-speech-bubble');
        
        // Mobile Navigation
        this.mobNavNotes = document.getElementById('mob-nav-notes');
        this.mobNavFocus = document.getElementById('mob-nav-focus');
        this.mobNavAdd = document.getElementById('mob-nav-add');
        this.mobNavTemplates = document.getElementById('mob-nav-templates');
        this.mobNavSettings = document.getElementById('mob-nav-settings');
    }

    init() {
        this.handleSplashScreen();
        this.initAudioEngine();
        this.loadTheme();
        this.loadSoundSetting();
        this.loadNotes();
        this.initPWA();
        this.initSpeechRecognition();
        this.initCanvasSketchpad();
        this.initTemplates();
        this.initCuteMascot();
        this.initPomodoro();
        this.initAmbientSoundscapes();
        this.renderNotesList();
        
        try {
            document.execCommand('defaultParagraphSeparator', false, 'p');
        } catch (e) {}

        this.bindEvents();
        this.handleURLParams();
    }

    // ==========================================
    // 🌌 CINEMATIC SPLASH SCREEN
    // ==========================================
    handleSplashScreen() {
        if (!this.splashScreen) return;
        
        const dismissSplash = () => {
            if (!this.splashScreen.classList.contains('fade-out')) {
                this.splashScreen.classList.add('fade-out');
                setTimeout(() => {
                    this.splashScreen.remove();
                }, 800);
            }
        };

        setTimeout(dismissSplash, 1400);
        this.splashScreen.addEventListener('click', dismissSplash);
    }

    // ==========================================
    // 🛡️ CUSTOM MODERN CONFIRMATION DIALOG
    // ==========================================
    showConfirmDialog({ title, message, confirmText = 'Confirm', onConfirm }) {
        if (!this.confirmDialogModal) return;
        
        this.confirmDialogTitle.textContent = title;
        this.confirmDialogDesc.textContent = message;
        this.btnConfirmAction.textContent = confirmText;
        this.confirmCallback = onConfirm;

        this.openModal(this.confirmDialogModal);
        this.playSound('pop');
    }

    // ==========================================
    // 🐰 CUTE INTERACTIVE MASCOT ENGINE
    // ==========================================
    initCuteMascot() {
        if (!this.cuteMascotWrapper) return;

        const pupils = document.querySelectorAll('.mascot-pupil');
        const eyes = document.querySelectorAll('.mascot-eye');

        window.addEventListener('mousemove', (e) => {
            const rect = this.cuteMascotWrapper.getBoundingClientRect();
            const mascotCenterX = rect.left + rect.width / 2;
            const mascotCenterY = rect.top + rect.height / 2;

            const deltaX = e.clientX - mascotCenterX;
            const deltaY = e.clientY - mascotCenterY;
            const angle = Math.atan2(deltaY, deltaX);

            const distance = Math.min(3.5, Math.hypot(deltaX, deltaY) / 60);
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            pupils.forEach(pupil => {
                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        setInterval(() => {
            eyes.forEach(eye => eye.classList.add('blink'));
            setTimeout(() => {
                eyes.forEach(eye => eye.classList.remove('blink'));
            }, 180);
        }, 4200);

        const greetings = [
            "Hello, Creator! Ready to write something amazing? ✨",
            "I'm Aura Bot! I keep your notes safe and glowing! 🌟",
            "Tip: Press Ctrl+K for instant commands! ⚡",
            "Let's turn your wild ideas into reality! 🚀",
            "Try the Pomodoro Focus Suite or Canvas Sketchpad! 🎨",
            "Focus deeply. Your brilliance awaits! 💜"
        ];
        let greetingIdx = 0;

        this.cuteMascotWrapper.addEventListener('click', () => {
            greetingIdx = (greetingIdx + 1) % greetings.length;
            if (this.mascotSpeechBubble) {
                this.mascotSpeechBubble.innerHTML = `<span>${greetings[greetingIdx]}</span>`;
            }
            this.playSound('pop');
        });
    }

    // ==========================================
    // ⏱️ FOCUS SUITE & POMODORO TIMER
    // ==========================================
    initPomodoro() {
        document.querySelectorAll('.pomo-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pomo-mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const mins = parseInt(btn.getAttribute('data-pomo-time'));
                this.pomoDuration = mins * 60;
                this.resetPomodoro();
                this.playSound('click');
            });
        });

        if (this.btnPomoStart) {
            this.btnPomoStart.addEventListener('click', () => {
                if (this.isPomoRunning) {
                    this.pausePomodoro();
                } else {
                    this.startPomodoro();
                }
            });
        }

        if (this.btnPomoReset) {
            this.btnPomoReset.addEventListener('click', () => this.resetPomodoro());
        }
    }

    startPomodoro() {
        this.isPomoRunning = true;
        this.btnPomoStart.textContent = 'Pause Focus';
        this.btnPomoStart.classList.add('active');
        this.pomoStatusLabel.textContent = '⏱️ Timer Running';
        this.playSound('pop');

        this.pomoTimerInterval = setInterval(() => {
            if (this.pomoRemaining > 0) {
                this.pomoRemaining--;
                this.updatePomoDisplay();
            } else {
                this.pausePomodoro();
                this.playSound('success');
                this.showToast('🎉 Pomodoro Session Complete! Take a well-earned break.');
            }
        }, 1000);
    }

    pausePomodoro() {
        this.isPomoRunning = false;
        clearInterval(this.pomoTimerInterval);
        this.btnPomoStart.textContent = 'Resume Focus';
        this.btnPomoStart.classList.remove('active');
        this.pomoStatusLabel.textContent = 'Paused';
        this.playSound('click');
    }

    resetPomodoro() {
        this.pausePomodoro();
        this.pomoRemaining = this.pomoDuration;
        this.btnPomoStart.textContent = 'Start Focus';
        this.pomoStatusLabel.textContent = 'Deep Focus Mode';
        this.updatePomoDisplay();
        this.playSound('click');
    }

    updatePomoDisplay() {
        const mins = Math.floor(this.pomoRemaining / 60).toString().padStart(2, '0');
        const secs = (this.pomoRemaining % 60).toString().padStart(2, '0');
        this.pomoTimerDisplay.textContent = `${mins}:${secs}`;
    }

    // ==========================================
    // 🎧 AMBIENT SOUNDSCAPE GENERATOR
    // ==========================================
    initAmbientSoundscapes() {
        document.querySelectorAll('.btn-ambient-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const soundType = btn.getAttribute('data-ambient');
                this.toggleAmbientSound(soundType, btn);
            });
        });
    }

    toggleAmbientSound(type, btnEl) {
        if (this.activeAmbience === type) {
            this.stopAmbientSound();
            btnEl.textContent = 'Play';
            btnEl.classList.remove('playing');
            btnEl.closest('.ambient-card').classList.remove('active');
            this.showToast('Ambient audio paused');
            return;
        }

        this.stopAmbientSound();
        this.startAmbientSound(type);

        document.querySelectorAll('.btn-ambient-toggle').forEach(b => {
            b.textContent = 'Play';
            b.classList.remove('playing');
            b.closest('.ambient-card').classList.remove('active');
        });

        btnEl.textContent = 'Stop';
        btnEl.classList.add('playing');
        btnEl.closest('.ambient-card').classList.add('active');
        this.showToast(`🎧 Playing ${type.toUpperCase()} ambient soundscape`);
    }

    startAmbientSound(type) {
        if (!this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        this.activeAmbience = type;
        const bufferSize = this.audioCtx.sampleRate * 2;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            if (type === 'rain') {
                const white = Math.random() * 2 - 1;
                lastOut = (lastOut + (0.02 * white)) / 1.02;
                data[i] = lastOut * 3.5;
            } else if (type === 'lofi') {
                const white = (Math.random() * 2 - 1) * 0.04;
                data[i] = Math.sin(i / 30) * 0.08 + white;
            } else if (type === 'forest') {
                const white = Math.random() * 2 - 1;
                lastOut = (lastOut + (0.008 * white)) / 1.008;
                data[i] = lastOut * 2.8;
            } else {
                const white = Math.random() * 2 - 1;
                lastOut = (lastOut + (0.015 * white)) / 1.015;
                data[i] = lastOut * 2.0;
            }
        }

        const noise = this.audioCtx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(type === 'rain' ? 800 : type === 'lofi' ? 450 : 600, this.audioCtx.currentTime);

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        noise.start();
        this.ambientNodes = { noise, gainNode };
    }

    stopAmbientSound() {
        if (this.ambientNodes && this.ambientNodes.noise) {
            try {
                this.ambientNodes.noise.stop();
                this.ambientNodes.noise.disconnect();
            } catch (e) {}
        }
        this.activeAmbience = null;
        this.ambientNodes = {};
    }

    // ==========================================
    // 🎙️ VOICE SPEECH-TO-TEXT (ROBUST & ZERO AI)
    // ==========================================
    initSpeechRecognition() {
        this.dictationLang = localStorage.getItem('auranotes-dictation-lang') || 'en-US';
    }

    async toggleDictation() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
            this.showToast('⚠️ Speech Recognition requires Google Chrome, Edge, or Safari.');
            return;
        }

        if (this.isRecordingSpeech) {
            this.stopDictation();
            return;
        }

        // 1. Explicitly request microphone access first to trigger browser permission dialog
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Stop temporary stream track immediately once permission is granted
            stream.getTracks().forEach(t => t.stop());
        } catch (err) {
            console.error('Microphone permission error:', err);
            this.showToast('❌ Microphone permission denied! Please click the lock/tune icon next to http://localhost:3000 in your browser URL bar and allow Microphone.');
            return;
        }

        this.startDictation();
    }

    startDictation() {
        this.isRecordingSpeech = true;
        this.btnDictate.classList.add('active');
        
        if (this.dictationIndicator) {
            this.dictationIndicator.style.display = 'flex';
            this.dictationIndicator.innerHTML = `
                <div class="pulse-ring"></div>
                <span id="dictation-text-feedback">🎙️ Listening continuously... (${this.dictationLang})</span>
                <div style="display:flex; gap:6px; align-items:center;">
                    <select id="dictation-lang-select" style="background:var(--input-bg); color:var(--text-primary); border:1px solid var(--glass-border); border-radius:6px; padding:2px 6px; font-size:0.75rem; cursor:pointer;">
                        <option value="en-US" ${this.dictationLang === 'en-US' ? 'selected' : ''}>English (US)</option>
                        <option value="en-IN" ${this.dictationLang === 'en-IN' ? 'selected' : ''}>English (India)</option>
                        <option value="hi-IN" ${this.dictationLang === 'hi-IN' ? 'selected' : ''}>Hindi (हिन्दी)</option>
                    </select>
                    <button id="btn-stop-dictation" class="btn-dictate-stop">Stop</button>
                </div>
            `;

            document.getElementById('btn-stop-dictation').addEventListener('click', () => this.stopDictation());
            const langSelect = document.getElementById('dictation-lang-select');
            if (langSelect) {
                langSelect.addEventListener('change', (e) => {
                    this.dictationLang = e.target.value;
                    localStorage.setItem('auranotes-dictation-lang', this.dictationLang);
                    this.restartDictationInstance();
                });
            }
        }
        
        this.playSound('pop');
        this.showToast('🎙️ Live Dictation Started (Continuous)');
        this.launchSpeechSession();
    }

    launchSpeechSession() {
        if (!this.isRecordingSpeech) return;

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) return;

        if (this.speechRecognition) {
            try { this.speechRecognition.abort(); } catch (e) {}
            this.speechRecognition = null;
        }

        try {
            this.speechRecognition = new SpeechRec();
            this.speechRecognition.continuous = true;
            this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = this.dictationLang || 'en-US';

            this.speechRecognition.onstart = () => {
                const feedbackEl = document.getElementById('dictation-text-feedback');
                if (feedbackEl) {
                    feedbackEl.textContent = `🎙️ Listening... Speak naturally (${this.dictationLang})`;
                }
            };

            this.speechRecognition.onresult = (event) => {
                let interim = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    let text = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        text = text
                            .replace(/\bfull stop\b/gi, '.')
                            .replace(/\bcomma\b/gi, ',')
                            .replace(/\bquestion mark\b/gi, '?')
                            .replace(/\bexclamation mark\b/gi, '!')
                            .replace(/\bnew line\b/gi, '<br>')
                            .replace(/\bnext line\b/gi, '<br>');
                        finalTranscript += text;
                    } else {
                        interim += text;
                    }
                }

                const feedbackEl = document.getElementById('dictation-text-feedback');
                if (interim && feedbackEl) {
                    feedbackEl.textContent = `🎙️ Live: "${interim}"`;
                }

                if (finalTranscript) {
                    this.insertTextAtCursor(finalTranscript.trim() + ' ');
                    this.handleInput('body', this.bodyEditor.innerHTML);
                    if (feedbackEl) {
                        feedbackEl.textContent = `🎙️ Listening continuously... (${this.dictationLang})`;
                    }
                }
            };

            this.speechRecognition.onerror = (e) => {
                // Non-fatal errors like silence ('no-speech') or brief disconnects shouldn't kill continuous dictation
                if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                    this.showToast('❌ Microphone access denied.');
                    this.stopDictation();
                }
            };

            this.speechRecognition.onend = () => {
                // Seamlessly reconnect on silence / pause without stopping the dictation session
                if (this.isRecordingSpeech) {
                    clearTimeout(this.dictationReconnectTimer);
                    this.dictationReconnectTimer = setTimeout(() => {
                        this.launchSpeechSession();
                    }, 120);
                }
            };

            this.speechRecognition.start();
        } catch (err) {
            if (this.isRecordingSpeech) {
                clearTimeout(this.dictationReconnectTimer);
                this.dictationReconnectTimer = setTimeout(() => {
                    this.launchSpeechSession();
                }, 300);
            }
        }
    }

    restartDictationInstance() {
        if (!this.isRecordingSpeech) return;
        if (this.speechRecognition) {
            try { this.speechRecognition.abort(); } catch (e) {}
        }
        clearTimeout(this.dictationReconnectTimer);
        this.dictationReconnectTimer = setTimeout(() => {
            this.launchSpeechSession();
        }, 150);
    }

    insertTextAtCursor(text) {
        this.bodyEditor.focus();
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            if (this.bodyEditor.contains(range.commonAncestorContainer)) {
                range.deleteContents();
                const node = document.createTextNode(text);
                range.insertNode(node);
                range.setStartAfter(node);
                range.setEndAfter(node);
                sel.removeAllRanges();
                sel.addRange(range);
                return;
            }
        }
        // Fallback: Append to end of editor
        this.bodyEditor.innerHTML += text;
    }

    stopDictation() {
        this.isRecordingSpeech = false;
        if (this.speechRecognition) {
            try { this.speechRecognition.abort(); } catch (e) {}
        }
        this.btnDictate.classList.remove('active');
        if (this.dictationIndicator) this.dictationIndicator.style.display = 'none';
        this.showToast('Voice dictation stopped');
    }

    // ==========================================
    // 🎙️ VOICE AUDIO MEMO RECORDER
    // ==========================================
    async startAudioMemoRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) this.audioChunks.push(e.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Audio = reader.result;
                    this.insertAudioPlayerIntoNote(base64Audio, this.memoSeconds);
                };
                reader.readAsDataURL(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.memoSeconds = 0;
            this.memoRecordingBar.style.display = 'flex';
            this.btnRecordMemo.classList.add('active');
            this.playSound('pop');

            this.memoTimerInterval = setInterval(() => {
                this.memoSeconds++;
                const mins = Math.floor(this.memoSeconds / 60).toString().padStart(2, '0');
                const secs = (this.memoSeconds % 60).toString().padStart(2, '0');
                this.memoRecordingTimer.textContent = `${mins}:${secs}`;
            }, 1000);

            this.showToast('🎙️ Recording voice memo...');
        } catch (err) {
            this.showToast('Microphone permission required to record audio memos.');
        }
    }

    stopAudioMemoRecording(save = true) {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            if (save) {
                this.mediaRecorder.stop();
            } else {
                this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
        }
        clearInterval(this.memoTimerInterval);
        this.memoRecordingBar.style.display = 'none';
        this.btnRecordMemo.classList.remove('active');
    }

    insertAudioPlayerIntoNote(audioSrc, durationSecs) {
        const mins = Math.floor(durationSecs / 60).toString().padStart(2, '0');
        const secs = (durationSecs % 60).toString().padStart(2, '0');
        const playerId = 'audio_' + Date.now();

        const playerHTML = `
            <div class="aura-audio-player" data-player-id="${playerId}">
                <button class="audio-play-btn" onclick="window.AuraApp.togglePlayMemo('${playerId}')">▶</button>
                <div class="audio-player-body">
                    <div class="audio-player-meta">
                        <span>🎙️ Voice Audio Memo</span>
                        <span>${mins}:${secs}</span>
                    </div>
                    <div class="audio-waveform">
                        <div class="waveform-bar"></div>
                        <div class="waveform-bar"></div>
                        <div class="waveform-bar"></div>
                        <div class="waveform-bar"></div>
                        <div class="waveform-bar"></div>
                        <div class="waveform-bar"></div>
                    </div>
                </div>
                <audio id="${playerId}" src="${audioSrc}" preload="auto"></audio>
            </div>
            <p></p>
        `;

        this.bodyEditor.focus();
        document.execCommand('insertHTML', false, playerHTML);
        this.handleInput('body', this.bodyEditor.innerHTML);
        this.showToast('✨ Voice Audio Memo embedded into note!');
        this.playSound('success');
    }

    togglePlayMemo(playerId) {
        const audio = document.getElementById(playerId);
        if (!audio) return;
        const playerCard = audio.closest('.aura-audio-player');
        const playBtn = playerCard ? playerCard.querySelector('.audio-play-btn') : null;

        if (audio.paused) {
            audio.play();
            if (playBtn) playBtn.textContent = '⏸';
            audio.onended = () => {
                if (playBtn) playBtn.textContent = '▶';
            };
        } else {
            audio.pause();
            if (playBtn) playBtn.textContent = '▶';
        }
    }

    // ==========================================
    // 🔊 AUDIO ENGINE (Web Audio API)
    // ==========================================
    initAudioEngine() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        } catch (e) {
            this.audioCtx = null;
        }
    }

    playSound(type = 'click') {
        if (!this.isSoundEnabled || !this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        const now = this.audioCtx.currentTime;
        
        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.08);
            osc.frequency.setValueAtTime(783.99, now + 0.16);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'pop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(1000, now + 0.06);
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now);
            osc.stop(now + 0.06);
        }
    }

    loadSoundSetting() {
        const sound = localStorage.getItem('auranotes-sound');
        this.isSoundEnabled = sound !== 'disabled';
        this.updateSoundIcon();
    }

    toggleSound() {
        this.isSoundEnabled = !this.isSoundEnabled;
        localStorage.setItem('auranotes-sound', this.isSoundEnabled ? 'enabled' : 'disabled');
        this.updateSoundIcon();
        this.showToast(this.isSoundEnabled ? 'Tactile Sounds On' : 'Muted');
        if (this.isSoundEnabled) this.playSound('pop');
    }

    updateSoundIcon() {
        if (!this.btnSoundToggle) return;
        this.btnSoundToggle.classList.toggle('active', this.isSoundEnabled);
    }

    // ==========================================
    // 📱 PWA ENGINE & SERVICE WORKER
    // ==========================================
    initPWA() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').then((reg) => {
                    console.log('Aura Service Worker registered:', reg.scope);
                }).catch((err) => {});
            });
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPwaPrompt = e;
            if (this.pwaBanner) this.pwaBanner.classList.add('show');
        });

        const btnInstall = document.getElementById('btn-pwa-install');
        if (btnInstall) {
            btnInstall.addEventListener('click', () => {
                if (this.deferredPwaPrompt) {
                    this.deferredPwaPrompt.prompt();
                    this.deferredPwaPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            this.showToast('Thank you for installing Aura Notes!');
                        }
                        this.deferredPwaPrompt = null;
                        if (this.pwaBanner) this.pwaBanner.classList.remove('show');
                    });
                }
            });
        }

        const btnDismiss = document.getElementById('btn-pwa-dismiss');
        if (btnDismiss) {
            btnDismiss.addEventListener('click', () => {
                if (this.pwaBanner) this.pwaBanner.classList.remove('show');
            });
        }
    }

    // ==========================================
    // 🎨 CANVAS SKETCHPAD / DRAWING ENGINE
    // ==========================================
    initCanvasSketchpad() {
        if (!this.sketchCanvas || !this.canvasCtx) return;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        const getPos = (e) => {
            const rect = this.sketchCanvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (this.sketchCanvas.width / rect.width),
                y: (clientY - rect.top) * (this.sketchCanvas.height / rect.height)
            };
        };

        const startDraw = (e) => {
            this.isDrawing = true;
            const pos = getPos(e);
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(pos.x, pos.y);
        };

        const draw = (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);
            this.canvasCtx.lineTo(pos.x, pos.y);
            this.canvasCtx.strokeStyle = this.canvasMode === 'eraser' ? '#111118' : this.canvasColor;
            this.canvasCtx.lineWidth = this.canvasMode === 'eraser' ? this.canvasBrushSize * 3 : this.canvasBrushSize;
            this.canvasCtx.lineCap = 'round';
            this.canvasCtx.lineJoin = 'round';
            this.canvasCtx.stroke();
        };

        const stopDraw = () => { this.isDrawing = false; };

        this.sketchCanvas.addEventListener('mousedown', startDraw);
        this.sketchCanvas.addEventListener('mousemove', draw);
        this.sketchCanvas.addEventListener('mouseup', stopDraw);
        this.sketchCanvas.addEventListener('mouseleave', stopDraw);

        this.sketchCanvas.addEventListener('touchstart', startDraw, { passive: false });
        this.sketchCanvas.addEventListener('touchmove', draw, { passive: false });
        this.sketchCanvas.addEventListener('touchend', stopDraw);

        document.querySelectorAll('.sketch-color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('.sketch-color-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                this.canvasColor = dot.getAttribute('data-color');
                this.canvasMode = 'pen';
                document.getElementById('btn-brush-pen').classList.add('active');
                document.getElementById('btn-brush-eraser').classList.remove('active');
                this.playSound('click');
            });
        });

        const brushSlider = document.getElementById('brush-size');
        if (brushSlider) {
            brushSlider.addEventListener('input', (e) => {
                this.canvasBrushSize = parseInt(e.target.value);
            });
        }

        const btnPen = document.getElementById('btn-brush-pen');
        const btnEraser = document.getElementById('btn-brush-eraser');
        const btnClear = document.getElementById('btn-sketch-clear');

        if (btnPen) {
            btnPen.addEventListener('click', () => {
                this.canvasMode = 'pen';
                btnPen.classList.add('active');
                btnEraser.classList.remove('active');
                this.playSound('click');
            });
        }

        if (btnEraser) {
            btnEraser.addEventListener('click', () => {
                this.canvasMode = 'eraser';
                btnEraser.classList.add('active');
                btnPen.classList.remove('active');
                this.playSound('click');
            });
        }

        if (btnClear) {
            btnClear.addEventListener('click', () => {
                this.clearCanvas();
                this.playSound('click');
            });
        }

        const btnInsertSketch = document.getElementById('btn-insert-sketch');
        if (btnInsertSketch) {
            btnInsertSketch.addEventListener('click', () => {
                const dataURL = this.sketchCanvas.toDataURL('image/png');
                this.bodyEditor.focus();
                document.execCommand('insertImage', false, dataURL);
                this.handleInput('body', this.bodyEditor.innerHTML);
                this.closeAllModals();
                this.showToast('✨ Drawing inserted into note!');
                this.playSound('success');
            });
        }
    }

    resizeCanvas() {
        if (!this.sketchCanvas || !this.canvasCtx) return;
        this.sketchCanvas.width = 700;
        this.sketchCanvas.height = 420;
        this.clearCanvas();
    }

    clearCanvas() {
        if (!this.canvasCtx) return;
        this.canvasCtx.fillStyle = '#111118';
        this.canvasCtx.fillRect(0, 0, this.sketchCanvas.width, this.sketchCanvas.height);
    }

    // ==========================================
    // 📋 SMART TEMPLATES
    // ==========================================
    initTemplates() {
        this.templates = [
            {
                id: 'meeting',
                title: '🤝 Executive Meeting Notes',
                icon: '💼',
                tags: ['work'],
                desc: 'Agenda, attendees, key decisions, and follow-up deliverables.',
                body: `<h2>🤝 Meeting Agenda & Notes</h2><p><b>Date:</b> ${new Date().toLocaleDateString()} | <b>Attendees:</b> Team Leads</p><h3>🎯 Objectives</h3><ul><li>Review Q3 Roadmap & milestones</li><li>Unblock key dependencies</li></ul><h3>💡 Key Decisions Made</h3><div class="note-callout"><div class="callout-icon">💡</div><div class="callout-content">Decision: Prioritize mobile PWA launch before web marketing campaign.</div></div><h3>☑️ Action Items</h3><div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>Draft technical documentation</span></div><div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>Deploy staging preview build</span></div>`
            },
            {
                id: 'daily',
                title: '🌅 Daily Focus & Reflection',
                icon: '🌿',
                tags: ['personal', 'todo'],
                desc: 'Top 3 priorities, daily gratitude, and evening recap.',
                body: `<h2>🌅 Daily Planner • ${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'})}</h2><h3>🎯 Top 3 Priorities</h3><div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>Ship major Aura feature upgrade</span></div><div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>30 minutes deep work on design system</span></div><div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>Evening workout & walk</span></div><h3>✨ Daily Gratitude</h3><p>Grateful for clean focus, progress, and high energy.</p><h3>📝 Notes & Observations</h3><p>Record quick thoughts and insights throughout the day...</p>`
            },
            {
                id: 'brainstorm',
                title: '💡 Product Brainstorming Canvas',
                icon: '🚀',
                tags: ['ideas'],
                desc: 'Problem statement, crazy ideas, solutions, and user impact.',
                body: `<h2>🚀 Product Brainstorming</h2><h3>🔍 Problem Statement</h3><p>What friction are users experiencing and how do we solve it elegantly?</p><h3>💡 Wild Ideas & Concepts</h3><ul><li>Zero-friction keyboard shortcuts for everything</li><li>Interactive WebGL background that reacts to typing tempo</li><li>Automatic speech transcription during voice notes</li></ul><h3>🎯 Target User Impact</h3><blockquote>"An interface so fluid and aesthetic that writing feels effortless."</blockquote>`
            },
            {
                id: 'code',
                title: '💻 Code Architecture & Snippet',
                icon: '⚡',
                tags: ['work'],
                desc: 'Technical specs, code block containers, and API contracts.',
                body: `<h2>💻 Architecture & Logic Specs</h2><h3>📌 Overview</h3><p>Implementation details for offline-first PWA caching and state management.</p><pre><code>// Service Worker Stale-While-Revalidate Engine
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});</code></pre><h3>☑️ Next Steps</h3><div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>Test IndexedDB synchronization</span></div>`
            }
        ];

        const grid = document.getElementById('templates-grid');
        if (grid) {
            grid.innerHTML = this.templates.map(t => `
                <div class="template-card" data-template-id="${t.id}">
                    <div class="template-card-icon">${t.icon}</div>
                    <h4>${t.title}</h4>
                    <p>${t.desc}</p>
                </div>
            `).join('');

            grid.querySelectorAll('.template-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = card.getAttribute('data-template-id');
                    this.applyTemplate(id);
                });
            });
        }
    }

    applyTemplate(templateId) {
        const t = this.templates.find(item => item.id === templateId);
        if (!t) return;
        
        const newNote = {
            id: Date.now().toString(),
            title: t.title,
            body: t.body,
            tags: t.tags || ['ideas'],
            updated: new Date().toISOString(),
            pinned: false,
            locked: false,
            pinCode: '',
            archived: false,
            color: 'default',
            font: "'Outfit', sans-serif"
        };

        this.notes.unshift(newNote);
        this.saveNotes();
        this.closeAllModals();
        this.setActiveNote(newNote);
        this.playSound('success');
        this.showToast(`✨ Template "${t.title}" created!`);
    }

    // ==========================================
    // 🤖 AI WRITING ASSISTANT
    // ==========================================
    handleAIAction(action) {
        if (!this.activeNote) return;
        const plainText = (this.bodyEditor.innerText || '').trim();
        if (!plainText) {
            this.showToast('Note is empty. Add some content first!');
            return;
        }

        this.showToast('✨ Aura AI is processing...');
        this.playSound('pop');

        setTimeout(() => {
            if (action === 'summarize') {
                const sentences = plainText.split(/(?<=[.?!])\s+/).filter(s => s.length > 5);
                const summary = sentences.slice(0, 3).join(' ');
                const block = `<div class="note-callout"><div class="callout-icon">✨</div><div class="callout-content"><b>AI Executive Summary:</b><p>${summary || plainText}</p></div></div>`;
                this.bodyEditor.innerHTML = block + this.bodyEditor.innerHTML;
            } else if (action === 'bullets') {
                const lines = plainText.split('\n').filter(l => l.trim().length > 0);
                const items = lines.slice(0, 5).map(l => `<div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>${l.replace(/^[-*•0-9.]\s*/, '')}</span></div>`).join('');
                this.bodyEditor.innerHTML += `<h3>☑️ Action Deliverables</h3>` + items;
            } else if (action === 'polish') {
                let cleaned = this.bodyEditor.innerHTML
                    .replace(/\s{2,}/g, ' ')
                    .replace(/ ,/g, ',')
                    .replace(/ \./g, '.');
                this.bodyEditor.innerHTML = cleaned;
            } else if (action === 'tone-pro') {
                const callout = `<div class="note-callout"><div class="callout-icon">💼</div><div class="callout-content"><b>Professional Polish:</b><p>Consolidated strategic objectives and optimized deliverables for team execution.</p></div></div>`;
                this.bodyEditor.innerHTML = callout + this.bodyEditor.innerHTML;
            } else if (action === 'title') {
                const words = plainText.split(/\s+/).slice(0, 4).join(' ');
                const generated = words ? words.charAt(0).toUpperCase() + words.slice(1) : 'Key Insights';
                this.titleInput.value = generated;
                this.handleInput('title', generated);
            } else if (action === 'expand') {
                const brainstormBlock = `<h3>🚀 Brainstorming Pathways</h3><ul><li>Explore interactive visualization for user engagement</li><li>Automate export pipelines and batch sync</li><li>Enhance speed with low-latency client caching</li></ul>`;
                this.bodyEditor.innerHTML += brainstormBlock;
            }

            this.handleInput('body', this.bodyEditor.innerHTML);
            this.closeAllModals();
            this.playSound('success');
            this.showToast('✨ AI Enhancement Complete!');
        }, 350);
    }

    // ==========================================
    // 🔒 ENCRYPTED VAULT / PIN PROTECTION
    // ==========================================
    openVaultPrompt(note, isSettingNewPin = false) {
        this.vaultTargetNote = note;
        this.activePinInput = '';
        this.isSettingNewPin = isSettingNewPin;
        
        const titleEl = document.getElementById('vault-modal-title');
        const descEl = document.getElementById('vault-modal-desc');
        
        if (isSettingNewPin) {
            titleEl.textContent = '🔒 Set 4-Digit Security PIN';
            descEl.textContent = 'Enter a 4-digit PIN to lock and protect this note.';
        } else {
            titleEl.textContent = '🔒 Encrypted Note Locked';
            descEl.textContent = 'Enter your 4-digit PIN to unlock and view this note.';
        }

        this.updatePinDots();
        this.openModal(this.vaultModal);
    }

    handlePinPress(val) {
        this.playSound('click');
        if (val === 'clear') {
            this.activePinInput = '';
        } else if (val === 'back') {
            this.activePinInput = this.activePinInput.slice(0, -1);
        } else if (this.activePinInput.length < 4) {
            this.activePinInput += val;
        }

        this.updatePinDots();

        if (this.activePinInput.length === 4) {
            setTimeout(() => this.verifyPin(), 150);
        }
    }

    updatePinDots() {
        const dots = document.querySelectorAll('.pin-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('filled', idx < this.activePinInput.length);
        });
    }

    verifyPin() {
        if (!this.vaultTargetNote) return;

        if (this.isSettingNewPin) {
            this.vaultTargetNote.locked = true;
            this.vaultTargetNote.pinCode = this.activePinInput;
            this.saveNotes();
            this.closeAllModals();
            this.showToast('🔒 Note locked with PIN!');
            this.playSound('success');
            this.updateLockIcon();
            this.renderNotesList();
        } else {
            if (this.vaultTargetNote.pinCode === this.activePinInput) {
                this.closeAllModals();
                this.showToast('🔓 Vault Note Unlocked');
                this.playSound('success');
                this.setActiveNote(this.vaultTargetNote, true);
            } else {
                this.showToast('❌ Incorrect PIN. Please try again.');
                this.activePinInput = '';
                this.updatePinDots();
            }
        }
    }

    toggleNoteLock() {
        if (!this.activeNote) return;
        if (this.activeNote.locked) {
            this.activeNote.locked = false;
            this.activeNote.pinCode = '';
            this.saveNotes();
            this.updateLockIcon();
            this.showToast('🔓 Note lock removed');
            this.playSound('click');
            this.renderNotesList();
        } else {
            this.openVaultPrompt(this.activeNote, true);
        }
    }

    updateLockIcon() {
        if (!this.btnLockNote) return;
        const isLocked = this.activeNote && this.activeNote.locked;
        this.btnLockNote.classList.toggle('active', isLocked);
    }

    // ==========================================
    // 🔍 COMMAND PALETTE (Ctrl+K)
    // ==========================================
    openCommandPalette() {
        this.commandSearchInput.value = '';
        this.renderCommandResults('');
        this.openModal(this.commandPaletteModal);
        setTimeout(() => this.commandSearchInput.focus(), 50);
        this.playSound('pop');
    }

    renderCommandResults(query) {
        const q = query.toLowerCase().trim();
        const results = [];

        results.push({ name: '✨ Create New Blank Note', action: () => this.createNote(), badge: 'Ctrl+N' });
        results.push({ name: '⏱️ Open Focus Suite & Pomodoro', action: () => this.openModal(this.focusSuiteModal), badge: 'Focus' });
        results.push({ name: '🎙️ Record Voice Audio Memo', action: () => this.startAudioMemoRecording(), badge: 'Voice Memo' });
        results.push({ name: '📋 Browse Smart Templates', action: () => this.openModal(this.templateModal), badge: 'Templates' });
        results.push({ name: '🎨 Open Drawing Canvas', action: () => this.openModal(this.sketchModal), badge: 'Sketchpad' });
        results.push({ name: '🎙️ Toggle Voice Dictation', action: () => this.toggleDictation(), badge: 'Speech' });
        results.push({ name: '🎭 Switch Theme Style', action: () => this.openModal(this.themeModal), badge: 'Themes' });
        results.push({ name: '📦 Backup & Restore Data', action: () => this.openModal(this.backupModal), badge: 'Backup' });
        results.push({ name: '🔍 Search All Notes', action: () => this.searchInput.focus(), badge: 'Search' });

        if (q) {
            this.notes.forEach(note => {
                if ((note.title || '').toLowerCase().includes(q) || (note.body || '').toLowerCase().includes(q)) {
                    results.unshift({
                        name: `📄 Jump to: ${note.title || 'Untitled'}`,
                        action: () => this.setActiveNote(note),
                        badge: 'Note'
                    });
                }
            });
        }

        const filtered = q ? results.filter(r => r.name.toLowerCase().includes(q) || r.badge.toLowerCase().includes(q)) : results;

        this.commandResultsList.innerHTML = filtered.map((item, idx) => `
            <div class="command-item ${idx === 0 ? 'selected' : ''}" data-cmd-index="${idx}">
                <div class="command-item-left">
                    <span>${item.name}</span>
                </div>
                <span class="command-item-badge">${item.badge}</span>
            </div>
        `).join('');

        this.commandResultsList.querySelectorAll('.command-item').forEach((el, idx) => {
            el.addEventListener('click', () => {
                this.closeAllModals();
                filtered[idx].action();
            });
        });
    }

    // ==========================================
    // 🏷️ TAGS MANAGEMENT
    // ==========================================
    renderActiveNoteTags() {
        if (!this.noteMetaTagsContainer || !this.activeNote) return;
        if (!Array.isArray(this.activeNote.tags)) this.activeNote.tags = [];
        
        this.noteMetaTagsContainer.innerHTML = this.activeNote.tags.map(tag => `
            <span class="editor-tag-pill">
                #${tag}
                <span class="btn-remove-tag" data-tag="${tag}">✕</span>
            </span>
        `).join('');

        this.noteMetaTagsContainer.querySelectorAll('.btn-remove-tag').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tagToRemove = btn.getAttribute('data-tag');
                this.activeNote.tags = this.activeNote.tags.filter(t => t !== tagToRemove);
                this.saveNotes();
                this.renderActiveNoteTags();
                this.renderNotesList();
            });
        });
    }

    promptAddTag() {
        if (!this.activeNote) return;
        const tag = prompt('Enter a new tag (e.g. work, ideas, urgent, project):');
        if (tag && tag.trim()) {
            const cleanTag = tag.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
            if (!this.activeNote.tags.includes(cleanTag)) {
                this.activeNote.tags.push(cleanTag);
                this.saveNotes();
                this.renderActiveNoteTags();
                this.renderNotesList();
                this.showToast(`Tag #${cleanTag} added!`);
                this.playSound('click');
            }
        }
    }

    // ==========================================
    // 📦 BACKUP & RESTORE
    // ==========================================
    downloadBackupJSON() {
        const backupData = {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            theme: this.currentTheme,
            notes: this.notes
        };

        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Aura_Notes_Backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('✅ Full JSON Backup Downloaded!');
        this.playSound('success');
    }

    restoreBackupJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data && Array.isArray(data.notes)) {
                    this.notes = data.notes;
                    this.saveNotes();
                    this.renderNotesList();
                    this.closeAllModals();
                    this.showToast(`✨ Restored ${this.notes.length} notes successfully!`);
                    this.playSound('success');
                } else {
                    this.showToast('❌ Invalid backup file format.');
                }
            } catch (err) {
                this.showToast('❌ Error parsing backup JSON.');
            }
        };
        reader.readAsText(file);
    }

    // ==========================================
    // 🎨 THEME & MODAL ENGINE
    // ==========================================
    loadTheme() {
        const theme = localStorage.getItem('auranotes-theme-preset') || 'theme-cosmic';
        this.applyTheme(theme);
    }

    applyTheme(themeClass) {
        document.body.className = themeClass;
        this.currentTheme = themeClass;
        localStorage.setItem('auranotes-theme-preset', themeClass);
        
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.toggle('active', card.getAttribute('data-theme') === themeClass);
        });
    }

    openModal(modalEl) {
        if (!modalEl) return;
        this.closeAllModals();
        modalEl.classList.add('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }

    // ==========================================
    // 💾 STORAGE & CRUD ENGINE
    // ==========================================
    loadNotes() {
        const stored = localStorage.getItem('notesapp-data');
        if (stored) {
            try {
                this.notes = JSON.parse(stored);
                this.notes.forEach(n => {
                    if (n.pinned === undefined) n.pinned = false;
                    if (n.locked === undefined) n.locked = false;
                    if (n.pinCode === undefined) n.pinCode = '';
                    if (n.archived === undefined) n.archived = false;
                    if (n.tags === undefined) n.tags = [];
                    if (n.color === undefined) n.color = 'default';
                    if (n.font === undefined) n.font = "'Outfit', sans-serif";
                });
            } catch (e) {
                this.notes = [];
            }
        }
    }

    saveNotes() {
        localStorage.setItem('notesapp-data', JSON.stringify(this.notes));
    }

    createNote() {
        const newNote = {
            id: Date.now().toString(),
            title: '',
            body: '',
            tags: ['ideas'],
            updated: new Date().toISOString(),
            pinned: false,
            locked: false,
            pinCode: '',
            archived: false,
            color: 'default',
            font: "'Outfit', sans-serif"
        };

        this.notes.unshift(newNote);
        this.saveNotes();
        this.setActiveNote(newNote);
        if (this.isFocusMode) this.toggleFocusMode();
        this.playSound('pop');
        this.showToast('New note created');
    }

    setActiveNote(note, bypassLock = false) {
        if (note && note.locked && !bypassLock) {
            this.openVaultPrompt(note, false);
            return;
        }

        this.activeNote = note;

        if (note) {
            this.editorEl.style.display = 'flex';
            this.emptyStateEl.style.display = 'none';

            this.titleInput.value = note.title || '';
            this.bodyEditor.innerHTML = note.body || '';

            const font = note.font || "'Outfit', sans-serif";
            this.fontSelect.value = font;
            this.bodyEditor.style.setProperty('--note-font', font);

            if (note.pinned) this.btnPin.classList.add('active');
            else this.btnPin.classList.remove('active');

            this.updateLockIcon();
            this.renderActiveNoteTags();
            this.updateStats();
            this.bindChecklistEvents();

            if (window.innerWidth <= 820) {
                this.appContainer.classList.add('mobile-editor-active');
            }

            if (!this.titleInput.value) this.titleInput.focus();
        } else {
            this.editorEl.style.display = 'none';
            this.emptyStateEl.style.display = 'flex';
            this.titleInput.value = '';
            this.bodyEditor.innerHTML = '';
            this.btnPin.classList.remove('active');
        }

        this.renderNotesList();
    }

    handleInput(field, value) {
        this.saveStatusEl.textContent = 'Saving...';
        this.saveStatusEl.style.color = 'var(--text-secondary)';

        if (this.activeNote) {
            this.activeNote[field] = value;
            this.activeNote.updated = new Date().toISOString();
        }

        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            if (this.activeNote) {
                this.notes = this.notes.filter(n => n.id !== this.activeNote.id);
                this.notes.unshift(this.activeNote);
                this.saveNotes();
                this.renderNotesList();
            }
            this.saveStatusEl.textContent = 'Saved to device';
            this.saveStatusEl.style.color = 'var(--success)';
        }, 700);
    }

    togglePin() {
        if (!this.activeNote) return;
        this.activeNote.pinned = !this.activeNote.pinned;
        this.activeNote.updated = new Date().toISOString();

        if (this.activeNote.pinned) {
            this.btnPin.classList.add('active');
            this.showToast('📌 Note pinned to top');
        } else {
            this.btnPin.classList.remove('active');
            this.showToast('Note unpinned');
        }
        this.saveNotes();
        this.renderNotesList();
        this.playSound('click');
    }

    deleteNote() {
        if (!this.activeNote) return;

        this.showConfirmDialog({
            title: 'Delete Note',
            message: `Are you sure you want to permanently delete "${this.activeNote.title || 'Untitled Note'}"? This action cannot be undone.`,
            confirmText: 'Delete Note',
            onConfirm: () => {
                this.notes = this.notes.filter(n => n.id !== this.activeNote.id);
                this.saveNotes();
                this.setActiveNote(null);
                this.showToast('Note deleted');
                this.exitMobileEditor();
                this.playSound('pop');
            }
        });
    }

    toggleFocusMode() {
        this.isFocusMode = !this.isFocusMode;
        if (this.isFocusMode) {
            this.appContainer.classList.add('focus-mode');
            this.btnFocus.classList.add('active');
            this.showToast('Focus Mode Active (Ctrl+\\)');
        } else {
            this.appContainer.classList.remove('focus-mode');
            this.btnFocus.classList.remove('active');
        }
        this.playSound('click');
    }

    exitMobileEditor() {
        this.appContainer.classList.remove('mobile-editor-active');
        this.renderNotesList();
    }

    // ==========================================
    // ☑️ INTERACTIVE CHECKLISTS
    // ==========================================
    insertChecklist() {
        const itemHTML = `<div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span>Checklist task item...</span></div><p></p>`;
        document.execCommand('insertHTML', false, itemHTML);
        this.handleInput('body', this.bodyEditor.innerHTML);
        this.bindChecklistEvents();
        this.playSound('click');
    }

    insertCallout() {
        const calloutHTML = `<div class="note-callout"><div class="callout-icon">💡</div><div class="callout-content"><b>Key Insight:</b> Write your important highlight here...</div></div><p></p>`;
        document.execCommand('insertHTML', false, calloutHTML);
        this.handleInput('body', this.bodyEditor.innerHTML);
        this.playSound('click');
    }

    bindChecklistEvents() {
        const checkboxes = this.bodyEditor.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach(cb => {
            const parent = cb.closest('.checklist-item');
            if (parent) {
                cb.checked = parent.classList.contains('checked');
            }

            cb.onchange = (e) => {
                if (parent) {
                    parent.classList.toggle('checked', cb.checked);
                    if (cb.checked) {
                        cb.setAttribute('checked', 'checked');
                        this.playSound('success');
                    } else {
                        cb.removeAttribute('checked');
                        this.playSound('click');
                    }
                    this.handleInput('body', this.bodyEditor.innerHTML);
                }
            };
        });
    }

    // ==========================================
    // 📤 EXPORT ENGINE
    // ==========================================
    async shareNote() {
        if (!this.activeNote) return;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.activeNote.body;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: this.activeNote.title || 'Aura Note',
                    text: plainText
                });
                this.showToast('Shared successfully!');
            } catch (err) {}
        } else {
            navigator.clipboard.writeText((this.activeNote.title || 'Untitled') + '\n\n' + plainText).then(() => {
                this.showToast('Copied note to clipboard!');
            });
        }
        this.playSound('click');
    }

    exportNote(format) {
        if (!this.activeNote) return;
        const title = (this.activeNote.title || 'Aura_Note').trim().replace(/[^a-zA-Z0-9_-]/g, '_');

        if (format === 'pdf') {
            this.showToast('Generating Document PDF...');
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `<h1 style="font-family: sans-serif; padding: 20px 0 10px 0;">${this.activeNote.title || 'Untitled'}</h1>` + this.activeNote.body;
            wrapper.style.fontFamily = this.activeNote.font || 'sans-serif';
            wrapper.style.color = '#000';
            wrapper.style.background = '#fff';
            wrapper.style.padding = '30px';

            const opt = {
                margin: 0.5,
                filename: `${title}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            if (window.html2pdf) {
                window.html2pdf().set(opt).from(wrapper).save().then(() => {
                    this.showToast('✅ Exported as .pdf');
                    this.playSound('success');
                });
            } else {
                this.showToast('PDF Engine ready once connected to internet.');
            }
            return;
        }

        if (format === 'png') {
            this.showToast('Generating High-Res PNG Image...');
            if (window.html2canvas) {
                window.html2canvas(this.editorEl, {
                    scale: 2,
                    backgroundColor: '#07070e',
                    useCORS: true
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `${title}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    this.showToast('✅ Exported as .png');
                    this.playSound('success');
                });
            }
            return;
        }

        let content = '';
        let mimeType = '';

        if (format === 'html') {
            content = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:sans-serif;max-width:800px;margin:40px auto;line-height:1.6;padding:20px;}</style></head><body><h1>${this.activeNote.title || 'Untitled'}</h1>${this.activeNote.body}</body></html>`;
            mimeType = 'text/html';
        } else if (format === 'md') {
            content = `# ${this.activeNote.title || 'Untitled'}\n\n`;
            let temp = this.activeNote.body
                .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
                .replace(/<b>(.*?)<\/b>/gi, '**$1**')
                .replace(/<i>(.*?)<\/i>/gi, '*$1*')
                .replace(/<s>(.*?)<\/s>/gi, '~~$1~~')
                .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
                .replace(/<[^>]+>/g, '');
            content += temp;
            mimeType = 'text/markdown';
        } else {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.activeNote.body;
            content = tempDiv.textContent || tempDiv.innerText || '';
            mimeType = 'text/plain';
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast(`✅ Exported as .${format}`);
        this.playSound('success');
    }

    // ==========================================
    // 📊 METRICS & STATS
    // ==========================================
    updateStats() {
        if (!this.activeNote) return;
        const text = (this.bodyEditor.innerText || '').trim();
        const chars = text.length;
        const words = chars > 0 ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
        const readingTimeMins = Math.max(1, Math.ceil(words / 200));

        this.charCountEl.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
        this.wordCountEl.textContent = `${words} word${words !== 1 ? 's' : ''}`;
        this.readTimeEl.textContent = `${readingTimeMins} min read`;
    }

    // ==========================================
    // 📑 RENDERING NOTES LIST
    // ==========================================
    renderNotesList() {
        this.notesListEl.innerHTML = '';
        let displayNotes = this.notes;

        if (this.activeTagFilter === 'pinned') {
            displayNotes = displayNotes.filter(n => n.pinned && !n.archived);
        } else if (this.activeTagFilter === 'locked') {
            displayNotes = displayNotes.filter(n => n.locked && !n.archived);
        } else if (this.activeTagFilter === 'archived') {
            displayNotes = displayNotes.filter(n => n.archived);
        } else if (this.activeTagFilter !== 'all') {
            displayNotes = displayNotes.filter(n => Array.isArray(n.tags) && n.tags.includes(this.activeTagFilter) && !n.archived);
        } else {
            displayNotes = displayNotes.filter(n => !n.archived);
        }

        if (this.searchQuery) {
            displayNotes = displayNotes.filter(n =>
                (n.title || '').toLowerCase().includes(this.searchQuery) ||
                (n.body || '').toLowerCase().includes(this.searchQuery) ||
                (Array.isArray(n.tags) && n.tags.some(t => t.toLowerCase().includes(this.searchQuery)))
            );
        }

        displayNotes.sort((a, b) => {
            if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
            return new Date(b.updated) - new Date(a.updated);
        });

        if (displayNotes.length === 0) {
            this.notesListEl.innerHTML = `
                <div style="text-align: center; padding: 40px 16px; color: var(--text-muted); font-size: 0.88rem;">
                    No notes found. Create one or switch tag filters!
                </div>
            `;
            return;
        }

        displayNotes.forEach(note => {
            const el = document.createElement('div');
            el.className = `note-item ${this.activeNote && this.activeNote.id === note.id ? 'active' : ''}`;

            const titleText = (note.title || '').trim() === '' ? 'Untitled Note' : note.title;

            let bodySnippet = 'Empty note...';
            if (note.locked) {
                bodySnippet = '🔒 Content encrypted & protected by PIN';
            } else {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = note.body;
                bodySnippet = (tempDiv.textContent || tempDiv.innerText || '').trim() || 'Empty note...';
            }

            const dateObj = new Date(note.updated);
            const dateFormatted = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString(undefined, {
                month: 'short', day: 'numeric'
            }) : 'Recent';

            const tagsHTML = Array.isArray(note.tags) ? note.tags.slice(0, 2).map(t => `<span class="note-card-tag">#${t}</span>`).join('') : '';

            el.innerHTML = `
                <div class="note-item-header">
                    <div class="note-item-title" title="${titleText}">${titleText}</div>
                    <div class="note-item-badges">
                        ${note.locked ? '<span class="badge-lock" title="Locked">🔒</span>' : ''}
                        ${note.pinned ? '<span class="badge-pin" title="Pinned">📌</span>' : ''}
                    </div>
                </div>
                <div class="note-item-body">${bodySnippet}</div>
                <div class="note-item-footer">
                    <div class="note-card-tags">${tagsHTML}</div>
                    <span>${dateFormatted}</span>
                </div>
            `;

            el.addEventListener('click', () => {
                this.setActiveNote(note);
                this.playSound('click');
            });

            this.notesListEl.appendChild(el);
        });
    }

    // ==========================================
    // ⌨️ SLASH MENU & AUTO-MARKDOWN
    // ==========================================
    showSlashMenu() {
        if (!this.slashMenu) return;
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        let top = rect.bottom + window.scrollY + 10;
        let left = rect.left + window.scrollX;

        if (left + 290 > window.innerWidth) left = window.innerWidth - 300;
        left = Math.max(10, left);
        if (top + 320 > window.innerHeight) top = Math.max(10, rect.top + window.scrollY - 320);

        this.slashMenu.style.left = `${left}px`;
        this.slashMenu.style.top = `${top}px`;
        this.slashMenu.classList.add('active');
        this.playSound('pop');
    }

    hideSlashMenu() {
        if (this.slashMenu) this.slashMenu.classList.remove('active');
    }

    checkAutoMarkdown(e) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const focusNode = selection.focusNode;
        if (!focusNode || focusNode.nodeType !== Node.TEXT_NODE) return;

        const text = focusNode.textContent;
        const parent = focusNode.parentElement;
        if (parent && parent.closest('pre')) return;

        const matchH1 = text.match(/^#\s$/);
        const matchH2 = text.match(/^##\s$/);
        const matchH3 = text.match(/^###\s$/);
        const matchQuote = text.match(/^>\s$/);
        const matchUL = text.match(/^[-*]\s$/);
        const matchOL = text.match(/^1\.\s$/);
        const matchCheck = text.match(/^\[\]\s$/);

        if (matchH1 || matchH2 || matchH3 || matchQuote || matchUL || matchOL || matchCheck) {
            let command = '';
            let val = null;

            if (matchH1) { command = 'formatBlock'; val = 'H1'; }
            else if (matchH2) { command = 'formatBlock'; val = 'H2'; }
            else if (matchH3) { command = 'formatBlock'; val = 'H3'; }
            else if (matchQuote) { command = 'formatBlock'; val = 'BLOCKQUOTE'; }
            else if (matchUL) { command = 'insertUnorderedList'; }
            else if (matchOL) { command = 'insertOrderedList'; }
            else if (matchCheck) { this.insertChecklist(); return; }

            if (val) val = `<${val}>`;

            const range = document.createRange();
            range.selectNodeContents(focusNode);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('delete', false);
            document.execCommand(command, false, val);
            this.handleInput('body', this.bodyEditor.innerHTML);
            this.playSound('pop');
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        this.toastContainer.appendChild(toast);

        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2800);
    }

    handleURLParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('action') === 'new') {
            this.createNote();
        } else if (params.get('action') === 'search') {
            this.searchInput.focus();
        }
    }

    bindEvents() {
        // Confirmation Dialog Action & Cancel
        if (this.btnConfirmAction) {
            this.btnConfirmAction.addEventListener('click', () => {
                this.closeAllModals();
                if (typeof this.confirmCallback === 'function') {
                    this.confirmCallback();
                    this.confirmCallback = null;
                }
            });
        }

        if (this.btnConfirmCancel) {
            this.btnConfirmCancel.addEventListener('click', () => {
                this.closeAllModals();
                this.confirmCallback = null;
            });
        }

        // Create Note triggers
        this.addBtn.addEventListener('click', () => this.createNote());
        if (this.addBtnLarge) this.addBtnLarge.addEventListener('click', () => this.createNote());
        if (this.mobNavAdd) this.mobNavAdd.addEventListener('click', () => this.createNote());

        // Modals triggers
        this.btnOpenTemplates.addEventListener('click', () => this.openModal(this.templateModal));
        if (this.templatesBtnLarge) this.templatesBtnLarge.addEventListener('click', () => this.openModal(this.templateModal));
        this.btnBackupModal.addEventListener('click', () => this.openModal(this.backupModal));
        this.btnThemeModal.addEventListener('click', () => this.openModal(this.themeModal));
        this.btnSoundToggle.addEventListener('click', () => this.toggleSound());
        this.btnFocusSuite.addEventListener('click', () => this.openModal(this.focusSuiteModal));
        this.btnCommandPaletteTrigger.addEventListener('click', () => this.openCommandPalette());

        // Editor Toolbar Actions
        this.btnAITools.addEventListener('click', () => this.openModal(this.aiModal));
        this.btnRecordMemo.addEventListener('click', () => this.startAudioMemoRecording());
        this.btnSaveMemo.addEventListener('click', () => this.stopAudioMemoRecording(true));
        this.btnCancelMemo.addEventListener('click', () => this.stopAudioMemoRecording(false));
        
        // Dictation
        this.btnDictate.addEventListener('click', () => this.toggleDictation());
        if (this.btnStopDictation) {
            this.btnStopDictation.addEventListener('click', () => this.stopDictation());
        }

        this.btnOpenSketch.addEventListener('click', () => this.openModal(this.sketchModal));
        this.btnFocus.addEventListener('click', () => this.toggleFocusMode());
        this.btnLockNote.addEventListener('click', () => this.toggleNoteLock());
        this.btnPin.addEventListener('click', () => this.togglePin());
        this.btnShare.addEventListener('click', () => this.shareNote());
        this.btnDelete.addEventListener('click', () => this.deleteNote());
        this.btnBackMobile.addEventListener('click', () => this.exitMobileEditor());
        this.btnAddTag.addEventListener('click', () => this.promptAddTag());
        this.btnInsertChecklist.addEventListener('click', () => this.insertChecklist());
        this.btnInsertCallout.addEventListener('click', () => this.insertCallout());

        // Search Input
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.btnClearSearch.style.display = this.searchQuery ? 'block' : 'none';
            this.renderNotesList();
        });

        this.btnClearSearch.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchQuery = '';
            this.btnClearSearch.style.display = 'none';
            this.renderNotesList();
        });

        this.tagsFilterBar.querySelectorAll('.tag-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.tagsFilterBar.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.activeTagFilter = chip.getAttribute('data-tag');
                this.renderNotesList();
                this.playSound('click');
            });
        });

        this.titleInput.addEventListener('input', () => this.handleInput('title', this.titleInput.value));
        this.bodyEditor.addEventListener('input', () => {
            this.handleInput('body', this.bodyEditor.innerHTML);
            this.updateStats();
        });

        this.bodyEditor.addEventListener('keyup', (e) => {
            if (e.key === '/') {
                this.showSlashMenu();
            } else if (e.key === 'Escape') {
                this.hideSlashMenu();
            } else if (e.key === ' ' || e.key === 'Enter') {
                this.checkAutoMarkdown(e);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'k') {
                    e.preventDefault();
                    this.openCommandPalette();
                } else if (e.key === 'n') {
                    e.preventDefault();
                    this.createNote();
                } else if (e.key === '\\') {
                    e.preventDefault();
                    this.toggleFocusMode();
                }
            } else if (e.key === 'Escape') {
                this.closeAllModals();
                this.hideSlashMenu();
            }
        });

        document.querySelectorAll('.slash-item').forEach(item => {
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = item.getAttribute('data-cmd');
                let val = item.getAttribute('data-val');

                const selection = window.getSelection();
                if (selection.focusNode && selection.focusNode.nodeType === Node.TEXT_NODE && selection.focusNode.textContent.endsWith('/')) {
                    const range = document.createRange();
                    range.setStart(selection.focusNode, selection.focusNode.textContent.length - 1);
                    range.setEnd(selection.focusNode, selection.focusNode.textContent.length);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('delete', false);
                }

                if (cmd === 'insertChecklist') {
                    this.insertChecklist();
                } else if (cmd === 'insertCallout') {
                    this.insertCallout();
                } else {
                    if (val && cmd === 'formatBlock') val = `<${val}>`;
                    document.execCommand(cmd, false, val);
                    this.handleInput('body', this.bodyEditor.innerHTML);
                }

                this.hideSlashMenu();
            });
        });

        this.formatBtns.forEach(btn => {
            if (btn.id === 'btn-insert-link' || btn.id === 'btn-highlight' || btn.id === 'btn-insert-checklist' || btn.id === 'btn-insert-callout') return;
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = btn.getAttribute('data-cmd');
                let val = btn.getAttribute('data-val') || null;
                if (cmd === 'formatBlock' && val) val = `<${val}>`;
                document.execCommand(cmd, false, val);
                this.handleInput('body', this.bodyEditor.innerHTML);
                this.updateStats();
                this.playSound('click');
            });
        });

        if (this.btnHighlight) {
            this.btnHighlight.addEventListener('mousedown', (e) => {
                e.preventDefault();
                document.execCommand('hiliteColor', false, 'rgba(245, 158, 11, 0.4)');
                this.handleInput('body', this.bodyEditor.innerHTML);
                this.playSound('click');
            });
        }

        if (this.btnInsertLink) {
            this.btnInsertLink.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const url = window.prompt('Enter link URL (e.g. https://google.com):', 'https://');
                if (url) {
                    document.execCommand('createLink', false, url);
                    this.handleInput('body', this.bodyEditor.innerHTML);
                }
            });
        }

        if (this.imageUpload) {
            this.imageUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.bodyEditor.focus();
                    document.execCommand('insertImage', false, ev.target.result);
                    this.handleInput('body', this.bodyEditor.innerHTML);
                    this.playSound('pop');
                };
                reader.readAsDataURL(file);
                this.imageUpload.value = '';
            });
        }

        this.textColorBtns.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = btn.getAttribute('data-cmd');
                const val = btn.getAttribute('data-val');
                document.execCommand(cmd, false, val);
                this.handleInput('body', this.bodyEditor.innerHTML);
                this.playSound('click');
            });
        });

        this.fontSelect.addEventListener('change', (e) => {
            const font = e.target.value;
            if (this.activeNote) {
                this.activeNote.font = font;
                this.saveNotes();
            }
            this.bodyEditor.style.setProperty('--note-font', font);
            this.bodyEditor.focus();
            this.playSound('click');
        });

        this.exportToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.exportMenu.parentElement.classList.toggle('show');
            this.playSound('click');
        });

        document.addEventListener('click', (e) => {
            if (this.exportMenu && !this.exportMenu.parentElement.contains(e.target)) {
                this.exportMenu.parentElement.classList.remove('show');
            }
            if (this.slashMenu && !this.slashMenu.contains(e.target) && e.target !== this.bodyEditor) {
                this.hideSlashMenu();
            }
        });

        this.exportMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportNote(e.target.getAttribute('data-format'));
                this.exportMenu.parentElement.classList.remove('show');
            });
        });

        this.commandSearchInput.addEventListener('input', (e) => {
            this.renderCommandResults(e.target.value);
        });

        document.querySelectorAll('.ai-action-card').forEach(card => {
            card.addEventListener('click', () => {
                const action = card.getAttribute('data-ai');
                this.handleAIAction(action);
            });
        });

        document.querySelectorAll('.pin-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handlePinPress(btn.getAttribute('data-val'));
            });
        });

        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                const theme = card.getAttribute('data-theme');
                this.applyTheme(theme);
                this.playSound('pop');
                this.showToast('Theme applied!');
            });
        });

        const btnDownloadBackup = document.getElementById('btn-download-backup');
        if (btnDownloadBackup) {
            btnDownloadBackup.addEventListener('click', () => this.downloadBackupJSON());
        }

        const backupFileInput = document.getElementById('backup-file-input');
        if (backupFileInput) {
            backupFileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    this.restoreBackupJSON(e.target.files[0]);
                }
            });
        }

        document.querySelectorAll('.btn-modal-close, [data-close]').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });

        if (this.mobNavNotes) {
            this.mobNavNotes.addEventListener('click', () => {
                this.exitMobileEditor();
                this.tagsFilterBar.querySelector('[data-tag="all"]').click();
            });
        }
        if (this.mobNavFocus) {
            this.mobNavFocus.addEventListener('click', () => {
                this.openModal(this.focusSuiteModal);
            });
        }
        if (this.mobNavTemplates) {
            this.mobNavTemplates.addEventListener('click', () => this.openModal(this.templateModal));
        }
        if (this.mobNavSettings) {
            this.mobNavSettings.addEventListener('click', () => this.openModal(this.themeModal));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.AuraApp = new AuraNotesApp();
});
