const glImg = document.querySelector(".carusel-v2__important-img");
const imgContainer = document.querySelectorAll(".images-list-container")[1];
const imgContainerPopup = document.querySelectorAll(".images-list-container")[0];
const images = document.querySelectorAll(".images-list-img-container");
const arrow = document.querySelector(".images-list__arrow");
const popup = document.querySelector(".carusel-v2-popup");
const popupImg = document.querySelector(".carusel-v2-popup > .carusel-v2-popup-img");

let ProductDetailPageBySkipli = function (event) {
    if (event.type == "mouseover") {
        if (event.target.classList.contains("images-list-img")) {
            glImg.src = event.target.src;
            popupImg.src = event.target.src;
            images.forEach((item) => {
                item.classList.remove("active");
            });
            event.target.parentElement.classList.add("active");
        }
    }
    if (event.type == "click") {
        if(event.target.classList.contains("images-list-img") || event.target.classList.contains("carusel-v2__important-img")){
            togglePopup(true);
            popupImg.src = event.target.src;
        }
        let top = 0;
        if (event.target.classList.contains("images-list__arrow-bottom")) top = 60;
        else if (event.target.classList.contains("images-list__arrow-top")) top = -60;
        imgContainer.scrollBy({
            top,
            behavior: 'smooth'
        });
        let left = -70;
        if (event.target.classList.contains("images-list__arrow-bottom")) left = -70;
        else if (event.target.classList.contains("images-list__arrow-top")) left = 70;
        imgContainer.scrollLeft += left;
        imgContainerPopup.scrollBy({
            left,
            bahivor: 'smooth'
        });
    }
};

function togglePopup(open = true){
    if(open) {
        popup.classList.add("carusel-v2-popup-view");
        document.body.style.position = "fixed";
    }
    else {
        popup.classList.remove("carusel-v2-popup-view");
        document.body.style.position = "relative";
    }
}
document.querySelector(".carusel-v2-exit").addEventListener("click", () => togglePopup(false));
document.addEventListener("mouseover", ProductDetailPageBySkipli);
document.addEventListener("click", ProductDetailPageBySkipli);

