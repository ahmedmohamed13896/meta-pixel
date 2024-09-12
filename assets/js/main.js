window.onload = function () {
  LOADER.style.display = "none";
};

/////////////////

function updateActiveBullet() {
  SECTIONS.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const bullet = BULLETS[index];
    if (rect.top <= HALF_WINDOW_HEIGHT) {
      bullet.classList.add("active");
    } else {
      bullet.classList.remove("active");
    }
  });
}

function updateNavbarStyle(navHeight) {
  const isExpanded = NAV_COLLAPSE.classList.contains("show");
  if (window.scrollY >= navHeight || isExpanded) {
    NAV_BAR.classList.add("fadeInBackground");
  } else {
    NAV_BAR.classList.remove("fadeInBackground");
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

document.addEventListener("scroll", function () {
  onScroll(true);
});

NAV_TOGGLER.addEventListener("click", function (e) {
  if (e.target.classList.contains("show")) {
    NAV_BAR.classList.add("fadeInBackground");
  } else if (window.scrollY < NAV_HEIGHT) {
    NAV_BAR.classList.add("fadeInBackground");
  }
});

if (BUTTON_SCROLL_DOWN) {
  BUTTON_SCROLL_DOWN.addEventListener("click", function () {
    window.scrollTo({
      top: FULL_WINDOW_HEIGHT,
      behavior: "smooth",
    });
  });
}

// Function to change the image
function changeImage(imgContainer) {
  currentIndex = (currentIndex + 1) % getSelectedImages(imgContainer).length;
  const img = imgContainer.querySelector("img");
  img.src = BASE_IMG_URL + getSelectedImages(imgContainer)[currentIndex];
}

// Function to start the image loop on hover
function startImageLoop(imgContainer) {
  intervalId = setInterval(() => {
    changeImage(imgContainer);
  }, 1000);
}

// Function to stop the image loop when hover ends
function stopImageLoop(imgContainer) {
  clearInterval(intervalId);
  const img = imgContainer.querySelector("img");
  img.src = BASE_IMG_URL + getSelectedImages(imgContainer)[0]; // Reset to the first image
  currentIndex = 0;
}

const projectImageMap = {
  rally: PROJECT_RALLY_IMGS,
  kendy: PROJECT_KENDY_IMGS,
  zaabal: PROJECT_ZAABAL_IMGS,
  "ze-ein": PROJECT_ZEEIN_IMGS,
  aqwan: PROJECT_AQWAN_IMGS,
  "asr-herfa": PROJECT_ASR_HERFA_IMGS,
  camel: PROJECT_CAMEL_IMGS,
  emara: PROJECT_EMARA_IMGS,
  qshla: PROJECT_QSHLA_IMGS,
  sor: PROJECT_SOR_IMGS,
  tadawl: PROJECT_TADAWL_IMGS
};

function getSelectedImages(imgContainer) {
  const imgSrc = imgContainer.children[0].src;
  for (const key in projectImageMap) {
    if (imgSrc.includes(key)) {
      return projectImageMap[key];
    }
  }
}
