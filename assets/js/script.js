// JavaScript for AjkerProttasha

document.addEventListener('DOMContentLoaded', function() {
    console.log('আজকের প্রত্যাশা - Ready!');
});

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
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

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuButton = event.target.closest('button[onclick="toggleMobileMenu()"]');
    
    if (!mobileMenuButton && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
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
const cardWidth = 320; // 320px (w-80 + margin)
let cardsPerView = Math.floor(window.innerWidth / cardWidth);

function updateSlider() {
    const translateX = -currentSlide * cardWidth;
    slider.style.transform = `translateX(${translateX}px)`;
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
    cardsPerView = Math.floor(window.innerWidth / cardWidth);
    const maxSlide = totalCards - cardsPerView;
    if (currentSlide > maxSlide) {
        currentSlide = Math.max(0, maxSlide);
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
