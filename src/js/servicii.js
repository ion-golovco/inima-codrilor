function carousel(n){
    let elem = document.querySelector(".carousel");
    let rect = elem.offsetWidth
    gsap.to(elem, {duration: 0.5, x:-rect*(n-1)});
}