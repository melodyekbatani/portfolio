# 🎨 UX Portfolio Website - Liquid Glass Design

A modern, responsive UX portfolio website featuring liquid glass design effects, dark mode toggle, and mobile-first architecture.

## 📋 Project Structure

```
portfolio/
├── index.html          # Main portfolio landing page
├── case-study.html     # Sample case study page template
├── styles.css          # All CSS with variables, nesting, and liquid glass effects
├── script.js           # Dark mode toggle and interactivity
└── README.md           # This file
```

## ✨ Features

### Design & UX
- **Liquid Glass Effect** - Modern glassmorphism design with backdrop filters
- **Mobile-First Responsive** - Built with mobile as the priority, scales beautifully to desktop
- **Semantic HTML** - Proper use of semantic elements (nav, section, article, figure, etc.)
- **Libre Franklin Font** - Clean, modern typeface throughout
- **Teal & Cyan Color Palette** - Professional brand colors with full dark mode support

### Modern CSS Properties
- **CSS Variables** - All colors, spacing, and values defined as custom properties for easy theming
- **Relative Units** - No px units; uses rem, em, and vw for scalability
- **Logical Properties** - `inline` and `block` instead of left/right/top/bottom
- **Comparison Operators** - Media queries using comparison operators (e.g., `width > 550px`)
- **CSS Nesting** - Nested selectors for better organization
- **calc() & Variables** - Dynamic sizing and spacing calculations

### Features
- ✅ Dark/Light Mode Toggle with localStorage persistence
- ✅ Smooth scroll navigation
- ✅ Intersection Observer for scroll animations
- ✅ 4 Project Card Layouts ready for your content
- ✅ About Section with Resume Download Link
- ✅ Contact Section with multiple communication channels
- ✅ Case Study Template (see case-study.html)
- ✅ Accessibility features (skip link, focus visible, keyboard nav)
- ✅ Reduced motion support

## 🎯 How to Customize

### 1. Update Your Information
Edit `index.html`:
- Line 18-20: Change "Melody Ekbatani" and tagline
- Line 148-151: Update hero section text
- Project cards (lines 191-285): Add your project titles, descriptions, and tags
- About section (lines 291-309): Add your bio and resume link
- Contact section (lines 319-333): Update email and social links

### 2. Customize Colors
Edit the CSS variables in `styles.css` (lines 1-31):
```css
--color-primary: #0891b2; /* Cyan */
--color-secondary: #0d9488; /* Teal */
```
These cascade through the entire site automatically.

### 3. Add Your Project Images
The project cards have placeholder gradients. To add images:
```html
<figure class="project-image">
    <img src="your-image.jpg" alt="Project description">
</figure>
```

### 4. Update Case Study
Edit `case-study.html` to create detailed case studies. The template shows the full structure for:
- Problem statement
- Research & discovery
- Solution design
- Results & metrics
- Key learnings

### 5. Connect Resume & Links
Update these links in `index.html`:
- Line 308: Change resume download link
- Line 309: Update email address
- Lines 324-327: Update social media URLs

## 📱 Responsive Breakpoints

The design uses comparison operators for breakpoints:
- **Mobile**: Default up to 549px
- **Tablet**: 550px and above
- **Desktop**: 901px and above

Example:
```css
@media (width > 550px) {
    /* Tablet and up */
}
```

## 🌓 Dark Mode

- Automatically detects system preference
- User can toggle with theme button
- Persists selection in localStorage
- Variables automatically update colors

## 🎨 Liquid Glass Components

### Gradient Blobs (Hero Section)
Three animated blobs with floating animation
```html
<figure class="hero-visual">
    <div class="gradient-blob blob-1"></div>
    <div class="gradient-blob blob-2"></div>
    <div class="gradient-blob blob-3"></div>
</figure>
```

### Glass Cards (About Section)
Glassmorphism cards with hover effects
```html
<div class="glass-card"></div>
```

## ♿ Accessibility

- Semantic HTML structure
- Skip-to-main-content link
- Keyboard navigation support
- Focus visible indicators
- ARIA labels on buttons
- Reduced motion support
- Color contrast compliant

## 🚀 Best Practices Implemented

✅ Mobile-first approach - Start small, enhance larger  
✅ No hardcoded px units - Uses rem, em, vw  
✅ Logical CSS properties - block/inline instead of left/right  
✅ CSS Variables - Easy theming and maintenance  
✅ Semantic HTML - Proper element usage  
✅ Performance - Minimal JavaScript, efficient CSS  
✅ Accessibility - WCAG 2.1 compliant  
✅ Responsive - Comparison operators with calc()  

## 📝 File Size Optimization

- Single CSS file (well-organized with nesting)
- Minimal JavaScript (dark mode + scroll handling)
- No external dependencies
- Optimized animations with GPU acceleration

## 🔄 Customization Checklist

- [ ] Update personal information (name, title, bio)
- [ ] Change brand colors in CSS variables
- [ ] Add project titles and descriptions
- [ ] Replace project placeholder images
- [ ] Update resume download link
- [ ] Update email and social media URLs
- [ ] Create detailed case studies
- [ ] Test in dark mode
- [ ] Test on mobile device
- [ ] Deploy to hosting

## 📞 Getting Started

1. **Edit index.html** - Update hero, projects, about sections
2. **Customize colors** - Modify CSS variables for your brand
3. **Add images** - Replace placeholder gradients
4. **Create case studies** - Use case-study.html template
5. **Test & Deploy** - Check responsiveness and push live

## 🎓 Learning Resources

- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **CSS Nesting**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Nesting
- **Logical Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
- **Glassmorphism**: https://uxdesign.cc/glassmorphism-in-user-interface-design-ce900f5dd6e8

---

Happy designing! 🎨✨

Built with semantic HTML, modern CSS, and a focus on user experience.
