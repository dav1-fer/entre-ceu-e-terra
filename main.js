// let newX = 0, newY = 0, startX = 0, startY = 0;
// let dashOffset = 0;
// let showConnections = true; // Toggle variable for showing connections

// const main = document.querySelector('main');
// const cards = document.querySelectorAll(".image-card");
// const canvas = document.getElementById("web-canvas");
// const ctx = canvas.getContext("2d");
// const showWebBtn = document.querySelector(".show-web"); // Select the button to toggle lines

// // Set the canvas dimensions
// canvas.width = main.clientWidth;
// canvas.height = main.clientHeight;

// // Event listener for toggling connection lines
// showWebBtn.addEventListener('click', () => {
//     showConnections = !showConnections;
//     drawConnections(); // Redraw connections based on the new toggle state
// });

// // Function to draw (or hide) the connections based on the showConnections toggle
// function drawConnections() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
//     if (!showConnections) return; // Exit if connections are toggled off

//     ctx.strokeStyle = "#af9d14";
//     ctx.setLineDash([8, 8]); // Dashed lines
//     ctx.lineWidth = 1.5;
//     ctx.lineDashOffset = dashOffset; // Set the dash offset for animation

//     const mainRect = main.getBoundingClientRect();

//     // Draw lines between each pair of images
//     for (let i = 0; i < cards.length; i++) {
//         for (let j = i + 1; j < cards.length; j++) {
//             const rectA = cards[i].getBoundingClientRect();
//             const rectB = cards[j].getBoundingClientRect();

//             const centerAx = rectA.left + rectA.width / 2 - mainRect.left;
//             const centerAy = rectA.top + rectA.height / 2 - mainRect.top;
//             const centerBx = rectB.left + rectB.width / 2 - mainRect.left;
//             const centerBy = rectB.top + rectB.height / 2 - mainRect.top;

//             ctx.beginPath();
//             ctx.moveTo(centerAx, centerAy);
//             ctx.lineTo(centerBx, centerBy);
//             ctx.stroke();
//         }
//     }
// }

// // Function to animate the dash offset in a loop
// function animateLines() {
//     dashOffset -= 0.3; // Increase the offset to animate in a linear loop
//     drawConnections();
//     requestAnimationFrame(animateLines); // Continue animation loop
// }

// // Initialize dragging functionality for each image card
// cards.forEach(card => {
//     card.addEventListener('mousedown', mouseDown);

//     function mouseDown(e) {
//         e.preventDefault();

//         startX = e.clientX;
//         startY = e.clientY;

//         document.addEventListener('mousemove', mouseMove);
//         document.addEventListener('mouseup', mouseUp);
//     }

//     function mouseMove(e) {
//         newX = e.clientX - startX;
//         newY = e.clientY - startY;

//         startX = e.clientX;
//         startY = e.clientY;

//         const mainRect = main.getBoundingClientRect();
//         const cardRect = card.getBoundingClientRect();

//         let newTop = card.offsetTop + newY;
//         let newLeft = card.offsetLeft + newX;

//         if (newTop < 0) newTop = 0;
//         if (newTop + cardRect.height > mainRect.height) newTop = mainRect.height - cardRect.height;
//         if (newLeft < 0) newLeft = 0;
//         if (newLeft + cardRect.width > mainRect.width) newLeft = mainRect.width - cardRect.width;

//         card.style.top = newTop + 'px';
//         card.style.left = newLeft + 'px';

//         drawConnections();
//     }

//     function mouseUp(e) {
//         document.removeEventListener('mousemove', mouseMove);
//         document.removeEventListener('mouseup', mouseUp);
//         drawConnections();
//     }
// });

// // Start the line animation loop
// animateLines();



let newX = 0, newY = 0, startX = 0, startY = 0;
let dashOffset = 0;
let showConnections = true; // Toggle for showing connections

const main = document.querySelector('main');
const cards = document.querySelectorAll(".image-card");
const canvas = document.getElementById("web-canvas");
const ctx = canvas.getContext("2d");
const showWebBtn = document.querySelector(".show-web");

// Set initial canvas dimensions
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;

// Toggle connection lines on/off
showWebBtn.addEventListener('click', () => {
    showConnections = !showConnections;
    drawConnections();
});

// Function to resize the canvas and redraw lines
function resizeCanvas() {
    canvas.width = main.clientWidth;
    canvas.height = main.clientHeight;
    drawConnections(); // Redraw lines on resize
}

// Function to draw connection lines
function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    if (!showConnections) return; // Skip if connections are off

    ctx.strokeStyle = "#af9d14";
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1.5;
    ctx.lineDashOffset = dashOffset;

    const mainRect = main.getBoundingClientRect();

    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            const rectA = cards[i].getBoundingClientRect();
            const rectB = cards[j].getBoundingClientRect();

            const centerAx = rectA.left + rectA.width / 2 - mainRect.left;
            const centerAy = rectA.top + rectA.height / 2 - mainRect.top;
            const centerBx = rectB.left + rectB.width / 2 - mainRect.left;
            const centerBy = rectB.top + rectB.height / 2 - mainRect.top;

            ctx.beginPath();
            ctx.moveTo(centerAx, centerAy);
            ctx.lineTo(centerBx, centerBy);
            ctx.stroke();
        }
    }
}

// Animate line dashes in a loop
function animateLines() {
    dashOffset -= 0.2;
    drawConnections();
    requestAnimationFrame(animateLines);
}

// Resize listener to adjust canvas on window resize
window.addEventListener('resize', resizeCanvas);

// Dragging functionality for each image card
cards.forEach(card => {
    card.addEventListener('mousedown', mouseDown);

    function mouseDown(e) {
        e.preventDefault();

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e) {
        newX = e.clientX - startX;
        newY = e.clientY - startY;

        startX = e.clientX;
        startY = e.clientY;

        const mainRect = main.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        let newTop = card.offsetTop + newY;
        let newLeft = card.offsetLeft + newX;

        if (newTop < 0) newTop = 0;
        if (newTop + cardRect.height > mainRect.height) newTop = mainRect.height - cardRect.height;
        if (newLeft < 0) newLeft = 0;
        if (newLeft + cardRect.width > mainRect.width) newLeft = mainRect.width - cardRect.width;

        card.style.top = newTop + 'px';
        card.style.left = newLeft + 'px';

        drawConnections();
    }

    function mouseUp(e) {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        drawConnections();
    }
});

// Start the line animation loop
animateLines();




// ----- POP-UP FEATURE -------

const popup = document.getElementById("info-popup");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {
    card.addEventListener("dblclick", () => {
        // Populate popup with information
        document.getElementById("popup-image").src = card.querySelector("img").src;
        document.getElementById("popup-title").textContent = "A Redenção e o Sofrimento";
        document.getElementById("popup-work").textContent = "A Deposição de Cristo";
        document.getElementById("popup-author").textContent = "Rogier van der Weyden";
        document.getElementById("popup-date").textContent = "Cerca de 1435";
        document.getElementById("popup-material").textContent = "Óleo sobre painel de madeira";
        document.getElementById("popup-technique").textContent = "Pintura a óleo";
        document.getElementById("popup-description").textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

        // Show popup
        popup.style.display = "flex";
    });
});

// Close popup when close button is clicked
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Optional: Close popup when clicking outside the popup content
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
