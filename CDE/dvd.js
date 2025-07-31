const CVS_dvd = new Canvas(document.getElementById("CVS_dvd"))

CVS_dvd.mobileScrollingState = Canvas.MOBILE_SCROLLING_STATES.ALWAYS

function DvDfy(CVS, targetObj, speed=300, ) {
    targetObj.setupCB = obj=>{// setupCB
        const modifier = CDEUtils.random(0,1) ? -1 : 1
        setTimeout(()=>obj.playAnim(new Anim(prog=>obj.rotateAt(prog*360*modifier), -10000, Anim.easeInOutSine)), -600)
        obj.playAnim(new Anim((prog, i)=>{
            const maxScale = CVS.width <= 430 ? 0.9 : 1.25
            obj.scaleAt([CDEUtils.fade(prog, i, 0.25, maxScale), CDEUtils.fade(prog, i, 0.25, maxScale+.25)])
            if (obj.fillColorObject) obj.fillColorObject.rgba[i%3] = prog*255
            if (obj.colorObject) obj.colorObject.rgba[i%3] = prog*255
        }, -CDEUtils.random(1000,3000)))
        return {area:[[0,0],CVS.size], dir:0}
    }
    targetObj.loopCB = (obj, deltaTime)=>{// loopCB
        if (!CVS.isWithin(obj.pos, 50)) {
            obj.pos = CVS.getCenter()
            obj.text = "You got me out of bounds!"
        }
        const [ix, iy] = obj.pos, [cornerTL, cornerBR] = obj.getBounds([0,0,0,0]), res = obj.setupResults, [areaMin, areaMax] = CVS.dimensions, d = speed*deltaTime

        obj.a = isEditorOpened ? 1 : CDEUtils.mod(1, CDEUtils.getRatio(obj, CVS.mouse.pos, 225), 0.95)

        if (obj.isWithin(CVS_dvd.mouse.pos)) CVS_dvd.setCursorStyle(Canvas.CURSOR_STYLES.POINTER)
        else CVS_dvd.setCursorStyle(Canvas.CURSOR_STYLES.DEFAULT)
        
        if      (((cornerTL[0] <= areaMin[0]) || (cornerBR[0] <= areaMin[0])) && (res.dir==2||res.dir==3)) res.dir = res.dir==3?0:1 //left
        else if (((cornerTL[1] <= areaMin[1]) || (cornerBR[1] <= areaMin[1])) && (res.dir==1||res.dir==2)) res.dir = res.dir==1?0:3 //top
        else if (((cornerBR[0] >= areaMax[0]) || (cornerTL[0] >= areaMax[0])) && (res.dir==0||res.dir==1)) res.dir = res.dir==0?3:2 //right
        else if (((cornerBR[1] >= areaMax[1]) || (cornerTL[1] >= areaMax[1])) && (res.dir==0||res.dir==3)) res.dir = res.dir==0?1:2 //bottom

        if      (res.dir==0) obj.pos = [ix+d, iy+d] //(→↓)
        else if (res.dir==1) obj.pos = [ix+d, iy-d] //(→↑)
        else if (res.dir==2) obj.pos = [ix-d, iy-d] //(←↑)
        else if (res.dir==3) obj.pos = [ix-d, iy+d] //(←↓)
    }
    targetObj.activationMargin = true
    CVS.add(targetObj)
}

const dvdText = new TextDisplay("Click me!", CVS_dvd.getCenter())
DvDfy(CVS_dvd, dvdText)


// Editor stuff
let isEditorOpened = false
CVS_dvd.mouse.addListener(dvdText, Mouse.LISTENER_TYPES.CLICK, ()=>{
    dvdEditor.style.opacity = 1
    dvdEditor.style.height = "5vh"
    dvdTextInput.removeAttribute("disabled")
    closeDvdEditor.removeAttribute("disabled")
    dvdTextInput.value = ""
    isEditorOpened = true
})

closeDvdEditor.onclick=()=>{
    isEditorOpened = false
    dvdEditor.style.opacity = 0
    dvdEditor.style.height = "0px"
    dvdTextInput.setAttribute("disabled", "true")
    closeDvdEditor.setAttribute("disabled", "true")
    dvdTextInput.value = dvdText.text = "See you around!"
}

dvdTextInput.oninput=()=>{
    dvdText.text = dvdTextInput.value
}




CVS_dvd.setMouseMove()
CVS_dvd.setMouseUp()
CVS_dvd.setMouseDown()
CVS_dvd.start()