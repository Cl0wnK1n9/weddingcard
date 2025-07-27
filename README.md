# Nam Anh & Bảo Ly Wedding Website Clone

This is a clone of the wedding website for Nam Anh and Bảo Ly (https://kiraandly.iwedding.info).

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: 
  - Live countdown timer to the wedding date
  - Smooth scrolling navigation
  - Photo gallery with lightbox functionality
  - Copy-to-clipboard for bank account numbers
  - Add to calendar functionality for wedding events
- **Modern UI/UX**: 
  - Beautiful animations and transitions
  - Card-based layout
  - Elegant typography with Google Fonts
  - Gradient backgrounds and shadows

## Sections

1. **Hero Section**: Main banner with couple names, wedding date, and countdown
2. **Photo Gallery**: Wedding photos in a responsive grid layout
3. **Love Story**: Timeline of the couple's relationship milestones
4. **Wedding Events**: Details about the wedding ceremonies with map links
5. **Bride & Groom**: Individual profiles with social media links
6. **Gift Box**: Bank account information for wedding gifts with QR codes
7. **RSVP**: Link to confirm attendance

## File Structure

```
wedding-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How to Use

1. **Local Development**: Simply open `index.html` in any modern web browser
2. **Web Hosting**: Upload all files to your web hosting service
3. **Customization**: 
   - Edit content in `index.html`
   - Modify colors and styles in `styles.css`
   - Add new functionality in `script.js`

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Media queries for responsive design
  - CSS custom properties (variables)
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event handling
  - Intersection Observer API
  - Local storage (for preferences)
- **External Libraries**:
  - Google Fonts (Dancing Script, Playfair Display, Open Sans)
  - Font Awesome icons

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization Guide

### Changing Colors
The main color scheme uses CSS custom properties. To change the primary color, modify the color values in `styles.css`:

```css
/* Main wedding theme color */
#8B4B7E (purple/pink)
#A569BD (lighter purple)
```

### Adding Photos
Replace the image URLs in `index.html` with your own photos:

```html
<img src="your-photo-url.jpg" alt="Description">
```

### Updating Content
- Wedding date: Change the date in both `index.html` and `script.js`
- Names: Replace "Nam Anh" and "Bảo Ly" throughout the files
- Event details: Update addresses, times, and map links
- Bank information: Update account numbers and QR codes

### Adding New Sections
1. Add the HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links
4. Add any interactive functionality in `script.js`

## Performance Optimizations

- Images are loaded from CDN for faster loading
- CSS and JavaScript are optimized and minified
- Smooth scrolling and animations use CSS transforms for better performance
- Event listeners are efficiently managed to prevent memory leaks

## SEO Features

- Semantic HTML structure
- Meta tags for social media sharing
- Alt attributes for all images
- Proper heading hierarchy
- Fast loading times

## Accessibility

- Keyboard navigation support
- ARIA labels where appropriate
- High contrast ratios
- Responsive text sizes
- Focus indicators

## License

This project is for personal use. Please respect the original couple's privacy and content when using this template.

## Support

For questions or issues, please check the code comments or create an issue in the repository.

---

**Wedding Date**: March 9, 2025  
**Created with**: ❤️ for Nam Anh & Bảo Ly
