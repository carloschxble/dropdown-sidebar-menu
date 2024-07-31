document.addEventListener('DOMContentLoaded', (event) => {
    const sidebarMenu = document.querySelector('.primary-container .sidebar .sidebar__menu');
    let isDown = false;
    let startY;
    let scrollTop;

    // Function to check for overflow and toggle the has-scroll classes
    function checkOverflow() {
        const scrollTop = sidebarMenu.scrollTop;
        const scrollHeight = sidebarMenu.scrollHeight;
        const clientHeight = sidebarMenu.clientHeight;

        if (scrollTop > 0) {
            sidebarMenu.classList.add('has-scroll-top');
        } else {
            sidebarMenu.classList.remove('has-scroll-top');
        }

        if (scrollTop + clientHeight < scrollHeight) {
            sidebarMenu.classList.add('has-scroll-bottom');
        } else {
            sidebarMenu.classList.remove('has-scroll-bottom');
        }

        if (scrollHeight > clientHeight) {
            sidebarMenu.classList.remove('no-scroll');
            sidebarMenu.style.cursor = 'grab'; // Show grab cursor when scroll is needed
        } else {
            sidebarMenu.classList.add('no-scroll');
            sidebarMenu.style.cursor = 'default'; // Default cursor when no scroll
        }
    }

    sidebarMenu.addEventListener('mousedown', (e) => {
        if (sidebarMenu.classList.contains('no-scroll')) return;
        isDown = true;
        sidebarMenu.classList.add('active');
        startY = e.pageY - sidebarMenu.offsetTop;
        scrollTop = sidebarMenu.scrollTop;
        sidebarMenu.style.cursor = 'grabbing'; // Change cursor to grabbing
    });

    sidebarMenu.addEventListener('mouseleave', () => {
        if (sidebarMenu.classList.contains('no-scroll')) return;
        isDown = false;
        sidebarMenu.classList.remove('active');
        sidebarMenu.style.cursor = 'grab'; // Revert cursor back to grab
    });

    sidebarMenu.addEventListener('mouseup', () => {
        if (sidebarMenu.classList.contains('no-scroll')) return;
        isDown = false;
        sidebarMenu.classList.remove('active');
        sidebarMenu.style.cursor = 'grab'; // Revert cursor back to grab
    });

    sidebarMenu.addEventListener('mousemove', (e) => {
        if (!isDown || sidebarMenu.classList.contains('no-scroll')) return;
        e.preventDefault();
        const y = e.pageY - sidebarMenu.offsetTop;
        const walk = (y - startY) * 2; // Multiplier for scrolling speed
        sidebarMenu.scrollTop = scrollTop - walk;
    });

    // Check overflow on load
    checkOverflow();

    // Check overflow on window resize
    window.addEventListener('resize', checkOverflow);

    // Check overflow on content change
    sidebarMenu.addEventListener('scroll', checkOverflow);
});

document.body.addEventListener("pointermove", (e)=>{
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty('--posX',  x-l-w/2);
    el.style.setProperty('--posY',  y-t-h/2);
})