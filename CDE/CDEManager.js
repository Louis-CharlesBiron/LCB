
const _=null, {Canvas, Shape, Dot, CDEUtils, CanvasUtils, Render, _Obj, TextDisplay, ImageDisplay, Pattern, Gradient} = CDE, random = CDEUtils.random

const CVS1 = new Canvas(document.getElementById("cvs1")), render1 = CVS1.render



// BORDER EFFECT
function getBorderPaths() {
    const periodCount = random(5, 15), height = random(40, 65), startY = random(5, 25)
    return {
        path1:Render.generate([0,startY], Render.Y_FUNCTIONS.SINUS(height, CVS1.width/periodCount), CVS1.width, 20),
        path2:Render.generate([random(-3, 3),startY+random(-2, 2)], Render.Y_FUNCTIONS.SINUS(height, CVS1.width/periodCount), CVS1.width, 20),
        path3:Render.generate([0,CVS1.height-startY], Render.Y_FUNCTIONS.SINUS(height, CVS1.width/periodCount), CVS1.width, 20),
        path4:Render.generate([random(-3, 3),CVS1.height-(startY+random(-2, 2))], Render.Y_FUNCTIONS.SINUS(height, CVS1.width/periodCount), CVS1.width, 20),
    }
}

const loop1Obj = CVS1.get(CanvasUtils.createEmptyObj(CVS1, (obj)=>{
    setInterval(()=>{
        obj.setupResults = getBorderPaths()
    }, 3000)

    return getBorderPaths()
}, (obj)=>{
    const r = obj.setupResults

    render1.batchStroke(r.path2, render1.profile2.update([255,0,0,1], _, _, _, 3))
    render1.batchStroke(r.path1, render1.profile1.update([0,0,0,1], _, _, _, 3))
    render1.batchStroke(r.path4, render1.profile2.update([255,0,0,1], _, _, _, 3))
    render1.batchStroke(r.path3, render1.profile1.update([0,0,0,1], _, _, _, 3))
}))




CVS1.setMouseMove()
CVS1.setMouseLeave()
CVS1.setMouseDown(()=>{
    loop1Obj.setupResults = getBorderPaths()
})
CVS1.setMouseUp()
CVS1.start()