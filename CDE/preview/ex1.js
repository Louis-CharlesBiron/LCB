

const backgroundGradient = new FilledShape((ctx, shape)=>new Gradient(ctx, shape, [
    [.0, [2, 0, 36, 1]],
    [.4, [65, 9, 121, 0.5]],
    [1, [0, 178, 214, 0.25]]
  ], null, 65+180), true, null, [
    new Dot([0,0]),
    new Dot([CVS_cdePreview.width,0]),
    new Dot([CVS_cdePreview.width, CVS_cdePreview.height]),
    new Dot([0, CVS_cdePreview.height]),
], 0)
backgroundGradient.compositeOperation = Render.COMPOSITE_OPERATIONS.DESTINATION_OVER

// TODO, put in Utils
function fade(prog, i, minValue=0, maxValue=5) {
    maxValue -= minValue
    return i%2?minValue+maxValue*(1-prog):minValue+maxValue*prog
}
function getNearestDots(dot, shape) {
    let dots = shape.dots, d_ll = dots.length, dotX = dot.x, dotY = dot.y, res = []
    for (let i=0;i<d_ll;i++) {
        const atDot = dots[i]
        if (atDot.id != dot.id) res.push([atDot, CDEUtils.getDist(dotX, dotY, atDot.pos[0], atDot.pos[1])])
    }
    return res.toSorted((d1, d2)=>d1[1]-d2[1])
}

const backgroundStars = new Shape([0,CVS_cdePreview.height/2],
    Shape.generate(null, [0,0], CVS_cdePreview.width, 25, [-CVS_cdePreview.height/2, CVS_cdePreview.height/2], (dot, nextDot)=>{

        let distance = CDEUtils.random(-35, 35), modifier = CDEUtils.random(0.1, 1, 2), modifier2 = CDEUtils.random(-1,1), duration = -CDEUtils.random(4000, 7000), iy = dot.y, ay = 0
        setTimeout(()=>{
            dot.playAnim(new Anim((prog, i) => {
                const dy = ((i%2)||-1)*distance*prog-ay
                dot.y += dy
                ay += dy
    
                const maxAlpha = 1*modifier, maxRadius = 8-(4*modifier)
                dot.a = fade(prog, i, 0.15, maxAlpha)
                dot.radius = fade(prog, i, 2, maxRadius)
            
                if (prog == 1) {
                    iy = dot.y
                    ay = 0
                }
            }, duration, Anim.easeInOutQuad))
        }, CDEUtils.random(0, 2000))
        dot.setupResults = CanvasUtils.getDraggableDotCB(true)

    }), 0, [225, 225, 255, 0], 100, (render, dot, ratio, setupRes, mouse, dist, shape)=>{

        const nearestDots = getNearestDots(dot, shape), nd_ll = nearestDots.length, threshold = 100
        for (let i=0;i<nd_ll;i++) {
            const dotInfo = nearestDots[i]
            if (dotInfo[1] > threshold) break
            CanvasUtils.drawLine(dotInfo[0], dot, [225,225,255,CDEUtils.mod(dot.a-.15, dot.getRatio(dotInfo[1]))], 3)
            CanvasUtils.drawOuterRing(dot, CVS_cdePreview.render.profile1.update(Color.rgba(dot.r, dot.g, dot.b, CDEUtils.mod(0.25, ratio)), "none", null, null, 1), 3)
            CanvasUtils.drawOuterRing(dot, CVS_cdePreview.render.profile1.update(Color.rgba(dot.r, dot.g, dot.b, CDEUtils.mod(0.25, ratio)), "blur(2px)", null, null, 1), 3)// maybe laggy
        }

        // DRAG
        dot.setupResults(dot, mouse, dist, ratio)

        // BORDER POS RESET
        if ((!CVS_cdePreview.isWithin(dot.pos, dot.radius+5) && dot.x > CVS_cdePreview.width/2) || dot.x < -50) {
            dot.pos = [CDEUtils.random(-(20+dot.radius), CVS_cdePreview.width/2.15), CDEUtils.random(10, CVS_cdePreview.height*1.5)]
        }

    }, null, (obj)=>{

    obj.playAnim(new Anim((prog, i) => {
        obj.rotateAt(prog*360, CVS_cdePreview.getResponsivePos([0.5, 1.2]))
    }, -110000))

})


/**
 * ADDING OBJECTS
 */
CVS_cdePreview.add(backgroundStars)
CVS_cdePreview.add(backgroundGradient)