const glImg = document.querySelector(".carusel-v2__important-img");
const imgContainer = document.querySelectorAll(".images-list-container")[1];
const imgContainerPopup = document.querySelectorAll(".images-list-container")[0];
const images = document.querySelectorAll(".images-list-img-container");
const arrow = document.querySelector(".images-list__arrow");
const popup = document.querySelector(".carusel-v2-popup");
const popupImg = document.querySelector(".carusel-v2-popup > .carusel-v2-popup-img");

let maxCurrentPosition = Array.prototype.slice.call(imgContainerPopup.childNodes).length - 1;

let currentPosition = 0;

let ProductDetailPageBySkipli = function (event) {
    if (event.type == "mouseover") {
        if (event.target.classList.contains("images-list-img")) {
            currentPosition = getIndex(event.target);
            glImg.src = event.target.src;
            popupImg.src = event.target.src;
            images.forEach((item) => {
                item.classList.remove("active");
            });
            event.target.parentElement.classList.add("active");
        }
    }
    if (event.type == "click") {
        if(event.target.classList.contains("carusel-v2-arrow-right")) changePopupImg(1);
        else if(event.target.classList.contains("carusel-v2-arrow-left")) changePopupImg(-1);
        if(event.target.classList.contains("images-list-img") || event.target.classList.contains("carusel-v2__important-img")){
            currentPosition = getIndex(event.target);
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

function changePopupImg(m){
    currentPosition = Math.min(m, maxCurrentPosition);
    currentPosition = currentPosition < 0 ? 0 : currentPosition;
    popupImg.src = Array.prototype.slice.call(imgContainerPopup.childNodes).filter(e => !(e instanceof Text))[currentPosition].src;
}


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

function getIndex(el){
    let whoSearch = el.parentNode;
    let whereSearch = whoSearch.parentNode.childNodes;
    whereSearch = Array.prototype.slice.call(whereSearch).filter(e => !(e instanceof Text));
    return whereSearch.indexOf(whoSearch)
}

document.querySelector(".carusel-v2-exit").addEventListener("click", () => togglePopup(false));
document.addEventListener("mouseover", ProductDetailPageBySkipli);
document.addEventListener("click", ProductDetailPageBySkipli);

