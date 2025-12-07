const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const VIDEO_CONTAINER = document.querySelector(".responsive-video");

// Flag to prevent double loading
let videoLoaded = false;
let videoSourceAdded = false;

function createVideoSrc(project){
    // Check if project has Vimeo embed
    if (project.vimeoId) {
        // Create Vimeo embed
        const padding = project.vimeoPadding || "56.15%";
        const vimeoHTML = `
            <div class="vimeo-wrapper project-vimeo-wrapper" style="--vimeo-padding: ${padding};">
                <iframe
                    id="vimeo-player-${project.id}"
                    src="https://player.vimeo.com/video/${project.vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1&amp;controls=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;share=0&amp;dnt=1"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    class="vimeo-iframe"
                    title="${project.title}">
                </iframe>
            </div>
        `;
        VIDEO_CONTAINER.innerHTML = vimeoHTML;
        
        // Try to hide engagement buttons using Vimeo Player API (if available)
        setTimeout(() => {
            if (typeof Vimeo !== 'undefined') {
                const iframe = document.getElementById(`vimeo-player-${project.id}`);
                if (iframe) {
                    try {
                        const player = new Vimeo.Player(iframe);
                        // Note: Vimeo API doesn't have methods to hide engagement buttons
                        // These must be controlled in Vimeo account settings
                    } catch (e) {
                        console.log('Vimeo Player API not available yet');
                    }
                }
            }
        }, 1000);
        return;
    }
    
    // Fallback to local video if no Vimeo ID
    const VIDEO = document.getElementById("video");
    if (!VIDEO) return;
    
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
