const passwords = {
    SISR: [
        {
            category: 'Windows Server',
            items: [
                { service: 'Windows Serveur 2016', user: 'Administrateur', password: 'sio2025//', info: '' }
            ]
        },
        {
            category: 'Proxmox',
            items: [
                { service: 'Proxmox', user: 'root', password: 'sio2024', info: 'IP: 192.168.20.207:8006' }
            ]
        },
        {
            category: 'Debian',
            items: [
                { service: 'Debian graphique', user: 'root', password: 'sio2025', info: '' },
                { service: 'Debian graphique (non-root)', user: 'non-root', password: 'Sio2025', info: '' }
            ]
        },
        {
            category: 'LAMP',
            items: [
                { service: 'LAMP', user: 'root', password: 'Groupe7!', info: '' }
            ]
        },
        {
            category: 'Active Directory',
            items: [
                { service: 'Forêt AD', user: 'foret', password: 'Groupe7!', info: 'Domaine: GROUPE7.local' }
            ]
        },
        {
            category: 'Windows 10',
            items: [
                { service: 'User Windows 10', user: 'user', password: 'sio2025', info: '' },
                { service: 'User Windows 10 (domaine)', user: 'user', password: 'sio2024//', info: '' }
            ]
        },
        {
            category: 'pfSense',
            items: [
                { service: 'pfSense', user: 'admin', password: 'Groupe7!', info: '' }
            ]
        },
        {
            category: 'GitHub',
            items: [
                { service: 'GitHub', user: 'siotp709@gmail.com', password: 'sio2025//', info: '' }
            ]
        },
        {
            category: 'NAS',
            items: [
                { service: 'NAS (VM)', user: 'root', password: 'sio2025', info: '' },
                { service: 'NAS (Web)', user: 'admin', password: 'sio2025', info: '' }
            ]
        },
        {
            category: 'GLPI',
            items: [
                { service: 'GLPI root', user: 'root', password: 'Groupe7', info: '' },
                { service: 'GLPI Interface Web', user: 'glpi', password: 'glpi', info: '' },
                { service: 'User ticket GLPI', user: 'cedric', password: 'sio123', info: '' },
                { service: 'User technicien GLPI', user: 'tech', password: 'sio123', info: '' }
            ]
        }
        
    ],
    SLAM: [
        {
            category: 'SQL',
            items: [
                { service: 'SQL LAMP', user: 'dev', password: 'Groupe7!', info: '' }
            ]
        },
        {
            category: 'LAMP',
            items: [
                { service: 'LAMP', user: 'dev', password: 'Apgr7_dev', info: '' }
            ]
        },
        {
            category: 'PHPMyAdmin',
            items: [
                { service: 'PHPmyAdmin', user: 'root', password: 'sio2025//', info: '' }
            ]
        },
        {
            category: 'FTP',
            items: [
                { service: 'FTP', user: 'cedric', password: 'sio123', info: '' }
            ]
        }
    ]
};

let currentTab = 'SISR';
let searchTerm = '';
const visiblePasswords = {};

function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    const filteredData = passwords[currentTab].map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>Aucun résultat trouvé pour "${searchTerm}"</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredData.map((category, catIdx) => `
        <div class="category-card">
            <div class="category-header ${currentTab.toLowerCase()}">
                <h2>${category.category}</h2>
            </div>
            <div class="category-body">
                ${category.items.map((item, itemIdx) => {
                    const key = `${currentTab}-${catIdx}-${itemIdx}`;
                    return `
                        <div class="item">
                            <div class="item-header">
                                <div class="item-service">${item.service}</div>
                                ${item.info ? `<div class="item-info">${item.info}</div>` : ''}
                            </div>
                            <div class="item-credentials">
                                <div class="credential-row">
                                    <span class="credential-label">Utilisateur:</span>
                                    <div class="credential-content">
                                        <code class="credential-value user">${item.user}</code>
                                        <button class="btn-icon" onclick="copyToClipboard('${item.user}', 'user-${key}')" title="Copier l'utilisateur">
                                            <svg id="icon-user-${key}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="credential-row">
                                    <span class="credential-label">Mot de passe:</span>
                                    <div class="credential-content">
                                        <code class="credential-value password" id="pwd-${key}">${visiblePasswords[key] ? item.password : '••••••••'}</code>
                                        <button class="btn-icon" onclick="togglePassword('${key}', '${item.password}')" title="Afficher/Masquer">
                                            <svg id="eye-${key}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        </button>
                                        <button class="btn-icon" onclick="copyToClipboard('${item.password}', 'pwd-${key}')" title="Copier le mot de passe">
                                            <svg id="icon-pwd-${key}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function togglePassword(key, password) {
    visiblePasswords[key] = !visiblePasswords[key];
    const pwdElement = document.getElementById(`pwd-${key}`);
    const eyeIcon = document.getElementById(`eye-${key}`);
    
    pwdElement.textContent = visiblePasswords[key] ? password : '••••••••';
    
    if (visiblePasswords[key]) {
        eyeIcon.innerHTML = `
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
            <line x1="2" x2="22" y1="2" y2="22"/>
        `;
    } else {
        eyeIcon.innerHTML = `
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}

function copyToClipboard(text, iconId) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = document.getElementById(`icon-${iconId}`);
        const btn = icon.parentElement;
        btn.classList.add('copied');
        icon.innerHTML = `<polyline points="20 6 9 17 4 12"/>`;
        
        setTimeout(() => {
            btn.classList.remove('copied');
            icon.innerHTML = `
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            `;
        }, 2000);
    });
}

// Tab switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        currentTab = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active-sisr', 'active-slam');
        });
        button.classList.add(currentTab === 'SISR' ? 'active-sisr' : 'active-slam');
        renderCategories();
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderCategories();
});

// Initial render
renderCategories();