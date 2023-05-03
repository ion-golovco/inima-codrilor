document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("hamburger-button");

  const menu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    menu.classList.toggle("hidden");
  };

  burger.addEventListener("click", toggleMenu);
  menu.addEventListener("click", toggleMenu);
});

function sendEmail() {
  window.location = "mailto:inima.codrilor@gmail.com";
}

function callInima() {
  window.location = "tel:+373 67300500";
}