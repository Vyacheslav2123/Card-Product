(() => {
	const Skipli_glImg = document.querySelector(".carusel-v2__important-img");
	const Skipli_imgContainer = document.querySelectorAll(".carusel-v2__images-list-container")[1];
	const Skipli_imgContainerPopup = document.querySelectorAll(".carusel-v2__images-list-container")[0];
	const Skipli_images = document.querySelectorAll(".carusel-v2__images-list-img-container");
	const Skipli_= document.querySelector(".carusel-v2__images-list__arrow");
	const Skipli_popup = document.querySelector(".carusel-v2__carusel-v2-popup");
	const Skipli_popupImg = document.querySelector(".carusel-v2__carusel-v2-popup > .carusel-v2__carusel-v2-popup-img");
	
	let Skipli_popupMaximize = false;
	let Skipli_maxCurrentPosition = Array.prototype.slice.call(Skipli_imgContainerPopup.childNodes).filter(e => !(e instanceof Text)).length - 1;

	let Skipli_currentPosition = 0;

	let ProductDetailPageBySkipli = function (event) {
            if(event.type == "click" && event.target.classList.contains(".carusel-v2__carusel-v2-popup-img")){
	    	toggleMax(e);
	    }
	    if (event.type == "mouseover" || event.type == "click") {
		if (event.target.classList.contains("carusel-v2__images-list-img")) {
		    Skipli_currentPosition = Skipli_getIndex(event.target);
		    Skipli_changePopupImg(0);
		    Skipli_images.forEach((item) => {
			item.classList.remove("carusel-v2__active");
		    });
		    event.target.parentElement.classList.add("carusel-v2__active");
		}
	    }
	    if (event.type == "click") {
		if(event.target.classList.contains("carusel-v2__carusel-v2-arrow-right")) Skipli_changePopupImg(1);
		else if(event.target.classList.contains("carusel-v2__carusel-v2-arrow-left")) Skipli_changePopupImg(-1);
		if(event.target.classList.contains("carusel-v2__images-list-img") || event.target.classList.contains("carusel-v2__important-img")){
		    Skipli_currentPosition = Skipli_getIndex(Skipli_getChild(document.querySelector(".carusel-v2__images-list-img-container.carusel-v2__active")));
		    Skipli_togglePopup(true);
		    Skipli_changePopupImg(0);
		let top = 0;
		if (event.target.classList.contains("carusel-v2__images-list__arrow-bottom")) top = 60;
		else if (event.target.classList.contains("carusel-v2__images-list__arrow-top")) top = -60;
		Skipli_imgContainer.scrollBy({
		    top,
		    behavior: 'smooth'
		});
		let left = 0;
		if (event.target.classList.contains("carusel-v2__images-list__arrow-bottom")) left = -1;
		else if (event.target.classList.contains("carusel-v2__images-list__arrow-top")) left = 1;
		Skipli_imgContainer.scrollLeft += left * 70;
		Skipli_changePopupImg(left);
		}
	    }
	};

	function Skipli_changePopupImg(m){
	    Skipli_currentPosition = Math.min(Skipli_currentPosition + m, Skipli_maxCurrentPosition);
	    Skipli_currentPosition = Skipli_currentPosition < 0 ? 0 : Skipli_currentPosition;
	    var url = Skipli_getChild(Array.prototype.slice.call(Skipli_imgContainerPopup.childNodes).filter(e => !(e instanceof Text))[Skipli_currentPosition]).getAttribute("origin-src");
	    Skipli_glImg.style.backgroundImage = `url('${url}')`;
	    Skipli_popupImg.style.backgroundImage = `url('${url}')`;
	    Skipli_images.forEach((item) => {
		item.classList.remove("carusel-v2__active");
	    });
	    Array.prototype.slice.call(Skipli_imgContainerPopup.childNodes).filter(e => !(e instanceof Text))[Skipli_currentPosition]?.classList?.add("carusel-v2__active");
	    Array.prototype.slice.call(Skipli_imgContainer.childNodes).filter(e => !(e instanceof Text))[Skipli_currentPosition]?.classList?.add("carusel-v2__active");
	    document.querySelector(".carusel-v2__carusel-v2-popup-index").innerText = (Skipli_currentPosition + 1) + " из " + (Skipli_maxCurrentPosition + 1);
	    Skipli_imgContainerPopup.scroll({
		left: (Skipli_currentPosition * Skipli_getOneWidth()) - (window.innerWidth / 2) + (Skipli_getOneWidth() / 2),
		behavior: "smooth"
	    })
	}


	function Skipli_getChild(el, n = 0){
	    return Array.prototype.slice.call(el.childNodes).filter(e => !(e instanceof Text))[n];
	}

	function Skipli_togglePopup(open = true){
	    if(open) {
		setTimeout(SkipliOnResize, 100);
		Skipli_popup.classList.add("carusel-v2__carusel-v2-popup-view");
		document.body.style.position = "fixed";
	    }
	    else {
		Skipli_popup.classList.remove("carusel-v2__carusel-v2-popup-view");
		document.body.style.position = "relative";
	    }
	}

	function Skipli_getIndex(el){
	    let whoSearch = el.parentNode;
	    let whereSearch = whoSearch.parentNode.childNodes;
	    whereSearch = Array.prototype.slice.call(whereSearch).filter(e => !(e instanceof Text));
	    return whereSearch.indexOf(whoSearch)
	}

	function Skipli_getOneWidth(){
		let anyImage = document.querySelector(".carusel-v2__images-list-container > .carusel-v2__images-list-img-container");
		let oneCss = getComputedStyle(anyImage);
		return anyImage.offsetWidth + parseFloat(oneCss.marginLeft) + parseFloat(oneCss.marginRight);
	}
	function toggleMax(e){
		Skipli_popupMaximize = !Skipli_popupMaximize;
		Skipli_popupImg.style.backgroundSize = Skipli_popupMaximize ? "cover" : "contain";
	}
	function onPopupMove(e){
		if(!Skipli_popupMaximize) return;
		var rect = e.target.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
	}

	function SkipliOnResize(){
		var nC = document.querySelectorAll(".carusel-v2__images-list-container")[1];
		if(window.matchMedia("(max-width: 560px)").matches){
			if(nC.scrollWidth <= nC.offsetWidth) nC.parentNode.classList.add("carusel-v2__hide-arrows");
			else nC.parentNode.classList.remove("carusel-v2__hide-arrows");
		}else{
			if(nC.scrollHeight <= nC.offsetHeight) nC.parentNode.classList.add("carusel-v2__hide-arrows");
			else nC.parentNode.classList.remove("carusel-v2__hide-arrows");
		}
		let c_display = "none";
		if(window.innerWidth < (Skipli_maxCurrentPosition + 1) * Skipli_getOneWidth()) c_display = "flex";
		for(let el of document.querySelectorAll(".carusel-v2__carusel-second > .carusel-v2__images-list__arrow")){
		    el.style.display = c_display;
		}
	}

	document.querySelector(".carusel-v2__carusel-v2-exit").addEventListener("click", () => Skipli_togglePopup(false));
	document.addEventListener("mouseover", ProductDetailPageBySkipli);
	document.addEventListener("click", ProductDetailPageBySkipli);
	window.addEventListener("resize", SkipliOnResize);
	window.addEventListener("load", SkipliOnResize);
	window.addEventListener("load", () => Skipli_changePopupImg(0));


	//MOBILE
	let Skipli_x = {};
	let Skipli_needToSwipe = 50;
	Skipli_popup.addEventListener("touchstart", e => {
		if (e.changedTouches && e.changedTouches[0]) {
			let cur = e.changedTouches[0];
			Skipli_x[cur.identifier] = cur.pageX;
		}
	})
	Skipli_popup.addEventListener("touchend", e => {
	    if (e.changedTouches && e.changedTouches[0]) {
			let cur = e.changedTouches[0];
			if (cur.pageX <= (Skipli_x[cur.identifier] - Skipli_needToSwipe)) Skipli_changePopupImg(1);
		else if (cur.pageX >= (Skipli_x[cur.identifier] + Skipli_needToSwipe)) Skipli_changePopupImg(-1);
	    }
	});
})();
