const NAV_BAR = document.querySelector(".navbar");
const HEADER = document.querySelector(".header-wrapper");
const MAIN_NAV = document.querySelector("#main_navbar");
const NAV_TOGGLER = document.querySelector(".navbar-toggler");
// HOME_VIDEO removed - using Vimeo embed instead
// const HOME_VIDEO = document.getElementById("home_video");
const SECTION_PROJECTS = document.querySelector(".project-details");
const SECTION_PROJECT_DETAILS = document.querySelector(".project-wrap");
const SECTION_SERVICES_DETAILS = document.querySelector(".services-details");
const SECTION_ABOUT = document.querySelector(".about-details");
const SECTIONS = document.querySelectorAll(".bullet-section");
const BULLETS = document.querySelectorAll(".bullet");
const HALF_WINDOW_HEIGHT = window.innerHeight / 2;
const FULL_WINDOW_HEIGHT = window.innerHeight;
const BUTTON_SCROLL_DOWN = document.querySelector("#btn_scroll_down");
const PROJECT_FILTER = document.querySelector("#project_filter");
const FILTER_ITEMS = document.querySelectorAll(".filter-item");
const NAV_COLLAPSE = document.querySelector(".navbar-collapse");
const SECTION_TITLE = document.querySelector('.sec-title')
const NAV_HEIGHT = 100;
let SELECTED_FILTERS = ["prjection-mapping"];
const LOADER = document.querySelector(".loader_section");
let currentIndex = 0;
let intervalId;
const BASE_IMG_URL = "./assets/images/project-details/";
const BASE_PRO_VIDEO_URL = "./assets/videos/";
const PROJECT_CONTAINERS = document.querySelectorAll(".box-img-wrapper");
const PROJECT_KENDY_IMGS = ["kendy1.webp", "kendy2.webp", "kendy3.webp"];
const PROJECT_RALLY_IMGS = [
  "rally1.webp",
  "rally2.webp",
  "rally3.webp",
  "rally4.webp",
  "rally5.webp",
];
const PROJECT_ZAABAL_IMGS = ["zaabal1.webp", "zaabal2.webp", "zaabal3.webp"];
const PROJECT_ZEEIN_IMGS = ["ze-ein1.webp", "ze-ein2.webp", "ze-ein3.webp"];
const PROJECT_AQWAN_IMGS = [
  "aqwan1.webp",
  "aqwan2.webp",
  "aqwan3.webp",
  "aqwan4.webp",
];
const PROJECT_ASR_HERFA_IMGS = [
  "asr-herfa1.webp",
  "asr-herfa2.webp",
  "asr-herfa3.webp",
  "asr-herfa4.webp",
];
const PROJECT_CAMEL_IMGS = [
  "camel1.webp",
  "camel2.webp",
  "camel3.webp",
  "camel4.webp",
  "camel5.webp",
  "camel6.webp",
  "camel7.webp",
  "camel8.webp",
  "camel9.webp",
  "camel10.webp",
  "camel11.webp",
  "camel12.webp",
];

const PROJECT_EMARA_IMGS = ["emara1.webp", "emara2.webp", "emara3.webp"];
const PROJECT_QSHLA_IMGS = ["qshla1.webp", "qshla2.webp", "qshla3.webp"];
const PROJECT_SOR_IMGS = ["sor1.webp", "sor2.webp", "sor3.webp", "sor4.webp"];
const PROJECT_TADAWL_IMGS = ["tadawl1.webp"];

const projects = [
  {
    id: 1,
    name: "kendy",
    images: PROJECT_KENDY_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Kendy.mp4`,
    vimeoId: "1144186285",
    vimeoPadding: "56.26%",
    category: "prjection-mapping",
    title: "Kendy",
    description:
      "The Saudi National Day 93 project in the Embassy District offers a unique celebration that showcases Saudi heritage through innovative content reflecting the Kingdom's evolution and culture. The project features interactive exhibits, live art performances, and cultural experiences that captivate the audience, bridging the past with the present, and allowing everyone to discover the spirit of Saudi Arabia and explore its future aspirations.",
  },
  {
    id: 2,
    name: "rally",
    images: PROJECT_RALLY_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Rally.mp4`,
    vimeoId: "1144186619",
    vimeoPadding: "55.94%",
    category: "stage-design",
    title: "Rally",
    description:
      "The Hail Rally 2023 event offers an exciting journey through Hail's rugged terrain, where precise route design meets high-speed adventure. Explore meticulously crafted tracks that challenge the limits of rallying while celebrating the region's natural beauty. A unique blend of technology, sport, and culture, delivering a live rally experience for all.",
  },
  {
    id: 3,
    name: "zaabal",
    images: PROJECT_ZAABAL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Zaabal.mp4`,
    vimeoId: "1144187416",
    vimeoPadding: "40.1%",
    category: "content-creation",
    title: "Zaabal",
    description:
      "Zaabal Castle at the Sadu Festival merges history with innovation, transforming the iconic Zaabal Castle into a dynamic, interactive digital experience. Through cutting-edge projection mapping and immersive technology, this installation brings Saudi Arabia's rich heritage to life in a whole new way. Experience tradition reimagined in the heart of the Sadu Festival, where the past and future beautifully collide.",
  },
  {
    id: 4,
    name: "ze-ein",
    images: PROJECT_ZEEIN_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Zeein.mp4`,
    vimeoId: "1144186035",
    vimeoPadding: "56.25%",
    category: "3d-animation",
    title: "Ze Ein",
    description:
      "The Saudi Heritage Day Project Mapping Event at the Thee Ain building brings Saudi history to life with stunning visual projections using cutting-edge mapping technology. The building transforms into a living canvas, showcasing the Kingdom's rich culture, traditions, and artistry. A unique experience that blends heritage with innovation, celebrating Saudi Arabia's past and future.",
  },
  {
    id: 5,
    name: "aqwan",
    images: PROJECT_AQWAN_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Aqwan.mp4`,
    vimeoId: "1144185569",
    vimeoPadding: "56.34%",
    category: "hologram",
    title: "Aqwan",
    description:
      "On Farasan Beach in Jazan, Event Akwan offers an innovative visual experience where nature transforms into interactive art. Using advanced mapping technology, the beach becomes a vibrant stage telling rich stories of the Kingdom's beauty and heritage. A unique blend of creativity and technology, creating a captivating and inspiring experience for all.",
  },
  {
    id: 6,
    name: "asr-herfa",
    images: PROJECT_ASR_HERFA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Asr-herfa.mp4`,
    vimeoId: "1144185686",
    vimeoPadding: "56.25%",
    category: "vfx",
    title: "Asr W 7rfa",
    description:
      "this project, we revive traditional crafts that are an essential part of the Kingdom's cultural identity. The project aims to preserve these crafts and pass them on to future generations in an innovative way",
  },
  {
    id: 7,
    name: "camel",
    images: PROJECT_CAMEL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Camel.mp4`,
    vimeoId: "1144185875",
    vimeoPadding: "46.88%",
    category: "hologram",
    title: "Camel",
    description:
      "Celebrate Saudi Heritage Day at Camel Rock in the Al-Jawf region, where history and culture converge in a breathtaking landscape. This project brings the Kingdom's rich traditions to life, offering a unique blend of heritage and modern storytelling.",
  },
  {
    id: 8,
    name: "emara",
    images: PROJECT_EMARA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Emara.mp4`,
    vimeoId: "1144185331",
    vimeoPadding: "56.25%",
    category: "3d-animation",
    title: "Emara",
    description:
      "Celebrate Saudi Heritage Day at the iconic Emirate Palace in Najran, where the Kingdom's rich cultural heritage is honored in a stunning historical setting. This event blends tradition with innovation, creating a memorable experience that showcases Saudi Arabia's timeless legacy.",
  },
  {
    id: 9,
    name: "qshla",
    images: PROJECT_QSHLA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Qshla.mp4`,
    vimeoId: "1144186421",
    vimeoPadding: "56.25%",
    category: "content-creation",
    title: "Qshla",
    description:
      "Celebrate Saudi Heritage Day at the historic Al-Qashla Palace in the Hail region, where the Kingdom's cultural richness is brought to life in a majestic setting. This event merges tradition with modernity, offering a unique experience that honors Saudi Arabia's timeless heritage.",
  },
  {
    id: 10,
    name: "sor",
    images: PROJECT_SOR_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Sor.mp4`,
    vimeoId: "1144187009",
    vimeoPadding: "56.25%",
    category: "stage-design",
    title: "El Sor",
    description:
      "celebrate Saudi Heritage Day in Al-Sour, Yanbu, the project offers a unique cultural experience that honors the Kingdom's rich history and heritage. Through interactive displays and innovative content, it bridges the past and present, highlighting the timeless beauty and spirit of Saudi Arabia.",
  },
  {
    id: 11,
    name: "tadawl",
    images: PROJECT_TADAWL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Tadawl.mp4`,
    vimeoId: "1144187224",
    vimeoPadding: "56.25%",
    category: "prjection-mapping",
    title: "Tadawl",
    description:
      "An exclusive event was organized for a group of leading trading companies in Saudi Arabia, fostering collaboration and innovation among participants. This gathering created exceptional opportunities for networking and partnerships, contributing to the growth of the Kingdom's business landscape.",
  },
];
