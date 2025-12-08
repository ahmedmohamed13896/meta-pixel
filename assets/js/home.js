// Event listeners for hover
PROJECT_CONTAINERS.forEach((imgContainer) => {
    imgContainer.addEventListener("mouseenter", () => {
      startImageLoop(imgContainer);
    });
    imgContainer.addEventListener("mouseleave", () => {
      stopImageLoop(imgContainer);
    });
});

// Vimeo player instance
let vimeoPlayer = null;
let vimeoPoster = null;
let videoReady = false;
let posterHidden = false;

// Function to hide poster
function hidePoster() {
  if (vimeoPoster && !posterHidden) {
    posterHidden = true;
    videoReady = true;
    vimeoPoster.classList.add('hidden');
    // Remove poster from DOM after fade out
    setTimeout(function() {
      if (vimeoPoster) {
        vimeoPoster.style.display = 'none';
      }
    }, 500);
  }
}

// Initialize Vimeo player
function initVimeoPlayer() {
  const iframe = document.querySelector('.video-wrap .vimeo-iframe');
  
  if (!iframe) {
    console.warn('Vimeo iframe not found');
    return;
  }
  
  // Wait for Vimeo API to be available
  function setupPlayer() {
    if (typeof Vimeo === 'undefined') {
      // Retry after a short delay
      setTimeout(setupPlayer, 100);
      return;
    }
    
    try {
      vimeoPlayer = new Vimeo.Player(iframe);
      
      // Hide poster when video is ready to play
      vimeoPlayer.ready().then(function() {
        console.log('Vimeo video ready');
        hidePoster();
      }).catch(function(error) {
        console.error('Error loading Vimeo video:', error);
      });
      
      // Listen for play event
      vimeoPlayer.on('play', function() {
        hidePoster();
      });
      
      // Listen for loaded event
      vimeoPlayer.on('loaded', function() {
        hidePoster();
      });
      
      // Listen for timeupdate to detect when video actually starts playing
      vimeoPlayer.on('timeupdate', function(data) {
        if (data.seconds > 0) {
          hidePoster();
        }
      });
    } catch (error) {
      console.error('Error initializing Vimeo player:', error);
    }
  }
  
  setupPlayer();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  vimeoPoster = document.getElementById('vimeo-poster');
  
  // Ensure poster is visible initially
  if (vimeoPoster) {
    vimeoPoster.style.display = 'block';
    vimeoPoster.classList.remove('hidden');
  }
  
  // Initialize Vimeo player
  initVimeoPlayer();
});

// Show poster when main loader disappears (if video not ready)
window.addEventListener('load', function() {
  // Small delay to ensure main loader is hidden
  setTimeout(function() {
    if (!vimeoPoster) {
      vimeoPoster = document.getElementById('vimeo-poster');
    }
    
    // Show poster if video is not ready yet
    if (vimeoPoster && !videoReady) {
      vimeoPoster.style.display = 'block';
      vimeoPoster.classList.remove('hidden');
    }
    
    // Re-initialize Vimeo player if not already done
    if (!vimeoPlayer) {
      initVimeoPlayer();
    }
  }, 200);
});

function toggleMicrophone(){
  if (!vimeoPlayer) {
    // Fallback if Vimeo player not initialized
    return;
  }
  
  vimeoPlayer.getMuted().then(function(muted) {
    if (muted) {
      // Unmute
      vimeoPlayer.setVolume(1);
      vimeoPlayer.setMuted(false);
      document.querySelector('.microphone-on').style.display = 'flex';
      document.querySelector('.microphone-off').style.display = 'none';
    } else {
      // Mute
      vimeoPlayer.setMuted(true);
      document.querySelector('.microphone-off').style.display = 'flex';
      document.querySelector('.microphone-on').style.display = 'none';
    }
  });
}