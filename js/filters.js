// ============================================
// SNACKIFY - FILTERS MODULE
// Handles search and filtering functionality
// ============================================

import { snacks, getCountries, getAllSnacks } from './data.js';

let currentFilters = {
    search: '',
    country: '',
    type: '',
    minSpiciness: 0,
    minTaste: 0,
    minUniqueness: 0
};

// Initialize filters
export const initFilters = (renderCallback) => {
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    
    // Populate country filter
    const countries = getCountries();
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });
    
    // Search input handler
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        renderCallback(getFilteredSnacks());
    });
    
    // Country filter handler
    countryFilter.addEventListener('change', (e) => {
        currentFilters.country = e.target.value;
        renderCallback(getFilteredSnacks());
    });
    
    // Initial render
    renderCallback(getFilteredSnacks());
};

// Get filtered snacks based on current filters
export const getFilteredSnacks = () => {
    const allSnacks = getAllSnacks();
    return allSnacks.filter(snack => {
        // Search filter
        if (currentFilters.search) {
            const searchTerm = currentFilters.search;
            const matchesSearch = 
                snack.name.toLowerCase().includes(searchTerm) ||
                snack.description.toLowerCase().includes(searchTerm) ||
                snack.country.toLowerCase().includes(searchTerm) ||
                snack.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            if (!matchesSearch) return false;
        }
        
        // Country filter
        if (currentFilters.country && snack.country !== currentFilters.country) {
            return false;
        }
        
        // Type filter
        if (currentFilters.type && snack.type !== currentFilters.type) {
            return false;
        }
        
        // Rating filters
        if (snack.ratings) {
            if (snack.ratings.spiciness < currentFilters.minSpiciness) return false;
            if (snack.ratings.taste < currentFilters.minTaste) return false;
            if (snack.ratings.uniqueness < currentFilters.minUniqueness) return false;
        }
        
        return true;
    });
};

// Update filters
export const updateFilters = (newFilters) => {
    currentFilters = { ...currentFilters, ...newFilters };
};

// Get current filters
export const getCurrentFilters = () => {
    return { ...currentFilters };
};

// Reset filters
export const resetFilters = () => {
    currentFilters = {
        search: '',
        country: '',
        type: '',
        minSpiciness: 0,
        minTaste: 0,
        minUniqueness: 0
    };
    document.getElementById('searchInput').value = '';
    document.getElementById('countryFilter').value = '';
};

