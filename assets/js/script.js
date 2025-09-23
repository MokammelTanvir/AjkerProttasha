// JavaScript for AjkerProttasha

document.addEventListener('DOMContentLoaded', function() {
    console.log('আজকের প্রত্যাশা - Ready!');
    
    // Handle Responsive Header Display
    handleResponsiveHeader();
    window.addEventListener('resize', handleResponsiveHeader);
    
    // Debug: Check if Load More elements exist
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const additionalNews = document.getElementById('additionalNews');
    
    console.log('Load More Button:', loadMoreBtn ? 'Found' : 'Not Found');
    console.log('Additional News Section:', additionalNews ? 'Found' : 'Not Found');
    
    if (loadMoreBtn) {
        console.log('Load More Button text:', loadMoreBtn.textContent.trim());
    }
});

// Handle Responsive Header Display
function handleResponsiveHeader() {
    const desktopHeader = document.getElementById('desktopHeader');
    const desktopNavbar = document.getElementById('desktopNavbar');
    const mobileNavbar = document.getElementById('mobileNavbar');
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 768) {
        // Desktop: Show header and desktop navbar, hide mobile navbar
        if (desktopHeader) {
            desktopHeader.style.display = 'block';
        }
        if (desktopNavbar) {
            desktopNavbar.style.display = 'flex';
        }
        if (mobileNavbar) {
            mobileNavbar.style.display = 'none';
        }
    } else {
        // Mobile: Hide header and desktop navbar, show mobile navbar
        if (desktopHeader) {
            desktopHeader.style.display = 'none';
        }
        if (desktopNavbar) {
            desktopNavbar.style.display = 'none';
        }
        if (mobileNavbar) {
            mobileNavbar.style.display = 'flex';
        }
    }
}

// Toggle Mobile Menu (old function - kept for compatibility)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// Toggle Side Mobile Menu
function toggleSideMobileMenu() {
    const sideMenu = document.getElementById('mobileSideMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const sliderArrows = document.querySelectorAll('.slider-nav-btn');
    
    if (sideMenu.classList.contains('-translate-x-full')) {
        // Open menu
        sideMenu.classList.remove('-translate-x-full');
        sideMenu.classList.add('translate-x-0');
        overlay.classList.remove('hidden');
        // Hide slider arrows when menu is open
        sliderArrows.forEach(arrow => {
            arrow.style.display = 'none';
        });
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    } else {
        // Close menu
        sideMenu.classList.remove('translate-x-0');
        sideMenu.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        // Show slider arrows when menu is closed
        sliderArrows.forEach(arrow => {
            arrow.style.display = 'flex';
        });
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Close Side Mobile Menu
function closeSideMobileMenu() {
    const sideMenu = document.getElementById('mobileSideMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const sliderArrows = document.querySelectorAll('.slider-nav-btn');
    
    sideMenu.classList.remove('translate-x-0');
    sideMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    // Show slider arrows when menu is closed
    sliderArrows.forEach(arrow => {
        arrow.style.display = 'flex';
    });
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Toggle Search Bar
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar.classList.contains('hidden')) {
        searchBar.classList.remove('hidden');
        // Focus on search input
        const searchInput = searchBar.querySelector('input');
        if (searchInput) {
            searchInput.focus();
        }
    } else {
        searchBar.classList.add('hidden');
    }
}

// Toggle Desktop Sliding Menu
function toggleDesktopMenu() {
    const desktopMenu = document.getElementById('desktopSlidingMenu');
    if (desktopMenu.classList.contains('hidden')) {
        desktopMenu.classList.remove('hidden');
        // Add smooth slide down animation
        desktopMenu.style.maxHeight = '0';
        desktopMenu.style.overflow = 'hidden';
        desktopMenu.style.transition = 'max-height 0.3s ease-out';
        
        // Trigger the animation
        setTimeout(() => {
            desktopMenu.style.maxHeight = '300px'; // Adjust height as needed
        }, 10);
    } else {
        // Add smooth slide up animation
        desktopMenu.style.maxHeight = '0';
        desktopMenu.style.transition = 'max-height 0.3s ease-in';
        
        // Hide after animation
        setTimeout(() => {
            desktopMenu.classList.add('hidden');
            desktopMenu.style.maxHeight = '';
            desktopMenu.style.transition = '';
        }, 300);
    }
}

// Close mobile menu when clicking outside (updated for side menu)
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const sideMenu = document.getElementById('mobileSideMenu');
    const desktopMenu = document.getElementById('desktopSlidingMenu');
    const mobileMenuButton = event.target.closest('button[onclick="toggleMobileMenu()"]');
    const sideMenuButton = event.target.closest('button[onclick="toggleSideMobileMenu()"]');
    const desktopMenuButton = event.target.closest('button[onclick="toggleDesktopMenu()"]');
    
    // Handle old mobile menu if exists
    if (mobileMenu && !mobileMenuButton && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
    
    // Handle side mobile menu
    if (sideMenu && !sideMenuButton && !sideMenu.contains(event.target) && !sideMenu.classList.contains('-translate-x-full')) {
        // Only close if clicking outside and menu is open
        const overlay = document.getElementById('mobileMenuOverlay');
        if (event.target === overlay) {
            closeSideMobileMenu();
        }
    }
    
    // Handle desktop sliding menu
    if (desktopMenu && !desktopMenuButton && !desktopMenu.contains(event.target) && !desktopMenu.classList.contains('hidden')) {
        // Close desktop menu when clicking outside
        desktopMenu.classList.add('hidden');
        desktopMenu.style.maxHeight = '';
        desktopMenu.style.transition = '';
    }
});

// Close search bar when clicking outside
document.addEventListener('click', function(event) {
    const searchBar = document.getElementById('searchBar');
    const searchButton = event.target.closest('button[onclick="toggleSearch()"]');
    
    if (!searchButton && !searchBar.contains(event.target)) {
        searchBar.classList.add('hidden');
    }
});

// Handle search form submission
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        const searchForm = searchBar.querySelector('button');
        const searchInput = searchBar.querySelector('input');
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('click', function(e) {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    // Here you can add your search functionality
                    console.log('Searching for:', searchTerm);
                    // For now, just show an alert
                    alert('অনুসন্ধান: ' + searchTerm);
                }
            });
            
            // Handle Enter key in search input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        console.log('Searching for:', searchTerm);
                        alert('অনুসন্ধান: ' + searchTerm);
                    }
                }
            });
        }
    }
});

// Video Slider Functionality
let currentSlide = 0;
const slider = document.getElementById('videoSlider');
const totalCards = document.querySelectorAll('#videoSlider > div').length;

// Dynamic card width and cards per view based on screen size
function getSliderSettings() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
        // Mobile: full width minus arrow space (70px each side)
        return { cardWidth: screenWidth - 140, cardsPerView: 1 };
    } else if (screenWidth <= 768) {
        return { cardWidth: 300, cardsPerView: Math.floor(screenWidth / 320) };
    } else {
        return { cardWidth: 320, cardsPerView: Math.floor(screenWidth / 340) };
    }
}

let { cardWidth, cardsPerView } = getSliderSettings();

function updateSlider() {
    const settings = getSliderSettings();
    cardWidth = settings.cardWidth;
    cardsPerView = settings.cardsPerView;
    
    const translateX = -currentSlide * cardWidth;
    if (slider) {
        slider.style.transform = `translateX(${translateX}px)`;
        console.log(`Slider updated: currentSlide=${currentSlide}, cardWidth=${cardWidth}, cardsPerView=${cardsPerView}, translateX=${translateX}px`);
    }
}

function nextSlide() {
    const maxSlide = totalCards - cardsPerView;
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateSlider();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
}

// Event listeners for slider buttons
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Handle window resize
window.addEventListener('resize', function() {
    const settings = getSliderSettings();
    cardsPerView = settings.cardsPerView;
    cardWidth = settings.cardWidth;
    
    const maxSlide = Math.max(0, totalCards - cardsPerView);
    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
    updateSlider();
});

// Auto-play slider (optional)
let autoPlayInterval = setInterval(function() {
    const maxSlide = totalCards - cardsPerView;
    if (currentSlide >= maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSlider();
}, 5000); // Change slide every 5 seconds

// Pause auto-play on hover
const sliderContainer = document.querySelector('.relative');
sliderContainer.addEventListener('mouseenter', function() {
    clearInterval(autoPlayInterval);
});

sliderContainer.addEventListener('mouseleave', function() {
    autoPlayInterval = setInterval(function() {
        const maxSlide = totalCards - cardsPerView;
        if (currentSlide >= maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateSlider();
    }, 5000);
});

// Touch/Swipe functionality for mobile
let startX = 0;
let isDragging = false;

slider.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slider.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
});

slider.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    updateSlider();
});

// Hero News Hover Functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card');
    const heroNewsTitle = document.getElementById('heroNewsTitle');
    const heroNewsDescription = document.getElementById('heroNewsDescription');
    const heroNewsImage = document.getElementById('heroNewsImage');
    
    // Get the active card (first card by default)
    let activeCard = document.querySelector('.news-card.active-card');
    
    // Store original hero content (from active card)
    const originalTitle = activeCard ? activeCard.getAttribute('data-title') : heroNewsTitle.textContent;
    const originalDescription = activeCard ? activeCard.getAttribute('data-description') : heroNewsDescription.textContent;
    const originalImage = activeCard ? activeCard.getAttribute('data-image') : heroNewsImage.src;

    newsCards.forEach(function(card) {
        const newsTitle = card.querySelector('.news-title');
        
        card.addEventListener('mouseenter', function() {
            // Remove active state from all cards
            newsCards.forEach(function(otherCard) {
                const otherTitle = otherCard.querySelector('.news-title');
                if (otherCard !== this && !otherCard.classList.contains('active-card')) {
                    otherCard.style.borderTopColor = '#6b7280'; // gray-500
                    if (otherTitle) {
                        otherTitle.style.color = '#374151'; // gray-800
                    }
                }
            });

            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const image = this.getAttribute('data-image');

            // Change hero content
            if (title && description && image) {
                heroNewsTitle.textContent = title;
                heroNewsDescription.textContent = description;
                heroNewsImage.src = image;
                heroNewsImage.alt = title;
            }

            // Make news title red on hover and border red
            if (newsTitle) {
                newsTitle.style.color = '#dc2626'; // red-600
            }
            this.style.borderTopColor = '#dc2626'; // red-600
        });

        card.addEventListener('mouseleave', function() {
            // Only reset if this is not the active card
            if (!this.classList.contains('active-card')) {
                // Reset hero content to original (active card content)
                heroNewsTitle.textContent = originalTitle;
                heroNewsDescription.textContent = originalDescription;
                heroNewsImage.src = originalImage;
                heroNewsImage.alt = "Main News";

                // Reset news title color and border
                if (newsTitle) {
                    newsTitle.style.color = '#374151'; // gray-800
                }
                this.style.borderTopColor = '#6b7280'; // gray-500
            }
        });

        // Add click functionality to navigate to full article
        card.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            console.log('Clicked on news:', title);
            alert('সংবাদ দেখুন: ' + title);
        });
    });
});

// News Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const latestTab = document.getElementById('latestTab');
    const popularTab = document.getElementById('popularTab');
    const latestContent = document.getElementById('latestContent');
    const popularContent = document.getElementById('popularContent');
    const viewAllText = document.getElementById('viewAllText');

    // Tab switching function
    function switchTab(activeTab, inactiveTab, activeContent, inactiveContent, buttonText) {
        // Update tab styles
        activeTab.classList.remove('bg-gray-300', 'text-gray-700');
        activeTab.classList.add('bg-blue-600', 'text-white');
        
        inactiveTab.classList.remove('bg-blue-600', 'text-white');
        inactiveTab.classList.add('bg-gray-300', 'text-gray-700');
        
        // Show/hide content
        activeContent.classList.remove('hidden');
        inactiveContent.classList.add('hidden');
        
        // Update button text
        viewAllText.textContent = buttonText;
    }

    // Latest tab click handler
    latestTab.addEventListener('click', function() {
        switchTab(latestTab, popularTab, latestContent, popularContent, 'সর্বশেষ সব খবর');
    });

    // Popular tab click handler
    popularTab.addEventListener('click', function() {
        switchTab(popularTab, latestTab, popularContent, latestContent, 'জনপ্রিয় সব খবর');
    });

    // Poll option selection functionality
    const pollOptions = document.querySelectorAll('.poll-option');
    
    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected state from all options
            pollOptions.forEach(opt => {
                const inner = opt.querySelector('.poll-inner');
                inner.classList.remove('w-3', 'h-3');
                inner.classList.add('w-0', 'h-0');
            });
            
            // Add selected state to clicked option
            const inner = this.querySelector('.poll-inner');
            inner.classList.remove('w-0', 'h-0');
            inner.classList.add('w-3', 'h-3');
            
            // Update hidden radio input
            const input = this.querySelector('.poll-input');
            input.checked = true;
        });
    });
});

// YouTube Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.youtube-video-card');
    const mainVideoTitle = document.getElementById('mainVideoTitle');
    const mainVideoDescription = document.getElementById('mainVideoDescription');
    const mainThumbnail = document.getElementById('mainThumbnail');
    const defaultThumbnail = document.getElementById('defaultThumbnail');
    const youtubeEmbed = document.getElementById('youtubeEmbed');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const mainPlayButton = document.getElementById('mainPlayButton');
    
    // Store current video data
    let currentVideoData = {
        videoId: 'dQw4w9WgXcQ',
        title: 'আন্তর্জাতিক আদালতের রায়ে পাকিস্তানের জয়, কাঁদছে ভারত',
        description: 'হেভলাই শো করবে মেট্রিভিকেশান শো করবে। হেভলাই শো করবে মেট্রিভিকেশান শো করবে হেভলাই শো করবে মেট্রিভিকেশান শো করবে।',
        thumbnail: 'assets/img/thubnail.jpg'
    };

    // Function to load YouTube video
    function loadYouTubeVideo(videoId, autoplay = false) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&showinfo=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
        youtubePlayer.src = embedUrl;
        
        // Show embed, hide thumbnail
        defaultThumbnail.classList.add('hidden');
        youtubeEmbed.classList.remove('hidden');
    }

    // Function to show thumbnail
    function showThumbnail(thumbnail, title, description) {
        // Hide embed, show thumbnail
        youtubeEmbed.classList.add('hidden');
        defaultThumbnail.classList.remove('hidden');
        
        // Update thumbnail and info
        mainThumbnail.src = thumbnail;
        mainThumbnail.alt = title;
        mainVideoTitle.textContent = title;
        mainVideoDescription.textContent = description;
    }

    // Main play button click handler
    mainPlayButton.addEventListener('click', function() {
        loadYouTubeVideo(currentVideoData.videoId, true);
    });

    // Video card click handlers
    videoCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const thumbnail = this.getAttribute('data-thumbnail');
            
            if (videoId && title && description && thumbnail) {
                // Update current video data
                currentVideoData = {
                    videoId: videoId,
                    title: title,
                    description: description,
                    thumbnail: thumbnail
                };
                
                // Remove active state from all cards
                videoCards.forEach(function(otherCard) {
                    otherCard.classList.remove('ring-2', 'ring-red-500');
                });
                
                // Add active state to clicked card
                this.classList.add('ring-2', 'ring-red-500');
                
                // Load the video immediately
                loadYouTubeVideo(videoId, true);
                
                // Update title and description
                mainVideoTitle.textContent = title;
                mainVideoDescription.textContent = description;
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('ring-2')) {
                this.classList.add('ring-1', 'ring-red-400');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('ring-2')) {
                this.classList.remove('ring-1', 'ring-red-400');
            }
        });
    });

    // Function to stop video when needed
    function stopVideo() {
        youtubePlayer.src = '';
        youtubeEmbed.classList.add('hidden');
        defaultThumbnail.classList.remove('hidden');
    }

    // Optional: Stop video when clicking outside
    document.addEventListener('click', function(event) {
        const mainVideoPlayer = document.getElementById('mainVideoPlayer');
        const isClickInsidePlayer = mainVideoPlayer.contains(event.target);
        const isClickOnVideoCard = event.target.closest('.youtube-video-card');
        
        // Don't stop video if clicking on player or video cards
        if (!isClickInsidePlayer && !isClickOnVideoCard) {
            // Uncomment the line below if you want to stop video when clicking outside
            // stopVideo();
        }
    });
});

// Load More Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const additionalNews = document.getElementById('additionalNews');
    
    if (loadMoreBtn && additionalNews) {
        console.log('Setting up Load More functionality...');
        
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Load More button clicked!');
            
            // Show the hidden additional news
            additionalNews.classList.remove('hidden');
            additionalNews.classList.add('block');
            additionalNews.style.display = 'block';
            
            // Hide the load more button
            loadMoreBtn.style.display = 'none';
            
            // Optional: Add smooth scroll to new content
            setTimeout(() => {
                additionalNews.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
            
            console.log('Additional news loaded and displayed');
        });
        
        console.log('Load More functionality initialized successfully');
    } else {
        console.log('Load More button or additional news section not found');
        
        // Fallback: Try to find any Load More button
        const allLoadMoreBtns = document.querySelectorAll('button[id*="loadMore"], button[class*="load-more"], button:contains("আরও পড়ুন"), button:contains("আরো পড়ুন")');
        console.log('Found alternative load more buttons:', allLoadMoreBtns.length);
        
        allLoadMoreBtns.forEach((btn, index) => {
            console.log(`Button ${index + 1}:`, btn.textContent.trim());
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Alternative Load More button clicked!');
                
                // Try to find hidden content near this button
                const hiddenContent = btn.parentElement.parentElement.querySelector('[class*="hidden"]') ||
                                    btn.parentElement.nextElementSibling ||
                                    document.querySelector('#additionalNews, #additionalContent, [id*="additional"]');
                
                if (hiddenContent) {
                    hiddenContent.classList.remove('hidden');
                    hiddenContent.style.display = 'block';
                    btn.style.display = 'none';
                    console.log('Alternative content loaded');
                } else {
                    console.log('No hidden content found for this button');
                    alert('আরও কন্টেন্ট লোড করা হচ্ছে...');
                }
            });
        });
    }
});

// General Load More functionality for any page
function loadMoreContent() {
    console.log('loadMoreContent function called');
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const additionalContent = document.getElementById('additionalNews') || 
                             document.getElementById('additionalContent') ||
                             document.querySelector('[id*="additional"]');
    
    if (additionalContent) {
        console.log('Found additional content, showing it...');
        
        // Show the hidden additional content
        additionalContent.classList.remove('hidden');
        additionalContent.style.display = 'block';
        
        // Hide the load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Smooth scroll to new content
        setTimeout(() => {
            additionalContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 200);
        
        console.log('Content loaded successfully');
        return true;
    } else {
        console.log('No additional content found to load');
        alert('আরও কন্টেন্ট খুঁজে পাওয়া যায়নি।');
        return false;
    }
}

// Additional onclick handler for buttons
window.handleLoadMore = function() {
    console.log('handleLoadMore called');
    return loadMoreContent();
};

// Test function to check if everything is working
window.testLoadMore = function() {
    console.log('=== Load More Test ===');
    console.log('loadMoreBtn element:', document.getElementById('loadMoreBtn'));
    console.log('additionalNews element:', document.getElementById('additionalNews'));
    console.log('loadMoreContent function:', typeof loadMoreContent);
    console.log('=== End Test ===');
};

// Call test on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.testLoadMore();
    }, 1000);
});
