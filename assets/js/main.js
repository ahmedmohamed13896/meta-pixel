function updateActiveBullet() {
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

function updateNavbarStyle(section) {
    if (window.scrollY >= section) {
        NAV_BAR.classList.add('navbar-solid');
    } else {
        NAV_BAR.classList.remove('navbar-solid');
    }

}

function onScroll(isUpdateBullet) {
    const headerHeight = HEADER?.offsetHeight || HEADER_WORKS?.offsetHeight;
    if (HEADER) {
        updateNavbarStyle(headerHeight);
        isUpdateBullet && updateActiveBullet();
    } else if (HEADER_WORKS) {
        updateNavbarStyle(headerHeight);
    }
}

onScroll(); // to update navbar if the user on different sectiom

document.addEventListener('scroll', function () {
    onScroll(true);
});
