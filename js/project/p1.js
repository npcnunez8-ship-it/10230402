// ============================================
// SNACKIFY - DATA MODULE
// Contains all snack data with real image URLs
// ============================================

export const snacks = [
    // Bangladesh
    {
        id: 1,
        name: "Hilsa Curry",
        country: "Bangladesh",
        description: "A traditional fish curry made with hilsa fish, mustard oil, and spices. A national favorite.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["spicy", "fish", "curry"],
        ratings: {
            taste: 4.5,
            spiciness: 3.5,
            uniqueness: 4.0,
            count: 12
        }
    },
    {
        id: 2,
        name: "Biryani",
        country: "Bangladesh",
        description: "Fragrant basmati rice cooked with marinated meat, spices, and herbs. A celebratory dish.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["rice", "meat", "aromatic"],
        ratings: {
            taste: 4.8,
            spiciness: 2.5,
            uniqueness: 4.2,
            count: 25
        }
    },
    {
        id: 3,
        name: "Bhuna Khichuri",
        country: "Bangladesh",
        description: "A hearty rice and lentil dish cooked with spices, often served during rainy days.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["rice", "lentil", "comfort"],
        ratings: {
            taste: 4.2,
            spiciness: 2.0,
            uniqueness: 3.5,
            count: 8
        }
    },
    {
        id: 4,
        name: "Pitha",
        country: "Bangladesh",
        description: "Traditional rice cakes, sweet or savory, often made during festivals.",
        type: "dessert",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["sweet", "rice", "traditional"],
        ratings: {
            taste: 4.3,
            spiciness: 1.0,
            uniqueness: 4.5,
            count: 15
        }
    },
    // India
    {
        id: 5,
        name: "Butter Chicken",
        country: "India",
        description: "Creamy tomato-based curry with tender chicken pieces. A global favorite.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["chicken", "creamy", "mild"],
        ratings: {
            taste: 4.7,
            spiciness: 2.0,
            uniqueness: 3.8,
            count: 45
        }
    },
    {
        id: 6,
        name: "Masala Dosa",
        country: "India",
        description: "Crispy fermented crepe filled with spiced potatoes, served with chutneys.",
        type: "street food",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["crispy", "spicy", "vegetarian"],
        ratings: {
            taste: 4.6,
            spiciness: 3.0,
            uniqueness: 4.3,
            count: 38
        }
    },
    {
        id: 7,
        name: "Palak Paneer",
        country: "India",
        description: "Creamy spinach curry with soft paneer cheese cubes. A vegetarian classic.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d96a?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["vegetarian", "spinach", "creamy"],
        ratings: {
            taste: 4.4,
            spiciness: 2.5,
            uniqueness: 3.9,
            count: 32
        }
    },
    {
        id: 8,
        name: "Vada Pav",
        country: "India",
        description: "Mumbai's favorite street food: spiced potato fritter in a soft bun.",
        type: "street food",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["street food", "spicy", "vegetarian"],
        ratings: {
            taste: 4.5,
            spiciness: 3.5,
            uniqueness: 4.1,
            count: 28
        }
    },
    // Pakistan
    {
        id: 9,
        name: "Nihari",
        country: "Pakistan",
        description: "Slow-cooked beef stew with rich spices, traditionally eaten for breakfast.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["beef", "spicy", "slow-cooked"],
        ratings: {
            taste: 4.6,
            spiciness: 4.0,
            uniqueness: 4.4,
            count: 22
        }
    },
    {
        id: 10,
        name: "Haleem",
        country: "Pakistan",
        description: "Thick, hearty stew of lentils, meat, and wheat, slow-cooked to perfection.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["lentil", "meat", "hearty"],
        ratings: {
            taste: 4.5,
            spiciness: 3.0,
            uniqueness: 4.2,
            count: 18
        }
    },
    {
        id: 11,
        name: "Sajji",
        country: "Pakistan",
        description: "Whole lamb or chicken marinated and slow-roasted over coals. A Balochi specialty.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["meat", "roasted", "aromatic"],
        ratings: {
            taste: 4.8,
            spiciness: 3.5,
            uniqueness: 4.6,
            count: 15
        }
    },
    {
        id: 12,
        name: "Chapli Kebab",
        country: "Pakistan",
        description: "Spiced minced meat patties, pan-fried until crispy. A Peshawari favorite.",
        type: "street food",
        imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["meat", "spicy", "crispy"],
        ratings: {
            taste: 4.7,
            spiciness: 4.2,
            uniqueness: 4.3,
            count: 20
        }
    },
    // Ethiopia
    {
        id: 13,
        name: "Doro Wat",
        country: "Ethiopia",
        description: "Spicy chicken stew with berbere spice, served with injera bread.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["chicken", "spicy", "stew"],
        ratings: {
            taste: 4.6,
            spiciness: 4.5,
            uniqueness: 4.7,
            count: 19
        }
    },
    {
        id: 14,
        name: "Injera",
        country: "Ethiopia",
        description: "Sourdough flatbread with a unique spongy texture, the foundation of Ethiopian meals.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["bread", "sourdough", "traditional"],
        ratings: {
            taste: 4.3,
            spiciness: 1.0,
            uniqueness: 4.8,
            count: 24
        }
    },
    {
        id: 15,
        name: "Shiro Wat",
        country: "Ethiopia",
        description: "Creamy chickpea flour stew, a vegetarian favorite in Ethiopian cuisine.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["vegetarian", "creamy", "spicy"],
        ratings: {
            taste: 4.4,
            spiciness: 3.5,
            uniqueness: 4.5,
            count: 16
        }
    },
    {
        id: 16,
        name: "Tibs",
        country: "Ethiopia",
        description: "Sautéed meat with vegetables and spices, a popular Ethiopian dish.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["meat", "spicy", "sautéed"],
        ratings: {
            taste: 4.5,
            spiciness: 3.8,
            uniqueness: 4.2,
            count: 14
        }
    },
    // Egypt
    {
        id: 17,
        name: "Koshari",
        country: "Egypt",
        description: "Egypt's national dish: rice, lentils, pasta, and chickpeas topped with spicy tomato sauce.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["rice", "lentil", "spicy"],
        ratings: {
            taste: 4.5,
            spiciness: 3.0,
            uniqueness: 4.4,
            count: 21
        }
    },
    {
        id: 18,
        name: "Ful Medames",
        country: "Egypt",
        description: "Slow-cooked fava beans, a traditional Egyptian breakfast staple.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1574484284007-7d672fbb1b32?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["beans", "traditional", "breakfast"],
        ratings: {
            taste: 4.2,
            spiciness: 2.0,
            uniqueness: 4.0,
            count: 17
        }
    },
    // Kenya
    {
        id: 19,
        name: "Ugali",
        country: "Kenya",
        description: "Staple cornmeal porridge, served with vegetables and meat stews.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["cornmeal", "staple", "traditional"],
        ratings: {
            taste: 3.8,
            spiciness: 1.5,
            uniqueness: 3.9,
            count: 12
        }
    },
    {
        id: 20,
        name: "Sukuma Wiki",
        country: "Kenya",
        description: "Sautéed collard greens with tomatoes and onions, a Kenyan favorite.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["vegetarian", "greens", "healthy"],
        ratings: {
            taste: 4.0,
            spiciness: 2.0,
            uniqueness: 3.7,
            count: 10
        }
    },
    // Morocco
    {
        id: 21,
        name: "Tagine",
        country: "Morocco",
        description: "Slow-cooked stew with meat, vegetables, and aromatic spices, cooked in a clay pot.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["stew", "aromatic", "slow-cooked"],
        ratings: {
            taste: 4.7,
            spiciness: 3.2,
            uniqueness: 4.5,
            count: 26
        }
    },
    {
        id: 22,
        name: "Couscous",
        country: "Morocco",
        description: "Steamed semolina grains, often served with vegetables and meat.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["grain", "aromatic", "traditional"],
        ratings: {
            taste: 4.4,
            spiciness: 2.5,
            uniqueness: 4.1,
            count: 23
        }
    },
    // Senegal
    {
        id: 23,
        name: "Thieboudienne",
        country: "Senegal",
        description: "Senegal's national dish: fish and rice cooked with vegetables and tomato sauce.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["fish", "rice", "aromatic"],
        ratings: {
            taste: 4.6,
            spiciness: 3.0,
            uniqueness: 4.3,
            count: 18
        }
    },
    {
        id: 24,
        name: "Yassa",
        country: "Senegal",
        description: "Marinated chicken or fish with onions, lemon, and mustard, grilled to perfection.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["chicken", "marinated", "tangy"],
        ratings: {
            taste: 4.5,
            spiciness: 2.8,
            uniqueness: 4.2,
            count: 15
        }
    },
    // Ghana
    {
        id: 25,
        name: "Jollof Rice",
        country: "Ghana",
        description: "One-pot rice dish cooked with tomatoes, peppers, and spices. A West African favorite.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["rice", "spicy", "one-pot"],
        ratings: {
            taste: 4.7,
            spiciness: 3.5,
            uniqueness: 4.4,
            count: 30
        }
    },
    {
        id: 26,
        name: "Banku & Tilapia",
        country: "Ghana",
        description: "Fermented corn and cassava dough served with grilled tilapia and pepper sauce.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["fish", "fermented", "spicy"],
        ratings: {
            taste: 4.6,
            spiciness: 4.0,
            uniqueness: 4.6,
            count: 19
        }
    },
    // Mexico
    {
        id: 27,
        name: "Tacos al Pastor",
        country: "Mexico",
        description: "Marinated pork tacos with pineapple, onions, and cilantro. A Mexico City classic.",
        type: "street food",
        imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c3b5a0a?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["pork", "spicy", "street food"],
        ratings: {
            taste: 4.8,
            spiciness: 3.8,
            uniqueness: 4.3,
            count: 42
        }
    },
    {
        id: 28,
        name: "Mole",
        country: "Mexico",
        description: "Complex sauce with chocolate, chilies, and spices, served over chicken or turkey.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["chicken", "complex", "spicy"],
        ratings: {
            taste: 4.7,
            spiciness: 3.5,
            uniqueness: 4.8,
            count: 28
        }
    },
    // Ecuador
    {
        id: 29,
        name: "Ceviche",
        country: "Ecuador",
        description: "Fresh fish marinated in citrus juice with onions, cilantro, and peppers.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d96a?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["fish", "fresh", "citrus"],
        ratings: {
            taste: 4.6,
            spiciness: 2.5,
            uniqueness: 4.2,
            count: 24
        }
    },
    {
        id: 30,
        name: "Locro de Papa",
        country: "Ecuador",
        description: "Creamy potato and cheese soup, a comforting Andean dish.",
        type: "soup",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["potato", "cheese", "soup"],
        ratings: {
            taste: 4.4,
            spiciness: 1.5,
            uniqueness: 4.0,
            count: 16
        }
    },
    // Cuba
    {
        id: 31,
        name: "Ropa Vieja",
        country: "Cuba",
        description: "Shredded beef stewed with tomatoes, peppers, and spices. Cuba's national dish.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["beef", "stew", "aromatic"],
        ratings: {
            taste: 4.6,
            spiciness: 2.8,
            uniqueness: 4.1,
            count: 20
        }
    },
    {
        id: 32,
        name: "Cuban Sandwich",
        country: "Cuba",
        description: "Pressed sandwich with roasted pork, ham, Swiss cheese, pickles, and mustard.",
        type: "street food",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["pork", "sandwich", "pressed"],
        ratings: {
            taste: 4.7,
            spiciness: 1.5,
            uniqueness: 3.9,
            count: 27
        }
    },
    // Venezuela
    {
        id: 33,
        name: "Arepas",
        country: "Venezuela",
        description: "Cornmeal patties grilled and stuffed with cheese, meat, or beans.",
        type: "street food",
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["cornmeal", "stuffed", "versatile"],
        ratings: {
            taste: 4.5,
            spiciness: 2.0,
            uniqueness: 4.2,
            count: 25
        }
    },
    {
        id: 34,
        name: "Pabellón Criollo",
        country: "Venezuela",
        description: "Venezuela's national dish: shredded beef, black beans, rice, and fried plantains.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["beef", "rice", "beans"],
        ratings: {
            taste: 4.6,
            spiciness: 2.5,
            uniqueness: 4.3,
            count: 19
        }
    },
    // Colombia
    {
        id: 35,
        name: "Bandeja Paisa",
        country: "Colombia",
        description: "A hearty platter with beans, rice, meat, plantains, avocado, and arepa.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["hearty", "meat", "beans"],
        ratings: {
            taste: 4.7,
            spiciness: 2.8,
            uniqueness: 4.4,
            count: 22
        }
    },
    {
        id: 36,
        name: "Ajiaco",
        country: "Colombia",
        description: "Creamy chicken and potato soup with corn, capers, and cream. A Bogotá specialty.",
        type: "soup",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["chicken", "soup", "creamy"],
        ratings: {
            taste: 4.5,
            spiciness: 2.0,
            uniqueness: 4.1,
            count: 18
        }
    },
    // USA
    {
        id: 37,
        name: "Mac and Cheese",
        country: "USA",
        description: "Creamy macaroni pasta with melted cheese, an American comfort food classic.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["cheese", "comfort", "creamy"],
        ratings: {
            taste: 4.4,
            spiciness: 1.0,
            uniqueness: 3.2,
            count: 35
        }
    },
    {
        id: 38,
        name: "Key Lime Pie",
        country: "USA",
        description: "Tangy lime pie with graham cracker crust, a Florida Keys specialty.",
        type: "dessert",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["sweet", "citrus", "pie"],
        ratings: {
            taste: 4.6,
            spiciness: 1.0,
            uniqueness: 3.8,
            count: 29
        }
    },
    // Spain
    {
        id: 39,
        name: "Paella",
        country: "Spain",
        description: "Saffron-infused rice with seafood, chicken, and vegetables. A Valencian masterpiece.",
        type: "main",
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["rice", "seafood", "aromatic"],
        ratings: {
            taste: 4.8,
            spiciness: 2.0,
            uniqueness: 4.5,
            count: 40
        }
    },
    {
        id: 40,
        name: "Tapas",
        country: "Spain",
        description: "Small plates of various Spanish dishes, perfect for sharing and socializing.",
        type: "snack",
        imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
        photographer: "Photo by Unsplash",
        tags: ["variety", "sharing", "traditional"],
        ratings: {
            taste: 4.7,
            spiciness: 2.5,
            uniqueness: 4.3,
            count: 38
        }
    }
];

// Get unique countries for filter
export const getCountries = () => {
    const allSnacks = getAllSnacks();
    const countries = [...new Set(allSnacks.map(snack => snack.country))];
    return countries.sort();
};

// Get snack by ID
export const getSnackById = (id) => {
    return snacks.find(snack => snack.id === parseInt(id));
};

// Calculate average rating
export const getAverageRating = (snack) => {
    if (!snack.ratings || snack.ratings.count === 0) return 0;
    const avg = (snack.ratings.taste + snack.ratings.spiciness + snack.ratings.uniqueness) / 3;
    return Math.round(avg * 10) / 10;
};

// Get all snacks including custom ones from localStorage
export const getAllSnacks = () => {
    const customSnacks = [];
    try {
        const stored = localStorage.getItem('snackifySnacks');
        if (stored) {
            const parsed = JSON.parse(stored);
            customSnacks.push(...parsed);
        }
    } catch (e) {
        console.error('Error loading custom snacks:', e);
    }
    
    // Combine base snacks with custom snacks, avoiding duplicates
    const allSnacks = [...snacks];
    customSnacks.forEach(custom => {
        if (!allSnacks.find(s => s.id === custom.id)) {
            allSnacks.push(custom);
        }
    });
    
    return allSnacks;
};

// Add a new snack
export const addSnack = (newSnack) => {
    const stored = localStorage.getItem('snackifySnacks');
    const customSnacks = stored ? JSON.parse(stored) : [];
    customSnacks.push(newSnack);
    localStorage.setItem('snackifySnacks', JSON.stringify(customSnacks));
    return newSnack;
};

