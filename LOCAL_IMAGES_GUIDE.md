# 🖼️ Local Images Setup Guide

## Complete Guide to Using Your Own Images

### 📁 Folder Structure Created:
```
images/
├── covers/          # Song album cover images
├── gallery/         # Wedding photo gallery images  
├── couples/         # Bride and groom photos
└── README.md        # This guide
```

## 🎵 Song Cover Images

### Step 1: Get Cover Images
- **Google Search**: "song name album cover high resolution"
- **Music Apps**: Screenshot from Spotify, Apple Music, YouTube
- **Default**: You can use a single wedding photo for all songs

### Step 2: Add to covers/ folder
Put your cover images in `images/covers/` with these names:
- `perfect-ed-sheeran.jpg`
- `all-of-me-john-legend.jpg`
- `thinking-out-loud.jpg`
- `a-thousand-years.jpg`
- `cant-help-myself.jpg`
- And so on...

### Step 3: Already configured!
Your `playlist-config.js` is already set up to use local cover images.

## 📸 Wedding Gallery Images

### Step 1: Choose Your Best Photos
- Select 10-20 of your favorite wedding/engagement photos
- Mix ceremony, reception, and portrait shots
- Choose high-quality, well-lit images

### Step 2: Prepare Images
- **Resize**: 800-1200px width is perfect
- **Format**: Save as JPG
- **Name**: Use descriptive names like `wedding-ceremony-01.jpg`

### Step 3: Update HTML
Replace the current online URLs in `index.html`:

**Current (online):**
```html
<img src="https://cdn.biihappy.com/ziiweb/website/.../small.jpg" alt="Wedding Photo 1">
```

**New (local):**
```html
<img src="./images/gallery/wedding-ceremony-01.jpg" alt="Wedding Photo 1">
```

## 👫 Couple Photos

### Step 1: Prepare Photos
You'll need:
- **Bride photo**: For the couples section
- **Groom photo**: For the couples section  
- **Couple photo**: For hero and story sections

### Step 2: Add to couples/ folder
- `bride-main.jpg` - Main bride photo
- `groom-main.jpg` - Main groom photo
- `couple-hero.jpg` - Main couple photo

### Step 3: Update HTML
Replace current URLs in `index.html`:

**Hero Section:**
```html
<!-- OLD -->
<img src="https://cdn.biihappy.com/ziiweb/website/.../4cd46e095fde1b78d756b334e688f47b.jpg" alt="Nam Anh & Bảo Ly">

<!-- NEW -->
<img src="./images/couples/couple-hero.jpg" alt="Nam Anh & Bảo Ly">
```

**Couples Section:**
```html
<!-- OLD -->
<img src="https://cdn.biihappy.com/ziiweb/website/.../52ad77cf5baccba6e0ca1bd43e7a3987.jpeg" alt="Nam Anh">

<!-- NEW -->
<img src="./images/couples/groom-main.jpg" alt="Nam Anh">
```

## 🛠️ Quick Setup Checklist

### ✅ Song Covers (Optional but recommended):
- [ ] Download/find cover images for your songs
- [ ] Save them in `images/covers/` with correct names
- [ ] Files are already configured in `playlist-config.js`

### ✅ Wedding Gallery (Highly recommended):
- [ ] Choose 10-20 best wedding photos
- [ ] Resize and save in `images/gallery/`
- [ ] Update `index.html` gallery section with local paths

### ✅ Couple Photos (Essential):
- [ ] Prepare bride, groom, and couple photos
- [ ] Save in `images/couples/`
- [ ] Update `index.html` with local image paths

## 📋 Image Specifications

### Song Covers:
- **Size**: 300x300px to 500x500px (square)
- **Format**: JPG or PNG
- **File Size**: Under 500KB

### Gallery Photos:
- **Size**: 800x1200px width
- **Format**: JPG
- **File Size**: Under 2MB

### Couple Photos:
- **Size**: 400x400px (profiles) or 600x400px (couples)
- **Format**: JPG
- **File Size**: Under 1MB

## 🚀 Benefits of Local Images

1. **🔒 Privacy**: Your photos stay on your server
2. **⚡ Speed**: Faster loading than external URLs
3. **🎛️ Control**: Full control over image quality and sizing
4. **🔄 Reliability**: No broken links if external sites change
5. **📱 Offline**: Works without internet after initial load

## 🎨 Pro Tips

### Image Optimization:
```bash
# If you have ImageMagick installed, you can batch resize:
magick mogrify -resize 800x600> *.jpg

# Or use online tools like TinyPNG for compression
```

### Default Fallback:
If you don't want to find individual cover images, you can use one wedding photo for all songs:

```javascript
// In playlist-config.js, use the same image for all songs
image: "./images/couples/couple-hero.jpg"
```

### Testing:
After adding images, test your website to ensure:
- Images load correctly
- File paths are correct
- Images display at appropriate sizes
- Page loading speed is good

## 🆘 Troubleshooting

**Images not showing?**
- Check file paths are correct
- Verify image files exist in the right folders
- Make sure file names match exactly (case-sensitive)

**Images too large/slow?**
- Compress images using online tools
- Resize to recommended dimensions
- Convert to JPG if using PNG

**Mixed local/online images?**
- That's totally fine! You can mix local and online images
- Local images for privacy, online for convenience

Your wedding website will look amazing with your personal photos! 📸✨
