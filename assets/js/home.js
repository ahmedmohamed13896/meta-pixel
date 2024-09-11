// Event listeners for hover
PROJECT_CONTAINERS.forEach((imgContainer) => {
    imgContainer.addEventListener("mouseenter", () => {
      startImageLoop(imgContainer);
    });
    imgContainer.addEventListener("mouseleave", () => {
      stopImageLoop(imgContainer);
    });
});