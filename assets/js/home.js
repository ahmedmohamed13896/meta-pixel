// Event listeners for hover
PROJECT_CONTAINERS.forEach((imgContainer) => {
    imgContainer.addEventListener("mouseenter", () => {
      startImageLoop(imgContainer);
    });
    imgContainer.addEventListener("mouseleave", () => {
      stopImageLoop(imgContainer);
    });
});

function toggleMicrophone(){
  if(HOME_VIDEO.muted){
    document.querySelector('.microphone-on').style.display = 'flex';
    document.querySelector('.microphone-off').style.display = 'none';
  }else{
    document.querySelector('.microphone-off').style.display = 'flex';
    document.querySelector('.microphone-on').style.display = 'none';
  }
  HOME_VIDEO.muted = !HOME_VIDEO.muted ;
}