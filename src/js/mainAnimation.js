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
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -50);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage||0}%, -0%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage||0}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


let bgImage = document.querySelector(".circle-reveal");
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(SlowMo)

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
    x:-200,
    scrollTrigger: {
      trigger: '#image-track',
      scrub: 1,
      start: "top center",
      end: "bottom center"
    },

  }
);

function helloButton(){
  gsap.to(window, {duration: 3, scrollTo: "#hello", ease: "slow(0.1, 0.8, false)"});
}