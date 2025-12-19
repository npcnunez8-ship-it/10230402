# 🍽️ Snackify - Global Snack Discovery Platform

A production-ready, responsive website for discovering and rating snacks from around the world. Built with pure HTML5, CSS3, and Vanilla JavaScript (ES6+).

## ✨ Features

- **40+ Global Snacks**: Explore traditional foods from 20+ countries
- **Real Photographic Images**: All images are real photos from Unsplash
- **Rating System**: Rate snacks by taste, spiciness, and uniqueness
- **Leaderboards**: View top-rated, spiciest, most unique, and country-based rankings
- **Search & Filter**: Instant search and country filtering
- **Add Custom Snacks**: Add your own snacks with images
- **Snack Details**: View detailed information, ratings breakdown, and comments
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Local Storage**: Ratings and comments persist in browser

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code with Live Server extension (recommended)

### Installation

1. Clone or download this repository
2. Open the project folder in VS Code
3. Right-click on `index.html` and select "Open with Live Server"
4. The website will open in your default browser

### Alternative Setup

If you don't have Live Server:

1. Use any local web server (Python, Node.js, etc.)
2. Or simply open `index.html` in your browser (some features may be limited)

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── style.css           # All styles
├── script.js           # Main application entry point
├── README.md           # This file
├── images-needed.json  # Track images that need sourcing
└── js/
    ├── data.js         # Snack data and utilities
    ├── filters.js      # Search and filter logic
    ├── modal.js        # Modal handling
    ├── rating.js       # Rating system and localStorage
    ├── leaderboard.js  # Leaderboard calculations
    └── imageFetcher.js # Image validation and fallbacks
```

## 🎨 Design Features

- **Theme Colors**:
  - Red: #E63946
  - Orange: #F77F00
  - Yellow: #FFD166
  - Cream: #FFF8F0
  - Dark Text: #2B2D42

- **Responsive Grid**:
  - Mobile: 2 columns
  - Tablet: 3 columns
  - Desktop: 4 columns

- **Smooth Animations**: Hover effects, transitions, and modal animations

## 🍽️ Included Snacks

The app includes 40 snacks from countries including:
- Bangladesh (Hilsa Curry, Biryani, Bhuna Khichuri, Pitha)
- India (Butter Chicken, Masala Dosa, Palak Paneer, Vada Pav)
- Pakistan (Nihari, Haleem, Sajji, Chapli Kebab)
- Ethiopia (Doro Wat, Injera, Shiro Wat, Tibs)
- Egypt (Koshari, Ful Medames)
- Kenya (Ugali, Sukuma Wiki)
- Morocco (Tagine, Couscous)
- Senegal (Thieboudienne, Yassa)
- Ghana (Jollof Rice, Banku & Tilapia)
- Mexico (Tacos al Pastor, Mole)
- Ecuador (Ceviche, Locro de Papa)
- Cuba (Ropa Vieja, Cuban Sandwich)
- Venezuela (Arepas, Pabellón Criollo)
- Colombia (Bandeja Paisa, Ajiaco)
- USA (Mac and Cheese, Key Lime Pie)
- Spain (Paella, Tapas)

## 📸 Image Licensing

All images used in this project are from:
- **Unsplash** (preferred source)
- All images are free to use under Unsplash License
- Photographer credits are displayed on each snack card
- If an image fails to load, a fallback image is automatically used

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Pure CSS, no frameworks
- **JavaScript ES6+**: Modular, modern JavaScript
- **LocalStorage API**: For data persistence
- **CSS Grid & Flexbox**: For responsive layouts

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Key Features Explained

### Rating System
- Users can rate snacks on three criteria: Taste, Spiciness, and Uniqueness
- Ratings are stored in localStorage
- Average ratings are calculated and displayed in real-time

### Leaderboards
- **Top Rated**: Highest overall average ratings
- **Spiciest**: Highest spiciness ratings
- **Most Unique**: Highest uniqueness ratings
- **By Country**: Top snack from each country
- **Sweet Foods**: Top-rated desserts and sweet snacks

### Search & Filter
- Instant search across names, descriptions, countries, and tags
- Filter by country
- Case-insensitive search

### Add Snack
- Add custom snacks with image URLs
- Set initial ratings
- All custom snacks are saved to localStorage

## 🔧 Customization

### Adding More Snacks

Edit `js/data.js` and add new snack objects following this format:

```javascript
{
    id: 41,
    name: "Snack Name",
    country: "Country",
    description: "Description here",
    type: "main", // or "snack", "dessert", "soup", "street food"
    imageUrl: "https://...",
    photographer: "Photo by...",
    tags: ["tag1", "tag2"],
    ratings: {
        taste: 4.0,
        spiciness: 2.0,
        uniqueness: 3.5,
        count: 5
    }
}
```

### Changing Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --red: #E63946;
    --orange: #F77F00;
    --yellow: #FFD166;
    --cream: #FFF8F0;
    --dark-text: #2B2D42;
}
```

## 📝 Notes

- All data is stored in browser localStorage
- Images are loaded from external URLs (Unsplash)
- The app works offline after initial load (except for new images)
- No backend server required

## 🐛 Troubleshooting

**Images not loading?**
- Check your internet connection
- Images are loaded from Unsplash CDN
- Fallback images will be used if primary images fail

**Ratings not saving?**
- Check browser localStorage is enabled
- Clear browser cache if issues persist

**Layout looks broken?**
- Ensure CSS file is loaded correctly
- Check browser console for errors
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Credits

- All food images from Unsplash photographers
- Design inspired by modern food discovery platforms
- Built with ❤️ using vanilla web technologies

---

**Enjoy discovering global snacks with Snackify! 🍽️✨**


