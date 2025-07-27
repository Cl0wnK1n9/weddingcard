// Wedding website JavaScript functionality

// Set the wedding date
const weddingDate = new Date('2025-11-01T11:30:00').getTime();

// Countdown timer function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown-timer').innerHTML = 'Đám cưới đã diễn ra!';
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Add click event listeners to navigation links
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Photo gallery lightbox functionality
    const photoItems = document.querySelectorAll('.photo-item img');
    photoItems.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Add calendar event functionality
    const calendarButtons = document.querySelectorAll('.btn-calendar');
    calendarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const title = eventCard.querySelector('h3').textContent;
            const timeText = eventCard.querySelector('.event-time').textContent;
            const location = eventCard.querySelector('.event-location').textContent;
            
            addToCalendar(title, timeText, location);
        });
    });

    // Smooth scroll behavior for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons button, .btn-rsvp');
    heroButtons.forEach(button => {
        if (button.onclick) return; // Skip if already has onclick
        
        button.addEventListener('click', function() {
            const text = this.textContent.toLowerCase();
            if (text.includes('rsvp') || text.includes('xác nhận')) {
                scrollToSection('rsvp');
            } else if (text.includes('mừng cưới')) {
                scrollToSection('gift');
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.event-card, .gift-card, .couple-card, .photo-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Lightbox functionality
function openLightbox(src, alt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: auto;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
    `;
    
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Add to calendar functionality
function addToCalendar(title, timeText, location) {
    try {
        // Parse the Vietnamese date format
        const [time, dateStr] = timeText.split(' ');
        const [day, month, year] = dateStr.split('/');
        const [hour, minute] = time.split(':');
        
        const startDate = new Date(year, month - 1, day, hour, minute);
        const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration
        
        // Format dates for calendar
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        const eventDetails = {
            title: encodeURIComponent(title),
            start: formatDate(startDate),
            end: formatDate(endDate),
            location: encodeURIComponent(location),
            description: encodeURIComponent(`Lễ cưới Mạnh Dũng & Tú Anh `)
        };
        
        // Create Google Calendar URL
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventDetails.title}&dates=${eventDetails.start}/${eventDetails.end}&location=${eventDetails.location}&details=${eventDetails.description}`;
        
        // Open in new window
        window.open(googleCalendarUrl, '_blank');
        
    } catch (error) {
        console.error('Error creating calendar event:', error);
        alert('Không thể tạo sự kiện lịch. Vui lòng thử lại sau.');
    }
}

// Utility function to format numbers with leading zeros
function pad(num) {
    return num.toString().padStart(2, '0');
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Scroll reveal animation
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.timeline-item, .photo-item, .event-card, .couple-card, .gift-card');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('fade-in-up');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Throttle scroll events for performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScrollAnimations);
        ticking = true;
        setTimeout(() => { ticking = false; }, 100);
    }
}

window.addEventListener('scroll', requestTick);

// Initialize scroll animations on load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states
    const animatedElements = document.querySelectorAll('.timeline-item, .photo-item, .event-card, .couple-card, .gift-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Trigger initial animation check
    setTimeout(handleScrollAnimations, 100);
});

// Copy bank account number to clipboard
function copyToClipboard(text, button) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyToClipboard(text, button);
        });
    } else {
        fallbackCopyToClipboard(text, button);
    }
}

function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Could not copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Đã sao chép!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Add copy functionality to bank account numbers
document.addEventListener('DOMContentLoaded', function() {
    const bankInfos = document.querySelectorAll('.bank-info');
    bankInfos.forEach(bankInfo => {
        const accountNumber = bankInfo.querySelector('p:last-child');
        if (accountNumber) {
            const number = accountNumber.textContent.split(': ')[1];
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Sao chép';
            copyButton.className = 'btn-copy';
            copyButton.style.cssText = `
                margin-top: 10px;
                padding: 5px 15px;
                background: #8B4B7E;
                color: white;
                border: none;
                border-radius: 15px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            `;
            
            copyButton.addEventListener('click', () => {
                copyToClipboard(number, copyButton);
            });
            
            copyButton.addEventListener('mouseenter', () => {
                copyButton.style.background = '#7A4170';
            });
            
            copyButton.addEventListener('mouseleave', () => {
                if (copyButton.textContent !== 'Đã sao chép!') {
                    copyButton.style.background = '#8B4B7E';
                }
            });
            
            bankInfo.appendChild(copyButton);
        }
    });
});

// Music Player Functionality
class MusicPlayer {
    constructor() {
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isMinimized = false;
        this.isHidden = true; // Start hidden
        this.playlistExpanded = false;
        
        // ========================== PLAYLIST CONFIGURATION ==========================
        // Playlist is now loaded from playlist-config.js for easy management
        this.songs = WEDDING_PLAYLIST || [
            // Fallback songs if playlist-config.js fails to load
            {
                title: "Perfect",
                artist: "Ed Sheeran",
                duration: "4:23",
                image: "https://cdn.biihappy.com/ziiweb/website/678327ed49dc85729e0ff704/templates/643d7aa30be61636f4051958/4cd46e095fde1b78d756b334e688f47b.jpg",
                src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
            }
        ];
        // ========================================================================
        
        this.init();
    }

    init() {
        this.audioPlayer = document.getElementById('audio-player');
        this.initFloatingPlayer();
        this.loadSong(this.currentSongIndex);
        this.addEventListeners();
        this.updatePlaylistUI(); // Build playlist UI from configuration
        this.initializeHiddenState(); // Start with music box hidden and add animation
    }

    initFloatingPlayer() {
        this.floatingBox = document.getElementById('floating-music-box');
        this.floatingToggle = document.getElementById('music-toggle');
        this.floatingHideBtn = document.getElementById('music-hide-btn');
        this.floatingContent = document.getElementById('floating-music-content');
        this.floatingPlayPauseBtn = document.getElementById('floating-play-pause-btn');
        this.floatingPrevBtn = document.getElementById('floating-prev-btn');
        this.floatingNextBtn = document.getElementById('floating-next-btn');
        this.floatingProgress = document.getElementById('floating-progress');
        this.floatingVolumeSlider = document.getElementById('floating-volume-slider');
        this.floatingSongImage = document.getElementById('floating-song-image');
        this.floatingSongTitle = document.getElementById('floating-song-title');
        this.floatingSongArtist = document.getElementById('floating-song-artist');
        this.floatingPlayIcon = document.getElementById('floating-play-icon');
        this.playlistToggle = document.getElementById('playlist-toggle');
        this.floatingPlaylistItems = document.getElementById('floating-playlist-items');
        this.showMusicBtn = document.getElementById('show-music-btn');
    }

    addEventListeners() {
        // Main player events
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSong());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSong());
        }

        // Floating player events
        this.floatingToggle.addEventListener('click', () => this.toggleMinimize());
        this.floatingHideBtn.addEventListener('click', () => this.hideFloatingPlayer());
        this.floatingPlayPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.floatingPrevBtn.addEventListener('click', () => this.prevSong());
        this.floatingNextBtn.addEventListener('click', () => this.nextSong());
        
        // Playlist toggle
        this.playlistToggle.addEventListener('click', () => this.togglePlaylist());

        // Play overlay clicks
        const playOverlay = document.querySelector('.play-overlay');
        if (playOverlay) {
            playOverlay.addEventListener('click', () => this.togglePlayPause());
        }
        
        const floatingPlayOverlay = document.getElementById('floating-play-overlay');
        if (floatingPlayOverlay) {
            floatingPlayOverlay.addEventListener('click', () => this.togglePlayPause());
        }

        // Volume controls (sync both sliders)
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.audioPlayer.volume = e.target.value / 100;
                this.floatingVolumeSlider.value = e.target.value;
            });
        }

        this.floatingVolumeSlider.addEventListener('input', (e) => {
            this.audioPlayer.volume = e.target.value / 100;
            if (this.volumeSlider) {
                this.volumeSlider.value = e.target.value;
            }
        });

        // Progress bar clicks
        const progressBarElement = document.querySelector('.progress-bar');
        if (progressBarElement) {
            progressBarElement.addEventListener('click', (e) => {
                const rect = e.target.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = clickX / width;
                this.audioPlayer.currentTime = percentage * this.audioPlayer.duration;
            });
        }

        const floatingProgressBar = document.querySelector('.floating-progress-bar');
        if (floatingProgressBar) {
            floatingProgressBar.addEventListener('click', (e) => {
                const rect = e.target.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = clickX / width;
                this.audioPlayer.currentTime = percentage * this.audioPlayer.duration;
            });
        }

        // Audio events
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.nextSong());

        // Playlist items (both main and floating)
        document.querySelectorAll('.playlist-item, .floating-playlist-item').forEach((item, index) => {
            const songIndex = parseInt(item.dataset.song);
            item.addEventListener('click', () => this.selectSong(songIndex));
        });

        // Show music button event
        if (this.showMusicBtn) {
            this.showMusicBtn.addEventListener('click', () => {
                this.showFloatingPlayer();
            });
        }
    }

    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        if (this.isMinimized) {
            this.floatingBox.classList.add('minimized');
        } else {
            this.floatingBox.classList.remove('minimized');
        }
    }

    hideFloatingPlayer() {
        this.isHidden = true;
        this.floatingBox.classList.add('hidden');
        if (this.showMusicBtn) {
            this.showMusicBtn.classList.add('visible');
        }
    }

    showFloatingPlayer() {
        this.isHidden = false;
        this.floatingBox.classList.remove('hidden');
        if (this.showMusicBtn) {
            this.showMusicBtn.classList.remove('visible');
        }
    }

    initializeHiddenState() {
        // Start with music box hidden and show button with animation
        this.floatingBox.classList.add('hidden');
        if (this.showMusicBtn) {
            // Show button with entrance animation after a delay
            setTimeout(() => {
                this.showMusicBtn.classList.add('visible');
                // Add attention animation after entrance
                setTimeout(() => {
                    this.showMusicBtn.classList.add('attention');
                    // Remove attention animation after 10 seconds
                    setTimeout(() => {
                        this.showMusicBtn.classList.remove('attention');
                    }, 10000);
                }, 2000);
            }, 3000); // Show after 3 seconds of page load
        }
    }

    togglePlaylist() {
        this.playlistExpanded = !this.playlistExpanded;
        if (this.playlistExpanded) {
            this.floatingPlaylistItems.classList.add('expanded');
            this.playlistToggle.classList.add('expanded');
        } else {
            this.floatingPlaylistItems.classList.remove('expanded');
            this.playlistToggle.classList.remove('expanded');
        }
    }

    loadSong(index) {
        const song = this.songs[index];
        this.audioPlayer.src = song.src;
        
        // Update main player
        if (this.songImage) {
            this.songImage.src = song.image;
            this.songTitle.textContent = song.title;
            this.songArtist.textContent = song.artist;
        }
        
        // Update floating player
        this.floatingSongImage.src = song.image;
        this.floatingSongTitle.textContent = song.title;
        this.floatingSongArtist.textContent = song.artist;
        
        // Update playlist active states
        document.querySelectorAll('.playlist-item, .floating-playlist-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelectorAll(`[data-song="${index}"]`).forEach(item => {
            item.classList.add('active');
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audioPlayer.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButtons('pause');
            this.addPlayingAnimation();
        }).catch(error => {
            console.log('Auto-play prevented:', error);
            this.showPlayMessage();
        });
    }

    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.updatePlayButtons('play');
        this.removePlayingAnimation();
    }

    updatePlayButtons(state) {
        const icon = state === 'play' ? 'fas fa-play' : 'fas fa-pause';
        
        if (this.playPauseBtn) {
            this.playPauseBtn.innerHTML = `<i class="${icon}"></i>`;
        }
        
        if (this.playIcon) {
            this.playIcon.className = icon;
        }
        
        this.floatingPlayPauseBtn.innerHTML = `<i class="${icon}"></i>`;
        this.floatingPlayIcon.className = icon;
    }

    addPlayingAnimation() {
        if (this.songImage) {
            this.songImage.classList.add('playing');
        }
        this.floatingSongImage.classList.add('playing');
    }

    removePlayingAnimation() {
        if (this.songImage) {
            this.songImage.classList.remove('playing');
        }
        this.floatingSongImage.classList.remove('playing');
    }

    prevSong() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) {
            this.play();
        }
    }

    nextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) {
            this.play();
        }
    }

    selectSong(index) {
        this.currentSongIndex = index;
        this.loadSong(index);
        this.play();
    }

    updateProgress() {
        if (this.audioPlayer.duration) {
            const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
            
            if (this.progressBar) {
                this.progressBar.style.width = progress + '%';
            }
            
            this.floatingProgress.style.width = progress + '%';
            
            if (this.currentTimeSpan) {
                this.currentTimeSpan.textContent = this.formatTime(this.audioPlayer.currentTime);
            }
        }
    }

    updateDuration() {
        if (this.durationSpan) {
            this.durationSpan.textContent = this.formatTime(this.audioPlayer.duration);
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showPlayMessage() {
        const message = document.createElement('div');
        message.textContent = 'Click play button to start music';
        message.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(139, 75, 126, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            z-index: 1000;
        `;
        
        const songImageContainer = document.querySelector('.song-image');
        if (songImageContainer) {
            songImageContainer.appendChild(message);
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 3000);
        }
    }

    // ========================== PLAYLIST MANAGEMENT METHODS ==========================
    // These methods allow you to dynamically add, remove, and manage songs

    /**
     * Add a new song to the playlist
     * @param {Object} song - Song object with title, artist, duration, image, src
     */
    addSong(song) {
        if (!song.title || !song.artist || !song.src) {
            console.error('Song must have at least title, artist, and src properties');
            return false;
        }
        
        // Set default values if not provided
        const newSong = {
            title: song.title,
            artist: song.artist,
            duration: song.duration || "0:00",
            image: song.image || "https://cdn.biihappy.com/ziiweb/website/678327ed49dc85729e0ff704/templates/643d7aa30be61636f4051958/4cd46e095fde1b78d756b334e688f47b.jpg",
            src: song.src
        };
        
        this.songs.push(newSong);
        this.updatePlaylistUI();
        console.log(`Added song: ${newSong.title} by ${newSong.artist}`);
        return true;
    }

    /**
     * Remove a song from the playlist by index
     * @param {number} index - Index of the song to remove
     */
    removeSong(index) {
        if (index < 0 || index >= this.songs.length) {
            console.error('Invalid song index');
            return false;
        }
        
        const removedSong = this.songs.splice(index, 1)[0];
        
        // Adjust current song index if necessary
        if (index < this.currentSongIndex) {
            this.currentSongIndex--;
        } else if (index === this.currentSongIndex && this.currentSongIndex >= this.songs.length) {
            this.currentSongIndex = 0;
        }
        
        this.updatePlaylistUI();
        console.log(`Removed song: ${removedSong.title} by ${removedSong.artist}`);
        return true;
    }

    /**
     * Add multiple songs at once
     * @param {Array} songsArray - Array of song objects
     */
    addMultipleSongs(songsArray) {
        if (!Array.isArray(songsArray)) {
            console.error('Expected an array of songs');
            return false;
        }
        
        let addedCount = 0;
        songsArray.forEach(song => {
            if (this.addSong(song)) {
                addedCount++;
            }
        });
        
        console.log(`Added ${addedCount} songs to playlist`);
        return addedCount;
    }

    /**
     * Clear all songs and add new ones
     * @param {Array} newSongs - Array of new song objects
     */
    replacePlaylist(newSongs) {
        this.songs = [];
        this.currentSongIndex = 0;
        return this.addMultipleSongs(newSongs);
    }

    /**
     * Get current playlist info
     */
    getPlaylistInfo() {
        return {
            totalSongs: this.songs.length,
            currentSong: this.currentSongIndex,
            songs: this.songs.map(song => ({
                title: song.title,
                artist: song.artist,
                duration: song.duration
            }))
        };
    }

    /**
     * Update the playlist UI after changes
     */
    updatePlaylistUI() {
        // Update HTML playlist
        const playlistContainer = document.getElementById('floating-playlist-items');
        if (playlistContainer) {
            playlistContainer.innerHTML = '';
            
            this.songs.forEach((song, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.className = `floating-playlist-item ${index === this.currentSongIndex ? 'active' : ''}`;
                playlistItem.dataset.song = index;
                playlistItem.innerHTML = `
                    <span class="floating-item-title">${song.title} - ${song.artist}</span>
                    <span class="floating-item-duration">${song.duration}</span>
                `;
                
                playlistItem.addEventListener('click', () => this.selectSong(index));
                playlistContainer.appendChild(playlistItem);
            });
        }
    }
    // ========================================================================
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player after a short delay to ensure all elements are loaded
    setTimeout(() => {
        if (document.getElementById('audio-player')) {
            new MusicPlayer();
        }
    }, 500);

    // Initialize RSVP form functionality
    initializeRSVPForm();
});

// RSVP Form Functionality
function initializeRSVPForm() {
    const showFormBtn = document.getElementById('show-rsvp-form');
    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.getElementById('rsvp-close');
    const cancelBtn = document.getElementById('cancel-rsvp');
    const form = document.getElementById('rsvp-form');
    const attendanceSelect = document.getElementById('attendance');
    const guestCountGroup = document.getElementById('guest-count-group');

    // Show modal when button is clicked
    showFormBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        form.reset(); // Reset form
        guestCountGroup.classList.remove('hidden'); // Show guest count by default
    }

    // Close modal when X button is clicked
    closeBtn.addEventListener('click', closeModal);

    // Close modal when cancel button is clicked
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Handle attendance selection change
    attendanceSelect.addEventListener('change', function() {
        if (this.value === 'no') {
            guestCountGroup.classList.add('hidden');
        } else if (this.value === 'yes') {
            guestCountGroup.classList.remove('hidden');
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            showSuccessMessage(data);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function showSuccessMessage(data) {
        const modalContent = document.querySelector('.rsvp-modal-content');
        const attendanceText = data.attendance === 'yes' ? 'sẽ tham dự' : 'không thể tham dự';
        
        modalContent.innerHTML = `
            <div class="rsvp-modal-header">
                <h3>Cảm ơn bạn!</h3>
                <button class="rsvp-close" onclick="document.getElementById('rsvp-modal').style.display='none'; document.body.style.overflow='auto';">&times;</button>
            </div>
            <div class="rsvp-success">
                <h3>✨ Xác nhận thành công!</h3>
                <p><strong>${data['guest-name']}</strong> đã xác nhận <strong>${attendanceText}</strong> đám cưới của chúng mình.</p>
                ${data.attendance === 'yes' ? `<p>Số khách: <strong>${data['guest-count']} người</strong></p>` : ''}
                ${data.message ? `<p style="margin-top: 20px; font-style: italic;">"${data.message}"</p>` : ''}
                <p style="margin-top: 30px;">Chúng mình rất mong được gặp bạn trong ngày trọng đại này! 💕</p>
            </div>
        `;

        // Auto close after 5 seconds
        setTimeout(() => {
            closeModal();
            // Reset modal content for next use
            setTimeout(() => {
                location.reload(); // Simple way to reset the modal content
            }, 300);
        }, 5000);
    }
}

// ========================== GALLERY FUNCTIONALITY ==========================
// Dynamic Gallery Management
class GalleryManager {
    constructor() {
        this.gallery = WEDDING_GALLERY || [];
        this.config = GALLERY_CONFIG || { defaultShowCount: 8, showAllText: "Tất cả hình ảnh", showLessText: "Ẩn bớt" };
        this.isShowingAll = false;
        this.photoGrid = document.getElementById('photo-grid');
        this.toggleBtn = document.getElementById('gallery-toggle-btn');
        
        this.init();
    }
    
    init() {
        this.renderGallery();
        this.addEventListeners();
    }
    
    renderGallery() {
        if (!this.photoGrid) return;
        
        // Clear existing content
        this.photoGrid.innerHTML = '';
        
        // Determine how many images to show
        const imagesToShow = this.isShowingAll ? this.gallery.length : Math.min(this.config.defaultShowCount, this.gallery.length);
        
        // Create photo items
        for (let i = 0; i < imagesToShow; i++) {
            const photo = this.gallery[i];
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.loading = 'lazy'; // Add lazy loading for performance
            
            photoItem.appendChild(img);
            this.photoGrid.appendChild(photoItem);
        }
        
        // Update button text and visibility
        this.updateToggleButton();
    }
    
    updateToggleButton() {
        if (!this.toggleBtn) return;
        
        // Hide button if we have less than or equal to default show count
        if (this.gallery.length <= this.config.defaultShowCount) {
            this.toggleBtn.style.display = 'none';
            return;
        }
        
        // Update button text
        this.toggleBtn.textContent = this.isShowingAll ? this.config.showLessText : this.config.showAllText;
        this.toggleBtn.style.display = 'block';
    }
    
    toggleGallery() {
        this.isShowingAll = !this.isShowingAll;
        this.renderGallery();
        
        // Smooth scroll to gallery section if showing less
        if (!this.isShowingAll) {
            document.getElementById('gallery').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    addEventListeners() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleGallery());
        }
    }
}

// Initialize Gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Gallery Manager
    new GalleryManager();
});
