const carousel_container =
  document.getElementsByClassName("carousel-container")[0];
const carousels = document.getElementsByClassName("carousels")[0];
const dot_1 = document.getElementsByClassName("dot")[0];
const dot_2 = document.getElementsByClassName("dot")[1];
const dot_3 = document.getElementsByClassName("dot")[2];
const carouselFirstElem = document.getElementsByClassName("img-child")[0];
const slideBtnLeft = document.getElementsByClassName("left-btn")[0];
const slideBtnRight = document.getElementsByClassName("right-btn")[0];
let interval;
let isSliding = false;
let xAxis;
let scrollLeft;
let indicatorIndex = 1;
let remSize;

const currentGap = window.getComputedStyle(carousels).gap;
const currentGapRem = parseFloat(currentGap);
remSize = currentGapRem;

const slideStart = (e) => {
  isSliding = true;
  xAxis = e.pageX;
  scrollLeft = carousel_container.scrollLeft;
};

const sliding = (e) => {
  e.preventDefault();
  if (isSliding === false) return;
  else {
    carousel_container.style.scrollBehavior = "smooth";
    const currPosition = e.pageX - xAxis;
    carousel_container.scrollLeft = scrollLeft - currPosition;
    let condition;
    console.log(scrollLeft);
    console.log(
      scrollLeft >=
        carouselFirstElem.clientWidth + carouselFirstElem.clientWidth / 2
    );
    if (scrollLeft <= carouselFirstElem.offsetWidth) {
      condition = 1;
    } else if (
      scrollLeft <= carouselFirstElem.offsetWidth === false &&
      scrollLeft >=
        carouselFirstElem.clientWidth + carouselFirstElem.clientWidth / 2 ===
        false
    ) {
      condition = 2;
    } else if (
      scrollLeft >=
      carouselFirstElem.clientWidth + carouselFirstElem.clientWidth / 2
    ) {
      condition = 3;
    }

    switch (condition) {
      case 1:
        if (dot_2.classList.contains("active")) {
          dot_2.classList.remove("active");
        } else if (dot_3.classList.contains("active")) {
          dot_3.classList.remove("active");
        }
        dot_1.classList.add("active");
        break;
      case 2:
        if (dot_1.classList.contains("active")) {
          dot_1.classList.remove("active");
        } else if (dot_3.classList.contains("active")) {
          dot_3.classList.remove("active");
        }
        dot_2.classList.add("active");
        break;
      case 3:
        if (dot_1.classList.contains("active")) {
          dot_1.classList.remove("active");
        } else if (dot_2.classList.contains("active")) {
          dot_2.classList.remove("active");
        }
        dot_3.classList.add("active");
        break;

      default:
        break;
    }
  }
};

const slideWithIndicator = () => {
  carousel_container.style.scrollBehavior = "smooth";

  if (indicatorIndex === 1) {
    if (dot_2.classList.contains("active")) {
      dot_2.classList.remove("active");
    } else if (dot_3.classList.contains("active")) {
      dot_3.classList.remove("active");
    }
    carousel_container.scrollLeft = 0;
    dot_1.classList.add("active");
  } else if (indicatorIndex === 2) {
    if (dot_1.classList.contains("active")) {
      dot_1.classList.remove("active");
    } else if (dot_3.classList.contains("active")) {
      dot_3.classList.remove("active");
    }
    carousel_container.scrollLeft =
      carousel_container.scrollWidth - carouselFirstElem.offsetWidth * 2;
    dot_2.classList.add("active");
  } else if (indicatorIndex === 3) {
    if (dot_1.classList.contains("active")) {
      dot_1.classList.remove("active");
    } else if (dot_2.classList.contains("active")) {
      dot_2.classList.remove("active");
    }
    carousel_container.scrollLeft = carousel_container.scrollWidth;
    dot_3.classList.add("active");
  }
};

const slideEnd = () => {
  isSliding = false;
};

carousel_container.addEventListener("mousedown", slideStart);
carousel_container.addEventListener("mousemove", sliding);
carousel_container.addEventListener("mouseup", slideEnd);
carousel_container.addEventListener("mouseleave", slideEnd);
dot_1.addEventListener("click", (e) => {
  indicatorIndex = 1;
  slideWithIndicator(e);
});
dot_2.addEventListener("click", (e) => {
  indicatorIndex = 2;
  slideWithIndicator(e);
});
dot_3.addEventListener("click", (e) => {
  indicatorIndex = 3;
  slideWithIndicator(e);
});

document.addEventListener("DOMContentLoaded", () => {
  dot_1.classList.add("active");
});
