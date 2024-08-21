function activeSectionBullet() {
    SECTIONS.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const bullet = BULLETS[index];
        if ((rect.top <= HALF_WINDOW_HEIGHT && rect.bottom >= HALF_WINDOW_HEIGHT) || (rect.top < FULL_WINDOW_HEIGHT && rect.bottom > 0)) {
            bullet.classList.add('active');
        } else {
            bullet.classList.remove('active');
        }
    });
}

function changeNavbarStyle() {
    if (window.scrollY >= HEADER) {
        NAV_BAR.classList.add('navbar-solid');
    } else {
        NAV_BAR.classList.remove('navbar-solid');
    }

}

document.addEventListener('scroll', function () {
    changeNavbarStyle();
    activeSectionBullet();
});
