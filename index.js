
// Scroll to top button
goToTop.onclick=()=>document.documentElement.scrollTo(0, 0)

// Display age
ageEl.textContent = getAge(2005)

// Start CDE preview
let cdePreviewStarted = false
startCDEPreview.onclick=()=>{
    if (!cdePreviewStarted) {
        cdePreviewStarted = true

        cdePreview.style.opacity = 1
        cdePreview_l2.style.opacity = 1
        startCDEPreview.style.opacity = 0

        angelToAdd1.style.borderBottom = "5px solid rgb(var(--c2), 0)"

        angelToAdd1.classList.add("angelicText")
        angelToAdd2.classList.add("angelicText")
        angelToAdd3.classList.add("angelicBox")

        toggleCDEPreviewAudio.title = "Toggle audio..."
        toggleCDEPreviewAudio.removeAttribute("disabled")
        toggleCDEPreviewAudio.style.opacity = 0.25
        toggleCDEPreviewAudio.style.cursor = "pointer"

        CDEPreviewSpeed.removeAttribute("disabled")
        CDEPreviewSpeed.style.cursor = "pointer"
        CDEPreviewSpeed.parentElement.removeAttribute("disabled")
        CDEPreviewSpeed.parentElement.style.opacity = 0.25
        CDEPreviewSpeed.parentElement.title = "Modify generation speed..."

        setTimeout(()=>startCDEPreview.remove(),1000)

        noTimeoutInterval(()=>{
            CVS_cdePreview.fpsLimit = null
            CVS_cdePreview_fpsCounter.runRecommendedFPSEvaluation((results)=>{
                CVS_cdePreview.fpsLimit = Math.max(60, results.recommendedValue)
            }, 5000, 5, false)
        }, 20000)

        generateCDEPreview()
        CDEPreviewStart()
    }
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

// CDE preview generation speed
CDEPreviewSpeed.oninput=()=>{
    if (CVS_cdePreview) {
        CDEPreviewSpeedValueDisplay.textContent = `(${CVS_cdePreview.speedModifier = +CDEPreviewSpeed.value}x)`
    }
}