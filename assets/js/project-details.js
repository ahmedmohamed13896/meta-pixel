const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const VIDEO = document.getElementById("video");
const VIDEO_SRC = document.createElement("source");

function createVideoSrc(project){
    VIDEO_SRC.src = project.video;
    VIDEO_SRC.setAttribute("src", project.video);
    VIDEO_SRC.setAttribute("type", "video/mp4");
    VIDEO.appendChild(VIDEO_SRC);
    VIDEO.load();
  
}

if (id) {
  const project = projects.find((pro) => pro.id == id);
  const container = document.querySelector(".grid");
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
}
