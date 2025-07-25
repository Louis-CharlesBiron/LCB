
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

    toggleCDEPreviewAudio.title = "Toggle audio"
    toggleCDEPreviewAudio.removeAttribute("disabled")
    toggleCDEPreviewAudio.style.opacity = 0.35
    toggleCDEPreviewAudio.style.cursor = "pointer"

    setTimeout(()=>startCDEPreview.remove(),1000)

    generateCDEPreview()
    CDEPreviewStart()
}

// Img to text example's original image
textImg.onclick=(e)=>{
    e.preventDefault()
    if (e.ctrlKey) window.open("https://thumbs.dreamstime.com/b/bright-pixel-art-sunflower-vector-format-retro-bit-floral-illustration-digital-decor-summer-themes-vintage-design-320809663.jpg", "_blank")
}

// Set img to text example's cursor style
document.onkeydown=e=>{
    const k = e.key.toLowerCase()
    if (k=="control") textImg.style.cursor = "pointer"
}
document.onkeyup=e=>{
    const k = e.key.toLowerCase()
    if (k=="control") textImg.style.cursor = "text"
}

// Toggle CDE preview audio
toggleCDEPreviewAudio.onclick=()=>{
    if (backgroundAudioDisplay) {
        const hasAudioCurrently = !backgroundAudioDisplay.disableAudio
        toggleCDEPreviewAudio.src = hasAudioCurrently ? "img/volume_off.svg" : "img/volume_up.svg"
        backgroundAudioDisplay.disableAudio = hasAudioCurrently
    }
}

// CDE preview audio opacity effect
const CDEPreviewAudioHoverOpacity = 0.4
toggleCDEPreviewAudio.onmouseenter=()=>{
    if (backgroundAudioDisplay) {
        backgroundAudioDisplay.playAnim(new Anim((prog)=>{
            backgroundAudioDisplay.a = prog*CDEPreviewAudioHoverOpacity
        }, 750, Anim.easeOutBack))
    }
}
toggleCDEPreviewAudio.onmouseleave=()=>{
        if (backgroundAudioDisplay) {
        backgroundAudioDisplay.playAnim(new Anim((prog)=>{
            backgroundAudioDisplay.a = CDEUtils.clamp((1-prog)*CDEPreviewAudioHoverOpacity, audioDisplayAlpha)
        }, 750, Anim.easeInOutQuad, ()=>CDEPreviewAudioHoverOpacity.a=audioDisplayAlpha))
    }
}