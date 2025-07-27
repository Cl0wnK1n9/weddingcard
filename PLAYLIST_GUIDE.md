# Wedding Music & Images Management Guide

## How to Add Music and Images to Your Wedding Website

### 🎵 Two Ways to Add Music:

#### Method 1: Local Files (Recommended)
1. Put your MP3 files in the `music` folder
2. Put cover images in the `images/covers` folder
3. Update `playlist-config.js` with local file paths
4. Example: `src: "./music/your-song.mp3"`, `image: "./images/covers/cover.jpg"`

#### Method 2: Online Files  
1. Upload to cloud storage and get public links
2. Use full URLs in `playlist-config.js`
3. Example: `src: "https://example.com/song.mp3"`

## Quick Steps for Local Files (Music + Images):
1. Copy your MP3 files to the `music` folder
2. Copy cover images to the `images/covers` folder
3. Open `playlist-config.js`
4. Add your song using local paths:
```javascript
{
    title: "Your Song",
    artist: "Artist Name",
    duration: "3:45",
    image: "./images/covers/your-cover.jpg", // Local cover image
    src: "./music/your-song.mp3" // Local music file
}
```
5. Save and refresh your website

## 📁 Folder Structure:
```
your-wedding-site/
├── music/                    # Your MP3 files
│   ├── perfect.mp3
│   └── all-of-me.mp3
├── images/
│   ├── covers/              # Album cover images
│   │   ├── perfect-cover.jpg
│   │   └── all-of-me-cover.jpg
│   ├── gallery/             # Wedding photos
│   └── couples/             # Bride & groom photos
└── playlist-config.js       # Your playlist configuration
```

## Quick Steps for Online Files:
1. Open the `playlist-config.js` file
2. Find the `WEDDING_PLAYLIST` array
3. Copy the song template and add your new song details
4. Save the file and refresh your website

## Detailed Instructions:

### 1. Adding a Single Song

Open `playlist-config.js` and find this section:
```javascript
// ============= ADD YOUR NEW SONGS BELOW THIS LINE =============
```

Copy this template and fill in your song details:
```javascript
{
    title: "Your Song Title Here",
    artist: "Artist Name Here", 
    duration: "3:45", // Song duration in MM:SS format
    image: "https://your-cover-image-url.jpg", // Optional: song cover image
    src: "https://your-song-file-url.mp3" // REQUIRED: actual song file URL
},
```

### 2. Example of Adding a New Song

```javascript
{
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    duration: "3:36",
    image: "https://example.com/shallow-cover.jpg",
    src: "https://example.com/music/shallow.mp3"
},
```

### 3. Where to Get Song Files

**Option 1: Cloud Storage**
- Upload your MP3 files to Google Drive, Dropbox, or OneDrive
- Get the public sharing link
- Use that link in the `src` field

**Option 2: YouTube to MP3 (Legal songs only)**
- Use legitimate YouTube to MP3 converters
- Download songs you own or are copyright-free
- Upload to cloud storage and get the link

**Option 3: Your Own Server**
- If you have web hosting, upload songs there
- Use the direct URL to your song files

### 4. Managing Your Playlist

**To Remove a Song:**
- Delete the entire song object from the array
- Don't forget to remove the comma if it's the last song

**To Reorder Songs:**
- Cut and paste song objects to reorder them
- The first song in the array will be the default starting song

**To Replace All Songs:**
- Clear the entire `WEDDING_PLAYLIST` array
- Add your new songs

### 5. Advanced Features

**Using the JavaScript Console:**
You can also manage songs dynamically using browser developer tools:

```javascript
// Add a song
musicPlayer.addSong({
    title: "New Song",
    artist: "Artist Name", 
    duration: "3:30",
    src: "https://example.com/song.mp3"
});

// Remove a song (by index)
musicPlayer.removeSong(2); // Removes the 3rd song

// Get playlist info
musicPlayer.getPlaylistInfo();
```

### 6. File Format Requirements

- **Audio Format:** MP3 (recommended) or WAV
- **File Size:** Under 10MB per song for better loading
- **Duration Format:** "M:SS" or "MM:SS" (e.g., "3:45" or "10:30")
- **Image Format:** JPG or PNG for cover images

### 7. Testing Your Changes

1. Save the `playlist-config.js` file
2. Refresh your website
3. Open the floating music box
4. Check that your new songs appear in the playlist
5. Test that they play correctly

### 8. Troubleshooting

**Songs not appearing?**
- Check for syntax errors in the JavaScript (missing commas, brackets)
- Make sure the `playlist-config.js` file is loaded before `script.js`

**Songs not playing?**
- Verify the song URL is publicly accessible
- Check that the file format is supported (MP3 is best)
- Ensure the server allows hotlinking to the audio files

**Playlist looks wrong?**
- Check that each song object has proper comma separation
- Verify all required fields are filled (title, artist, src)

### 9. Sample Complete Playlist Entry

```javascript
const WEDDING_PLAYLIST = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: "4:23",
        image: "https://example.com/perfect-cover.jpg",
        src: "https://example.com/music/perfect.mp3"
    },
    {
        title: "All of Me", 
        artist: "John Legend",
        duration: "4:29",
        image: "https://example.com/allofme-cover.jpg",
        src: "https://example.com/music/allofme.mp3"
    }
    // Add more songs here...
];
```

### 10. Need Help?

If you need assistance:
1. Check the browser console for error messages (F12 → Console)
2. Verify your playlist-config.js syntax
3. Test individual song URLs in the browser
4. Make sure all files are uploaded and accessible

Remember: Always test your changes on a local copy first before updating your live website!
