function showScene3() {

}

function hideScene3() {

}



const mainColor = new Color([162, 162, 162, 1], true), secondaryColor = new Color([255, 245, 153, 1]), mod = CDEUtils.mod,
      width = 100, height = 175, pb_wazzleWidth = 50, pb_wazzleHeight = 20


const bulbShape = new Shape([CVS_cdePreview.getCenter()[0],CVS_cdePreview.height+height], [
        // BULB BASE
        new Dot([pb_wazzleWidth, -height]),
        new Dot([-pb_wazzleWidth, -height-pb_wazzleHeight]),
        new Dot([pb_wazzleWidth, -height-pb_wazzleHeight*2]),
        new Dot([-pb_wazzleWidth, -height-pb_wazzleHeight*3]),
        new Dot([pb_wazzleWidth, -height-pb_wazzleHeight*4]),
        new Dot([-pb_wazzleWidth, -height-pb_wazzleHeight*5]),
        // WAZZLES
        new Dot([pb_wazzleWidth+pb_wazzleHeight, -height-pb_wazzleHeight*10]),
        new Dot([pb_wazzleWidth-pb_wazzleHeight, -height-pb_wazzleHeight*11]),
        new Dot([pb_wazzleWidth+pb_wazzleHeight/2, -height-pb_wazzleHeight*8]),
        new Dot([-pb_wazzleWidth-pb_wazzleHeight, -height-pb_wazzleHeight*10]),
        new Dot([-pb_wazzleWidth+pb_wazzleHeight, -height-pb_wazzleHeight*11]),
        new Dot([-pb_wazzleWidth-pb_wazzleHeight/2, -height-pb_wazzleHeight*8]),
        // BULB
        new Dot([-pb_wazzleWidth-pb_wazzleHeight*1.5, -height]),
        new Dot([-pb_wazzleWidth-pb_wazzleHeight*2.5, -height-pb_wazzleHeight*2.5]),
        new Dot([-pb_wazzleWidth-pb_wazzleHeight*2.5, -height-pb_wazzleHeight*10]),
        new Dot([-pb_wazzleWidth-pb_wazzleHeight, -height-pb_wazzleHeight*13]),
        new Dot([pb_wazzleWidth+pb_wazzleHeight, -height-pb_wazzleHeight*13]),
        new Dot([pb_wazzleWidth+pb_wazzleHeight*2.5, -height-pb_wazzleHeight*10]),
        new Dot([pb_wazzleWidth+pb_wazzleHeight*2.5, -height-pb_wazzleHeight*2.5]),
        new Dot([pb_wazzleWidth+pb_wazzleHeight*1.5, -height])
    ], 4, mainColor, _, (render, dot, ratio)=>{// drawEffectCB
        const defaultRadius = dot.getInitRadius(), isLitUp = dot.setupResults.isLitUp, litUpWidth = isLitUp ? 2+(ratio*4) : 3
        dot.a = mod(1, ratio, 0.45)
        dot.radius = mod(defaultRadius*1.25, ratio, defaultRadius/2)

        // DRAW BULB
        if (isLitUp) {
            const [ix, iy] = dot.getInitPos(), [ax, ay] = dot.anchorPos
            dot.x = ix+ax+CDEUtils.random(-1-1*mod(3, ratio), 1+1*mod(3, ratio))
            dot.y = iy+ay+CDEUtils.random(-1-1*mod(3, ratio), 1+1*mod(3, ratio))
            dot.a = ratio*0.9+CDEUtils.random(-0.25, 0.25, 2)
            CanvasUtils.drawDotConnections(dot, render.profile3.update([dot.r, dot.g, dot.b, dot.a-0.75], _, _, _, 12+ratio*4, [0]))
        }
        CanvasUtils.drawDotConnections(dot, render.profile3.update(dot.rgba, _, _, _, litUpWidth, [0]))
    }, _, (shape)=>{// setupCB
        const dots = shape.dots
        // BULB BASE CONNECTIONS
        dots[0].addConnection(dots[1])
        dots[1].addConnection(dots[2])
        dots[2].addConnection(dots[3])
        dots[3].addConnection(dots[4])
        dots[4].addConnection(dots[5])
        dots[5].addConnection(dots[6])
        // BULB WAZZLES CONNECTIONS
        dots[6].addConnection(dots[7])
        dots[7].addConnection(dots[8])
        dots[8].addConnection(dots[9])
        dots[9].addConnection(dots[10])
        dots[10].addConnection(dots[11])
        dots[11].addConnection(dots[0])
        // BULB CONNECTIONS
        dots[12].addConnection(dots[13])
        dots[13].addConnection(dots[14])
        dots[14].addConnection(dots[15])
        dots[15].addConnection(dots[16])
        dots[16].addConnection(dots[17])
        dots[17].addConnection(dots[18])
        dots[18].addConnection(dots[19])

        updateProgress(6)
    }, _, _, true
)


/**
 * ADDING OBJECTS
 */
//CVS_cdePreview.add(bulbShape)


/**
 * UTILS
*/
function activateDot(dot) {
    dot.color = secondaryColor
    dot.setupResults.isLitUp = true
}
function updateProgress(progress) {
    const d = bulbShape.dots, d_ll = d.length

    for (let i=0;i<d_ll;i++) {
        if (d[i].setupResults) d[i].setupResults.isLitUp = null
        else d[i].setupResults = {}
        const color = Color.rgba(...mainColor.rgba)
        color[3] = 0.55
        d[i].color = color
    }

    for (let i=0;i<7;i++) {if (progress>i) activateDot(d[i])}
    if (progress > 7) {
        activateDot(d[7])
        activateDot(d[8])
    }
    if (progress > 8) activateDot(d[9])
    if (progress > 9) activateDot(d[10])
    if (progress > 10) activateDot(d[11])
    if (progress > 11) activateDot(d[12])
    if (progress > 12) {
        activateDot(d[18])
        activateDot(d[19])
    }
    if (progress > 13) {
        activateDot(d[13])
        activateDot(d[14])
    }
    if (progress > 14) {
        activateDot(d[15])
        activateDot(d[16])
        activateDot(d[17])
    }
}