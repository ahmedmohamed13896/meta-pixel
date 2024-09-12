const container = document.querySelector(".project-list .grid");
projects.map((pro) => {
  const newProjectHTML = `<div class="box ${pro.category}" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="linear">
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
                                <a href="./project.html?id=${pro.id}" class="text-main m-plus-1p-bold link">View full project</a>
                            </div>
                        </div>
                    </div>
                </div>
`;
container.insertAdjacentHTML("beforeend", newProjectHTML);
});
const BOXS_CONTENT = document.querySelectorAll(".project-list .grid .box");
BOXS_CONTENT.forEach((content) => content.classList.add("show"));
if (FILTER_ITEMS?.length) {
    FILTER_ITEMS.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter");
        // Toggle selected state
        if (tab.classList.contains("selected")) {
          tab.classList.remove("selected");
          SELECTED_FILTERS = SELECTED_FILTERS.filter((f) => f !== filter);
        } else {
          tab.classList.add("selected");
          SELECTED_FILTERS.push(filter);
        }
        // Show or hide content based on selected filters
        BOXS_CONTENT.forEach((content) => {
          const contentClasses = content.classList;
  
          // Show content if it matches any of the selected filters
          if (SELECTED_FILTERS.some((f) => contentClasses.contains(f))) {
            content.classList.add("show");
          } else {
            content.classList.remove("show", "aos-animate");
          }
        });
  
        // If no filters are selected, show all content
        if (SELECTED_FILTERS.length === 0) {
          BOXS_CONTENT.forEach((content) => content.classList.add("show"));
        }
  
        AOS.init();
      });
    });
}

BOXS_CONTENT.forEach((container) => {
  const imgContainer = container.querySelector(".box-img-wrapper");
  container.addEventListener("mouseenter", () => {
    startImageLoop(imgContainer);
  });
  container.addEventListener("mouseleave", () => {
    stopImageLoop(imgContainer);
  });
});