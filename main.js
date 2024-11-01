let newX = 0, newY = 0, startX = 0, startY = 0;

const main = document.querySelector('main');
const cards = document.querySelectorAll(".image-card");

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

        // Get the boundaries of the main container
        const mainRect = main.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Calculate the new positions with boundary checks
        let newTop = card.offsetTop + newY;
        let newLeft = card.offsetLeft + newX;

        // Check top boundary
        if (newTop < 0) newTop = 0;
        // Check bottom boundary
        if (newTop + cardRect.height > mainRect.height) {
            newTop = mainRect.height - cardRect.height;
        }

        // Check left boundary
        if (newLeft < 0) newLeft = 0;
        // Check right boundary
        if (newLeft + cardRect.width > mainRect.width) {
            newLeft = mainRect.width - cardRect.width;
        }

        // Apply the new positions within bounds
        card.style.top = newTop + 'px';
        card.style.left = newLeft + 'px';
    }

    function mouseUp(e) {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
});
