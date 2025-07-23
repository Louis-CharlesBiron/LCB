const CVS_cdePreview = new Canvas(document.getElementById("cdePreview"))












createButton(CVS_cdePreview, "Scene 1", CVS_cdePreview.getResponsivePos([0.9, 0.45]), ()=>{

}, [38, 38, 38, 1], "aliceblue")
createButton(CVS_cdePreview, "Scene 2", CVS_cdePreview.getResponsivePos([0.9, 0.65]), ()=>{

}, [38, 38, 38, 1], "aliceblue")
createButton(CVS_cdePreview, "Scene 3", CVS_cdePreview.getResponsivePos([0.9, 0.85]), ()=>{

}, [38, 38, 38, 1], "aliceblue")









/**
 * CANVAS START
*/
CVS_cdePreview.setMouseMove()
CVS_cdePreview.setMouseLeave()
CVS_cdePreview.setMouseDown()
CVS_cdePreview.setMouseUp()
CVS_cdePreview.start()

/**
 * UTILS 
*/

function createButton(CVS, text="Button", pos=CVS.getCenter(), onClickCB, fillColor="aliceblue", textColor="red", padding=[20, 30]) {
    // Creating the button's text
    const textDisplay = new TextDisplay(text, [0,0], textColor, _, _, _, (self)=>{// setupCB
        // Creating and adding to the canvas the button's box/background according to the text's size
        const [width, height] = self.trueSize, w = width/2+padding[1]/2, h = height/2+padding[0]/2,
              button = CVS.add(new FilledShape(fillColor, true, pos, [new Dot([-w,-h]),new Dot([w,-h]),new Dot([w,h]),new Dot([-w,h])], 0, fillColor, _, _, _, _, _, _, true))

        // Button visual changes
        const opacity = {default:1, hover: 0.75, click:0.5},
        hoverHandler=(hover)=>{
            // Updating the button's opacity and cursor style when mouse is
            button.fillColorObject.a = hover ? opacity.hover : opacity.default
            CVS.setCursorStyle(hover ? Canvas.CURSOR_STYLES.POINTER : Canvas.CURSOR_STYLES.DEFAULT)
        },
        clickHandler=(click)=>{
            // Updating the button's opacity and calling the custom click callback
            button.fillColorObject.a = click ? opacity.click : opacity.hover
            if (click && CDEUtils.isFunction(onClickCB)) onClickCB(button, self)
        }

        // Button listeners
        CVS.mouse.addListener(button, Mouse.LISTENER_TYPES.DOWN, ()=>clickHandler(true))
        CVS.mouse.addListener(button, Mouse.LISTENER_TYPES.UP, ()=>clickHandler(false))
        CVS.mouse.addListener(button, Mouse.LISTENER_TYPES.ENTER, ()=>hoverHandler(true))
        CVS.mouse.addListener(button, Mouse.LISTENER_TYPES.LEAVE, ()=>hoverHandler(false))

        // making the button available in the text's setupResults
        return button
    }, _, self=>self.setupResults)
    
    // Adding the text to the canvas
    CVS.add(textDisplay)

    // Returning the button and text objects
    return [textDisplay.setupResults, textDisplay]
}
