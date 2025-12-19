// ============================================
// SNACKIFY - RATING MODULE
// Handles rating system and localStorage
// ============================================

import { getSnackById } from './data.js';

// Get ratings from localStorage
const getStoredRatings = () => {
    const stored = localStorage.getItem('snackifyRatings');
    return stored ? JSON.parse(stored) : {};
};

// Save ratings to localStorage
const saveRatings = (ratings) => {
    localStorage.setItem('snackifyRatings', JSON.stringify(ratings));
};

// Get ratings for a snack
export const getSnackRatings = (snackId) => {
    const ratings = getStoredRatings();
    return ratings[snackId] || null;
};

// Calculate average ratings for a snack
export const calculateAverageRatings = (snackId) => {
    const ratings = getStoredRatings();
    const snackRatings = ratings[snackId];
    
    if (!snackRatings || snackRatings.length === 0) {
        return null;
    }
    
    const totals = snackRatings.reduce((acc, rating) => {
        acc.taste += rating.taste;
        acc.spiciness += rating.spiciness;
        acc.uniqueness += rating.uniqueness;
        return acc;
    }, { taste: 0, spiciness: 0, uniqueness: 0 });
    
    const count = snackRatings.length;
    
    return {
        taste: Math.round((totals.taste / count) * 10) / 10,
        spiciness: Math.round((totals.spiciness / count) * 10) / 10,
        uniqueness: Math.round((totals.uniqueness / count) * 10) / 10,
        count: count
    };
};

// Submit a rating
export const submitRating = (snackId, taste, spiciness, uniqueness) => {
    const ratings = getStoredRatings();
    
    if (!ratings[snackId]) {
        ratings[snackId] = [];
    }
    
    ratings[snackId].push({
        taste: parseInt(taste),
        spiciness: parseInt(spiciness),
        uniqueness: parseInt(uniqueness),
        timestamp: Date.now()
    });
    
    saveRatings(ratings);
    return calculateAverageRatings(snackId);
};

// Store current onSuccess callback
let currentOnSuccess = null;

// Initialize rating form
export const initRatingForm = (snackId, onSuccess) => {
    const form = document.getElementById('ratingForm');
    const snackIdInput = document.getElementById('ratingSnackId');
    const tasteInput = document.getElementById('tasteValue');
    const spicinessInput = document.getElementById('spicinessValue');
    const uniquenessInput = document.getElementById('uniquenessValue');
    
    if (!form) return;
    
    snackIdInput.value = snackId;
    currentOnSuccess = onSuccess;
    
    // Set initial values
    const snack = getSnackById(snackId);
    if (snack && snack.ratings) {
        const tasteVal = Math.round(snack.ratings.taste) || 3;
        const spicinessVal = Math.round(snack.ratings.spiciness) || 1;
        const uniquenessVal = Math.round(snack.ratings.uniqueness) || 3;
        
        tasteInput.value = tasteVal;
        spicinessInput.value = spicinessVal;
        uniquenessInput.value = uniquenessVal;
    } else {
        tasteInput.value = 3;
        spicinessInput.value = 1;
        uniquenessInput.value = 3;
    }
};

// Initialize form submit handler (called once)
export const initRatingFormSubmit = () => {
    const form = document.getElementById('ratingForm');
    if (!form) return;
    
    // Remove existing listener if any
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Add new listener
    document.getElementById('ratingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const snackIdInput = document.getElementById('ratingSnackId');
        const tasteInput = document.getElementById('tasteValue');
        const spicinessInput = document.getElementById('spicinessValue');
        const uniquenessInput = document.getElementById('uniquenessValue');
        
        const snackId = snackIdInput.value;
        const taste = tasteInput.value;
        const spiciness = spicinessInput.value;
        const uniqueness = uniquenessInput.value;
        
        if (!taste || !spiciness || !uniqueness) {
            alert('Please fill in all rating fields');
            return;
        }
        
        const newAverages = submitRating(snackId, taste, spiciness, uniqueness);
        
        if (currentOnSuccess) {
            currentOnSuccess(newAverages);
        }
        
        // Close modal
        const modal = document.getElementById('ratingModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        
        // Show success message
        alert('Rating submitted successfully!');
    });
};

// Get overall average rating (for display)
export const getOverallAverage = (snack) => {
    const averages = calculateAverageRatings(snack.id);
    
    if (averages) {
        return (averages.taste + averages.spiciness + averages.uniqueness) / 3;
    }
    
    // Fallback to default ratings if no user ratings
    if (snack.ratings && snack.ratings.count > 0) {
        return (snack.ratings.taste + snack.ratings.spiciness + snack.ratings.uniqueness) / 3;
    }
    
    return 0;
};

