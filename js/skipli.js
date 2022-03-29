const glImg = document.querySelector(".carusel-v2__important-img");
const imgContainer = document.querySelectorAll(".images-list-container")[1];
const imgContainerPopup = document.querySelectorAll(".images-list-container")[0];
const images = document.querySelectorAll(".images-list-img-container");
const arrow = document.querySelector(".images-list__arrow");
const popup = document.querySelector(".carusel-v2-popup");
const popupImg = document.querySelector(".carusel-v2-popup > .carusel-v2-popup-img");

let maxCurrentPosition = Array.prototype.slice.call(imgContainerPopup.childNodes).filter(e => !(e instanceof Text)).length - 1;

let currentPosition = 0;

let ProductDetailPageBySkipli = function (event) {
    if (event.type == "mouseover" || event.type == "click") {
        if (event.target.classList.contains("images-list-img")) {
            currentPosition = getIndex(event.target);
            changePopupImg(0);
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
            currentPosition = getIndex(getChild(document.querySelector(".images-list-img-container.active")));
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
        let left = -1;
        if (event.target.classList.contains("images-list__arrow-bottom")) left = -1;
        else if (event.target.classList.contains("images-list__arrow-top")) left = 1;
        imgContainer.scrollLeft += left * 70;
        imgContainerPopup.scrollBy({
            left: left * getOneWidth(),
            behavior: 'smooth'
        });
    }
};

function changePopupImg(m){
    currentPosition = Math.min(currentPosition + m, maxCurrentPosition);
    currentPosition = currentPosition < 0 ? 0 : currentPosition;
    popupImg.src = getChild(Array.prototype.slice.call(imgContainerPopup.childNodes).filter(e => !(e instanceof Text))[currentPosition]).src;
    glImg.src = popupImg.src;
    images.forEach((item) => {
        item.classList.remove("active");
    });
    Array.prototype.slice.call(imgContainerPopup.childNodes).filter(e => !(e instanceof Text))[currentPosition]?.classList?.add("active");
    Array.prototype.slice.call(imgContainer.childNodes).filter(e => !(e instanceof Text))[currentPosition]?.classList?.add("active");
    document.querySelector(".carusel-v2-popup-index").innerText = (currentPosition + 1) + " из " + (maxCurrentPosition + 1);
}


function getChild(el, n = 0){
    return Array.prototype.slice.call(el.childNodes).filter(e => !(e instanceof Text))[n];
}

function togglePopup(open = true){
    if(open) {
	setTimeout(SkipliOnResize, 100);
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

function getOneWidth(){
        let anyImage = document.querySelector(".carusel-second > .images-list-container > .images-list-img-container");
        let oneCss = getComputedStyle(anyImage);
	return anyImage.offsetWidth + parseFloat(oneCss.marginLeft) + parseFloat(oneCss.marginRight);
}

function SkipliOnResize(){
	let c_display = "none";
	if(window.innerWidth < (maxCurrentPosition + 1) * getOneWidth()) c_display = "flex";
	for(let el of document.querySelectorAll(".carusel-second > .images-list__arrow")){
	    el.style.display = c_display;
	}
}

document.querySelector(".carusel-v2-exit").addEventListener("click", () => togglePopup(false));
document.addEventListener("mouseover", ProductDetailPageBySkipli);
document.addEventListener("click", ProductDetailPageBySkipli);
window.addEventListener("resize", SkipliOnResize);
window.addEventListener("load", SkipliOnResize);
window.addEventListener("load", () => changePopupImg(0));


//MOBILE
let x = {};
let needToSwipe = 50;
popup.addEventListener("touchstart", e => {
	if (e.changedTouches && e.changedTouches[0]) {
		let cur = e.changedTouches[0];
		x[cur.identifier] = cur.pageX;
	}
})
popup.addEventListener("touchend", e => {
    if (e.changedTouches && e.changedTouches[0]) {
		let cur = e.changedTouches[0];
		if (cur.pageX <= (x[cur.identifier] - needToSwipe)) changePopupImg(1);
        else if (cur.pageX >= (x[cur.identifier] + needToSwipe)) changePopupImg(-1);
    }
});
