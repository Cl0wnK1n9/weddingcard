// ========================== WEDDING MUSIC PLAYLIST CONFIGURATION ==========================
// This file contains your wedding playlist configuration
// You can easily add, remove, or modify songs here without touching the main code

// TO ADD NEW SONGS:
// 1. Copy the song object format below
// 2. Add your song details
// 3. For LOCAL FILES: Put your MP3 files in the 'music' folder and use relative paths
// 4. For LOCAL IMAGES: Put your cover images in the 'images/covers' folder
// 5. For ONLINE FILES: Use the full URL to your song file

const WEDDING_PLAYLIST = [
    // EXAMPLE WITH LOCAL FILES AND LOCAL IMAGES
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: "4:23",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE - put in images/covers folder
        src: "./music/Ed Sheeran-Perfect.mp3" // LOCAL FILE - put perfect-ed-sheeran.mp3 in music folder
    },
    {
        title: "All of Me",
        artist: "John Legend",
        duration: "4:29",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/all-of-me-john-legend.mp3" // LOCAL FILE
    },
    {
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        duration: "4:41",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/thinking-out-loud.mp3" // LOCAL FILE
    },
    {
        title: "A Thousand Years",
        artist: "Christina Perri",
        duration: "4:45",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/a-thousand-years.mp3" // LOCAL FILE
    },
    {
        title: "Can't Help Myself",
        artist: "Four Tops",
        duration: "2:57",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/cant-help-myself.mp3" // LOCAL FILE
    },
    
    // ============= ADD YOUR NEW SONGS BELOW THIS LINE =============
    // LOCAL FILE EXAMPLE:
    // {
    //     title: "Your Song Title Here",
    //     artist: "Artist Name Here",
    //     duration: "3:45",
    //     image: "https://your-cover-image-url.jpg", // Optional
    //     src: "./music/your-song-filename.mp3" // Put your MP3 file in the 'music' folder
    // },
    
    // ONLINE FILE EXAMPLE:
    // {
    //     title: "Your Song Title Here",
    //     artist: "Artist Name Here", 
    //     duration: "3:45",
    //     image: "https://your-cover-image-url.jpg", // Optional
    //     src: "https://your-website.com/path/to/song.mp3" // Full URL to online file
    // },
    
    // Example songs with mixed local and online sources:
    {
        title: "Make You Feel My Love",
        artist: "Adele",
        duration: "3:32",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/make-you-feel-my-love.mp3" // LOCAL FILE
    },
    {
        title: "At Last",
        artist: "Etta James",
        duration: "3:01",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/at-last.mp3" // LOCAL FILE
    },
    {
        title: "Marry Me",
        artist: "Train",
        duration: "3:58",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/marry-me-train.mp3" // LOCAL FILE
    },
    {
        title: "Better Days",
        artist: "OneRepublic",
        duration: "3:23",
        image: "./images/couples/_ANH9875.jpg", // LOCAL IMAGE
        src: "./music/better-days.mp3" // LOCAL FILE
    }
    // ============================================================
];

// PLAYLIST CATEGORIES (Optional - you can organize songs by category)
// const PLAYLIST_CATEGORIES = {
//     ceremony: [
//         "Perfect",
//         "A Thousand Years", 
//         "At Last"
//     ],
//     reception: [
//         "Can't Help Myself",
//         "Better Days",
//         "Marry Me"
//     ],
//     romantic: [
//         "All of Me",
//         "Thinking Out Loud",
//         "Make You Feel My Love"
//     ]
// };

// INSTRUCTIONS FOR ADDING SONGS:
// ==============================
// METHOD 1 - LOCAL FILES (Recommended for your own music):
// 1. Create a 'music' folder in your project directory (already created for you)
// 2. Copy your MP3 files into the 'music' folder
// 3. Use relative path: "./music/your-song-filename.mp3"
// 4. Example: if you have "perfect.mp3" in music folder, use "./music/perfect.mp3"

// METHOD 2 - ONLINE FILES:
// 1. Upload your songs to cloud storage (Google Drive, Dropbox, etc.)
// 2. Get the direct download link
// 3. Use the full URL: "https://example.com/path/to/song.mp3"

// SONG SOURCE OPTIONS:
// ===================
// LOCAL FILES (Best for privacy and speed):
// - Put MP3 files in the 'music' folder
// - Use path: "./music/filename.mp3"
// - No internet required once loaded
// - Full control over your files

// ONLINE FILES:
// - Upload to Google Drive and get public link
// - Use cloud storage like Dropbox, OneDrive  
// - Host on your own server
// - Use streaming service APIs (requires more setup)

// IMPORTANT NOTES:
// ===============
// - Keep song files under 10MB for better loading
// - Use MP3 format for best compatibility
// - Test song URLs before adding them
// - Duration format: "M:SS" or "MM:SS" (e.g., "3:45" or "10:30")
