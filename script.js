document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Fonction pour changer d'onglet
    function switchTab(tabId) {
        // Retirer la classe active de tous les onglets et panneaux
        tabButtons.forEach(button => button.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Ajouter la classe active à l'onglet et au panneau sélectionnés
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activePanel = document.getElementById(tabId);

        if (activeButton && activePanel) {
            activeButton.classList.add('active');
            activePanel.classList.add('active');
        }
    }

    // Ajouter les événements de clic aux boutons d'onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Animation d'entrée pour les éléments
    function animateElements() {
        const elements = document.querySelectorAll('.tab-panel, .ev-info');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Appeler l'animation au chargement
    animateElements();

    // Effet de parallaxe léger pour le fond
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.background-overlay');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Amélioration de l'accessibilité
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            }
        });
    });

    // Indicateur de chargement
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}); 

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const evSearch = document.getElementById('ev-search');
    const searchResults = document.getElementById('search-results');

    evSearch.addEventListener('change', function() {
        const selectedEV = this.value;
        if (selectedEV) {
            searchPokemonByEV(selectedEV);
        } else {
            searchResults.innerHTML = '';
        }
    });
});

function searchPokemonByEV(evType) {
    const searchResults = document.getElementById('search-results');
    const results = {};

    // Get all biome panels
    const biomePanels = document.querySelectorAll('.tab-panel');
    
    biomePanels.forEach(panel => {
        const biomeName = panel.querySelector('h2').textContent;
        const pokemonList = panel.querySelectorAll('li');
        
        pokemonList.forEach(pokemon => {
            const pokemonName = pokemon.querySelector('strong').textContent;
            const evText = pokemon.textContent.split('EVs: ')[1];
            
            if (evText && evText.includes(evType)) {
                if (!results[biomeName]) {
                    results[biomeName] = [];
                }
                results[biomeName].push(pokemonName);
            }
        });
    });

    // Display results
    displaySearchResults(evType, results);
}

function displaySearchResults(evType, results) {
    const searchResults = document.getElementById('search-results');
    
    if (Object.keys(results).length === 0) {
        searchResults.innerHTML = '<div class="no-results">Aucun Pokémon trouvé pour cette stat.</div>';
        return;
    }

    let html = `<h3>Pokémon donnant des EVs en ${evType} :</h3>`;
    
    Object.keys(results).forEach(biome => {
        html += `<div class="pokemon-result">`;
        html += `<strong>${biome}</strong>`;
        html += `<div class="biome-info">`;
        results[biome].forEach(pokemon => {
            html += `${pokemon}, `;
        });
        html = html.slice(0, -2); // Remove last comma and space
        html += `</div></div>`;
    });
    
    searchResults.innerHTML = html;
} 