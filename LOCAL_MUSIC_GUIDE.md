# 🎵 Local Music Files Setup Guide

## Quick Start: Using Your Own MP3 Files

### Step 1: Prepare Your Music Files
1. **Convert to MP3**: Make sure your music files are in MP3 format
2. **Rename Files**: Use simple names without spaces or special characters
   - ✅ Good: `perfect-ed-sheeran.mp3`
   - ❌ Avoid: `Perfect (Ed Sheeran) [2017].mp3`

### Step 2: Add Files to Your Project
1. **Copy your MP3 files** into the `music` folder (already created for you)
2. **Your folder structure should look like this:**
```
wedding-project/
├── index.html
├── styles.css
├── script.js
├── playlist-config.js
└── music/
    ├── perfect-ed-sheeran.mp3
    ├── all-of-me-john-legend.mp3
    ├── thinking-out-loud.mp3
    └── your-other-songs.mp3
```

### Step 3: Update playlist-config.js
```javascript
{
    title: "Perfect",
    artist: "Ed Sheeran", 
    duration: "4:23",
    image: "https://your-cover-image.jpg", // Optional
    src: "./music/perfect-ed-sheeran.mp3" // Path to your local file
}
```

## 📁 File Organization Tips

### Recommended File Naming:
- Use lowercase letters
- Replace spaces with hyphens (-)
- Include artist name if helpful
- Examples:
  - `perfect-ed-sheeran.mp3`
  - `all-of-me-john-legend.mp3`
  - `wedding-song-01.mp3`

### Folder Structure Options:

**Option 1: Simple (Recommended)**
```
music/
├── song1.mp3
├── song2.mp3
└── song3.mp3
```

**Option 2: Organized by Category**
```
music/
├── ceremony/
│   ├── processional.mp3
│   └── recessional.mp3
├── reception/
│   ├── first-dance.mp3
│   └── party-songs.mp3
└── background/
    └── dinner-music.mp3
```

## 🎯 Configuration Examples

### Example 1: Basic Local File
```javascript
{
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    src: "./music/perfect.mp3"
}
```

### Example 2: With Subfolder
```javascript
{
    title: "Wedding March",
    artist: "Wagner",
    duration: "2:30",
    src: "./music/ceremony/wedding-march.mp3"
}
```

### Example 3: Mixed Local and Online
```javascript
const WEDDING_PLAYLIST = [
    // Local file
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "./music/perfect.mp3"
    },
    // Online file
    {
        title: "All of Me", 
        artist: "John Legend",
        src: "https://example.com/all-of-me.mp3"
    }
];
```

## 🔧 Advanced Setup

### Using Subfolders for Organization
If you want to organize by categories:

```javascript
const WEDDING_PLAYLIST = [
    // Ceremony songs
    {
        title: "Canon in D",
        artist: "Pachelbel",
        src: "./music/ceremony/canon-in-d.mp3"
    },
    // Reception songs  
    {
        title: "Can't Stop the Feeling",
        artist: "Justin Timberlake",
        src: "./music/reception/cant-stop-the-feeling.mp3"
    },
    // First dance
    {
        title: "At Last",
        artist: "Etta James", 
        src: "./music/first-dance/at-last.mp3"
    }
];
```

### Custom Cover Images (Local)
You can also use local images for song covers:

```javascript
{
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    image: "./images/perfect-cover.jpg", // Local cover image
    src: "./music/perfect.mp3"
}
```

## ⚡ Performance Tips

### File Size Optimization:
- **Keep MP3 files under 8MB** for faster loading
- **Use 128-320 kbps** quality (good balance of quality/size)
- **Consider using 44.1kHz sample rate** (standard for music)

### Loading Optimization:
```javascript
// Add preload hints to your HTML for better performance
<link rel="preload" href="./music/first-song.mp3" as="audio">
<link rel="preload" href="./music/second-song.mp3" as="audio">
```

## 🚀 Testing Your Setup

### 1. Test Individual Files
Open browser console (F12) and try:
```javascript
// Test if file exists and plays
const audio = new Audio('./music/your-song.mp3');
audio.play().then(() => {
    console.log('✅ Song loaded successfully!');
}).catch(error => {
    console.log('❌ Error loading song:', error);
});
```

### 2. Check File Paths
Make sure your paths are correct:
- ✅ `./music/song.mp3` (relative path)
- ✅ `/music/song.mp3` (absolute path from root)
- ❌ `music/song.mp3` (might not work in all cases)

### 3. Verify File Access
Open your website and check browser console for any errors like:
- "Failed to load resource" - File doesn't exist or wrong path
- "CORS error" - Server configuration issue (rarely happens with local files)

## 🛠️ Troubleshooting

### Problem: Songs not playing
**Solutions:**
1. Check file path is correct
2. Verify MP3 file isn't corrupted
3. Try a different browser
4. Check browser console for error messages

### Problem: Files not found  
**Solutions:**
1. Make sure files are in the correct folder
2. Check spelling of filename
3. Ensure no special characters in filename

### Problem: Slow loading
**Solutions:**
1. Reduce file sizes (compress MP3s)
2. Use lower bitrate (128-192 kbps)
3. Preload important songs

## 📋 Checklist for Local Music Setup

- [ ] ✅ Created `music` folder in project directory
- [ ] ✅ Converted all songs to MP3 format
- [ ] ✅ Renamed files with simple names (no spaces/special chars)
- [ ] ✅ Copied MP3 files into `music` folder
- [ ] ✅ Updated `playlist-config.js` with correct file paths
- [ ] ✅ Tested website to ensure songs load and play
- [ ] ✅ Checked browser console for any errors
- [ ] ✅ Optimized file sizes for web (under 8MB each)

## 🎊 Ready to Go!

Once you complete these steps, your wedding website will use your personal music collection with:
- ✅ **No internet required** (after initial load)
- ✅ **Full control** over your music files  
- ✅ **Fast loading** (local files load faster)
- ✅ **Privacy** (no external dependencies)
- ✅ **Custom selection** (exactly the songs you want)

Your guests will enjoy your carefully curated wedding playlist! 🎵💕
