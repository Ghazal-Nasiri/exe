const btnIcon = document.querySelector(".menu-icon");
const line = document.querySelector(".line");
const slide = document.querySelector(".slide");
// const btnnext = querySelector(".btnnext");
// const btnpre = querySelector(".btnpre");
btnIcon.addEventListener("click" , () =>{
    line.classList.toggle("transparent");
    line.classList.toggle("open");
})


const btnSlide = document.querySelectorAll(".btnSlide");
const firsCard = document.querySelector(".child").offsetWidth;
const slideChildrens = [...slide.children];
let cardPerView = Math.round(slide.offsetWidth / firsCard)
slideChildrens.slice(-cardPerView).reverse().forEach(card => {
    slide.insertAdjacentHTML("afterbegin" , card.outerHTML);
})
slideChildrens.slice(0 , cardPerView).forEach(card => {
    slide.insertAdjacentHTML("beforeend" , card.outerHTML);
})
btnSlide.forEach(btn => {
    btn.addEventListener("click" , () => {
        slide.scrollLeft += btn.id === "pre" ? -firsCard : firsCard;
    })
})
let isDragging = false , startX , startScrollLeft;
const dragStart = (e) => {
    isDragging = true;
    slide.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = slide.scrollLeft;

}
const dragStop = () => {
    isDragging = false;
    slide.classList.remove("dragging")
}



const dragging = (e) => {
    if(!isDragging) return;
    slide.scrollLeft = startScrollLeft - (e.pageX - startX);
} 
const infiniteScroll = () => {
    if(slide.scrollLeft === 0){
        console.log("You've reached to the left end")
    }
    else if(slide.scrollLeft === slide.scrollWidth - slide.offsetWidth){
        console.log("You've reached to the right end");
    }
}
slide.addEventListener("mousedown" , dragStart);
slide.addEventListener("mousemove" , dragging);
document.addEventListener("mouseup" , dragStop);
slide.addEventListener("scroll" , infiniteScroll);