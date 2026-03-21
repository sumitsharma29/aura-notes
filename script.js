
class AuraNotesApp {
    constructor() {
        this.notes = [];
        this.activeNote = null;
        this.searchQuery = '';
        this.isDarkTheme = true;
        this.isFocusMode = false;
        
        // Containers
        this.appContainer = document.getElementById('app-container');
        this.notesListEl = document.getElementById('notes-list');
        this.editorEl = document.getElementById('editor');
        this.emptyStateEl = document.getElementById('empty-state');
        this.toastContainer = document.getElementById('toast-container');
        
        // Sidebar Headers
        this.addBtn = document.getElementById('btn-add');
        this.addBtnLarge = document.getElementById('btn-add-large');
        this.themeBtn = document.getElementById('btn-theme');
        this.searchInput = document.getElementById('search-input');
        
        // Editor Actions
        this.titleInput = document.getElementById('note-title');
        this.bodyEditor = document.getElementById('note-body');
        
        this.focusBtn = document.getElementById('btn-focus');
        this.pinBtn = document.getElementById('btn-pin');
        this.shareBtn = document.getElementById('btn-share');
        this.deleteBtn = document.getElementById('btn-delete');
        this.btnBackMobile = document.getElementById('btn-back-mobile');
        
        // Export Dropdown
        this.exportToggleBtn = document.getElementById('btn-export-toggle');
        this.exportMenu = document.getElementById('export-menu');
        
        // Toolbars & Status
        this.fontSelect = document.getElementById('font-select');
        this.formatBtns = document.querySelectorAll('.btn-format');
        this.textColorBtns = document.querySelectorAll('.text-color');
        
        this.wordCountEl = document.getElementById('word-count');
        this.charCountEl = document.getElementById('char-count');
        this.saveStatusEl = document.getElementById('save-status');
        
        // V6
        this.slashMenu = document.getElementById('slash-menu');
        this.readTimeEl = document.getElementById('read-time');
        
        if (this.addBtn) {
            this.init();
        }
    }

    init() {
        this.loadTheme();
        this.loadNotes();
        this.renderNotesList();
        
        // Clean Paragraphing Setup
        document.execCommand('defaultParagraphSeparator', false, 'p');
        
        // Base Listeners
        this.addBtn.addEventListener('click', () => this.createNote());
        if(this.addBtnLarge) this.addBtnLarge.addEventListener('click', () => this.createNote());
        
        this.deleteBtn.addEventListener('click', () => this.deleteNote());
        this.pinBtn.addEventListener('click', () => this.togglePin());
        this.shareBtn.addEventListener('click', () => this.shareNote());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.focusBtn.addEventListener('click', () => this.toggleFocusMode());
        this.btnBackMobile.addEventListener('click', () => this.exitMobileEditor());
        
        // Export Dropdown Logic
        this.exportToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.exportMenu.parentElement.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if(!this.exportMenu.parentElement.contains(e.target)) {
                this.exportMenu.parentElement.classList.remove('show');
            }
            // Hide slash menu if clicking outside
            if(this.slashMenu && !this.slashMenu.contains(e.target) && e.target !== this.bodyEditor) {
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
        
        // Auto-save
        this.titleInput.addEventListener('input', () => this.handleInput('title', this.titleInput.value));
        this.bodyEditor.addEventListener('input', () => {
            this.handleInput('body', this.bodyEditor.innerHTML);
            this.updateStats();
        });
        
        // V6 Slash commands & Auto-markdown
        this.bodyEditor.addEventListener('keyup', (e) => {
            if (e.key === '/') {
                this.showSlashMenu();
            } else if (e.key === 'Escape') {
                this.hideSlashMenu();
            } else if (e.key === ' ' || e.key === 'Enter') {
                this.checkAutoMarkdown(e);
            } else {
                if(this.slashMenu && this.slashMenu.classList.contains('active')) {
                    const selection = window.getSelection();
                    if(selection.focusNode && !selection.focusNode.textContent.includes('/')) {
                        this.hideSlashMenu();
                    }
                }
            }
        });

        // V6 Slash Menu Implementation
        document.querySelectorAll('.slash-item').forEach(item => {
            item.addEventListener('mousedown', (e) => {
                e.preventDefault(); // Vital: Prevents focus stealing from the editor!
                
                const cmd = item.getAttribute('data-cmd');
                let val = item.getAttribute('data-val');
                
                // Erase the slash that triggered the menu
                const selection = window.getSelection();
                if(selection.focusNode) {
                    const textNode = selection.focusNode;
                    if(textNode.nodeType === Node.TEXT_NODE && textNode.textContent.endsWith('/')) {
                        const range = document.createRange();
                        range.setStart(textNode, textNode.textContent.length - 1);
                        range.setEnd(textNode, textNode.textContent.length);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        document.execCommand('delete', false);
                    }
                }
                
                if (val && cmd === 'formatBlock') val = `<${val}>`;
                document.execCommand(cmd, false, val);
                
                this.hideSlashMenu();
                this.handleInput('body', this.bodyEditor.innerHTML);
            });
        });
        
        // Security & Paste
        this.bodyEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
            this.showToast('Pasted securely as plain text.');
        });
        
        // Search
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderNotesList();
        });
        
        // Standard Formatting Toolbar
        this.formatBtns.forEach(btn => {
            if (btn.classList.contains('btn-size') || btn.id === 'btn-insert-link') return;
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = btn.getAttribute('data-cmd');
                let val = btn.getAttribute('data-val') || null;
                if (cmd === 'formatBlock' && val) val = `<${val}>`;
                document.execCommand(cmd, false, val);
                this.handleInput('body', this.bodyEditor.innerHTML);
                this.updateStats();
            });
        });
        
        // True Inline Font Resizing
        const sizeBtns = document.querySelectorAll('.btn-size');
        sizeBtns.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                let currentSize = document.queryCommandValue('fontSize') || 3;
                currentSize = parseInt(currentSize);
                if (btn.getAttribute('data-size') === 'up') {
                    currentSize = Math.min(7, currentSize + 1);
                } else {
                    currentSize = Math.max(1, currentSize - 1);
                }
                document.execCommand('fontSize', false, currentSize);
                this.handleInput('body', this.bodyEditor.innerHTML);
            });
        });
        
        // Insert Link
        const linkBtn = document.getElementById('btn-insert-link');
        if (linkBtn) {
            linkBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const url = window.prompt('Enter link URL (e.g. https://google.com):', 'https://');
                if (url) {
                    document.execCommand('createLink', false, url);
                    this.handleInput('body', this.bodyEditor.innerHTML);
                }
            });
        }
        
        // Insert Image
        const imgUpload = document.getElementById('image-upload');
        if (imgUpload) {
            imgUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.bodyEditor.focus();
                    document.execCommand('insertImage', false, ev.target.result);
                    this.handleInput('body', this.bodyEditor.innerHTML);
                };
                reader.readAsDataURL(file);
                imgUpload.value = '';
            });
        }
        
        // Text Color Highlight Toolbar
        this.textColorBtns.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = btn.getAttribute('data-cmd'); 
                const val = btn.getAttribute('data-val'); 
                document.execCommand(cmd, false, val);
                this.handleInput('body', this.bodyEditor.innerHTML);
            });
        });

        // Global Font
        this.fontSelect.addEventListener('change', (e) => {
            const font = e.target.value;
            this.updateNote('font', font);
            this.bodyEditor.style.setProperty('--note-font', font);
            this.bodyEditor.focus();
        });

        // Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'n') {
                    e.preventDefault();
                    this.createNote();
                } else if (e.key === '\\') { 
                    e.preventDefault();
                    this.toggleFocusMode();
                }
            }
        });
    }

    // V6 Auto Markdown Syntax Engine
    checkAutoMarkdown(e) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        
        const focusNode = selection.focusNode;
        if (!focusNode || focusNode.nodeType !== Node.TEXT_NODE) return;
        
        const text = focusNode.textContent;
        const parent = focusNode.parentElement;
        
        // Ignore if we are inside a code block
        if (parent && parent.closest('pre')) return;
        
        const matchH1 = text.match(/^#\s$/);
        const matchH2 = text.match(/^##\s$/);
        const matchH3 = text.match(/^###\s$/);
        const matchQuote = text.match(/^>\s$/);
        const matchUL = text.match(/^[-*]\s$/);
        const matchOL = text.match(/^1\.\s$/);
        
        if (matchH1 || matchH2 || matchH3 || matchQuote || matchUL || matchOL) {
            let command = '';
            let val = null;
            
            if (matchH1) { command = 'formatBlock'; val = 'H1'; }
            else if (matchH2) { command = 'formatBlock'; val = 'H2'; }
            else if (matchH3) { command = 'formatBlock'; val = 'H3'; }
            else if (matchQuote) { command = 'formatBlock'; val = 'BLOCKQUOTE'; }
            else if (matchUL) { command = 'insertUnorderedList'; }
            else if (matchOL) { command = 'insertOrderedList'; }
            
            if (val) val = `<${val}>`;
            
            // Delete syntax natively to retain node structure
            const range = document.createRange();
            range.selectNodeContents(focusNode);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('delete', false);
            
            document.execCommand(command, false, val);
            this.handleInput('body', this.bodyEditor.innerHTML);
        }
    }

    showSlashMenu() {
        if(!this.slashMenu) return;
        const selection = window.getSelection();
        if(!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        let top = rect.bottom + window.scrollY + 10;
        let left = rect.left + window.scrollX;
        
        // Bounds checking
        if (left + 280 > window.innerWidth) left = window.innerWidth - 300;
        left = Math.max(10, left); // Ensure it doesn't fall off the left side on tight mobile boundaries
        if (top + 300 > window.innerHeight) top = rect.top + window.scrollY - 300;
        
        this.slashMenu.style.left = `${left}px`;
        this.slashMenu.style.top = `${top}px`;
        this.slashMenu.classList.add('active');
    }

    hideSlashMenu() {
        if(this.slashMenu) this.slashMenu.classList.remove('active');
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
        }, 3000);
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
                localStorage.setItem('notesapp-data', JSON.stringify(this.notes));
                this.renderNotesList(); 
            }
            this.saveStatusEl.textContent = 'Saved to device';
            this.saveStatusEl.style.color = '#10b981';
        }, 1000);
    }

    loadTheme() {
        const theme = localStorage.getItem('auranotes-theme');
        if (theme === 'light') {
            this.isDarkTheme = false;
            document.body.classList.replace('dark-theme', 'light-theme');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
        }
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        if (this.isDarkTheme) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('auranotes-theme', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('auranotes-theme', 'light');
        }
    }

    toggleFocusMode() {
        this.isFocusMode = !this.isFocusMode;
        if (this.isFocusMode) {
            this.appContainer.classList.add('focus-mode');
            this.focusBtn.classList.add('active');
            this.showToast('Focus Mode Enabled');
        } else {
            this.appContainer.classList.remove('focus-mode');
            this.focusBtn.classList.remove('active');
        }
    }

    exitMobileEditor() {
        this.appContainer.classList.remove('mobile-editor-active');
    }

    loadNotes() {
        const stored = localStorage.getItem('notesapp-data'); 
        if (stored) {
            try {
                this.notes = JSON.parse(stored);
                this.notes.forEach(n => {
                    if (n.pinned === undefined) n.pinned = false;
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
        this.renderNotesList();
    }

    createNote() {
        const newNote = {
            id: Date.now().toString(),
            title: '',
            body: '',
            updated: new Date().toISOString(),
            pinned: false,
            color: 'default',
            font: "'Outfit', sans-serif"
        };
        
        this.notes.unshift(newNote); 
        this.saveNotes();
        this.setActiveNote(newNote);
        if (this.isFocusMode) this.toggleFocusMode();
        this.showToast('Note created');
    }

    updateNote(field, value) {
        if (!this.activeNote) return;
        this.activeNote[field] = value;
        this.activeNote.updated = new Date().toISOString();
        
        this.notes = this.notes.filter(n => n.id !== this.activeNote.id);
        this.notes.unshift(this.activeNote);
        this.saveNotes();
    }

    togglePin() {
        if (!this.activeNote) return;
        this.activeNote.pinned = !this.activeNote.pinned;
        this.activeNote.updated = new Date().toISOString();
        
        if (this.activeNote.pinned) {
            this.pinBtn.classList.add('active');
            this.showToast('Note pinned to top');
        } else {
            this.pinBtn.classList.remove('active');
            this.showToast('Note unpinned');
        }
        this.saveNotes();
    }

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
            } catch (err) { }
        } else {
            navigator.clipboard.writeText(this.activeNote.title + '\n\n' + plainText).then(() => {
                this.showToast('Copied note to clipboard!');
            });
        }
    }

    exportNote(format) {
        if (!this.activeNote) return;
        const title = this.activeNote.title.trim() || 'Aura_Note';
        
        if (format === 'pdf') {
            this.showToast('Generating PDF...');
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `<h1 style="font-family: sans-serif; padding-left: 20px; padding-top: 10px;">${title}</h1><br>` + this.activeNote.body;
            wrapper.style.fontFamily = this.activeNote.font || 'sans-serif';
            wrapper.style.color = '#000';
            wrapper.style.background = '#fff';
            wrapper.style.padding = '30px';
            
            const opt = {
                margin:       0.5,
                filename:     `${title}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            if(window.html2pdf) {
                window.html2pdf().set(opt).from(wrapper).save().then(() => {
                    this.showToast('Exported as .pdf');
                });
            } else {
                this.showToast('PDF Engine disconnected. Connect to internet.');
            }
            return;
        } 
        
        if (format === 'png') {
            this.showToast('Generating PNG Snapshot...');
            if(window.html2canvas) {
                this.editorEl.style.boxShadow = 'none';
                window.html2canvas(this.editorEl, {
                    scale: 2,
                    backgroundColor: this.isDarkTheme ? '#050508' : '#f0f2f5',
                    useCORS: true
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `${title}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    this.showToast('Exported as .png');
                    this.editorEl.style.boxShadow = ''; 
                });
            } else {
                this.showToast('PNG Engine disconnected. Connect to internet.');
            }
            return;
        }

        let content = '';
        let mimeType = '';
        
        if (format === 'html') {
            content = `<html><head><title>${title}</title></head><body><h1>${title}</h1>${this.activeNote.body}</body></html>`;
            mimeType = 'text/html';
        } else if (format === 'md') {
            content = `# ${title}\n\n`;
            let temp = this.activeNote.body
                .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
                .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
                .replace(/<b>(.*?)<\/b>/gi, '**$1**')
                .replace(/<i>(.*?)<\/i>/gi, '*$1*')
                .replace(/<s>(.*?)<\/s>/gi, '~~$1~~')
                .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
                .replace(/<ul>/gi, '')
                .replace(/<\/ul>/gi, '\n')
                .replace(/<ol>/gi, '')
                .replace(/<\/ol>/gi, '\n')
                .replace(/<p>/gi, '')
                .replace(/<\/p>/gi, '\n\n')
                .replace(/<br\s*\/?>/gi, '\n')
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
        
        this.showToast(`Exported as .${format}`);
    }

    deleteNote() {
        if (!this.activeNote) return;
        if (!confirm('Permanently delete this note?')) return;
        
        this.notes = this.notes.filter(n => n.id !== this.activeNote.id);
        this.saveNotes();
        this.setActiveNote(null);
        this.showToast('Note deleted');
        this.exitMobileEditor();
    }

    updateStats() {
        if (!this.activeNote) return;
        const text = this.bodyEditor.innerText || this.bodyEditor.textContent || '';
        const trimmed = text.trim();
        const chars = trimmed.length;
        const words = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;
        
        this.charCountEl.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
        this.wordCountEl.textContent = `${words} word${words !== 1 ? 's' : ''}`;
        
        // V6 Read Time Estimator
        const readingTimeMins = Math.max(1, Math.ceil(words / 200));
        if (this.readTimeEl) {
            this.readTimeEl.textContent = `${readingTimeMins} min read`;
        }
    }

    setActiveNote(note) {
        this.activeNote = note;
        
        if (note) {
            this.editorEl.style.display = 'flex';
            this.emptyStateEl.style.display = 'none';
            
            this.titleInput.value = note.title;
            this.bodyEditor.innerHTML = note.body;
            
            const font = note.font || "'Outfit', sans-serif";
            this.fontSelect.value = font;
            this.bodyEditor.style.setProperty('--note-font', font);
            
            if (note.pinned) this.pinBtn.classList.add('active');
            else this.pinBtn.classList.remove('active');
            
            this.editorEl.style.removeProperty('--note-color');
            
            this.updateStats();
            
            if(window.innerWidth <= 768) {
                this.appContainer.classList.add('mobile-editor-active');
            }
            if (!this.titleInput.value) this.titleInput.focus();
        } else {
            this.editorEl.style.display = 'none';
            this.emptyStateEl.style.display = 'flex';
            this.titleInput.value = '';
            this.bodyEditor.innerHTML = '';
            this.pinBtn.classList.remove('active');
        }
        
        this.renderNotesList();
    }

    renderNotesList() {
        this.notesListEl.innerHTML = '';
        
        let displayNotes = this.notes;
        
        if (this.searchQuery) {
            displayNotes = displayNotes.filter(n => 
                n.title.toLowerCase().includes(this.searchQuery) || 
                n.body.toLowerCase().includes(this.searchQuery)
            );
        }
        
        displayNotes.sort((a, b) => {
            if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
            return new Date(b.updated) - new Date(a.updated);
        });
        
        displayNotes.forEach(note => {
            const el = document.createElement('div');
            el.className = `note-item ${this.activeNote && this.activeNote.id === note.id ? 'active' : ''}`;
            
            const titleText = note.title.trim() === '' ? 'Untitled' : note.title;
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.body;
            let bodyText = tempDiv.textContent || tempDiv.innerText || '';
            bodyText = bodyText.trim() === '' ? 'Empty note...' : bodyText;
            
            const dateObj = new Date(note.updated);
            const dateFormatted = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric'
            }) : 'Unknown';

            const pinHTML = note.pinned ? `<svg class="pin-indicator" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>` : '';

            el.innerHTML = `
                ${pinHTML}
                <div class="note-item-title" title="${titleText}">${titleText}</div>
                <div class="note-item-body" title="${bodyText}">${bodyText}</div>
                <div class="note-item-date">${dateFormatted}</div>
            `;
            
            el.addEventListener('click', () => {
                this.setActiveNote(note);
            });
            
            this.notesListEl.appendChild(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AuraNotesApp();
});
