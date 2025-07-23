// Creating a simple square-like shape
const simpleShape = new Shape(CVS_cdePreview.getCenter(),[
    new Dot([-50, -50]),
    new Dot([-50, 0]),
    new Dot([-50, 50]),
    new Dot([0, -50]),
    new Dot([0, 50]),
    new Dot([50, -50]),
    new Dot([50, 0]),
    new Dot([50, 50]),
], 0, null, null, (render, dot, ratio)=>{
    const maxRadius = 6
    dot.radius = CDEUtils.mod(maxRadius*2, ratio, maxRadius*2*0.65)
    CanvasUtils.drawOuterRing(dot, [255,255,255,0.2], 5)
})

// Adding it to the canvas
CVS_cdePreview.add(simpleShape)

//CVS_cdePreview.add(new TextDisplay("TODO, something cool", CVS_cdePreview.getCenter()))


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



const backgroundStars = new Shape([100,600], // TODO POLISH
    Shape.generate(null, [-50, 0], CVS_cdePreview.width, 10, [-600, 150], (dot, nextDot)=>{
        //dot.addConnection(nextDot)

    }),
    3, [225, 225, 255, 0.75], 100, (render, dot, ratio)=>{
        CanvasUtils.drawDotConnections(dot, [255,0,0,1])
        const maxRadius = 4
        dot.radius = CDEUtils.mod(maxRadius*2, ratio, maxRadius*2*0.65)
        dot.a = CDEUtils.mod(1, ratio, 0.85)
})


/**
 * ADDING OBJECTS
 */
CVS_cdePreview.add(backgroundStars)
CVS_cdePreview.add(backgroundGradient)