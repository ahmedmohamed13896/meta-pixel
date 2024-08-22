function updateActiveBullet() {
    SECTIONS.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const bullet = BULLETS[index];
        if (rect.top <= HALF_WINDOW_HEIGHT) {
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
    const headerHeight = HEADER?.offsetHeight || SECTION_WORKS?.offsetHeight || SECTION_PROJECT_DETAILS?.offsetHeight || SECTION_SERVICES_DETAILS?.offsetHeight || SECTION_ABOUT?.offsetHeight;
    
    if (HEADER) {
        updateNavbarStyle(headerHeight);
        isUpdateBullet && updateActiveBullet();
    } else {
        updateNavbarStyle(headerHeight);
    }
}

onScroll(); // to update navbar if the user on different sectiom

document.addEventListener('scroll', function () {
    onScroll(true);
});

BUTTON_SCROLL_DOWN.addEventListener('click', function(){
    window.scrollTo({
        top: FULL_WINDOW_HEIGHT, 
        behavior: 'smooth'
    });
})
