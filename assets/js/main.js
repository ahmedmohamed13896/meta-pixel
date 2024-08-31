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

function updateNavbarStyle(navHeight) {
    const isExpanded = NAV_COLLAPSE.classList.contains('show');    
    if ((window.scrollY >= navHeight) || isExpanded) {
        NAV_BAR.classList.add('fadeInBackground');
    } else {
        NAV_BAR.classList.remove('fadeInBackground');
    }
}

function onScroll(isUpdateBullet) {
    // const headerHeight = HEADER?.offsetHeight || SECTION_WORKS?.offsetHeight || SECTION_PROJECT_DETAILS?.offsetHeight || SECTION_SERVICES_DETAILS?.offsetHeight || SECTION_ABOUT?.offsetHeight;
    updateNavbarStyle(NAV_HEIGHT);
    if (HEADER) {
        isUpdateBullet && updateActiveBullet();
    }
}

onScroll(); // to update navbar if the user on different sectiom

document.addEventListener('scroll', function () {
    onScroll(true);
});

NAV_TOGGLER.addEventListener('click',function(e){
    if(e.target.classList.contains('show')){
        NAV_BAR.classList.add('fadeInBackground');
    }else if (window.scrollY < NAV_HEIGHT){
        NAV_BAR.classList.add('fadeInBackground');
    }
});


if(BUTTON_SCROLL_DOWN){
    BUTTON_SCROLL_DOWN.addEventListener('click', function(){
        window.scrollTo({
            top: FULL_WINDOW_HEIGHT, 
            behavior: 'smooth'
        });
    })
}

// JavaScript to handle multi-select filter in Work.html page
if(FILTER_ITEMS?.length){
    FILTER_ITEMS.forEach(tab => {
        
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
    
            // Toggle selected state
            if (tab.classList.contains('selected')) {
                tab.classList.remove('selected');
                SELECTED_FILTERS = SELECTED_FILTERS.filter(f => f !== filter);
            } else {
                tab.classList.add('selected');
                SELECTED_FILTERS.push(filter);
            }
    
            // Show or hide content based on selected filters
            BOXS_CONTENT.forEach(content => {
                const contentClasses = content.classList;
    
                // Show content if it matches any of the selected filters
                if (SELECTED_FILTERS.some(f => contentClasses.contains(f))) {
                    content.classList.add('show');
                } else {
                    content.classList.remove('show');
                }
            });
    
            // If no filters are selected, show all content
            if (SELECTED_FILTERS.length === 0) {
                BOXS_CONTENT.forEach(content => content.classList.add('show'));
            }
        });
    });
}

// Initialize by showing all content
BOXS_CONTENT.forEach(content => content.classList.add('show'));