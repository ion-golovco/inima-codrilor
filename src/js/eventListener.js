document.addEventListener('DOMContentLoaded', function() {
    
    const burger = document.getElementById("hamburger-button")

    const menu = document.getElementById("mobile-menu")

    const toggleMenu = ()=>{
        menu.classList.toggle('hidden')
    }

    burger.addEventListener('click', toggleMenu)
    menu.addEventListener('click', toggleMenu)
});