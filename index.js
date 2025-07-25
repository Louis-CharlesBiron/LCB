
// Scroll to top button
goToTop.onclick=()=>document.documentElement.scrollTo(0, 0)

// Display age
ageEl.textContent = getAge(2005)

// Start CDE preview
startCDEPreview.onclick=()=>{
    cdePreview.style.opacity = 1
    cdePreview_l2.style.opacity = 1
    startCDEPreview.style.opacity = 0

    angelToAdd1.style.borderBottom = "5px solid rgb(var(--c2), 0)"

    angelToAdd1.classList.add("angelicText")
    angelToAdd2.classList.add("angelicText")
    angelToAdd3.classList.add("angelicBox")

    CDEPreviewStart()
}