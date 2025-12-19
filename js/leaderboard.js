// ============================================
// SNACKIFY - LEADERBOARD MODULE
// Handles leaderboard display and sorting
// ============================================

import { snacks, getAllSnacks } from './data.js';
import { calculateAverageRatings, getOverallAverage } from './rating.js';

// Render leaderboard
export const renderLeaderboard = (type) => {
    const content = document.getElementById('leaderboardContent');
    if (!content) return;
    
    const allSnacks = getAllSnacks();
    let sortedSnacks = [...allSnacks];
    
    switch (type) {
        case 'top-rated':
            sortedSnacks = getTopRated();
            break;
        case 'spiciest':
            sortedSnacks = getSpiciest();
            break;
        case 'unique':
            sortedSnacks = getMostUnique();
            break;
        case 'by-country':
            sortedSnacks = getByCountry();
            break;
        case 'sweet':
            sortedSnacks = getSweetFoods();
            break;
        default:
            sortedSnacks = getTopRated();
    }
    
    if (sortedSnacks.length === 0) {
        content.innerHTML = '<div class="empty-state"><h3>No snacks found</h3></div>';
        return;
    }
    
    content.innerHTML = sortedSnacks.slice(0, 10).map((snack, index) => {
        const avgRating = getOverallAverage(snack);
        const averages = calculateAverageRatings(snack.id) || snack.ratings;
        
        let displayValue = avgRating.toFixed(1);
        let displayLabel = 'Rating';
        
        if (type === 'spiciest') {
            displayValue = (averages?.spiciness || 0).toFixed(1);
            displayLabel = 'Spiciness';
        } else if (type === 'unique') {
            displayValue = (averages?.uniqueness || 0).toFixed(1);
            displayLabel = 'Uniqueness';
        }
        
        return `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">#${index + 1}</div>
                <div class="leaderboard-info">
                    <h3>${snack.name}</h3>
                    <p>${snack.country} • ${displayLabel}: ${displayValue}</p>
                </div>
            </div>
        `;
    }).join('');
};

// Get top rated snacks
const getTopRated = () => {
    const allSnacks = getAllSnacks();
    return allSnacks
        .map(snack => ({
            snack,
            rating: getOverallAverage(snack)
        }))
        .sort((a, b) => b.rating - a.rating)
        .map(item => item.snack);
};

// Get spiciest snacks
const getSpiciest = () => {
    const allSnacks = getAllSnacks();
    return allSnacks
        .map(snack => {
            const averages = calculateAverageRatings(snack.id) || snack.ratings;
            return {
                snack,
                spiciness: averages?.spiciness || 0
            };
        })
        .sort((a, b) => b.spiciness - a.spiciness)
        .map(item => item.snack);
};

// Get most unique snacks
const getMostUnique = () => {
    const allSnacks = getAllSnacks();
    return allSnacks
        .map(snack => {
            const averages = calculateAverageRatings(snack.id) || snack.ratings;
            return {
                snack,
                uniqueness: averages?.uniqueness || 0
            };
        })
        .sort((a, b) => b.uniqueness - a.uniqueness)
        .map(item => item.snack);
};

// Get by country (grouped)
const getByCountry = () => {
    const allSnacks = getAllSnacks();
    const byCountry = {};
    
    allSnacks.forEach(snack => {
        if (!byCountry[snack.country]) {
            byCountry[snack.country] = [];
        }
        byCountry[snack.country].push({
            snack,
            rating: getOverallAverage(snack)
        });
    });
    
    // Get top snack from each country
    const topByCountry = Object.values(byCountry)
        .map(countrySnacks => {
            return countrySnacks
                .sort((a, b) => b.rating - a.rating)[0].snack;
        })
        .sort((a, b) => getOverallAverage(b) - getOverallAverage(a));
    
    return topByCountry;
};

// Get sweet foods
const getSweetFoods = () => {
    const allSnacks = getAllSnacks();
    return allSnacks
        .filter(snack => snack.type === 'dessert' || snack.tags.includes('sweet'))
        .map(snack => ({
            snack,
            rating: getOverallAverage(snack)
        }))
        .sort((a, b) => b.rating - a.rating)
        .map(item => item.snack);
};

// Initialize leaderboard tabs
export const initLeaderboard = () => {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Render leaderboard
            const tabType = tab.dataset.tab;
            renderLeaderboard(tabType);
        });
    });
    
    // Initial render
    renderLeaderboard('top-rated');
};

