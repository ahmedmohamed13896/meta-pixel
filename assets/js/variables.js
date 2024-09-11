const NAV_BAR = document.querySelector('.navbar');
const HEADER = document.querySelector('.header-wrapper');
const MAIN_NAV = document.querySelector('#main_navbar');
const NAV_TOGGLER = document.querySelector('.navbar-toggler');
const SECTION_PROJECTS = document.querySelector('.project-details');
const SECTION_PROJECT_DETAILS = document.querySelector('.project-wrap');
const SECTION_SERVICES_DETAILS = document.querySelector('.services-details');
const SECTION_ABOUT = document.querySelector('.about-details');
const SECTIONS = document.querySelectorAll('.bullet-section');
const BULLETS = document.querySelectorAll('.bullet');
const HALF_WINDOW_HEIGHT = window.innerHeight / 2;
const FULL_WINDOW_HEIGHT = window.innerHeight;
const BUTTON_SCROLL_DOWN = document.querySelector('#btn_scroll_down');
const PROJECT_FILTER = document.querySelector('#project_filter');
const FILTER_ITEMS = document.querySelectorAll('.filter-item');
const BOXS_CONTENT = document.querySelectorAll('.project-list .grid .box');
const NAV_COLLAPSE = document.querySelector('.navbar-collapse');
const NAV_HEIGHT = 100;
let SELECTED_FILTERS = ['prjection-mapping',];
const LOADER = document.querySelector('.loader_section');
let currentIndex = 0;
let intervalId;
const BASE_IMG_URL = './assets/images/'; 
const PROJECT_CONTAINERS = document.querySelectorAll('.box-img-wrapper');
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

