// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector(".project-list .grid");
  
  if (!container) {
    console.error("Project grid container not found");
    return;
  }

  // Simple animation variations
  const animations = ['fade-up', 'fade-left', 'fade-right'];

  // Create and insert all project boxes with different animations
  projects.forEach((pro, index) => {
    // Cycle through simple animations
    const animation = animations[index % animations.length];
    
    const newProjectHTML = `<a href="./project.html?id=${pro.id}" class="box ${pro.category}" data-aos="${animation}" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="ease-out">
                      <div class="box-img-wrapper w-100">
                          <img src="${BASE_IMG_URL}${pro.images[0]}" alt="project"
                              class="img-fluid w-100">
                      </div>
                      <div class="px-3">
                          <h4 class="boya-alternative text-uppercase mt-3 card-title">${pro.title}</h4>
                          <div class="d-flex flex-column justify-content-between flex-grow-1 m-plus-1p-medium">
                              <p class="mt-2 clamp-two-lines">${pro.description}</p>
                              <div class="mb-4">
                                  <img src="./assets/images/ArrowRight.svg" alt="arrow" class="img-fluid">
                                  <span class="text-main m-plus-1p-bold link">View full project</span>
                              </div>
                          </div>
                      </div>
                  </a>
  `;
    container.insertAdjacentHTML("beforeend", newProjectHTML);
  });

  // Get all boxes after they're created
  const BOXS_CONTENT = document.querySelectorAll(".project-list .grid .box");

  // Function to apply filters
  function applyFilters() {
    // First, handle showing/hiding elements
    if (SELECTED_FILTERS.length === 0) {
      // If no filters are selected, show all content
      BOXS_CONTENT.forEach((content) => {
        // Remove AOS classes and attributes that might interfere
        content.classList.remove("aos-animate");
        content.removeAttribute("data-aos-id");
        // Remove any inline styles AOS might have added
        content.style.opacity = '';
        content.style.transform = '';
        content.style.transition = '';
        // Add show class to make element visible
        content.classList.add("show");
      });
    } else {
      // Show content if it matches any of the selected filters
      BOXS_CONTENT.forEach((content) => {
        const contentClasses = content.classList;
        if (SELECTED_FILTERS.some((f) => contentClasses.contains(f))) {
          // Remove AOS classes and attributes
          content.classList.remove("aos-animate");
          content.removeAttribute("data-aos-id");
          // Remove any inline styles AOS might have added
          content.style.opacity = '';
          content.style.transform = '';
          content.style.transition = '';
          // Add show class
          content.classList.add("show");
        } else {
          // Hide content that doesn't match filters
          content.classList.remove("show", "aos-animate");
          content.removeAttribute("data-aos-id");
        }
      });
    }

    // Refresh AOS for newly visible elements with a delay to ensure DOM updates complete
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        // Use refreshHard to force complete refresh and re-detect all elements
        AOS.refreshHard();
      }
    }, 100);
  }

  // Initialize filter visual state and apply initial filters
  if (FILTER_ITEMS?.length) {
    // Set initial visual state based on SELECTED_FILTERS
    FILTER_ITEMS.forEach((tab) => {
      const filter = tab.getAttribute("data-filter");
      if (SELECTED_FILTERS.includes(filter)) {
        tab.classList.add("selected");
      }
    });

    // Apply initial filters
    applyFilters();

    // Add click event listeners for checkbox behavior
    FILTER_ITEMS.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter");
        
        // Toggle selected state (checkbox behavior)
        if (tab.classList.contains("selected")) {
          tab.classList.remove("selected");
          SELECTED_FILTERS = SELECTED_FILTERS.filter((f) => f !== filter);
        } else {
          tab.classList.add("selected");
          SELECTED_FILTERS.push(filter);
        }
        
        // Apply filters
        applyFilters();
      });
    });
  } else {
    // If no filters, show all content
    BOXS_CONTENT.forEach((content) => content.classList.add("show"));
  }

  // Set up image hover effects
  BOXS_CONTENT.forEach((container) => {
    const imgContainer = container.querySelector(".box-img-wrapper");
    if (imgContainer) {
      container.addEventListener("mouseenter", () => {
        startImageLoop(imgContainer);
      });
      container.addEventListener("mouseleave", () => {
        stopImageLoop(imgContainer);
      });
    }
  });
});