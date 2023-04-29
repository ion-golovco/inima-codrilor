const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage)+ percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -0%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("hamburger-button");

  const menu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    menu.classList.toggle("hidden");
  };

  burger.addEventListener("click", toggleMenu);
  menu.addEventListener("click", toggleMenu);
});

let bgImage = document.querySelector(".circle-reveal");
gsap.registerPlugin(ScrollTrigger);
gsap.fromTo(
  bgImage,
  {
    clipPath: "circle(1% at 50% 50%)",
  },
  {
    clipPath: "circle(75% at 50% 50%)",
    ease: "none",
    scrollTrigger: {
      trigger: bgImage,
      scrub: 1,
      start: "top center",
      end: "top center-=250",
    },
  }
);

gsap.fromTo(
  '#image-track',
  {
   x:0
  },
  {
    x:-150,
    scrollTrigger: {
      trigger: '#image-track',
      scrub: 1,
      start: "top center-=100",
      end: "top center+=100 ",
    },
  }
);

