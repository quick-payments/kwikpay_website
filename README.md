# Kwikpay Website with Lottie Animations

A modern, responsive website for Kwikpay featuring interactive Lottie animations.

## 🚀 Quick Start

### Option 1: Using the Provided Scripts (Recommended)

**Windows Users:**
```bash
# Double-click the batch file
start-server.bat

# Or run PowerShell script
.\start-server.ps1
```

**All Platforms:**
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server -p 8000 -c-1
```

### Option 2: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` or `lottie-demo.html`
3. Select "Open with Live Server"

### Option 3: Using Other Development Servers

```bash
# Using PHP (if installed)
php -S localhost:8000

# Using Ruby (if installed)
ruby -run -e httpd . -p 8000
```

## 🌐 Access Your Website

Once the server is running, open your browser and go to:

- **Main Website:** http://localhost:8000
- **Lottie Demo:** http://localhost:8000/lottie-demo.html

## ⚠️ Important: CORS Issue Solution

**Problem:** If you see "Loading Scene Animation..." instead of animations, you're experiencing a CORS (Cross-Origin Resource Sharing) issue.

**Cause:** Opening HTML files directly with `file://` protocol prevents loading JSON files due to browser security restrictions.

**Solution:** Always use a local server (as shown above) instead of opening files directly.

## 🎬 Lottie Animations Included

- **Scene.json** - General scene animation
- **Showreel-Grid-Mobile.json** - Mobile interface animation

## 📁 Project Structure

```
Kwikpay_Website_Bootstrap/
├── index.html              # Main website
├── lottie-demo.html        # Lottie animation demo
├── about.html              # About page
├── contact.html            # Contact page
├── services.html           # Services page
├── assets/                 # Images and Lottie files
│   ├── Scene.json
│   ├── Showreel-Grid-Mobile.json
│   └── *.svg
├── css/                    # Stylesheets
│   ├── style.css
│   └── Only_logo.css
├── js/                     # JavaScript files
│   └── script.js
├── start-server.bat        # Windows batch file
├── start-server.ps1        # PowerShell script
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🛠️ Development

### Adding New Lottie Animations

1. Place your `.json` file in the `assets/` folder
2. Add a container in your HTML:
   ```html
   <div id="my-animation" class="lottie-container"></div>
   ```
3. Load the animation in JavaScript:
   ```javascript
   const animation = await loadLottieAnimation('my-animation', 'assets/your-file.json');
   ```

### Available CSS Classes

- `.lottie-container` - Basic container
- `.hero-lottie` - Hero section (400px height)
- `.feature-lottie` - Feature section (300px height)
- `.mobile-lottie` - Mobile-focused (350px height)
- `.loading-lottie` - Loading animation (120px height)

## 🎨 Animation Controls

```javascript
// Play animation
animation.play();

// Pause animation
animation.pause();

// Restart animation
animation.goToAndPlay(0);

// Check if paused
if (animation.isPaused) {
    animation.play();
}
```

## 🔧 Troubleshooting

### Common Issues

1. **"Loading Scene Animation..." shows instead of animation**
   - **Solution:** Use a local server (see Quick Start section)

2. **Animations don't play on mobile**
   - **Solution:** Check mobile performance settings
   - **Solution:** Reduce animation complexity

3. **Slow loading**
   - **Solution:** Compress JSON files using LottieFiles
   - **Solution:** Use `autoplay: false` for non-visible animations

### Debug Tools

- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests
- Use Lighthouse for performance audits

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Performance Tips

1. **Use Intersection Observer** for animations not immediately visible
2. **Compress JSON files** before adding to project
3. **Limit concurrent animations** to prevent performance issues
4. **Test on actual devices**, not just browser dev tools

## 📚 Resources

- [LottieFiles](https://lottiefiles.com/) - Free Lottie animations
- [Lottie Web Documentation](https://github.com/airbnb/lottie-web)
- [Animation Guide](ANIMATION_GUIDE.md) - Detailed animation guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with a local server
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Need Help?** Check the [Animation Guide](ANIMATION_GUIDE.md) for detailed information about using animations in your website.
