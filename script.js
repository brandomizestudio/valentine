// Get all sections
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const tryAgainSection = document.getElementById('tryAgainSection');

// Get buttons
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const retryBtn = document.getElementById('retryBtn');

// Function to hide all sections
function hideAllSections() {
    questionSection.style.display = 'none';
    successSection.style.display = 'none';
    tryAgainSection.style.display = 'none';
}

// Function to show a specific section with animation
function showSection(section) {
    section.style.display = 'block';
    section.style.animation = 'fadeIn 0.5s ease-in';
}

// Yes button click handler
yesBtn.addEventListener('click', () => {
    hideAllSections();
    showSection(successSection);
    
    // Add confetti effect
    createConfetti();
});

// No button click handler
noBtn.addEventListener('click', () => {
    hideAllSections();
    showSection(tryAgainSection);
});

// Retry button click handler
retryBtn.addEventListener('click', () => {
    hideAllSections();
    showSection(questionSection);
});

// Create confetti effect when "Yes" is clicked
function createConfetti() {
    const colors = ['#ff1744', '#ff5252', '#ff80ab', '#ff4081', '#f50057'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = '1';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const animation = confetti.animate([
                {
                    transform: `translateY(0) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }, i * 30);
    }
}

// Add hover effect to "No" button - make it move away!
noBtn.addEventListener('mouseenter', (e) => {
    const button = e.target;
    const container = button.parentElement.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate random position within container
    const maxX = containerRect.width - buttonRect.width - 100;
    const maxY = containerRect.height - buttonRect.height - 100;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.transition = 'all 0.3s ease';
});

// Make "Yes" button grow when hovering over "No" button
noBtn.addEventListener('mouseenter', () => {
    yesBtn.style.transform = 'scale(1.2)';
    yesBtn.style.transition = 'all 0.3s ease';
});

noBtn.addEventListener('mouseleave', () => {
    yesBtn.style.transform = 'scale(1)';
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (questionSection.style.display !== 'none') {
        if (e.key === 'Enter' || e.key === 'y' || e.key === 'Y') {
            yesBtn.click();
        }
    }
    
    if (tryAgainSection.style.display !== 'none') {
        if (e.key === 'Enter') {
            retryBtn.click();
        }
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // If swiping right on the question section, trigger yes
    if (questionSection.style.display !== 'none' && deltaX > 100 && Math.abs(deltaY) < 50) {
        yesBtn.click();
    }
});
