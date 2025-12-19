// ============================================
// SNACKIFY - IMAGE FETCHER MODULE
// Handles image validation and fallback logic
// ============================================

// Validate image URL
export const validateImage = (url) => {
    return new Promise((resolve) => {
        if (!url) {
            resolve(false);
            return;
        }
        
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
        // Timeout after 5 seconds
        setTimeout(() => resolve(false), 5000);
    });
};

// Get fallback image for food type
export const getFallbackImage = (foodName, country) => {
    // Try to get a generic food image based on type
    const fallbackUrls = {
        'curry': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
        'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
        'meat': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
        'fish': 'https://images.unsplash.com/photo-1565299585323-38174c3b5a0a?w=800&q=80',
        'dessert': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
        'soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
        'bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
    };
    
    const lowerName = foodName.toLowerCase();
    
    if (lowerName.includes('curry') || lowerName.includes('stew')) {
        return fallbackUrls.curry;
    } else if (lowerName.includes('rice') || lowerName.includes('biryani')) {
        return fallbackUrls.rice;
    } else if (lowerName.includes('meat') || lowerName.includes('beef') || lowerName.includes('chicken') || lowerName.includes('pork')) {
        return fallbackUrls.meat;
    } else if (lowerName.includes('fish') || lowerName.includes('ceviche')) {
        return fallbackUrls.fish;
    } else if (lowerName.includes('dessert') || lowerName.includes('pie') || lowerName.includes('sweet')) {
        return fallbackUrls.dessert;
    } else if (lowerName.includes('soup')) {
        return fallbackUrls.soup;
    } else if (lowerName.includes('bread') || lowerName.includes('injera')) {
        return fallbackUrls.bread;
    }
    
    return fallbackUrls.default;
};

// Handle image error
export const handleImageError = (imgElement, snack) => {
    imgElement.onerror = () => {
        const fallback = getFallbackImage(snack.name, snack.country);
        imgElement.src = fallback;
        imgElement.alt = `${snack.name} - ${snack.country}`;
    };
};

// Add image to needed list
export const addToNeededImages = (snack) => {
    // This would be used to track images that need to be found
    // For now, we'll use fallback images
    console.warn(`Image needed for: ${snack.name} from ${snack.country}`);
};


