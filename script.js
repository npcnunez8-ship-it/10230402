// ============================================
// SNACKIFY - MAIN APPLICATION
// Entry point and coordination of all modules
// ============================================

import { snacks, getAverageRating, getAllSnacks, addSnack } from './js/data.js';
import { initFilters, getFilteredSnacks } from './js/filters.js';
import { openModal, closeModal, initModals, initStarRatings } from './js/modal.js';
import { initRatingForm, calculateAverageRatings, getOverallAverage, initRatingFormSubmit } from './js/rating.js';
import { initLeaderboard, renderLeaderboard } from './js/leaderboard.js';
import { handleImageError } from './js/imageFetcher.js';

// Render snack cards
const renderSnacks = (snacksToRender) => {
    const grid = document.getElementById('snacksGrid');
    const sectionTitle = document.getElementById('sectionTitle');
    
    if (!grid) return;
    
    if (snacksToRender.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>No snacks found</h3><p>Try adjusting your search or filters</p></div>';
        sectionTitle.textContent = 'No Snacks Found';
        return;
    }
    
    sectionTitle.textContent = `All Snacks (${snacksToRender.length})`;
    
    grid.innerHTML = snacksToRender.map(snack => {
        const averages = calculateAverageRatings(snack.id) || snack.ratings;
        const overallAvg = getOverallAverage(snack);
        const stars = '★'.repeat(Math.round(overallAvg));
        
        return `
            <div class="snack-card" data-id="${snack.id}">
                <img 
                    src="${snack.imageUrl}" 
                    alt="${snack.name}" 
                    class="snack-card-image"
                    loading="lazy"
                >
                <div class="snack-card-content">
                    <div class="snack-card-header">
                        <h3 class="snack-card-title">${snack.name}</h3>
                        <span class="snack-card-country">${snack.country}</span>
                    </div>
                    <p class="snack-card-description">${snack.description}</p>
                    <div class="snack-card-tags">
                        ${snack.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="snack-card-rating">
                        <span class="stars">${stars}</span>
                        <span>${overallAvg.toFixed(1)}</span>
                    </div>
                    <div class="snack-card-actions">
                        <button class="btn-secondary rate-btn" data-id="${snack.id}">Rate</button>
                        <button class="btn-secondary details-btn" data-id="${snack.id}">Details</button>
                    </div>
                    <div class="snack-card-photographer">${snack.photographer || 'Photo by Unsplash'}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add image error handlers
    grid.querySelectorAll('.snack-card-image').forEach(img => {
        const snack = snacksToRender.find(s => img.alt === s.name);
        if (snack) {
            handleImageError(img, snack);
        }
    });
    
    // Add event listeners
    attachCardListeners();
};

// Attach event listeners to snack cards
const attachCardListeners = () => {
    // Rate buttons
    document.querySelectorAll('.rate-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const snackId = btn.dataset.id;
            openModal('ratingModal');
            // Initialize form after modal opens
            setTimeout(() => {
                initRatingForm(snackId, (newAverages) => {
                    // Refresh display
                    renderSnacks(getFilteredSnacks());
                });
                initStarRatings();
            }, 100);
        });
    });
    
    // Details buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const snackId = btn.dataset.id;
            showSnackDetails(snackId);
        });
    });
    
    // Card click (also opens details)
    document.querySelectorAll('.snack-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const snackId = card.dataset.id;
                showSnackDetails(snackId);
            }
        });
    });
};

// Show snack details
const showSnackDetails = (snackId) => {
    const allSnacks = getAllSnacks();
    const snack = allSnacks.find(s => s.id === parseInt(snackId));
    if (!snack) return;
    
    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsContent');
    const title = document.getElementById('detailsModalTitle');
    
    if (!modal || !content || !title) return;
    
    const averages = calculateAverageRatings(snack.id) || snack.ratings;
    const taste = averages?.taste || 0;
    const spiciness = averages?.spiciness || 0;
    const uniqueness = averages?.uniqueness || 0;
    
    title.textContent = snack.name;
    
    content.innerHTML = `
        <img src="${snack.imageUrl}" alt="${snack.name}" class="details-hero" loading="lazy">
        <div class="details-info">
            <h3>${snack.name} - ${snack.country}</h3>
            <p>${snack.description}</p>
            <p><strong>Type:</strong> ${snack.type}</p>
            <p><strong>Tags:</strong> ${snack.tags.join(', ')}</p>
        </div>
        <div class="rating-breakdown">
            <h3>Rating Breakdown</h3>
            <div class="rating-bar">
                <div class="rating-bar-label">
                    <span>Taste</span>
                    <span>${taste.toFixed(1)} / 5.0</span>
                </div>
                <div class="rating-bar-fill" style="width: ${(taste / 5) * 100}%">${taste.toFixed(1)}</div>
            </div>
            <div class="rating-bar">
                <div class="rating-bar-label">
                    <span>Spiciness</span>
                    <span>${spiciness.toFixed(1)} / 5.0</span>
                </div>
                <div class="rating-bar-fill" style="width: ${(spiciness / 5) * 100}%">${spiciness.toFixed(1)}</div>
            </div>
            <div class="rating-bar">
                <div class="rating-bar-label">
                    <span>Uniqueness</span>
                    <span>${uniqueness.toFixed(1)} / 5.0</span>
                </div>
                <div class="rating-bar-fill" style="width: ${(uniqueness / 5) * 100}%">${uniqueness.toFixed(1)}</div>
            </div>
        </div>
        <div class="comments-section">
            <h3>Comments</h3>
            <div class="comment-form">
                <textarea id="commentText" placeholder="Add a comment..." rows="3"></textarea>
                <button class="btn-primary" onclick="addComment(${snack.id})">Add Comment</button>
            </div>
            <div id="commentsList"></div>
        </div>
        <p class="snack-card-photographer">${snack.photographer || 'Photo by Unsplash'}</p>
    `;
    
    // Load comments
    loadComments(snackId);
    
    // Handle image error
    const img = content.querySelector('.details-hero');
    if (img) {
        handleImageError(img, snack);
    }
    
    openModal('detailsModal');
};

// Comments system
const loadComments = (snackId) => {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    const stored = localStorage.getItem(`snackifyComments_${snackId}`);
    const comments = stored ? JSON.parse(stored) : [];
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="empty-state">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-author">${comment.author || 'Anonymous'}</div>
            <div class="comment-text">${comment.text}</div>
            <div style="font-size: 0.8rem; color: #999; margin-top: 0.5rem;">
                ${new Date(comment.timestamp).toLocaleDateString()}
            </div>
        </div>
    `).join('');
};

// Add comment (global function for onclick)
window.addComment = (snackId) => {
    const textarea = document.getElementById('commentText');
    if (!textarea || !textarea.value.trim()) return;
    
    const stored = localStorage.getItem(`snackifyComments_${snackId}`);
    const comments = stored ? JSON.parse(stored) : [];
    
    comments.push({
        text: textarea.value.trim(),
        author: 'You',
        timestamp: Date.now()
    });
    
    localStorage.setItem(`snackifyComments_${snackId}`, JSON.stringify(comments));
    textarea.value = '';
    loadComments(snackId);
};

// Add snack form handler
const initAddSnackForm = () => {
    const form = document.getElementById('addSnackForm');
    const addBtn = document.getElementById('addSnackBtn');
    
    if (!form || !addBtn) return;
    
    // Populate country select
    const countrySelect = document.getElementById('snackCountry');
    const allSnacks = getAllSnacks();
    const countries = [...new Set(allSnacks.map(s => s.country))].sort();
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
    
    addBtn.addEventListener('click', () => {
        openModal('addSnackModal');
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('snackName').value;
        const country = document.getElementById('snackCountry').value;
        const description = document.getElementById('snackDescription').value;
        const type = document.getElementById('snackType').value;
        const imageUrl = document.getElementById('snackImageUrl').value;
        const photographer = document.getElementById('snackPhotographer').value;
        const taste = parseInt(document.getElementById('initTaste').value) || 3;
        const spiciness = parseInt(document.getElementById('initSpiciness').value) || 1;
        const uniqueness = parseInt(document.getElementById('initUniqueness').value) || 3;
        
        if (!name || !country || !description || !imageUrl) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create new snack
        const allSnacks = getAllSnacks();
        const newSnack = {
            id: Math.max(...allSnacks.map(s => s.id), 0) + 1,
            name,
            country,
            description,
            type,
            imageUrl,
            photographer: photographer || 'Photo by User',
            tags: [type],
            ratings: {
                taste,
                spiciness,
                uniqueness,
                count: 1
            }
        };
        
        // Add snack using the data module function
        addSnack(newSnack);
        
        // Reset form
        form.reset();
        closeModal('addSnackModal');
        
        // Refresh display
        renderSnacks(getFilteredSnacks());
        
        alert('Snack added successfully!');
    });
};

// Load custom snacks from localStorage (now handled by getAllSnacks)
const loadCustomSnacks = () => {
    // Custom snacks are now loaded dynamically via getAllSnacks()
    // This function is kept for compatibility but does nothing
};

// Initialize application
const init = () => {
    // Load custom snacks
    loadCustomSnacks();
    
    // Initialize modals
    initModals();
    initStarRatings();
    
    // Initialize rating form submit handler
    initRatingFormSubmit();
    
    // Initialize filters
    initFilters(renderSnacks);
    
    // Initialize leaderboard
    initLeaderboard();
    
    // Initialize add snack form
    initAddSnackForm();
    
    console.log('Snackify initialized successfully!');
};

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

