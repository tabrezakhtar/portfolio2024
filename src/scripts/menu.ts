const hammy = document.querySelector(".hamburger");

if (hammy) {
    hammy.addEventListener('click', () => {
        const navvy = document.querySelector('.nav-links')
        if (navvy) {
            navvy.classList.toggle('expanded');
        }
    });
}