const canvas = document.getElementById('portalCanvas');
const ctx = canvas.getContext('2d');

let angle = 0;
let personX = -50; // Starting X position (outside the portal)
let personY = canvas.height / 2 - 25; // Centered on Y-axis
let portalRadius = 200; // Portal radius
let speed = 5; // Speed of the teleportation
let enteringPortal = false; // Whether the person is entering the portal
let portalCenterX = canvas.width / 2;
let portalCenterY = canvas.height / 2;

let portalOpen = false;

// Function to draw the portal
function drawPortal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a radial gradient for the portal
    let gradient = ctx.createRadialGradient(portalCenterX, portalCenterY, 0, portalCenterX, portalCenterY, portalRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    
    // Draw the portal
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(portalCenterX, portalCenterY, portalRadius, 0, Math.PI * 2);
    ctx.fill();

    // Simulate portal opening and closing effect
    if (portalOpen) {
        portalRadius += 2;
        if (portalRadius > 220) {
            portalOpen = false;
        }
    } else {
        portalRadius -= 2;
        if (portalRadius < 180) {
            portalOpen = true;
        }
    }
}

// Function to draw the person
function drawPerson() {
    ctx.fillStyle = 'white';
    ctx.fillRect(personX, personY, 50, 50); // Simple square as a person representation

    if (enteringPortal) {
        // Move the person toward the portal
        personX += speed;
        if (personX > portalCenterX - 50 && personX < portalCenterX + 50) {
            // After entering portal, move them out quickly on the other side
            setTimeout(() => {
                personX = canvas.width + 50; // Position outside the right side
                enteringPortal = false;
            }, 1000); // 1 second delay to simulate the "teleportation"
        }
    } else if (personX > canvas.width) {
        personX = -50; // Reset person position to the left side
    }
}

// Animation loop
function animate() {
    drawPortal();
    drawPerson();

    // Start entering the portal
    if (!enteringPortal && personX < 0) {
        enteringPortal = true;
    }

    requestAnimationFrame(animate);
}

// Start the animation
animate();
