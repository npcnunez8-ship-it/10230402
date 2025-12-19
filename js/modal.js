// ============================================
// SNACKIFY - MODAL MODULE
// Handles modal display and interactions
// ============================================

// Open modal
export const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        const firstFocusable = modal.querySelector('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }
};

// Close modal
export const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

// Initialize modal close handlers
export const initModals = () => {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
};

// Star rating interaction
export const initStarRatings = () => {
    document.querySelectorAll('.star-rating').forEach(ratingGroup => {
        const stars = ratingGroup.querySelectorAll('.star');
        const input = ratingGroup.parentElement.querySelector('input[type="number"]');
        
        // Remove existing listeners to avoid duplicates
        stars.forEach(star => {
            const newStar = star.cloneNode(true);
            star.parentNode.replaceChild(newStar, star);
        });
        
        // Re-query after cloning
        const newStars = ratingGroup.querySelectorAll('.star');
        
        // Set initial state
        if (input && input.value) {
            const currentRating = parseInt(input.value);
            newStars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.add('active');
                    s.style.color = '#FFD166';
                }
            });
        }
        
        newStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                if (input) input.value = rating;
                
                // Update visual state
                newStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.style.color = '#FFD166';
                    } else {
                        s.classList.remove('active');
                        s.style.color = '#ddd';
                    }
                });
            });
            
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                newStars.forEach((s, index) => {
                    if (index < rating) {
                        s.style.color = '#FFD166';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        });
        
        ratingGroup.addEventListener('mouseleave', () => {
            const currentRating = input ? parseInt(input.value) || 0 : 0;
            newStars.forEach((s, index) => {
                if (index < currentRating) {
                    s.style.color = '#FFD166';
                    s.classList.add('active');
                } else {
                    s.style.color = '#ddd';
                    s.classList.remove('active');
                }
            });
        });
    });
};

