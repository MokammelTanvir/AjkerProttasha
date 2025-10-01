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
    
    console.log('Screen width:', screenWidth); // Debug log
    
    if (screenWidth >= 768) {
        // Desktop: Show full header and navbar
        if (desktopHeader) {
            desktopHeader.style.display = 'block';
            desktopHeader.style.visibility = 'visible';
            desktopHeader.style.opacity = '1';
        }
        if (desktopNavbar) {
            desktopNavbar.style.display = 'flex';
            desktopNavbar.style.visibility = 'visible';
            desktopNavbar.style.opacity = '1';
        }
        if (mobileNavbar) {
            mobileNavbar.style.display = 'none';
        }
        console.log('Desktop mode: Full header + navbar visible');
    } else {
        // Mobile: Hide everything except mobile navbar
        if (desktopHeader) {
            desktopHeader.style.display = 'none';
            desktopHeader.style.visibility = 'hidden';
            desktopHeader.style.opacity = '0';
        }
        if (desktopNavbar) {
            desktopNavbar.style.display = 'none';
            desktopNavbar.style.visibility = 'hidden';
            desktopNavbar.style.opacity = '0';
        }
        if (mobileNavbar) {
            mobileNavbar.style.display = 'flex';
            mobileNavbar.style.visibility = 'visible';
            mobileNavbar.style.opacity = '1';
        }
        console.log('Mobile mode: Only blue navbar visible (home + logo + hamburger)');
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
    const container = document.querySelector('.container.mx-auto');
    const containerWidth = container ? container.offsetWidth : screenWidth - 32; // Account for padding
    
    if (screenWidth <= 480) {
        // Mobile: exactly one full card width minus arrow space (60px each side)
        return { cardWidth: screenWidth - 120, cardsPerView: 1 };
    } else if (screenWidth <= 768) {
        // Tablet: 2-3 cards per row
        const cardWidth = Math.floor((containerWidth - 48) / 2); // 2 cards with 16px gap each
        return { cardWidth: cardWidth, cardsPerView: 2 };
    } else if (screenWidth <= 1024) {
        // Small desktop: 3 cards per row
        const cardWidth = Math.floor((containerWidth - 64) / 3); // 3 cards with 16px gap each
        return { cardWidth: cardWidth, cardsPerView: 3 };
    } else {
        // Large desktop: 4 cards per row
        const cardWidth = Math.floor((containerWidth - 80) / 4); // 4 cards with 16px gap each
        return { cardWidth: cardWidth, cardsPerView: 4 };
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

// News Tab Functionality - Updated for Custom Color #070788 with Scrollable Support
document.addEventListener('DOMContentLoaded', function() {
    const latestTab = document.getElementById('latestTab');
    const popularTab = document.getElementById('popularTab');
    const latestContent = document.getElementById('latestContent');
    const popularContent = document.getElementById('popularContent');
    const viewAllText = document.getElementById('viewAllText');

    // Set initial active state
    function setActiveTab(activeBtn, inactiveBtn, activeContent, inactiveContent, tabName) {
        // Active tab: #070788 background, white text
        activeBtn.style.backgroundColor = '#070788';
        activeBtn.style.color = 'white';
        activeBtn.classList.remove('bg-white', 'hover:bg-gray-100', 'text-black');
        
        // Inactive tab: white background, black text
        inactiveBtn.style.backgroundColor = 'white';
        inactiveBtn.style.color = 'black';
        inactiveBtn.classList.add('bg-white', 'hover:bg-gray-100', 'text-black');
        
        // Show/hide content with smooth transition
        activeContent.classList.remove('hidden');
        inactiveContent.classList.add('hidden');
        
        // Update view all text based on active tab
        if (viewAllText) {
            viewAllText.textContent = tabName === 'latest' ? 'সর্বশেষ সব খবর' : 'সর্বাধিক পঠিত সব খবর';
        }
        
        // Reset scroll position to top when switching tabs
        const scrollContainer = activeContent.querySelector('.tab-scroll-container');
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
        
        // Add smooth scroll behavior to the active container
        if (scrollContainer) {
            scrollContainer.style.scrollBehavior = 'smooth';
        }
    }

    // Initialize scroll behavior for both containers
    function initializeScrollBehavior() {
        const scrollContainers = document.querySelectorAll('.tab-scroll-container');
        scrollContainers.forEach(container => {
            // Add smooth scrolling
            container.style.scrollBehavior = 'smooth';
            
            // Add scroll event listener for better UX
            container.addEventListener('scroll', function() {
                // Add subtle shadow when scrolled
                if (this.scrollTop > 0) {
                    this.style.boxShadow = 'inset 0 10px 10px -10px rgba(0,0,0,0.1)';
                } else {
                    this.style.boxShadow = 'none';
                }
            });
            
            // Add keyboard navigation support
            container.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.scrollTop += 60; // Scroll by approximately one news item height
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.scrollTop -= 60;
                } else if (e.key === 'PageDown') {
                    e.preventDefault();
                    this.scrollTop += this.clientHeight - 60;
                } else if (e.key === 'PageUp') {
                    e.preventDefault();
                    this.scrollTop -= this.clientHeight - 60;
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    this.scrollTop = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    this.scrollTop = this.scrollHeight;
                }
            });
        });
    }

    // Check if tab elements exist before adding event listeners
    if (latestTab && popularTab && latestContent && popularContent) {
        console.log('Tab functionality initialized with custom color #070788 and scrollable support');
        
        // Initialize scroll behavior
        initializeScrollBehavior();
        
        // Latest tab click handler
        latestTab.addEventListener('click', function() {
            console.log('Latest tab clicked - 15 news items available');
            setActiveTab(latestTab, popularTab, latestContent, popularContent, 'latest');
        });

        // Popular tab click handler
        popularTab.addEventListener('click', function() {
            console.log('Popular tab clicked - 15 news items available');
            setActiveTab(popularTab, latestTab, popularContent, latestContent, 'popular');
        });
        
        // Set initial state
        setActiveTab(latestTab, popularTab, latestContent, popularContent, 'latest');
        
    } else {
        console.log('Tab elements not found:', {
            latestTab: !!latestTab,
            popularTab: !!popularTab,
            latestContent: !!latestContent,
            popularContent: !!popularContent
        });
    }

    // Poll option selection functionality with custom color
    const pollOptions = document.querySelectorAll('.poll-option');
    
    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected state from all options
            pollOptions.forEach(opt => {
                const inner = opt.querySelector('.poll-inner');
                if (inner) {
                    inner.classList.remove('w-3', 'h-3');
                    inner.classList.add('w-0', 'h-0');
                    inner.style.backgroundColor = '#070788'; // Use custom color
                }
            });
            
            // Add selected state to clicked option
            const inner = this.querySelector('.poll-inner');
            if (inner) {
                inner.classList.remove('w-0', 'h-0');
                inner.classList.add('w-3', 'h-3');
                inner.style.backgroundColor = '#070788'; // Use custom color
            }
            
            // Update hidden radio input
            const input = this.querySelector('.poll-input');
            if (input) {
                input.checked = true;
            }
            
            console.log('Poll option selected with custom color');
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

// Video Modal Functionality
let currentModalVideoId = null;

// Function to open video modal
function openVideoModal(videoId, title, description) {
    const modal = document.getElementById('videoModal');
    const modalPlayer = document.getElementById('modalVideoPlayer');
    const modalTitle = document.getElementById('modalVideoTitle');
    const modalDescription = document.getElementById('modalVideoDescription');
    
    if (modal && modalPlayer) {
        // Set video details
        currentModalVideoId = videoId;
        modalTitle.textContent = title || 'ভিডিও শিরোনাম';
        modalDescription.textContent = description || 'ভিডিও বিবরণ';
        
        // Set up YouTube embed URL with autoplay
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1`;
        modalPlayer.src = embedUrl;
        
        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleModalEscape);
        
        console.log('Video modal opened:', videoId, title);
    }
}

// Function to close video modal
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalPlayer = document.getElementById('modalVideoPlayer');
    
    if (modal) {
        // Hide modal
        modal.classList.remove('active');
        modal.classList.add('hidden');
        
        // Stop video by clearing src
        if (modalPlayer) {
            modalPlayer.src = '';
        }
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleModalEscape);
        
        currentModalVideoId = null;
        console.log('Video modal closed');
    }
}

// Handle escape key to close modal
function handleModalEscape(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
}

// Add event listeners to video slider play buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to all play buttons in the video slider
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get video data from the parent card
            const videoCard = this.closest('.video-card-wrapper');
            if (videoCard) {
                const titleElement = videoCard.querySelector('.video-title');
                const title = titleElement ? titleElement.textContent.trim() : 'ভিডিও শিরোনাম';
                
                // For now, using sample video IDs. In real implementation, you'd get these from data attributes
                const sampleVideoIds = ['dQw4w9WgXcQ', '9bZkp7q19f0', 'kJQP7kiw5Fk', 'L_jWHffIx5E', 'fJ9rUzIMcZQ', 'Zi_XLOBDo_Y'];
                const videoIndex = Array.from(document.querySelectorAll('.video-card-wrapper')).indexOf(videoCard);
                const videoId = sampleVideoIds[videoIndex % sampleVideoIds.length];
                
                const description = `${title} - বিস্তারিত বিবরণ এখানে থাকবে। এটি একটি নমুনা বিবরণ যা প্রকৃত ভিডিওর জন্য আপডেট করা হবে।`;
                
                openVideoModal(videoId, title, description);
            }
        });
    });
    
    // Add click event to modal overlay to close modal
    const modalOverlay = document.querySelector('.video-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeVideoModal);
    }
});

// Binodon Section Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const binodonSlider = document.querySelector('.binodon-slider');
    const binodonPrevBtn = document.getElementById('binodonPrevBtn');
    const binodonNextBtn = document.getElementById('binodonNextBtn');
    const binodonSlides = document.querySelectorAll('.binodon-slide');
    
    if (binodonSlider && binodonPrevBtn && binodonNextBtn && binodonSlides.length > 0) {
        let currentSlide = 0;
        let currentMobileCard = 0;
        let isMobile = window.innerWidth <= 768;
        
        // Get all cards for mobile navigation
        function getAllCards() {
            const allCards = [];
            binodonSlides.forEach(slide => {
                const cards = slide.querySelectorAll('.bg-white');
                cards.forEach(card => allCards.push(card));
            });
            return allCards;
        }
        
        // Initialize slider
        updateSliderPosition();
        
        // Previous button click
        binodonPrevBtn.addEventListener('click', function() {
            if (isMobile) {
                const allCards = getAllCards();
                currentMobileCard = currentMobileCard === 0 ? allCards.length - 1 : currentMobileCard - 1;
            } else {
                currentSlide = currentSlide === 0 ? binodonSlides.length - 1 : currentSlide - 1;
            }
            updateSliderPosition();
        });
        
        // Next button click
        binodonNextBtn.addEventListener('click', function() {
            if (isMobile) {
                const allCards = getAllCards();
                currentMobileCard = currentMobileCard === allCards.length - 1 ? 0 : currentMobileCard + 1;
            } else {
                currentSlide = currentSlide === binodonSlides.length - 1 ? 0 : currentSlide + 1;
            }
            updateSliderPosition();
        });
        
        // Update slider position
        function updateSliderPosition() {
            if (isMobile) {
                // Mobile: Show one card at a time
                const allCards = getAllCards();
                
                // Hide all slides first
                binodonSlides.forEach(slide => {
                    slide.style.display = 'none';
                });
                
                // Show only the slide containing current card
                allCards.forEach((card, index) => {
                    const parentSlide = card.closest('.binodon-slide');
                    const cards = parentSlide.querySelectorAll('.bg-white');
                    
                    if (index === currentMobileCard) {
                        parentSlide.style.display = 'block';
                        cards.forEach(c => c.style.display = 'none');
                        card.style.display = 'block';
                    }
                });
                
                binodonSlider.style.transform = 'translateX(0%)';
            } else {
                // Desktop: original behavior - show slides with 6 cards each
                binodonSlides.forEach((slide, index) => {
                    if (index === currentSlide) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                    
                    // Show all cards in each slide for desktop
                    const cards = slide.querySelectorAll('.bg-white');
                    cards.forEach(card => {
                        card.style.display = 'block';
                    });
                });
                
                const translateX = -currentSlide * 100;
                binodonSlider.style.transform = `translateX(${translateX}%)`;
            }
        }
        
        // Handle responsive behavior
        function handleBinodonResponsive() {
            const screenWidth = window.innerWidth;
            isMobile = screenWidth <= 768;
            
            // Reset counters when switching between mobile/desktop
            currentSlide = 0;
            currentMobileCard = 0;
            
            // Always show navigation buttons
            binodonPrevBtn.style.display = 'block';
            binodonNextBtn.style.display = 'block';
            
            updateSliderPosition();
        }
        
        // Initialize responsive behavior
        handleBinodonResponsive();
        
        // Listen for window resize
        window.addEventListener('resize', handleBinodonResponsive);
        
        const allCards = getAllCards();
        console.log('Binodon slider initialized - Desktop slides:', binodonSlides.length, 'Mobile cards:', allCards.length);
    } else {
        console.log('Binodon slider elements not found');
    }
});

// Global function to make it accessible from HTML onclick
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
