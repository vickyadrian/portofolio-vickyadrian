# Portfolio Website - Documentation

## Deskripsi Proyek

Website portofolio profesional untuk **Vicky Adrian Pratama**, seorang Network Engineer dan Web Developer. Website ini dirancang dengan standar web modern dan menerapkan prinsip **Golden Ratio (1.618)** untuk menciptakan desain UI yang harmonis dan menyenangkan dipandang.

## Fitur Utama

### 1. **Responsive Design**
- Fully responsive untuk semua ukuran perangkat (desktop, tablet, mobile)
- Menggunakan CSS Grid dan Flexbox untuk layout yang fleksibel
- Mobile-first approach dengan media queries yang optimal

### 2. **Golden Ratio Typography & Spacing**
- Sistem spacing berdasarkan golden ratio (1.618)
- Typography yang harmonis dengan font sizes yang terukur
- Line heights yang optimal untuk readability
- Padding dan margins yang konsisten

### 3. **Modern UI Components**
- Navigation header dengan sticky positioning
- Hero section dengan animated profile image
- Timeline education dengan smooth animations
- Skill cards dengan progress bars
- Project showcase dengan hover effects
- Contact form dengan validasi
- Back-to-top button

### 4. **Interactive Features**
- Typing effect pada hero section
- Mobile menu toggle dengan hamburger icon
- Smooth scrolling untuk internal links
- Progress bar animations saat scroll
- Active navigation link highlighting
- Form validation

### 5. **Accessibility & Performance**
- Semantic HTML5 markup
- ARIA labels untuk screen readers
- Keyboard navigation support
- Optimized images
- Preloading critical resources
- Print-friendly styles

## Struktur File

```
portofolio/
├── index.html              # Main HTML file
├── main.js                 # JavaScript functionality
├── DOCUMENTATION.md        # This file
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet dengan Golden Ratio
│   ├── images/
│   │   ├── project-dancing-led.jpg
│   │   └── project-automatic-toll-gate.png
│   ├── profile/
│   │   └── vicky-1440x1440.jpg
│   └── certified/
│       └── RCNA - Vicky Adrian Pratama.jpg
```

## Teknologi yang Digunakan

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan CSS variables
- **JavaScript (Vanilla)** - Interaktivitas tanpa dependencies

### Libraries & Resources
- **Font Awesome 6.0** - Icons
- **Google Fonts (Poppins)** - Typography
- **Intersection Observer API** - Lazy loading & animations

## Prinsip Golden Ratio Implementation

### Spacing System
```
Base unit: 1.309rem (21px)
--space-xs: 0.5rem (8px)
--space-sm: 0.809rem (13px)
--space-base: 1.309rem (21px)
--space-md: 2.118rem (34px)
--space-lg: 3.427rem (55px)
--space-xl: 5.545rem (89px)
--space-2xl: 8.973rem (144px)
```

### Typography Scale
```
--font-xs: 0.75rem (12px)
--font-sm: 0.875rem (14px)
--font-base: 1rem (16px)
--font-lg: 1.309rem (21px)
--font-xl: 2.118rem (34px)
--font-2xl: 3.427rem (55px)
--font-3xl: 5.545rem (89px)
```

### Grid Layouts
- Hero section: 1.618fr : 1fr (60% : 40%)
- Contact section: 1fr : 1.618fr (38% : 62%)
- Skill cards: 3-column grid dengan gap yang konsisten

## Cara Menggunakan

### Setup Lokal
1. Clone atau download project
2. Buka `index.html` di browser
3. Tidak ada build process atau dependencies yang diperlukan

### Customization

#### Mengubah Warna
Edit CSS variables di `:root` dalam `style.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    /* ... */
}
```

#### Mengubah Konten
Edit section yang sesuai di `index.html`:
- About section: Line 56-77
- Education section: Line 79-141
- Skills section: Line 143-222
- Projects section: Line 224-289
- Contact section: Line 291-365

#### Menambah Project Baru
Duplikasi `.project-card` dan update:
```html
<article class="project-card">
    <div class="project-image">
        <img src="path/to/image.jpg" alt="Project name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Title</h3>
        <div class="project-tags">
            <span class="project-tag">Tag1</span>
            <span class="project-tag">Tag2</span>
        </div>
        <p class="project-description">Description</p>
        <a href="#" class="btn btn-primary">View Project</a>
    </div>
</article>
```

## Responsive Breakpoints

| Device | Width | Changes |
|--------|-------|---------|
| Desktop | > 1024px | Full layout dengan sidebar |
| Tablet | 768px - 1024px | Adjusted grid columns |
| Mobile | < 768px | Single column, hamburger menu |
| Small Mobile | < 480px | Reduced spacing, smaller fonts |

## Performance Tips

1. **Image Optimization**
   - Gunakan format WebP untuk browser yang support
   - Compress images dengan tools seperti TinyPNG
   - Gunakan responsive images dengan srcset

2. **Caching**
   - Enable browser caching di server
   - Minify CSS dan JavaScript untuk production

3. **SEO**
   - Meta descriptions sudah ditambahkan
   - Semantic HTML untuk better indexing
   - Alt text pada semua images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- ✅ Semantic HTML markup
- ✅ ARIA labels dan roles
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ Focus indicators
- ✅ Reduced motion support
- ✅ Screen reader friendly

## Troubleshooting

### Images tidak muncul
- Pastikan path file benar
- Check file extensions (case-sensitive di Linux)
- Verify file permissions

### Styling tidak bekerja
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path di HTML
- Verify CSS syntax

### JavaScript tidak berfungsi
- Check console untuk errors (F12)
- Verify script path
- Check browser compatibility

## Deployment

### Hosting Options
1. **GitHub Pages** - Free, static hosting
2. **Netlify** - Free tier dengan CI/CD
3. **Vercel** - Optimized untuk static sites
4. **Traditional Hosting** - cPanel, etc.

### Steps
1. Optimize images dan minify code
2. Test di berbagai browser
3. Upload files ke hosting
4. Setup custom domain (optional)
5. Enable HTTPS

## Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Blog section
- [ ] Project filtering
- [ ] Testimonials section
- [ ] Newsletter signup
- [ ] Analytics integration
- [ ] Multi-language support

## Support & Contact

Untuk pertanyaan atau feedback, silakan hubungi:
- Email: vicky@example.com
- Phone: +62 812-3456-7890
- Location: Kendal, Jawa Tengah, Indonesia

## License

© 2024 Vicky Adrian Pratama. All rights reserved.

---

**Last Updated:** November 2024
**Version:** 2.0 (Redesigned with Golden Ratio)
