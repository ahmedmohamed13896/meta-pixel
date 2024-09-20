const NAV_BAR = document.querySelector(".navbar");
const HEADER = document.querySelector(".header-wrapper");
const MAIN_NAV = document.querySelector("#main_navbar");
const NAV_TOGGLER = document.querySelector(".navbar-toggler");
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
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 2,
    name: "rally",
    images: PROJECT_RALLY_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Rally.mp4`,
    category: "stage-design",
    title: "Rally",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 3,
    name: "zaabal",
    images: PROJECT_ZAABAL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Zaabal.mp4`,
    category: "content-creation",
    title: "Zaabal",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 4,
    name: "ze-ein",
    images: PROJECT_ZEEIN_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Zeein.mp4`,
    category: "3d-animation",
    title: "Ze Ein",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 5,
    name: "aqwan",
    images: PROJECT_AQWAN_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Aqwan.mp4`,
    category: "hologram",
    title: "Aqwan",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 6,
    name: "asr-herfa",
    images: PROJECT_ASR_HERFA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Asr-herfa.mp4`,
    category: "vfx",
    title: "Asr W 7rfa",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 7,
    name: "camel",
    images: PROJECT_CAMEL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Camel.mp4`,
    category: "hologram",
    title: "Camel",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 8,
    name: "emara",
    images: PROJECT_EMARA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Emara.mp4`,
    category: "3d-animation",
    title: "Emara",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 9,
    name: "qshla",
    images: PROJECT_QSHLA_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Qshla.mp4`,
    category: "content-creation",
    title: "Qshla",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 10,
    name: "sor",
    images: PROJECT_SOR_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Sor.mp4`,
    category: "stage-design",
    title: "El Sor",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
  {
    id: 11,
    name: "tadawl",
    images: PROJECT_TADAWL_IMGS,
    video: `${BASE_PRO_VIDEO_URL}Tadawl.mp4`,
    category: "prjection-mapping",
    title: "Tadawl",
    description:
      "2 lines for project description here..Short 2 lines for project description here..",
  },
];
