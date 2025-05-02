const NAV_BAR = document.querySelector(".navbar");
const HEADER = document.querySelector(".header-wrapper");
const MAIN_NAV = document.querySelector("#main_navbar");
const NAV_TOGGLER = document.querySelector(".navbar-toggler");
const HOME_VIDEO = document.getElementById("home_video");
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
const PROJECT_KENDY_IMGS = ["kendy1.jpg", "kendy2.jpg", "kendy3.jpg"];
const PROJECT_RALLY_IMGS = [
  "rally1.jpg",
  "rally2.jpg",
  "rally3.jpg",
  "rally4.jpg",
  "rally5.jpg",
];
const PROJECT_ZAABAL_IMGS = ["zaabal1.jpg", "zaabal2.jpg", "zaabal3.jpg"];
const PROJECT_ZEEIN_IMGS = ["ze-ein1.jpg", "ze-ein2.jpg", "ze-ein3.jpg"];
const PROJECT_AQWAN_IMGS = [
  "aqwan1.jpg",
  "aqwan2.jpg",
  "aqwan3.jpg",
  "aqwan4.jpg",
];
const PROJECT_ASR_HERFA_IMGS = [
  "asr-herfa1.jpg",
  "asr-herfa2.jpg",
  "asr-herfa3.jpg",
  "asr-herfa4.jpg",
];
const PROJECT_CAMEL_IMGS = [
  "camel1.jpg",
  "camel2.jpg",
  "camel3.jpg",
  "camel4.jpg",
  "camel5.jpg",
  "camel6.jpg",
  "camel7.jpg",
  "camel8.jpg",
  "camel9.jpg",
  "camel10.jpg",
  "camel11.jpg",
  "camel12.jpg",
];

const PROJECT_EMARA_IMGS = ["emara1.jpg", "emara2.jpg", "emara3.jpg"];
const PROJECT_QSHLA_IMGS = ["qshla1.jpg", "qshla2.jpg", "qshla3.jpg"];
const PROJECT_SOR_IMGS = ["sor1.jpg", "sor2.jpg", "sor3.jpg", "sor4.jpg"];
const PROJECT_TADAWL_IMGS = ["tadawl1.jpg"];

const projects = [
  {
    id: 1,
    name: "kendy",
    images: PROJECT_KENDY_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Kendy.mp4`,
    category: "prjection-mapping",
    title: "Kendy",
    description:
      "The Saudi National Day 93 project in the Embassy District offers a unique celebration that showcases Saudi heritage through innovative content reflecting the Kingdom's evolution and culture. The project features interactive exhibits, live art performances, and cultural experiences that captivate the audience, bridging the past with the present, and allowing everyone to discover the spirit of Saudi Arabia and explore its future aspirations.",
  },
  {
    id: 2,
    name: "rally",
    images: PROJECT_RALLY_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Rally.mp4`,
    category: "stage-design",
    title: "Rally",
    description:
      "The Hail Rally 2023 event offers an exciting journey through Hail’s rugged terrain, where precise route design meets high-speed adventure. Explore meticulously crafted tracks that challenge the limits of rallying while celebrating the region’s natural beauty. A unique blend of technology, sport, and culture, delivering a live rally experience for all.",
  },
  {
    id: 3,
    name: "zaabal",
    images: PROJECT_ZAABAL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Zaabal.mp4`,
    category: "content-creation",
    title: "Zaabal",
    description:
      "Zaabal Castle at the Sadu Festival merges history with innovation, transforming the iconic Zaabal Castle into a dynamic, interactive digital experience. Through cutting-edge projection mapping and immersive technology, this installation brings Saudi Arabia’s rich heritage to life in a whole new way. Experience tradition reimagined in the heart of the Sadu Festival, where the past and future beautifully collide.",
  },
  {
    id: 4,
    name: "ze-ein",
    images: PROJECT_ZEEIN_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Zeein.mp4`,
    category: "3d-animation",
    title: "Ze Ein",
    description:
      "The Saudi Heritage Day Project Mapping Event at the Thee Ain building brings Saudi history to life with stunning visual projections using cutting-edge mapping technology. The building transforms into a living canvas, showcasing the Kingdom's rich culture, traditions, and artistry. A unique experience that blends heritage with innovation, celebrating Saudi Arabia’s past and future.",
  },
  {
    id: 5,
    name: "aqwan",
    images: PROJECT_AQWAN_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Aqwan.mp4`,
    category: "hologram",
    title: "Aqwan",
    description:
      "On Farasan Beach in Jazan, Event Akwan offers an innovative visual experience where nature transforms into interactive art. Using advanced mapping technology, the beach becomes a vibrant stage telling rich stories of the Kingdom’s beauty and heritage. A unique blend of creativity and technology, creating a captivating and inspiring experience for all.",
  },
  {
    id: 6,
    name: "asr-herfa",
    images: PROJECT_ASR_HERFA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Asr-herfa.mp4`,
    category: "vfx",
    title: "Asr W 7rfa",
    description:
      "this project, we revive traditional crafts that are an essential part of the Kingdom's cultural identity. The project aims to preserve these crafts and pass them on to future generations in an innovative way",
  },
  {
    id: 7,
    name: "camel",
    images: PROJECT_CAMEL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Camel.mp4`,
    category: "hologram",
    title: "Camel",
    description:
      "Celebrate Saudi Heritage Day at Camel Rock in the Al-Jawf region, where history and culture converge in a breathtaking landscape. This project brings the Kingdom's rich traditions to life, offering a unique blend of heritage and modern storytelling.",
  },
  {
    id: 8,
    name: "emara",
    images: PROJECT_EMARA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Emara.mp4`,
    category: "3d-animation",
    title: "Emara",
    description:
      "Celebrate Saudi Heritage Day at the iconic Emirate Palace in Najran, where the Kingdom's rich cultural heritage is honored in a stunning historical setting. This event blends tradition with innovation, creating a memorable experience that showcases Saudi Arabia’s timeless legacy.",
  },
  {
    id: 9,
    name: "qshla",
    images: PROJECT_QSHLA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Qshla.mp4`,
    category: "content-creation",
    title: "Qshla",
    description:
      "Celebrate Saudi Heritage Day at the historic Al-Qashla Palace in the Hail region, where the Kingdom’s cultural richness is brought to life in a majestic setting. This event merges tradition with modernity, offering a unique experience that honors Saudi Arabia's timeless heritage.",
  },
  {
    id: 10,
    name: "sor",
    images: PROJECT_SOR_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Sor.mp4`,
    category: "stage-design",
    title: "El Sor",
    description:
      "celebrate Saudi Heritage Day in Al-Sour, Yanbu, the project offers a unique cultural experience that honors the Kingdom’s rich history and heritage. Through interactive displays and innovative content, it bridges the past and present, highlighting the timeless beauty and spirit of Saudi Arabia.",
  },
  {
    id: 11,
    name: "tadawl",
    images: PROJECT_TADAWL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Tadawl.mp4`,
    category: "prjection-mapping",
    title: "Tadawl",
    description:
      "An exclusive event was organized for a group of leading trading companies in Saudi Arabia, fostering collaboration and innovation among participants. This gathering created exceptional opportunities for networking and partnerships, contributing to the growth of the Kingdom's business landscape.",
  },
];
