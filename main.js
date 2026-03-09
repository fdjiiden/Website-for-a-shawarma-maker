function see(el) {
    rect = el.getBoundingClientRect();
    wind = window.innerHeight;    
    return (
        rect.top <= wind * 0.8 && rect.bottom >= 0
    );
}
function active(block) {
    t = block.querySelectorAll('.shaurma1, .shaurma2, .shaurma3, .Block_1, .Block_2, .Block_3, .price1');
    t.forEach(el => {
        if (el.style.animationName === "none") {
            if (el.classList.contains('shaurma1') || el.classList.contains('shaurma2') || el.classList.contains('shaurma3')) {
                el.style.animation = "move 1s forwards 0.5s";
            } else {
                el.style.animation = "movetext 2s forwards";
            }
        }
    });
}
function handleScroll() {
    allBl = document.querySelectorAll('.Vshaurm, .shaurm');
    allBl.forEach(block => {
        if (see(block)) {
            active(block);
        }
    });
}
function init() {
    const allel = document.querySelectorAll('.shaurma1, .shaurma2, .shaurma3, .Block_1, .Block_2, .Block_3, .price1');
    allel.forEach(el => {
        el.style.opacity = "0";
        el.style.animation = "none";
    });    
    handleScroll();
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', init);




