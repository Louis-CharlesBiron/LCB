
const CVS_cdePreview = new Canvas(document.getElementById("cdePreview"))

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
     ], null, null, 100, (render, dot, ratio)=>{
         dot.radius = CDEUtils.mod(_Obj.DEFAULT_RADIUS*2, ratio, _Obj.DEFAULT_RADIUS*2*0.8)
         CanvasUtils.drawOuterRing(dot, [255,255,255,0.2], 5)
     })

    // Adding it to the canvas
    CVS_cdePreview.add(simpleShape)

    CVS_cdePreview.add(new TextDisplay("TODO, something cool", CVS_cdePreview.getCenter()))



CVS_cdePreview.setMouseMove()
CVS_cdePreview.setMouseLeave()
CVS_cdePreview.setMouseDown()
CVS_cdePreview.setMouseUp()
CVS_cdePreview.start()