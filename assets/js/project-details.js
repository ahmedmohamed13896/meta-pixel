const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const VIDEO = document.getElementById("video");

// Flag to prevent double loading
let videoLoaded = false;
let videoSourceAdded = false;

function createVideoSrc(project){
    // Lazy load: Only load video when user clicks play or video enters viewport
    const loadVideo = () => {
        // Prevent double loading
        if (videoLoaded) {
            return;
        }
        videoLoaded = true;
        
        // Only add source element when we actually want to load
        if (!videoSourceAdded) {
            const VIDEO_SRC = document.createElement("source");
            VIDEO_SRC.setAttribute("src", project.video);
            VIDEO_SRC.setAttribute("type", "video/mp4");
            VIDEO.appendChild(VIDEO_SRC);
            videoSourceAdded = true;
        }
        
        // Load the video
        VIDEO.load();
    };
    
    // Load when user clicks play button
    VIDEO.addEventListener('play', () => {
        loadVideo();
    }, { once: true });
    
    // Load when video enters viewport (Intersection Observer)
    // Use smaller rootMargin to avoid loading too early
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !videoLoaded) {
                    loadVideo();
                    observer.disconnect();
                }
            });
        }, { rootMargin: '50px' }); // Reduced from 100px to 50px
        
        observer.observe(VIDEO);
    } else {
        // Fallback: Load immediately if IntersectionObserver not supported
        loadVideo();
    }
}

if (id) {
  const project = projects.find((pro) => pro.id == id);
  const container = document.querySelector(".grid");
  const description = document.querySelector(".description");
  createVideoSrc(project);
  SECTION_TITLE.innerHTML = project.title;
  project.images.map((img) => {
    const newProjectHTML = `
      <div class="box border-shadow" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="box-img-wrapper w-100">
              <img src="${BASE_IMG_URL}${img}" alt="project" class="img-fluid w-100">
          </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", newProjectHTML);
  });
  const descriptionHTML = `
  <h6 class="text-uppercase text-gray-md mb-4 m-plus-1p-bold video-title">Description</h6>
  <p class="m-plus-1p-medium">${project.description}</p>
  `;
  description.innerHTML  = descriptionHTML
  
}
