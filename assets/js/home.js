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

// Initialize Vimeo player when API is ready
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Vimeo !== 'undefined') {
    const iframe = document.querySelector('.video-wrap iframe');
    if (iframe) {
      vimeoPlayer = new Vimeo.Player(iframe);
    }
  }
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